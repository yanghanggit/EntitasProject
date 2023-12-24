/**
 * 
 */
import { IComponent } from "../lib/entitas/interfaces/IComponent";
import { MyEnity } from "./MyEntity";
/**
 * 
 */
export const components_collector: Array<Function> = [];
function component(constructor: Function) {
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
export class DestoryComponent implements IComponent {
}
/**
 * 
 */
@component
export class HeroComponent implements IComponent {
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
    attackCooldownMax: number = 3;
    attackCooldown: number = 0;
}
/**
 * 
 */
@component
export class AttributesComponent implements IComponent {
    name: string = '';
    health: number = 100;
    mana: number = 50;
    attack: number = 30;
    defense: number = 10;
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
export class SkillComponent implements IComponent {
    story: string = '';
    src: MyEnity | null = null;
    dest: MyEnity | null = null;
}






