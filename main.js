import { WordGame } from './WordGame.js'

const $ = (selector) => document.querySelector(selector)

const $mainWord = $('#main-word')
const $shuffledWord = $('#shuffled-word')
const $tries = $('.tries')
const $mistakes = $('#mistakes')

// words collection to discover
const WORDS = ['unicorn', 'flower', 'tuesday', 'mexico', 'javascript', 'hearth']
const wordGame = new WordGame(WORDS)

// updates the graphic interface
function render () {
  // render shuffled word
  const htmlShuffledWord = wordGame.getCurrentShuffled.map((w, idx) => `<div data-index="${idx}">${w}</div>`).join('')
  $shuffledWord.innerHTML = htmlShuffledWord

  // render main word
  const htmlWord = wordGame.getCorrectLetters.map((w) => `<div>${w}</div>`)
  $mainWord.innerHTML = htmlWord

  // shuffled letter listeners
  $shuffledWord.querySelectorAll('div').forEach((div) => {
    div.addEventListener('click', handleShuffledLetterClick)
  })

  // complete number of tries and mistaked letters
  const htmlNumberTries = `<h6>Tries <span>(${wordGame.getTries}/5)</span></h6>`
  const htmlPointTries = Array(6).fill('').map((_, idx) => {
    return `<div${idx + 1 > wordGame.getTries ? ' class=disabled' : ''}></div>`
  }).join('')
  $tries.innerHTML = `${htmlNumberTries} ${htmlPointTries}`
  $mistakes.innerHTML = `${wordGame.getMistakes.join(', ')}`

  // show congrats windows
  if (wordGame.isWinner) {
    $('.modal-container').classList.add('show')
    $('.modal .btn-close').addEventListener('click', () => {
      $('.modal-container').classList.remove('show')
      handleRandom()
    })
  }
}

// the game itself. When the user clicks on each letter
const handleShuffledLetterClick = (e) => {
  const clickedLetterIndex = e.target.dataset.index
  wordGame.play(clickedLetterIndex)
  render()
}

// randomize button action
const handleRandom = () => {
  wordGame.init()
  render()
}

// reset button action
const handleReset = () => {
  wordGame.reset()
  render()
}

// entry point
window.addEventListener('load', () => {
  // first render
  render()
})

// global listeners
$('#btn-random').addEventListener('click', handleRandom)
$('#btn-reset').addEventListener('click', handleReset)
