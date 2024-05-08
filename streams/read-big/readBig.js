const fs = require('node:fs/promises');

(async () => {
  const fileHandle = await fs.open('a-lot-of-rows.txt', 'r');
  const stream = fileHandle.createReadStream();

  let i = 0;
  let splitted = null;

  stream.on('data', (chunk, idx) => {
    const content = chunk.toString().split('  ');

    if (splitted) {
      content[0] = splitted + content[0];
      splitted = null;
      console.log(`Fixed: ${content[0]}`);
    }

    const lastNumber = Number(content.pop());
    const prevNumber = Number(content[content.length - 2]);

    const isSplitted = lastNumber !== prevNumber;

    i++;

    if (isSplitted) {
      console.log(`[${i}]: ${lastNumber}, ${prevNumber}`);
      splitted = lastNumber + '';
    }

    if (i === 2) stream.pause();
  });
})();