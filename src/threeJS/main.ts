import SceneManager from './SceneManager';
import * as THREE from 'three';
// import PortalScene from './portalScene';
// import RotatingPotScene from './rotatingPot';
import MapScene from './MapScene';
import Grid from './Grid';

// export class ThreeCanvas{
//   constructor(){

//   }
// }
export default function TCanvas(containerElement){
  const canvas = createCanvas(document, containerElement);
  const sceneManager = new SceneManager(canvas);


	var camera = sceneManager.getCamera();
  var plane = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1));
  var raycaster = new THREE.Raycaster();
	var edge = new THREE.Vector2();
  var edgePoint = new THREE.Vector3();
	const createScene = new MapScene(sceneManager);
	const grid = new Grid(sceneManager);
	const LEFT_EDGE = {x: -1, y: 0};
	const RIGHT_EDGE = {x: 1, y: 0};
  

  


 bindEventListeners();
  render();
	
  function createCanvas(document, containerElement) {
    const canvas = document.createElement('canvas');
    containerElement.appendChild(canvas);
    return canvas;
  }

  function bindEventListeners() {
    window.addEventListener( 'resize', resizeCanvas, false );
    resizeCanvas();
  }
  
  function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height= '100%';
    // canvas.width = canvas.offsetWidth;
    // canvas.height = canvas.offsetHeight;
    sceneManager.onWindowResize();
  }

  function render() {
    requestAnimationFrame(render);
    sceneManager.update();
  }
}