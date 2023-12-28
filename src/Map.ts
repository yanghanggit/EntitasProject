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
import { MageFireBallSystem } from "./MageFireBallSystem";
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
    private name: string = '';
    /**
     * 
     */
    public readonly heroNames: Array<string> = ['[Tom]', '[Lily]'];
    public readonly heroCareers: Array<string> = ['[warrior]', '[mage]'];
    public readonly warriorsFood: Array<string> = ['bread', 'strawberries', 'rum'];
    /**
     * 
     */
    public readonly goblinNames: Array<string> = ['[Guru]', '[Waga]', '[One-eyed]'];
    /**
     * 
     */
    constructor(name: string) {
        this.name = name;
    }
    /**
     * 
     */
    public build(scene: Scene): void {
        console.log("build:" + this.name);
        this.buildSystems(scene);
    }
    /**
     * 
     */
    private buildSystems(scene: Scene): void {
        if (scene.systems === null || scene.myPool === null) {
            return;
        }
        const systems = scene.systems;
        const myPool = scene.myPool;
        //test sys
        // systems.add(myPool.createSystem(MyExecuteSystem));
        // systems.add(myPool.createSystem(MyReactiveSystem));
        //first system
        const mapBuildSystem = myPool.createSystem(FirstDungonBuildSystem) as FirstDungonBuildSystem;
        mapBuildSystem.map = this;
        systems.add(mapBuildSystem);
        //game system 
        systems.add(myPool.createSystem(HeroSystem));
        systems.add(myPool.createSystem(WarriorSystem));
        systems.add(myPool.createSystem(MageSystem));
        systems.add(myPool.createSystem(MageFireBallSystem)); 
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