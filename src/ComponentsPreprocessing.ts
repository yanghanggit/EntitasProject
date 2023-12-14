/**
 * 
 */
import { Entity } from "../lib/entitas/Entity";
import { COMPONENTS} from "./Components";


Entity.initialize(COMPONENTS.length, { "entities": 200, "components": 128 });

export const COMPONENT_ID_PROPERTY: string = 'component_id';
(function () {
    for (let i = 0; i < COMPONENTS.length; i++) {
        let comClass = COMPONENTS[i];
        comClass[COMPONENT_ID_PROPERTY] = i;
    }
})();





