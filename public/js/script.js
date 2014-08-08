$(document).ready(function(){
	
	sortMenu(".sidebar-nav", "a"); //Sort menu alphabetically

});

function sortMenu(selector, theChild) {
    $(selector).children(theChild).sort(function(a, b) {
        var upA = $(a).text().toUpperCase();
        var upB = $(b).text().toUpperCase();
        return (upA < upB) ? -1 : (upA > upB) ? 1 : 0;
    }).appendTo(selector);
}