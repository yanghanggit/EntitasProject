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
    static __UUID__: number = 0;
    UUID: number;
    constructor() {
        this.UUID = ++HeroComponent.__UUID__;
    }
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
    static __UUID__: number = 0;
    UUID: number;
    constructor() {
        this.UUID = ++MonsterComponent.__UUID__;
    }
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
    name: string;
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
];