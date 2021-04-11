var highScores = $(".high-scores"); // Targets location for high scores

function showScores() {
    var allScores = localStorage.getItem("allScores");
    allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = $("<li>");
        createLi.text(allScores[i].initials + " " + allScores[i].score);
        highScores.append(createLi);
    }
    var clearButton = $("<button>"); 
    clearButton.attr("id", "clearButton");
    clearButton.text("CLEAR ALL");
    highScores.append(clearButton);
    var buttonToClear = $("#clearButton"); // If the clear button is clicked, all the li tags and button will be removed
    buttonToClear.on("click", function() {
        highScores.text("");
        buttonToClear.hide(); // Will clear the button too
        localStorage.clear();
    })    
};
}

showScores(); // Start the function on page load 