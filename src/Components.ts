/**
 * 
 */
import { IComponent } from "../lib/entitas/interfaces/IComponent";
import { MyEnity } from "./MyEntity";
/**
 * 
 */
export class EmptyComponent implements IComponent {
}

/**
 * 
 */
export class HeroComponent implements IComponent {
}
/**
 * 
 */
export class WarriorComponent implements IComponent {
}
/**
 * 
 */
export class MageComponent implements IComponent {
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
}
/**
 * 
 */
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
export class HeroAIComponent implements IComponent {
}
/**
 * 
 */
export class GoblinAIComponent implements IComponent {
    maxAttackCooldown: number = 3;
    attackCooldown: number = this.maxAttackCooldown;
}
/**
 * 
 */
export class DeadComponent implements IComponent {
}

/**
 * 
 */
export class SkillComponent implements IComponent {
    story: string = '';
    src: MyEnity | null = null;
    dest: MyEnity | null = null;
}
/**
 * 
 */
export const COMPONENTS: IComponent[] = [
    EmptyComponent,
    HeroComponent,
    WarriorComponent,
    MageComponent,
    MonsterComponent,
    GoblinComponent,
    AttributesComponent,
    HeroAIComponent,
    GoblinAIComponent,
    DeadComponent,
    SkillComponent,
];