// ═══════════════════════════════════════════
// ai.js – Algorithmic Clue Engine
//
// Implements the original Carmen Sandiego "Look-Ahead + Template-Matching"
// system: no network calls, pure database lookups.
//
// Two clue types:
//   destination  → hints at the NEXT city using its structured attributes
//   suspect      → reveals one attribute of the criminal (boolean filter fuel)
// ═══════════════════════════════════════════

// ─── Dead-end messages ───────────────────────
// Shown when the player is in a wrong city.
const DEAD_END = {
  en:[
    "I haven't seen anyone matching that description around here.",
    "Nobody like that has passed through — you're on the wrong track.",
    "This must be a dead end. No trace of your suspect here.",
    "Sorry, friend. Wrong city. You've lost valuable time.",
  ],
  de:[
    "Ich habe hier niemanden mit dieser Beschreibung gesehen.",
    "Niemand so jemand ist hier durchgekommen — du bist auf dem falschen Weg.",
    "Das ist eine Sackgasse. Keine Spur des Verdächtigen hier.",
    "Tut mir leid. Falsche Stadt. Du hast wertvolle Zeit verloren.",
  ],
};

// ─── Destination clue templates ──────────────
// Each template is a function (value) → string.
// We pick a random attribute from the next city, then a random template.
const DEST_TPL = {
  currency:{
    en:[c=>`I heard them ask about exchanging money into ${c}.`,
        c=>`They were checking the ${c} exchange rate — planning ahead.`,
        c=>`Asked the cashier about ${c}. Definitely heading somewhere that uses them.`],
    de:[c=>`Ich hörte sie nach dem Wechselkurs für ${c} fragen.`,
        c=>`Sie erkundigten sich nach ${c} — planten offensichtlich voraus.`,
        c=>`Fragten nach ${c} am Schalter. Fahren sicher dorthin.`],
  },
  language:{
    en:[l=>`They were practicing a few phrases in ${l} — badly, I might add.`,
        l=>`I overheard them speaking broken ${l} into their phone.`,
        l=>`They bought a ${l} phrase book from the shop next door.`],
    de:[l=>`Sie übten ein paar Sätze auf ${l} — schlecht, muss ich sagen.`,
        l=>`Ich hörte sie gebrochenes ${l} ins Telefon sprechen.`,
        l=>`Sie kauften einen ${l}-Sprachführer im Laden nebenan.`],
  },
  flagColors:{
    en:[f=>`They were staring at a flag — ${f}. Seemed to be memorising it.`,
        f=>`Bought a postcard showing a flag in ${f}. Looked very interested.`,
        f=>`I saw a flag pin on their jacket — ${f} colors.`],
    de:[f=>`Sie starrten auf eine Flagge — ${f}. Schienen sie auswendig zu lernen.`,
        f=>`Kauften eine Postkarte mit einer ${f}-Flagge. Schienen sehr interessiert.`,
        f=>`Ich sah einen Flaggen-Pin an der Jacke — ${f}-Farben.`],
  },
  landmark:{
    en:[l=>`They asked me how to get to ${l} — said it was on their list.`,
        l=>`I heard them mention ${l}. Said they absolutely had to see it.`,
        l=>`They were looking up photos of ${l} on their phone.`],
    de:[l=>`Sie fragten mich nach dem Weg zu ${l} — sagten, es stehe auf ihrer Liste.`,
        l=>`Ich hörte sie ${l} erwähnen. Sagten, sie müssten es unbedingt sehen.`,
        l=>`Sie sahen sich Fotos von ${l} auf ihrem Handy an.`],
  },
  climate:{
    en:[c=>`They were packing for ${c} weather — I could tell from the bag.`,
        c=>`Asked about ${c} conditions. Checking what to wear, I suppose.`,
        c=>`Complained about leaving this weather for somewhere ${c}.`],
    de:[c=>`Sie packten für ${c}es Wetter — ich konnte es an der Tasche erkennen.`,
        c=>`Fragten nach ${c}en Bedingungen. Was man wohl anzieht.`,
        c=>`Beschwerten sich, dieses Wetter gegen etwas ${c}es zu tauschen.`],
  },
};

// ─── Suspect attribute clue templates ────────
// Filled with the criminal's attribute value.
const SUSPECT_TPL = {
  gender:{
    en:{
      male:  ["The person I saw was definitely a man — no question.",
              "It was a him. Unmistakably male.",
              "I can confirm: it was a man."],
      female:["It was a woman, I'm certain of it.",
              "Definitely female. She had that air about her.",
              "A woman — no doubt in my mind."],
    },
    de:{
      male:  ["Die Person war eindeutig ein Mann — kein Zweifel.",
              "Es war ein Er. Unmissverständlich männlich.",
              "Ich kann es bestätigen: Es war ein Mann."],
      female:["Es war eine Frau, da bin ich sicher.",
              "Eindeutig weiblich. Sie hatte diese Ausstrahlung.",
              "Eine Frau — kein Zweifel in meinem Kopf."],
    },
  },
  hair:{
    en:[h=>`I couldn't help but notice — ${h}. Very distinctive.`,
        h=>`The hair was unmistakable: ${h}.`,
        h=>`What struck me first was the hair — ${h}.`],
    de:[h=>`Ich konnte es nicht übersehen — ${h}. Sehr markant.`,
        h=>`Die Haare waren unverkennbar: ${h}.`,
        h=>`Was mich zuerst auffiel, waren die Haare — ${h}.`],
  },
  vehicle:{
    en:[v=>`They drove off in a ${v}. Hard to miss.`,
        v=>`I watched them climb into a ${v} and speed away.`,
        v=>`A ${v} was waiting for them outside. That's what they left in.`],
    de:[v=>`Sie fuhren in einem ${v} davon. Schwer zu übersehen.`,
        v=>`Ich sah sie in einen ${v} einsteigen und davonrasen.`,
        v=>`Ein ${v} wartete draußen auf sie. Damit sind sie weg.`],
  },
  hobby:{
    en:[h=>`They were talking about ${h} — clearly a passion of theirs.`,
        h=>`Asked if there were any good spots for ${h} around here. Their hobby, I'd wager.`,
        h=>`Mentioned ${h} twice. Sounded like an obsession.`],
    de:[h=>`Sie redeten über ${h} — offensichtlich eine Leidenschaft.`,
        h=>`Fragten nach guten Orten für ${h} in der Nähe. Ihr Hobby, würde ich wetten.`,
        h=>`Erwähnten ${h} zweimal. Klang wie eine Obsession.`],
  },
  feature:{
    en:[f=>`I noticed something distinctive: ${f}. Hard to forget.`,
        f=>`You can't miss it — they had ${f}.`,
        f=>`What really stood out was the ${f}.`],
    de:[f=>`Mir fiel etwas Markantes auf: ${f}. Schwer zu vergessen.`,
        f=>`Man kann es nicht übersehen — sie hatten ${f}.`,
        f=>`Was wirklich auffiel, war der/die ${f}.`],
  },
};

// Rotation indexes (reset on new game)
let destTplIdx = 0;
let deadEndIdx  = 0;

function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

// ─── Destination clue generator ──────────────
// Look-ahead: pull a random attribute from the NEXT city,
// fill into a matching template.
function generateDestClue(nextCity){
  const lang = G.lang;
  // Rotate through attribute types for variety
  const attrKeys = ['currency','language','flagColors','landmark','climate'];
  const attrKey  = attrKeys[destTplIdx++ % attrKeys.length];
  let value;
  if(attrKey==='landmark'){
    value = pickRandom(nextCity.landmarks[lang]||nextCity.landmarks.en);
  } else {
    value = (nextCity[attrKey]||{})[lang] || nextCity[attrKey]?.en || '';
  }
  const templates = (DEST_TPL[attrKey]||{})[lang] || DEST_TPL[attrKey]?.en || [];
  if(!templates.length) return `Heading toward ${nextCity.name[lang]}.`;
  return pickRandom(templates)(value);
}

// ─── Suspect clue generator ───────────────────
// Reveal the next attribute in the shuffled reveal order.
// Returns {text, attr, value} or null if all revealed.
function generateSuspectClue(){
  const criminal = G.criminal;
  if(!criminal) return null;
  const lang = G.lang;
  if(G.attrRevealIdx >= G.attrRevealOrder.length) return null;
  const attr  = G.attrRevealOrder[G.attrRevealIdx++];
  const value = criminal[attr].en; // store EN value for comparison
  let text;
  if(attr==='gender'){
    const gender = criminal.gender.en; // 'male' or 'female'
    const lines  = (SUSPECT_TPL.gender[lang]||SUSPECT_TPL.gender.en)[gender]||[];
    text = pickRandom(lines);
  } else {
    const displayValue = criminal[attr][lang]||criminal[attr].en;
    const templates    = (SUSPECT_TPL[attr]||{})[lang] || SUSPECT_TPL[attr]?.en || [];
    text = templates.length ? pickRandom(templates)(displayValue) : displayValue;
  }
  return {attr, value, text};
}

// ─── Dead-end clue ────────────────────────────
function generateDeadEndClue(){
  const msgs = DEAD_END[G.lang]||DEAD_END.en;
  return msgs[deadEndIdx++ % msgs.length];
}

// ─── Public interface ─────────────────────────
// Called by game.js investigate().
// clueType: 'destination' | 'suspect'
// Returns {type, text, attr?, value?}
function getWitnessClue(cityId, nextCityId, clueType){
  if(G.atDeadEnd){
    return {type:'deadend', text:generateDeadEndClue()};
  }
  if(clueType==='destination'){
    const nextCity = CITIES.find(c=>c.id===nextCityId);
    if(!nextCity) return {type:'deadend', text:generateDeadEndClue()};
    return {type:'destination', text:generateDestClue(nextCity)};
  }
  // suspect attribute clue
  const clue = generateSuspectClue();
  if(!clue) return {type:'deadend', text:'No further intelligence available.'};
  return {type:'suspect', text:clue.text, attr:clue.attr, value:clue.value};
}
