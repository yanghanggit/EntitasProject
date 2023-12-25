//module entitas {
"use strict"

import { Group } from "./Group"//import Group = entitas.Group
import { Entity } from "./Entity"//import Entity = entitas.Entity
import { Matcher } from "./Matcher"//import Matcher = entitas.Matcher
import { IComponent } from "./interfaces/IComponent"//import IComponent = entitas.IComponent
import { GroupEventType } from "./Matcher"//import GroupEventType = entitas.GroupEventType
import { GroupObserverException } from "./exceptions/GroupObserverException"//import GroupObserverException = entitas.exceptions.GroupObserverException
import { GroupChanged } from "./Group"


export class GroupObserver {

  /**
   * Entities being observed
   * @type {Object<string,entitas.Entity>}
   * @name entitas.GroupObserver#collectedEntities */
  public get collectedEntities() { return this._collectedEntities; }

  private _collectedEntities: { [key: string]: Entity } = {};// = {}
  protected _groups: Array<Group> | null = null
  protected _eventTypes: Array<GroupEventType> | null = null
  protected _addEntityCache:  /*Group.*/GroupChanged | null = null


  /**
   * @constructor
   * @param {Array<entitas.Group>} groups
   * @param {number} eventTypes
   */
  constructor(groups: Group[] | Group, eventTypes: GroupEventType[] | GroupEventType) {
    this._groups = Array.isArray(groups) ? groups : [groups]
    this._eventTypes = Array.isArray(eventTypes) ? eventTypes : [eventTypes]

    if (this._groups.length !== this._eventTypes.length) {
      throw new GroupObserverException("Unbalanced count with groups (" + this._groups.length +
        ") and event types (" + this._eventTypes.length + ")")
    }
    this._collectedEntities = {}
    this._addEntityCache = this.addEntity
    this.activate()
  }

  /**
   * Activate events
   */
  activate() {
    if (this._groups == null) {
      throw new Error("_groups is null");
    }
    if (this._eventTypes == null) {
      throw new Error("_groups is null");
    }
    for (let i = 0, groupsLength = this._groups.length; i < groupsLength; i++) {
      const group: Group = this._groups[i]
      const eventType: GroupEventType = this._eventTypes[i]

      if (eventType === GroupEventType.OnEntityAdded) {

        group.onEntityAdded?.remove(this._addEntityCache)
        group.onEntityAdded?.add(this._addEntityCache)

      } else if (eventType === GroupEventType.OnEntityRemoved) {

        group.onEntityRemoved?.remove(this._addEntityCache)
        group.onEntityRemoved?.add(this._addEntityCache)

      } else if (eventType === GroupEventType.OnEntityAddedOrRemoved) {

        group.onEntityAdded?.remove(this._addEntityCache)
        group.onEntityAdded?.add(this._addEntityCache)
        group.onEntityRemoved?.remove(this._addEntityCache)
        group.onEntityRemoved?.add(this._addEntityCache)

      } else {
        throw `Invalid eventType [${typeof eventType}:${eventType}] in GroupObserver::activate`
      }
    }
  }

  /**
   * Deavtivate events
   */
  deactivate() {
    if (this._groups === null) {
      throw new Error("this._groups === null");
    }

    for (let i = 0, groupsLength = this._groups.length; i < groupsLength; i++) {
      const group: Group = this._groups[i]

      group.onEntityAdded?.remove(this._addEntityCache)
      group.onEntityRemoved?.remove(this._addEntityCache)

      this.clearCollectedEntities()
    }

  }

  /**
   * Clear the list of entities
   */
  clearCollectedEntities() {
    for (let e in this._collectedEntities) {
      this._collectedEntities[e].release()
    }
    this._collectedEntities = {}
  }

  /**
   * Adds an entity to this observer group
   * @param group
   * @param {entitas.Entity}entity
   * @param index
   * @param {entitas.IComponent}component
   */
  addEntity = (group: Group, entity: Entity, index: number, component: IComponent) => {
    if (!(entity.id in this._collectedEntities)) {
      this._collectedEntities[entity.id] = entity
      entity.addRef()
    }
  }
}
//}