const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter({ captureRejections: true });
emitter.setMaxListeners(3);

emitter.on('event1', (...args) => {
  console.log('you know what');
});

emitter.addListener('asyncEvent', console.log);
emitter.addListener('event1', () => console.log('Nothing'));
emitter.addListener('event2', console.log);

emitter.on('errHandler', async () => {
  throw new Error('kaboom');
});

emitter[Symbol.for('nodejs.rejection')] = () => {
  console.log('oops');
};

emitter.prependListener('event1', (stream) => {
  console.log('someone connected!');
}); 

console.log(emitter.listeners('event1'));
emitter.off('event1', function() {});
console.log(emitter.listeners('event1'));
// console.log(emitter.listeners('event1'));