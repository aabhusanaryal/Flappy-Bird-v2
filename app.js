const GAME_WIDTH = 700;
const GAME_HEIGHT = 500;
const SKY_COLOR = "#74add6";
const PIPE_COLOR = "#529c5d";
const PIPE_WIDTH = 40;
const HOLE_HEIGHT = 100;
const FPS = 60;

const PIPE_VELOCITY = 5;
const PIPE_SEPARATION = 350;

let pipe1X = 500;
let pipe2X = pipe1X + PIPE_SEPARATION;
let pipe3X = pipe2X + PIPE_SEPARATION;
let pipe4X = pipe3X + PIPE_SEPARATION;

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
    }
    // Respawn pipe 3 after pipe 4 vanishes
    if(pipe4X <= 0 - PIPE_WIDTH){
        pipe3X = PIPE_SEPARATION*3;
        pipe4X = pipe3X + PIPE_SEPARATION;
    }
    
}

function holeYGen() {
    return (Math.random() * (GAME_HEIGHT - 60) + 60) // Gives a random number between 30 and GAME_HEIGHT-30
}

window.onload = () => {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    

    // Game Loop
    setInterval(()=>{
        // Main Game Loop
        drawEverything();
        moveEverything();
    }, 1000/FPS)
}