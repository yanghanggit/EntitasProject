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
    say: boolean;
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
    say: boolean;
}
/**
 * 
 */
export class AttributesComponent implements IComponent {
}






export const COMPONENTS: IComponent[] = [
    EmptyComponent,
    HeroComponent,
    MonsterComponent,
    GoblinComponent,
    AttributesComponent,
];