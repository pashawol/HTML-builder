const fs = require('node:fs');
const fsPromises = fs.promises;
const path = require('node:path');

const dist = 'project-dist';

const folderSource = path.join(__dirname, 'assets');
const folderTarget = path.join(__dirname, dist, 'assets');

async function create() {
  await fsPromises.rm(path.join(__dirname, dist), {
    recursive: true,
    force: true,
  });
  await fsPromises.mkdir(path.join(__dirname, dist));
  await mergeCss();
  await copyDir(folderSource, folderTarget);
}

create();

async function mergeCss() {
  const sourceStyle = path.join(__dirname, 'styles');
  const bundleStyle = path.join(__dirname, dist, 'style.css');
  const writableStream = fs.createWriteStream(bundleStyle);
  const files = await fsPromises.readdir(sourceStyle, { withFileTypes: true });
  files.forEach((file) => {
    if (!file.isFile()) return;
    const filePath = path.join(sourceStyle, file.name);
    const fileExtension = path.extname(filePath).slice(1);

    if (fileExtension !== 'css') return;
    const readableStream = fs.createReadStream(filePath, 'utf-8');
    readableStream.pipe(writableStream);
  });
}

async function copyDir(folderSource, folderTarget) {
  try {
    await fsPromises.mkdir(folderTarget, { recursive: true });
    const files = await fsPromises.readdir(folderSource, {
      withFileTypes: true,
    });
    for (const file of files) {
      const filePath = path.join(folderSource, file.name);
      const fileTarget = path.join(folderTarget, file.name);
      if (file.isDirectory()) {
        copyDir(filePath, fileTarget);
      } else {
        await fsPromises.copyFile(filePath, fileTarget);
      }
    }
  } catch (err) {
    console.log(err.message);
  }
}

// Дайте  пару дней доделать задачу плиз )
