/**
 * 
 */
import { Scene } from './Scene';
//import { MyDecorators } from './MyDecorators';
//import { MyPromise } from './MyPromise';
/**
 * 
 */
export class Game {
    /**
     * 
     */
    private name: string = '';
    /**
     * 
     */
    private scene: Scene | null = null;
    /**
     * 
     */
    constructor(name: string) {
        this.name = name;
        
        //测试
        // const dec = new MyDecorators("I'am ", "decorator");
        // dec.name = "decorator?"
        // console.log(dec.greet());

        // 测试
        // const promise = new MyPromise();
        // promise.run();
    }
    /**
     * 
     */
    public startWithScene(scene: Scene): void {
        console.log("start:" + this.name);
        this.scene = scene;
        this.scene.start();
    }
    /**
     * 
     */
    public update(dt: number): void {
        this.scene?.update(dt);
    }
    /**
     * 
     */
    public stop(): void {
        if (this.scene !== null) {
            this.scene.stop();
            this.scene.tearDown();
            this.scene = null;
        }
    }
}