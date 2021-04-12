var highScores = $(".high-scores"); // Targets location for high scores

function showScores() {
    var allScores = localStorage.getItem("allScores"); // Retrieves scores from local storage 
    allScores = JSON.parse(allScores); 

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) { // For loop that will append new scores/ intitials to the list 

        var createLi = $("<li>"); // Creates new li tag
        createLi.text(allScores[i].initials + " " + allScores[i].score);
        highScores.append(createLi);
    }
    var clearButton = $("<button>");  // Creates a clear button 
    clearButton.attr("id", "clearButton");
    clearButton.text("CLEAR ALL");
    highScores.append(clearButton); // Appends clear button to high score list
    var buttonToClear = $("#clearButton"); // If the clear button is clicked, all the li tags and button will be removed
    buttonToClear.on("click", function() {
        highScores.text("");
        buttonToClear.hide(); // Will clear the button too
        localStorage.clear(); // Clear the local storage
    })    
};
}

showScores(); // Start the function on page load 