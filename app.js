const GAME_WIDTH = 700;
const GAME_HEIGHT = 500;
const SKY_COLOR = "#74add6";
const PIPE_COLOR = "#529c5d";
const PIPE_WIDTH = 40;
const HOLE_HEIGHT = 110;
const FPS = 60;

const BALL_ACCELERATION = 1.5;
let timeElapsed = 1;
let ballVelocity = BALL_ACCELERATION*timeElapsed;

const PIPE_VELOCITY = 5;
const PIPE_SEPARATION = 350;

let pipe1X = 500;
let pipe2X = pipe1X + PIPE_SEPARATION;
let pipe3X = pipe2X + PIPE_SEPARATION;
let pipe4X = pipe3X + PIPE_SEPARATION;

let birdY = GAME_HEIGHT/2;

let spacePressed;

let hole1Y, hole2Y, hole3Y, hole4Y;
hole1Y = holeYGen();
hole2Y = holeYGen();
hole3Y = holeYGen();
hole4Y = holeYGen();

let canvas, ctx;

const drawEverything = () =>{
    // Canvas and Sky Settings
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    ctx.fillStyle = SKY_COLOR;
    ctx.fillRect(0, 0, GAME_WIDTH,GAME_HEIGHT);

    // Making Pipes
    
    // Pipe 1
    ctx.fillStyle = PIPE_COLOR;
    ctx.fillRect(pipe1X, 0, PIPE_WIDTH, GAME_HEIGHT); // Main pipe
    ctx.fillStyle = SKY_COLOR;
    ctx.fillRect(pipe1X, hole1Y, PIPE_WIDTH, HOLE_HEIGHT); // Pipe1's hole

    // Pipe 2
    ctx.fillStyle = PIPE_COLOR;
    ctx.fillRect(pipe2X, 0, PIPE_WIDTH, GAME_HEIGHT); // Main pipe
    ctx.fillStyle = SKY_COLOR;
    ctx.fillRect(pipe2X, hole2Y, PIPE_WIDTH, HOLE_HEIGHT); // Pipe2's hole

    // Pipe 3
    ctx.fillStyle = PIPE_COLOR;
    ctx.fillRect(pipe3X, 0, PIPE_WIDTH, GAME_HEIGHT); // Main pipe
    ctx.fillStyle = SKY_COLOR;
    ctx.fillRect(pipe3X, hole3Y, PIPE_WIDTH, HOLE_HEIGHT); // Pipe3's hole

    // Pipe 4
    ctx.fillStyle = PIPE_COLOR;
    ctx.fillRect(pipe4X, 0, PIPE_WIDTH, GAME_HEIGHT); // Main pipe
    ctx.fillStyle = SKY_COLOR;
    ctx.fillRect(pipe4X, hole4Y, PIPE_WIDTH, HOLE_HEIGHT); // Pipe4's hole

    // Making main character
    ctx.fillStyle = "yellow";
    ctx.fillRect(80, birdY, 30, 30)
}

const moveEverything = () => {
    //Moves pipe to the left
    pipe1X -= PIPE_VELOCITY;
    pipe2X -= PIPE_VELOCITY;
    pipe3X -= PIPE_VELOCITY;
    pipe4X -= PIPE_VELOCITY;
    // Respawn pipe 1 after pipe 2 vanishes
    if (pipe2X <= 0 - PIPE_WIDTH){
        pipe1X = PIPE_SEPARATION*3;
        pipe2X = pipe1X + PIPE_SEPARATION;
        hole1Y = holeYGen();
        hole2Y = holeYGen();
    }
    // Respawn pipe 3 after pipe 4 vanishes
    if(pipe4X <= 0 - PIPE_WIDTH){
        pipe3X = PIPE_SEPARATION*3;
        pipe4X = pipe3X + PIPE_SEPARATION;
        hole3Y = holeYGen();
        hole4Y = holeYGen();
    }
    // Adding gravity
    birdY += ballVelocity;
    // Moves the bird up for 150ms when space is pressed
    if(spacePressed){
        birdY -= 9;
    }
}

function holeYGen() {
    let min = 100+HOLE_HEIGHT;
    let max = GAME_HEIGHT-100-HOLE_HEIGHT;
    // Gives a random number between 100 and GAME_HEIGHT-100
    random =  Math.floor(Math.random() * (max - min) + min);
    return random
}

const incrementElapsedTime = () => {
    // This increments the timeElapsed variable such that the velocity increases with time
    setInterval(()=>{
        timeElapsed += 0.1;
        ballVelocity = BALL_ACCELERATION*timeElapsed;
    },1000/FPS)
}


const gameLoop = () =>{
    // Main Game Loop
    moveEverything();
    drawEverything();
}



window.onload = () => {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    document.addEventListener('keydown', evt =>{
        // When space is pressed, this sets the value of spacePressed to be true for 150ms. So, the bird will go up for 150ms
        if(evt.key == " "){
            spacePressed = true;
            setTimeout(()=>{
                spacePressed = false;
            }, 150)
            // Reset elapsed time
            timeElapsed = 1;
        }
    })

    document.addEventListener('click', evt =>{
        // When space is pressed, this sets the value of spacePressed to be true for 150ms. So, the bird will go up for 150ms
            spacePressed = true;
            setTimeout(()=>{
                spacePressed = false;
            }, 150)
            // Reset elapsed time
            timeElapsed = 1;
        
    })
    
    incrementElapsedTime();
    // Game Loop
    setInterval(gameLoop, 1000/FPS)
}