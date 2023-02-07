var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor;
var isGameStarted = false;
var level = 0;
var success = false;

function nextSequence() { 
    // generate random game pattern
    userClickedPattern = [];
    isGameStarted = true;
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("h1").text(`Level ${level}`);
    //animation
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    level = level + 1;
    playSound(randomChosenColor);

}

//Initial start
$(document).on("keydown", function () {
    if(!isGameStarted) {
        nextSequence();
    }
});

//play sound of color
function playSound(color){
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

//add effect of user press
function animatePress(color){
    $(`.${color}`).addClass("pressed");
    setTimeout(() => {
        $(`.${color}`).removeClass("pressed");
    }, 100);
}

// user pattern
$(".btn").on("click", function (e) {
    var userChosenColor = e.target.id;
    playSound(userChosenColor);

    animatePress(userChosenColor);

    userClickedPattern.push(userChosenColor);

    // check users pattern with games pattern
    checkAnswer(userClickedPattern.length - 1);
    // console.log(`user pattern: ${userClickedPattern}`);
})

// reset values for game restart
function restartGame(){
    gamePattern = [];
    level = 0;
    isGameStarted = false;
    $(document).on("keydown", function () {
        if(!isGameStarted) {
            nextSequence();
        }
    });
}

function checkAnswer(currentLevel){
    
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        success = true;
        console.log("success");
    }else{
        success = false;
        console.log("failure");
    }

    //failure leads to game over
    if(!success){
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart")
        playSound("wrong");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        //restart
        restartGame();
    }

    //transition to next level after 1sec delay
    setTimeout(function() {
        if(success && currentLevel + 1 === gamePattern.length) {
            nextSequence();
        }
    }, 1000);
}


