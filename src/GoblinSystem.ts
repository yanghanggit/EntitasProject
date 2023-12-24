/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { CID } from "./ComponentsPreprocessing"
import { HeroComponent, MonsterComponent, GoblinComponent, AttributesComponent, SkillComponent } from "./Components";
import { MyEnity } from "./MyEntity";
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
            const e = entities[i] as MyEnity;
            this.sayhi(e);
        }
    }
    /**
     * 
     */
    private sayhi(entity: MyEnity) {
        const e = entity as MyEnity;
        const attributesComp = e.GetComponent(AttributesComponent);
        console.log("yaha!, I'm a " + e.name + "-goblin" + ", my name is " + attributesComp!.name + ", woooo!");
    }
    /**
     * 
     */
    execute() {
        const entities = this.group1!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const e = entities[i] as MyEnity;
            this.attack(e, this.group2!.getEntities());
        }
    }
    /**
     * 
     */
    private attack(goblin: MyEnity, heros: Array<Entity>) {
        if (!this.checkAttackCooldown(goblin, true)) {
            return;
        }
        const hero = MyUtil.randomElementFromArray(heros) as MyEnity;
        if (hero === undefined) {
            return;
        }
        const skillEntity = this.pool.createEntity('skill') as MyEnity;
        const __SkillComponent = skillEntity.AddComponent(SkillComponent);
        __SkillComponent.src = goblin;
        __SkillComponent.dest = hero;
        //
        const hero__AttributesComponent = hero.GetComponent(AttributesComponent);
        const goblin__AttributesComponent = goblin.GetComponent(AttributesComponent);
        __SkillComponent.story = `${goblin__AttributesComponent!.name} wana punch ${hero__AttributesComponent!.name}.`;
    }
    /**
     * 
     */
    private checkAttackCooldown(goblin: MyEnity, resetCooldown: boolean = true): boolean {
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
            CID(MonsterComponent), CID(GoblinComponent), CID(AttributesComponent)
        ));

        this.group2 = pool.getGroup(Matcher.allOf(
            CID(HeroComponent), CID(AttributesComponent)
        ));
    }
}