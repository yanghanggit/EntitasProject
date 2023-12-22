/**
 * 
 */
import { Pool } from '../lib/entitas/Pool';
import { Scene } from './Scene';
import { COMPONENTS } from './ComponentsPreprocessing';
import { Entity } from '../lib/entitas/Entity';
import { MyEnity } from './MyEntity';
/**
 * 
 */
export class MyPool extends Pool {
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
     * @param name 
     */
    override impl(_componentsEnum: {}, _totalComponents: number): Entity {
        return new MyEnity(_componentsEnum, _totalComponents) as Entity;
    }
    /**
     * 
     */
    constructor(name: string, scene: Scene) {
        super({}, COMPONENTS.length, false);
        this.name = name;
        this.scene = scene;
    }
}