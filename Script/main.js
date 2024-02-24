
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
let counterWin = 0;
let counterLose = 0;
let arrUser = JSON.parse(localStorage.getItem("user")) || [];


function theGame(userChoose) {

    const computerChoose = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
    let result = "";

    if (userChoose === computerChoose) {
        result = "It's a tie!";
    } else if (
        (userChoose === "rock" && computerChoose === "scissors") ||
        (userChoose === "paper" && computerChoose === "rock") ||
        (userChoose === "scissors" && computerChoose === "paper")
    ) {
        result = "You win!";
        counterWin++;
    } else {
        result = "You lose!";
        counterLose++;
        if (counterLose == 10) {
            alert(`You scored ${counterWin} points!`);
            stopGame();
            reste();
        }
    }

    document.getElementById("result").innerHTML = `You choose ${userChoose}, computer choose ${computerChoose}.<span class='theResult'>${result}</span>`;

    document.getElementById("score").innerHTML = `User score: ${counterWin}, Computer score: ${counterLose}`;

}

function stopGame() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();


    const theName = prompt("What's your name?");

    arrUser.push({
        id: arrUser.length,
        theNameOfUser: theName,
        score: counterWin,
        date: `${day}/${month}/${year}`
    });

    localStorage.setItem("user", JSON.stringify(arrUser));

    printScore();
}

function printScore() {
    document.getElementById("tableScore").innerHTML = "";
    arrUser.forEach(myArr => {
        let theHtml = `<tr>
        <td>${myArr.theNameOfUser}</td>
        <td>${myArr.score}</td>
        <td>${myArr.date}</td>
        </tr>`;
        document.getElementById("tableScore").innerHTML += theHtml;
    });
}

function reste() {
    counterWin = 0;
    counterLose = 0;
    document.getElementById("score").innerHTML = `User score: ${counterWin}, Computer score: ${counterLose}`;
    document.getElementById("result").innerHTML = "Choose your weapon!";
}

function clearScore() {
    localStorage.clear();
    arrUser = [];
    document.getElementById("tableScore").innerHTML = "";
}

function getDataFromLocalStorage() {
    if (localStorage.getItem("user")) {
        arrUser = JSON.parse(localStorage.getItem("user"));
        printScore();
    }
}

getDataFromLocalStorage();
rock.addEventListener("click", () => { theGame("rock") });
paper.addEventListener("click", () => { theGame("paper") });
scissors.addEventListener("click", () => { theGame("scissors") });
document.getElementById("reste").addEventListener("click", clearScore);