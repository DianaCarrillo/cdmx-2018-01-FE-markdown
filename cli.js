#!/usr/bin/env node

// shebang hace que nuestro archivo sea ejecutable.require. Requerimos el archivo mdLinks que ya exportamos en nuestro index.js;
const mdLinks = require('./index');
const path = process.argv[2];

// const options = {
//   'validate': process.argv[3],
//   'stats': process.argv[3]
// };

// console.log(process.argv[3]);
mdLinks(path);