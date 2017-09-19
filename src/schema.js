'use strict';

const Type = require('./type');

class Schema {
    constructor() {
        this._fields = [];
        this._types = [];
        this._values = [];
    }
    _addField(type, id, value) {
        this._fields.push(id);
        this._types.push(type);
        this._values.push(value)
        return this;
    }
    addFieldString(id, value) {
        return this._addField(Type.string, id, value || '');
    }
    addFieldNumber(id, value) {
        return this._addField(Type.number, id, value || 0);
    }
    addFieldBoolean(id, value) {
        return this._addField(Type.boolean, id, value || false);
    }
    map(iterator) {
        const array = [];
        for(let i=0; i<this._fields.length; i++) {
            const id = this._fields[i];
            const type = this._types[i];
            const value = this._values[i];
            array[i] = iterator(type, id, value);
        }
        return array;
    }
}

module.exports = Schema;