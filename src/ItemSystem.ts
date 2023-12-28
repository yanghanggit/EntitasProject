/**
 * 
 */
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { COMP_ID } from "./ComponentsPreprocessing"
import { ItemComponent } from "./Components";
import { IReactiveSystem } from "../lib/entitas/interfaces/IReactiveSystem";
import { TriggerOnEvent } from "../lib/entitas/TriggerOnEvent";
import { Entity } from "../lib/entitas/Entity";
import { GroupEventType } from "../lib/entitas/Matcher";
import { MyEntity } from "./MyEntity";
/**
 * 
 */
export class ItemSystem implements ISetPool, IReactiveSystem {
    /**
     * 
     */
    private pool: Pool | null = null;
    /**
     * 
     */
    private group: Group | null = null;
    /**
     * 
     */
    public trigger?: TriggerOnEvent;
    /**
     * 
     */
    public execute(entities: Array<Entity>): void {
        entities.forEach((en) => {
            const itemEntity = en as MyEntity;
            if (itemEntity.HasComponent(ItemComponent)) {
                this.onAddItem(itemEntity);
            }
            else {
                this.onRemoveItem(itemEntity);
            }
        });
    }
    /**
     * 
     */
    private onAddItem(_itemEntity: MyEntity): void {
    }
    /**
     * 
     */
    private onRemoveItem(_itemEntity: MyEntity): void {
    }
    /**
     * 
     */
    public setPool(pool: Pool): void {
        this.trigger = new TriggerOnEvent(Matcher.allOf(COMP_ID(ItemComponent)), GroupEventType.OnEntityAdded);
    }
}