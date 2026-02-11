//HTML Variables
const currentPlayer = document.querySelector(".currentPlayer");
const display = document.querySelector(".display");
const resetButton = document.querySelector(".resetButton");

//JS Variables

let Players = {};
Players.player1 = new Player("Tobias", "X");
Players.player2 = new Player("Markus", "O");
Players.activePlayer = false; //false = Player1, true = Player2

let gameBoard = [];
for (let i = 0; i < 9; i++) {
    gameBoard[i] = i;
}

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
        field.textContent = Players.player1.marker;
        playerChange();
    }
    else if (Players.activePlayer && field.textContent == "") {
        field.textContent = Players.player2.marker;
        playerChange();
    
    }
}

function removeMarker() {
    gameBoard.forEach((_, index) => {
        document.getElementById(index).textContent = "";
    })
}

function playerChange() {
    Players.activePlayer = !Players.activePlayer;
    currentPlayer.textContent = Players.activePlayer ? (Players.player2.name + " ist am Zug!") : (Players.player1.name + " ist am Zug!");
}


//Eventlistener

display.addEventListener("click", (e) => {
    if (e.target.classList.contains("boardField")) {
        setMarker(e.target.id);
    }
})

resetButton.addEventListener("click", () => {
    removeMarker();
});
//


//Initialisation
currentPlayer.textContent = Players.player1.name + " ist am Zug!"



createGameBoard();

//ToDo

//gameBoard für die speicherung des Spiels nutzen und von createGameBoard nur anzeigen lassen. Besser als direkt mit .textContent!
//Logik mit pattern machen, siehe ChatGPT
