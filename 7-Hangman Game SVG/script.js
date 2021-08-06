const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];
// select randomly a word from the words array
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = ['w', 'i', 'z'];
const wrongLetters = [];
//show the hidden word
function displayWord() {
  wordEl.innerHTML = `
      ${selectedWord
        // split the string into an array
        .split('')
        //map through the array and check if the letter exists
        .map(
          (letter) => `
          <span class="letter">${correctLetters.includes(letter) ? letter : ''}
          </span>
      `
        )
        // join is to return the array to a string
        .join('')}  
    `;
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congrats! you've won! 😃";
    popup.style.display = 'flex';
  }
}
//Update the wrong letter
function updateWrongLettersEL() {
  // display th wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ' '}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  // display parts of the body
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });
  // check if player lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "unfortunately you've lost. 😕";
    popup.style.display = 'flex';
  }
}
// show notification
function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}
//listen for a keydown press
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEL();
      } else {
        showNotification();
      }
    }
  }
});
//restart the game
playAgainBtn.addEventListener('click', () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEL();
  popup.style.display = 'none';
});
// call the function ofc
displayWord();
