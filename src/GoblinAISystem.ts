/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { GetComponent, CID, HasComponent } from "./EntitasExtension"
import { MonsterComponent, GoblinComponent, GoblinAIComponent, HeroComponent, AttributesComponent, DeadComponent } from "./Components";
import { MyPool } from "./MyPool";
import { Entity } from "../lib/entitas/Entity";
import { AttackEvent } from "./CombatInteraction";

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
    static readonly INIT_ATTACK_COOLDOWN: number = 3;
    attackCooldown: number = GoblinAISystem.INIT_ATTACK_COOLDOWN;
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
        this.attackCooldown -= dt;
        if (this.attackCooldown > 0.0) {
            return;
        }
        this.attackCooldown = GoblinAISystem.INIT_ATTACK_COOLDOWN;
        //
        const entities = this.group1!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const goblin = entities[i];
            const goblin_AttributesComp = GetComponent(AttributesComponent, goblin);
            //
            const targetEntity = this.determineAttackTarget();
            if (targetEntity !== null) {
                const target_AttributesComp = GetComponent(AttributesComponent, targetEntity);
                console.log(`${goblin_AttributesComp!.name} wana punch ${target_AttributesComp!.name}.`);
                this.pool.combatInteraction.events.push(new AttackEvent(goblin, targetEntity));
            }
        }
    }
    /**
     * 
     */
    private determineAttackTarget(): Entity | null {
        const entities = this.group2!.getEntities();
        if (entities === null || entities.length === 0) {
            return null;
        }
        const target = this.getRandomElementFromArray(entities) as Entity;
        if (target === null || HasComponent(DeadComponent, target)) {
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