/**
 * 
 */
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { AttributesComponent, HeroComponent, MonsterComponent, GoblinComponent, WarriorComponent, MageComponent } from "./Components";
import { MyPool } from "./MyPool";
import { MyEntity } from "./MyEntity";
import { MyUtil } from "./MyUtil";
import { Map } from "./Map";
/**
 * 
 */
export class MapBuildSystem implements IInitializeSystem, ISetPool {
    /**
     * 
     */
    pool: MyPool | null = null;
    /**
     * 
     */
    map: Map | null = null;
    /**
     * 
     */
    initialize() {
        this.initHeros();
        this.initMonsters();
    }
    /**
     * 
     */
    private initHeros() {
        if (this.map === null || this.pool == null) {
            return;
        }
        const pool = this.pool;
        const heroNames = this.map.heroNames;
        const heroCareers = this.map.heroCareers;
        for (let i = 0; i < heroNames.length; ++i) {
            const en = pool.createEntity("hero") as MyEntity;
            {
                en.AddComponent(HeroComponent);
            }
            {
                const attributesComp = en.AddComponent(AttributesComponent);
                attributesComp.name = heroNames[i];
            }
            const career = heroCareers[i];
            if (career == '[warrior]') {
                en.AddComponent(WarriorComponent);
            }
            else if (career == '[mage]') {
                en.AddComponent(MageComponent);
            }
            else {
                console.log("unknown career = " + career)
            }
        }
    }
    /**
     * 
     */
    private initMonsters() {
        if (this.map === null || this.pool == null) {
            return;
        }
        const pool = this.pool;
        const goblinNames = this.map.goblinNames;
        for (let i = 0; i < goblinNames.length; ++i) {
            const en = pool.createEntity("monster") as MyEntity;
            {
                en.AddComponent(MonsterComponent);
            }
            {
                const attributesComp = en.AddComponent(AttributesComponent);
                attributesComp.name = goblinNames[i];
            }
            {
                const __GoblinComponent = en.AddComponent(GoblinComponent);
                __GoblinComponent.attackCooldown = __GoblinComponent.attackCooldownMax = MyUtil.randomRange(3, 5) * 60;
            }
        }
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
    }
}