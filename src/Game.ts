/**
 * 
 */
import { Context } from './Context';
import { Scene } from './Scene';
/**
 * 
 */
export class Game {
    /**
     * 
     */
    public name: string = '';
    /**
     * 
     */
    public context: Context = null;
    /**
     * 
     */
    public scene: Scene | null = null;
    /**
     * 
     */
    constructor(name: string, context: Context) {
        this.name = name;
        this.context = context;
    }
    /**
     * 
     */
    public start(scene: Scene) {
        this.context.init();
        this.scene = scene;
        this.scene.start();
    }
    /**
     * 
     */
    public update(dt: number) {
        this.context.update(dt);
        this.scene?.update(dt);
    }
    /**
     * 
     */
    public stop() {
        if (this.scene !== null) {
            this.scene.stop();
            this.scene.tearDown();
            this.scene = null;
        }
    }
}