#!/usr/bin/env node

// shebang hace que nuestro archivo sea ejecutable.require. Requerimos el archivo mdLinks que ya exportamos en nuestro index.js;
const mdLinks = require('./index');
let path = process.argv[2];
mdLinks(path);