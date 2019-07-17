// Selectors for DOM (2 lines)
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// *****************
// Global Variables
// *****************
// Create image's Global Variables as new Objects (5 lines)
var bg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var fg = new Image();
var bird = new Image();

// Load images sources (5 lines)
bg.src = "images/bg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
fg.src = "images/fg.png";
bird.src = "images/bird.png";

// Create sound's Global Variables as new Objects (2 lines)
var flapSound = new Audio();
var scoreSound = new Audio();

// Load sound sources (2 lines)
flapSound.src = "sounds/fly.mp3";
scoreSound.src = "sounds/score.mp3";

// ********************************
// Physics Constants & Environment
// ********************************
// Set Physics constants (6 lines)
var gap = 100;
var gravity = 1.5;
var birdX = 50;
var birdY = 125;
var score = 0;
var flap = 45;

// Create Pipe & Pipe Dimensional Properties (2 lines)
var pipe = [];
pipe[0] = {x:canvas.width, y:0};

// ***********************
// Character Manipulation
// ***********************
// Set - Bird flaps up on key press (1 line)
document.addEventListener("keydown", flapUp);

// Create Function - Bird flaps up on key press (3 lines)
function flapUp () {
  birdY -= flap;
  flapSound.play();
}

// *******************
// Gameplay Functions
// *******************
// Create Function - Draw Animation/Game
function draw () {
  // Create environment w/ background
  context.drawImage(bg,0,0);

  // Create Pipe array
  for (var i = 0; i < pipe.length; i++) {
    // Draw image of Pipes w/ north/south gap
    context.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    context.drawImage(pipeSouth, pipe[i].x, pipe[i].y + pipeNorth.height + gap);
    pipe[i].x--;

    // Set space b/t Pipes & random Y position
    if (pipe[i].x == 100) {
      pipe.push({
        x:canvas.width, y:Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }

    // Bird death operations
    if (
        // Bird hits front of pipe
        birdX + bird.width >= pipe[i].x
        // Bird hits pipe on X-axis
        && birdX <= pipe[i].x + pipeNorth.width
        // Bird hits bottom of pipeNorth OR top of pipeSouth
        && (birdY <= pipe[i].y + pipeNorth.height || birdY + bird.height >= pipe[i].y + pipeNorth.height + gap)
        // Bird hits ground
        || birdY + bird.height >= canvas.height - fg.height
        ) {
          location.reload();
    }

    // Add 1 point to score when passing Pipes
    if (pipe[i].x == 20) {
      score += 1;
      scoreSound.play();
    }
  }

  // Draw foreground
  context.drawImage(fg, 0, canvas.height - fg.height);

  // Draw bird
  context.drawImage(bird, birdX, birdY);

  // Create Gravity's effects
  birdY += gravity;

  // Set Context font and style parameters
  context.fillStyle = "#fff";
  context.font = "20px Verdana";
  context.fillText("Score: " + score, 10, canvas.height - 20);

  // Draw animation (update animation on screen)
  requestAnimationFrame(draw);
}

// Call draw function
draw();
