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
import { MonsterComponent, GoblinComponent, GoblinAIComponent, HeroComponent, SkillRequestsQueue } from "./Components";
import { MyPool } from "./MyPool";
import { Entity } from "../lib/entitas/Entity";
import { AddComponent, HasComponent } from "./EntitasExtension";

/**
 * 
 */
export class GoblinAISystem implements IInitializeSystem, IExecuteSystem, ISetPool {
    /**
     * 
     */
    pool: MyPool;
    /**
     * 
     */
    group1: Group;
    /**
     * 
     */
    group2: Group;
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
        const dt = this.pool.scene.dt;
        this.attackCooldown -= dt;
        if (this.attackCooldown > 0.0) {
            return;
        }
        this.attackCooldown = GoblinAISystem.INIT_ATTACK_COOLDOWN;
        //
        var entities = this.group1.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            let e = entities[i];
            let goblinComp = GetComponent(GoblinComponent, e);
            let goblinAIComp = GetComponent(GoblinAIComponent, e);
            //
            const targetEntity = this.determineAttackTarget();
            const heroComp = GetComponent(HeroComponent, targetEntity);
            const skillReqComp = GetComponent(SkillRequestsQueue, targetEntity);
            const makeReq = `${goblinComp.name} wana punch ${heroComp.name}.`;
            if (!skillReqComp.queue.includes(makeReq)) {
                skillReqComp.queue.push(makeReq);
                console.log(makeReq);
            }
        }
    }
    /**
     * 
     */
    private determineAttackTarget(): Entity {
        var entities = this.group2.getEntities();
        return this.getRandomElementFromArray(entities);
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
        //
        this.group1 = pool.getGroup(Matcher.anyOf(
            CID(MonsterComponent),
            CID(GoblinComponent),
            CID(GoblinAIComponent)
        ));
        //
        this.group2 = pool.getGroup(Matcher.anyOf(
            CID(HeroComponent)
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