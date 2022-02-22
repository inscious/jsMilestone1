// makes sure javascript runs when page loads
window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const displayResult = document.querySelector('.displayResult');

    
    
    // array used to store played tiles
    let board = ['', '', '', '', '', '', '', '', ''];
    // variable fro current players turn
    let currentPlayer = 'X';
    // used to determine if game is over, win/loss/tie
    let isGameActive = true;

    // variables used to display winning messages
    // player x wins message
    const playerXwins = 'playerXwins';
    // player o wins
    const playerOwins = 'playerOwins';
    // game is a draw
    const draw = 'draw';

    // SOLUTIONS //
    // each tile represents an index starting from 0   
    const solutions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // result validation
    function handleResultValidation() {
        // when functions runs, round won is false
        let roundWon = false;
        // loop iterates through grid array, a b & c represent win condition indexes.
        for (let i = 0; i <= 7; i++) {
            const winCondition = solutions[i];
            // index variables
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            // if 3 strings are empty, continue game.
            if (a === '' || b === '' || c === '') {
                continue;
            }
            // winning conditions have to be played by the same player to win game
            if (a === b && b === c) {
                // if true end game
                roundWon = true;
                break;
            }
        }
    if (roundWon) {
            display(currentPlayer === 'X' ? playerXwins : playerOwins);
            isGameActive = false;
            return;
        }
        // if no more indexes available, and no playter won, game draw
    if (!board.includes(''))
        display(draw);
    }

// display win, loss, or draw using switch/case

    const display = (type) => {
        switch(type){
            case playerOwins:
                displayResult.innerHTML = 'Player O Won';
                break;
            case playerXwins:
                displayResult.innerHTML = 'Player X Won';
                break;
            case draw:
                displayResult.innerText = 'Draw game!';
        }
    };

    // function to determine if an action is valid
    const isValidAction = (tile) => {
        // if tile already selected, return false, otehrwise, true.
        // sets inner text to player selction
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    };
    
    // updates grid
    const updateBoard =  (index) => {
        // displays player move on index
        board[index] = currentPlayer;
    }

    // switch player function
    const changePlayer = () => {
        // removes current player from display
        playerDisplay.classList.remove(`player${currentPlayer}`);
        // ternary operator, if x is truthy then o will be current player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        // updates diplayed player
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    // ///////// //
    // user action function
    const userAction = (tile, index) => {
        // if selected tile is empty and game is active,
        if(isValidAction(tile) && isGameActive) {
            // then tile inner = current player
            tile.innerText = currentPlayer;
            // adds players selection to tile
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            // 
            handleResultValidation();
            // chnage player after previous player turn
            changePlayer();
        }
    }

    // reset button
    const resetBoard = () => {
        // clears array
        board = ['', '', '', '', '', '', '', '', ''];
        // resets game active var
        isGameActive = true;
        // player x will always start game
        if (currentPlayer === 'O') {
            changePlayer();
        }
        tiles.forEach(tile => {
            // clears tile indexes
            tile.innerText = '';
            // removes player x from tiles
            tile.classList.remove('playerX');
            //  removes player o from tiles
            tile.classList.remove('playerO');
            // clears display from result box
            displayResult.innerHTML = ''
        });
    }

    // event listeners
    // tile event listener
    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    // reset button 
    resetButton.addEventListener('click', resetBoard);

});