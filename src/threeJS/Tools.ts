import  SceneSubject  from './SceneSubject'
import * as THREE from 'three'
import SceneManager from './SceneManager';
import { BufferAttribute, BufferGeometry } from 'three';
import { MapData } from './MapData';
import { ThreeCanvas } from './main';
import { OccupancyGrid } from './OccupancyGrid';
import { TOOL } from '../core/tools/model';

export class Tools implements SceneSubject{ 

    private tool:THREE.Object3D
    private currentTool: TOOL
    private raycaster: THREE.Raycaster;

    constructor(private sceneManager: SceneManager, private occupanyGrid: OccupancyGrid){
      this.sceneManager = sceneManager
      this.raycaster = new THREE.Raycaster();
    }
    
    setTool = (tool: TOOL) => {
      this.currentTool = tool
    }

    getSubject(): THREE.Object3D {
      return this.tool
    }

    reset = (toolType: TOOL) => {

    }

    update = () => {
      if (this.currentTool === TOOL.MEASURE){

      }

    }
}