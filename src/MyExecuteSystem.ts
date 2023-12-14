/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { CreateEntity, AddComponent, GetComponent, CID } from "./EntitasExtension"
import { EmptyComponent } from "./Components";
/**
 * 
 */
export class MyExecuteSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
    /**
     * 
     */
    protected pool: Pool;
    /**
     * 
     */
    protected group: Group;
    /**
     * 
     */
    public initialize() {
        let en = CreateEntity(this.pool, 'Player');
        AddComponent(EmptyComponent, en, new EmptyComponent);
    }
    /**
     * 
     */
    public execute() {
        var entities = this.group.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            let e = entities[i];
            let com = GetComponent(EmptyComponent, e);
        }
    }
    /**
     * 
     */
    public setPool(pool: Pool) {
        this.pool = pool;
        this.group = pool.getGroup(Matcher.allOf(
            CID(EmptyComponent)
        ));
    }
}