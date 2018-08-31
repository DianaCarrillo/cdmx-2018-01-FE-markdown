// con el módulo fs (file system) hay que procesar el require y lo vamos a importar:
let fs = require('fs');
const path = require('path');

/* readFile, método asíncrono, recibe 3 parámetros. 1 es la ruta del archivo que queremos leer, el segundo es un string con el juego de
 caracteres en el que el archivo está codificado y el 3ro es una callback que se ejecutará en el momento en el que el archivo esta leído
y se encuentra disponible para hacer alguna cosa */ 

const data = (error, data) => {
  if (error) {
    console.log('error:', error);
  } else { 
    let link = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g;
    console.log(data.match(link));
    // console.log(path.isAbsolute('./README.md'));
  };
};

fs.readFile('./README.md', 'utf8', data);

const mdLinks = () =>{
  return 'holi';
};

module.exports = mdLinks;

//
