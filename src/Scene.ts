/**
 * 
 */
import { Map } from './Map';
import { Systems } from '../lib/entitas/Systems';
import { MyPool } from './MyPool';
/**
 * 
 */
export class Scene {
    /**
     * 
     */
    name: string = '';
    /**
     * 
     */
    map: Map | null = null;
    /**
     * 
     */
    systems: Systems | null = null;
    /**
     * 
     */
    myPool: MyPool | null = null;

    /**
     * 
     */
    initialized: boolean = false;

    /**
     * 
     */
    startTime: number = 0;
    /**
     * 
     */
    lastTime: number = 0;
    /**
     * 
     */
    dt: number = 0;
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
    start() {
        console.log("start:" + this.name);
        //
        this.myPool = new MyPool(this.name + "'s Pool", this);
        this.systems = new Systems();
        this.map?.build(this);
        //
        this.startTime = performance.now() / 1000;
        this.lastTime = 0;
        this.dt = 0;
    }
    /**
     * 
     */
    update(dt: number) {
        //
        this.dt = dt;
        this.lastTime += dt;
        if (this.systems !== null) {
            if (!this.initialized) {
                this.initialized = true;
                this.systems.initialize();
            }
            this.systems.execute();
        }

    }
    /**
     * 
     */
    stop() {
        console.log("stop:" + this.name);
    }
    /**
     * 
     */
    tearDown() {
        console.log("tearDown:" + this.name);
    }
}