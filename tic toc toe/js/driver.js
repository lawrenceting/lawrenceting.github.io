
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

    $("img").click(function(event)
	{
        imageClicked(event, grid);
        return true;
    });

    onLoad(grid);
});



