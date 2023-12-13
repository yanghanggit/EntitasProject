/**
 * 
 */
import { Entity } from "../lib/entitas/Entity";
import { IComponent } from "../lib/entitas/interfaces/IComponent";
import { Pool } from "../lib/entitas/Pool";
import { COMPONENT_ID_PROPERTY } from "./ComponentsPreprocessing";

export function CID<ComponentClass>(clazz: ComponentClass): number {
    return clazz[COMPONENT_ID_PROPERTY];
}

export function CreateEntity(pool: Pool, name: string): Entity {
    let entity = pool.createEntity('name');
    return entity;
}

export function AddComponent<ComponentClass>(componentClass: ComponentClass,
    en: Entity,
    com: IComponent
): Entity {
    en.addComponent(componentClass[COMPONENT_ID_PROPERTY] as number, com);
    return en;
}

export function GetComponent<ComponentClass>(componentClass: { new(): ComponentClass }, en: Entity,): ComponentClass | null {
    return en.getComponent(componentClass[COMPONENT_ID_PROPERTY]) as ComponentClass;
}



