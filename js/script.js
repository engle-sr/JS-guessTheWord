const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesRemainingElement = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let guessesRemaining = 8;


const getWord = async function () {
    const data = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await data.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();



const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }

    wordInProgress.innerText = placeholderLetters.join("");  
};

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Empty message paragraph
    message.innerText = "";
    // Let's grab what was entered in the input
    const guess = inputLetter.value;
    // Let's make sure that it is a single letter
    const goodGuess = validateLetter(guess);
  
    if (goodGuess) {
      // We've got a letter! Let's guess!
      makeGuess(guess);
    }
    inputLetter.value = "";
  });

const validateLetter = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) { //Empty
       message.innerText = "Please enter a letter between A and Z.";
    } else if (input.length > 1) { //More that one character
        message.innerText = "Please only enter a single letter";
    } else if (!input.match(acceptedLetter)) { //Non-letters entered 
        message.innerText = "Please only enter letters...non-letters are not accepted.";
    } else { //correct entries!
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already tried this letter...guess again!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        guessesRemainingUpdate(guess);
        displayGuessedLetters();
        wordInProgressUpdate(guessedLetters);
    }
};

const displayGuessedLetters = function () {
    // Clear the list first
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const wordInProgressUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    winnerWinner();
};

const guessesRemainingUpdate = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word does not contain ${guess}.`;
        guessesRemaining -= 1;
    } else {
        message.innerText = `Good guess! This word includes the letter ${guess}.`
    }
    
    if (guessesRemaining === 0) {
        message.innerHTML = `The game is over- the word is <span class="highlight">${word}</span>.`;
        startOver();
    } else if (guessesRemaining === 1) {
        guessesRemainingSpan.innerText = `You have ${guessesRemaining} guesses remaining.`;
    } else {
        guessesRemainingSpan.innerText = `Keep going! You have ${guessesRemaining} guesses remaining!`;
    }
};

const winnerWinner = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class ="highlight">You guessed it!  Way to go!</p>`;

        startOver();
    }
};

const startOver = function() {
    guessButton.classList.add("hide");
    guessesRemainingElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    // reset all original values - grab new word
    message.classList.remove("win");
    guessedLetters = [];
    guessesRemaining = 8;
    guessesRemainingSpan.innerText = `${guessesRemaining} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    // Grab a new word
    getWord();
  
    // show the right UI elements
    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    guessesRemainingElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
  });






