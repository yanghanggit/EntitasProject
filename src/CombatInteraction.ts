/**
 * 
 */
import { Pool } from '../lib/entitas/Pool';
import { Scene } from './Scene';
import { COMPONENTS } from './Components';
import { Entity } from '../lib/entitas/Entity';
/**
 * 
 */

interface CombatEvent {
    type: number;
}

export class AttackEvent implements CombatEvent {
    type: number = 0;
    attacker: Entity | null = null;
    target: Entity | null = null;
    constructor(attacker: Entity, target: Entity) {
        this.attacker = attacker;
        this.target = target;
    }
}


export class CombatInteraction {
    events: Array<CombatEvent> = [];
    constructor() {

    }
}