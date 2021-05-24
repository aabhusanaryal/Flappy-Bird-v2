const GAME_WIDTH = 700;
const GAME_HEIGHT = 500;
const SKY_COLOR = "#71c5cf";
const PIPE_COLOR = "#049e14";
const BIRD_COLOR = "#d4c029";
const PIPE_WIDTH = 40;
const HOLE_HEIGHT = 110;
const FPS = 60;

const SPRITE_ACCELERATION = 1.4;
let timeElapsed = 1;
let spriteVelocity = SPRITE_ACCELERATION*timeElapsed;
let score = 0;

const PIPE_VELOCITY = 5;
const PIPE_SEPARATION = 270;

let pipe1X = 500;
let pipe2X = pipe1X + PIPE_SEPARATION;
let pipe3X = pipe2X + PIPE_SEPARATION;
let pipe4X = pipe3X + PIPE_SEPARATION;

let spriteX = 80;
let spriteY = GAME_HEIGHT/2;
let radius = 15;

let spacePressed;
let gameOn = true;

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
    ctx.beginPath();
    ctx.arc(spriteX, spriteY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = BIRD_COLOR;
    ctx.fill();

    // Scoreboard
    ctx.fillStyle = 'white';
    ctx.font = "30px Arial";
    ctx.fillText(Math.floor(score/15), canvas.width / 2, 50);
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
    spriteY += spriteVelocity;
    // Moves the sprite up for 150ms when space is pressed
    if(spacePressed){
        spriteY -= 9;
    }
}

function holeYGen() {
    let min = 50+HOLE_HEIGHT;
    let max = GAME_HEIGHT-50-HOLE_HEIGHT;
    // Gives a random number between 50 and GAME_HEIGHT-50
    random =  Math.floor(Math.random() * (max - min) + min);
    return random
}

const newGame = (evt) =>{
    if(evt.key == " "){
        score = 0;
        gameOn = true;
        pipe1X = 500;
        pipe2X = pipe1X + PIPE_SEPARATION;
        pipe3X = pipe2X + PIPE_SEPARATION;
        pipe4X = pipe3X + PIPE_SEPARATION;

        spriteX = 80;
        spriteY = GAME_HEIGHT/2;

        document.removeEventListener('keydown', newGame)
    }
}

const gameOver = () =>{
    gameOn = false;
    ctx.fillStyle = 'white';

    // GAME OVER text
    ctx.font = "80px Arial";
    ctx.textAlign = 'center';
    ctx.fillText("Game Over", canvas.width / 2, canvas.height/2);
    document.addEventListener('keydown', newGame);

    // PLAY AGAIN text
    ctx.font = "20px Arial";
    ctx.textAlign = 'center';
    ctx.fillText("Press spacebar to play again.", canvas.width / 2, canvas.height/2+50);
    document.addEventListener('keydown', newGame);
}
    


const collisionCheck = () => {
    if(spriteY <= 0 + radius || spriteY >= GAME_HEIGHT - radius){
        // If the sprite collides with top or bottom wall
        gameOver();
    }

    // Collision with Pipe 1
    if(spriteX >= pipe1X-radius  && spriteX <= pipe1X+PIPE_WIDTH+radius){
        if(spriteY+radius < hole1Y || spriteY-radius > hole1Y+HOLE_HEIGHT){
            gameOver();
        }
        else{
            score++;
        }
    }

    // Collision with Pipe 2
    if(spriteX >= pipe2X-radius  && spriteX <= pipe2X+PIPE_WIDTH+radius){
        if(spriteY+radius < hole2Y || spriteY-radius > hole2Y+HOLE_HEIGHT){
            gameOver();
        }
        else{
            score++;
        }
    }

    // Collision with Pipe 3
    if(spriteX >= pipe3X-radius  && spriteX <= pipe3X+PIPE_WIDTH+radius){
        if(spriteY+radius < hole3Y || spriteY-radius > hole3Y+HOLE_HEIGHT){
            gameOver();
        }
        else{
            score++;
        }
    }

    // Collision with Pipe 4
    if(spriteX >= pipe4X-radius  && spriteX <= pipe4X+PIPE_WIDTH+radius){
        if(spriteY+radius < hole4Y || spriteY-radius > hole4Y+HOLE_HEIGHT){
            gameOver();
        }
        else{
            score++;
        }
    }
    
}

const incrementElapsedTime = () => {
    // This increments the timeElapsed variable such that the velocity increases with time
    setInterval(()=>{
        timeElapsed += 0.1;
        spriteVelocity = SPRITE_ACCELERATION*timeElapsed;
    },1000/FPS)
}


const gameLoop = () =>{
    // Main Game Loop
    if(gameOn){
        moveEverything();
        drawEverything();
        collisionCheck();
    }
}



window.onload = () => {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    document.addEventListener('keydown', evt =>{
        // When space is pressed, this sets the value of spacePressed to be true for 150ms. So, the sprite will go up for 150ms
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
        // When space is pressed, this sets the value of spacePressed to be true for 150ms. So, the sprite will go up for 150ms
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