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
import { HeroComponent, MonsterComponent, GoblinComponent, AttributesComponent, GoblinAttackComponent } from "./Components";
import { MyEntity } from "./MyEntity";
import { MyUtil } from "./MyUtil";
import { Entity } from "../lib/entitas/Entity";
/**
 * 
 */
export class GoblinSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
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
    private sayhi(entity: MyEntity) {
        const e = entity as MyEntity;
        const attributesComp = e.GetComponent(AttributesComponent);
        console.log("yaha!, I'm a " + e.name + "-goblin" + ", my name is " + attributesComp!.name + ", woooo!");
    }
    /**
     * 
     */
    execute() {
        const entities = this.group1!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const e = entities[i] as MyEntity;
            this.randomAttack(e, this.group2!.getEntities());
        }
    }
    /**
     * 
     */
    private randomAttack(goblin: MyEntity, heros: Array<Entity>) {
        if (!this.checkAttackCooldown(goblin, true)) {
            return;
        }
        const hero = MyUtil.randomElementFromArray(heros) as MyEntity;
        if (hero === undefined) {
            return;
        }
        const __GoblinAttackComponent = goblin.AddComponent(GoblinAttackComponent);
        __GoblinAttackComponent.destEntityId = hero.id;
    }
    /**
     * 
     */
    private checkAttackCooldown(goblin: MyEntity, resetCooldown: boolean = true): boolean {
        const __GoblinComponent = goblin.GetComponent(GoblinComponent);
        --__GoblinComponent.attackCooldown;
        if (__GoblinComponent.attackCooldown <= 0) {
            __GoblinComponent.attackCooldown = resetCooldown ? __GoblinComponent.attackCooldownMax : 0;
            return true;
        }
        return false;
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool;
        this.group1 = pool.getGroup(Matcher.allOf(
            COMP_ID(MonsterComponent), COMP_ID(GoblinComponent), COMP_ID(AttributesComponent)
        ));

        this.group2 = pool.getGroup(Matcher.allOf(
            COMP_ID(HeroComponent), COMP_ID(AttributesComponent)
        ));
    }
}