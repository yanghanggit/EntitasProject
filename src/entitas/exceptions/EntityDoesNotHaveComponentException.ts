//module entitas.exceptions {
"use strict";

import { Exception } from "./Exception";//import Exception = entitas.Exception;
import { Pool } from "../Pool";

export class EntityDoesNotHaveComponentException extends Exception {
  /**
   * Entity Does Not Have Component Exception
   * @constructor
   * @param message
   * @param index
   */
  public constructor(message: string, index: number) {
    super(message + "\nEntity does not have a component at index (" + index + ") " + /*entitas.*/Pool.componentsEnum[index]);
  }
}
//}
