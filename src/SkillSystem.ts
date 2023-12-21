/**
 * 
 */
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { CID } from "./EntitasExtension"
import { AttributesComponent, SkillComponent } from "./Components";
import { MyPool } from "./MyPool";
import { DeadComponent } from "./Components";
import { Matcher } from "../lib/entitas/Matcher";
import { MyEnity } from "./MyEntity";
/**
 * 
 */
export class SkillSystem implements IInitializeSystem, IExecuteSystem, ISetPool {
    /**
     * 
     */
    pool: MyPool | null = null;
    /**
     * 
     */
    group: Group | null = null;
    /**
     * 
     */
    initialize() {
    }
    /**
     * 
     */
    execute() {
        const entities = this.group!.getEntities();
        for (let i = 0, l = entities.length; i < l; i++) {
            const skillEn = entities[i] as MyEnity;
            const skillComp = skillEn.GetComponent(SkillComponent);
            console.log(skillComp.story);
            this.handleAttack(skillComp.src!, skillComp.dest!);
        }
        entities.forEach(async (en) => {
            this.pool!.destroyEntity(en);
        });
    }
    /**
     * 
     */
    setPool(pool: Pool) {
        this.pool = pool as MyPool;
        this.group = pool.getGroup(Matcher.allOf(
            CID(SkillComponent)
        ));
    }
    /**
     * 
     */
    private handleAttack(attackerEn: MyEnity, targetEn: MyEnity) {
        if (!attackerEn.HasComponent(AttributesComponent) || !targetEn.HasComponent(AttributesComponent)) {
            return;
        }
        const attributesComp_attackerEn = attackerEn.GetComponent(AttributesComponent);
        const attributesComp_targetEn = targetEn.GetComponent(AttributesComponent);
        let damage = attributesComp_attackerEn.attack - attributesComp_targetEn.defense;
        if (damage < 0) {
            damage = 0;
        }
        attributesComp_targetEn.health -= damage;
        if (attributesComp_targetEn.health < 0) {
            attributesComp_targetEn.health = 0;
            if (!targetEn.HasComponent(DeadComponent)) {
                targetEn.AddComponent(DeadComponent);
            }
        }
    }
}