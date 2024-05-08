const fs = require('fs/promises');

class FileHelper {
  async createFile(path, buffer) {
    try {
      const existingFileHandle = await fs.open(path, 'r');
      await existingFileHandle.close();

      console.log(`File with path ${path} is already exists.`);
      return;
    } catch (e) {
      const filename = path.split('/').pop();
      const filenamePosition = path.indexOf(filename)

      const folders = path.slice(0, filenamePosition - 1);

      await fs.mkdir(folders, { recursive: true });

      const newFileHandle = await fs.open(path, 'w');
      console.log('File was successfully created.');
      await newFileHandle.close();
    }
  }
}

module.exports = new FileHelper();