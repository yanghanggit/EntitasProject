/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { COMP_ID } from "./ComponentsPreprocessing"
import { AttributesComponent, DeadComponent } from "./Components";
import { MyEntity } from "./MyEntity";
/**
 * 
 */
export class HealthSystem implements IExecuteSystem, ISetPool {
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
    public execute(): void {
        const entities = this.group!.getEntities();
        entities.forEach((en) => {
            const me = en as MyEntity;
            const attributesComponent = me.GetComponent(AttributesComponent);
            if (attributesComponent.health <= 0) {
                me.AddComponent(DeadComponent);
            }
        });
    }
    /**
     * 
     */
    public setPool(pool: Pool): void {
        this.pool = pool;
        this.group = pool.getGroup(
            Matcher.allOf(COMP_ID(AttributesComponent)).noneOf(COMP_ID(DeadComponent))
        );
    }
}