/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { GetComponent, CID } from "./EntitasExtension"
import { AttributesComponent } from "./Components";
import { MyPool } from "./MyPool";
import { HeroComponent, DeadComponent } from "./Components";
import { Matcher } from "../lib/entitas/Matcher";
/**
 * 
 */
export class HeroDeadSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
    /**
     * 
     */
    pool: MyPool | null = null;
    /**
     * 
     */
    group: Group | null = null;
    /**
     * 
     */
    initialize() {
    }
    /**
     * 
     */
    execute() {
        if (this.group === null) {
            return;
        }
        const entities = this.group.getEntities();
        entities.forEach(async (en) => {
            const attributesComp = GetComponent(AttributesComponent, en);
            console.log(`${attributesComp!.name} is dead!`);
            this.pool.destroyEntity(en);
        });

    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
        this.group = pool.getGroup(
            Matcher.allOf(CID(HeroComponent), CID(AttributesComponent), CID(DeadComponent))
        );
    }
}