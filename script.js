var startButton = $("#start-game-button"); // Targets the start button
var mainPage = $("#main-page"); // Main page of the html
var answerChoices = $("#answer-choices") // Location for answer choices 
var allScores = $("all-scores"); // Targets the scores
var footer = $("#footer"); // Targets the footer
var timeLeft = $("#time-left"); // Time left span
var totalTime = 0; // Will hold all of the seconds including penalties
var timePenalized = 5; // Time deducted for wrong answers 
var secondsLeft = 60; // Starts the timer at 60 seconds
var questionNumber = 1; // Start with the first question
var correctAnswer; // Stores each correct answer
var userChoice; // Stores the user's clicked choice
var points = 0; // Start with 0 points
var initials; // Will save the user's initials

var questions =  { // Object that holds the questions and answers
1 : {
    "Q": "Inside which element do we put the Javascript src?",
    "Answers": ["<javascript>", "<js>", "<script>", "<scripting>"],
    "Correct": "<script>"
},
2 : {
    "Q": "How do you call a function?",
    "Answers": ["call myFunction()", "myFunction()", "call function myFunction", "Call.myFunction()"],
    "Correct": "myFunction()"
},
3 : {
    "Q": "Alert(message), close() and reset() are JavaScript:",
    "Answers": ["Objects", "Methods", "Properties", "Commands"],
    "Correct": "Methods"
},
4 : {
    "Q": "Which is the correct CSS syntax?",
    "Answers": ["body {color: black}", "{body;color:black}", "body:color=black", "{body:color=black(body}"],
    "Correct": "body {color: black}"
},
5 : {
    "Q": "How do you write 'Hello World' in an alert box?",
    "Answers": ["alert('Hello World')", "msgBox('Hello World')", "alertBox='Hello WOrld'", "alertBox('Hello World')"],
    "Correct": "alert('Hello World')"
},
6 : {
    "Q": "How do you write comments out in Javascript?",
    "Answers": ["//", "<!-- -->", "comment[]'", "..."],
    "Correct": "//"
},
7 : {
    "Q": "How do you write an IF statement in Javascript?",
    "Answers": ["if (i != 5);", "if i =! 5 then", "if i <> 5", "if (i <> 5);"],
    "Correct": "if (i != 5);"
}
};

function startTimer() { // This will start the timer
    if (totalTime === 0) {
        totalTime = setInterval(function() {
            secondsLeft--;
            timeLeft.text(secondsLeft);
            if (secondsLeft === 0) {
                clearInterval(totalTime);
                finishedGame(); // Displays the finished game screen
            }
        }, 1000) // 1000 milliseconds = 1 second 
    }
    showQuestions();
};

function showQuestions() { // Will start showing the questions
    if (questionNumber <= 7) { // Won't run if out of questions
        mainPage.html(""); // Clear the title of the main section
        answerChoices.html(""); // Clear the answer choices
        var writeQuestion = questions[questionNumber].Q; // Create a variable holding the question
        var h1 = $("<h1>"); // Create h1 element and store it in h1 variable
        h1.text(writeQuestion); // Fill h1 element with the question
        correctAnswer = questions[questionNumber].Correct; // Stores the correct answer 
    
        questions[questionNumber].Answers.forEach(function(each) { // Creates a button for each answer 
            var answerButton = $("<button>");
            answerButton.text(each);
            answerChoices.append(answerButton); // Adds each button after the question
        });
        mainPage.append(h1); // Adds the question to the HTML
        answerChoices.on("click", function(e) { // Listen for a click on the button
            $(this).off("click"); // stops event from bubbling
            var target = e.target;
            userChoice = target.textContent; // Store the target choice in userChoice
            compareAnswers(userChoice, correctAnswer); // Calls the function to compare
        });
    } else {
        clearInterval(totalTime); // Stop the timer
        timeLeft.text("0"); // Set it back to zero
        //storeScore(points);  Store the points into local storage
        finishedGame(points);
    }
};

function compareAnswers(userChoice, correctAnswer) { // This will compare each answer 
    questionNumber++; // Goes to the next question
    if (userChoice === correctAnswer) {
        points++; // Add points if the answer is correct
        showQuestions();

    } else if (userChoice != correctAnswer) {
        secondsLeft -= timePenalized; // If the answer is wrong, 10 seconds will be taken from the timer
        showQuestions();
    }
};
/*
function storeScore(points) { 
    var totalScore = localStorage.setItem("score", points);
};

*/
function finishedGame(points) {  // Asks the user to enter their initials to record their score in local storage
    mainPage.html("");
    answerChoices.html("");
    var resultsTitle = mainPage.html("<h1>RESULTS</h1>");
    resultsTitle.attr("class", "results-title"); // Added a class to style it
    var p = $("<p>");
    p.text(`You scored: ${points} points out of 7.`);
    var p2 = $("<p>");
    p2.text("Want to save your score? Enter your initials here: ");
    var input = $("<input>");
    input.attr("id", "input-text");
    var submitButton = $("<button>");
    submitButton.attr("id", "submitInitialsButton");
    submitButton.text("Submit");
    resultsTitle.append(p);
    resultsTitle.append(p2);
    resultsTitle.append(input);
    resultsTitle.append(submitButton);
    footer.html(""); // Clears the footer
    footer.html("<a href = 'index.html'>PLAY GAME AGAIN</a>"); // Gives the user a choice to play again

    submitButton.on("click", function() {
        initials = $("#input-text").val();
        //localStorage.setItem("initials", initials);
        if (initials === null) {
            console.log("Nothing was typed in.");
        } else {
            var scoreObject = {
                "initials": initials,
                "score": points
            }
        }
        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
            allScores = [];

        } else {
            allScores = JSON.parse(allScores);

        }
        allScores.push(scoreObject);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        console.log(localStorage.getItem("allScores"));

        window.location.replace("./highScores.html"); 
    })
};

startButton.on("click", startTimer); // starts timer when button is clicked 

