/*
 *get inbetween number of the alternative pieces
 */
function getDir(x,y,grid)
{	
	counterDir = [0,0,0,0,0,0,0,0];
	
	//right
	for (var i = 1; i < 8 ; i++)
	{
		if (grid[y][x+i] == alternativeTurn)
		{
			if (grid[y][x+i+1] == currentTurn)
			{
				counterDir[0] = i;
			}
		}
		else
			break;
	}

	//left
	for (var i = 1; i < 8 ; i++)
	{
		if (grid[y][x-i] == alternativeTurn)
		{
			if (grid[y][x-i-1] == currentTurn)
			{
				counterDir[1] = i;
			}
		}
		else
			break;
	}

	//up
	for (var i = 1; i < 8 ; i++)
	{
		if (grid[y-i][x] == alternativeTurn)
		{
			if (grid[y-i-1][x] == currentTurn)
			{
				counterDir[2] = i;
			}
		}
		else
			break;
	}

	//down
	for (var i = 1; i < 8 ; i++)
	{
		if (grid[y+i][x] == alternativeTurn)
		{
			if (grid[y+i+1][x] == currentTurn)
			{
				counterDir[3] = i;
			}
		}
		else
			break;
	}

	//top right
	for (var i = 1; i < 8 ; i++)
	{
		if (grid[y-i][x+i] == alternativeTurn)
		{
			if (grid[y-i-1][x+i+1] == currentTurn)
			{
				counterDir[4] = i;
			}
		}
		else
			break;
	}

	//bottom right
	for (var i = 1; i < 8 ; i++)
	{
		if (grid[y+i][x+i] == alternativeTurn)
		{
			if (grid[y+i+1][x+i+1] == currentTurn)
			{
				counterDir[5] = i;
			}
		}
		else
			break;
	}
	
	//top left
	for (var i = 1; i < 8 ; i++)
	{
		if (grid[y-i][x-i] == alternativeTurn)
		{
			if (grid[y-i-1][x-i-1] == currentTurn)
			{
				counterDir[6] = i;
			}
		}
		else
			break;
	}

	//bottom left
	for (var i = 1; i < 8 ; i++)
	{
		if (grid[y+i][x-i] == alternativeTurn)
		{
			if (grid[y+i+1][x-i-1] == currentTurn)
			{
				counterDir[7] = i;
			}
		}
		else
			break;
	}

	return counterDir;
}
