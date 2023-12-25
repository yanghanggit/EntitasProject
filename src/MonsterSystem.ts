/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { CID } from "./ComponentsPreprocessing"
import { AttributesComponent, MonsterComponent } from "./Components";
/**
 * 
 */
export class MonsterSystem implements IExecuteSystem, ISetPool {
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
    allMonstersAreDeadAlert: boolean = false;
    /**
     * 
     */
    execute() {
        if (this.checkAllMonstersAreDead()) {
            if (!this.allMonstersAreDeadAlert) {
                this.allMonstersAreDeadAlert = true;
                console.log('!!!!!!!!!!!   all monsters are dead   !!!!!!!!!!!');
            }
        }
    }
    /**
     * 
     */
    private checkAllMonstersAreDead(): boolean {
        return this.group?.getEntities().length === 0;
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool;
        this.group = pool.getGroup(
            Matcher.allOf(CID(MonsterComponent), CID(AttributesComponent))
        );
    }
}