import {
  add,
  letterToAscii,
  asciiToLetter,
  xor,
  getEveryNChars,
  range,
  characterFreqs,
  vigenere,
} from './functions'

let keylengthSums = []

for (let keylength = 1; keylength <= 13; keylength++) {
  // Get every keylength character (just start from first character for now)
  let chars = getEveryNChars(getCipheredTextInAscii().map(asciiToLetter).join(''), keylength)

  // Calculate summation of frequencies
  let freqs = characterFreqs(chars, 0, 256) // from 32 to 127 ascii code

  // Pick max summation of frequencies
  let sumSquares = freqs.map(freq => freq * freq).reduce(add)
  keylengthSums.push([keylength, sumSquares])
}

console.log(keylengthSums)


const assumedKeyLength = 7
const key = []
for (let i = 0; i < assumedKeyLength; i ++) {
  let asciiValues = getEveryNChars(
    getCipheredTextInPlaintext().slice(i),
    assumedKeyLength
  ).map(letterToAscii)

  const viableKeyValues = range(0, 255)
  const sumSquares = viableKeyValues.map(assumedKeyValue => {
    const decryptedValues = asciiValues.map(ascii => xor(assumedKeyValue, ascii))
    if (decryptedValues.some(val => (
      val < 32 ||
      val > 127 ||
      range(48, 57).includes(val) // Plaintext includes no numbers per instructions
    ))) return [assumedKeyValue, 0]
    const SS = characterFreqs(decryptedValues, 97, 122, false)
      .map(freq => freq * freq)
      .reduce(add)
    return [assumedKeyValue, SS]
  })

  const underlyingSS = characterFreqs(asciiValues, 0, 255, false)
    .map(freq => freq * freq)
    .reduce(add)

  let sortedSums = sumSquares.sort((a, b) => b[1] - a[1])
  console.log('Max pair:', sortedSums[0][0], '(', asciiToLetter(sortedSums[0][0]), ')', sortedSums[0][1])
  console.log('vs underlying of:', underlyingSS)
  console.log('Decrypted values:', vigenere(asciiValues.map(asciiToLetter).join(''), asciiToLetter(sortedSums[0][0])), '|')
  console.log('--------')

  key.push(sortedSums[0][0])
}

console.log('Key:', key.join(', '), '(', key.map(asciiToLetter).join(''), ')')
const text = getCipheredTextInPlaintext()
const keyString = key.map(asciiToLetter).join('')
const decrypted = vigenere(text, keyString)
console.log(decrypted)

function getCipheredTextInPlaintext () {
  const asciiValues = getCipheredTextInAscii()
  return asciiValues
    .map(asciiToLetter)
    .join('')
}

function getCipheredTextInAscii () {
  let hexString = 'F96DE8C227A259C87EE1DA2AED57C93FE5DA36ED4EC87EF2C63AAE5B9A7EFFD673BE4ACF7BE8923CAB1ECE7AF2DA3DA44FCF7AE29235A24C963FF0DF3CA3599A70E5DA36BF1ECE77F8DC34BE129A6CF4D126BF5B9A7CFEDF3EB850D37CF0C63AA2509A76FF9227A55B9A6FE3D720A850D97AB1DD35ED5FCE6BF0D138A84CC931B1F121B44ECE70F6C032BD56C33FF9D320ED5CDF7AFF9226BE5BDE3FF7DD21ED56CF71F5C036A94D963FF8D473A351CE3FE5DA3CB84DDB71F5C17FED51DC3FE8D732BF4D963FF3C727ED4AC87EF5DB27A451D47EFD9230BF47CA6BFEC12ABE4ADF72E29224A84CDF3FF5D720A459D47AF59232A35A9A7AE7D33FB85FCE7AF5923AA31EDB3FF7D33ABF52C33FF0D673A551D93FFCD33DA35BC831B1F43CBF1EDF67F0DF23A15B963FE5DA36ED68D378F4DC36BF5B9A7AFFD121B44ECE76FEDC73BE5DD27AFCD773BA5FC93FE5DA3CB859D26BB1C63CED5CDF3FE2D730B84CDF3FF7DD21ED5ADF7CF0D636BE1EDB79E5D721ED57CE3FE6D320ED57D469F4DC27A85A963FF3C727ED49DF3FFFDD24ED55D470E69E73AC50DE3FE5DA3ABE1EDF67F4C030A44DDF3FF5D73EA250C96BE3D327A84D963FE5DA32B91ED36BB1D132A31ED87AB1D021A255DF71B1C436BF479A7AF0C13AA14794'.split('')
  let ascii = []
  while (hexString.length > 0) {
    let spliced = hexString.splice(0, 2).join('')
    let hexValue = parseInt('0x' + spliced)
    ascii.push(hexValue)
  }
  return ascii
}
