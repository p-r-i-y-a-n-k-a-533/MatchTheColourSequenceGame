var userClickedPattern = [];
var gamePattern = [];
var buttonColors=["red" , "blue" , "green" , "yellow"];
var level = 0;
var started = false;

///sound chahiye game start hote hi
function sound(l)
{  var audi = new Audio( "./sounds/" +l+ ".mp3" );
   audi.pause();
   audi.autoplay = true;
   audi.play();
}

///maine key press ki to start the game
$(document).keypress(function(){
   if(!started)
   { $("h1").text("level "+level);
     nextSequence();
     started = true;
   }
});

///random colour generate hoke show hua
function nextSequence()
{ userClickedPattern = [];
  level = level+1;
  $("h1").text("level "+level);
  var rn = Math.floor( Math.random()*4 ) ;
  var randomChosenColor = buttonColors[rn];
  sound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
}

///aage add hogi
function animatePress(currentColor)
{  $("."+currentColor).addClass("pressed");
   setTimeout( function(){
   $("."+currentColor).removeClass("pressed");},100);
}

///maine same colour press kiya to match it
$(".btn").on("click",function(event){
    var j = this.id;
    sound(j);
    animatePress(j);
    userClickedPattern.push(j);
    var last = userClickedPattern.length - 1
    checkAnswer(last)
  });

///check hua aur fir call hua
  function checkAnswer(currentLevel)
  {  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
      {  if(gamePattern.length === userClickedPattern.length)
         {  setTimeout( function(){ nextSequence(); } , 1000 );  }
      }
      else
      {  var galat = new Audio("./sounds/wrong.mp3");
         galat.play();
         $("body").addClass("game-over");
         setTimeout( function(){
          $("body").removeClass("game-over");
          } , 200 );
         $("h1").text("Game Over, Press Any Key to Restart");
         startOver();
      }

  }

  ///game restart
  function startOver()
  { level=0;
    gamePattern=[];
    started = false;
  }
