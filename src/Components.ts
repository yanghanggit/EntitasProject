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
    health: number;
    mana: number;
}
/**
 * 
 */
export class PropertiesComponent implements IComponent {
    strength: number;
    agility: number;
    intelligence: number;
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
    PropertiesComponent,
];