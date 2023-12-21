/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { GetComponent, CID } from "./EntitasExtension"
import { HeroComponent } from "./Components";
/**
 * 
 */
export class HeroAISystem implements IInitializeSystem, IExecuteSystem, ISetPool {
    /**
     * 
     */
    pool: Pool;
    /**
     * 
     */
    group: Group;
    /**
     * 
     */
    initialize() {
    }
    /**
     * 
     */
    execute() {

    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool;
        this.group = pool.getGroup(Matcher.allOf(
            CID(HeroComponent)
        ));
    }
}