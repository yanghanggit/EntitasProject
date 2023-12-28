/**
 * 
 */
import { Scene } from "./Scene";
// import { MyExecuteSystem } from "./MyExecuteSystem";
// import { MyReactiveSystem } from "./MyReactiveSystem";
import { HeroSystem } from "./HeroSystem";
import { GoblinSystem } from "./GoblinSystem";
import { DeadSystem } from "./DeadSystem";
import { FirstDungonBuildSystem } from "./FirstDungonBuildSystem";
import { DestroyEntitySystem } from "./DestroyEntitySystem";
import { GoblinAttackSystem } from "./GoblinAttackSystem";
import { HealthSystem } from "./HealthSystem";
import { ItemSystem } from "./ItemSystem";
import { WarriorSystem } from "./WarriorSystem";
import { MageSystem } from "./MageSystem";
import { FireBallSystem } from "./FireBallSystem";
import { MageFireBallExplodeSystem } from "./MageFireBallExplodeSystem";
import { DOTSystem } from "./DOTSystem";
import { MonsterSystem } from "./MonsterSystem";
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
        //test sys
        // systems.add(myPool.createSystem(MyExecuteSystem));
        // systems.add(myPool.createSystem(MyReactiveSystem));
        //first system
        let mapBuildSystem = myPool.createSystem(FirstDungonBuildSystem) as FirstDungonBuildSystem;
        mapBuildSystem.map = this;
        systems.add(mapBuildSystem);
        //game system 
        systems.add(myPool.createSystem(HeroSystem));
        systems.add(myPool.createSystem(WarriorSystem));
        systems.add(myPool.createSystem(MageSystem));
        systems.add(myPool.createSystem(FireBallSystem)); //
        systems.add(myPool.createSystem(MageFireBallExplodeSystem));
        //
        systems.add(myPool.createSystem(MonsterSystem));
        systems.add(myPool.createSystem(GoblinSystem));
        systems.add(myPool.createSystem(GoblinAttackSystem));
        //
        systems.add(myPool.createSystem(DOTSystem));
        systems.add(myPool.createSystem(HealthSystem));
        systems.add(myPool.createSystem(ItemSystem));
        systems.add(myPool.createSystem(DeadSystem));
        //end sys
        systems.add(myPool.createSystem(DestroyEntitySystem));
    }
}