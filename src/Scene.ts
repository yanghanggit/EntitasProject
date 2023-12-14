/**
 * 
 */
import { Map } from './Map';
import { Systems } from '../lib/entitas/Systems';
import { MyPool } from './MyPool';

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
    systems: Systems = null;
    /**
     * 
     */
    myPool: MyPool = null;

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
    public start() {
        //
        this.startTime = performance.now() / 1000;
        this.lastTime = 0;
        this.dt = 0;
        //
        this.myPool = new MyPool(this.name + "'s Pool", this);
        this.systems = new Systems();
        this.map.build(this);

    }
    /**
     * 
     */
    public update(dt: number) {
        //
        this.dt = dt;
        this.lastTime += dt;
        //
        if (!this.initialized) {
            this.initialized = true;
            this.systems.initialize();
        }
        this.systems.execute();
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