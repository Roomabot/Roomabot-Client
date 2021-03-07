import  SceneSubject  from './SceneSubject'
import SceneManger from './SceneManager'
import * as THREE from 'three'

export default class Grid{

    // private wave: Wave;

    constructor(private sceneManager: SceneManger){
        const size = 20;
        const divisions = 25;
        const axesHelper = new THREE.AxesHelper( 5 );
        const gridHelper = new THREE.GridHelper( size, divisions );
        sceneManager.addObject( axesHelper );
        sceneManager.addObject(gridHelper)
    }

}