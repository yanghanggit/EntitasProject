/**
 * 
 */
import { Pool } from '../lib/entitas/Pool';
import { Scene } from './Scene';
import { COMPONENTS } from './ComponentsPreprocessing';
import { Entity } from '../lib/entitas/Entity';
import { MyEntity } from './MyEntity';
/**
 * 
 */
export class MyPool extends Pool {
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
    public override impl(_componentsEnum: {}, _totalComponents: number): Entity {
        return new MyEntity(_componentsEnum, _totalComponents) as Entity;
    }
    /**
     * 
     */
    constructor(name: string, scene: Scene) {
        super({}, COMPONENTS.length, false);
        this.name = name;
        this.scene = scene;
    }
    /**
     * 
     */
    public getEntity(entityId: string): MyEntity {
        return this._entities[entityId] as MyEntity;
    }
}