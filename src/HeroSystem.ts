/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { COMP_ID } from "./ComponentsPreprocessing"
import { HeroComponent, AttributesComponent } from "./Components";
/**
 * 
 */
export class HeroSystem implements IExecuteSystem, ISetPool {
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
    private alert(): void {
        if (!this.sayAlert) {
            this.sayAlert = true;
            console.log('Alas, tragedy strikes! The echoes of despair resonate as all our valiant heroes meet their untimely end... The realm mourns!');
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
    public setPool(pool: Pool): void {
        this.pool = pool;
        this.group = pool.getGroup(
            Matcher.allOf(COMP_ID(HeroComponent), COMP_ID(AttributesComponent))
        );
    }
}