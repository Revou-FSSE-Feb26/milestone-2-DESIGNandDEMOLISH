let timer = document.getElementById("timer");
let clickButton = document.getElementById("btn");
let userPoint = document.getElementById("point");
let statusBar= document.getElementById("statusBar");
let timeOut;

//add bonus
let bonusTime = [50,80,120];
let addTimer = 5;

//set timer
let setTimer = 10;
let gameActive = true;
let timeStart = false;

//save data
let saved = localStorage.getItem("leaderboard");
let leaderBoardList = saved? JSON.parse(saved) : [];

userPoint.innerHTML = gameState.playerPoint;
timer.innerHTML = setTimer;

//update data
function updateLeaderBoard() {
    leaderBoardList = leaderBoard(leaderBoardList);
    localStorage.setItem("leaderboard", JSON.stringify(leaderBoardList));
};

function gameStart() {
    // Guard clause: ensures the countdown timer only starts ONCE.
    if (!timeStart) {
    timeStart = true;
    
    timeOut = setInterval (function() {
    setTimer--;
    timer.innerHTML = setTimer;
    if (setTimer === 0) {
        statusBar.textContent = `Time Out your points are ${gameState.playerPoint}`
        gameActive = false;
        updateLeaderBoard();
        clearInterval(timeOut);
        return;  
            };
        },1000);
    };
    // Only award points if the game is still active and time remains
    if (gameActive === true && setTimer > 0) {
    gameState.playerPoint++;
    threshold();
    userPoint.innerHTML =  gameState.playerPoint;
    return;
    };
};


// add timer when reach point 50, 80 and 120
function threshold() {
    switch (gameState.playerPoint) {
        case bonusTime[0]:
            setTimer += addTimer;
            statusBar.textContent = "BONUS TIME!!";
            break;
        case bonusTime[1]:
            setTimer += addTimer;
            statusBar.textContent = "BONUS TIME!!";
            break;
        case bonusTime[2]:
            setTimer += addTimer;
            statusBar.textContent = "SUPER BONUS TIME!!";
            break;
    };
};
function reset() {
    setTimer = 10;
    gameActive = true;
    timeStart = false;

    gameState = {
    playerPoint : 0,
    playerName : "",
    };
    gameState.playerName = userName.value;
    statusBar.textContent = "";
    boardContainer.style.display = "none"; 
    userPoint.innerHTML = gameState.playerPoint;
    timer.innerHTML = setTimer;
    clearInterval(timeOut);
}

clickButton.addEventListener("click",gameStart);

userContainer.addEventListener("submit",function(event) {
    event.preventDefault();
    gameState.playerName = userName.value;
    userContainer.style.display = "none";
});
replay.addEventListener("click", reset);