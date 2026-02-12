//HTML Variables
const currentPlayer = document.querySelector(".currentPlayer");
const display = document.querySelector(".display");
const resetButton = document.querySelector(".resetButton");

//JS Variables

let Players = {};
Players.player1 = new Player("Tobias", "X");
Players.player2 = new Player("Markus", "O");
Players.activePlayer = false; //false = Player1, true = Player2

let gameBoard = Array(9).fill("");

//Player-Constructor

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
};


//Functions

function createGameBoard() {
    gameBoard.forEach((_, index) => {
        let field = document.createElement("div");
        field.setAttribute("class", "boardField");
        field.setAttribute("id", index);
        display.appendChild(field);
    });
}

function setMarker(fieldID) {
    const field = document.getElementById(fieldID);
    if (!Players.activePlayer && field.textContent == "") { //Wenn Player 1 aktiv ist
        gameBoard[fieldID] = Players.player1.marker;
        if (checkWinner()) return;
        playerChange();
    }
    else if (Players.activePlayer && field.textContent == "") { //Wenn Player 2 aktiv ist
        gameBoard[fieldID] = Players.player2.marker;
        if (checkWinner()) return;
        playerChange();
    }
}

function resetGameBoard() {
    gameBoard.fill("");
    updateGameBoard();
}

function playerChange() {
    Players.activePlayer = !Players.activePlayer;
    currentPlayer.textContent = Players.activePlayer ? (Players.player2.name + " ist am Zug!") : (Players.player1.name + " ist am Zug!");
}

function updateGameBoard() {
    gameBoard.forEach((element, index) => {
        document.getElementById(index).textContent = element;
    });
}

function checkWinner(){
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertikal
        [0, 4, 8], [2, 4, 6]            //diagonal
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            alert("Gewonnen!");
            return true;
        }
    }
    return false;
} 

//Eventlistener

display.addEventListener("click", (e) => {
    if (e.target.classList.contains("boardField")) {
        setMarker(e.target.id);
        updateGameBoard();
    }
})

resetButton.addEventListener("click", () => {
    resetGameBoard();
});
//


//Initialisation
currentPlayer.textContent = Players.player1.name + " ist am Zug!"



createGameBoard();
resetGameBoard();

//ToDo

//Logik mit pattern machen, siehe ChatGPT
