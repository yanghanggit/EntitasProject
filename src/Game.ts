/**
 * 
 */
import { Scene } from './Scene';
//import { MyDecorators } from './MyDecorators';
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
        // const dec = new MyDecorators("I'am ", "decorator");
        // dec.name = "decorator?"
        // console.log(dec.greet());
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