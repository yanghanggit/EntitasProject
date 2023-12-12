/**
 * 
 */
import { Map } from './Map';
//import { Context } from './Context';
/**
 * 
 */
export class Scene {
    /**
     * 
     */
    public name: string = '';
    /**
     * 
     */
    public map: Map | null = null;
    /**
     * 
     */
    constructor(name: string, map: Map) {
        this.name = name;
        this.map = map;
    }
    /**
     * 
     */
    public start() {
        console.log("start:" + this.name);
        console.log("start map:" + this.map?.name);
    }
    /**
     * 
     */
    public update(dt: number) {
        console.log("update:" + this.name);
    }
    /**
     * 
     */
    public stop() {
        console.log("stop:" + this.name);
    }
    /**
     * 
     */
    public tearDown() {
        console.log("tearDown:" + this.name);
    }
}