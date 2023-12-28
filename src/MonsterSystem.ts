/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { COMP_ID } from "./ComponentsPreprocessing"
import { AttributesComponent, MonsterComponent } from "./Components";
/**
 * 
 */
export class MonsterSystem implements IExecuteSystem, ISetPool {
    /**
     * 
     */
    private pool: Pool | null = null;
    /**
     * 
     */
    private group: Group | null = null;
    /**
    * 
    */
    private sayAlert: boolean = false;
    /**
     * 
     */
    public execute(): void {
        if (this.allDead()) {
            this.alert();
        }
    }
    /**
     * 
     */
    private allDead(): boolean {
        return this.group?.getEntities().length === 0;
    }
    /**
     * 
     */
    private alert(): void {
        if (!this.sayAlert) {
            this.sayAlert = true;
            console.log('Eureka! The echoing halls of the dungeon grow silent, as the last goblin falls. A triumphant moment for adventurers, the shadowy corridors are now free of menace... until the next threat emerges!');
        }
    }
    /**
     * 
     */
    public setPool(pool: Pool): void {
        this.pool = pool;
        this.group = pool.getGroup(
            Matcher.allOf(COMP_ID(MonsterComponent), COMP_ID(AttributesComponent))
        );
    }
}