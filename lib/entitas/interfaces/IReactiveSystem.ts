//module entitas {

import { ISystem } from "./ISystem"
import { Entity } from "../Entity"
import { IMatcher } from "./IMatcher"
import { TriggerOnEvent } from "../TriggerOnEvent"

export interface IReactiveExecuteSystem extends ISystem {
  execute(entities: Array<Entity>): void
}

export interface IMultiReactiveSystem extends IReactiveExecuteSystem {
  triggers: Array<TriggerOnEvent>
}

export interface IReactiveSystem extends IReactiveExecuteSystem {
  trigger?: TriggerOnEvent
}

export interface IEnsureComponents {
  ensureComponents: IMatcher
}

export interface IExcludeComponents {
  excludeComponents: IMatcher
}

export interface IClearReactiveSystem {
  clearAfterExecute: boolean
}


//}

