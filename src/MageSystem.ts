/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { CID } from "./ComponentsPreprocessing"
import { HeroComponent, AttributesComponent, MageComponent, MonsterComponent, MagicComponent, FireBallComponent } from "./Components";
import { MyEntity } from "./MyEntity";
import { MyPool } from "./MyPool";
import { Entity } from "../lib/entitas/Entity";
import { MyUtil } from "./MyUtil";
/**
 * 
 */
export class MageSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
    /**
     * 
     */
    pool: MyPool | null = null;
    /**
     * 
     */
    group1: Group | null = null;
    /**
    * 
    */
    group2: Group | null = null;
    /**
     * 
     */
    initialize() {
        const entities = this.group1!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const e = entities[i] as MyEntity;
            this.sayhi(e);
        }
    }
    /**
     * 
     */
    execute() {
        const entities = this.group1!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const e = entities[i] as MyEntity;
            this.spell(e);
        }
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
        this.group1 = pool.getGroup(
            Matcher.allOf(CID(HeroComponent), CID(AttributesComponent), CID(MageComponent))
        );
        this.group2 = pool.getGroup(Matcher.allOf(
            CID(MonsterComponent), CID(AttributesComponent)
        ));
    }
    /**
     * 
     */
    private sayhi(entity: MyEntity) {
        const __AttributesComponent = entity.GetComponent(AttributesComponent);
        console.log(`My name is ${__AttributesComponent!.name}, I'm a mage, ke~ ke~`);
    }
    /**
     * 
     */
    private spell(entity: MyEntity) {
        this.randomSpell(entity, this.group2!.getEntities());
    }
    /**
     * 
     */
    private randomSpell(mage: MyEntity, monsters: Array<Entity>) {
        if (!this.checkSpellCooldown(mage, true)) {
            return;
        }
        const monster = MyUtil.randomElementFromArray(monsters) as MyEntity;
        if (monster === undefined) {
            return;
        }
        this.releaseFireBall(mage, monster, 40);
    }
    /**
     * 
     */
    private checkSpellCooldown(mage: MyEntity, resetCooldown: boolean = true): boolean {
        const __MageComponent = mage.GetComponent(MageComponent);
        --__MageComponent.spellCooldown;
        if (__MageComponent.spellCooldown <= 0) {
            __MageComponent.spellCooldown = resetCooldown ? __MageComponent.spellCooldownMax : 0;
            return true;
        }
        return false;
    }
    /**
     * 
     */
    private releaseFireBall(mage: MyEntity, monster: MyEntity, spendMana: number): MyEntity | null {
        const __AttributesComponent = mage.GetComponent(AttributesComponent);
        if (__AttributesComponent.mana < spendMana) {
            return null;
        }
        __AttributesComponent.mana -= spendMana;
        __AttributesComponent.mana = Math.max(0, __AttributesComponent.mana);
        //
        const pool = this.pool;
        const magicEntity = pool!.createEntity("magic") as MyEntity;
        const __MagicComponent = magicEntity.AddComponent(MagicComponent);
        __MagicComponent.src = mage.id;
        __MagicComponent.target = monster.id;
        const __FireBallComponent = magicEntity.AddComponent(FireBallComponent);
        return magicEntity;
    }
}