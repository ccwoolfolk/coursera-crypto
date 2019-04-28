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

test('test setup', function () {
  expect(true).toBe(true)
})

test('add', function () {
  expect(add(1, 10)).toBe(11)
})

test('letterToAscii', function () {
  expect(letterToAscii('a')).toBe(97)
  expect(letterToAscii('X')).toBe(88)
})

test('xor', function () {
  expect(xor(2, 4)).toBe(6)
})

test('getEveryNChars', function () {
  const text = '12345678901234567890'
  const result = getEveryNChars(text, 4).join('')
  const expected = '15937'
  expect(result).toBe(expected)
})

test('range', function () {
  expect(range(5, 8)).toEqual([5, 6, 7, 8])
})

describe('characterFreqs', function () {
  test('Convert', function () {
    const result = characterFreqs('aaBZ'.split(''), 32, 127)
    expect(result.length).toBe(127 - 32 + 1)
    expect(result[97 - 32]).toEqual(0.5) // a
    expect(result[90 - 32]).toEqual(0.25) // Z
    expect(result[65 - 32]).toEqual(0) // A
    expect(result.reduce((a, b) => a + b, 0)).toEqual(1)
  })
})

describe('vigenere cipher', function () {
  test('d(e(text)) === text', function () {
    const text = 'Test text'
    const key = 'key'
    const result = vigenere(vigenere(text, key), key)

    expect(result).toBe(text)
  })

  test('No cycling', function () {
    let key = 'ab' // 97, 98
    let text = 'AB' // 65, 66
    let expected = [xor(97, 65), xor(98, 66)].map(asciiToLetter).join('')
    let result = vigenere(text, key)
    expect(result).toBe(expected)
  })

  test('With cycling', function () {
    let key = 'ab' // 97, 98
    let text = 'ABabC' // 65, 66, 97, 98, 67
    let expected = [
      xor(97, 65),
      xor(98, 66),
      xor(97, 97),
      xor(98, 98),
      xor(97, 67),
    ].map(asciiToLetter).join('')
    let result = vigenere(text, key)
    expect(result).toBe(expected)
  })
})
