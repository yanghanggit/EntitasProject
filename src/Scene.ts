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
    systems: Systems;
    /**
     * 
     */
    myPool: MyPool;

    /**
     * 
     */
    initialized: boolean = false;
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
        this.myPool = new MyPool(this.name + "'s Pool", this);
        this.systems = new Systems();
        this.map.build(this);

    }
    /**
     * 
     */
    public update(dt: number) {
        console.log("update:" + this.name);
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