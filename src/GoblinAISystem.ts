/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { GetComponent, CID } from "./EntitasExtension"
import { MonsterComponent, GoblinComponent, GoblinAIComponent, HeroComponent, AttributesComponent, SkillComponent } from "./Components";
import { MyPool } from "./MyPool";
import { Entity } from "../lib/entitas/Entity";
import { MyEnity } from "./MyEntity";

/**
 * 
 */
export class GoblinAISystem implements IInitializeSystem, IExecuteSystem, ISetPool {
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
    group2: Group | null = null;
    /**
     * 
     */
    initialize() {
    }
    /**
     * 
     */
    execute() {
        this.attack();
    }
    /**
     * 
     */
    private attack() {
        if (this.pool === null || this.pool.scene === null) {
            return;
        }
        const dt = this.pool.scene.dt;
        const entities = this.group1!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const goblin = entities[i] as MyEnity;
            const goblinAIComp = GetComponent(GoblinAIComponent, goblin);
            goblinAIComp.attackCooldown -= dt;
            if (goblinAIComp.attackCooldown > 0) {
                continue;
            }
            goblinAIComp.attackCooldown = goblinAIComp.maxAttackCooldown;
            //
            const targetEntity = this.determineAttackTarget();
            if (targetEntity !== null) {
                const skillEntity = this.pool.createEntity('skill') as MyEnity;
                const skillComp = skillEntity.AddComponent(SkillComponent);//new SkillComponent();
                skillComp.src = goblin;
                skillComp.dest = targetEntity;
                //
                const target_AttributesComp = GetComponent(AttributesComponent, targetEntity);
                const goblin_AttributesComp = GetComponent(AttributesComponent, goblin);
                skillComp.story = `${goblin_AttributesComp!.name} wana punch ${target_AttributesComp!.name}.`;
            }
        }
    }
    /**
     * 
     */
    private determineAttackTarget(): MyEnity | null {
        const entities = this.group2!.getEntities();
        if (entities === null || entities.length === 0) {
            return null;
        }
        const target = this.getRandomElementFromArray(entities) as MyEnity;
        if (target === null) {
            return null;
        }
        return target;
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
        //
        this.group1 = pool.getGroup(Matcher.allOf(
            CID(MonsterComponent),
            CID(GoblinComponent),
            CID(GoblinAIComponent)
        ));
        //
        this.group2 = pool.getGroup(Matcher.allOf(
            CID(HeroComponent),
            CID(AttributesComponent)
        ));
    }
    /**
     * 
     */
    getRandomElementFromArray<T>(arr: T[]): T | undefined {
        if (arr.length === 0) {
            return undefined;
        }
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
}