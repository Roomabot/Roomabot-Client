import * as THREE from 'three'
import SceneManager from "../SceneManager";
import { InteractiveTool, Tools } from "../Tools";
import store from '../../app/store'
import { ADJ_CELL_DIST } from '../OccupancyGrid';
import { updateMeasuredDistance } from '../../core/tools/toolReducer';

/**
 * Allows user to place points across maps
 */
export class MarkerTool implements InteractiveTool{

  /**
   * Flag to capture raycast point on the next frame update
   */
  addPoint: boolean = false 

  points: THREE.Vector3[]
  markers: THREE.Object3D[]

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

  reset(){
    this.markers.forEach(marker => {
      this.sceneManager.removeObject(marker)
    })
  }
  
  update(raycastPoint: THREE.Vector3){
    if (this.addPoint){
      this.
      this.addPoint = false
    }
  } 
}