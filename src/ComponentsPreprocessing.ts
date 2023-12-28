/**
 * 
 */
import { Entity } from "../lib/entitas/Entity";
import { components_collector } from "./Components";
import { IComponent } from "../lib/entitas/interfaces/IComponent";
/**
 * 
 */
export const COMPONENTS: Array<new () => IComponent> = [...components_collector];
/**
 * 
 */
const componentIdMap = new Map<new () => IComponent, number>();
/**
 * 
 */
(function () {

    Entity.initialize(COMPONENTS.length, { "entities": 200, "components": 128 });

    // 初始化组件 ID
    for (let i = 0; i < COMPONENTS.length; i++) {
        const comClass = COMPONENTS[i];
        componentIdMap.set(comClass, i);
    }
})();
/**
 * 
 */
function getComponentId<T extends new () => IComponent>(clazz: T): number {
    const id = componentIdMap.get(clazz);
    if (id === undefined) {
        throw new Error('Component ID not found');
    }
    return id;
}
/**
 * COMP_ID
 */
export function COMP_ID<T extends new () => IComponent>(clazz: T): number {
    return getComponentId(clazz);
}







