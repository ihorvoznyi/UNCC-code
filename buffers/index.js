const { Blob, Buffer } = require('node:buffer');

console.time('operation');
const textEncoder = new TextEncoder();
const binaryHello = textEncoder.encode('asfljas fas fouasoufgi asgify gasgf yasgiyf gaisyg fiysagiyf aisygf asgif asoufhuoa');

console.log('Binary', binaryHello);
const blob = new Blob([binaryHello, ' ', 'world'], {type: 'text/plain'});

const mc1 = new MessageChannel();

mc1.port2.onmessage = async ({ data }) => {
  const arrayBuffer = await data.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  console.log(buffer.toString());

  mc1.port2.close();
};

mc1.port1.postMessage(blob);
console.timeEnd('operation');