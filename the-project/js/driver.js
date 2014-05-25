$(document).ready(function(){

    $("a[href=#restart]").click(function(event)
	{
        onRestart(grid);
        return true;
    });

    $("a[href=#skip]").click(function(event)
    {
        skipTurn();
        return true;
    });

    $("a[href=#end]").click(function(event)
    {
        endGame(grid);
        return true;
    });

    $("img.[id^='img'].[id*='x']").click(function(event)
	{
        log("--------------------");
        var plot = getPlot(this.id);
        var x = plot [0];
        var y = plot [1];

        if(grid[x][y] == 0) {
            addImage(this.id);
            modifyGrid(x,y);
            
            var connections = getConnections(x,y);
            surround(connections);
            
            playerTurn();

        } else {
            log("Cell already filled.");
        }
        return true;
    });
    
    onLoad(grid);
});