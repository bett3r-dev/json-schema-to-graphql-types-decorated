const {MappingBaseType} = require('./base')
const {camelize, isObjectType} = require('./utils')

function isArray(obj) {
  return obj.type === 'array' // && isObjectType(obj.items)
}

function toArray(obj) {
  return isArray(obj) && MappingArray
    .create(obj)
    .resolveNested()
}

class MappingArray extends MappingBaseType {
  get baseType() {
    return this.refType
  }

  get refType() {
    return camelize(this._refType)
  }

  get _refType() {
    return this.reference
      ? this.resolveRefName
      : this._itemType
  }

  get _itemType() {
    return this.items
      ? this.resolveItemType
      : 'string'
  }

  get reference() {
    return this.item.$ref
  }

  get item() {
    return this.items[0]
  }

  get resolveItemType() {
    return this.resolveSimpleItemType || this.resolveRefName || this.error('Unable to resolve type of array')
  }

  get resolveSimpleItemType() {
    const type = this.item.type
    return typeof type === 'string'
      ? type
      : type.name
  }

  get is() {
    return 'type-ref'
  }

  get definition() {
    return this.type
  }

  get multiple() {
    return true
  }

  constructor(obj) {
    super(obj)
    this.items = this.value.items
    this._type = this.items.type
  }

  get valid() {
    return Array.isArray(this.items)
  }

  // TODO
  resolveNested() {
    return this
  }

  static create(obj) {
    return new MappingArray(obj)
  }

  get dataType() {
    return `[${this.type}]${this.req}`
  }
}

module.exports = {
  toArray,
  MappingArray
}
