/**
 * 
 */
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { COMP_ID } from "./ComponentsPreprocessing"
import { AttributesComponent, DeadComponent, GoblinAttackComponent, HeroComponent, MageComponent, WarriorComponent } from "./Components";
import { IReactiveSystem } from "../lib/entitas/interfaces/IReactiveSystem";
import { TriggerOnEvent } from "../lib/entitas/TriggerOnEvent";
import { Entity } from "../lib/entitas/Entity";
import { GroupEventType } from "../lib/entitas/Matcher";
import { MyEntity } from "./MyEntity";
import { MyPool } from "./MyPool";
import { MyUtil } from "./MyUtil";
/**
 * 
 */
export class GoblinAttackSystem implements ISetPool, IReactiveSystem {
    /**
     * 
     */
    private pool: MyPool | null = null;
    /**
     * 
     */
    private group: Group | null = null;
    /**
     * 
     */
    public trigger?: TriggerOnEvent;
    /**
     * 
     */
    public execute(entities: Array<Entity>): void {
        entities.forEach((en) => {
            const goblin = (en as MyEntity);
            const targetEntity = this.goblinFinallyDecidedTarget(goblin);
            if (targetEntity !== null) {
                this.goblinCauseDamages(goblin, targetEntity);
            }
            goblin.RemoveComponent(GoblinAttackComponent);
        });
    }
    /**
     * 
     */
    private goblinCauseDamages(goblin: MyEntity, hero: MyEntity): void {
        const heroAttributesComponent = hero.GetComponent(AttributesComponent);
        const goblinAttributesComponent = goblin.GetComponent(AttributesComponent);
        //
        const damage = Math.max(0, goblinAttributesComponent.attack - heroAttributesComponent.defense);
        heroAttributesComponent.health -= damage;
        heroAttributesComponent.health = Math.max(0, heroAttributesComponent.health);
        console.log(`Snarling with glee, ${goblinAttributesComponent!.name} strikes ${heroAttributesComponent!.name}, dealing a hefty blow! Alas, ${heroAttributesComponent!.name} is left with just ${heroAttributesComponent.health} health points!`);
    }
    /**
     * 
     */
    private goblinFinallyDecidedTarget(goblin: MyEntity): MyEntity | null {
        const heroAsTargetEntity = this.goblinDefaultTarget(goblin);
        if (heroAsTargetEntity === null) {
            return null;
        }
        //
        this.goblinYelled(goblin, heroAsTargetEntity);
        //
        const heroAttackedIsMage = heroAsTargetEntity.HasComponent(MageComponent);
        if (heroAttackedIsMage) {
            const warrior = this.heroWarriorArrived();
            if (warrior !== null) {
                const heroAsTargetAttributesComponent = heroAsTargetEntity.GetComponent(AttributesComponent);
                const goblinAttributesComponent = goblin.GetComponent(AttributesComponent);
                const warriorAttributesComponent = warrior.GetComponent(AttributesComponent);
                console.log(`In a heroic feat, ${warriorAttributesComponent!.name} dashes in, shielding ${heroAsTargetAttributesComponent!.name} from ${goblinAttributesComponent!.name}'s vicious attack! The day is saved, for now...`);
                return warrior;
            }
        }
        return heroAsTargetEntity;
    }
    /**
     *
     */
    private goblinYelled(goblin: MyEntity, hero: MyEntity): void {
        const goblinAttributesComponent = goblin.GetComponent(AttributesComponent);
        const heroAttributesComponent = hero.GetComponent(AttributesComponent);
        console.log(`The goblin ${goblinAttributesComponent!.name} bellows with a menacing grin: "I shall vanquish you, ${heroAttributesComponent!.name}!"`);
    }
    /**
     * 
     */
    private heroWarriorArrived(): MyEntity | null {
        const entities = this.group!.getEntities();
        if (entities.length > 0) {
            return MyUtil.randomElementFromArray(entities) as MyEntity;
        }
        return null;
    }
    /**
     * 
     */
    private goblinDefaultTarget(goblin: MyEntity): MyEntity | null {
        const goblinAttackComponent = goblin.GetComponent(GoblinAttackComponent);
        return this.pool!.getEntity(goblinAttackComponent.destEntityId);
    }
    /**
     * 
     */
    public setPool(pool: Pool): void {
        this.pool = pool as MyPool;
        this.trigger = new TriggerOnEvent(Matcher.allOf(COMP_ID(GoblinAttackComponent)), GroupEventType.OnEntityAdded);
        this.group = pool.getGroup(Matcher.allOf(
            COMP_ID(HeroComponent), COMP_ID(AttributesComponent), COMP_ID(WarriorComponent)
        ).noneOf(
            COMP_ID(DeadComponent)
        ));
    }
}