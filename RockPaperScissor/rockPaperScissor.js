let rock = document.getElementById("rockButton");
let paper = document.getElementById("paperButton");
let scissor = document.getElementById("scissorButton");
let userScore = document.getElementById("userScore");
let computerScore = document.getElementById("computerScore");
let userDisplay = document.getElementById("userDisplay");
let computerDisplay = document.getElementById("computerDisplay");
let statusBar = document.getElementById("statusBar");
let userContainer = document.getElementById("container");
let userName = document.getElementById("userName");
let submitButton = document.getElementById("submitButton");
let maxPoint = 10;
let playerScore = 0;
let comScore = 0;

//leaderBoard
let boardContainer = document.getElementById("boardContainer");
let userList = document.getElementById("userList");
let replay = document.getElementById("replay");
let gameState = {
    playerPoint :0,
    playerName : "",
};
let saved = localStorage.getItem("leaderboard3");
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
    localStorage.setItem("leaderboard3", JSON.stringify(leaderBoardList));
};

function gameStart (event) {
    function checkStatus () {
        if (playerScore === maxPoint) {
        statusBar.textContent ="Congrats,You Win the Game!!";
        gameState.playerPoint = playerScore * 20;
        leaderBoard();
        return true;
    };
        if (comScore === maxPoint) {
        statusBar.textContent ="To Bad, you lose!";
        gameState.playerPoint = playerScore * 20;
        leaderBoard();
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

function reset() {
    playerScore = 0;
    comScore = 0;
    userScore.textContent = playerScore;
    computerScore.textContent = comScore;
    userDisplay.innerHTML = "";
    computerDisplay.innerHTML = "";
    boardContainer.style.display = "none";
};

replay.addEventListener("click",reset);

rock.addEventListener("click",gameStart);
paper.addEventListener("click", gameStart);
scissor.addEventListener("click", gameStart);
userContainer.addEventListener("submit",function(event) {
    event.preventDefault();
    gameState.playerName = userName.value;
    userContainer.style.display = "none";
});