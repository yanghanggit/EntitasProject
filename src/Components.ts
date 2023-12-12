/**
 * 
 */
import { Entity } from "../lib/entitas/Entity";
export enum ComponentIds {
    TotalComponents = 1024
}
Entity.initialize(ComponentIds.TotalComponents, { "entities": 200, "components": 128 });