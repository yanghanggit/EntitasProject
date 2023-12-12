import { Scene } from "./Scene";
import { MovementSystem } from "./MovementSystem";

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
        systems.add(pool.createSystem(MovementSystem))
    }
}