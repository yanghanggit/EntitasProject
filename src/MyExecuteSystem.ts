/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { COMP_ID } from "./ComponentsPreprocessing"
import { EmptyComponent } from "./Components";
import { MyEntity } from "./MyEntity";
/**
 * 
 */
export class MyExecuteSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
    /**
     * 
     */
    pool: Pool | null = null;
    /**
     * 
     */
    group: Group | null = null;
    /**
     * 
     */
    initialize() {
        if (this.pool !== null) {
            const en = this.pool.createEntity('Empty') as MyEntity;
            en.AddComponent(EmptyComponent);

        }
    }
    /**
     * 
     */
    execute() {
        if (this.group !== null) {
            var entities = this.group.getEntities();
            for (let i = 0, l = entities.length; i < l; i++) {
                const e = entities[i] as MyEntity;
                const com = e.GetComponent(EmptyComponent);
                if (com !== null) {
                }
            }
        }
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool;
        this.group = pool.getGroup(Matcher.allOf(
            COMP_ID(EmptyComponent)
        ));
    }
}