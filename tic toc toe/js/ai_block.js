function ai_block(grid)
{
	//Block Player
	for (var y = 1; y < NUMBER_ROWS - 1; y++) 
	{
		for (var x = 0; x < NUMBER_COLS; x++) 
		{
			if (grid[y][x] == 0)
			{
				grid[y][x] = alternativeTurn;
				
				if (threeOfaKind_ai(grid) == true)
				{
					grid[y][x] = currentTurn;
					return true;
				}
				grid[y][x] = 0;
			}
		}
	}	
}
