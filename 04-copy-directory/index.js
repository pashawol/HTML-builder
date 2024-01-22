const fsPromises = require('node:fs').promises;
const path = require('node:path');

const folderSource = path.join(__dirname, 'files');
const folderTarget = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fsPromises.rm(folderTarget, { recursive: true, force: true });
    await fsPromises.mkdir(folderTarget, { recursive: true });
    const files = await fsPromises.readdir(
      folderSource,
      { withFileTypes: true },
      (err, files) => {
        return files;
      },
    );
    for (const file of files) {
      const filePath = path.join(folderSource, file.name);
      const fileExtension = path.extname(filePath).slice(1);
      const fileName = file.name.split('.')[0];
      const targetPath = path.join(
        folderTarget,
        fileName + '.' + fileExtension,
      );
      await fsPromises.copyFile(filePath, targetPath);
    }
  } catch (err) {
    console.log(err.message);
  }
}

copyDir();
