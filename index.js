#!/usr/bin/env node

// requirig file system module, path module
let fs = require('fs');
const path = require('path');

const data = (error, data) => {
  if (error) {
    console.log('error:', error);
  } else {
    let link = /\[([^\[\]]*)\]\(((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}))\)/g;
    // let textLink = /\[(.*?)\]/g;
    // let matchedTextArray = data.match(textLink);
    // console.log(matchedTextArray);
    let matchedLinksArray = data.match(link);
    console.log(matchedLinksArray);
    // matchedLinksArray.forEach(element => { 
    //   console.log(element);
    //   for (i = 0;i < element.length;i++) {
    //     if ((element[i]) === ' ') {
    //   // console.log(`${element} error`);
    //     }
    //   }

    //   // console.log(path.isAbsolute('./README.md'));
    //   // console.log(path.resolve('./README.md'));
    // });
  }
  // absolutePath();
};

fs.readFile('./README.md', 'utf8', data);

const absolutePath = () =>{
  let actualPath = path.isAbsolute('./README.md');
  if ((actualPath) === false) {
    let newAbsolutePath = actualPath.resolve(); 
    console.log(newAbsolutePath);
  }
};

// const mdLinks = (path, options) => {
//   return 'test';
// };

// module.exports = mdLinks;


/* readFile, método asíncrono, recibe 3 parámetros. 1 es la ruta del archivo que queremos leer, el segundo es un string con el juego de
     caracteres en el que el archivo está codificado y el 3ro es una callback que se ejecutará en el momento en el que el archivo esta leído
    y se encuentra disponible para hacer alguna cosa */