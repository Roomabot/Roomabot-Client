import  SceneSubject  from './SceneSubject'
import SceneManger from './SceneManager'
import { Map } from './GridMap';

export default class WaveScene{

    private map: Map;

    constructor(private sceneManager: SceneManger){
        this.map = new Map(sceneManager);
    }

}