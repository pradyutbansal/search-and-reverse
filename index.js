"use strict";

const fs = require('fs');

const paths = ['./data1.txt', './data2.txt' ]

/**
* function that reverses a string
* @param {string} string - the string to be reversed
* @return{string} The reversed string
*/
function reverseString(string){
  let stringArray = string.split('');

  for(let index = 0; index < stringArray.length/2; index++){
    let temp = stringArray[index]
    stringArray[index] = stringArray[stringArray.length - index - 1];
    stringArray[stringArray.length - index - 1] = temp;
  }
  string = stringArray.join('');

  return string;
}

/**
* function that checks for double quotes and reverses the contents of the quote
* @param {string} string - the string to be reversed
* @return{string} The updated string
*/
function updateString(string){
  let start = string.indexOf('"');
  let end = string.substring(start + 1).indexOf('"') + 2;

  if(start > -1){
    let stringParts = [string.substring(0,start),reverseString(string.substring(start, end+start+1)),string.substring(end + start)];
    return stringParts.join('');
  }
  return string;

}

/** array of promises */
let dataPromises = paths.map((filePath) =>{
  return new Promise((resolve, reject) => {
    return fs.readFile(filePath, 'utf-8', (err, data) => {
      if(data){
        return resolve(data);
      }else{
        console.log('err', err.message)
      }
    });
  })
})

Promise.all(dataPromises)
.then((data) =>{
    return data.map((promise) => (promise.split('\n')))
  }
).then((data) => {
    return data.map((promise) => {
      return promise.map((line) => (updateString(line)))
    })
  }
).then((data) => {
    /** writing the data in an alternating manner to combined.txt */
    let combineWriter = fs.createWriteStream('combined.txt', {
      flags: 'a'
    })
    for(let line = 0; line < Math.max(data[0].length, data[1].length); line++){
      for(let set of data){
        if(set[line]){
          combineWriter.write(set[line] + '\n')
        }
      }
    }
    combineWriter.end();
    console.log("The data are flipped and combined in combined.txt");
  }
).catch(function(err){
    console.log('Error: ', err.message);
  }
)
