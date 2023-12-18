/**
 * 
 */
import { IComponent } from "../lib/entitas/interfaces/IComponent";
/**
 * 
 */
export class EmptyComponent implements IComponent {
}
/**
 * 
 */
export class HeroComponent implements IComponent {
    name: string;
}
/**
 * 
 */
export class MonsterComponent implements IComponent {
}
/**
 * 
 */
export class GoblinComponent implements IComponent {
    name: string;
}
/**
 * 
 */
export class AttributesComponent implements IComponent {
    health: number = 100;
    mana: number;
    attack: number;
    defense: number;
}
/**
 * 
 */
export class HeroAIComponent implements IComponent {
}
/**
 * 
 */
export class GoblinAIComponent implements IComponent {
}
/**
 * 
 */
export class SkillRequestsQueue implements IComponent {
    queue: Array<string> = [];
}
/**
 * 
 */
export const COMPONENTS: IComponent[] = [
    EmptyComponent,
    HeroComponent,
    MonsterComponent,
    GoblinComponent,
    AttributesComponent,
    HeroAIComponent,
    GoblinAIComponent,
    SkillRequestsQueue,
];