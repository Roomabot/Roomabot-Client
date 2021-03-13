import * as THREE from 'three'
import SceneManager from "../SceneManager";
import { InteractiveTool, Tools } from "../Tools";
import store from '../../app/store'
import { ADJ_CELL_DIST } from '../OccupancyGrid';
import { updateMeasuredDistance } from '../../core/tools/toolReducer';
import { isThisTypeNode } from 'typescript';

/**
 * Allows user to place points across maps
 */
export class DrawTool implements InteractiveTool{

  /**
   * Flag to capture raycast point on the next frame update
   */
  drawing: boolean = false 

  points: THREE.Vector3[] = []
  lines: THREE.Line[] = []
  currentLine: THREE.Line 

  constructor(private controller: Tools, private sceneManager: SceneManager){}
  
  handleMouseDown(event: MouseEvent){
    this.drawing = true
  }
  
  handleMouseUp(event: MouseEvent){
    this.drawing = false
    this.points = []
    if (this.currentLine)
      this.lines.push(this.currentLine)
    this.currentLine = null
  }
  
  active(isActive: boolean){
    if (isActive){
      this.controller.canvas.style.cursor = 'crosshair'
    }
    else{
      this.controller.canvas.style.cursor = 'default'
    }
  }
  
  handleMouseClick(event: MouseEvent){
    // this.addPoint = true
  }

  reset(){
    this.lines.forEach(line => {
      this.sceneManager.removeObject(line)
    })
  }

  draw(points: THREE.Vector3[]) {
    // draw
    if (this.currentLine) this.sceneManager.removeObject(this.currentLine)
    const material = new THREE.LineBasicMaterial( { color: 0xeb4e23, linewidth: 5 } );
    const geometry = new THREE.BufferGeometry().setFromPoints( points )
    this.currentLine = new THREE.Line(geometry, material)
    this.sceneManager.addObject(this.currentLine) 
  }

  update(raycastPoint: THREE.Vector3){
    if (this.drawing){
      this.points.push(raycastPoint)
      this.draw(this.points)
    }
  } 
}