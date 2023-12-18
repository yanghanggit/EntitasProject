/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { GetComponent, CID, HasComponent } from "./EntitasExtension"
import { HeroComponent, AttributesComponent, WarriorComponent, MageComponent } from "./Components";
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
    initialize() {
        var entities = this.group.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            let e = entities[i];
            let heroComponent = GetComponent(HeroComponent, e);
            let attributesComp = GetComponent(AttributesComponent, e);
            let careerName = 'unkown career';
            if (HasComponent(WarriorComponent, e)) {
                careerName = 'warrior';
            }
            else if (HasComponent(MageComponent, e)) {
                careerName = 'mega';
            }
            console.log(`My name is ${attributesComp.name}, I'm a ${careerName}, he!ya!`);
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