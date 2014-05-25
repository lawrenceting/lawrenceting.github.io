/* Initialize the board */
for(var x = 0; x < NUMBER_ROWS; x++) 
{
    document.write("<tr>");
    for(var y = 0; y < NUMBER_COLS; y++) 
    {
        document.write("<td " + 
            "id=\"cell" + x + "x" + y + "\" " +
            "background=\"images/empty.png\" " + 
        ">");
        document.write("<img " + 
            "id=\"img" + x + "x" + y + "\" " + 
            "src=\"images/blank.png\" " + 
        ">");
        document.write("</td>");
    }
    document.write("</tr>");
}

/* Modify top */
for(var x = 0, y = 0; y < NUMBER_COLS; y++) 
{
    imageChangeRotate(
        "#" + "cell" + x + "x" + y, 
        "background",
        "images/edge.png", 0);
}

/* Modify bottom */
for(var x = NUMBER_ROWS - 1, y = 0; y < NUMBER_COLS; y++) 
{
    imageChangeRotate(
        "#" + "cell" + x + "x" + y, 
        "background",
        "images/edge.png", 180);
}

/* Modify right */
 for(var x = 0, y = (NUMBER_COLS - 1); x < NUMBER_ROWS; x++) 
{
    imageChangeRotate(
        "#" + "cell" + x + "x" + y, 
        "background",
        "images/edge.png", 90);
}

/* Modify left */
 for(var x = 0, y = 0; x < NUMBER_ROWS; x++) 
{
    imageChangeRotate(
        "#" + "cell" + x + "x" + y, 
        "background",
        "images/edge.png", 270);
}

/* Modify top-left */
imageChangeRotate(
    "#cell0x0", 
    "background",
    "images/corner.png", 0);

/* Modify bottom-right */
imageChangeRotate(
    "#" + "cell" + (NUMBER_ROWS - 1) + "x" + (NUMBER_COLS - 1), 
    "background",
    "images/corner.png", 180);

/* Modify top-right */
imageChangeRotate(
    "#" + "cell" + "0" + "x" + (NUMBER_COLS - 1), 
    "background",
    "images/corner.png", 90);

/* Modify bottom-left */
imageChangeRotate(
    "#" + "cell" + (NUMBER_ROWS - 1) + "x" + "0", 
    "background",
    "images/corner.png", 270);
