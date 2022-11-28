import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight , 0.1, 1000
);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
})

function cameraPerspective(){
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setX(25);
  camera.position.setY(26);
  camera.position.setZ(-53);
  renderer.render(scene, camera);
}
cameraPerspective();

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x006347
});
const torus = new THREE.Mesh(geometry, material);

//scene.add(torus);
  


//point light direct shining light
const pointLight = new THREE.PointLight(0xffffff);
//const pointLight = new THREE.PointLight(0x000000);
pointLight.position.set(100,5,5);

//ambient light (lights up everywhere)
const ambientLight = new THREE.AmbientLight(0x15150f);
//const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//creates a grid and shows where point light is
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
//scene.add(lightHelper,gridHelper);

// mouse controls
const controls = new OrbitControls(camera, renderer.domElement);

//a function that create and add star
function addStar(){
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh( geometry, material );

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(2000).fill().forEach(addStar);

//space image
const spaceImage = new THREE.TextureLoader().load('resource/Space.jpg');
//scene.background = spaceImage;

//Earth
//const cloud = new THREE.TextureLoader().load('/resource/cloud.jpg');
const earthTexture = new THREE.TextureLoader().load('/resource/earth.PNG');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10,32,32),
  new THREE.MeshStandardMaterial({
    map: earthTexture
    
  })
);
scene.add(earth);

//sun
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(300,32,32),
  new THREE.MeshStandardMaterial({
    emissive: 0xffffff,
    emissiveIntensity: 100,
    lightMap: earthTexture
  })
);
scene.add(sun);
sun.position.x = 1200;

//moon
const moonTexture = new THREE.TextureLoader().load('resource/moon.jpg');
const craterTexture = new THREE.TextureLoader().load('resource/normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: craterTexture
  })
);
//moon.position.x = 30;
moon.position.x = -30;
scene.add(moon);


let moonSwitch = false;

function animate(){
  requestAnimationFrame(animate);

  earth.rotation.y += 0.001;
  moon.rotation.y += 0.0005;

  
  // if statement was made to orbit the moon around the earth
  let rSquare = 900;
  if(moonSwitch){
    moon.position.x -= .01;
    moon.position.z = -Math.sqrt(rSquare - (moon.position.x*moon.position.x));

    if(moon.position.x <= -30){
      moonSwitch = false;
    }
  
  }else{
    moon.position.x += .01;
    moon.position.z = Math.sqrt(rSquare - (moon.position.x*moon.position.x));

    if(moon.position.x >= 30){
      moonSwitch = true;
    }
  }
  

  //console.log("moonSwitch",moonSwitch,moon.position)
  

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;
  //console.log(torus);
  console.log("x:",camera.position.x, "y:",camera.position.y,"z:",camera.position.z);

  renderer.render(scene, camera);
}



animate();