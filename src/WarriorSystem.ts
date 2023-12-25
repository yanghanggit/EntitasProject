/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { CID } from "./ComponentsPreprocessing"
import { HeroComponent, AttributesComponent, WarriorComponent, PackComponent, ItemComponent, FoodComponent, DestroyComponent } from "./Components";
import { MyEntity } from "./MyEntity";
import { MyPool } from "./MyPool";
import { MyUtil } from "./MyUtil";
/**
 * 
 */
export class WarriorSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
    /**
     * 
     */
    pool: MyPool | null = null;
    /**
     * 
     */
    group1: Group | null = null;
    /**
    * 
    */
    group2: Group | null = null;
    /**
     * 
     */
    initialize() {
        const entities = this.group1!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const e = entities[i] as MyEntity;
            this.sayhi(e);
        }
    }
    /**
     * 
     */
    execute() {
        const entities = this.group1!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const e = entities[i] as MyEntity;
            this.autoEatFoodRestoreHealth(e, 0.6);
        }
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
        this.group1 = pool.getGroup(
            Matcher.allOf(CID(HeroComponent), CID(AttributesComponent), CID(WarriorComponent))
        );
        this.group2 = pool.getGroup(
            Matcher.allOf(CID(ItemComponent), CID(FoodComponent))
        );
    }
    /**
    * 
    */
    private sayhi(entity: MyEntity) {
        const __AttributesComponent = entity.GetComponent(AttributesComponent);
        console.log(`My name is ${__AttributesComponent!.name}, I'm a warrior, he!ya!`);
    }
    /**
     * 
     */
    private autoEatFoodRestoreHealth(warrior: MyEntity, healthCheckPoint: number): boolean {
        if (this.checkHealth(warrior) >= healthCheckPoint) {
            return false;
        }
        const foodEntities = this.group2!.getEntities();
        if (foodEntities.length > 0) {
            const foodEntity = MyUtil.randomElementFromArray(foodEntities) as MyEntity;
            const __FoodComponent = foodEntity.GetComponent(FoodComponent);
            const __AttributesComponent = warrior.GetComponent(AttributesComponent);
            //
            const beforeEatFood = __AttributesComponent.health;
            __AttributesComponent.health += 30;
            __AttributesComponent.health = Math.min(__AttributesComponent.health, __AttributesComponent.maxHealth);
            console.log(`${__AttributesComponent!.name}, eat [${__FoodComponent.foodName}], health! from ${beforeEatFood} to ${__AttributesComponent.health}`);
            //
            foodEntity.AddComponent(DestroyComponent);
        }
        return true;
    }
    /**
     * 
     */
    private checkHealth(warrior: MyEntity): number {
        const _AttributesComponent = warrior.GetComponent(AttributesComponent);
        const healthPercent = _AttributesComponent.health / _AttributesComponent.maxHealth;
        return healthPercent;
    }
}