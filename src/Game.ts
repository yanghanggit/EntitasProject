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
    name: string = '';
    /**
     * 
     */
    scene: Scene | null = null;
    /**
     * 
     */
    constructor(name: string) {
        this.name = name;
    }
    /**
     * 
     */
    startWithScene(scene: Scene) {
        console.log("start:" + this.name);
        this.scene = scene;
        this.scene.start();
    }
    /**
     * 
     */
    update(dt: number) {
        this.scene?.update(dt);
    }
    /**
     * 
     */
    stop() {
        if (this.scene !== null) {
            this.scene.stop();
            this.scene.tearDown();
            this.scene = null;
        }
    }
}