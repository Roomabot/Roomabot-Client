import  SceneSubject  from './SceneSubject'
import * as THREE from 'three'
import SceneManager from './SceneManager';
import { Vector3 } from 'three';
import { OccupancyGrid } from './OccupancyGrid';
import { TOOL } from '../core/tools/model';
import { MeasureTool } from './tools/MeasureTool';
import { MarkerTool } from './tools/MarkerTool';
import { DrawTool } from './tools/DrawTool';

export interface InteractiveTool {
  /**
   *  Should reset any drawn objects on map
   */
  reset: () => void
  /**
   * Event loop call.
   * Should do any intersection/other
   */
  update: (raycastPoint: Vector3) => void

  /**
   * Called whenever tool is selected/deselcted  
   */
  active: (isActive: boolean) => void
  
  /**
   * Called when there is a mouse click
   */
  handleMouseClick: (event: MouseEvent) => void

  /**
   * Called when mouse is pressed 
   */
  handleMouseDown: (event: MouseEvent) => void
  
  /**
   * Called when mouse is let go
   */
  handleMouseUp: (event: MouseEvent) => void
}

export class Tools implements SceneSubject{ 

  private tool:THREE.Object3D
  private currentTool: InteractiveTool
  private raycaster: THREE.Raycaster;
  private mousePos: THREE.Vector2;
  sphereGeometry: THREE.SphereGeometry;
  sphereMaterial: THREE.MeshBasicMaterial;
  RAYCAST_THRESHOLD: number = 0.1;
  sphere: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  canvas: HTMLElement;
  measurePoints: THREE.Object3D[]
  tools: {};
  public resolution: number
  // toolData: 
  constructor(private sceneManager: SceneManager, private occupanyGrid: OccupancyGrid){
    this.sceneManager = sceneManager
    this.canvas = document.getElementById('canvas-div') 

    this.tools = {
      [TOOL.PAN]: null, 
      [TOOL.MEASURE]: new MeasureTool(this, sceneManager),
      [TOOL.MARKER]: new MarkerTool(this, sceneManager),
      [TOOL.OVERLAY]: new DrawTool(this, sceneManager)
    }
    this.tool = new THREE.Object3D();    

    this.initEventListeners()
    this.initRaycaster()
    
    this.currentTool = this.tools[0]
    this.sceneManager.addSubject(this)
  }

  initRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.raycaster.params.Points.threshold = this.RAYCAST_THRESHOLD;
  }

  initEventListeners() {
    this.mousePos = new THREE.Vector2();
    document.addEventListener( 'mousemove', this.onDocumentMouseMove );
    this.canvas.addEventListener( 'click', this.handleClick);
    this.canvas.addEventListener( 'mousedown', this.handleMouseDown);
    this.canvas.addEventListener( 'mouseup', this.handleMouseUp);
  }
  handleMouseDown = (event: MouseEvent) =>{
    if (this.currentTool){
      this.currentTool.handleMouseDown(event)
   }
  }
  handleMouseUp = (event: MouseEvent) => {
    this.currentTool.handleMouseUp(event)
  }
  
  onDocumentMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
    this.mousePos.x = ( event.offsetX  / width ) * 2 - 1;
    this.mousePos.y = - ( event.offsetY / height ) * 2 + 1;
  }

  handleClick = (mouseEvent: MouseEvent) => {

    if (this.currentTool){
       this.currentTool.handleMouseClick(mouseEvent)
    }
  //   this.sphereGeometry = new THREE.SphereGeometry( 0.1, 32, 32 );
  //   this.sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  //   this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial)
  //   this.sceneManager.addObject(this.sphere)
  //   this.sceneManager.addSubject( this )
  }

  setupClickListener(callback: (event: MouseEvent) => any){
    this.canvas.addEventListener('click', callback)
  }

  /**
   * Returns the map resolution.
   * If map data not found, it returns 1.
   */
  getResolution = () => {
    let mapData = this.occupanyGrid.getMapData()
    if (!mapData) return 1
    else return mapData.info.resolution
  }
  

  /**
   * Updates the tool selection and activates the feature for map
   * @param tool Tool Selection
   */
  setTool = (tool: TOOL) => {
    const orbitControls = this.sceneManager.getControls()
    
    // deactivate last tool
    if (this.currentTool) this.currentTool.active(false)

    this.currentTool = this.tools[tool] 
    if (tool === TOOL.PAN){
      orbitControls.enabled = true
    }
    else {
      this.currentTool.active(true)
      orbitControls.enabled = false
    }
  }

  getSubject(): THREE.Object3D {
    return this.tool
  }

  reset = () => {

  }

  update = () => {
    const points = this.occupanyGrid.getSubject()
    if (!this.currentTool || !points) return
    this.raycaster.setFromCamera(this.mousePos, this.sceneManager.getCamera())
    let intersections = this.raycaster.intersectObject( points );
    let intersect = ( intersections.length ) > 0 ? intersections[0] : null;
    if (intersect !== null){
      this.currentTool.update(intersect.point)
      // this.sphere.position.copy(intersect.point)
      // this.sphere.scale.set(1,1,1)
    }
  }
}