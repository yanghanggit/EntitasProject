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
import { CreateEntity, AddComponent } from "./EntitasExtension"
import { AttributesComponent, HeroComponent, HeroAIComponent, MonsterComponent, GoblinComponent, GoblinAIComponent, WarriorComponent, MageComponent } from "./Components";
import { HeroAISystem } from "./HeroAISystem";
import { GoblinAISystem } from "./GoblinAISystem";
import { MyPool } from "./MyPool";
/**
 * 
 */
export class MapBuildSystem implements IInitializeSystem, ISetPool {
    /**
     * 
     */
    pool: MyPool;
    /**
     * 
     */
    map: Map;
    /**
     * 
     */
    initialize() {
        this.initHeros();
        this.initMonsters();
    }


    private initHeros() {
        let pool = this.pool;
        //
        let heroNames = this.map.heroNames;
        let heroCareers = this.map.heroCareers;
        for (let i = 0; i < heroNames.length; ++i) {
            let en = CreateEntity(pool, "hero");
            {
                AddComponent(HeroComponent, en, new HeroComponent());
                AddComponent(HeroAIComponent, en, new HeroAIComponent());

            }
            {
                let attributesComp = new AttributesComponent();
                attributesComp.name = heroNames[i];
                AddComponent(AttributesComponent, en, attributesComp);
            }
            let career = heroCareers[i];
            if (career == '[warrior]') {
                AddComponent(WarriorComponent, en, new WarriorComponent());

            }
            else if (career == '[mage]') {
                AddComponent(MageComponent, en, new MageComponent());
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
        let pool = this.pool;
        //
        let goblinNames = this.map.goblinNames;
        for (let i = 0; i < goblinNames.length; ++i) {
            let en = CreateEntity(pool, "monster");
            {
                AddComponent(MonsterComponent, en, new MonsterComponent);
            }
            {
                let attributesComp = new AttributesComponent();
                attributesComp.name = goblinNames[i];
                AddComponent(AttributesComponent, en, attributesComp);
            }
            {
                AddComponent(GoblinComponent, en, new GoblinComponent());
                AddComponent(GoblinAIComponent, en, new GoblinAIComponent());
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
        let systems = scene.systems;
        let myPool = scene.myPool;
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
    }
}