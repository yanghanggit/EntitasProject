/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { AddComponent, GetComponent, HasComponent } from "./EntitasExtension"
import { AttributesComponent } from "./Components";
import { MyPool } from "./MyPool";
import { AttackEvent } from "./CombatInteraction";
import { DeadComponent } from "./Components";
/**
 * 
 */
export class AttackEventSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
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
    initialize() {
    }
    /**
     * 
     */
    execute() {
        if (this.pool === null || this.pool.scene === null) {
            return;
        }
        const combatInteraction = this.pool.combatInteraction;
        const events = combatInteraction.events;
        for (let i = 0, l = events.length; i < l; i++) {
            const ev = events[i];
            if (ev.type === 0) {
                this.handleAttackEvent(ev as AttackEvent);
            }
        }
        combatInteraction.events = [];
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
    }
    /**
     * 
     */
    private handleAttackEvent(attackEvent: AttackEvent) {
        const attackerEn = attackEvent.attacker;
        const targetEn = attackEvent.target;
        if (!HasComponent(AttributesComponent, attackerEn) || !HasComponent(AttributesComponent, targetEn)) {
            return;
        }
        const attributesComp_attackerEn = GetComponent(AttributesComponent, attackerEn);
        const attributesComp_targetEn = GetComponent(AttributesComponent, targetEn);
        let damage = attributesComp_attackerEn.attack - attributesComp_targetEn.defense;
        if (damage < 0) {
            damage = 0;
        }
        attributesComp_targetEn.health -= damage;
        if (attributesComp_targetEn.health < 0) {
            attributesComp_targetEn.health = 0;
            AddComponent(DeadComponent, targetEn, new DeadComponent());
        }
    }
}