function ai_start(grid)
{
	// If player plays middle
	if (slotCounter == 1 && grid[2][1] == alternativeTurn)
	{
		var dice = Math.ceil( Math.random() * 4 );
		
		if (dice == 1)
			grid[1][0] = currentTurn;
		if (dice == 2)
			grid[1][2] = currentTurn;
		if (dice == 3)
			grid[3][0] = currentTurn;
		if (dice == 4)
			grid[3][2] = currentTurn;
		return true;
	}
	
	// If player plays corner
	if (slotCounter == 1 && (grid[1][1] == alternativeTurn || grid[2][0] == alternativeTurn || grid[2][2] == alternativeTurn || grid[3][1] == alternativeTurn))
	{
		var dice = Math.ceil( Math.random() * 3 );
		
		if (grid[1][1] == alternativeTurn)
		{
			if (dice == 1)
				grid[1][0] = currentTurn;
			if (dice == 2)
				grid[1][2] = currentTurn;
		}
		if (grid[2][0] == alternativeTurn)
		{
			if (dice == 1)
				grid[1][0] = currentTurn;
			if (dice == 2)
				grid[3][0] = currentTurn;
		}
		if (grid[2][2] == alternativeTurn)
		{
			if (dice == 1)
				grid[1][2] = currentTurn;
			if (dice == 2)
				grid[3][2] = currentTurn;
		}
		if (grid[3][1] == alternativeTurn)
		{
			if (dice == 1)
				grid[3][0] = currentTurn;
			if (dice == 2)
				grid[3][2] = currentTurn;
		}
		if (dice == 3)
			grid[2][1] = currentTurn;
		return true;
	}
	
	// If player plays edge
	if (slotCounter == 1 && (grid[1][0] == alternativeTurn || grid[1][2] == alternativeTurn || grid[3][0] == alternativeTurn || grid[3][2] == alternativeTurn))
	{
		var num;
		if (grid[1][0] == alternativeTurn)
			num = 1;
		if (grid[1][2] == alternativeTurn)
			num = 2;
		if (grid[3][0] == alternativeTurn)
			num = 3;
		if (grid[3][2] == alternativeTurn)
			num = 4;
		
		for (;;)
		{	
			var dice = Math.ceil( Math.random() * 4 );
			
			if (dice != num)
				break;
		}
		if (dice == 1)
			grid[1][0] = currentTurn;
		if (dice == 2)
			grid[1][2] = currentTurn;
		if (dice == 3)
			grid[3][0] = currentTurn;
		if (dice == 4)
			grid[3][2] = currentTurn;
		return true;
	}
}