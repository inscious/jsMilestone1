
// returns an array from selected tiles
const tiles = Array.from(document.querySelectorAll('.tile'));
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');


let grid = ['', '', '', '', '', '', '', '', '']
let currentPlayer = 'X'
let isGameActive = true;





resetButton.addEventListener('click', resetBoard);