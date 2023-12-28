/**
 * 
 */
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { COMP_ID } from "./ComponentsPreprocessing"
import { AttributesComponent, DeadComponent, GoblinAttackComponent, HeroComponent, MageComponent, WarriorComponent } from "./Components";
import { IReactiveSystem } from "../lib/entitas/interfaces/IReactiveSystem";
import { TriggerOnEvent } from "../lib/entitas/TriggerOnEvent";
import { Entity } from "../lib/entitas/Entity";
import { GroupEventType } from "../lib/entitas/Matcher";
import { MyEntity } from "./MyEntity";
import { MyPool } from "./MyPool";
import { MyUtil } from "./MyUtil";
/**
 * 
 */
export class GoblinAttackSystem implements ISetPool, IReactiveSystem {
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
        const attackTarget = this.decideTarget(goblin);
        if (attackTarget === null) {
            return;
        }
        const hero__AttributesComponent = attackTarget.GetComponent(AttributesComponent);
        const goblin__AttributesComponent = goblin.GetComponent(AttributesComponent);
        //
        const damage = Math.max(0, goblin__AttributesComponent.attack - hero__AttributesComponent.defense);
        hero__AttributesComponent.health -= damage;
        hero__AttributesComponent.health = Math.max(0, hero__AttributesComponent.health);
        //
        console.log(`${goblin__AttributesComponent!.name} caused damage to the ${hero__AttributesComponent!.name}, and the ${hero__AttributesComponent!.name}'s remaining health is  ${hero__AttributesComponent.health}`);
    }
    /**
     * 
     */
    private decideTarget(goblin: MyEntity): MyEntity | null {
        const goblin__AttributesComponent = goblin.GetComponent(AttributesComponent);
        const goblin__GoblinAttackComponent = goblin.GetComponent(GoblinAttackComponent);
        const hero = this.pool!.getEntity(goblin__GoblinAttackComponent.destEntityId);
        if (hero === null || hero === undefined) {
            return null;
        }
        const hero__AttributesComponent = hero.GetComponent(AttributesComponent);
        console.log(`${goblin__AttributesComponent!.name} wana punch ${hero__AttributesComponent!.name}`);
        if (hero.HasComponent(MageComponent)) {
            const entities = this.group!.getEntities();
            if (entities.length > 0) {
                const warrior = MyUtil.randomElementFromArray(entities) as MyEntity;
                if (!warrior.HasComponent(DeadComponent)) {
                    const warrior__AttributesComponent = warrior.GetComponent(AttributesComponent);
                    console.log(`The warrior ${warrior__AttributesComponent!.name} blocked an attack from the ${goblin__AttributesComponent!.name} on the ${hero__AttributesComponent!.name}`)
                    return warrior;
                }
            }
        }
        return hero;
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
        this.trigger = new TriggerOnEvent(Matcher.allOf(COMP_ID(GoblinAttackComponent)), GroupEventType.OnEntityAdded);
        this.group = pool.getGroup(Matcher.allOf(
            COMP_ID(HeroComponent), COMP_ID(AttributesComponent), COMP_ID(WarriorComponent)
        ));
    }
}