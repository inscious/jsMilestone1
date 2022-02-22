window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const displayr = document.querySelector('.displayr');

    
    
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
        // loop iterates through grid array, a b & c variables are 
        for (let i = 0; i <= 7; i++) {
            const winCondition = solutions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
    if (roundWon) {
            display(currentPlayer === 'X' ? playerXwins : playerOwins);
            isGameActive = false;
            return;
        }
    if (!board.includes(''))
        display(draw);
    }

// display win, loss, or draw using switch/case

    const display = (type) => {
        switch(type){
            case playerOwins:
                displayr.innerHTML = 'Player O Won';
                break;
            case playerXwins:
                displayr.innerHTML = 'Player X Won';
                break;
            case draw:
                displayr.innerText = 'draw game!';
        }
        displayr.classList.remove('hide');
    };

// determines if action is valid
// if tile already selected, return false, otehrwise, true.
// update grid

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    // switch player
    /////////////////

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    // ///////// //
    // user action //
    // ///////// //

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    // reset button
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        displayr.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
            displayr.innerHTML = ''
        });
    }

    // event listeners

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);

});