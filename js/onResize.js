//------------------------------------------------------------------------------
// When windows is resized
//------------------------------------------------------------------------------

(function($, document, window, viewport){

    function resizeTopBar() {
        if (viewport.is('md')) {
			console.log("Header is not collasped");
        }
        else {
			console.log("Header is collasped");
        }
    }
  
  // Executes once whole document has been loaded
  $(document).ready(function() {

		resizeTopBar();
		Waypoint.refreshAll();
  });
 
  // Executes each time window size changes
  $(window).bind('resize', function() {
      viewport.changed(function(){

        resizeTopBar();
		Waypoint.refreshAll();
		  
      });
  });

})(jQuery, document, window, ResponsiveBootstrapToolkit);