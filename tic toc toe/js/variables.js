const DEBUG_ENABLED = true;
const NUMBER_ROWS = 5;
const NUMBER_COLS = 3;

// Game State
var gameState;
var currentTurn = 1;
var alternativeTurn = 2;

var slotCounter = 0;

var grid = new Array(NUMBER_COLS);

for(var y = 0; y < NUMBER_ROWS; y++) 
{
	grid[y] = new Array(NUMBER_ROWS);
}