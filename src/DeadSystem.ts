/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { CID } from "./ComponentsPreprocessing"
import { AttributesComponent, DestroyComponent } from "./Components";
import { MyPool } from "./MyPool";
import { DeadComponent } from "./Components";
import { Matcher } from "../lib/entitas/Matcher";
import { MyEntity } from "./MyEntity";
/**
 * 
 */
export class DeadSystem implements IExecuteSystem, ISetPool {
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
    group2: Group | null = null;
    /**
     * 
     */
    execute() {
        this.handleHeros();
    }
    /**
     * 
     */
    private handleHeros() {
        const entities = this.group1!.getEntities();
        entities.forEach((en) => {
            const _en = (en as MyEntity);
            const __AttributesComponent = _en.GetComponent(AttributesComponent);
            console.log(`${__AttributesComponent!.name} is dead!`);
            _en.AddComponent(DestroyComponent);
        });
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
        this.group1 = pool.getGroup(
            Matcher.allOf(CID(DeadComponent), CID(AttributesComponent))
        );
    }
}