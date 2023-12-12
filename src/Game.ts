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
    public context: Context = new Context();
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
        this.scene = scene;
        this.context.start();
        this.scene.start();
    }
    /**
     * 
     */
    public update(dt: number) {
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