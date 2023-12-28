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
import { HeroComponent, MonsterComponent, GoblinComponent, AttributesComponent, GoblinAttackComponent } from "./Components";
import { MyEntity } from "./MyEntity";
import { MyUtil } from "./MyUtil";
import { Entity } from "../lib/entitas/Entity";
/**
 * 
 */
export class GoblinSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
    /**
     * 
     */
    private pool: Pool | null = null;
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
        const goblinEntities = this.group1!.getEntities();
        goblinEntities.forEach(en => {
            const me = en as MyEntity;
            this.sayHi(me);
        });
    }
    /**
     * 
     */
    private sayHi(entity: MyEntity): void {
        const attributesComponent = entity.GetComponent(AttributesComponent);
        console.log(`Yaha! I'm a mighty goblin! they call me ${attributesComponent!.name}! Watch out, here I come, woooo!`);
    }
    /**
     * 
     */
    public execute(): void {
        const monsterEntities = this.group1!.getEntities();
        const heroEntities = this.group2!.getEntities();
        monsterEntities.forEach(e => {
            const me = e as MyEntity;
            this.goblinAttack(me, heroEntities);
        });
    }
    /**
     * 
     */
    private goblinAttack(goblin: MyEntity, heros: Array<Entity>): void {
        if (!this.attackCooldown(goblin, true)) {
            return;
        }
        const hero = MyUtil.randomElementFromArray(heros) as MyEntity;
        if (hero) {
            const goblinAttackComponent = goblin.AddComponent(GoblinAttackComponent);
            goblinAttackComponent.destEntityId = hero.id;
        }
    }
    /**
     * 
     */
    private attackCooldown(goblin: MyEntity, resetCooldown: boolean = true): boolean {
        const goblinComponent = goblin.GetComponent(GoblinComponent);
        --goblinComponent.attackCooldown;
        if (goblinComponent.attackCooldown <= 0) {
            goblinComponent.attackCooldown = resetCooldown ? goblinComponent.attackCooldownMax : 0;
            return true;
        }
        return false;
    }
    /**
     * 
     */
    public setPool(pool: Pool): void {
        this.pool = pool;
        this.group1 = pool.getGroup(Matcher.allOf(
            COMP_ID(MonsterComponent), COMP_ID(GoblinComponent), COMP_ID(AttributesComponent)
        ));
        this.group2 = pool.getGroup(Matcher.allOf(
            COMP_ID(HeroComponent), COMP_ID(AttributesComponent)
        ));
    }
}