//file
let userName = document.getElementById("userName");
let submitButton = document.getElementById("submitButton");
let userContainer = document.getElementById("container");

//leaderBoard
let boardContainer = document.getElementById("boardContainer");
let userList = document.getElementById("userList");
let replay = document.getElementById("replay");
let gameState = {
    playerPoint :0,
    playerName : "",
};

//leaderBoard function
function leaderBoard(leaderBoardList) {
    let playerHistory = {
        name: gameState.playerName,
        point: gameState.playerPoint,
    };
    let boardList = "<ol>";
    leaderBoardList.push(playerHistory);
    leaderBoardList = leaderBoardList.sort((a, b) => b.point - a.point);
    leaderBoardList = leaderBoardList.slice(0, 5);
    leaderBoardList.forEach((element, index) => {
        boardList += `<li>${index + 1}. ${element.name}   ${element.point} Points`;        
    });
    boardList += "</ol>"
    boardContainer.style.display ="block";
    userList.innerHTML = boardList; 
    return leaderBoardList; 
};