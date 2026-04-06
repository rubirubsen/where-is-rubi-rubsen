// ═══════════════════════════════════════════
// data.js – Translations, City Database, Criminal Database, Game State
// ═══════════════════════════════════════════

// ─── Translations ────────────────────────────
const TX = {
  gameTitle:      {en:"Where in the World is Rubio Rubsen?", de:"Wo in aller Welt ist Rubio Rubsen?"},
  subtitle:       {en:"An International Manhunt", de:"Eine internationale Fahndung"},
  caseLabel:      {en:"CASE", de:"FALL"},
  newCase:        {en:"▶  NEW CASE", de:"▶  NEUER FALL"},
  depart:         {en:"Depart", de:"Abreise"},
  showMap:        {en:"Map", de:"Karte"},
  investigate:    {en:"Investigate", de:"Ermitteln"},
  interpol:       {en:"INTERPOL", de:"INTERPOL"},
  arrest:         {en:"ARREST!", de:"VERHAFTEN!"},
  dossierTitle:   {en:"INTERPOL DOSSIER", de:"INTERPOL DOSSIER"},
  cluesGathered:  {en:"WITNESS REPORTS:", de:"ZEUGENAUSSAGEN:"},
  noClues:        {en:"No reports yet. Start investigating!", de:"Noch keine Aussagen. Ermitteln beginnen!"},
  issueWarrant:   {en:"✔  ISSUE ARREST WARRANT", de:"✔  HAFTBEFEHL AUSSTELLEN"},
  warrantIssued:  {en:"⚖ WARRANT ISSUED – Ready to arrest!", de:"⚖ HAFTBEFEHL AUSGESTELLT – Bereit!"},
  needMoreClues:  {en:"Need to narrow down the suspect first.", de:"Verdächtigen erst weiter eingrenzen."},
  travelTitle:    {en:"WHERE ARE YOU HEADED?", de:"WOHIN REIST DU?"},
  travelHint:     {en:"Use your clues wisely — choose your destination:", de:"Nutze deine Hinweise — wähle dein Ziel:"},
  mapTitle:       {en:"TRAIL MAP", de:"SPURKARTE"},
  mapVisited:     {en:"Visited", de:"Besucht"},
  mapCurrent:     {en:"Current location", de:"Aktueller Ort"},
  dayLabel:       {en:"Day", de:"Tag"},
  warrantLabel:   {en:"Warrant: NONE", de:"Haftbefehl: KEINER"},
  warrantActive:  {en:"⚖ Warrant ACTIVE", de:"⚖ Haftbefehl AKTIV"},
  winTitle:       {en:"🎉 CRIMINAL ARRESTED!", de:"🎉 VERBRECHER VERHAFTET!"},
  winText:        {en:"Outstanding detective work! The criminal has been apprehended.", de:"Ausgezeichnete Ermittlungsarbeit! Der Verbrecher wurde gefasst."},
  loseTitle:      {en:"💨 THEY ESCAPED!", de:"💨 SIE ENTKAMEN!"},
  loseTimeOut:    {en:"You ran out of time. The criminal has vanished without a trace.", de:"Die Zeit ist abgelaufen. Der Verbrecher ist spurlos verschwunden."},
  loseWrongCity:  {en:"Wrong city — by the time you realized, they had already fled.", de:"Falsche Stadt — bis du es merktest, waren sie bereits geflohen."},
  loseNoWarrant:  {en:"You found them but had no warrant! They slipped through your fingers.", de:"Du hast sie gefunden, aber ohne Haftbefehl! Sie entglitt dir."},
  loseWrongWarrant:{en:"Wrong warrant — you arrested the wrong person!", de:"Falscher Haftbefehl — du hast die falsche Person verhaftet!"},
  playAgain:      {en:"PLAY AGAIN", de:"NOCHMAL SPIELEN"},
  caseStats:      {en:"Case Statistics", de:"Fall-Statistiken"},
  citiesVisited:  {en:"Cities visited:", de:"Besuchte Städte:"},
  daysUsed:       {en:"Days used:", de:"Verbrauchte Tage:"},
  witnessLabel:   {en:"WITNESS", de:"ZEUGE"},
  alreadyInvestigated:{en:"No more witnesses to interview here.", de:"Keine weiteren Zeugen mehr hier."},
  rubioWas:       {en:"The suspect was seen here recently.", de:"Der Verdächtige wurde hier kürzlich gesichtet."},
  wrongCity:      {en:"❌ Wrong destination — you lost 2 days backtracking.", de:"❌ Falsches Ziel — du hast 2 Tage verloren."},
  correctCity:    {en:"✔ You pick up the trail in", de:"✔ Du nimmst die Spur auf in"},
  arrestSuccess:  {en:"You corner the suspect at the airport — nowhere to run!", de:"Du stellst den Verdächtigen am Flughafen — keine Fluchtmöglichkeit!"},
  monday:         {en:"Monday", de:"Montag"},
  tuesday:        {en:"Tuesday", de:"Dienstag"},
  wednesday:      {en:"Wednesday", de:"Mittwoch"},
  thursday:       {en:"Thursday", de:"Donnerstag"},
  friday:         {en:"Friday", de:"Freitag"},
  saturday:       {en:"Saturday", de:"Samstag"},
  sunday:         {en:"Sunday", de:"Sonntag"},
  // Crime Computer
  crimeComputer:  {en:"CRIME COMPUTER", de:"VERBRECHENSCOMPUTER"},
  suspectsLeft:   {en:"Suspects remaining:", de:"Verdächtige verbleibend:"},
  suspectProfile: {en:"SUSPECT PROFILE", de:"TÄTERPROFIL"},
  attrGender:     {en:"Gender", de:"Geschlecht"},
  attrHair:       {en:"Hair", de:"Haare"},
  attrVehicle:    {en:"Vehicle", de:"Fahrzeug"},
  attrHobby:      {en:"Hobby", de:"Hobby"},
  attrFeature:    {en:"Feature", de:"Merkmal"},
  unknownAttr:    {en:"Unknown", de:"Unbekannt"},
  identityKnown:  {en:"✔ IDENTITY CONFIRMED", de:"✔ IDENTITÄT BESTÄTIGT"},
  deadEndMsg:     {en:"Dead end — no trace of the suspect here.", de:"Sackgasse — keine Spur des Verdächtigen hier."},
  stolenItem:     {en:"STOLEN:", de:"GESTOHLEN:"},
  suspect:        {en:"SUSPECT:", de:"VERDÄCHTIGER:"},
};

function t(key){return (TX[key]||{})[G.lang]||TX[key]?.en||key;}

// ─── City Database ────────────────────────────
// Each city has structured attributes used by the clue engine.
const CITIES = [
  {
    id:'paris',
    name:{en:'Paris',de:'Paris'},
    country:{en:'France',de:'Frankreich'},
    desc:{
      en:'Paris, the City of Light — capital of France and a global center of fashion, art, and cuisine.',
      de:'Paris, die Stadt des Lichts — Hauptstadt Frankreichs und globales Zentrum für Mode, Kunst und Küche.',
    },
    currency:   {en:'euros',de:'Euro'},
    language:   {en:'French',de:'Französisch'},
    flagColors: {en:'blue, white and red',de:'Blau, Weiß und Rot'},
    landmarks:  {en:['the Eiffel Tower','the Louvre','the Arc de Triomphe','Notre-Dame Cathedral'],
                 de:['den Eiffelturm','den Louvre','den Arc de Triomphe','die Kathedrale Notre-Dame']},
    climate:    {en:'mild and often rainy',de:'mild und oft regnerisch'},
  },
  {
    id:'newyork',
    name:{en:'New York',de:'New York'},
    country:{en:'USA',de:'USA'},
    desc:{
      en:'New York — the city that never sleeps. The Statue of Liberty guards its famous harbor.',
      de:'New York — die Stadt, die niemals schläft. Die Freiheitsstatue bewacht den berühmten Hafen.',
    },
    currency:   {en:'US dollars',de:'US-Dollar'},
    language:   {en:'English',de:'Englisch'},
    flagColors: {en:'red, white and blue with stars and stripes',de:'Rot, Weiß und Blau mit Sternen und Streifen'},
    landmarks:  {en:['the Statue of Liberty','Central Park','the Empire State Building','Broadway'],
                 de:['die Freiheitsstatue','den Central Park','das Empire State Building','den Broadway']},
    climate:    {en:'cold winters and hot humid summers',de:'kalte Winter und heiße feuchte Sommer'},
  },
  {
    id:'tokyo',
    name:{en:'Tokyo',de:'Tokio'},
    country:{en:'Japan',de:'Japan'},
    desc:{
      en:'Tokyo — a dazzling fusion of ancient temples and neon-lit futurism.',
      de:'Tokio — eine faszinierende Fusion aus alten Tempeln und neonbeleuchtetem Futurismus.',
    },
    currency:   {en:'yen',de:'Yen'},
    language:   {en:'Japanese',de:'Japanisch'},
    flagColors: {en:'white with a red circle',de:'Weiß mit einem roten Kreis'},
    landmarks:  {en:['Mount Fuji','the Tokyo Tower','the Shinjuku district','cherry blossom parks'],
                 de:['den Fuji-san','den Tokyo Tower','das Shinjuku-Viertel','Kirschblütenparks']},
    climate:    {en:'humid with cherry blossoms in spring',de:'feucht mit Kirschblüten im Frühling'},
  },
  {
    id:'cairo',
    name:{en:'Cairo',de:'Kairo'},
    country:{en:'Egypt',de:'Ägypten'},
    desc:{
      en:'Cairo — gateway to antiquity. The Great Pyramids rise from the desert just beyond the city.',
      de:'Kairo — Tor zur Antike. Die Großen Pyramiden erheben sich aus der Wüste direkt hinter der Stadt.',
    },
    currency:   {en:'Egyptian pounds',de:'Ägyptische Pfund'},
    language:   {en:'Arabic',de:'Arabisch'},
    flagColors: {en:'red, white and black with a golden eagle',de:'Rot, Weiß und Schwarz mit goldenem Adler'},
    landmarks:  {en:['the Great Pyramids','the Sphinx','the Nile river','the Khan el-Khalili bazaar'],
                 de:['die Großen Pyramiden','die Sphinx','den Nil','den Basar Khan el-Khalili']},
    climate:    {en:'hot and dry desert heat',de:'heiß und trocken, Wüstenhitze'},
  },
  {
    id:'rio',
    name:{en:'Rio de Janeiro',de:'Rio de Janeiro'},
    country:{en:'Brazil',de:'Brasilien'},
    desc:{
      en:'Rio de Janeiro — where mountains meet the ocean. Christ the Redeemer watches over the city.',
      de:'Rio de Janeiro — wo Berge auf den Ozean treffen. Christus der Erlöser wacht über die Stadt.',
    },
    currency:   {en:'Brazilian reais',de:'Brasilianische Real'},
    language:   {en:'Portuguese',de:'Portugiesisch'},
    flagColors: {en:'green and yellow with a blue globe',de:'Grün und Gelb mit einer blauen Erdkugel'},
    landmarks:  {en:['Christ the Redeemer','Copacabana beach','Sugar Loaf mountain','the Carnival parade'],
                 de:['Christus den Erlöser','den Copacabana-Strand','den Zuckerhut','den Karnevalsumzug']},
    climate:    {en:'tropical and sunny',de:'tropisch und sonnig'},
  },
  {
    id:'moscow',
    name:{en:'Moscow',de:'Moskau'},
    country:{en:'Russia',de:'Russland'},
    desc:{
      en:"Moscow — the ancient heart of Russia. Saint Basil's Cathedral blazes with colour on Red Square.",
      de:'Moskau — das alte Herz Russlands. Die Basilius-Kathedrale leuchtet farbenfroh am Roten Platz.',
    },
    currency:   {en:'rubles',de:'Rubel'},
    language:   {en:'Russian',de:'Russisch'},
    flagColors: {en:'white, blue and red horizontal stripes',de:'Weiße, blaue und rote horizontale Streifen'},
    landmarks:  {en:["Saint Basil's Cathedral",'Red Square','the Kremlin','the Bolshoi Theatre'],
                 de:['die Basilius-Kathedrale','den Roten Platz','den Kreml','das Bolschoi-Theater']},
    climate:    {en:'bitterly cold with heavy snow',de:'bitterkalt mit starkem Schneefall'},
  },
  {
    id:'dubai',
    name:{en:'Dubai',de:'Dubai'},
    country:{en:'UAE',de:'VAE'},
    desc:{
      en:"Dubai — the city of superlatives. The Burj Khalifa pierces the sky as the world's tallest building.",
      de:'Dubai — die Stadt der Superlative. Der Burj Khalifa ist das höchste Gebäude der Welt.',
    },
    currency:   {en:'dirhams',de:'Dirham'},
    language:   {en:'Arabic',de:'Arabisch'},
    flagColors: {en:'red, green, white and black',de:'Rot, Grün, Weiß und Schwarz'},
    landmarks:  {en:['the Burj Khalifa','the Gold Souk','Palm Jumeirah','the Dubai Mall'],
                 de:['den Burj Khalifa','den Goldsouk','die Palm Jumeirah','die Dubai Mall']},
    climate:    {en:'extremely hot and desert dry',de:'extrem heiß und wüstentrocken'},
  },
  {
    id:'sydney',
    name:{en:'Sydney',de:'Sydney'},
    country:{en:'Australia',de:'Australien'},
    desc:{
      en:"Sydney — Australia's jewel on the harbour. The Opera House's white sails define the skyline.",
      de:'Sydney — Australiens Juwel am Hafen. Die weißen Segel des Opernhauses prägen die Skyline.',
    },
    currency:   {en:'Australian dollars',de:'Australische Dollar'},
    language:   {en:'English',de:'Englisch'},
    flagColors: {en:'blue with the Union Jack and Southern Cross stars',de:'Blau mit dem Union Jack und dem Kreuz des Südens'},
    landmarks:  {en:['the Sydney Opera House','the Harbour Bridge','Bondi Beach','the Blue Mountains'],
                 de:['das Opernhaus Sydney','die Harbour Bridge','den Bondi Beach','die Blauen Berge']},
    climate:    {en:'warm and sunny with mild winters',de:'warm und sonnig mit milden Wintern'},
  },
  {
    id:'amsterdam',
    name:{en:'Amsterdam',de:'Amsterdam'},
    country:{en:'Netherlands',de:'Niederlande'},
    desc:{
      en:'Amsterdam — the Venice of the North. Famous ring canals and gabled canal houses.',
      de:'Amsterdam — das Venedig des Nordens. Berühmte Ringkanäle und Giebelhäuser.',
    },
    currency:   {en:'euros',de:'Euro'},
    language:   {en:'Dutch',de:'Niederländisch'},
    flagColors: {en:'red, white and blue horizontal stripes',de:'Rote, weiße und blaue horizontale Streifen'},
    landmarks:  {en:['the Rijksmuseum','the Anne Frank House','the canal ring','the tulip fields'],
                 de:['das Rijksmuseum','das Anne-Frank-Haus','den Grachtenring','die Tulpenfelder']},
    climate:    {en:'mild and frequently rainy',de:'mild und häufig regnerisch'},
  },
  {
    id:'rome',
    name:{en:'Rome',de:'Rom'},
    country:{en:'Italy',de:'Italien'},
    desc:{
      en:'Rome — the Eternal City. The Colosseum and Vatican stand alongside world-class art and cuisine.',
      de:'Rom — die Ewige Stadt. Das Kolosseum und der Vatikan neben weltklasse Kunst und Küche.',
    },
    currency:   {en:'euros',de:'Euro'},
    language:   {en:'Italian',de:'Italienisch'},
    flagColors: {en:'green, white and red vertical stripes',de:'Grüne, weiße und rote vertikale Streifen'},
    landmarks:  {en:['the Colosseum','the Vatican','the Trevi Fountain','the Roman Forum'],
                 de:['das Kolosseum','den Vatikan','den Trevi-Brunnen','das Forum Romanum']},
    climate:    {en:'warm Mediterranean with hot dry summers',de:'warm mediterran mit heißen trockenen Sommern'},
  },
];

// ─── VILE Criminal Database ───────────────────
// Each criminal has exactly 5 attributes. The player must collect enough
// clues to narrow the list down to 1 via boolean AND filtering.
const CRIMINALS = [
  {
    id:'rubio',
    name:{en:'Rubio Rubsen',de:'Rubio Rubsen'},
    gender:  {en:'male',de:'männlich'},
    hair:    {en:'shaved head',de:'Glatze'},
    vehicle: {en:'red sports car',de:'roter Sportwagen'},
    hobby:   {en:'jazz saxophone',de:'Jazz-Saxofon'},
    feature: {en:'aviator sunglasses',de:'Pilotensonnenbrille'},
  },
  {
    id:'felicia',
    name:{en:'Felicia Fox',de:'Felicia Fuchs'},
    gender:  {en:'female',de:'weiblich'},
    hair:    {en:'long red hair',de:'lange rote Haare'},
    vehicle: {en:'white limousine',de:'weiße Limousine'},
    hobby:   {en:'fencing',de:'Fechten'},
    feature: {en:'silk scarf',de:'Seidenschal'},
  },
  {
    id:'viktor',
    name:{en:'Viktor Volkov',de:'Viktor Wolkow'},
    gender:  {en:'male',de:'männlich'},
    hair:    {en:'gray hair',de:'graue Haare'},
    vehicle: {en:'black motorcycle',de:'schwarzes Motorrad'},
    hobby:   {en:'chess',de:'Schach'},
    feature: {en:'leather gloves',de:'Lederhandschuhe'},
  },
  {
    id:'mia',
    name:{en:'Mia Montrose',de:'Mia Montrose'},
    gender:  {en:'female',de:'weiblich'},
    hair:    {en:'black hair',de:'schwarze Haare'},
    vehicle: {en:'private yacht',de:'Privatjacht'},
    hobby:   {en:'rock climbing',de:'Klettern'},
    feature: {en:'gold wristwatch',de:'goldene Armbanduhr'},
  },
  {
    id:'sven',
    name:{en:'Sven Stahl',de:'Sven Stahl'},
    gender:  {en:'male',de:'männlich'},
    hair:    {en:'blonde hair',de:'blonde Haare'},
    vehicle: {en:'helicopter',de:'Hubschrauber'},
    hobby:   {en:'skiing',de:'Skifahren'},
    feature: {en:'monocle',de:'Monokel'},
  },
  {
    id:'carmen',
    name:{en:'Carmen Cortez',de:'Carmen Cortez'},
    gender:  {en:'female',de:'weiblich'},
    hair:    {en:'curly brown hair',de:'lockige braune Haare'},
    vehicle: {en:'vintage convertible',de:'Oldtimer-Cabrio'},
    hobby:   {en:'oil painting',de:'Ölmalerei'},
    feature: {en:'diamond ring',de:'Diamantring'},
  },
  {
    id:'rex',
    name:{en:'Rex Raven',de:'Rex Rabe'},
    gender:  {en:'male',de:'männlich'},
    hair:    {en:'silver hair',de:'silbernes Haar'},
    vehicle: {en:'armored van',de:'gepanzerter Transporter'},
    hobby:   {en:'gourmet cooking',de:'Gourmet-Kochen'},
    feature: {en:'wrist tattoo',de:'Handgelenk-Tattoo'},
  },
  {
    id:'yuki',
    name:{en:'Yuki Yamamoto',de:'Yuki Yamamoto'},
    gender:  {en:'female',de:'weiblich'},
    hair:    {en:'auburn hair',de:'rotbraunes Haar'},
    vehicle: {en:'electric bicycle',de:'Elektrofahrrad'},
    hobby:   {en:'tennis',de:'Tennis'},
    feature: {en:'wide-brimmed hat',de:'breitkrempiger Hut'},
  },
];

// Stolen items — randomly assigned per case for flavour
const STOLEN_ITEMS = {
  en:['the Crown Jewels','a priceless Fabergé egg','the Hope Diamond','a lost Van Gogh painting',
      'the Olympic gold medals','a rare medieval manuscript','the city\'s treasury seals','a top-secret microchip'],
  de:['die Kronjuwelen','ein unbezahlbares Fabergé-Ei','den Hope-Diamanten','ein verschollenes Van-Gogh-Gemälde',
      'die Olympischen Goldmedaillen','eine seltene mittelalterliche Handschrift','die Staatssiegel der Stadt','einen streng geheimen Mikrochip'],
};

// ─── Game State ───────────────────────────────
let G = {
  lang:'en',
  phase:'title',          // title | city | win | lose
  overlay:null,           // null | travel | dossier | map
  route:[],               // ordered city ids for this case (5 stops)
  playerPos:0,            // index into route of correct next city
  visitedCities:[],       // city ids the player has physically been to
  atDeadEnd:false,        // player travelled to a wrong city
  deadEndCityId:null,     // which wrong city they're currently in
  witnessIdx:0,           // witnesses interviewed at current location (resets on move)
  criminal:null,          // the VILE criminal for this case
  stolenItem:'',          // what was stolen (flavour text)
  attrRevealOrder:[],     // shuffled ['gender','hair','vehicle','hobby','feature']
  attrRevealIdx:0,        // next attribute index to reveal
  suspectAttrs:[],        // [{attr, value, text}] — collected from witnesses
  warrantCriminalId:null, // criminal.id on issued warrant
  hasWarrant:false,
  witnessCache:{},        // {cityId: [clue0, clue1, clue2]}
  day:1,
  hour:10,
  dayOfWeek:0,
  caseNum:'',
  wrongMoves:0,
  lastMsg:'',
  showingWitness:false,
  loseReason:'',
};

// ─── Helpers ─────────────────────────────────
function getDay(){
  const days=[t('monday'),t('tuesday'),t('wednesday'),t('thursday'),t('friday'),t('saturday'),t('sunday')];
  return days[G.dayOfWeek%7];
}
function getTimeStr(){
  const h=G.hour;
  const ampm=h<12?'a.m.':'p.m.';
  const h12=h>12?h-12:h===0?12:h;
  return `${h12} ${ampm}`;
}
function advanceTime(days=1){
  G.day+=days;
  G.hour=(G.hour+days*8)%24;
  G.dayOfWeek=(G.dayOfWeek+days)%7;
  if(G.day>10&&G.phase==='city'){
    G.phase='lose'; G.loseReason='timeout'; render();
  }
}

// Returns the city the player is physically standing in
function currentCity(){
  if(G.atDeadEnd&&G.deadEndCityId) return CITIES.find(c=>c.id===G.deadEndCityId);
  return CITIES.find(c=>c.id===G.route[G.playerPos]);
}
function rubioCity(){return CITIES.find(c=>c.id===G.route[G.route.length-1]);}
