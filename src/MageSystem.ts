/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { COMP_ID } from "./ComponentsPreprocessing"
import { HeroComponent, AttributesComponent, MageComponent, MonsterComponent, MagicComponent, FireBallComponent } from "./Components";
import { MyEntity } from "./MyEntity";
import { MyPool } from "./MyPool";
import { MyUtil } from "./MyUtil";
/**
 * 
 */
export class MageSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
    /**
     * 
     */
    private pool: MyPool | null = null;
    /**
     * 
     */
    private group1: Group | null = null;
    /**
    * 
    */
    private group2: Group | null = null;
    /**
     * 
     */
    public initialize(): void {
        const entities = this.group1!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const e = entities[i] as MyEntity;
            this.sayHi(e);
        }
    }
    /**
     * 
     */
    public execute(): void {
        const entities = this.group1!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const e = entities[i] as MyEntity;
            this.spell(e);
        }
    }
    /**
     * 
     */
    public setPool(pool: Pool): void {
        this.pool = pool as MyPool;
        this.group1 = pool.getGroup(
            Matcher.allOf(COMP_ID(HeroComponent), COMP_ID(AttributesComponent), COMP_ID(MageComponent))
        );
        this.group2 = pool.getGroup(Matcher.allOf(
            COMP_ID(MonsterComponent), COMP_ID(AttributesComponent)
        ));
    }
    /**
     * 
     */
    private sayHi(entity: MyEntity): void {
        const attributesComponent = entity.GetComponent(AttributesComponent);
        console.log(`"Behold! I am ${attributesComponent!.name}, master of the mystic arts, a mage like no other! Ke~ ke~" cackles the wizard with a twinkle in their eye.`);
    }
    /**
     * 
     */
    private spell(mage: MyEntity): void {
        if (!this.spellCooldown(mage, true)) {
            return;
        }
        const monster = MyUtil.randomElementFromArray(this.group2!.getEntities()) as MyEntity;
        if (monster) {
            const mageComponent = mage.GetComponent(MageComponent);
            if (this.spendMana(mage, mageComponent.spendMana)) {
                this.createFireBall(mage, monster);
                //
                const mageAttributesComponent = mage.GetComponent(AttributesComponent);
                const monsterAttributesComponent = monster.GetComponent(AttributesComponent);
                console.log(`With a flourish and a chant, ${mageAttributesComponent!.name} conjures a blazing fireball, hurling it towards ${monsterAttributesComponent!.name} with a fierce battle cry!`);
            }
        }
    }
    /**
     * 
     */
    private spellCooldown(mage: MyEntity, resetCooldown: boolean = true): boolean {
        const mageComponent = mage.GetComponent(MageComponent);
        --mageComponent.spellCooldown;
        if (mageComponent.spellCooldown <= 0) {
            mageComponent.spellCooldown = resetCooldown ? mageComponent.spellCooldownMax : 0;
            return true;
        }
        return false;
    }
    /**
     * 
     */
    private spendMana(mage: MyEntity, spendMana: number): boolean {
        const attributesComponent = mage.GetComponent(AttributesComponent);
        if (attributesComponent.mana < spendMana) {
            return false;
        }
        attributesComponent.mana -= spendMana;
        attributesComponent.mana = Math.max(0, attributesComponent.mana);
        return true;
    }
    /**
     * 
     */
    private createFireBall(mage: MyEntity, monster: MyEntity): MyEntity | null {
        //
        const fireballEntity = this.pool!.createEntity("magic") as MyEntity;
        const magicComponent = fireballEntity.AddComponent(MagicComponent);
        magicComponent.src = mage.id;
        magicComponent.target = monster.id;
        //
        fireballEntity.AddComponent(FireBallComponent);
        //
        return fireballEntity;
    }
}