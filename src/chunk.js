'use strict';

const Utils = require('./utils');
const Type = require('./type');

class Chunk {
    constructor(schema) {
        this._schema = schema;
    }
    serialize(object) {
        return this._schema.map(
            (type, id, value) => {
                switch (type) {
                    case Type.string: {
                        const string = id in object ? object[id] : value;
                        return Utils.int32ToBytes(string.length).concat(Utils.stringToBytes(string));
                    }
                    case Type.number: {
                        const number = id in object ? object[id] : value;
                        return Utils.int32ToBytes(number);
                    }
                    case Type.boolean: {
                        const bool = id in object ? object[id] : value;
                        return Utils.booleanToBytes(bool);
                    }
                }
            }
        ).reduce(
            (a, b) => {
                return a.concat(b)
            },
            []
        );
    }
    deserialize(bytes) {
        let index = 0;
        return this._schema
            .map(
                (type, id, value) => {
                    switch (type) {
                        case Type.string: {
                            const length = Utils.bytesToInt32(bytes.slice(index, index + 4))<<1;
                            index += 4;
                            const result = {
                                id: id,
                                value: Utils.bytesToString(bytes.slice(index, index + length))
                            };
                            index += length;
                            return result
                        }
                        case Type.number: {
                            const result = {
                                id: id,
                                value: Utils.bytesToInt32(bytes.slice(index, index + 4))
                            };
                            index += 4;
                            return result;
                        }
                        case Type.boolean: {
                            const result = {
                                id: id,
                                value:  Utils.bytesToBoolean(bytes.slice(index, index + 1))
                            };
                            index += 1;
                            return result;
                        }
                    }
                }
            )
            .reduce(
                (a, b) => {
                    a[b.id] = b.value;
                    return a;
                },
                {}
            );
    }
}

module.exports = Chunk;