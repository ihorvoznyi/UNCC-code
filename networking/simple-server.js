const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', buff => {
    console.log(`Received: ${buff.toString()}`);
  });
});

server.listen(3010, '127.0.0.1', () => {
  console.log('Server is open on', server.address());
});