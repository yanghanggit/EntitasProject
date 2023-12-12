//module entitas.exceptions {
"use strict"

import { Exception } from "./Exception";//import Exception = entitas.Exception
import { IMatcher } from "../interfaces/IMatcher";

export class MatcherException extends Exception {
  /**
   * Matcher Exception
   * @constructor
   * @param matcher
   */
  public constructor(matcher: IMatcher) {
    super("matcher.indices.length must be 1 but was " + matcher.indices.length)
  }
}
//}
