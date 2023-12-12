//module entitas.exceptions {
"use strict"

import { Exception } from "./Exception";//import Exception = entitas.Exception

export class EntityIsAlreadyReleasedException extends Exception {
  /**
   * Entity Is Already Released Exception
   * @constructor
   */
  public constructor() {
    super("Entity is already released!")
  }
}
//}
