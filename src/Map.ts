/**
 * 
 */
import { Scene } from "./Scene";
import { MyExecuteSystem } from "./MyExecuteSystem";
import { MyReactiveSystem } from "./MyReactiveSystem";
import { HeroSystem } from "./HeroSystem";
import { GoblinSystem } from "./GoblinSystem";
import { SkillSystem } from "./SkillSystem";
import { DeadSystem } from "./DeadSystem";
import { MapBuildSystem } from "./MapBuildSystem";
import { DestroyEntitySystem } from "./DestroyEntitySystem";
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
        systems.add(myPool.createSystem(SkillSystem));
        systems.add(myPool.createSystem(DeadSystem));

        systems.add(myPool.createSystem(DestroyEntitySystem));        
    }
}