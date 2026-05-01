let numberGuess = document.getElementById("numberGuess");
let statusBar = document.getElementById("statusBar");
let guessButton = document.getElementById("guess");
let deleteButton = document.getElementById("delete");
let resetButton = document.getElementById("replay");
let chance = document.getElementById("chance");
let userContainer = document.getElementById("container");
let userName = document.getElementById("userName");
let submitButton = document.getElementById("submitButton");
let gameForm = document.getElementById("gameForm");
let secretNumber = Math.floor(Math.random()*100)+1;
let maxChance = 10;
chance.textContent = maxChance;

//leaderBoard
let boardContainer = document.getElementById("boardContainer");
let userList = document.getElementById("userList");
let replay = document.getElementById("replay");
let gameState = {
    playerPoint :0,
    playerName : "",
};
let saved = localStorage.getItem("leaderboard2");
let leaderBoardList = saved? JSON.parse(saved) : [];

//leaderBoar Function
function leaderBoard() {
    playerHistory = {
        name: gameState.playerName,
        point: gameState.playerPoint,
    };
    let textList = "<ol>";
    leaderBoardList.push(playerHistory);
    leaderBoardList = leaderBoardList.sort((a, b) => b.point - a.point);
    leaderBoardList = leaderBoardList.slice(0, 5);
    leaderBoardList.forEach((element, index) => {
        textList += `<li>${index + 1}. ${element.name}   ${element.point} Points`;        
    });
    textList += "</ol>"
    boardContainer.style.display ="block";
    userList.innerHTML = textList;
    localStorage.setItem("leaderboard2", JSON.stringify(leaderBoardList));
};

function checkChance () {
if (maxChance === 0) {
    statusBar.textContent = "Game Over!! the Number was " + secretNumber;
    gameState.playerPoint = 0;
    leaderBoard();
    return;
};
};

function startGame() {
let userGuess = Number(numberGuess.value)

if (userGuess === secretNumber) {
    statusBar.textContent = "Congrats You got it!!"
    gameState.playerPoint = maxChance * 20;
    leaderBoard();
    return;
};

if (userGuess > 100 || userGuess <= 0) {
    statusBar.textContent = "Only from 1 - 100";
    return ;
} else if (userGuess > secretNumber) {
    statusBar.textContent = "Too big try smaller";
    maxChance--;
    if (checkChance()) {
        return;
    };
    chance.textContent = maxChance;
    return ;
} else if (userGuess < secretNumber) {
    statusBar.textContent = "Too small try bigger";
    maxChance--;
    if (checkChance()) {
        return;
    };
    chance.textContent = maxChance;
    return ;
};
};


deleteButton.onclick = deleteNumber;
guessButton.onclick = startGame;

function deleteNumber() {
    numberGuess.value ="";
};

function reset() {
    maxChance = 10;
    chance.textContent = maxChance;
    secretNumber = Math.floor(Math.random()*100)+1;
    statusBar.textContent ="Click Guess to Continue!";
    boardContainer.style.display ="none";
    return;
};

gameForm.addEventListener("submit", function(e) {
    e.preventDefault();
    startGame();
})

resetButton.onclick = reset;

userContainer.addEventListener("submit",function(event) {
    event.preventDefault();
    gameState.playerName = userName.value;
    userContainer.style.display = "none";
});