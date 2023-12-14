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
        let pool = scene.pool;
        systems.add(pool.createSystem(MyExecuteSystem));
        systems.add(pool.createSystem(MyReactiveSystem));
    }
}