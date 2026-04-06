// ═══════════════════════════════════════════
// bg.js – Three.js Animated Background
// ═══════════════════════════════════════════

(function initBG(){
  const canvas=document.getElementById('bgCanvas');
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:false});
  renderer.setSize(window.innerWidth,window.innerHeight);

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,.1,500);
  camera.position.z=22;

  // Stars
  const pos=[];
  for(let i=0;i<4000;i++){
    const t2=Math.random()*Math.PI*2;
    const p=Math.acos(2*Math.random()-1);
    const r=40+Math.random()*60;
    pos.push(r*Math.sin(p)*Math.cos(t2),r*Math.sin(p)*Math.sin(t2),r*Math.cos(p));
  }
  const sg=new THREE.BufferGeometry();
  sg.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
  scene.add(new THREE.Points(sg,new THREE.PointsMaterial({color:0xffffff,size:.12})));

  // Globe
  const globe=new THREE.Mesh(
    new THREE.SphereGeometry(11,24,16),
    new THREE.MeshBasicMaterial({color:0x2244dd,wireframe:true,transparent:true,opacity:.1})
  );
  scene.add(globe);

  // Inner glow sphere
  const glow=new THREE.Mesh(
    new THREE.SphereGeometry(10.5,24,16),
    new THREE.MeshBasicMaterial({color:0x1133aa,transparent:true,opacity:.04})
  );
  scene.add(glow);

  function animBG(){
    requestAnimationFrame(animBG);
    globe.rotation.y+=.0025;
    globe.rotation.x=Math.sin(Date.now()*.00018)*.08;
    renderer.render(scene,camera);
  }
  animBG();

  window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  });
})();
