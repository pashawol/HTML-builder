const fs = require('node:fs');
const path = require('node:path');
const { stdin } = process;

const file = path.resolve(__dirname, 'text.txt');
const writableStream = fs.createWriteStream(file, 'utf-8');

console.log('Hello, Enter your message!');
stdin.on('data', (chunk) => {
  if (chunk.toString().toLocaleLowerCase().includes('exit')) process.exit();
  writableStream.write(chunk, 'utf-8');
});

process.on('exit', () => console.log('Goodbye!))'));
process.on('SIGINT', () => process.exit());
