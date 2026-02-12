const Gameboard = (function () {
    const board = Array(9).fill("");
    
    const getBoard = () => board;

    const setField = (index, marker) => {
        if (board[index] !== "") return false;
        board [index] = marker;
        return true;
    };
    
    const reset = () => {
        board.fill("");
    };

    return {getBoard, setField, reset};
})();

const Player = (name, marker) => {
    return {name, marker};
};

const GameController = (function () {
    
    const player1 = Player("Tobias", "X");
    const player2 = Player("Markus", "O");
    let activePlayer = player1;

    const switchPlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (index) => {
        if (!Gameboard.setField(index, activePlayer.marker)) return;

        if (checkWinner()) {
            alert(`${activePlayer.name} hat gewonnen!`);
            return;
        }

        switchPlayer();
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();

        const winPatterns = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ]

        return winPatterns.some(([a, b, c]) => 
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]

        );
    };

    const resetGame = () => {
        Gameboard.reset();
        activePlayer = player1;
    };

    return {playRound, getActivePlayer, resetGame};
})();

const DisplayController = (function() {

    const display = document.querySelector(".display");
    const currentPlayerText = document.querySelector(".currentPlayer");
    const resetButton = document.querySelector(".resetButton");

    const render = () => {
        display.innerHTML = "";
        const board = Gameboard.getBoard();

        board.forEach((value, index) => {
            const field = document.createElement("div");
            field.classList.add("boardField");
            field.textContent = value;
            field.addEventListener("click", () => {
                GameController.playRound(index);
                render();
                updateCurrentPlayer();
            });

            display.appendChild(field);
        });
    };
    
    const updateCurrentPlayer = () => {
        currentPlayerText.textContent = `${GameController.getActivePlayer().name} ist am Zug!`;
    };

    resetButton.addEventListener("click", () => {
        GameController.resetGame();
        render();
        updateCurrentPlayer();
    });

    const init = () => {
        render();
        updateCurrentPlayer();
    };

    return {init};

})();


DisplayController.init();