/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { CID } from "./ComponentsPreprocessing"
import { AttributesComponent, DestroyComponent, HeroComponent, MonsterComponent } from "./Components";
import { MyPool } from "./MyPool";
import { DeadComponent } from "./Components";
import { Matcher } from "../lib/entitas/Matcher";
import { MyEntity } from "./MyEntity";
/**
 * 
 */
export class DeadSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
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
    herosAreDeadCount: number = 0;
    /**
     * 
     */
    allHerosAreDeadAlert: boolean = false;
    /**
     * 
     */
    initialize() {
    }
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
            ++this.herosAreDeadCount;
            _en.AddComponent(DestroyComponent);
        });
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
        this.group1 = pool.getGroup(
            Matcher.allOf(CID(DeadComponent), CID(AttributesComponent)).anyOf(CID(HeroComponent), CID(MonsterComponent))
        );
    }
}