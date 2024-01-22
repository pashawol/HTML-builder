const fs = require('node:fs');
const path = require('node:path');

const pathFolder = path.join(__dirname, 'secret-folder');
fs.readdir(pathFolder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err.message);
  files.forEach((file) => {
    if (!file.isFile()) return;
    const filePath = path.join(pathFolder, file.name);
    const fileExtension = path.extname(filePath).slice(1);
    const fileName = file.name.split('.')[0];

    fs.stat(filePath, (err, stats) => {
      if (err) console.log(err.message);
      console.log(`${fileName} - ${fileExtension} - ${stats.size / 1000}kb`);
      return stats.size;
    });
  });
});
