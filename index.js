// requiring file system module, path module, fetch module 
const fs = require('fs');
const pathRequire = require('path');
const fetch = require('node-fetch');


const gettingPath = (path) =>{
  const absolutePath = pathRequire.resolve(path);
  return absolutePath;
};

const mdFileReader = (absolutePath) =>{
  // console.log(absolutePath);
  return fs.readFileSync(absolutePath, 'utf8');
};

const regExFunction = (data) => {
  //  we want regex to find "[text] (https://www.)" 
  let regEx = /\[([^\[\]]*)\]\(((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}))\)/g;
  //  matchedLinksArray is matching the regex with the specific pieces of data.
  let matchedRegEx = data.match(regEx);
  return matchedRegEx;
};

const splitingRegex = (matchedRegEx, absolutePathReturn) =>{
  const newArrayFunction = matchedRegEx.map(element => { 
    //   split is separating the text and the href//  in que regex we are taking away "[]" and "()"" because we don't need those characters in our object "  // console.log(splittingElement) will show us 4 elements in each array of the newArray (2 elements are empty spaces).
    const splittingElement = element.split(/\[([^[\]]*)\]\(([^()]*)\)/g);
    const url = splittingElement[2];
    const urlText = splittingElement[1];
    const object = {
      href: url,
      text: urlText,
      file: absolutePathReturn
    };
    return object;
  });
  return newArrayFunction;
};

// function to obtain links' statistics 
const validate = (url, urlText, path) =>{
  fetch(url).then((res=>{
    let linkStatus = res.status;
    let statusText = res.statusText;
    console.log(path, url, statusText, linkStatus, urlText);
  }
  ));
};

// function to obtain total of links and unique links
const stats = (matchedRegEx) =>{
  let totalUrls = matchedRegEx.length;
  let counterUnique = matchedRegEx.length;
  for (j = 0; j <= matchedRegEx.length; j++) { 
    for (i = 0; i <= matchedRegEx.length; i++) {
      if (i !== j && matchedRegEx[j] === matchedRegEx[i] && matchedRegEx[j].length === matchedRegEx[i].length) {
        counterUnique--;
      }
    }
  }
  console.log(`Total : ${totalUrls}
Unique : ${counterUnique}`);
};


const mdLinks = (path) =>{
  const absolutePathReturn = gettingPath(path);
  const readMd = mdFileReader(absolutePathReturn);
  const regexF = regExFunction(readMd);
  const newArray = splitingRegex(regexF, absolutePathReturn);
  if (process.argv[1] === `md-links` && process.argv[2] `${path}`) {
    console.log(newArray);
  }
  newArray.forEach(element => {
    const url = element.href;
    const urlText = element.text;
    if (process.argv[3] === '--validate') {
      validate(url, urlText, path);
    }
  });
  if (process.argv[3] === '--stats') {
    stats(regexF);
  } 
};

module.exports = mdLinks;
/* readFile, método asíncrono, recibe 3 parámetros. 1 es la ruta del archivo que queremos leer, el segundo es un string con el juego de
     caracteres en el que el archivo está codificado y el 3ro es una callback que se ejecutará en el momento en el que el archivo esta leído
    y se encuentra disponible para hacer alguna cosa */
// const promesa = new Promise((resolve, reject)=>{
//   if (true) {
//     resolve(gettingPath(absolutePath));
//   } else {
//     reject('error:', error);
//   }
// });

