export class WordGame {
  constructor (words) {
    this.words = words
    this.originalWord = []
    this.originalShuffled = []
    this.currentWord = []
    this.currentShuffled = []
    this.correctLetters = []
    this.mistakeLetters = []
    this.letterIndex = 0
    this.tries = 0

    // binding
    this.init = this.init.bind(this)
    this.reset = this.reset.bind(this)
    this.play = this.play.bind(this)

    this.init()
  }

  get getCurrentShuffled () {
    return this.currentShuffled
  }

  get getCorrectLetters () {
    return this.correctLetters
  }

  get length () {
    return this.currentWord.length
  }

  get getTries () {
    return this.tries
  }

  get getMistakes () {
    return this.mistakeLetters
  }

  get isWinner () {
    return this.correctLetters.every(v => v !== '')
  }

  init () {
    const idx = Math.floor(Math.random() * this.words.length)
    this.originalWord = this.words[idx].split('')
    const copy = [...this.originalWord]
    this.originalShuffled = copy.sort(() => 0.5 - Math.random())
    this.reset()
  }

  reset () {
    this.currentWord = [...this.originalWord]
    this.currentShuffled = [...this.originalShuffled]
    this.correctLetters = Array(this.length).fill('')
    this.correctLetters = Array(this.length).fill('')
    this.mistakeLetters = []
    this.letterIndex = 0
    this.tries = 0
  }

  play (index) {
    if (this.tries > 4) {
      this.reset()
      return
    }

    const currentLetter = this.currentShuffled[index]
    if (currentLetter === this.currentWord[0]) {
      // correct letter
      this.correctLetters[this.letterIndex] = currentLetter
      this.currentWord.splice(0, 1)
      this.currentShuffled.splice(index, 1)
      this.letterIndex++
    } else {
      // mistake letter
      this.tries++
      this.mistakeLetters.push(currentLetter)
    }
  }
}
