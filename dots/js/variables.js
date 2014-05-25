const DEBUG_ENABLED = true;
const NUMBER_COLS = 30;
const NUMBER_ROWS = 30;
const NUMBER_OF_PLAYERS = 2;

// Game State
var currentTurn = 1;

var grid = new Array(NUMBER_ROWS);
                  
    for(var currentCol = 0; currentCol < NUMBER_ROWS; currentCol++) 
    {
        grid[currentCol] = new Array(NUMBER_COLS);
    }