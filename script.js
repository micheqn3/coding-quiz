let startButton = $("#styled-button"); // Targets the start button
let mainPage = $("#main-page"); // Main page of the html
let answerChoices = $("#answer-choices") // Location for answer choices 
let footer = $("#footer"); // Targets the footer
let timeLeft = $("#time-left"); // Time left span
let totalTime = 0; // Will hold all of the seconds including penalties
let timePenalized = 5; // Time deducted for wrong answers 
let secondsLeft = 60; // Starts the timer at 60 seconds
let questionNumber = 1; // Start with the first question
let correctAnswer; // Stores each correct answer
let userChoice; // Stores the user's clicked choice
let points = 0; // Start with 0 points
let initials; // Will save the user's initials

let questions =  { // Object that holds the questions and answers
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
        let writeQuestion = questions[questionNumber].Q; // Create a variable holding the question
        let h1 = $("<h1>"); // Create h1 element and store it in h1 variable
        h1.text(writeQuestion); // Fill h1 element with the question
        correctAnswer = questions[questionNumber].Correct; // Stores the correct answer 
    
        questions[questionNumber].Answers.forEach(function(each) { // Creates a button for each answer 
            let answerButton = $("<button>");
            answerButton.text(each);
            answerChoices.append(answerButton); // Adds each button after the question
        });
        mainPage.append(h1); // Adds the question to the HTML
        answerChoices.on("click", function(e) { // Listen for a click on the button
            $(this).off("click"); // Stops event from bubbling
            let target = e.target;
            userChoice = target.textContent; // Store the target choice in userChoice
            compareAnswers(userChoice, correctAnswer); // Calls the function to compare
        });
    } else {
        clearInterval(totalTime); // Stop the timer
        timeLeft.text("0"); // Set it back to zero
        finishedGame(points);
    }
};

function compareAnswers(userChoice, correctAnswer) { // This will compare each answer 
    questionNumber++; // Goes to the next question
    if (userChoice === correctAnswer) {
        let p = $("<p>"); 
        p.text("Correct!");
        answerChoices.append(p); // Show answer feedback 
        points++; // Add points if the answer is correct

    } else if (userChoice != correctAnswer) {
        let p = $("<p>"); 
        p.text("Wrong!");
        answerChoices.append(p); // Show answer feedback 
        secondsLeft -= timePenalized; // If the answer is wrong, 10 seconds will be taken from the timer
    }
    setTimeout(function (){ // Show next question after showing answer feedback for 1 second

    showQuestions();
      
      }, 1000); // Waits 1 second before showing next question
};

function finishedGame(points) {  // Asks the user to enter their initials to record their score in local storage
    mainPage.html("");
    answerChoices.html("");
    let resultsTitle = mainPage.html("<h1>RESULTS</h1>");
    resultsTitle.attr("class", "results-title"); // Added a class to style it
    let p = $("<p>");
    p.text(`You scored: ${points} points out of 7.`);
    let p2 = $("<p>");
    p2.text("Want to save your score? Enter your initials here: ");
    let input = $("<input>");
    input.attr("id", "input-text");
    let submitButton = $("<button>");
    submitButton.attr("id", "submitInitialsButton");
    submitButton.text("Submit");
    resultsTitle.append(p);
    resultsTitle.append(p2);
    resultsTitle.append(input);
    resultsTitle.append(submitButton);
    footer.html(""); // Clears the footer
    footer.html("<a href = 'index.html'>PLAY GAME AGAIN</a>"); // Gives the user a choice to play again

    submitButton.on("click", function() { // When the user clicks submit to submit their initials 
        initials = $("#input-text").val();
        if (initials === null) { // Validation for if nothing is typed in 
            console.log("Nothing was typed in.");
        } else {
            let scoreObject = { // Stores the initials and points into an object
                "initials": initials,
                "score": points
            }
        }
        let allScores = localStorage.getItem("allScores"); // Retrieves the scores from local storage 
        if (allScores === null) {
            allScores = [];

        } else {
            allScores = JSON.parse(allScores);

        }
        allScores.push(scoreObject);
        let newScore = JSON.stringify(allScores); // Stores the object as a string
        localStorage.setItem("allScores", newScore);
        window.location.replace("highScores.html"); // Replaces the screen with high scores page 
    })
};

startButton.on("click", startTimer); // starts timer when button is clicked 


$(document).ready(function(){ // Initializes side nav
    $('.sidenav').sidenav();
  });