var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var startToggle=true;

function nextSequence(){

    userClickedPattern=[];
    $("h1").html("Level "+level);
    level=level+1;

    randomNumber=Math.floor(Math.random()*4);
    randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound("sounds/"+randomChosenColour+".mp3")

}

function playSound(sound){
    var audio = new Audio(sound);
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(level){
    if(gamePattern[level]==userClickedPattern[level])
    {
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(function(){
             nextSequence();
            },1000);
        }    

    }
    else
    {
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
       
        $("h1").html("Game Over, Press Any Key to Restart");
       
        startOver();
    }
}

function startOver(){
    gamePattern=[];
    userClickedPattern=[];
    level=0;
    startToggle=true;
}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound("sounds/"+userChosenColour+".mp3");

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function(){
    if(startToggle==true){
        nextSequence();
        startToggle=false;
    }
});