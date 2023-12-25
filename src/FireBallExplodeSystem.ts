/**
 * 
 */
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { CID } from "./ComponentsPreprocessing"
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
export class FireBallExplodeSystem implements ISetPool, IReactiveSystem {
    /**
     * 
     */
    pool: MyPool | null = null;
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
        const splashTargets = this.group!.getEntities();
        entities.forEach((en) => {
            const me = (en as MyEntity);
            this.handleExpolde(me);
            me.RemoveComponent(FireExplodeComponent);
            this.splash(me, splashTargets);
        });
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
        this.trigger = new TriggerOnEvent(Matcher.allOf(CID(FireExplodeComponent)), GroupEventType.OnEntityAdded);
        this.group = pool.getGroup(Matcher.allOf(
            CID(MonsterComponent)
        ));
    }
    /**
     * 
     */
    private handleExpolde(target: MyEntity) {
        if (!target.HasComponent(AttributesComponent)) {
            return;
        }
        const __FireExplodeComponent = target.GetComponent(FireExplodeComponent);
        const __AttributesComponent = target.GetComponent(AttributesComponent);
        //
        __AttributesComponent.health -= __FireExplodeComponent.damage;
        __AttributesComponent.health = Math.max(__AttributesComponent.health, 0);
        console.log(
            `!!!bang!!!!, The fireball exploded! and ${__AttributesComponent!.name} was hurt so much! ${__FireExplodeComponent.damage} damage done! remaining health ${__AttributesComponent!.health}`
        );
    }
    /**
     * 
     */
    private splash(center: MyEntity, targets: Array<Entity>) {
        targets.forEach((en) => {
            const me = (en as MyEntity);
            if (me == center) {
                return;
            }
            if (!me.HasComponent(AttributesComponent)) {
                return;
            }
            const __FireBurningComponent = me.AddComponent(FireBurningComponent);
            const __AttributesComponent = me.GetComponent(AttributesComponent);
            console.log(
                `!!! oh!!! The flames began to burn on ${__AttributesComponent!.name}`
            );
        });
    }
}