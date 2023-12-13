/**
 * 
 */
import { Entity } from "../lib/entitas/Entity";
import { IComponent } from "../lib/entitas/interfaces/IComponent";
import { PositionComponent } from "./Components";

export const Components: IComponent[] = [
    PositionComponent,
];

export const COMPONENT_ID_PROPERTY: string = 'component_id';


Entity.initialize(Components.length, { "entities": 200, "components": 128 });

(function () {

    for (let i = 0; i < Components.length; i++) {

        let comClass = Components[i];

        console.log("comClass = " + comClass['name']);
        comClass[COMPONENT_ID_PROPERTY] = i;
        console.log("comClass = " + comClass[COMPONENT_ID_PROPERTY]);
    }
})();





