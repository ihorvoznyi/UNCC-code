const net = require('net');

const sender = net.connect({ host: '127.0.0.1', port: 3010 }, () => {
  console.log('Connected to:', sender.address());
  sender.write('Hi from the simple sender application.');
});
