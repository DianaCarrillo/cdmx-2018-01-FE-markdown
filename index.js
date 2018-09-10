// requiring file system module, path module, fetch module 
const fs = require('fs');
const pathRequire = require('path');
const fetch = require('node-fetch');

const mdLinks = (path) =>{
  let absolutePath = pathRequire.resolve(path);

  fs.readFile(absolutePath, 'utf8', (error, data) => {
    if (error) {
      console.log('error:', error);
    } else {
      // console.log(options);
    //  we want regex to find "[text] (https://www.)" 
      let regEx = /\[([^\[\]]*)\]\(((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}))\)/g;
      //  matchedLinksArray is matching the regex with the specific pieces of data.
      let matchedRegEx = data.match(regEx);
      const newArrayFunction = matchedRegEx.map(element => { 
      // split is separating the text and the href//  in que regex we are taking away "[]" and "()"" because we don't need those characters in our object "  // console.log(splittingElement) will show us 4 elements in each array of the newArray (2 elements are empty spaces).
        let splittingElement = element.split(/\[([^[\]]*)\]\(([^()]*)\)/g);
        let url = splittingElement[2];
        let urlText = splittingElement[1];
        // because i need to retun an array of objects, i´d declare an object with the obtained elements as values of the href and and the text properties
        const object = {
          href: url,
          text: urlText,
          file: absolutePath
        };
        if (process.argv[3] === '--validate') {
          validate(url, urlText, path);
        }
        return object;
      });
      if (process.argv[3] === '--stats') {
        stats(matchedRegEx);
      }
      // console.log(newArrayFunction);    
    }
  });
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

// process.argv.forEach(function(val, index) {
//   // console.log(index + ':' + val);
// });

module.exports = mdLinks; 

// }
/* readFile, método asíncrono, recibe 3 parámetros. 1 es la ruta del archivo que queremos leer, el segundo es un string con el juego de
     caracteres en el que el archivo está codificado y el 3ro es una callback que se ejecutará en el momento en el que el archivo esta leído
    y se encuentra disponible para hacer alguna cosa */