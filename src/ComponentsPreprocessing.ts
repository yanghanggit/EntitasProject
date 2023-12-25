/**
 * 
 */
import { Entity } from "../lib/entitas/Entity";
import { components_collector } from "./Components";
/**
 * 
 */
export const COMPONENTS: Function[] = [...components_collector];
Entity.initialize(COMPONENTS.length, { "entities": 200, "components": 128 });
/**
 * 
 */
export const COMPONENT_ID_PROPERTY: string = 'component_id';
(function () {
    for (let i = 0; i < COMPONENTS.length; i++) {
        const comClass = COMPONENTS[i] as any;
        comClass[COMPONENT_ID_PROPERTY] = i;
    }
})();
/**
 * 
 */
export function CID<ComponentClass>(clazz: ComponentClass): number {
    return (clazz as any)[COMPONENT_ID_PROPERTY] as number;
}





