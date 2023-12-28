/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { COMP_ID } from "./ComponentsPreprocessing"
import { MagicComponent, FireBallComponent, FireExplodeComponent, DestroyComponent, AttributesComponent } from "./Components";
import { MyEntity } from "./MyEntity";
import { MyPool } from "./MyPool";
/**
 * 
 */
export class FireBallSystem implements IExecuteSystem, ISetPool {
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
    execute() {
        const entities = this.group1!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const e = entities[i] as MyEntity;
            if (this.flying(e, 1)) {
                this.hitTarget(e);
                e.AddComponent(DestroyComponent);
            }
            else {
                //console.log("fire ball is flying!!!!!!!!");
            }
        }
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
        this.group1 = pool.getGroup(
            Matcher.allOf(COMP_ID(MagicComponent), COMP_ID(FireBallComponent))
        );
    }
    /**
     * 
     */
    private flying(fireball: MyEntity, speed: number): boolean {
        const __FireBallComponent = fireball.GetComponent(FireBallComponent);
        __FireBallComponent.flyingTime -= speed;
        __FireBallComponent.flyingTime = Math.max(0, __FireBallComponent.flyingTime);
        return __FireBallComponent.flyingTime <= 0;
    }
    /**
     * 
     */
    private hitTarget(fireball: MyEntity): boolean {
        const __MagicComponent = fireball.GetComponent(MagicComponent);
        const targetEntity = this.pool!.getEntity(__MagicComponent.target);
        if (targetEntity === null) {
            return false;
        }
        if (targetEntity.HasComponent(FireExplodeComponent)) {
            return true;
        }
        const __FireExplodeComponent = targetEntity.AddComponent(FireExplodeComponent);
        const mageEntity = this.pool!.getEntity(__MagicComponent.src);
        if (mageEntity !== null) {
            const _AttributesComponent = mageEntity.GetComponent(AttributesComponent);
            __FireExplodeComponent.damage = _AttributesComponent.attack * 10000;

        }
        return true;
    }
}