
//Colors
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gamestart = false;

var level = 0;

$(document).keypress(function(){
    if(!gamestart) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gamestart = true;
    }
});

//when clicked
$(".btn").click(function() {
    if(gamestart) {
        var userChosenColour = $(this).attr("id");

        userClickedPattern.push(userChosenColour);

        console.log(userClickedPattern);

        animatePress(userChosenColour);

        playSound(userChosenColour);

        checkAnswer(userClickedPattern.length-1);
    }
});

// Pogleda odgovor
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("success");
        if(gamePattern.length == userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence() {
    //empty userClickedPattern
    userClickedPattern = [];
    //next level
    level++;
    $("#level-title").text("Level " + level);
    //random number
    var randomNumber = Math.floor((Math.random() * 4));
    //ramdom color
    var randomChosenColour = buttonColours[randomNumber];
    //add color to gamePattern array
    gamePattern.push(randomChosenColour);

    animatePress(randomChosenColour);

    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass( "pressed" );

    setTimeout(function(){
        $("#" + currentColour).removeClass( "pressed" );
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    gamestart = false;
}