// ═══════════════════════════════════════════
// draw.js – City Drawing Functions & Rubio Portrait
// ═══════════════════════════════════════════

function px(ctx,x,y,w,h,col){ctx.fillStyle=col;ctx.fillRect(x,y,w,h);}

function drawParis(ctx,W,H){
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#0d0840');sky.addColorStop(.6,'#1e1060');sky.addColorStop(1,'#2a1878');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  for(let i=0;i<60;i++){const x=(Math.sin(i*137.5)*W+W)%W,y=(Math.cos(i*93.2)*H*.55+H*.55)%(.55*H);ctx.fillStyle=`rgba(255,255,255,${.3+.7*((i%3)/3)})`;ctx.fillRect(x,y,1.5,1.5);}
  ctx.fillStyle='#110e38';
  [[0,.68,.09,.32],[.1,.62,.07,.38],[.18,.72,.1,.28],[.29,.65,.06,.35],[.62,.64,.09,.36],[.72,.70,.11,.30],[.84,.63,.08,.37],[.93,.70,.07,.30]].forEach(([x,y,w,h])=>ctx.fillRect(x*W,y*H,w*W,h*H));
  ctx.fillStyle='rgba(255,220,80,.5)';
  for(let i=0;i<30;i++){const bx=(Math.sin(i*53)*W+W)%(.32*W)+.63*W,by=(Math.cos(i*79)*H*.3+H*.3)%(H*.3)+H*.65;ctx.fillRect(bx,by,2,2);}
  const ex=W*.48,gy=H*.82;
  ctx.fillStyle='#7788aa';
  ctx.beginPath();ctx.moveTo(ex-28,gy);ctx.lineTo(ex-32,gy-18);ctx.lineTo(ex-16,gy-18);ctx.lineTo(ex,gy-55);ctx.lineTo(ex+16,gy-18);ctx.lineTo(ex+32,gy-18);ctx.lineTo(ex+28,gy);ctx.fill();
  ctx.fillStyle='#1a126e';ctx.beginPath();ctx.arc(ex-16,gy-4,9,Math.PI,0);ctx.fill();
  ctx.beginPath();ctx.arc(ex+16,gy-4,9,Math.PI,0);ctx.fill();
  ctx.fillStyle='#8899bb';
  ctx.beginPath();ctx.moveTo(ex-12,gy-55);ctx.lineTo(ex-15,gy-85);ctx.lineTo(ex+15,gy-85);ctx.lineTo(ex+12,gy-55);ctx.fill();
  ctx.fillRect(ex-5,gy-118,10,33);ctx.fillRect(ex-2,gy-140,4,22);ctx.fillRect(ex-1,gy-148,2,8);
  ctx.fillStyle='#ff9900';ctx.fillRect(ex-31,gy-2,3,3);ctx.fillRect(ex+28,gy-2,3,3);
  ctx.fillStyle='#ffff00';ctx.fillRect(ex-1,gy-152,2,2);
  const water=ctx.createLinearGradient(0,H*.83,0,H);water.addColorStop(0,'#1a3a8a');water.addColorStop(1,'#0a1a55');
  ctx.fillStyle=water;ctx.fillRect(0,H*.83,W,H*.17);
  ctx.fillStyle='rgba(150,170,255,.2)';ctx.fillRect(ex-4,H*.84,8,H*.08);
}

function drawNewYork(ctx,W,H){
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#0a2a55');sky.addColorStop(.5,'#1a4a8a');sky.addColorStop(1,'#2a6acc');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(200,220,255,.15)';
  [[.1,.12,.25,.07],[.4,.08,.3,.06],[.75,.15,.2,.05]].forEach(([x,y,w,h])=>{ctx.beginPath();ctx.ellipse(x*W,y*H,w*W,h*H,0,0,Math.PI*2);ctx.fill();});
  ctx.fillStyle='#1a2244';
  [[.38,.45,.05,.55],[.44,.35,.06,.65],[.51,.25,.04,.75],[.56,.38,.05,.62],[.62,.32,.04,.68],[.67,.20,.06,.80],[.74,.40,.05,.60],[.80,.30,.04,.70],[.85,.45,.07,.55],[.93,.52,.07,.48]].forEach(([x,y,w,h])=>ctx.fillRect(x*W,y*H,w*W,h*H));
  ctx.fillStyle='rgba(255,220,80,.3)';
  for(let i=0;i<50;i++){const bx=.38*W+(Math.sin(i*61)*W*.55+W*.55)%(.55*W),by=.3*H+(Math.cos(i*47)*H*.5+H*.5)%(.45*H);ctx.fillRect(bx,by,2,3);}
  const lx=W*.15,ly=H*.55;
  ctx.fillStyle='#2a7a6a';
  ctx.fillRect(lx-12,ly+10,24,30);
  ctx.beginPath();ctx.moveTo(lx-8,ly+10);ctx.lineTo(lx-10,ly-20);ctx.lineTo(lx+10,ly-20);ctx.lineTo(lx+8,ly+10);ctx.fill();
  ctx.beginPath();ctx.arc(lx,ly-28,10,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#2a7a6a';ctx.lineWidth=2;
  for(let i=0;i<7;i++){const a=(-90+i*26)*Math.PI/180;ctx.beginPath();ctx.moveTo(lx+Math.cos(a)*10,ly-28+Math.sin(a)*10);ctx.lineTo(lx+Math.cos(a)*18,ly-28+Math.sin(a)*18);ctx.stroke();}
  ctx.fillRect(lx+6,ly-35,4,18);ctx.fillStyle='#ffaa00';ctx.fillRect(lx+6,ly-40,5,5);
  const water=ctx.createLinearGradient(0,H*.78,0,H);water.addColorStop(0,'#1a3a6a');water.addColorStop(1,'#0a1a44');
  ctx.fillStyle=water;ctx.fillRect(0,H*.78,W,H*.22);
}

function drawTokyo(ctx,W,H){
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#1a0a2a');sky.addColorStop(.4,'#4a1040');sky.addColorStop(.7,'#cc4422');sky.addColorStop(1,'#ff8833');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  const sun=ctx.createRadialGradient(W*.8,H*.35,0,W*.8,H*.35,60);
  sun.addColorStop(0,'rgba(255,200,100,.9)');sun.addColorStop(1,'rgba(255,100,0,0)');
  ctx.fillStyle=sun;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#2a1a3a';
  ctx.beginPath();ctx.moveTo(W*.05,H*.7);ctx.lineTo(W*.28,H*.28);ctx.lineTo(W*.51,H*.7);ctx.fill();
  ctx.fillStyle='#eeeeff';ctx.beginPath();ctx.moveTo(W*.23,H*.33);ctx.lineTo(W*.28,H*.28);ctx.lineTo(W*.33,H*.33);ctx.fill();
  ctx.fillStyle='#160e28';
  [[.55,.52,.05,.48],[.61,.45,.04,.55],[.66,.38,.03,.62],[.70,.55,.05,.45],[.76,.42,.04,.58],[.81,.50,.06,.50],[.88,.60,.05,.40],[.94,.55,.06,.45]].forEach(([x,y,w,h])=>ctx.fillRect(x*W,y*H,w*W,h*H));
  const tx=W*.45,ty=H*.72;
  ctx.fillStyle='#dd2200';
  ctx.beginPath();ctx.moveTo(tx-18,ty);ctx.lineTo(tx-20,ty-25);ctx.lineTo(tx-10,ty-25);ctx.lineTo(tx,ty-60);ctx.lineTo(tx+10,ty-25);ctx.lineTo(tx+20,ty-25);ctx.lineTo(tx+18,ty);ctx.fill();
  ctx.fillStyle='#eeeeee';ctx.fillRect(tx-19,ty-12,38,4);ctx.fillRect(tx-15,ty-23,30,3);
  ctx.fillStyle='#dd2200';ctx.fillRect(tx-8,ty-85,16,25);ctx.fillStyle='#eeeeee';ctx.fillRect(tx-7,ty-70,14,3);
  ctx.fillStyle='#dd2200';ctx.fillRect(tx-4,ty-110,8,25);ctx.fillRect(tx-2,ty-125,4,15);ctx.fillRect(tx-1,ty-138,2,13);
  ctx.fillStyle='#555566';ctx.fillRect(tx-10,ty-88,20,5);
  ctx.fillStyle='rgba(255,220,80,.4)';
  for(let i=0;i<25;i++){const bx=.55*W+(Math.sin(i*73)*W*.38)%(.38*W),by=.5*H+(Math.cos(i*57)*H*.28)%(.22*H);ctx.fillRect(bx,by,2,3);}
  ctx.fillStyle='rgba(255,160,180,.7)';
  [[.02,.6],[.06,.62],[.1,.58],[.14,.65],[.15,.6],[.18,.63]].forEach(([x,y])=>{
    for(let i=0;i<8;i++){ctx.beginPath();ctx.arc(x*W+(Math.sin(i)*12),y*H+(Math.cos(i)*8),2,0,Math.PI*2);ctx.fill();}
  });
  ctx.fillStyle='#1a0e2a';ctx.fillRect(0,H*.72,W,H*.28);
}

function drawCairo(ctx,W,H){
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#cc6600');sky.addColorStop(.5,'#ee9900');sky.addColorStop(1,'#ffcc44');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  const sg=ctx.createRadialGradient(W*.75,H*.2,0,W*.75,H*.2,80);
  sg.addColorStop(0,'rgba(255,255,200,.6)');sg.addColorStop(1,'rgba(255,150,0,0)');
  ctx.fillStyle=sg;ctx.fillRect(0,0,W,H);
  const sand=ctx.createLinearGradient(0,H*.6,0,H);
  sand.addColorStop(0,'#c8821a');sand.addColorStop(1,'#aa6608');
  ctx.fillStyle=sand;ctx.fillRect(0,H*.6,W,H*.4);
  ctx.strokeStyle='rgba(180,120,20,.4)';ctx.lineWidth=1;
  for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(0,H*(.65+i*.06));ctx.bezierCurveTo(W*.25,H*(.62+i*.06),W*.75,H*(.68+i*.06),W,H*(.65+i*.06));ctx.stroke();}
  ctx.fillStyle='#d4872a';
  ctx.beginPath();ctx.moveTo(W*.12,H*.6);ctx.lineTo(W*.38,H*.18);ctx.lineTo(W*.64,H*.6);ctx.fill();
  ctx.fillStyle='rgba(0,0,0,.25)';ctx.beginPath();ctx.moveTo(W*.38,H*.18);ctx.lineTo(W*.64,H*.6);ctx.lineTo(W*.38+2,H*.6);ctx.fill();
  ctx.fillStyle='#c87a22';
  ctx.beginPath();ctx.moveTo(W*.58,H*.6);ctx.lineTo(W*.74,H*.32);ctx.lineTo(W*.9,H*.6);ctx.fill();
  ctx.fillStyle='rgba(0,0,0,.2)';ctx.beginPath();ctx.moveTo(W*.74,H*.32);ctx.lineTo(W*.9,H*.6);ctx.lineTo(W*.74+1,H*.6);ctx.fill();
  ctx.fillStyle='#c8821a';ctx.fillRect(W*.05,H*.56,W*.18,H*.05);
  ctx.beginPath();ctx.arc(W*.05,H*.535,W*.03,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#aa6808';ctx.fillRect(W*.05,H*.51,W*.045,H*.025);
  ctx.fillStyle='#2a1a00';
  [[.92,.6],[.95,.58],[.97,.62]].forEach(([x,y])=>{
    ctx.fillRect(x*W-2,y*H,3,H*.1);
    ctx.fillStyle='#2a5a00';
    for(let i=0;i<6;i++){const a=(-80+i*28)*Math.PI/180;ctx.beginPath();ctx.moveTo(x*W,y*H);ctx.lineTo(x*W+Math.cos(a)*18,y*H+Math.sin(a)*10);ctx.lineWidth=2;ctx.strokeStyle='#3a6a00';ctx.stroke();}
    ctx.fillStyle='#2a1a00';
  });
  ctx.fillStyle='rgba(30,80,150,.6)';ctx.fillRect(0,H*.77,W*.08,H*.03);
}

function drawRio(ctx,W,H){
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#0a2a66');sky.addColorStop(.5,'#1a5aaa');sky.addColorStop(1,'#44aaee');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(255,255,255,.85)';
  [[.08,.1,.14,.06],[.25,.06,.2,.05],[.55,.08,.16,.05],[.78,.12,.12,.05]].forEach(([x,y,w,h])=>{ctx.beginPath();ctx.ellipse(x*W,y*H,w*W,h*H,0,0,Math.PI*2);ctx.fill();});
  const water=ctx.createLinearGradient(0,H*.72,0,H);water.addColorStop(0,'#1a5a9a');water.addColorStop(1,'#0a2a55');
  ctx.fillStyle=water;ctx.fillRect(0,H*.72,W,H*.28);
  ctx.strokeStyle='rgba(100,200,255,.3)';ctx.lineWidth=1.5;
  for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(0,H*(.75+i*.04));ctx.bezierCurveTo(W*.3,H*(.73+i*.04),W*.7,H*(.77+i*.04),W,H*(.75+i*.04));ctx.stroke();}
  ctx.fillStyle='#2a4a2a';
  ctx.beginPath();ctx.moveTo(W*.72,H*.72);ctx.quadraticCurveTo(W*.8,H*.38,W*.88,H*.42);ctx.quadraticCurveTo(W*.95,H*.45,W,H*.72);ctx.fill();
  ctx.fillStyle='#1a3a1a';
  ctx.beginPath();ctx.moveTo(0,H*.72);ctx.lineTo(W*.05,H*.52);ctx.lineTo(W*.22,H*.72);ctx.fill();
  ctx.fillStyle='#234a23';
  ctx.beginPath();ctx.moveTo(W*.28,H*.72);ctx.lineTo(W*.40,H*.30);ctx.lineTo(W*.52,H*.72);ctx.fill();
  const cx=W*.40,cy=H*.24;
  ctx.fillStyle='#ddddd0';
  ctx.fillRect(cx-2,cy,4,20);
  ctx.fillRect(cx-16,cy+6,32,3);
  ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#2a5a1a';
  [[.56,.65,.06],[.60,.67,.05],[.65,.64,.07],[.67,.70,.04]].forEach(([x,y,r])=>{ctx.beginPath();ctx.arc(x*W,y*H,r*W,0,Math.PI*2);ctx.fill();});
  ctx.fillStyle='#e8d890';ctx.fillRect(0,H*.70,W*.7,H*.04);
}

function drawMoscow(ctx,W,H){
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#0a0a18');sky.addColorStop(.5,'#1a1a30');sky.addColorStop(1,'#2a2a45');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#dde0f0';ctx.beginPath();ctx.arc(W*.82,H*.12,14,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#1a1a30';ctx.beginPath();ctx.arc(W*.84,H*.11,11,0,Math.PI*2);ctx.fill();
  for(let i=0;i<40;i++){const x=(Math.sin(i*113)*W+W)%W,y=(Math.cos(i*79)*H*.5)%(H*.5);ctx.fillStyle='rgba(255,255,255,.6)';ctx.fillRect(x,y,1.5,1.5);}
  ctx.fillStyle='#c8d0e8';ctx.fillRect(0,H*.72,W,H*.28);
  ctx.fillStyle='#d8e0f0';ctx.fillRect(0,H*.70,W,H*.04);
  ctx.fillStyle='#881111';ctx.fillRect(W*.02,H*.55,W*.96,H*.17);
  ctx.fillStyle='#771010';
  for(let i=0;i<40;i++){ctx.fillRect(W*.02+i*(W*.96/40),H*.51,W*.96/50,H*.04);}
  const bx=W*.42;
  ctx.fillStyle='#aa2222';ctx.fillRect(bx-8,H*.28,16,H*.28);
  ctx.fillStyle='#cc3333';
  ctx.beginPath();ctx.arc(bx,H*.24,16,Math.PI,0);ctx.fill();
  ctx.fillStyle='#ffdd00';ctx.fillRect(bx-1,H*.08,2,H*.16);
  const domes=[
    [bx-30,H*.42,9,'#2255aa','#ffcc00'],
    [bx+30,H*.42,9,'#22aa22','#ffcc00'],
    [bx-18,H*.36,7,'#cc8800','#ffcc00'],
    [bx+18,H*.36,7,'#9922aa','#ffcc00'],
    [bx-40,H*.50,7,'#2288aa','#ffcc00'],
    [bx+40,H*.50,7,'#aa5500','#ffcc00'],
    [bx-55,H*.54,6,'#aa2288','#ffcc00'],
    [bx+55,H*.54,6,'#224400','#ffcc00'],
  ];
  domes.forEach(([x,y,r,col,sc])=>{
    ctx.fillStyle=col;ctx.beginPath();ctx.arc(x,y,r,Math.PI,0);ctx.fill();
    ctx.fillRect(x-2,y-r-10,3,r+10);
    ctx.fillStyle=sc;ctx.fillRect(x-1,y-r-12,2,2);
  });
  ctx.fillStyle='rgba(220,230,255,.4)';
  domes.forEach(([x,y,r])=>{ctx.beginPath();ctx.arc(x,y-r*.5,r*.7,Math.PI*.8,0.2*Math.PI);ctx.fill();});
}

function drawDubai(ctx,W,H){
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#05050f');sky.addColorStop(.4,'#0a0a25');sky.addColorStop(.7,'#1a0a00');sky.addColorStop(1,'#331100');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  const glow=ctx.createRadialGradient(W*.5,H*.8,0,W*.5,H*.8,W*.5);
  glow.addColorStop(0,'rgba(255,150,0,.2)');glow.addColorStop(1,'rgba(255,100,0,0)');
  ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);
  for(let i=0;i<35;i++){const x=(Math.sin(i*137)*W+W)%W,y=(Math.cos(i*89)*H*.4)%(H*.38);ctx.fillStyle='rgba(255,255,200,.5)';ctx.fillRect(x,y,1.5,1.5);}
  const sand=ctx.createLinearGradient(0,H*.7,0,H);sand.addColorStop(0,'#553310');sand.addColorStop(1,'#3a2208');
  ctx.fillStyle=sand;ctx.fillRect(0,H*.7,W,H*.3);
  ctx.fillStyle='#0d0d20';
  [[.02,.52,.07,.48],[.1,.40,.05,.60],[.16,.58,.06,.42],[.22,.45,.04,.55],[.65,.50,.06,.50],[.72,.38,.05,.62],[.78,.55,.06,.45],[.85,.45,.04,.55],[.90,.52,.05,.48],[.96,.60,.04,.40]].forEach(([x,y,w,h])=>ctx.fillRect(x*W,y*H,w*W,h*H));
  ctx.fillStyle='rgba(255,220,80,.25)';
  for(let i=0;i<40;i++){const bx=.65*W+(Math.sin(i*61)*W*.3)%(.3*W),by=.45*H+(Math.cos(i*53)*H*.2)%(.2*H);ctx.fillRect(bx,by,2,4);}
  const bkx=W*.48;
  ctx.fillStyle='#1a2a44';
  [[-.03,.08,.06,.62],[-.02,.05,.04,.20],[-.013,.02,.026,.15],[-.007,-.01,.014,.12],[-.004,-.03,.008,.10],[-.002,-.06,.004,.20]].forEach(([dx,dy,w,h])=>ctx.fillRect(bkx+dx*W,(0.7+dy)*H,w*W,h*H));
  ctx.fillStyle='#aabbcc';ctx.fillRect(bkx-1,H*.02,2,H*.05);
  ctx.fillStyle='rgba(150,200,255,.35)';
  for(let i=0;i<15;i++){ctx.fillRect(bkx-2,H*(.12+i*.035),4,2);}
  ctx.fillStyle='#ffd700';ctx.beginPath();ctx.arc(W*.85,H*.1,10,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#0a0a25';ctx.beginPath();ctx.arc(W*.88,H*.09,8,0,Math.PI*2);ctx.fill();
}

function drawSydney(ctx,W,H){
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#0a2a55');sky.addColorStop(.5,'#1a6aaa');sky.addColorStop(1,'#44aadd');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(255,255,255,.9)';
  [[.1,.1,.15,.06],[.3,.07,.18,.05],[.55,.12,.14,.05],[.78,.08,.16,.05]].forEach(([x,y,w,h])=>{ctx.beginPath();ctx.ellipse(x*W,y*H,w*W,h*H,0,0,Math.PI*2);ctx.fill();});
  const water=ctx.createLinearGradient(0,H*.65,0,H);water.addColorStop(0,'#1a6a9a');water.addColorStop(1,'#0a2a55');
  ctx.fillStyle=water;ctx.fillRect(0,H*.65,W,H*.35);
  ctx.strokeStyle='rgba(150,220,255,.3)';ctx.lineWidth=1.5;
  for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(0,H*(.70+i*.05));ctx.bezierCurveTo(W*.25,H*(.68+i*.05),W*.75,H*(.72+i*.05),W,H*(.70+i*.05));ctx.stroke();}
  ctx.strokeStyle='#556677';ctx.lineWidth=6;
  ctx.beginPath();ctx.arc(W*.5,H*.95,W*.46,Math.PI*1.2,Math.PI*.03,-true);ctx.stroke();
  ctx.fillStyle='#556677';ctx.fillRect(W*.13,H*.5,8,H*.2);ctx.fillRect(W*.87,H*.5,8,H*.2);
  ctx.fillStyle='#445566';ctx.fillRect(W*.12,H*.65,W*.76,5);
  ctx.fillStyle='#778899';ctx.fillRect(W*.12,H*.65,W*.76,3);
  const ox=W*.42,oy=H*.65;
  ctx.fillStyle='#e8e8ee';
  ctx.beginPath();ctx.moveTo(ox,oy);ctx.quadraticCurveTo(ox-5,oy-60,ox+25,oy);ctx.fill();
  ctx.beginPath();ctx.moveTo(ox+20,oy);ctx.quadraticCurveTo(ox+15,oy-50,ox+50,oy);ctx.fill();
  ctx.fillStyle='#d8d8e4';
  ctx.beginPath();ctx.moveTo(ox+45,oy);ctx.quadraticCurveTo(ox+42,oy-35,ox+65,oy);ctx.fill();
  ctx.fillStyle='rgba(100,120,150,.2)';
  ctx.beginPath();ctx.moveTo(ox,oy);ctx.lineTo(ox+13,oy-40);ctx.lineTo(ox+13,oy);ctx.fill();
  ctx.fillStyle='#2a6a1a';ctx.fillRect(W*.67,H*.58,W*.33,H*.08);
  ctx.fillStyle='#3a8a2a';
  [[.70,.62,.04],[.74,.61,.035],[.78,.63,.045],[.82,.60,.04]].forEach(([x,y,r])=>{ctx.beginPath();ctx.arc(x*W,y*H,r*W,0,Math.PI*2);ctx.fill();});
}

function drawAmsterdam(ctx,W,H){
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#334466');sky.addColorStop(.5,'#4a6688');sky.addColorStop(1,'#7799bb');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(180,200,220,.5)';
  [[.0,.05,.4,.2],[.35,.1,.5,.15],[.8,.08,.3,.15]].forEach(([x,y,w,h])=>{ctx.beginPath();ctx.ellipse(x*W,y*H,w*W,h*H,0,0,Math.PI*2);ctx.fill();});
  const houseColors=['#aa4422','#886633','#443388','#228844','#994422','#334488','#8a6a2a','#223355','#662233'];
  const houses=[
    [.02,.42,.08,.55],[.11,.38,.07,.60],[.19,.45,.09,.52],[.29,.40,.08,.57],[.38,.44,.07,.53],[.46,.38,.09,.59],[.56,.43,.08,.54],[.65,.40,.07,.57],[.73,.45,.08,.52],[.82,.38,.09,.60],[.92,.42,.08,.55]
  ];
  houses.forEach(([x,y,w,h],i)=>{
    const col=houseColors[i%houseColors.length];
    ctx.fillStyle=col;ctx.fillRect(x*W,y*H,w*W,h*H);
    ctx.fillStyle=col;
    const cx2=(x+w/2)*W,ty=y*H;
    ctx.beginPath();ctx.moveTo(x*W,ty);ctx.lineTo(x*W+w*W*.1,ty-H*.04);ctx.lineTo(x*W+w*W*.15,ty-H*.04);ctx.lineTo(x*W+w*W*.2,ty-H*.08);ctx.lineTo(x*W+w*W*.3,ty-H*.08);ctx.lineTo(cx2,ty-H*.14);ctx.lineTo((x+w*0.7)*W,ty-H*.08);ctx.lineTo((x+w*.8)*W,ty-H*.08);ctx.lineTo((x+w*.85)*W,ty-H*.04);ctx.lineTo((x+w*.9)*W,ty-H*.04);ctx.lineTo((x+w)*W,ty);ctx.fill();
    ctx.fillStyle='rgba(255,220,100,.7)';
    for(let j=0;j<2;j++)for(let k=0;k<3;k++){ctx.fillRect((x+.15+j*.35)*W,(y+.15+k*.22)*H,w*W*.2,H*.04);}
  });
  const canal=ctx.createLinearGradient(0,H*.68,0,H*.8);canal.addColorStop(0,'#1a3a5a');canal.addColorStop(1,'#0a2040');
  ctx.fillStyle=canal;ctx.fillRect(0,H*.68,W,H*.14);
  ctx.fillStyle='rgba(100,150,200,.2)';ctx.fillRect(W*.1,H*.69,W*.8,H*.04);
  ctx.fillStyle='#441100';ctx.fillRect(W*.15,H*.72,W*.12,H*.04);ctx.fillRect(W*.55,H*.73,W*.1,H*.04);
  ctx.fillStyle='#aa3300';ctx.fillRect(W*.15,H*.72,W*.12,H*.02);ctx.fillRect(W*.55,H*.73,W*.1,H*.02);
  ctx.fillStyle='#6a6a7a';ctx.fillRect(0,H*.82,W,H*.18);
  ctx.fillStyle='#5a5a6a';for(let i=0;i<12;i++)for(let j=0;j<3;j++)ctx.fillRect(i*W/12+j%2*3,H*.84+j*H*.04,W/14,H*.033);
  const wx=W*.93,wy=H*.58;
  ctx.fillStyle='#665544';ctx.beginPath();ctx.moveTo(wx-8,H*.68);ctx.lineTo(wx-5,wy);ctx.lineTo(wx+5,wy);ctx.lineTo(wx+8,H*.68);ctx.fill();
  ctx.fillStyle='#443322';ctx.beginPath();ctx.arc(wx,wy,8,Math.PI,0);ctx.fill();
  ctx.strokeStyle='#554433';ctx.lineWidth=3;
  for(let i=0;i<4;i++){const a=i*Math.PI/2+Date.now()*.0005;ctx.beginPath();ctx.moveTo(wx,wy);ctx.lineTo(wx+Math.cos(a)*22,wy+Math.sin(a)*22);ctx.stroke();}
  ctx.fillStyle='#ff2244';[[.2,.86],[.22,.85],[.24,.87],[.26,.85]].forEach(([x,y])=>{ctx.beginPath();ctx.arc(x*W,y*H,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#2a6a1a';ctx.fillRect(x*W-1,y*H,2,H*.04);ctx.fillStyle='#ff2244';});
  ctx.fillStyle='#ffdd00';[[.28,.86],[.30,.85],[.32,.87]].forEach(([x,y])=>{ctx.beginPath();ctx.arc(x*W,y*H,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#2a6a1a';ctx.fillRect(x*W-1,y*H,2,H*.04);ctx.fillStyle='#ffdd00';});
}

function drawRome(ctx,W,H){
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#1a0a00');sky.addColorStop(.4,'#552200');sky.addColorStop(.8,'#cc7722');sky.addColorStop(1,'#ee9944');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  const glow=ctx.createRadialGradient(W*.6,H*.5,0,W*.6,H*.5,W*.4);
  glow.addColorStop(0,'rgba(255,180,50,.15)');glow.addColorStop(1,'rgba(255,100,0,0)');
  ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#2a1800';ctx.beginPath();ctx.moveTo(0,H*.72);ctx.bezierCurveTo(W*.2,H*.55,W*.4,H*.65,W*.6,H*.58);ctx.bezierCurveTo(W*.8,H*.51,W*.9,H*.62,W,H*.65);ctx.lineTo(W,H*.72);ctx.closePath();ctx.fill();
  ctx.fillStyle='#8a7a6a';ctx.fillRect(0,H*.72,W,H*.28);
  ctx.fillStyle='#7a6a5a';for(let i=0;i<14;i++)for(let j=0;j<4;j++)ctx.fillRect(i*W/14+j%2*4,H*.74+j*H*.055,W/16,H*.04);
  ctx.fillStyle='#2a4a1a';
  [[.02,.3,.03,.4],[.05,.25,.025,.45],[.92,.28,.03,.43],[.95,.22,.025,.48]].forEach(([x,y,w,h])=>{
    ctx.beginPath();ctx.ellipse(x*W,y*H+h*H/2,w*W,h*H/2,0,0,Math.PI*2);ctx.fill();
  });
  const cox=W*.5,coy=H*.65;
  const cW2=W*.28,cH2=H*.35;
  ctx.fillStyle='#aa8855';
  ctx.beginPath();ctx.ellipse(cox,coy,cW2,cH2,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#8a6640';
  ctx.beginPath();ctx.ellipse(cox,coy,cW2*.78,cH2*.78,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#cc9955';ctx.beginPath();ctx.ellipse(cox,coy,cW2*.55,cH2*.55,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#bb8844';ctx.beginPath();ctx.ellipse(cox,coy,cW2*.4,cH2*.4,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#8a6640';
  for(let i=0;i<16;i++){const a=i*Math.PI/8;const ax=cox+Math.cos(a)*cW2*.88,ay=coy+Math.sin(a)*cH2*.88;ctx.fillRect(ax-4,ay-6,8,12);}
  ctx.fillStyle='#7a5530';
  for(let i=0;i<14;i++){const a=i*Math.PI/7+.2;const ax=cox+Math.cos(a)*cW2*.65,ay=coy+Math.sin(a)*cH2*.65;ctx.fillRect(ax-3,ay-4,6,9);}
  ctx.fillStyle='#aa8855';ctx.fillRect(cox-cW2,coy-cH2*.3,cW2*2,cH2*.1);
  ctx.fillStyle='rgba(0,0,0,.3)';ctx.beginPath();ctx.ellipse(cox,coy+cH2*.95,cW2*.8,cH2*.12,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#8a9aaa';ctx.fillRect(W*.13,H*.35,W*.12,H*.3);
  ctx.beginPath();ctx.arc(W*.19,H*.35,W*.07,Math.PI,0);ctx.fill();
  ctx.fillStyle='#ffffff';ctx.fillRect(W*.188,H*.2,W*.004,H*.1);
}

const CITY_DRAWERS = {
  paris:drawParis,newyork:drawNewYork,tokyo:drawTokyo,
  cairo:drawCairo,rio:drawRio,moscow:drawMoscow,
  dubai:drawDubai,sydney:drawSydney,amsterdam:drawAmsterdam,rome:drawRome
};

function renderCityToCanvas(canvas,cityId,width,height){
  canvas.width=width||400;canvas.height=height||220;
  const ctx=canvas.getContext('2d');
  const fn=CITY_DRAWERS[cityId];
  if(fn)fn(ctx,canvas.width,canvas.height);
}

// ─── Rubio Portrait ──────────────────────────
function drawRubioPortrait(canvas){
  canvas.width=120;canvas.height=150;
  const ctx=canvas.getContext('2d');
  const W=120,H=150;
  ctx.fillStyle='#0a0a1a';ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#1a1a1a';ctx.fillRect(20,90,80,60);
  ctx.fillStyle='#0a0a0a';ctx.fillRect(20,90,15,60);ctx.fillRect(85,90,15,60);
  ctx.fillStyle='#333';ctx.fillRect(50,90,20,40);ctx.fillStyle='#555';ctx.fillRect(58,90,4,40);
  ctx.fillStyle='#c8896a';ctx.fillRect(46,78,28,18);
  ctx.fillStyle='#c8896a';
  ctx.beginPath();ctx.arc(60,52,36,0,Math.PI*2);ctx.fill();
  const stubble=ctx.createRadialGradient(60,40,10,60,40,36);
  stubble.addColorStop(0,'rgba(80,60,50,.0)');stubble.addColorStop(.7,'rgba(80,60,50,.15)');stubble.addColorStop(1,'rgba(80,60,50,.3)');
  ctx.fillStyle=stubble;ctx.beginPath();ctx.arc(60,52,36,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#b87860';ctx.beginPath();ctx.ellipse(24,55,7,10,-.2,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#a86850';ctx.beginPath();ctx.ellipse(24,55,4,7,-.2,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#b87860';ctx.beginPath();ctx.ellipse(96,55,7,10,.2,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#a86850';ctx.beginPath();ctx.ellipse(96,55,4,7,.2,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#5a4030';ctx.fillRect(38,40,16,3);ctx.fillRect(66,40,16,3);
  ctx.fillStyle='#888';ctx.fillRect(35,46,50,3);
  ctx.fillStyle='#111';ctx.beginPath();ctx.ellipse(46,52,14,11,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#999';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(46,52,14,11,0,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#111';ctx.beginPath();ctx.ellipse(74,52,14,11,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#999';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(74,52,14,11,0,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#b87860';ctx.fillRect(57,58,6,10);ctx.fillRect(53,65,14,5);
  ctx.fillStyle='#555040';
  ctx.beginPath();ctx.moveTo(51,77);ctx.quadraticCurveTo(60,88,69,77);ctx.lineTo(66,75);ctx.quadraticCurveTo(60,83,54,75);ctx.fill();
  ctx.strokeStyle='#1a1a1a';ctx.lineWidth=5;
  ctx.beginPath();ctx.arc(60,95,30,Math.PI*.15,Math.PI*.85);ctx.stroke();
  ctx.fillStyle='#004488';ctx.beginPath();ctx.arc(32,100,10,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#005599';ctx.beginPath();ctx.arc(32,100,7,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#004488';ctx.beginPath();ctx.arc(88,100,10,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#005599';ctx.beginPath();ctx.arc(88,100,7,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#fff';ctx.font='bold 5px sans-serif';ctx.fillText('S',85,101);
}
