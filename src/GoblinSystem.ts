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
import { MonsterComponent, GoblinComponent, AttributesComponent } from "./Components";
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
    initialize() {
        var entities = this.group.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            let e = entities[i];
            let com = GetComponent(GoblinComponent, e);
            let attributesComp = GetComponent(AttributesComponent, e);
            console.log("yaha!, I'm a " + e.name + "-goblin" + ", my name is " + attributesComp.name + ", woooo!");
        }
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
        this.group = pool.getGroup(Matcher.allOf(
            CID(MonsterComponent), CID(AttributesComponent)
        ));
    }
}