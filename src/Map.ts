/**
 * 
 */
import { Scene } from "./Scene";
import { MyExecuteSystem } from "./MyExecuteSystem";
import { MyReactiveSystem } from "./MyReactiveSystem";
/**
 * 
 */
export class Map {
    /**
     * 
     */
    public name: string = '';
    /**
     * 
     */
    constructor(name: string) {
        this.name = name;
    }
    /**
     * 
     */
    public build(scene: Scene) {
        let systems = scene.systems;
        let myPool = scene.myPool;
        systems.add(myPool.createSystem(MyExecuteSystem));
        systems.add(myPool.createSystem(MyReactiveSystem));
    }
}