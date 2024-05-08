// const fs = require('node:fs/promises');

// // Execution time: 15s
// (async () => {
//   console.time('benchmark-fs-promises');
//   const fileHandle = await fs.open('a-lot-of-rows.txt', 'w');

//   for(let i = 0; i < 1000000; i++) {
//     await fileHandle.write(` ${i} `);
//   }

//   await fileHandle.close();
//   console.timeEnd('benchmark-fs-promises');
// })();

// const fs = require('node:fs');

// // Execution time: 2s
// console.time('benchmark-fs-sync');
// fs.open('a-lot-of-rows.txt', 'w', (err, fd) => {
  
//   for (let i = 0; i < 1000000; i++) {
//     const buff = Buffer.from(`${i}`);
//     fs.writeSync(fd, buff);
//   }

//   console.timeEnd('benchmark-fs-sync');
// });



// ------------------------


const fs = require('node:fs/promises');

async function execAsync() {
  console.time('benchmark');
  const fileHandle = await fs.open('a-lot-of-rows.txt', 'w');
  const stream = fileHandle.createWriteStream();

  function* writeMany() {
    for (let i = 0; i < 1e+6; i++) {
      const buff = Buffer.from(` ${i} `);
      const canWrite = stream.write(buff);

      if (i === 1e+6 - 1) {
        stream.end(buff);
        return;
      }
  
      if (!canWrite) {
        yield;
      }
    }
  }

  const iterator = writeMany();
  iterator.next();

  stream.on('drain', () => {
    iterator.next();
  });

  stream.on('finish', () => {
    console.timeEnd('benchmark');
  });
}

async function execDangerAsync() {
  const fileHandle = await fs.open('a-lot-of-rows.txt', 'w');
  const stream = fileHandle.createWriteStream();

  for (let i = 0; i < 1e+6; i++) {
    const buff = Buffer.from(` ${i} `);
    stream.write(buff);
  }
}

Promise.all([execAsync()]); // Memory Usage: 40 MB
// Promise.all([execDangerAsync()]); // Memory Usage: 250 MB
