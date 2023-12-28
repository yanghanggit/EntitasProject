/**
 * 
 */
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { COMP_ID } from "./ComponentsPreprocessing"
import { EmptyComponent } from "./Components";
import { IReactiveSystem } from "../lib/entitas/interfaces/IReactiveSystem";
import { TriggerOnEvent } from "../lib/entitas/TriggerOnEvent";
import { Entity } from "../lib/entitas/Entity";
import { GroupEventType } from "../lib/entitas/Matcher";
/**
 * 
 */
export class MyReactiveSystem implements IInitializeSystem, ISetPool, IReactiveSystem {
    /**
     * 
     */
    pool: Pool | null = null;
    /**
     * 
     */
    group: Group | null = null;
    /**
     * 
     */
    trigger?: TriggerOnEvent;
    /**
     * 
     */
    initialize() {
    }
    /**
     * 
     */
    execute(entities: Array<Entity>) {
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.trigger = new TriggerOnEvent(Matcher.allOf(COMP_ID(EmptyComponent)), GroupEventType.OnEntityAdded);
    }
}