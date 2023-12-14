/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { GetComponent, CID } from "./EntitasExtension"
import { HeroComponent } from "./Components";
/**
 * 
 */
export class HeroSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
    /**
     * 
     */
    pool: Pool;
    /**
     * 
     */
    group: Group;
    /**
     * 
     */
    public initialize() {
        var entities = this.group.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            let e = entities[i];
            let com = GetComponent(HeroComponent, e);
            console.log("hi, I'm a " + e.name + ", my name is " + com.name + ", he!ya!");
        }
    }
    /**
     * 
     */
    public execute() {

    }
    /**
     * 
     */
    public setPool(pool: Pool) {
        this.pool = pool;
        this.group = pool.getGroup(Matcher.anyOf(
            CID(HeroComponent)
        ));
    }
}