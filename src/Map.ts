/**
 * 
 */
import { Scene } from "./Scene";
import { MyExecuteSystem } from "./MyExecuteSystem";
import { MyReactiveSystem } from "./MyReactiveSystem";
import { HeroSystem } from "./HeroSystem";
import { GoblinSystem } from "./GoblinSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { AttributesComponent, HeroComponent, HeroAIComponent, MonsterComponent, GoblinComponent, GoblinAIComponent, WarriorComponent, MageComponent } from "./Components";
import { HeroAISystem } from "./HeroAISystem";
import { GoblinAISystem } from "./GoblinAISystem";
import { MyPool } from "./MyPool";
import { SkillSystem } from "./SkillSystem";
import { HeroDeadSystem } from "./HeroDeadSystem";
import { MyEnity } from "./MyEntity";
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


    private initHeros() {
        if (this.map === null || this.pool == null) {
            return;
        }
        const pool = this.pool;
        const heroNames = this.map.heroNames;
        const heroCareers = this.map.heroCareers;
        for (let i = 0; i < heroNames.length; ++i) {
            const en = pool.createEntity("hero") as MyEnity;
            {
                en.AddComponent(HeroComponent);
                en.AddComponent(HeroAIComponent);
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
            const en = pool.createEntity("monster") as MyEnity;
            {
                en.AddComponent(MonsterComponent);
            }
            {
                const attributesComp = en.AddComponent(AttributesComponent);
                attributesComp.name = goblinNames[i];
            }
            {
                en.AddComponent(GoblinComponent);
            }
            {
                const goblinAIComp = en.AddComponent(GoblinAIComponent);
                goblinAIComp.maxAttackCooldown = (i + 1) * 1.0;
                goblinAIComp.attackCooldown = goblinAIComp.maxAttackCooldown;
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
/**
 * 
 */
export class Map {
    /**
     * 
     */
    name: string = '';
    /**
     * 
     */
    heroNames: Array<string> = ['[Tom]', '[Lily]'];
    heroCareers: Array<string> = ['[warrior]', '[mage]'];
    /**
     * 
     */
    goblinNames: Array<string> = ['[Guru]', '[Waga]', '[One-eyed]'];
    /**
     * 
     */
    constructor(name: string) {
        this.name = name;
    }
    /**
     * 
     */
    build(scene: Scene) {
        console.log("build:" + this.name);
        this.buildSystems(scene);
    }
    /**
     * 
     */
    buildSystems(scene: Scene) {
        if (scene.systems === null || scene.myPool === null) {
            return;
        }
        const systems = scene.systems;
        const myPool = scene.myPool;
        //
        systems.add(myPool.createSystem(MyExecuteSystem));
        systems.add(myPool.createSystem(MyReactiveSystem));
        //
        let mapBuildSystem = myPool.createSystem(MapBuildSystem) as MapBuildSystem;
        mapBuildSystem.map = this;
        systems.add(mapBuildSystem);
        //
        systems.add(myPool.createSystem(HeroSystem));
        systems.add(myPool.createSystem(GoblinSystem));
        //
        systems.add(myPool.createSystem(HeroAISystem));
        systems.add(myPool.createSystem(GoblinAISystem));
        //
        systems.add(myPool.createSystem(SkillSystem));
        systems.add(myPool.createSystem(HeroDeadSystem));
    }
}