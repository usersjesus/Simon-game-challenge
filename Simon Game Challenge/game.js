let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

$(".btn").click(function() {

    if (started) {
        let userChosenColor = this.id;
        if (userChosenColor) {
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animate(userChosenColor, "pressed");
        checkAnswer(userClickedPattern.length - 1);
        }
    }
});

$(document).keydown(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});

function nextSequence() {

    userClickedPattern.length = 0;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(140).fadeIn(140);
    playSound(randomChosenColor);
    $("#level-title").text(`Level ${level}`);
    level += 1;
  }

function playSound(name) {

  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animate(id, styleName) {

  let element = $("#" + id);
  element.addClass(styleName);
  setTimeout(function() {
    element.removeClass(styleName);
  }, 100);
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
              }, 1000);
        }
    } else {

        playSound("wrong");
        animate("body", "game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}

function startOver() {

        gamePattern.length = 0;
        level = 0;
        started = false;
}