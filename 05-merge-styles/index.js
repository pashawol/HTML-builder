const fs = require('node:fs');
const path = require('node:path');

const source = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');

const writableStream = fs.createWriteStream(bundle, 'utf-8');
fs.readdir(source, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err.message);
  files.forEach((file) => {
    if (!file.isFile()) return;
    const filePath = path.join(source, file.name);
    const fileExtension = path.extname(filePath).slice(1);

    if (fileExtension !== 'css') return;
    const readableStream = fs.createReadStream(filePath, 'utf-8');
    readableStream.pipe(writableStream);
  });
});
