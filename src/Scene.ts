/**
 * 
 */
import { Map } from './Map';
import { Systems } from '../lib/entitas/Systems';
import { Pool } from '../lib/entitas/Pool';
import { Components } from './ComponentsPreprocessing';

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
    pool: Pool;

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
        // console.log("start:" + this.name);
        // console.log("start map:" + this.map?.name);
        //
        this.pool = new Pool({}, Components.length, false);
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