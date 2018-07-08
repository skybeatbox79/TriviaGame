// Variables
var count = 0;
var time = 61;
var selected = false;
var int;
var correct = 0;
var incorrect = 0;
var unanswered = 0;

// Arrays
var question = ["In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?", "Which of the following items was owned by the fewest U.S. homes in 1990?", "In 1990, in what percentage of U.S. married couples did the wife earn more money than the husband?", "Which of these characters turned 40 years old in 1990?", "What year was it that the Census Bureau first reported that a majority of new mothers  were remaining in the new job market?"];
var answer = ["John and Mary", "Compact Disk Player", "18", "Charlie Brown", "1988"];
var A = ["William and Elizabeth", "Home Computer", "8", "Charlie Brown", "1968"];
var B = ["Joseph and Catherine", "Compact Disk Player", "18", "Bugs and Bunny", "1978"];
var C = ["John and Mary", "Cordless Phone", "38", "Mickey Mouse", "1988"];
var D = ["George and Anne", "Dishwasher", "58", "Fred Flintstone", "1998"];

$(document).ready(function() {

// Show Function
    function showContents() {
        $("#question").show();
        $("#choice-1").show();
        $("#choice-2").show();
        $("#choice-3").show();
        $("#choice-4").show();
    }

// Hide FUnctions
    function hideContents() {
        $("#question").hide();
        $("#choice-1").hide();
        $("#choice-2").hide();
        $("#choice-3").hide();
        $("#choice-4").hide();
    }

    function hideResults() {
        $("#correct").hide();
        $("#incorrect").hide();
        $("#unanswered").hide();
        $("#restart").hide();
    }

// Display Function
    function displayQuestion() {
        hideResults();
        $("#answer").hide();
        $("#image").hide();
        $("#timer").show();
        showContents();
        $("#question").html(question[count]);
        $("#choice-1").html(A[count]);
        $("#choice-2").html(B[count]);
        $("#choice-3").html(C[count]);
        $("#choice-4").html(D[count]);
    }

    $("#choice-1").on("click", checkAnswer)
    $("#choice-2").on("click", checkAnswer)
    $("#choice-3").on("click", checkAnswer)
    $("#choice-4").on("click", checkAnswer)

// Check Answer Function
    function checkAnswer() {
        hideContents();
        if($(this).text() === answer[count]) {
            stopTimer();
            selected = true;
            $("#answer").show();
            $("#answer").html("Correct!");
            displayImage();
            correct++;
            count++;
        } else {
            stopTimer();
            selected = true;
            $("#answer").show();
            $("#answer").html("Nope! The Correct Answer was: " + answer[count]);
            displayImage();
            incorrect++;
            count++;
        }

        gameEnd();
    }

// Game End Function
    function gameEnd() {
        if(count === question.length) {
            $("#timer").hide();
            showResults();
            count = 0;
            $(".start-btn").show();
            $(".start-btn").on("click", function() {
                resetResults();
                startGame();
            });
        }
    }

    function resetTimer() {
        time = 61;
    }

    function displayTimer() {
        time--;
        $("#timer").html("Time Remaining: " + time);

            if(time <= 0) {
                hideContents();
                stopTimer();
                $("#answer").show();
                $("#answer").html("Out of Time! The correct answer was: " + answer[count]);
                displayImage();
                unanswered++;
                count++;
                gameEnd();
            }
    }

    function startTimer() {
        clearInterval(int);
        int = setInterval(displayTimer, 1000);
    }

    function stopTimer() {
        clearInterval(int);
        resetTimer();
        if(count < question.length -1) {
            setTimeout(startTimer, 2000);
            setTimeout(displayQuestion, 2000);
        }
    }

    resetTimer();

// Pop up images with Answer
    function displayImage() {
        if(count === 0) {
            $("#image").show();
            $("#image").html('<img src="assets/images/johnandmarry.jpg">');
        } else if (count === 1){
            $("#image").show();
            $("#image").html('<img src="assets/images/compactdiskplayer.jpg">');
        } else if (count === 2) {
            $("#image").show();
            $("#image").html('<img src="assets/images/18.png">');
        } else if (count === 3) {
            $("#image").show();
            $("#image").html('<img src="assets/images/charliebrown.jpg">');
        } else if (count === 4) {
            $("#image").show();
            $("#image").html('<img src="assets/images/1988.png">');
        }
    }

// Show Results Function
    function showResults() {
        $("#correct").show();
        $("#correct").html("Correct Answers: " + correct);
        $("#incorrect").show();
        $("#incorrect").html("Incorrect Answers: " + incorrect);
        $("#unanswered").show();
        $("#unanswered").html("Unanswered: " + unanswered);
        $("#restart").show();
        $("#restart").html("Start Over?");
    }

// Reset Results Function
    function resetResults() {
        correct = 0;
        incorrect = 0;
        unanswered = 0;
    }

// Game Start Function
    function gameStart() {
        $(".start-btn").hide();
        startTimer();
        displayQuestion();
    }

    $(".start-btn").on("click", function() {
        gameStart();
    });
});