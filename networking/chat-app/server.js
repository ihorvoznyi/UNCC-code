const net = require('node:net');

const server = net.createServer();

const clients = [];

server.on('connection', socket => {
  clients.push(socket);
  console.log(`Connected from ${socket.address().address}`);

  socket.on('data', data => {
    clients.map(client => client.write(data));
  });
});

server.listen(3001, '127.0.0.1', () => {
  console.log(`Server is listening on`, server.address());
});
