
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { ComponentIds } from "./Components";
import { PositionComponent } from "./Components";

export class MovementSystem implements IInitializeSystem, IExecuteSystem, ISetPool {

    protected pool: Pool;
    protected group: Group;

    public initialize() {
        console.log("MovementSystem initialize");

        let en = this.pool.createEntity('Player');
        let p = new PositionComponent;
        p.x = 10; p.y = 20;
        en.addComponent(ComponentIds.Position, p);
    }

    public execute() {
        var entities = this.group.getEntities();
        for (var i = 0, l = entities.length; i < l; i++) {
            var e = entities[i];
            let p = e.getComponent(ComponentIds.Position) as PositionComponent;
            console.log('p.x = ' + p.x);
            console.log('p.x = ' + p.y);
        }
    }

    public setPool(pool: Pool) {
        console.log("MovementSystem setPool");
        this.pool = pool;
        this.group = pool.getGroup(Matcher.allOf(ComponentIds.Position));
    }
}