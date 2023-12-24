/**
 * 
 */
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { CID } from "./ComponentsPreprocessing"
import { AttributesComponent, GoblinAttackComponent, GoblinComponent } from "./Components";
import { IReactiveSystem } from "../lib/entitas/interfaces/IReactiveSystem";
import { TriggerOnEvent } from "../lib/entitas/TriggerOnEvent";
import { Entity } from "../lib/entitas/Entity";
import { GroupEventType } from "../lib/entitas/Matcher";
import { MyEntity } from "./MyEntity";
import { MyPool } from "./MyPool";
/**
 * 
 */
export class GoblinAttackSystem implements IInitializeSystem, ISetPool, IReactiveSystem {
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
    initialize() {
    }
    /**
     * 
     */
    execute(entities: Array<Entity>) {
        entities.forEach((en) => {
            const me = (en as MyEntity);
            this.handleAttack(me);
            me.RemoveComponent(GoblinAttackComponent);
        });
    }
    /**
     * 
     */
    private handleAttack(goblin: MyEntity) {
        const __GoblinAttackComponent = goblin.GetComponent(GoblinAttackComponent);
        const hero = this.pool.getEntity(__GoblinAttackComponent.destEntityId);
        if (hero === null || hero === undefined) {
            return;
        }
        const hero__AttributesComponent = hero.GetComponent(AttributesComponent);
        const goblin__AttributesComponent = goblin.GetComponent(AttributesComponent);
        console.log(`${goblin__AttributesComponent!.name} wana punch ${hero__AttributesComponent!.name}.`);
        //
        const damage = Math.max(0, goblin__AttributesComponent.attack - hero__AttributesComponent.defense);
        hero__AttributesComponent.health -= damage;
        hero__AttributesComponent.health = Math.max(0, hero__AttributesComponent.health);
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
        this.trigger = new TriggerOnEvent(Matcher.allOf(CID(GoblinAttackComponent)), GroupEventType.OnEntityAdded);
    }
}