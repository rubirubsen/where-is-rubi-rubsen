// ═══════════════════════════════════════════
// render.js – All Rendering + Init
// ═══════════════════════════════════════════

const app = document.getElementById('app');

function render(){
  // Overlays live on document.body, not inside #app.
  // When G.overlay is null, clean up any leftover overlay div.
  if(!G.overlay){
    const ov = document.querySelector('.overlay');
    if(ov) ov.remove();
  }
  if(G.phase==='title') { renderTitle(); return; }
  if(G.phase==='win')   { renderEnd(true);  return; }
  if(G.phase==='lose')  { renderEnd(false); return; }
  renderGame();
  if(G.overlay==='travel')  renderTravelOverlay();
  else if(G.overlay==='dossier') renderDossierOverlay();
  else if(G.overlay==='map')     renderMapOverlay();
}

// ─── Title screen ─────────────────────────────
function renderTitle(){
  app.innerHTML=`
  <div id="title-screen">
    <div class="title-deco">✈ 🌍 🕵️</div>
    <h1>${t('gameTitle')}</h1>
    <div class="subtitle">${t('subtitle')}</div>
    <div class="badge">V.I.L.E. CRIMINAL SYNDICATE — INTERNATIONAL FUGITIVES</div>
    <div class="lang-toggle">
      <button class="lang-btn ${G.lang==='en'?'active':''}" onclick="setLang('en')">🇬🇧 English</button>
      <button class="lang-btn ${G.lang==='de'?'active':''}" onclick="setLang('de')">🇩🇪 Deutsch</button>
    </div>
    <button class="start-btn" onclick="startGame()">${t('newCase')}</button>
    <div style="margin-top:24px;color:#334;font-size:14px;font-family:'VT323',monospace;">
      ${G.lang==='en'
        ?'Track the suspect across 5 cities. Collect witness clues. Run the Crime Computer. Issue a warrant. Make the arrest.'
        :'Verfolge den Verdächtigen durch 5 Städte. Sammle Zeugenaussagen. Nutze den Verbrechenscomputer. Stelle Haftbefehl aus.'}
    </div>
  </div>`;
}

// ─── Main game screen ─────────────────────────
function renderGame(){
  const city      = currentCity();
  const isAtFinal = G.playerPos===G.route.length-1 && !G.atDeadEnd;
  const canArrest = isAtFinal && G.hasWarrant;
  app.innerHTML=`
  <div id="game-window">
    <div class="win-titlebar">
      <div class="wdot wd-r"></div><div class="wdot wd-y"></div><div class="wdot wd-g"></div>
      <div class="wtitle">WHERE IN THE WORLD IS RUBIO RUBSEN? — ${t('caseLabel')} ${G.caseNum}</div>
    </div>
    <div class="win-menu">
      <span class="apple-logo">🍎</span>
      <span class="mitem" onclick="setLang(G.lang==='en'?'de':'en')">🌐 ${G.lang==='en'?'DE':'EN'}</span>
      <span class="mitem" onclick="G.overlay='map';render()">${t('showMap')}</span>
      <span class="mitem" onclick="G.overlay='dossier';render()">${t('interpol')}</span>
    </div>
    <div class="game-body">
      <div class="city-panel">
        <div class="city-header">
          <h2>${city.name[G.lang]}, ${city.country[G.lang]}</h2>
          <div class="cdate">${getDay()}, ${getTimeStr()}
            ${G.atDeadEnd?`<span style="color:#ff4444;margin-left:8px">⚠ ${t('deadEndMsg')}</span>`:''}
          </div>
        </div>
        <canvas class="city-canvas" id="mainCityCanvas"></canvas>
      </div>
      <div class="info-panel">
        <div class="info-text" id="infoText">
          ${G.showingWitness && G.lastMsg
            ? `<span class="speaker">[${t('witnessLabel')} ${G.witnessIdx}]</span><br><br>"${G.lastMsg}"
               ${G.witnessIdx>=3?`<br><br><span class="clue-tag">✔ ${G.lang==='en'?'No more witnesses here.':'Keine weiteren Zeugen hier.'}</span>`:''}`
            : G.lastMsg
              ? `<span style="color:${G.lastMsg.startsWith('❌')?'#ff6644':G.lastMsg.startsWith('✔')?'#44ff88':'#00dd77'}">${G.lastMsg}</span>`
              : `<span style="color:#556699">${city.desc[G.lang]}</span>
                 <br><br><span style="color:#446655">${G.lang==='en'
                   ?'The suspect was seen here recently.'
                   :'Der Verdächtige wurde hier kürzlich gesichtet.'}</span>`
          }
        </div>
      </div>
    </div>
    <div class="action-bar">
      <button class="abtn" onclick="openTravel()">
        <span class="aico">✈</span>${t('depart')}
      </button>
      <button class="abtn" onclick="G.overlay='map';render()">
        <span class="aico">🗺</span>${t('showMap')}
      </button>
      <button class="abtn ${G.witnessIdx>=3?'disabled':''}" onclick="investigate()">
        <span class="aico">🔍</span>${t('investigate')}
      </button>
      <button class="abtn" onclick="G.overlay='dossier';render()">
        <span class="aico">💻</span>${t('interpol')}
      </button>
      ${canArrest?`<button class="abtn highlight" onclick="attemptArrest(true)"><span class="aico">🚔</span>${t('arrest')}</button>`:''}
    </div>
    <div class="status-bar">
      <span class="days">${t('dayLabel')} ${G.day}/10</span>
      <span>${G.visitedCities.length} ${G.lang==='en'?'cities':'Städte'} | ${G.wrongMoves} ${G.lang==='en'?'wrong':'falsch'}</span>
      <span class="${G.hasWarrant?'warrant-status':''}">${G.hasWarrant?t('warrantActive'):t('warrantLabel')}</span>
    </div>
  </div>`;
  const canvas = document.getElementById('mainCityCanvas');
  if(canvas) renderCityToCanvas(canvas, city.id, canvas.offsetWidth||400, 220);
}

// ─── Travel overlay ───────────────────────────
function renderTravelOverlay(){
  const choices    = getTravelChoices();
  const isAtFinal  = G.playerPos===G.route.length-1 && !G.atDeadEnd;
  const choiceHtml = choices.map(id=>{
    const c = CITIES.find(x=>x.id===id);
    return `<div class="city-choice" onclick="travelTo('${id}')">
      <canvas class="cc-canvas" id="cc-${id}"></canvas>
      <h4>${c.name[G.lang]}</h4>
      <div class="cc-country">${c.country[G.lang]}</div>
    </div>`;
  }).join('');
  const arrestHtml = isAtFinal && G.hasWarrant ? `
    <div class="city-choice" onclick="travelTo('arrest')" style="border-color:#cc2222;background:#1a0000;grid-column:1/-1;text-align:center;">
      <h4 style="color:#ff4444">🚔 ${t('arrest')}</h4>
      <div class="cc-country" style="color:#cc4444">
        ${G.lang==='en'?"Make the arrest right here!":"Verhaftung direkt hier!"}
      </div>
    </div>` : '';
  const existing = document.querySelector('.overlay');
  if(existing) existing.remove();
  const div = document.createElement('div');
  div.className = 'overlay';
  div.innerHTML = `<div class="ov-win" style="max-width:min(700px,96vw)">
    <button class="ov-close" onclick="G.overlay=null;render()">✕</button>
    <h3>✈ ${t('travelTitle')}</h3>
    <p style="color:#667;font-size:clamp(13px,1.8vw,17px);margin-bottom:10px">${t('travelHint')}</p>
    <div class="travel-grid">${choiceHtml}${arrestHtml}</div>
  </div>`;
  document.body.appendChild(div);
  choices.forEach(id=>{
    const c = document.getElementById('cc-'+id);
    if(c) renderCityToCanvas(c, id, c.offsetWidth||200, 80);
  });
}

// ─── INTERPOL Dossier + Crime Computer ────────
function renderDossierOverlay(){
  const lang     = G.lang;
  const matches  = getMatchingCriminals();
  const attrLabels = {gender:t('attrGender'),hair:t('attrHair'),vehicle:t('attrVehicle'),hobby:t('attrHobby'),feature:t('attrFeature')};
  const allAttrs   = ['gender','hair','vehicle','hobby','feature'];

  // Suspect profile table — known vs unknown
  const profileRows = allAttrs.map(attr=>{
    const known = G.suspectAttrs.find(a=>a.attr===attr);
    return `<tr>
      <td style="color:#556;padding:3px 8px 3px 0;font-size:clamp(12px,1.6vw,15px)">${attrLabels[attr]}:</td>
      <td style="color:${known?'#00ff88':'#333'};font-size:clamp(13px,1.8vw,17px)">
        ${known ? (G.criminal[attr]||{})[lang]||G.criminal[attr]?.en||'?' : t('unknownAttr')}
      </td>
    </tr>`;
  }).join('');

  // Crime Computer — list suspects still matching
  const suspectList = matches.map(c=>`
    <div style="color:#aabbff;font-size:clamp(13px,1.8vw,17px);padding:3px 0;border-bottom:1px solid #1a1a33">
      🔍 ${c.name[lang]||c.name.en}
    </div>`).join('');

  const oneLeft  = matches.length===1;
  const warrantReady = oneLeft && !G.hasWarrant;
  const identityLine = oneLeft
    ? `<div style="color:#00ff88;font-size:clamp(13px,1.8vw,17px);margin-top:8px">
         ✔ ${t('identityKnown')}: <strong>${matches[0].name[lang]}</strong>
       </div>`
    : '';

  // Witness clue log
  const clueLog = G.suspectAttrs.length
    ? G.suspectAttrs.map(a=>`<li style="color:#8899cc;font-size:clamp(12px,1.6vw,15px);padding:3px 0">"${a.text}"</li>`).join('')
    : `<li style="color:#334;font-size:clamp(13px,1.8vw,17px)">${t('noClues')}</li>`;

  const existing = document.querySelector('.overlay');
  if(existing) existing.remove();
  const div = document.createElement('div');
  div.className = 'overlay';
  div.innerHTML = `<div class="ov-win" style="max-width:min(680px,96vw)">
    <button class="ov-close" onclick="G.overlay=null;render()">✕</button>
    <h3>📋 ${t('dossierTitle')} — ${t('caseLabel')} ${G.caseNum}</h3>

    <div class="dossier-grid">

      <!-- LEFT: Suspect Profile -->
      <div>
        <div style="color:#ffd700;font-size:clamp(12px,1.6vw,14px);margin-bottom:6px;font-family:'Press Start 2P',monospace">
          ${t('suspectProfile')}
        </div>
        <div style="background:#060612;border:1px solid #223;border-radius:5px;padding:10px">
          <canvas id="dosCanvas" style="display:block;margin:0 auto 8px;image-rendering:pixelated"></canvas>
          <table style="width:100%;border-collapse:collapse">${profileRows}</table>
        </div>
        <div style="color:#445;font-size:clamp(11px,1.4vw,13px);margin-top:8px">
          ${t('stolenItem')} <span style="color:#ff8844">${G.stolenItem}</span>
        </div>
      </div>

      <!-- RIGHT: Crime Computer -->
      <div>
        <div style="color:#ffd700;font-size:clamp(12px,1.6vw,14px);margin-bottom:6px;font-family:'Press Start 2P',monospace">
          ${t('crimeComputer')}
        </div>
        <div style="background:#060612;border:1px solid #223;border-radius:5px;padding:10px;min-height:120px">
          <div style="color:#556;font-size:clamp(12px,1.5vw,14px);margin-bottom:6px">
            ${t('suspectsLeft')} <span style="color:${matches.length===1?'#00ff88':'#ffaa33'}">${matches.length}</span>
          </div>
          ${suspectList}
          ${identityLine}
        </div>
        ${G.hasWarrant
          ? `<div class="warrant-issued" style="margin-top:10px">⚖ ${t('warrantIssued')}</div>`
          : warrantReady
            ? `<button class="warrant-issue-btn" onclick="issueWarrant()" style="margin-top:10px;width:100%">${t('issueWarrant')}</button>`
            : `<div style="color:#334;font-size:clamp(12px,1.6vw,15px);margin-top:10px;text-align:center">${t('needMoreClues')}</div>`
        }

        <!-- Witness log -->
        <div style="color:#445;font-size:clamp(11px,1.4vw,13px);margin-top:12px;font-family:'Press Start 2P',monospace">
          ${t('cluesGathered')}
        </div>
        <ul style="list-style:none;margin-top:4px;padding:0;max-height:120px;overflow-y:auto">${clueLog}</ul>
      </div>

    </div>
  </div>`;
  document.body.appendChild(div);
  const dc = document.getElementById('dosCanvas');
  if(dc) drawRubioPortrait(dc);
}

// ─── Trail Map ────────────────────────────────
// Shows ONLY visited cities — the route is NEVER revealed.
function renderMapOverlay(){
  const existing = document.querySelector('.overlay');
  if(existing) existing.remove();
  const div = document.createElement('div');
  div.className = 'overlay';

  const cityTags = G.visitedCities.map(id=>{
    const c   = CITIES.find(x=>x.id===id);
    const isCurrent = !G.atDeadEnd && id===G.route[G.playerPos];
    const cls = isCurrent ? 'current' : 'visited';
    const icon = isCurrent ? '★' : '✔';
    return `<div class="map-city-tag ${cls}">${icon} ${c.name[G.lang]}</div>`;
  }).join(' → ');

  const deadEndTag = G.atDeadEnd && G.deadEndCityId
    ? `<div class="map-city-tag" style="background:#2a0000;border-color:#aa2222;color:#ff4444;margin-left:8px">
        ⚠ ${CITIES.find(c=>c.id===G.deadEndCityId)?.name[G.lang]||''} (${G.lang==='en'?'dead end':'Sackgasse'})
       </div>` : '';

  div.innerHTML = `<div class="ov-win">
    <button class="ov-close" onclick="G.overlay=null;render()">✕</button>
    <h3>🗺 ${t('mapTitle')}</h3>
    <div class="world-map-wrap">
      <div style="color:#445;font-size:clamp(12px,1.6vw,15px);margin-bottom:6px">
        ${G.lang==='en'?'YOUR TRAIL:':'DEINE SPUR:'}
      </div>
      <div class="map-cities-list">${cityTags}${deadEndTag}</div>
      <div style="margin-top:10px;display:flex;gap:16px;flex-wrap:wrap">
        <span style="color:#00cc44;font-size:14px">✔ = ${t('mapVisited')}</span>
        <span style="color:#4499ff;font-size:14px">★ = ${t('mapCurrent')}</span>
      </div>
    </div>
    <div style="margin-top:12px;color:#334;font-size:clamp(12px,1.6vw,15px)">
      ${G.lang==='en'
        ?`${G.visitedCities.length} city/cities visited. ${10-G.day} days remaining.`
        :`${G.visitedCities.length} Stadt/Städte besucht. ${10-G.day} Tage verbleibend.`}
    </div>
  </div>`;
  document.body.appendChild(div);
}

// ─── Win / Lose screen ────────────────────────
function renderEnd(win){
  const existing = document.querySelector('.overlay');
  if(existing) existing.remove();
  let reasonTxt = '';
  const criminal = G.criminal||{name:{en:'the suspect',de:'der Verdächtige'}};
  if(!win){
    if(G.loseReason==='timeout')      reasonTxt=t('loseTimeOut');
    else if(G.loseReason==='wrongcity')   reasonTxt=t('loseWrongCity');
    else if(G.loseReason==='nowarrant')   reasonTxt=t('loseNoWarrant');
    else if(G.loseReason==='wrongwarrant')reasonTxt=t('loseWrongWarrant');
    else reasonTxt=t('loseTimeOut');
  }
  const lastCity = CITIES.find(c=>c.id===G.route[G.route.length-1]);
  app.innerHTML=`
  <div id="game-window">
    <div class="win-titlebar">
      <div class="wdot wd-r"></div><div class="wdot wd-y"></div><div class="wdot wd-g"></div>
      <div class="wtitle">WHERE IN THE WORLD IS RUBIO RUBSEN?</div>
    </div>
    <div style="padding:20px">
      <div class="${win?'win-screen':'lose-screen'}">
        ${win ? `
          <div style="font-size:40px;margin-bottom:10px">🎉🚔✅</div>
          <h2>${t('winTitle')}</h2>
          <p style="color:#aaddff;font-size:clamp(14px,2vw,20px);margin-bottom:8px">${t('winText')}</p>
          <p style="color:#556;font-size:clamp(13px,1.8vw,17px)">${t('arrestSuccess')}</p>
          <p style="color:#00ff88;margin-top:8px;font-size:clamp(14px,2vw,18px)">
            ${G.lang==='en'?`Criminal: ${criminal.name.en}`:`Verbrecher: ${criminal.name.de}`}
          </p>
        ` : `
          <div style="font-size:40px;margin-bottom:10px">💨🕵️❌</div>
          <h2>${t('loseTitle')}</h2>
          <p style="color:#ffaaaa;font-size:clamp(14px,2vw,20px);margin-bottom:8px">${reasonTxt}</p>
          <p style="color:#554;font-size:clamp(13px,1.8vw,17px)">
            ${G.lang==='en'
              ?`${criminal.name.en} was last seen in ${lastCity?.name.en||'?'}.`
              :`${criminal.name.de} wurde zuletzt in ${lastCity?.name.de||'?'} gesehen.`}
          </p>
        `}
        <div class="end-stats">
          <strong style="color:#ffd700">${t('caseStats')}</strong><br>
          ${t('citiesVisited')} ${G.visitedCities.length}<br>
          ${t('daysUsed')} ${G.day}<br>
          ${G.lang==='en'?'Suspect clues:':'Verdächtigen-Hinweise:'} ${G.suspectAttrs.length}/5<br>
          ${t('caseLabel')}: ${G.caseNum}
        </div>
        <button class="replay-btn" onclick="G.phase='title';render()">${t('playAgain')}</button>
      </div>
    </div>
  </div>`;
}

// ─── Init ─────────────────────────────────────
function setLang(lang){ G.lang=lang; render(); }

window.G           = G;
window.t           = t;
window.setLang     = setLang;
window.startGame   = startGame;
window.investigate = investigate;
window.openTravel  = openTravel;
window.travelTo    = travelTo;
window.attemptArrest = attemptArrest;
window.issueWarrant  = issueWarrant;

// Amsterdam windmill animation
setInterval(()=>{
  if(G.phase==='city' && currentCity()?.id==='amsterdam' && !G.overlay){
    const canvas = document.getElementById('mainCityCanvas');
    if(canvas){ const c=canvas.getContext('2d'); if(c) drawAmsterdam(c,canvas.width,canvas.height); }
  }
},100);

render();
