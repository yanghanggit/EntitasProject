/**
 * 
 */
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { CID } from "./EntitasExtension"
import { EmptyComponent } from "./Components";
import { IReactiveSystem } from "../lib/entitas/interfaces/IReactiveSystem";
import { TriggerOnEvent } from "../lib/entitas/TriggerOnEvent";
import { Entity } from "../lib/entitas/Entity";
import { GroupEventType } from "../lib/entitas/Matcher";
/**
 * 
 */
export class MyReactiveSystem implements IInitializeSystem, ISetPool, IReactiveSystem {

    pool: Pool;
    group: Group;
    trigger: TriggerOnEvent;

    public initialize() {
    }

    public execute(entities: Array<Entity>) {
    }

    public setPool(pool: Pool) {
        this.trigger = new TriggerOnEvent(Matcher.allOf(CID(EmptyComponent)), GroupEventType.OnEntityAdded);
    }
}