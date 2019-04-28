const letterToNumber = letter => letter.charCodeAt(0) - 97 // 97 == value of ‘a’
const numberToLetter = number => String.fromCharCode(number % 26 + 97)

const shiftcipher = (word, key) => {
  return word.split('')
    .map(letterToNumber)
    .map(charcode => charcode + key)
    .map(numberToLetter)
    .join('')
}

console.log(shiftcipher('cryptoisfun', 25))


const vigenere = (word, key) => {
  return word.split('')
    .map((letter, i) => {
      const keyNumber = letterToNumber(key[i % key.length])
      const letterNumber = letterToNumber(letter)
      return keyNumber + letterNumber
    }).map(numberToLetter)
    .join('')
}

console.log(vigenere('seeyouatnoon', 'spy'))
