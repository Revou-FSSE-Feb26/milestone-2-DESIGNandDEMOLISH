let rock = document.getElementById("rockButton");
let paper = document.getElementById("paperButton");
let scissor = document.getElementById("scissorButton");
let userScore = document.getElementById("userScore");
let computerScoreText = document.getElementById("computerScore");
let userDisplay = document.getElementById("userDisplay");
let computerDisplay = document.getElementById("computerDisplay");
let statusBar = document.getElementById("statusBar");

//game animated
let userAnimation = document.getElementById("userAnimation");
let computerAnimation = document.getElementById("computerAnimation");
userAnimation.style.width = "150px";
userAnimation.style.height = "150px";

computerAnimation.style.width = "150px";
computerAnimation.style.height = "150px";

//game variables
let gameForm = document.getElementById("gameForm");
let maxPoint = 10;
let playerScore = 0;
let computerScore = 0;

//save data
let saved = localStorage.getItem("leaderboard3");
let leaderBoardList = saved? JSON.parse(saved) : [];

//update data
function updateLeaderBoard() {
    leaderBoardList = leaderBoard(leaderBoardList);
    localStorage.setItem("leaderboard3", JSON.stringify(leaderBoardList));
};

function gameStart (event) {
    // Function to determine if the game has reached the max point limit
    function checkStatus () {
        if (playerScore === maxPoint) {
        statusBar.textContent ="Congrats,You Win the Game!!";
        gameState.playerPoint = playerScore * 20; // formula to create point
        updateLeaderBoard();
        return true; // Returns true to trigger a stop in the main game loop
    };
        if (computerScore === maxPoint) {
        statusBar.textContent ="To Bad, you lose!";
        gameState.playerPoint = playerScore * 20;
        updateLeaderBoard();
        return true;
        };
        return false;
    };

    let userChoice = event.submitter.textContent;

    // Logic for the computer's random choice (1=Rock, 2=Paper, 3=Scissors)
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

    // Early exit: If the game is already over, do not process the new click
    if (checkStatus()) return;

    

    //animated variable
    const imagePath = {
    '✊' : '../image/rockIcon.png',
    '✋' : '../image/paperIcon.png',
    '✌️' : '../image/scissorIcon.png'
    };
    function imageWiggle() {
        userAnimation.classList.add('animate-wiggle');
        computerAnimation.classList.add('animate-wiggle');
        setTimeout(() => {
            userAnimation.classList.remove('animate-wiggle');
            computerAnimation.classList.remove('animate-wiggle');
            userAnimation.src = imagePath[userChoice];
            computerAnimation.src = imagePath[computerChoise];

            if (userChoice === computerChoise) {
        statusBar.textContent = "It's Tie!!";
        userDisplay.innerHTML = userChoice;
        computerDisplay.innerHTML = computerChoise;
        
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
        computerScore++;
        computerScoreText.textContent = computerScore;
        userDisplay.innerHTML = userChoice;
        computerDisplay.innerHTML = computerChoise;
        if (checkStatus()) return;
    };
        },2000);
    };

    imageWiggle();
    
};

function reset() {
    playerScore = 0;
    computerScore = 0;
    userScore.textContent = playerScore;
    computerScoreText.textContent = computerScore;
    userDisplay.innerHTML = "";
    computerDisplay.innerHTML = "";
    boardContainer.style.display = "none";
};

replay.addEventListener("click",reset);

gameForm.addEventListener("submit", function(e) {
    e.preventDefault();
    gameStart(e);
    userAnimation.src = '../image/rockIcon.png';
    computerAnimation.src = '../image/rockIcon.png';
});

document.querySelector('body > section.flex.flex-col.gap-10').style.display = 'none';

userContainer.addEventListener("submit",function(event) {
    event.preventDefault();
    gameState.playerName = userName.value;
    userContainer.style.display = "none";
    document.querySelector('body > section.flex.flex-col.gap-10').style.display = 'flex';
});