const fs = require('node:fs');
const path = require('node:path');
const { stdin, stdout } = process;

const file = path.resolve(__dirname, 'text.txt');
const writableStream = fs.createWriteStream(file, 'utf-8');

stdin.write('Hello, Enter your message!\n');
stdin.on('data', (chunk) => {
  if (chunk.toString().toLocaleLowerCase().includes('exit')) process.exit();
  writableStream.write(chunk, 'utf-8');
});

process.on('exit', () => console.log('Goodbye!))'));
process.on('SIGINT', () => process.exit());
