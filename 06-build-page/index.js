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
  await bundledHTML();
}

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

async function bundledHTML() {
  const sourceHTML = path.join(__dirname, 'template.html');
  const bundleHTML = path.join(__dirname, dist, 'index.html');
  const ComponentsFolder = path.join(__dirname, 'components');

  await copyIndex(sourceHTML, bundleHTML);

  let MainHTML = await fsPromises.readFile(bundleHTML, 'utf-8');

  const componentsFiles = await fsPromises.readdir(ComponentsFolder, {
    withFileTypes: true,
  });

  MainHTML = await addComponents(MainHTML, componentsFiles, ComponentsFolder);
  await fsPromises.writeFile(bundleHTML, MainHTML);
}
async function copyIndex(sourceHTML, bundleHTML) {
  const HTML = await fsPromises.readFile(sourceHTML, 'utf-8');
  await fsPromises.writeFile(bundleHTML, HTML);
}

async function addComponents(HTMLContent, files, pathFolder) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(pathFolder, file.name);
    if (!file.isFile() && path.extname(filePath) !== '.html') return;
    const fileData = await fsPromises.readFile(filePath, 'utf-8');
    HTMLContent = HTMLContent.replace(
      `{{${file.name.split('.')[0]}}}`,
      fileData,
    );
  }
  return HTMLContent;
}

create();
