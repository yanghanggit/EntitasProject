//module entitas.exceptions {
"use strict"

import { Exception } from "./Exception";//import Exception = entitas.Exception
import { IMatcher } from "../interfaces/IMatcher";

export class SingleEntityException extends Exception {
  /**
   * Single Entity Exception
   * @constructor
   * @param matcher
   */
  public constructor(matcher: IMatcher) {
    super("Multiple entities exist matching " + matcher)
  }
}
//}
