import { hexToDec, decToHex, letterToAscii, xor } from './vigenere/functions.js'
console.log(hexToDec('AF'))

let keyVals = ['01', '3F'].map(hexToDec)
let cipherHexValues = 'cool!'
  .split('')
  .map(letterToAscii)
  .map((val, i) => xor(val, keyVals[i % 2]))
  .map(decToHex)
console.log(cipherHexValues)
