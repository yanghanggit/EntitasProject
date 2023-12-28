/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { COMP_ID } from "./ComponentsPreprocessing"
import { AttributesComponent, FireBurningComponent } from "./Components";
import { MyEntity } from "./MyEntity";
/**
 * 
 */
export class DOTSystem implements IExecuteSystem, ISetPool {
    /**
     * 
     */
    private pool: Pool | null = null;
    /**
     * 
     */
    private group1: Group | null = null;
    /**
     * 
     */
    public execute(): void {
        this.burning();
    }
    /**
     * 
     */
    public setPool(pool: Pool): void {
        this.pool = pool;
        this.group1 = pool.getGroup(
            Matcher.allOf(COMP_ID(FireBurningComponent), COMP_ID(AttributesComponent))
        );
    }
    /**
     * 
     */
    private burning(): void {
        const entities = this.group1?.getEntities();
        entities?.forEach(en => {
            const me = en as MyEntity;
            this.applyBurningDamage(me);
        });
    }
    /**
     * 
     */
    private applyBurningDamage(entity: MyEntity): void {
        const fireBurningComponent = entity.GetComponent(FireBurningComponent);
        if (!fireBurningComponent) return;

        fireBurningComponent.burningCooldown--;
        fireBurningComponent.burningCooldown = Math.max(0, fireBurningComponent.burningCooldown);

        if (fireBurningComponent.burningCooldown === 0) {
            fireBurningComponent.burningCooldown = fireBurningComponent.burningCooldownMax;
            this.reduceHealth(entity);
        }
    }
    /**
     * 
     * @param entity 
     * @returns 
     */
    private reduceHealth(entity: MyEntity): void {
        const attributesComponent = entity.GetComponent(AttributesComponent);
        if (!attributesComponent) return;

        if (attributesComponent.health > 0) {
            attributesComponent.health -= 10;
            attributesComponent.health = Math.max(0, attributesComponent.health);
            console.log(`${attributesComponent.name} feels the scorching pain of the burns and yells out in agony. Remaining health: ${attributesComponent.health}`);
        }
    }
}