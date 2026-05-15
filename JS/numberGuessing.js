let numberGuess = document.getElementById("numberGuess");
let statusBar = document.getElementById("statusBar");
let guessButton = document.getElementById("guess");
let deleteButton = document.getElementById("delete");
let resetButton = document.getElementById("replay");
let chance = document.getElementById("chance");
let gameForm = document.getElementById("gameForm");

let secretNumber = Math.floor(Math.random()*100)+1;
let maxChance = 10;
chance.textContent = maxChance;

//save data
let saved = localStorage.getItem("leaderboard2");
let leaderBoardList = saved? JSON.parse(saved) : [];

//update data
function updateLeaderBoard() {
    leaderBoardList = leaderBoard(leaderBoardList);
    localStorage.setItem("leaderboard2", JSON.stringify(leaderBoardList));
};

function checkChance () {
if (maxChance === 0) {
    statusBar.textContent = "Game Over!! the Number was " + secretNumber;
    gameState.playerPoint = 0;
    updateLeaderBoard();
    return true;
}; 
return false;
};

function startGame() {
let userGuess = Number(numberGuess.value)

if (userGuess === secretNumber) {
    statusBar.textContent = "Congrats You got it!!"
    gameState.playerPoint = maxChance * 20; // formula to create point
    updateLeaderBoard();
    return;
};

if (userGuess > 100 || userGuess <= 0) {
    statusBar.textContent = "Only from 1 - 100";
    return ;
} else if (userGuess > secretNumber) {
    statusBar.textContent = "Too big try smaller";
    maxChance--;
    // Guard Clause: If checkChance returns true (Game Over), stop execution here
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

function deleteNumber() {
    numberGuess.value ="";
};

function reset() {
    maxChance = 10;
    numberGuess.value ="";
    chance.textContent = maxChance;
    secretNumber = Math.floor(Math.random()*100)+1;
    statusBar.textContent ="Click Guess to Continue!";
    boardContainer.style.display ="none";
    return;
};

gameForm.addEventListener("submit", function(e) {
    e.preventDefault();
    startGame();
});

deleteButton.onclick = deleteNumber;
guessButton.onclick = startGame;

resetButton.onclick = reset;


userContainer.addEventListener("submit",function(event) {
    event.preventDefault();
    gameState.playerName = userName.value;
    userContainer.style.display = "none";
    document.querySelector('body > section.h-100.w-100.rounded-2xl.bg-gray-600.text-white').style.display = "block";
});