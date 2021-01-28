import SceneManager from './SceneManager';
import * as THREE from 'three';
// import PortalScene from './portalScene';
// import RotatingPotScene from './rotatingPot';
import MapScene from './MapScene';
import Grid from './Grid';

export class ThreeCanvas{
  canvas: HTMLCanvasElement;
  sceneManager: SceneManager;
  
  constructor(container: HTMLElement){
    this.canvas = this.createCanvas(document, container);
    this.sceneManager = new SceneManager(this.canvas);

    var camera = this.sceneManager.getCamera();
    var plane = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1));
    // var raycaster = new THREE.Raycaster();
    // var edge = new THREE.Vector2();
    // var edgePoint = new THREE.Vector3();
    const createScene = new MapScene(this.sceneManager);
    const grid = new Grid(this.sceneManager);
    const LEFT_EDGE = {x: -1, y: 0};
    const RIGHT_EDGE = {x: 1, y: 0};
  
    this.bindEventListeners();
    this.render();
  }

  createCanvas = (document: HTMLDocument, containerElement: HTMLElement) => {
    const canvas = document.createElement('canvas');
    containerElement.appendChild(canvas);
    return canvas;
  }

  bindEventListeners = () => {
    window.addEventListener( 'resize', this.resizeCanvas, false );
    this.resizeCanvas();
  }
  
  resizeCanvas = () => {
    this.canvas.style.width = '100%';
    this.canvas.style.height= '100%';
    // canvas.width = canvas.offsetWidth;
    // canvas.height = canvas.offsetHeight;
    this.sceneManager.onWindowResize();
  }

  render = ( ) => {
    requestAnimationFrame(this.render);
    this.sceneManager.update();
  }
}
export default function TCanvas(containerElement){
  
}