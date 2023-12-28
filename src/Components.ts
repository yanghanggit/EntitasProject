/**
 * 
 */
import { IComponent } from "../lib/entitas/interfaces/IComponent";
/**
 * 
 */
export const components_collector: Array<new () => IComponent> = [];
function component<T extends IComponent>(constructor: new () => T) {
    components_collector.push(constructor);
}
/**
 * 
 */
@component
export class EmptyComponent implements IComponent {
}
/**
 * 
 */
@component
export class DestroyComponent implements IComponent {
}
/**
 * 
 */
@component
export class HeroComponent implements IComponent {
    pack: string = '';
}
/**
 * 
 */
@component
export class AttributesComponent implements IComponent {
    name: string = '';
    maxHealth: number = 100;
    health: number = this.maxHealth;
    maxMana: number = 50;
    mana: number = this.maxMana;
    attack: number = 30;
    defense: number = 10;
}
/**
 * 
 */
@component
export class PackComponent implements IComponent {
    readonly items: string[] = [];
}
/**
 * 
 */
@component
export class ItemComponent implements IComponent {
}
/**
 * 
 */
@component
export class WarriorComponent implements IComponent {
}
/**
 * 
 */
@component
export class MageComponent implements IComponent {
    spellCooldownMax: number = 3 * 60;
    spellCooldown: number = this.spellCooldownMax;
}
/**
 * 
 */
@component
export class DeadComponent implements IComponent {
}
/**
 * 
 */
@component
export class MonsterComponent implements IComponent {
}
/**
 * 
 */
@component
export class GoblinComponent implements IComponent {
    attackCooldownMax: number = 3 * 60;
    attackCooldown: number = this.attackCooldownMax;
}
/**
 * 
 */
@component
export class GoblinAttackComponent implements IComponent {
    destEntityId: string = '';
}
/**
 * 
 */
@component
export class FoodComponent implements IComponent {
    foodName: string = '';
}
/**
 * 
 */
@component
export class MagicComponent implements IComponent {
    src: string = '';
    target: string = '';
}
/**
 * 
 */
@component
export class FireBallComponent implements IComponent {
    flyingTime: number = 100;
}
/**
 * 
 */
@component
export class FireExplodeComponent implements IComponent {
    damage: number = 50;
}
/**
 * 
 */
@component
export class FireBurningComponent implements IComponent {
    burningCooldownMax: number = 3 * 60;
    burningCooldown: number = this.burningCooldownMax;
}


