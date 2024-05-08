const net = require('node:net');
const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const serverAddress = {
  host: '127.0.0.1',
  port: 3001
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let isConnected = false;

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const ask = async () => {
  const message = await rl.question("Enter a message > ");
  socket.write(message);

  await moveCursor(0, -1);
  await clearLine(0);
};

const socket = net.createConnection(
  serverAddress, 
  async () => ask(),
);

socket.on('end', async () => {
  isConnected = false;
  console.log('\n You were diconnected =(');
  
  let retries = 0;
  let isRetry = true;

  while(isRetry) {
    ++retries;
    isRetry = retries < 5;

    if (isConnected) {
      break;
    }

    console.log(`(${retries}) Trying to reconnect...`);

    await sleep(1000);

    socket.connect(serverAddress, handleMessaging);

    if (isConnected) break;
    else if (!isRetry) {
      console.log('Connection were lost.');;
      break;
    }
  }
});

socket.on('data', async data => {
  console.log();
  await moveCursor(0, -1);
  await clearLine(0);

  console.log(data.toString());
  ask();
});

socket.on('connect', () => {
  isConnected = true;
})

socket.on('error', () => {
  // Do nothing
});