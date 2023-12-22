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
import { MonsterComponent, GoblinComponent, GoblinAIComponent, HeroComponent, AttributesComponent, SkillComponent } from "./Components";
import { MyPool } from "./MyPool";
import { MyEnity } from "./MyEntity";
import { MyUtil } from "./MyUtil";

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
            const goblinAIComp = goblin.GetComponent(GoblinAIComponent);
            goblinAIComp.attackCooldown -= dt;
            if (goblinAIComp.attackCooldown > 0) {
                continue;
            }
            goblinAIComp.attackCooldown = goblinAIComp.maxAttackCooldown;
            //
            const targetEntity = this.determineAttackTarget();
            if (targetEntity !== null) {
                const skillEntity = this.pool.createEntity('skill') as MyEnity;
                const skillComp = skillEntity.AddComponent(SkillComponent);
                skillComp.src = goblin;
                skillComp.dest = targetEntity;
                //
                const target_AttributesComp = targetEntity.GetComponent(AttributesComponent);
                const goblin_AttributesComp = goblin.GetComponent(AttributesComponent);
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
        const target = MyUtil.randomElementFromArray(entities) as MyEnity;
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
}