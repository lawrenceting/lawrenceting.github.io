function ai(grid)
{	
	var newGrid = new Array();
	
	for (var i = 0; i < grid.length ; i++)
	{
		newGrid[i] = grid[i].slice();
	}
	/*
//counter move
	if (slotCounter == 1)
	{
		ai_start(grid);
		return;
	}*/

//to win
	if (ai_win(grid) == true)
		return;
	
//to block
	if (ai_block(grid) == true)
		return;

//to block opponent from winning in 2 moves
	if (ai_detect2steps(grid) == 2)
	{
		if (ai_block2steps(grid) == true)
			return;
	}

//create an opportunity for the AI by creating a fork
	
//if patterns do not match
	
}