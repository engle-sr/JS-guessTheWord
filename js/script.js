const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesDisplay = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const againButton = document.querySelector(".play-again");
const word = "Travel";
const guessedLetters = [];



const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }

    wordInProgress.innerText = placeholderLetters.join("");  
};

placeholder(word);

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
        message.innerText = "Please only enter letters...non-letters are not accepted."
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
        displayGuessedLetters();
        wordInProgressUpdate(guessedLetters);
    }

    makeGuess();
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

const winnerWinner = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class ="highlight">You guessed it!  Way to go!</p>`;
    }
};






