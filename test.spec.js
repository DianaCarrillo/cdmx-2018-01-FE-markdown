const mdLinks = require('./index');

test('mdLinks should be a function', ()=>{
  expect(mdLinks()).toBeDefined();
});