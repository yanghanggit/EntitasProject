/**
 * 
 */
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
    public scene: Scene | null = null;
    /**
     * 
     */
    constructor(name: string) {
        this.name = name;
    }
    /**
     * 
     */
    public startWithScene(scene: Scene) {
        console.log("start:" + this.name);
        this.scene = scene;
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