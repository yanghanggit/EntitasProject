/**
 * 
 */
import { Entity } from "../lib/entitas/Entity";
import { IComponent } from "../lib/entitas/interfaces/IComponent";
import { Pool } from "../lib/entitas/Pool";
import { COMPONENT_ID_PROPERTY } from "./ComponentsPreprocessing";
/**
 * 
 */
export function CID<ComponentClass>(clazz: ComponentClass): number {
    return (clazz as any)[COMPONENT_ID_PROPERTY] as number;
}
/**
 * 
 */
export function HasComponent<ComponentClass>(componentClass: { new(): ComponentClass }, en: Entity,): ComponentClass | null {
    return en.hasComponent((componentClass as any)[COMPONENT_ID_PROPERTY]) as ComponentClass;
}

