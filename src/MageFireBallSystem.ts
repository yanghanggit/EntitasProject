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
export class MageFireBallSystem implements IExecuteSystem, ISetPool {
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
    public execute(): void {
        const entities = this.group1?.getEntities();
        entities?.forEach(en => {
            const fireballEntity = en as MyEntity;
            if (this.fireballIsFlying(fireballEntity, 1)) {
                this.fireballHitTarget(fireballEntity, 10000);
                fireballEntity.AddComponent(DestroyComponent);
            }
            else {
            }
        });
    }
    /**
     * 
     */
    public setPool(pool: Pool): void {
        this.pool = pool as MyPool;
        this.group1 = pool.getGroup(
            Matcher.allOf(COMP_ID(MagicComponent), COMP_ID(FireBallComponent))
        );
    }
    /**
     * 
     */
    private fireballIsFlying(fireball: MyEntity, speed: number): boolean {
        const fireBallComponent = fireball.GetComponent(FireBallComponent);
        fireBallComponent.flyingTime -= speed;
        fireBallComponent.flyingTime = Math.max(0, fireBallComponent.flyingTime);
        return fireBallComponent.flyingTime <= 0;
    }
    /**
     * 
     */
    private getFireballsTarget(fireball: MyEntity): MyEntity | null {
        const magicComponent = fireball.GetComponent(MagicComponent);
        const targetEntity = this.pool!.getEntity(magicComponent.target);
        return targetEntity;
    }
    /**
     * 
     */
    private getCasterWhoReleasedFireball(fireball: MyEntity): MyEntity | null {
        const magicComponent = fireball.GetComponent(MagicComponent);
        const srcTarget = this.pool!.getEntity(magicComponent.src);
        return srcTarget;
    }
    /**
     * 
     */
    private fireballHitTarget(fireball: MyEntity, amplifiesDamageByFireball: number): boolean {
        const targetEntity = this.getFireballsTarget(fireball);
        if (targetEntity === null) {
            return false;
        }
        if (targetEntity.HasComponent(FireExplodeComponent)) {
            return true;
        }
        const fireExplodeComponent = targetEntity.AddComponent(FireExplodeComponent);
        //
        const whoReleasedFireball = this.getCasterWhoReleasedFireball(fireball);
        if (whoReleasedFireball !== null) {
            //传递法师的伤害
            const attributesComponent = whoReleasedFireball.GetComponent(AttributesComponent);
            fireExplodeComponent.damage = attributesComponent.attack * amplifiesDamageByFireball;
        }
        else {
            //法师可能死了，保留原始的伤害
        }
        return true;
    }
}