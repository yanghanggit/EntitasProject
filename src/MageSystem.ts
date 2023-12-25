/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { CID } from "./ComponentsPreprocessing"
import { HeroComponent, AttributesComponent, WarriorComponent, MageComponent } from "./Components";
import { MyEntity } from "./MyEntity";
/**
 * 
 */
export class MageSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
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
        const entities = this.group!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const e = entities[i] as MyEntity;
            this.sayhi(e);
        }
    }
    /**
     * 
     */
    private sayhi(entity: MyEntity) {
        const __AttributesComponent = entity.GetComponent(AttributesComponent);
        console.log(`My name is ${__AttributesComponent!.name}, I'm a mage, ke~ ke~`);
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
        this.group = pool.getGroup(
            Matcher.allOf(CID(HeroComponent), CID(AttributesComponent), CID(MageComponent))
        );
    }
}