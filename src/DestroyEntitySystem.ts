/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { COMP_ID } from "./ComponentsPreprocessing"
import { DestroyComponent } from "./Components";
import { MyPool } from "./MyPool";
import { Matcher } from "../lib/entitas/Matcher";
/**
 * 
 */
export class DestroyEntitySystem implements IExecuteSystem, ISetPool {
    /**
     * 
     */
    pool: MyPool | null = null;
    /**
     * 
     */
    group1: Group | null = null;
    /**
     * 
     */
    execute() {
        const entities = this.group1!.getEntities();
        entities.forEach((en) => {
            this.pool!.destroyEntity(en);
        });
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
        this.group1 = pool.getGroup(
            Matcher.anyOf(COMP_ID(DestroyComponent))
        );
    }
}