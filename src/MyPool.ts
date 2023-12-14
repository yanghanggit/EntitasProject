/**
 * 
 */
import { Pool } from '../lib/entitas/Pool';
import { Scene } from './Scene';
import { Components } from './ComponentsPreprocessing';
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
        super({}, Components.length, false);
        this.name = name;
        this.scene = scene;
    }
}