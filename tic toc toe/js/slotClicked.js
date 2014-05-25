/**
 * Function is called when slot on play field is selected
 * @param x(int) represents the xth horizontal slot
 * @param y(int) represents the yth vertical slot
 * @param grid(Multidimensional array of strings) board state
 * @pre   x is between 0-7 inclusive and y is between 0-7 inclusive
 */



function slotClicked(x, y, grid) 
{
    // TODO: Respond to when a slot is clicked
	
	grid[y][x] = currentTurn;
	
	flipOver(grid); //flip board
	slotCounter++;
	endGame(grid);
	skipTurn();

	 //ai
	 ai(grid);
	 flipOver(grid); //flip board
	 slotCounter++;
	 endGame(grid);
	 skipTurn();
	 
	 log(grid[3]);
	 log(grid[2]);
	 log(grid[1]);
	 log("----------------------");
	
}