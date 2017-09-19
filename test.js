const assert = require('assert');

const Cake = require('./');

const Schema = Cake.Schema;
const Chunk = Cake.Chunk;

const created = Date();

const chunk = new Chunk(
    new Schema()
        .addFieldNumber('id')
        .addFieldString('name')
        .addFieldBoolean('visible')
        .addFieldNumber('xid')
        .addFieldString('description')
        .addFieldBoolean('flag', true)
        .addFieldString('created', created)
);

const object1 = {
    id: 777,
    name: 'Hello world.',
    visible: true,
    xid: 10001,
    description: 'This some description',
    flag: true,
    
};

const bytes = chunk.serialize(object1);
    console.log('Result length: ', bytes.length, 'bytes');
    
const object2 = chunk.deserialize(bytes);

object1.created = created;
assert.deepEqual(object1, object2);
    console.log(object1);
    console.log(object2);
