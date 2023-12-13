
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { CreateEntity, AddComponent, GetComponent, CID } from "./EntitasExtension" 
import { PositionComponent } from "./Components";


export class MovementSystem implements IInitializeSystem, IExecuteSystem, ISetPool {

    protected pool: Pool;
    protected group: Group;

    public initialize() {
        console.log("MovementSystem initialize");
        let en = CreateEntity(this.pool, 'Player');
        let p = new PositionComponent;
        p.x = 10; p.y = 20;
        AddComponent(PositionComponent, en, p);
    }

    public execute() {
        var entities = this.group.getEntities();
        for (var i = 0, l = entities.length; i < l; i++) {
            var e = entities[i];
            let p = GetComponent(PositionComponent, e);
            console.log('p.x = ' + p.x);
            console.log('p.x = ' + p.y);
        }
    }

    public setPool(pool: Pool) {
        console.log("MovementSystem setPool");
        this.pool = pool;
        this.group = pool.getGroup(Matcher.allOf(
            CID(PositionComponent)

        ));
    }
}