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
import { AttributesComponent, HeroComponent, MonsterComponent, GoblinComponent } from "./Components";
/**
 * 
 */
export class MapBuildSystem implements IInitializeSystem, ISetPool {
    /**
     * 
     */
    pool: Pool;
    /**
     * 
     */
    map: Map;
    /**
     * 
     */
    public initialize() {

        let pool = this.pool;

        //
        this.map.heros.forEach(function (value) {
            let en = CreateEntity(pool, "hero");
            AddComponent(AttributesComponent, en, new AttributesComponent);
            let heroCom = new HeroComponent();
            heroCom.name = value;
            AddComponent(HeroComponent, en, heroCom);
        });
        //
        this.map.goblins.forEach(function (value) {
            let en = CreateEntity(pool, "monster");
            AddComponent(MonsterComponent, en, new MonsterComponent);
            AddComponent(AttributesComponent, en, new AttributesComponent);
            //
            let goblinComp = new GoblinComponent();
            goblinComp.name = value;
            AddComponent(GoblinComponent, en, goblinComp);
        });
    }
    /**
     * 
     */
    public setPool(pool: Pool) {
        this.pool = pool;
    }
}


export class Map {
    /**
     * 
     */
    public name: string = '';
    /**
     * 
     */
    public heros: Array<string> = ['Tom', 'Lily'];
    /**
     * 
     */
    public goblins: Array<string> = ['Guru', 'Waga', 'One-eyed'];
    /**
     * 
     */
    constructor(name: string) {
        this.name = name;
    }
    /**
     * 
     */
    public build(scene: Scene) {
        console.log("build:" + this.name);
        this.buildSystems(scene);
    }
    /**
     * 
     */
    public buildSystems(scene: Scene) {
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
    }
}