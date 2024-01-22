const fs = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(file, 'utf-8');

readableStream.on('data', (chunk) => console.log(chunk));
readableStream.on('error', (error) => console.error(error));
readableStream.on('end', () => readableStream.close());
