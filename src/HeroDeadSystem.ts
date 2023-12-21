/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { CID } from "./ComponentsPreprocessing"
import { AttributesComponent } from "./Components";
import { MyPool } from "./MyPool";
import { HeroComponent, DeadComponent } from "./Components";
import { Matcher } from "../lib/entitas/Matcher";
import { MyEnity } from "./MyEntity";
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
    group1: Group | null = null;
    /**
    * 
    */
    group2: Group | null = null;
    /**
    * 
    */
    allHerosAreDead: boolean = false;
    /**
     * 
     */
    initialize() {
    }
    /**
     * 
     */
    execute() {
        if (this.group1 !== null) {
            const entities = this.group1.getEntities();
            entities.forEach((en) => {
                const attributesComp = (en as MyEnity).GetComponent(AttributesComponent);
                console.log(`${attributesComp!.name} is dead!`);
                this.pool!.destroyEntity(en);
            });
        }
        if (!this.allHerosAreDead) {
            if (this.group2 !== null) {
                const entities = this.group2.getEntities();
                if (entities.length === 0) {
                    console.log('all heros are dead!!! game over!');
                    this.allHerosAreDead = true;
                }
            }
        }

    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
        this.group1 = pool.getGroup(
            Matcher.allOf(CID(HeroComponent), CID(AttributesComponent), CID(DeadComponent))
        );
        this.group2 = pool.getGroup(
            Matcher.allOf(CID(HeroComponent))
        );
    }
}