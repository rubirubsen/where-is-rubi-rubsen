// ═══════════════════════════════════════════
// game.js – Game Logic
// ═══════════════════════════════════════════

function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

function startGame(){
  const allIds = CITIES.map(c=>c.id);
  G.route       = shuffle(allIds).slice(0,5);
  G.playerPos   = 0;
  G.visitedCities = [G.route[0]];

  // Pick a random criminal for this case
  G.criminal    = CRIMINALS[Math.floor(Math.random()*CRIMINALS.length)];
  G.stolenItem  = pickRandom(STOLEN_ITEMS[G.lang]||STOLEN_ITEMS.en);

  // Shuffle attribute reveal order for variety
  G.attrRevealOrder = shuffle(['gender','hair','vehicle','hobby','feature']);
  G.attrRevealIdx   = 0;
  G.suspectAttrs    = [];
  G.warrantCriminalId = null;
  G.hasWarrant      = false;

  G.witnessCache  = {};
  G.witnessIdx    = 0;
  G.atDeadEnd     = false;
  G.deadEndCityId = null;

  G.day        = 1; G.hour = 10; G.dayOfWeek = 0;
  G.wrongMoves = 0;
  G.lastMsg    = '';
  G.showingWitness = false;
  G.loseReason = '';
  G.caseNum    = 'VILE-'+Math.floor(1000+Math.random()*9000);
  G.overlay    = null;

  // Reset clue engine indexes
  destTplIdx  = 0;
  deadEndIdx  = 0;

  G.phase = 'city';
  render();
}

// ─── Crime Computer ───────────────────────────
// Boolean AND filter: returns all criminals whose attributes
// match every collected suspect clue.
function getMatchingCriminals(){
  return CRIMINALS.filter(criminal =>
    G.suspectAttrs.every(({attr, value}) => criminal[attr].en === value)
  );
}

// ─── Investigate ─────────────────────────────
function investigate(){
  const cityId = currentCity()?.id;
  if(!cityId) return;

  if(G.witnessIdx>=3){
    G.lastMsg = t('alreadyInvestigated');
    G.showingWitness = false;
    render(); return;
  }

  // Use cache so revisiting a city shows the same clues
  if(!G.witnessCache[cityId]) G.witnessCache[cityId]=[];

  let result;
  if(G.witnessCache[cityId][G.witnessIdx]){
    result = G.witnessCache[cityId][G.witnessIdx];
  } else {
    // clueType: first 2 witnesses give destination hints, 3rd reveals suspect attr
    const clueType = G.witnessIdx < 2 ? 'destination' : 'suspect';
    const nextCityId = G.playerPos < G.route.length-1
      ? G.route[G.playerPos+1]
      : G.route[G.playerPos];
    result = getWitnessClue(cityId, nextCityId, clueType);
    G.witnessCache[cityId][G.witnessIdx] = result;
  }

  // If suspect clue, add to profile (only if not a dead-end result)
  if(result.type==='suspect' && result.attr && !G.atDeadEnd){
    // Avoid duplicate attrs if player re-interviews (shouldn't happen but safety)
    if(!G.suspectAttrs.find(a=>a.attr===result.attr)){
      G.suspectAttrs.push({attr:result.attr, value:result.value, text:result.text});
    }
  }

  G.witnessIdx++;
  G.showingWitness = true;
  G.lastMsg = result.text;
  render();
}

// ─── Travel ──────────────────────────────────
function openTravel(){
  // At final route city: need warrant to arrest
  if(G.playerPos>=G.route.length-1 && !G.hasWarrant){
    G.lastMsg = t('needMoreClues'); render(); return;
  }
  G.overlay='travel'; render();
}

function travelTo(cityId){
  G.overlay = null;

  // At final city: this click is the arrest attempt
  if(G.playerPos>=G.route.length-1){
    attemptArrest(cityId==='arrest'); return;
  }

  const correctNext = G.route[G.playerPos+1];

  if(cityId===correctNext){
    // ── Correct move ──
    G.atDeadEnd     = false;
    G.deadEndCityId = null;
    G.playerPos++;
    G.visitedCities.push(cityId);
    G.witnessIdx    = 0;
    G.showingWitness = false;
    advanceTime(1);
    const city = CITIES.find(c=>c.id===cityId);
    G.lastMsg = `${t('correctCity')} ${city.name[G.lang]}!`;
    render();
  } else {
    // ── Wrong move — enter dead-end city ──
    G.wrongMoves++;
    G.atDeadEnd     = true;
    G.deadEndCityId = cityId;
    G.witnessIdx    = 0;   // reset so player can interview dead-end witnesses (who know nothing)
    G.showingWitness = false;
    advanceTime(2);
    const city = CITIES.find(c=>c.id===cityId);
    G.lastMsg = t('wrongCity');
    // Taint cache for this dead-end city so future interviews return dead-end msgs
    G.witnessCache[cityId] = null;
    render();
  }
}

// ─── Arrest ───────────────────────────────────
function attemptArrest(confirmed=false){
  G.overlay = null;
  const atFinalCity = G.playerPos===G.route.length-1 && !G.atDeadEnd;
  if(!G.hasWarrant){
    G.phase='lose'; G.loseReason='nowarrant'; render(); return;
  }
  if(!atFinalCity){
    G.phase='lose'; G.loseReason='wrongcity'; render(); return;
  }
  // Check warrant matches actual criminal
  if(G.warrantCriminalId !== G.criminal.id){
    G.phase='lose'; G.loseReason='wrongwarrant'; render(); return;
  }
  G.phase='win'; render();
}

// ─── Warrant ─────────────────────────────────
// Issue warrant only when Crime Computer has narrowed it to exactly 1 suspect.
function issueWarrant(){
  const matches = getMatchingCriminals();
  if(matches.length===1){
    G.hasWarrant = true;
    G.warrantCriminalId = matches[0].id;
    render();
  }
}

// ─── Travel choices ───────────────────────────
// Returns 4 city IDs: the correct next stop + 3 decoys.
// Excludes the player's current location.
function getTravelChoices(){
  const correct    = G.playerPos<G.route.length-1 ? G.route[G.playerPos+1] : null;
  const currentId  = G.atDeadEnd ? G.deadEndCityId : G.route[G.playerPos];
  const excluded   = new Set([currentId]);
  const others     = CITIES.filter(c=>!excluded.has(c.id)&&c.id!==correct).map(c=>c.id);
  const decoys     = shuffle(others).slice(0,3);
  return correct ? shuffle([correct,...decoys]) : shuffle(decoys).slice(0,4);
}
