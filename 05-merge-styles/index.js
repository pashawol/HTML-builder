const fs = require('node:fs');
const path = require('node:path');

const source = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');

дайте пару дней доделать 5 и 6  задание плиз ))
// const writableStream = fs.createWriteStream(bundle, 'utf-8');

// fs.readdir(source, { withFileTypes: true }, (err, files) => {
//   if (err) throw err;
//   for (const file of files) {
//     if (file.isFile() && path.extname(file.name) === '.css') {
//       const sourcePath = path.join(source, file.name);
//       const targetPath = path.join(__dirname, 'project-dist', file.name);
//       fs.copyFile(sourcePath, targetPath, (err) => {
//         if (err) throw err;
//       });
//     }
//   }
// });
