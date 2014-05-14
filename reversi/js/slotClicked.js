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
	var newGrid = new Array();
	newGrid = grid.slice();
	
	newGrid[y][x] = currentTurn;
	
	//flip the pieces
	for (var a = 1; a <= counterDir[0] ; a++) //right
	{
		newGrid[y][x+a] = currentTurn;
	}
	for (var a = 1; a <= counterDir[1] ; a++) //left
	{
		newGrid[y][x-a] = currentTurn;
	}
	for (var a = 1; a <= counterDir[2] ; a++) //up
	{
		newGrid[y-a][x] = currentTurn;
	}
	for (var a = 1; a <= counterDir[3] ; a++) //down
	{
		newGrid[y+a][x] = currentTurn;
	}
	for (var a = 1; a <= counterDir[4] ; a++) //top right
	{
		newGrid[y-a][x+a] = currentTurn;
	}
	for (var a = 1; a <= counterDir[5] ; a++) //bottom right
	{
		newGrid[y+a][x+a] = currentTurn;
	}
	for (var a = 1; a <= counterDir[6] ; a++) //top left
	{
		newGrid[y-a][x-a] = currentTurn;
	}
	for (var a = 1; a <= counterDir[7] ; a++) //bottom left
	{
		newGrid[y+a][x-a] = currentTurn;
	}
	
	flipOver(newGrid); //flip board
	
	skipTurn(); //display player's turn
	playerScore(newGrid); //display score

	log("\t" + "Player 2 - " + counterP2 + "\n");
	log("\t" + "Player 1 - " + counterP1);
	log("Player Score:");

	log("----------------------");
	
	if (playerScore(newGrid) == 64)
	{
		endGame();
		return newGrid;
	}
	grid = newGrid;	
	alertPlayer();
	return newGrid;
}