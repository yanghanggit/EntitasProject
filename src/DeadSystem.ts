/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { COMP_ID } from "./ComponentsPreprocessing"
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
    private pool: MyPool | null = null;
    /**
     * 
     */
    private group1: Group | null = null;
    /**
     * 
     */
    public execute(): void {
        this.checkAndHandleIfHeroIsDead(true);
    }
    /**
     * 
     */
    private checkAndHandleIfHeroIsDead(needDestroyEntity: boolean = true): void {
        const entities = this.group1?.getEntities();
        entities?.forEach((en) => {
            const entity = (en as MyEntity);
            const attributesComponent = entity.GetComponent(AttributesComponent);
            console.log(`oh! ${attributesComponent!.name} is dead!`);
            if (needDestroyEntity) {
                entity.AddComponent(DestroyComponent);
            }
        });
    }
    /**
     * 
     */
    public setPool(pool: Pool): void {
        this.pool = pool as MyPool;
        this.group1 = pool.getGroup(
            Matcher.allOf(COMP_ID(DeadComponent), COMP_ID(AttributesComponent))
        );
    }
}