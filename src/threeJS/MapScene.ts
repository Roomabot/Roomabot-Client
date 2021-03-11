import  SceneSubject  from './SceneSubject'
import SceneManger from './SceneManager'
import  { OccupancyGrid } from './OccupancyGrid';
import { Tools } from './Tools';

export default class MapScene{

    private map: OccupancyGrid;
    private tools: Tools

    constructor(private sceneManager: SceneManger){
        this.map = new OccupancyGrid(sceneManager);
        this.tools = new Tools(sceneManager, this.map)

    }

    getOccupancyGrid = () => {
        return this.map
    }

    getTools = () => {
        return this.tools
    }
}