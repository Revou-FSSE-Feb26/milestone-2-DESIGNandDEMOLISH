let timer = document.getElementById("timer");
let clickButton = document.getElementById("btn");
let userPoint = document.getElementById("point");
let statusBar= document.getElementById("statusBar");
let userContainer = document.getElementById("container");
let userName = document.getElementById("userName");
let submitButton = document.getElementById("submitButton");
let userList = document.getElementById("userList");
let boardContainer = document.getElementById("boardContainer");
let replay = document.getElementById("replay");
let bonusTime = [50,80,120];
let addTimer = 5;
let gameState = {
    setTimer : 10,
    playerPoint : 0,
    gameActive : true,
    timeStart : false,
    playerName : "",
};

let timeOut;
let saved = localStorage.getItem("leaderboard");
let leaderBoardList = saved? JSON.parse(saved) : [];


userPoint.innerHTML = gameState.playerPoint;
timer.innerHTML = gameState.setTimer;


function leaderBoards() {

    let playerHistory = {
        name: gameState.playerName,
        point: gameState.playerPoint,
    };
    let textList = "<ol>";
    leaderBoardList.push(playerHistory);
    leaderBoardList = leaderBoardList.sort((a,b) => b.point - a.point);
    leaderBoardList = leaderBoardList.slice(0,5);
    leaderBoardList.forEach((element, index) => {
        textList += `<li>${index + 1}. ${element.name}      ${element.point} Points</li>`
    });
    textList += "</ol>"
    boardContainer.style.display = "block"; 
    userList.innerHTML = textList;
    localStorage.setItem("leaderboard", JSON.stringify(leaderBoardList));
    return;
}


function gameStart() {

    if (!gameState.timeStart) {
    gameState.timeStart = true;
    
    timeOut = setInterval (function() {
    gameState.setTimer--;
    timer.innerHTML = gameState.setTimer;
    if (gameState.setTimer === 0) {
        statusBar.textContent = `Time Out your points are ${gameState.playerPoint}`
        gameState.gameActive = false;
        leaderBoards();
        clearInterval(timeOut);
        return;  
            };
        },1000);
    };

    if (gameState.gameActive === true && gameState.setTimer > 0) {
    gameState.playerPoint++;
    addTime();
    userPoint.innerHTML =  gameState.playerPoint;
    return;
    };
};



function addTime() {
    switch (gameState.playerPoint) {
        case bonusTime[0]:
            gameState.setTimer += addTimer;
            statusBar.textContent = "BONUS TIME!!";
            break;
        case bonusTime[1]:
            gameState.setTimer += addTimer;
            statusBar.textContent = "BONUS TIME!!";
            break;
        case bonusTime[2]:
            gameState.setTimer += addTimer;
            statusBar.textContent = "SUPER BONUS TIME!!";
            break;
    };
};
function reset() {
    gameState = {
    setTimer : 10,
    playerPoint : 0,
    gameActive : true,
    timeStart : false,
    playerName : "",
    };
    gameState.playerName = userName.value;
    statusBar.textContent = "";
    boardContainer.style.display = "none"; 
    userPoint.innerHTML = gameState.playerPoint;
    timer.innerHTML = gameState.setTimer;
    clearInterval(timeOut);
}

clickButton.addEventListener("click",gameStart);
userContainer.addEventListener("submit",function(event) {
    event.preventDefault();
    gameState.playerName = userName.value;
    userContainer.style.display = "none";
});
replay.addEventListener("click", reset);