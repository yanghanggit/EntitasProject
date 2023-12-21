/**
 * 
 */
import { Pool } from '../lib/entitas/Pool';
import { Scene } from './Scene';
import { COMPONENTS } from './Components';
import { CombatInteraction } from './CombatInteraction';
/**
 * 
 */
export class MyPool extends Pool {
    /**
     * 
     */
    name: string = '';
    /**
     * 
     */
    scene: Scene | null = null;
    /**
     * 
     */
    combatInteraction: CombatInteraction | null = null;
    /**
     * 
     */
    constructor(name: string, scene: Scene) {
        super({}, COMPONENTS.length, false);
        this.name = name;
        this.scene = scene;
        this.combatInteraction = new CombatInteraction();
    }
}