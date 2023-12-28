/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { COMP_ID } from "./ComponentsPreprocessing"
import { HeroComponent, AttributesComponent, WarriorComponent, ItemComponent, FoodComponent, DestroyComponent } from "./Components";
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
    private pool: MyPool | null = null;
    /**
     * 
     */
    private group1: Group | null = null;
    /**
    * 
    */
    private group2: Group | null = null;
    /**
     * 
     */
    public initialize(): void {
        const entities = this.group1!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const e = entities[i] as MyEntity;
            this.sayhi(e);
        }
    }
    /**
     * 
     */
    public execute(): void {
        const entities = this.group1!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const e = entities[i] as MyEntity;
            const warriorComponent = e.GetComponent(WarriorComponent);
            this.autoEatFoodRestoreHealth(e, warriorComponent.autoEatFoodRestoreHealthCheckPoint);
        }
    }
    /**
     * 
     */
    public setPool(pool: Pool): void {
        this.pool = pool as MyPool;
        this.group1 = pool.getGroup(
            Matcher.allOf(COMP_ID(HeroComponent), COMP_ID(AttributesComponent), COMP_ID(WarriorComponent))
        );
        this.group2 = pool.getGroup(
            Matcher.allOf(COMP_ID(ItemComponent), COMP_ID(FoodComponent))
        );
    }
    /**
    * 
    */
    private sayhi(entity: MyEntity): void {
        const attributesComponent = entity.GetComponent(AttributesComponent);
        console.log(`"Stand aside! I am ${attributesComponent!.name}, the indomitable warrior! He! Ya!" roars the valiant fighter, brandishing their weapon.`);
    }
    /**
     * 
     */
    private autoEatFoodRestoreHealth(warrior: MyEntity, healthCheckPoint: number): boolean {
        if (this.checkHealth(warrior) >= healthCheckPoint) {
            return false;
        }
        const foodEntity = this.getFood();
        if (foodEntity === null) {
            return false;
        }
        this.warriorEatFood(warrior, foodEntity);
        return true;
    }
    /**
     * 
     */
    private checkHealth(warrior: MyEntity): number {
        const attributesComponent = warrior.GetComponent(AttributesComponent);
        const healthPercent = attributesComponent.health / attributesComponent.maxHealth;
        return healthPercent;
    }
    /**
     * 
     */
    private getFood(): MyEntity | null {
        const foodEntities = this.group2!.getEntities();
        if (foodEntities.length > 0) {
            return MyUtil.randomElementFromArray(foodEntities) as MyEntity;
        }
        return null;
    }
    /**
     * 
     */
    private warriorEatFood(warrior: MyEntity, food: MyEntity): void {
        const foodComponent = food.GetComponent(FoodComponent);
        const attributesComponent = warrior.GetComponent(AttributesComponent);
        //
        const beforeEat = attributesComponent.health;
        attributesComponent.health += 30;
        attributesComponent.health = Math.min(attributesComponent.health, attributesComponent.maxHealth);
        console.log(`${attributesComponent!.name} devours [${foodComponent.foodName}], feeling their strength surge! Health restored from ${beforeEat} to ${attributesComponent.health}. "Ah, that hit the spot!" they exclaim.`);
        //
        food.AddComponent(DestroyComponent);
    }
}