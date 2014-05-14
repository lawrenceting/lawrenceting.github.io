/**
 * Function that shows hint
 */
var hint = new Object;

hint.default_value = false;

hint.on = function() { hint.default_value = true; verifyMoves(grid); }

hint.off = function() { hint.default_value = false; flipOver(grid); }