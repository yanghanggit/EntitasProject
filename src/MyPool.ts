/**
 * 
 */
import { Pool } from '../lib/entitas/Pool';
import { Scene } from './Scene';
import { COMPONENTS } from './Components';
/**
 * 
 */
export class MyPool extends Pool {
    /**
     * 
     */
    name: string;
    /**
     * 
     */
    scene: Scene;
    /**
     * 
     */
    constructor(name: string, scene: Scene) {
        super({}, COMPONENTS.length, false);
        this.name = name;
        this.scene = scene;
    }
}