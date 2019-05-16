export const add = (a, b) => a + b
export const letterToAscii = letter => letter.charCodeAt()
export const asciiToLetter = ascii => String.fromCharCode(ascii)
export const xor = (value, key) => value ^ key
export const hexToDec = (hex) => parseInt('0x' + hex)
export const decToHex = (dec) => (dec).toString(16)
export const getEveryNChars = (text, n) => text.split('').filter((_, i) => i % n === 0)
export const range = (fromIncl, toIncl) => [...Array(toIncl - fromIncl + 1)].map((_, i) => i + fromIncl)

export const characterFreqs = (characters, minValue, maxValue, shouldConvert = true) => {
  const cipherValues = shouldConvert ? characters.map(letterToAscii) : characters
  return range(minValue, maxValue)
    .map(asciiValue => cipherValues.filter(value => value === asciiValue).length)
    .map(counts => counts / characters.length)
}

export const vigenere = (text, key) => {
  const keyValues = key
    .split('')
    .map(letterToAscii)

  return text
    .split('')
    .map(letterToAscii)
    .map((letter, i) => xor(letter, keyValues[i % keyValues.length]))
    .map(asciiToLetter)
    .join('')
}
