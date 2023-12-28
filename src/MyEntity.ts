/**
 * 
 */
import { Entity } from '../lib/entitas/Entity';
import { IComponent } from '../lib/entitas/interfaces/IComponent';
import { COMP_ID } from './ComponentsPreprocessing';
/**
 * 
 */
export class MyEntity extends Entity {
    /**
     * 
     */
    public AddComponent<T extends new (...args: any[]) => IComponent>(componentClass: T): InstanceType<T> {
        const componentInstance = new componentClass() as InstanceType<T>;
        this.addComponent(COMP_ID(componentClass), componentInstance);
        return componentInstance;
    }
    /**
     * 
     */
    public GetComponent<T extends new (...args: any[]) => IComponent>(componentClass: T): InstanceType<T> {
        const componentInstance = this.getComponent(COMP_ID(componentClass));
        return componentInstance as InstanceType<T>;
    }
    /**
     * 
     */
    public HasComponent<T extends new (...args: any[]) => IComponent>(componentClass: T): boolean {
        return this.hasComponent(COMP_ID(componentClass));
    }
    /**
     * 
     */
    public RemoveComponent<T extends new (...args: any[]) => IComponent>(componentClass: T): MyEntity {
        const componentInstance = new componentClass() as InstanceType<T>;
        return this.removeComponent(COMP_ID(componentClass)) as MyEntity;

    }
}