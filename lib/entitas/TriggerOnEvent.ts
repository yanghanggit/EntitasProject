//module entitas {
"use strict"

import { GroupEventType } from "./Matcher"//import GroupEventType = entitas.GroupEventType
import { IMatcher } from "./interfaces/IMatcher"

export class TriggerOnEvent {
  /**
   * @constructor
   *
   * @param trigger
   * @param eventType
   */
  constructor(public trigger: IMatcher, public eventType: GroupEventType) { }
}
//}