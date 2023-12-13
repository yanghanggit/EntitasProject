
import { IExecuteSystem } from "../lib/entitas/interfaces/IExecuteSystem";
import { ISetPool } from "../lib/entitas/interfaces/ISystem";
import { IInitializeSystem } from "../lib/entitas/interfaces/IInitializeSystem";
import { Pool } from "../lib/entitas/Pool";
import { Group } from "../lib/entitas/Group";
import { Matcher } from "../lib/entitas/Matcher";
import { ComponentIds } from "./Components";
import { PositionComponent } from "./Components";
import { Bag } from "../lib/entitas/utils/Bag";
//import { VelocityComponent } from "./Components";


export class MovementSystem implements IInitializeSystem, IExecuteSystem, ISetPool {

    protected pool: Pool;
    protected group: Group;

    public initialize() {
        console.log("MovementSystem initialize");
        
      let en =  this.pool.createEntity('Player');
      let p = new PositionComponent;
      p.x = 10; p.y = 20;
    //   let v = new VelocityComponent;
    //   v.x = 100; v.y = 200;

      en.addComponent(ComponentIds.Position, p);
      //en.addComponent(ComponentIds.Velocity, v);

    //   .addBounds(43)
    //   .addVelocity(0, 0)
    //   .addPosition(~~(bosco.config.width/4), ~~(bosco.config.height-80))
    //   .addLayer(Layer.ACTORS_3)
    //   .addResource('fighter')
    //   .setPlayer(true);



    }

    public execute() {
        //console.log("MovementSystem execute");
        var entities = this.group.getEntities();
        for (var i = 0, l = entities.length; i < l; i++) {
            var e = entities[i];
            let p = e.getComponent(ComponentIds.Position);
            //let v = e.getComponent(ComponentIds.Velocity);
            console.log('???');
        }
    }

    public setPool(pool: Pool) {
        console.log("MovementSystem setPool");
        this.pool = pool;
        this.group = pool.getGroup(Matcher.allOf(ComponentIds.Position));
    }
}