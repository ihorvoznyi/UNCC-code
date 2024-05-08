const fs = require('fs/promises');
const fileHelper = require('./helpers/index');
const { CREATE_FILE } = require('./constants/commands');

(async () => {
  const commandFileHandler = await fs.open('./command.txt', 'r');
  commandFileHandler.on('change', async () => {
    const size = (await commandFileHandler.stat()).size;
    const buff = Buffer.alloc(size);
    const length = buff.byteLength;
  
    await commandFileHandler.read(buff, 0, length, 0);
    
    const command = buff.toString('utf-8');
  
    // create a file functionality
    // command: create a file <path>
    if (command.includes(CREATE_FILE)) {
      const pathPositionBegin = command.indexOf(CREATE_FILE) + CREATE_FILE.length;
      const path = command.substring(pathPositionBegin + 1)

      await fileHelper.createFile(path, command);
    }
  });

  const watcher = fs.watch('./command.txt');

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
})();
