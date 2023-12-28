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
    private name: string = '';
    /**
     * 
     */
    public map: Map | null = null;
    /**
     * 
     */
    public systems: Systems | null = null;
    /**
     * 
     */
    public myPool: MyPool | null = null;
    /**
     * 
     */
    private initialized: boolean = false;
    /**
     * 
     */
    private startTime: number = 0;
    /**
     * 
     */
    private lastTime: number = 0;
    /**
     * 
     */
    private dt: number = 0;
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
    public start(): void {
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
    public update(dt: number): void {
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
    public stop(): void {
        console.log("stop:" + this.name);
    }
    /**
     * 
     */
    public tearDown(): void {
        console.log("tearDown:" + this.name);
    }
}