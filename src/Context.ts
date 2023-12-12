/**
 * 
 */
import { Systems } from "../lib/entitas/Systems";
import { Entity } from "../lib/entitas/Entity";
import { ComponentIds } from "./Components";
import { Pools } from "./Pools";

export class Context {

    systems: Systems;
    
    start() {
        Entity.initialize(ComponentIds.TotalComponents, { "entities": 200, "components": 128 });
        this.systems = this.createSystems(Pools.pool);
        this.systems.initialize();
    }

    createSystems(pool) {
        return new Systems();
        // .add(pool.createSystem(example.MovementSystem))
        // .add(pool.createSystem(example.PlayerInputSystem))
        // .add(pool.createSystem(example.SoundEffectSystem))
        // .add(pool.createSystem(example.CollisionSystem))
        // .add(pool.createSystem(example.ExpiringSystem))
        // .add(pool.createSystem(example.EntitySpawningTimerSystem))
        // .add(pool.createSystem(example.ParallaxStarRepeatingSystem))
        // .add(pool.createSystem(example.ColorAnimationSystem))
        // .add(pool.createSystem(example.ScaleAnimationSystem))
        // .add(pool.createSystem(example.RemoveOffscreenShipsSystem))
        // .add(pool.createSystem(example.SpriteRenderSystem))
        // .add(pool.createSystem(example.AddViewSystem))
        // .add(pool.createSystem(example.HealthRenderSystem))
        // .add(pool.createSystem(example.HudRenderSystem))
        // .add(pool.createSystem(example.DestroySystem));

    }

    update(delta: number) {
        this.systems.execute();
    }
}