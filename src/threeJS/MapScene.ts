import  SceneSubject  from './SceneSubject'
import SceneManger from './SceneManager'
import  { OccupancyGrid } from './OccupancyGrid';

export default class WaveScene{

    private map: OccupancyGrid;

    constructor(private sceneManager: SceneManger){
        this.map = new OccupancyGrid(sceneManager);
    }

}