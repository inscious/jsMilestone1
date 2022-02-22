window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const playerXwins = 'playerXwins';
    const playerOwins = 'playerOwins';
    const draw = 'draw';

// SOLUTIONS //

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
        let roundWon = false;
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
            announce(currentPlayer === 'X' ? playerXwins : playerOwins);
            isGameActive = false;
            return;
        }
    if (!board.includes(''))
        announce(draw);
    }

// announce win, loss, or draw using switch/case

    const announce = (type) => {
        switch(type){
            case playerOwins:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case playerXwins:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case draw:
                announcer.innerText = 'draw game!';
        }
        announcer.classList.remove('hide');
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
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
            announcer.innerHTML = ''
        });
    }

    // event listeners

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);

});