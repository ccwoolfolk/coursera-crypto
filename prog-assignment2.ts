class Byte {
  value: number

  constructor (hex: string) {
    this.value = parseInt('0x' + hex)
  }

  get hex () { return this.value.toString(16) }
  get bin () { return this.value.toString(2).padStart(8, '0') }

  xor (b: Byte) {
    const val = this.value ^ b.value
    return new Byte(val.toString(16))
  }

  toString () { return String.fromCharCode(this.value) } // from ascii value to character
}

// Split into hex codes and use to create Byte arrays
const cipherTexts: Byte[][] = getRawCipherTexts()
  .map((ciphertext: string) => {
    let matchArr: null | string[] = ciphertext.match(/.{1,2}/g)
    if (matchArr !== null) { return matchArr.map((hex: string) => (new Byte(hex))) }
    return []
  })

const space = new Byte('20')
const key: Byte[] = [...new Array(cipherTexts[0].length)].fill(space)

// Manual settings
key[0] = (new Byte('A6')).xor(new Byte('54'))
key[6] = cipherTexts[4][6].xor(new Byte('6B')) // "k"
key[8] = cipherTexts[0][8].xor(new Byte('6E')) // "n"
key[10] = cipherTexts[0][10].xor(new Byte('69')) // "i"
key[17] = cipherTexts[0][17].xor(new Byte('65')) // "e"
key[20] = cipherTexts[0][20].xor(new Byte('65')) // "e"
key[29] = cipherTexts[0][29].xor(new Byte('6E')) // "n"
key[30] = cipherTexts[0][30].xor(new Byte('2E')) // "."


for (let i = 0; i < cipherTexts.length; i++) {
  const selectedCipherText: Byte[] = cipherTexts[i]
  const otherCipherTexts: Byte[][] = cipherTexts.filter((_, j) => j !== i)

  selectedCipherText.forEach((selectedByte: Byte, k: number) => {
    const otherBytes: Byte[] = otherCipherTexts
      .map((val: Byte[]) => val[k])

    const nSpaceHints = otherBytes.filter((b: Byte) => {
      return '01' === b
        .xor(selectedByte)
        .bin
        .split('')
        .slice(0, 2)
        .join('')
    }).length

    if (nSpaceHints > 3) { key[k] = space.xor(selectedByte) }
  })
}

// Decode and print
cipherTexts.forEach(cipherText => {
  console.log(cipherText.map((b, i) => b.xor(key[i]).toString()).join(''))
})

// Hoist
function getRawCipherTexts () {
  return [
    'BB3A65F6F0034FA957F6A767699CE7FABA855AFB4F2B520AEAD612944A801E',
    'BA7F24F2A35357A05CB8A16762C5A6AAAC924AE6447F0608A3D11388569A1E',
    'A67261BBB30651BA5CF6BA297ED0E7B4E9894AA95E300247F0C0028F409A1E',
    'A57261F5F0004BA74CF4AA2979D9A6B7AC854DA95E305203EC8515954C9D0F',
    'BB3A70F3B91D48E84DF0AB702ECFEEB5BC8C5DA94C301E0BECD241954C831E',
    'A6726DE8F01A50E849EDBC6C7C9CF2B2A88E19FD423E0647ECCB04DD4C9D1E',
    'BC7570BBBF1D46E85AF9AA6C7A9CEFA9E9825CFD5E3A0047F7CD009305A71E',
  ]
}
