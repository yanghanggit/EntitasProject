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
import { MonsterComponent, GoblinComponent } from "./Components";
/**
 * 
 */
export class GoblinSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
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
    }
    /**
     * 
     */
    public execute() {
        var entities = this.group.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            let e = entities[i];
            let com = GetComponent(GoblinComponent, e);
            if (!com.say) {
                com.say = true;
                console.log("yaha!, I'm a " + e.name + ", my name is " + com.name + ", woooo!");
            }
        }
    }
    /**
     * 
     */
    public setPool(pool: Pool) {
        this.pool = pool;
        this.group = pool.getGroup(Matcher.anyOf(
            CID(MonsterComponent)
        ));
    }
}