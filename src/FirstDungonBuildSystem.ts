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
    private pool: MyPool | null = null;
    /**
     * 
     */
    public map: Map | null = null;
    /**
     * 
     */
    public initialize(): void {
        this.createHeros();
        this.createGoblins();
    }
    /**
     * 
     */
    public setPool(pool: Pool): void {
        this.pool = pool as MyPool;
    }
    /**
     * 
     */
    private createHeros(): void {
        if (this.map === null || this.pool === null) {
            return;
        }
        const heroNames = this.map.heroNames;
        const heroCareers = this.map.heroCareers;
        const warriorsFood = this.map.warriorsFood;
        heroNames.forEach((name, i) => this.createHero(name, heroCareers[i], warriorsFood));
    }
    /**
     * 
     */
    private createHero(herosName: string, herosCareer: string, items: Array<string>): MyEntity {
        const heroEntity = this.pool!.createEntity("hero") as MyEntity;
        heroEntity.AddComponent(HeroComponent);

        const attributesComponent = heroEntity.AddComponent(AttributesComponent);
        attributesComponent.name = herosName;

        const career = herosCareer;
        if (career === '[warrior]') {
            heroEntity.AddComponent(WarriorComponent);
            this.initWarrior(heroEntity, items);
        }
        else if (career === '[mage]') {
            heroEntity.AddComponent(MageComponent);
        }
        else {
            throw new Error("unknown hero's career!!!!");
        }
        return heroEntity;
    }
    /**
     * 
     */
    private initWarrior(warrior: MyEntity, foodNames: string[]): void {
        const herosPackEntity = this.addPackToHero(warrior);
        foodNames.forEach((foodName) => {
            this.createFoodAndAddToPack(herosPackEntity, foodName);
        });
    }
    /**
     * 
     */
    private getPackFromHero(hero: MyEntity): MyEntity | null {
        const heroComponent = hero.GetComponent(HeroComponent);
        if (heroComponent.pack !== '') {
            return this.pool!.getEntity(heroComponent.pack);
        }
        return null;
    }
    /**
     * 
     */
    private addPackToHero(hero: MyEntity): MyEntity {
        let herosPackEntity = this.getPackFromHero(hero);
        if (herosPackEntity === null) {

            herosPackEntity = this.pool!.createEntity("pack") as MyEntity;
            herosPackEntity.AddComponent(PackComponent);

            const heroComponent = hero.GetComponent(HeroComponent);
            heroComponent.pack = herosPackEntity.id;
        }
        return herosPackEntity;
    }
    /**
     * 
     */
    private createFoodAndAddToPack(herosPackEntity: MyEntity, foodName: string): void {
        const itemAsFoodEntity = this.createFood(foodName);
        if (itemAsFoodEntity !== null) {
            const packComponent = herosPackEntity.GetComponent(PackComponent);
            packComponent.items.push(itemAsFoodEntity.id);
        }
    }
    /**
     * 
     */
    private createFood(foodName: string): MyEntity {
        const itemAsFoodEntity = this.pool!.createEntity("item") as MyEntity;
        itemAsFoodEntity.AddComponent(ItemComponent);
        const foodComponent = itemAsFoodEntity.AddComponent(FoodComponent);
        foodComponent.foodName = foodName;
        return itemAsFoodEntity;
    }
    /**
     * 
     */
    private createGoblins(): void {
        if (this.map === null || this.pool == null) {
            return;
        }
        const pool = this.pool;
        const goblinNames = this.map.goblinNames;
        goblinNames?.forEach(goblinsName => {
            const goblinEntity = pool.createEntity("monster") as MyEntity;
            goblinEntity.AddComponent(MonsterComponent);

            const attributesComponent = goblinEntity.AddComponent(AttributesComponent);
            attributesComponent.name = goblinsName;

            const goblinComponent = goblinEntity.AddComponent(GoblinComponent);
            goblinComponent.attackCooldown = goblinComponent.attackCooldownMax = MyUtil.randomRange(3, 5) * 60;
        });
    }
}