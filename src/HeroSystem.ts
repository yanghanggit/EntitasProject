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
    pool: Pool | null = null;
    /**
     * 
     */
    group: Group | null = null;
    /**
    * 
    */
    allHerosAreDeadAlert: boolean = false;
    /**
     * 
     */
    execute() {
        if (this.checkAllHerosAreDead()) {
            if (!this.allHerosAreDeadAlert) {
                this.allHerosAreDeadAlert = true;
                console.log('!!!!!!!!!!!   all heros are dead   !!!!!!!!!!!');
            }
        }
    }
    /**
     * 
     */
    private checkAllHerosAreDead(): boolean {
        return this.group?.getEntities().length === 0;
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool;
        this.group = pool.getGroup(
            Matcher.allOf(COMP_ID(HeroComponent), COMP_ID(AttributesComponent))
        );
    }
}