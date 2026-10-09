const alertOverlay = document.getElementById("alertOverlay");
const alertBox = alertOverlay.querySelector(".alert-box");
const alertTitle = document.getElementById("alertTitle");
const alertMsg = document.getElementById("alertMsg");
const alertOk = document.getElementById("alertOk");

function showAlert(message, title = "Oops!", type = "error") {
    alertTitle.textContent = title;
    alertMsg.textContent = message;
    alertBox.className = "alert-box " + type;   // "error", "success" ya "info"
    alertOverlay.hidden = false;
    alertOk.focus();
}

function closeAlert() {
    alertOverlay.hidden = true;
    document.getElementById("guessField").focus();
}

alertOk.addEventListener("click", closeAlert);

// bahar click karne par band
alertOverlay.addEventListener("click", (e) => {
    if (e.target === alertOverlay) closeAlert();
});

// Esc dabane par band
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !alertOverlay.hidden) closeAlert();
});





















let randomNumber = parseInt( Math.random()*100+1)

const submit = document.querySelector('#subt')
const userinput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultparas');

const p = document.createElement('p');

let prevguess = [];
let numGess = 1;

let playGame  = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault()
        const guess = parseInt(userinput.value);
        console.log(guess);
        validateGuess(guess)
        

    })
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        showAlert('please enter a  valid number ')
        EndGame()
    }else if(guess<1){
        showAlert('please enter a number more than 1')
        EndGame()
    }else if(guess>100){
        showAlert('please enter a number less than 1')
        EndGame()
    }else{
        prevguess.push(guess)
        if (numGess===11) {
            displayGuess(guess)
            displaymessage(`game over random number was ${randomNumber}`)
            EndGame()
        }else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}


function checkGuess(guess) {
    if (guess === randomNumber) {
        displaymessage(`your guesses is right`)
        EndGame()
    }else if (guess > randomNumber) {
        displaymessage(`your guesses numbeer TOO high`)
    }else if (guess < randomNumber) {
        displaymessage(`your guesses numbeer TOO low`)
    }
}

function displayGuess(guess) {
    userinput.value = '';
    guessSlot.innerHTML += `${guess},  `;
    numGess++;
    remaining.innerHTML = `${11-numGess}`

}

function displaymessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}


function EndGame() {
    userinput.value  = '';
    userinput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id = "newGame">Start new game</h2>`;
    startOver.appendChild(p)
    playGame = false;   
    newGame()
}

function newGame() {
    const newbutton  = document.querySelector('#newGame')
            newbutton.addEventListener('click', function () {
                randomNumber = parseInt( Math.random()*100+1)
            prevguess = [];
            numGess = 1;
            guessSlot.innerHTML = '';
            remaining.innerHTML =  `${11 - numGess}`;
            userinput.removeAttribute('disabled');
            startOver.removeChild(p)
            playGame = true;
    })
    


}