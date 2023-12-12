import { Scene } from "./Scene";

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


    public build(scene: Scene) {
        // console.log("start:" + this.name);
        // console.log("start map:" + this.map?.name);
        // this.systems = this.createSystems(Pools.pool);
        // this.systems.initialize();
    }
}