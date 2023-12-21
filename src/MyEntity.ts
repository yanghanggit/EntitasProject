/**
 * 
 */
import { Entity } from '../lib/entitas/Entity';
import { IComponent } from '../lib/entitas/interfaces/IComponent';
import { CID } from './EntitasExtension';
/**
 * 
 */
export class MyEnity extends Entity {
    /**
     * 
     */
    AddComponent<T extends new (...args: any[]) => IComponent>(componentClass: T): InstanceType<T> {
        const componentInstance = new componentClass() as InstanceType<T>;
        this.addComponent(CID(componentClass), componentInstance);
        return componentInstance;
    }
    /**
     * 
     */
    GetComponent<T extends new (...args: any[]) => IComponent>(componentClass: T): InstanceType<T> {
        const componentInstance = this.getComponent(CID(componentClass));
        return componentInstance as InstanceType<T>;
    }
}