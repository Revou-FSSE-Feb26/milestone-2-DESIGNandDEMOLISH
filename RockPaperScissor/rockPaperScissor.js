let rock = document.getElementById("rockButton");
let paper = document.getElementById("paperButton");
let scissor = document.getElementById("scissorButton");
let userScore = document.getElementById("userScore");
let computerScore = document.getElementById("computerScore");
let userDisplay = document.getElementById("userDisplay");
let computerDisplay = document.getElementById("computerDisplay");
let statusBar = document.getElementById("statusBar");
let userContainer = document.getElementById("container");
let username = document.getElementById("userName");
let submitButton = document.getElementById("submitButton");
let maxPoint = 10;
let playerScore = 0;
let comScore = 0;

function gameStart (event) {
    function checkStatus () {
        if (playerScore === maxPoint) {
        statusBar.textContent ="Congrats,You Win the Game!!";
        return true;
    };
        if (comScore === maxPoint) {
        statusBar.textContent ="To Bad, you lose!";
        return true;
        };
        return false;
    };

    let userChoice = event.target.textContent;

    let computerChoise = Math.floor(Math.random()*3)+1;

    switch(computerChoise) {
        case(1):
        computerChoise = '✊';
        break;
        case(2):
        computerChoise = '✋';
        break;
        case(3):
        computerChoise = '✌️';
        break;
    };

    if (checkStatus()) return;

    if (userChoice === computerChoise) {
        statusBar.textContent = "It's Tie!!";
        userDisplay.innerHTML = userChoice;
        computerDisplay.innerHTML = computerChoise;
        return;
    } else if (userChoice === "✊" && computerChoise === "✌️") {
        statusBar.textContent ="You Win!";
        playerScore++;
        userScore.textContent = playerScore;
        userDisplay.innerHTML = userChoice;
        computerDisplay.innerHTML = computerChoise;
        if (checkStatus()) return;

    } else if (userChoice === "✋" && computerChoise === "✊") {
        statusBar.textContent ="You Win!";
        playerScore++;
        userScore.textContent = playerScore;
        userDisplay.innerHTML = userChoice;
        computerDisplay.innerHTML = computerChoise;
        if (checkStatus()) return;

    } else if (userChoice === "✌️" && computerChoise === "✋") {
        statusBar.textContent ="You Win!";
        playerScore++;
        userScore.textContent = playerScore;
        userDisplay.innerHTML = userChoice;
        computerDisplay.innerHTML = computerChoise;
        if (checkStatus()) return;

    } else {
        statusBar.textContent ="You Lose!";
        comScore++;
        computerScore.textContent = comScore;
        userDisplay.innerHTML = userChoice;
        computerDisplay.innerHTML = computerChoise;
        if (checkStatus()) return;
    };
};

rock.addEventListener("click",gameStart);
paper.addEventListener("click", gameStart);
scissor.addEventListener("click", gameStart);
userContainer.addEventListener("submit",function(event) {
    event.preventDefault();
    userContainer.style.display = "none";
});