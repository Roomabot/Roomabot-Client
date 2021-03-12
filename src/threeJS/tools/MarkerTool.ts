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
  markers: {[key: number]:THREE.Object3D}
  keyCount: number = 1

  constructor(private controller: Tools, private sceneManager: SceneManager){}
  
  active(isActive: boolean){
    if (isActive){
      this.controller.canvas.style.cursor = 'copy'
    }
    else{
      this.controller.canvas.style.cursor = 'default'
    }
  }
  
  createMarker(){
    let sphereGeometry = new THREE.SphereGeometry( 0.1, 32, 32 );
    let sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    return sphere
  }

  handleMouseClick(event: MouseEvent){
    this.addPoint = true
  }

  reset(){
    Object.keys(this.markers).forEach(key => {
      this.sceneManager.removeObject(this.markers[key])
    })
  }
  
  update(raycastPoint: THREE.Vector3){
    if (this.addPoint){
      let marker = this.createMarker()
      this.sceneManager.addObject(marker)
      marker.position.copy(raycastPoint)
      this.markers[this.keyCount] = marker
      this.keyCount+=1
      this.addPoint = false
      // show label creation
      // dispatch()
    }
  } 
}