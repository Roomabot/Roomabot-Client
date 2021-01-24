import  SceneSubject  from './SceneSubject'
import SceneManger from './SceneManager'
import * as THREE from 'three'

export default class Grid{

    // private wave: Wave;

    constructor(private sceneManager: SceneManger){
        const size = 20;
        const divisions = 200;

        const gridHelper = new THREE.GridHelper( size, divisions );
        sceneManager.addObject(gridHelper)
    }

}