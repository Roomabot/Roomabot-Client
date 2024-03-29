import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three'
// import { Cube } from './cube.ts'
// import { Portal } from './portal.ts'
// import cubeModel from '../models/cube.glb'
// import bluePortal from '../models/portal-blue.glb'
// import orangePortal from '../models/portal-orange.glb' 
import SceneSubject from './SceneSubject';

export default class SceneManager {

    private canvas: any;
    private scene: THREE.Scene;
    private clock: THREE.Clock;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.Renderer;
    private loader: GLTFLoader;
    private sceneSubjects: SceneSubject[];
    private controls: any;

    constructor(canvas: any){
        this.clock = new THREE.Clock();
        this.canvas = canvas;
        
        let canvasContainer = document.getElementById('canvas-div') 

        console.warn('Canvas deets', canvas)
        const screenMetaData = {
            width: canvasContainer.clientWidth,
            height: canvasContainer.clientHeight,
            canvas: canvas
        }
        
        this.scene = this.buildScene();
        this.renderer = this.buildRender(screenMetaData);
        this.camera = this.buildCamera(screenMetaData);
        // this.loader = this.getModelLoader();
        this.controls = this.buildController(this.camera, this.renderer)
        this.sceneSubjects = [];
    }

    buildController(camera: THREE.PerspectiveCamera, renderer: THREE.Renderer): any {
        let controls = new OrbitControls( camera, renderer.domElement );
        controls.minDistance = 15; // min zoom distance
        controls.maxDistance = 35; // max zoom distance
        return controls
    }

    getControls(): OrbitControls{
        return this.controls
    }
    
   // const sceneSubjects = createSceneSubjects(scene, loader);

    buildScene = () => {
        const scene = new THREE.Scene();
        var ambientLight = new THREE.AmbientLight( 0xcccccc );
        // scene.add( ambientLight );
        // scene.background = new THREE.Color( 0x050505 );
        // scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8);
        directionalLight.position.set( 0, 4, 11 ).normalize();
        // scene.add( directionalLight );	

        return scene;
    }

    getScene = () => {
        return this.scene;
    }
    getCamera = () => {
        return this.camera;
    }

    buildRender = ({ width, height, canvas }) => {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        // renderer.setSize(width, height);

        // renderer.outputEncoding = THREE.sRGBEncoding;

        return renderer;
    }

    buildCamera = ({ width, height }) => {
        const aspectRatio = width / height;
        const fieldOfView = 30;
        const nearPlane = 1;
        const farPlane = 1000; 
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set( 0 , 25 , 0);
        camera.lookAt(new THREE.Vector3(0,0,0));
        
    
        return camera;
    }

    
    getModelLoader = () => {
        return new GLTFLoader();
    }

    /**
     * Main ThreeJS render loop
     */
    update = () => {
        if (this.controls){
            this.controls.update();
        }
        const elapsedTime = this.clock.getElapsedTime();
        if(this.sceneSubjects){
            for(let i=0; i<this.sceneSubjects.length; i++)
        	this.sceneSubjects[i].update(elapsedTime);

            this.renderer.render(this.scene, this.camera);
        }
        
    }
    
    addObject = (object: THREE.Object3D) => {
        this.scene.add(object);
    }

    removeObject = (object: THREE.Object3D) => {
        this.scene.remove(object)
    }
    
    addSubject = (subject: SceneSubject) => {
        this.scene.add(subject.getSubject());
        this.sceneSubjects.push(subject)
    }


    onWindowResize = () => {
        // const { width, height } = this.renderer.domElement;
        // const canvas = this.renderer.domElement;
        // this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        // this.camera.updateProjectionMatrix();

        let canvas = document.getElementById('canvas-div') 
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}