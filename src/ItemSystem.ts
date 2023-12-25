/**
 * 
 */
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { CID } from "./ComponentsPreprocessing"
import { FoodComponent, ItemComponent } from "./Components";
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
    execute(entities: Array<Entity>) {
        entities.forEach((itemEntity) => {
            const _itemEntity = itemEntity as MyEntity;
            if (_itemEntity.HasComponent(ItemComponent)) {
                this.onAddItem(_itemEntity);
            }
            else {
                this.onRemoveItem(_itemEntity);
            }
        });
    }
    /**
     * 
     */
    private onAddItem(_itemEntity: MyEntity) {
        if (_itemEntity.HasComponent(FoodComponent)) {
            const __FoodComponent = _itemEntity.GetComponent(FoodComponent);
            //console.log("add food = " + __FoodComponent.foodName);
        }
    }
    /**
     * 
     */
    private onRemoveItem(_itemEntity: MyEntity) {
        //console.log("__________________________onRemoveItem!!!!!");
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.trigger = new TriggerOnEvent(Matcher.allOf(CID(ItemComponent)), GroupEventType.OnEntityAdded);
    }
}