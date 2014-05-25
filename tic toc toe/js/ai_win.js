function ai_win(grid)
{
	// To win [ ][X][X] 
	for (var y = 1; y < NUMBER_ROWS - 1; y++) 
	{
		for (var x = 0; x < NUMBER_COLS; x++) 
		{
			if (grid[y][x] == 0)
			{
				grid[y][x] = currentTurn;
				
				if (threeOfaKind(grid) == true)
					return true;
				
				grid[y][x] = 0;
			}
		}
	}
}
