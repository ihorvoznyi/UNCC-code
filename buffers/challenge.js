const { Buffer } = require('node:buffer');
const buffer = Buffer.alloc(4);

const bufferProto = Object.getPrototypeOf(buffer);
const uintProto = Object.getPrototypeOf(bufferProto);

console.log(Object.getPrototypeOf({}));
