/**
 * 
 */
import { Entity } from "../lib/entitas/Entity";
import { IComponent } from "../lib/entitas/interfaces/IComponent";
import { EmptyComponent } from "./Components";

export const Components: IComponent[] = [
    EmptyComponent,
];
Entity.initialize(Components.length, { "entities": 200, "components": 128 });

export const COMPONENT_ID_PROPERTY: string = 'component_id';
(function () {
    for (let i = 0; i < Components.length; i++) {
        let comClass = Components[i];
        comClass[COMPONENT_ID_PROPERTY] = i;
    }
})();





