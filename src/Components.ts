/**
 * 
 */
import { Entity } from "../lib/entitas/Entity";
import { IComponent } from "../lib/entitas/interfaces/IComponent";

export enum ComponentIds {
    Position,
    //Velocity,
    TotalComponents
}


export class PositionComponent implements IComponent {
    public x: number;
    public y: number;
}

// export class VelocityComponent implements IComponent {
//     public x: number;
//     public y: number;
// }


// export enum CoreComponentIds {
//     Bounds,
//     Bullet,
//     ColorAnimation,
//     Enemy,
//     Expires,
//     Firing,
//     Health,
//     ParallaxStar,
//     Player,
//     Position,
//     ScaleAnimation,
//     SoundEffect,
//     Sprite,
//     Velocity,
//     Score,
//     Destroy,
//     Mouse,
//     Scale,
//     Resource,
//     Layer,
//     TotalComponents
//   }


Entity.initialize(ComponentIds.TotalComponents, { "entities": 200, "components": 128 });