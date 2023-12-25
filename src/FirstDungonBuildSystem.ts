/**
 * 
 */
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { AttributesComponent, HeroComponent, MonsterComponent, GoblinComponent, WarriorComponent, MageComponent, PackComponent, FoodComponent, ItemComponent } from "./Components";
import { MyPool } from "./MyPool";
import { MyEntity } from "./MyEntity";
import { MyUtil } from "./MyUtil";
import { Map } from "./Map";
/**
 * 
 */
export class FirstDungonBuildSystem implements IInitializeSystem, ISetPool {
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
        this.createHeros();
        this.createMonsters();
    }
    /**
     * 
     */
    private createHeros() {
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
            {
                const career = heroCareers[i];
                if (career == '[warrior]') {
                    en.AddComponent(WarriorComponent);
                    this.initWarrior(en, ['bread', 'strawberries', 'rum']);
                    //this.testWarrior(en);
                }
                else if (career == '[mage]') {
                    en.AddComponent(MageComponent);
                }
                else {
                    console.log("unknown career = " + career)
                }
            }
        }
    }
    /**
     * 
     */
    private initWarrior(warrior: MyEntity, foodNames: string[]) {
        const packEntity = this.addPackToHero(warrior);
        foodNames.forEach((foodName) => {
            this.addFoodToPack(packEntity, foodName);
        });
    }
    /**
     * 
     */
    private addPackToHero(hero: MyEntity): MyEntity {
        const pool = this.pool;
        const __HeroComponent = hero.GetComponent(HeroComponent);
        if (__HeroComponent.pack !== '') {
            return pool!.getEntity(__HeroComponent.pack);
        }
        //
        const packEntity = pool!.createEntity("pack") as MyEntity;
        packEntity.AddComponent(PackComponent);
        __HeroComponent.pack = packEntity.id;
        return packEntity;
    }
    /**
     * 
     */
    private addFoodToPack(packEntity: MyEntity, foodName: string): MyEntity {
        const pool = this.pool;
        const __PackComponent = packEntity.GetComponent(PackComponent);
        const itemEntity = pool!.createEntity("item") as MyEntity;
        itemEntity.AddComponent(ItemComponent);
        __PackComponent.items.push(itemEntity.id);
        //
        const __FoodComponent = itemEntity.AddComponent(FoodComponent);
        __FoodComponent.foodName = foodName;
        return itemEntity;
    }
    /**
     * 
     */
    private testWarrior(warrior: MyEntity): boolean {
        if (!warrior.HasComponent(WarriorComponent)) {
            throw new Error("!warrior.HasComponent(WarriorComponent)");
        }
        const __AttributesComponent = warrior.GetComponent(AttributesComponent);
        console.log(`Hey,I,${__AttributesComponent!.name},a warrior,got some food!`);
        //
        const pool = this.pool;
        const __HeroComponent = warrior.GetComponent(HeroComponent);
        const __packEntity = pool!.getEntity(__HeroComponent.pack);
        const __PackComponent = __packEntity.GetComponent(PackComponent);
        __PackComponent.items.forEach((itemEntityId) => {
            const itemEntity = pool!.getEntity(itemEntityId);
            itemEntity.GetComponent(ItemComponent);
            const __FoodComponent = itemEntity.GetComponent(FoodComponent);
            console.log(__FoodComponent.foodName + '!');
        });
        return true;
    }
    /**
     * 
     */
    private createMonsters() {
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