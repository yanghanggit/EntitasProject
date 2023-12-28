/**
 * 
 */
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { COMP_ID } from "./ComponentsPreprocessing"
import { AttributesComponent, FireBurningComponent, FireExplodeComponent, MonsterComponent } from "./Components";
import { IReactiveSystem } from "../lib/entitas/interfaces/IReactiveSystem";
import { TriggerOnEvent } from "../lib/entitas/TriggerOnEvent";
import { Entity } from "../lib/entitas/Entity";
import { GroupEventType } from "../lib/entitas/Matcher";
import { MyEntity } from "./MyEntity";
import { MyPool } from "./MyPool";
/**
 * 
 */
export class MageFireBallExplodeSystem implements ISetPool, IReactiveSystem {
    /**
     * 
     */
    private pool: MyPool | null = null;
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
        const splashTargets = this.group!.getEntities();
        entities.forEach((en) => {
            const me = (en as MyEntity);
            this.fireballExpolde(me);
            me.RemoveComponent(FireExplodeComponent);
            this.fireballSplash(me, splashTargets ?? []);
        });
    }
    /**
     * 
     */
    public setPool(pool: Pool): void {
        this.pool = pool as MyPool;
        this.trigger = new TriggerOnEvent(Matcher.allOf(COMP_ID(FireExplodeComponent)), GroupEventType.OnEntityAdded);
        this.group = pool.getGroup(Matcher.allOf(
            COMP_ID(MonsterComponent), COMP_ID(AttributesComponent)
        ));
    }
    /**
     * 
     */
    private fireballExpolde(target: MyEntity): void {
        const fireExplodeComponent = target.GetComponent(FireExplodeComponent);
        const attributesComponent = target.GetComponent(AttributesComponent);
        if (!fireExplodeComponent || !attributesComponent) return;

        attributesComponent.health -= fireExplodeComponent.damage;
        attributesComponent.health = Math.max(attributesComponent.health, 0);
        console.log(`💥 Kaboom! The fireball detonates in a fiery blaze! Poor ${attributesComponent.name} screams in shock, taking ${fireExplodeComponent.damage} damage! Now at ${attributesComponent.health} health and dropping...`);

    }
    /**
     * 
     */
    private fireballSplash(center: MyEntity, targets: Array<Entity>): void {
        targets.forEach((en) => {
            const me = (en as MyEntity);
            if (me == center) {
                return;
            }
            if (!me.HasComponent(FireBurningComponent)) {
                me.AddComponent(FireBurningComponent);
                const attributesComponent = me.GetComponent(AttributesComponent);
                console.log(`🔥 Whoosh! The flames catch on ${attributesComponent.name}, igniting a fiery dance! It's getting hot in here!`);
            }
        });
    }
}