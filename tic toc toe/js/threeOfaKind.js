function threeOfaKind(grid)
{	
	for(var y = 1; y < NUMBER_ROWS - 1; y++) 
	{
		if (grid[y][0] == currentTurn && grid[y][0] == grid[y][1] && grid[y][1] == grid[y][2])
		{			
			return true;
		}
	}
	
	for(var x = 0; x < NUMBER_COLS; x++) 
	{
		if (grid[1][x] == currentTurn && grid[1][x] == grid[2][x] && grid[2][x] == grid[3][x])
		{
			return true;
		}
	}
	
	if (grid[1][0] == currentTurn && grid[1][0] == grid[2][1] && grid[2][1] == grid[3][2])
	{
		return true;
	}
	
	if (grid[3][0] == currentTurn && grid[3][0] == grid[2][1] && grid[2][1] == grid[1][2])
	{
		return true;
	}
	return false;
}

function threeOfaKind_ai(grid)
{	
	for(var y = 1; y < NUMBER_ROWS - 1; y++) 
	{
		if (grid[y][0] == alternativeTurn && grid[y][0] == grid[y][1] && grid[y][1] == grid[y][2])
		{			
			return true;
		}
	}
	
	for(var x = 0; x < NUMBER_COLS; x++) 
	{
		if (grid[1][x] == alternativeTurn && grid[1][x] == grid[2][x] && grid[2][x] == grid[3][x])
		{
			return true;
		}
	}
	
	if (grid[1][0] == alternativeTurn && grid[1][0] == grid[2][1] && grid[2][1] == grid[3][2])
	{
		return true;
	}
	
	if (grid[3][0] == alternativeTurn && grid[3][0] == grid[2][1] && grid[2][1] == grid[1][2])
	{
		return true;
	}
	return false;
}