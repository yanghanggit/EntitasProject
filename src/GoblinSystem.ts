/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { CID } from "./EntitasExtension"
import { MonsterComponent, GoblinComponent, AttributesComponent } from "./Components";
import { MyEnity } from "./MyEntity";
/**
 * 
 */
export class GoblinSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
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
        var entities = this.group!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            let e = entities[i] as MyEnity;
            let attributesComp = e.GetComponent(AttributesComponent);
            console.log("yaha!, I'm a " + e.name + "-goblin" + ", my name is " + attributesComp!.name + ", woooo!");
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
            CID(MonsterComponent), CID(GoblinComponent), CID(AttributesComponent)
        ));
    }
}