/**
 * Function shows dialog menu with text message
 * @param text(string) message that is displayed in dialog
 */
function showDialog(text) {
    var dialogText = document.getElementById("dialogText");
    dialogText.innerHTML = text;
    $("#dialog").slideDown("fast");
}

/**
 * Function hides dialog menu
 */
function hideDialog() {
    $("#dialog").slideUp("fast");
}

/**
 * Function sets the message in player info div
 * @param msg(string) message to be set 
 */
function setInfo(msg) {
    var scoreText = document.getElementById("scoreTxt");
    scoreText.innerHTML = msg;
}

/**
 * Logs message into text area
 * @param message(string) message to be prepended to contents of textarea
 */
function log(message) {
    var debugTextArea = document.getElementById("debugText");
    debugTextArea.innerHTML = message + "\n" + debugTextArea.innerHTML;
}

/**
 * Clears debug text area
 */
function clearDebug() {
    var debugTextArea = document.getElementById("debugText");
    debugTextArea.innerHTML = "";
}

/**
 * Hides the debug div
 */
function hideDebug() {
    $("#debug").slideUp();
}