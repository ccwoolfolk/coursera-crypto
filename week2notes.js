import { asciiToLetter, xor } from './vigenere/functions'
// const inBinary = ['0xA8', '0xED', '0xBD']
const space = '0x20'
const inHex = ['0xb7', '0xE7']
const inDec = inHex.map(x => parseInt(x))
const inBinary = inHex
  .map(val => parseInt(val))
  .map(num => num.toString(2))
inBinary.forEach(x => console.log(x))

// IF m1 is space
// space xor 0xb7 = key
// key xor 0xe7 = 
let key = xor(parseInt(space), parseInt(inHex[0]))
console.log('m2:', asciiToLetter(xor(key, parseInt(inHex[1]))))

// IF m2 is space
// space xor 0xe7 = key
// key xor 0xb7 = 
key = xor(parseInt(space), parseInt(inHex[1]))
console.log('m1:', asciiToLetter(xor(key, parseInt(inHex[0]))))

console.log('#2----')
{
  let inHex = ['0x66', '0x32', '0x23']
  const inBinary = inHex
    .map(val => parseInt(val))
    .map(num => num.toString(2))
    .map(x => x.padStart(8, '0'))
  inBinary.forEach(x => console.log(x))

  // so position 0 is space
  let key = xor(parseInt(space), parseInt(inHex[0]))
  inHex.map(x => parseInt(x)).map(x => xor(x, key)).forEach(x => console.log(asciiToLetter(x)))
}
// console.log(xor(inDec[0], inDec[1]).toString(2))
// console.log(xor(inBinary[0], inBinary[2]))
// console.log(xor(inBinary[1], inBinary[2]))

/*
 * 11101101 == cipher we know is space because xoring it with another cipher yielded '01' as opening bits
 * 00100000 == space ascii
 * 11001101 == key
 *
 * 11001101 == key
 * 10111101 == cipher to solve
 * 01110000 == "p"
 */
