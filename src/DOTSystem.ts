/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { CID } from "./ComponentsPreprocessing"
import { AttributesComponent, FireBurningComponent } from "./Components";
import { MyEntity } from "./MyEntity";
/**
 * 
 */
export class DOTSystem implements IExecuteSystem, ISetPool {
    /**
     * 
     */
    pool: Pool | null = null;
    /**
     * 
     */
    group1: Group | null = null;
    /**
     * 
     */
    execute() {
        this.burning();
    }
    /**
     * 
     */
    private burning() {
        const entities = this.group1!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const me = entities[i] as MyEntity;
            //
            const __FireBurningComponent = me.GetComponent(FireBurningComponent);
            --__FireBurningComponent.burningCooldown;
            __FireBurningComponent.burningCooldown = Math.max(0, __FireBurningComponent.burningCooldown);
            if (__FireBurningComponent.burningCooldown > 0) {
                continue;
            }
            __FireBurningComponent.burningCooldown = __FireBurningComponent.burningCooldownMax;
            //
            const __AttributesComponent = me.GetComponent(AttributesComponent);
            __AttributesComponent.health -= 10;
            __AttributesComponent.health = Math.max(0, __AttributesComponent.health);
            console.log(`${__AttributesComponent!.name} shouted: It’s so hot!!!, health ${__AttributesComponent!.health}`);
        }
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool;
        this.group1 = pool.getGroup(
            Matcher.allOf(CID(FireBurningComponent), CID(AttributesComponent))
        );
    }
}