/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { CID, HasComponent } from "./EntitasExtension"
import { HeroComponent, AttributesComponent, WarriorComponent, MageComponent } from "./Components";
import { MyEnity } from "./MyEntity";
/**
 * 
 */
export class HeroSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
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
        if (this.group === null) {
            return;
        }
        const entities = this.group.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const e = entities[i] as MyEnity;
            const attributesComp = e.GetComponent(AttributesComponent);
            let careerName = 'unkown career';
            if (HasComponent(WarriorComponent, e)) {
                careerName = 'warrior';
            }
            else if (HasComponent(MageComponent, e)) {
                careerName = 'mega';
            }
            console.log(`My name is ${attributesComp!.name}, I'm a ${careerName}, he!ya!`);
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
        this.group = pool.getGroup(
            Matcher.allOf(CID(HeroComponent), CID(AttributesComponent)).anyOf(CID(WarriorComponent), CID(MageComponent))
        );
    }
}