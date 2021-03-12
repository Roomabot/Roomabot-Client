import * as THREE from 'three'
import SceneManager from "../SceneManager";
import { InteractiveTool, Tools } from "../Tools";
import store from '../../app/store'
import { ADJ_CELL_DIST } from '../OccupancyGrid';
import { updateMeasuredDistance } from '../../core/tools/toolReducer';

/**
 * Measures distance between two points
 */
export class MeasureTool implements InteractiveTool{
  


  /**
   * Flag to capture raycast point on the next frame update
   */
  addPoint: boolean = false 

  points: THREE.Vector3[] = []
  line: THREE.Line;

  constructor(private controller: Tools, private sceneManager: SceneManager){}
  
  active(isActive: boolean){
    if (isActive){
      this.controller.canvas.style.cursor = 'crosshair'
    }
    else{
      this.controller.canvas.style.cursor = 'default'
    }
  }
  
  handleMouseClick(event: MouseEvent){
    this.addPoint = true
  }
  /**
   * Sets up markers
   */
  // setupMeasureTool(){
    
  //   let sphereGeometry = new THREE.SphereGeometry( 0.1, 32, 32 );
  //   let sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  //   this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  //   this.sceneManager.addObject(this.sphere)
  //   this.sceneManager.addSubject( this )
  //   this.setupClickListener(this.handleMeasureClick)
  // }

  reset(){}
  
  update(raycastPoint: THREE.Vector3){
    if (this.addPoint){
      if (this.points.length === 2){
        this.points = []
      }
      this.points.push(raycastPoint)
      if (this.points.length === 2)
        this.drawAndMeasure(this.points)
      this.addPoint = false
    }
    else if (this.points.length === 1){
      this.drawAndMeasure([this.points[0], raycastPoint])
    }
  }

  getDistance(pointA: THREE.Vector3, pointB: THREE.Vector3){
    let resolution = this.controller.getResolution()
    let xDist = (pointA.x/ADJ_CELL_DIST - pointB.x/ADJ_CELL_DIST)*resolution
    let yDist = (pointA.y/ADJ_CELL_DIST - pointB.y/ADJ_CELL_DIST)*resolution
    return Math.sqrt(xDist**2 + yDist**2)
  }

  drawAndMeasure(points: THREE.Vector3[]) {
    // draw
    const material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 3 } );
    const geometry = new THREE.BufferGeometry().setFromPoints( points )
    if (this.line) this.sceneManager.removeObject(this.line)
    this.line = new THREE.Line(geometry, material)
    this.sceneManager.addObject(this.line)
    
    // measure
    store.dispatch(updateMeasuredDistance(this.getDistance(points[0], points[1])))
  }

}