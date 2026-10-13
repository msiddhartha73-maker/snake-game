// ===============================
// Python Hunter - Snake System
// ===============================

let snake = [];

const START_LENGTH = 18;
const SEGMENT_SIZE = 16;
const SPEED = 3;

let direction = {
    x: 1,
    y: 0
};

let headX = 0;
let headY = 0;

let snakeShouldGrow = false;
let gameOver = false;

let wave = 0;

// ------------------------

function createSnake(){

    snake=[];

    for(let i=0;i<START_LENGTH;i++){

        snake.push({

            x:300-i*SEGMENT_SIZE,

            y:300

        });

    }

    headX=snake[0].x;
    headY=snake[0].y;

}

createSnake();

// ------------------------

document.addEventListener("keydown",function(e){

    if(e.key==="ArrowUp"){
        direction={x:0,y:-1};
    }

    if(e.key==="ArrowDown"){
        direction={x:0,y:1};
    }

    if(e.key==="ArrowLeft"){
        direction={x:-1,y:0};
    }

    if(e.key==="ArrowRight"){
        direction={x:1,y:0};
    }


    // =====================================
    // RESTART GAME
    // =====================================

    if(
        e.key==="r" ||
        e.key==="R"
    ){

        restartGame();

    }

});

// ------------------------

function moveSnake(){

    if(gameOver) return;


    // =====================================
    // MOVE HEAD
    // =====================================

    headX +=
        direction.x *
        SPEED;

    headY +=
        direction.y *
        SPEED;


    // =====================================
    // MAP BOUNDARY
    // =====================================

    const boundary =
        14;


    if(
        headX < boundary ||
        headX >
            canvas.width -
            boundary ||
        headY < boundary ||
        headY >
            canvas.height -
            boundary
    ){

        gameOver = true;

        return;

    }


    // =====================================
    // ADD NEW HEAD
    // =====================================

    snake.unshift({

        x: headX,

        y: headY

    });


    // =====================================
    // REMOVE TAIL
    // =====================================

    if(!snakeShouldGrow){

        snake.pop();

    }
    else{

        snakeShouldGrow = false;

    }


    // =====================================
    // COLLISION
    // =====================================

    checkCollision();

}

// ------------------------

function drawSnake(){

    moveSnake();

    wave+=0.20;

    for(let i=snake.length-1;i>0;i--){

        let part=snake[i];

        let angle=Math.atan2(direction.y,direction.x);

        let px=part.x+Math.cos(angle+Math.PI/2)*Math.sin(wave+i*0.45)*3;

        let py=part.y+Math.sin(angle+Math.PI/2)*Math.sin(wave+i*0.45)*3;

        let radius=4+(i/snake.length)*5;

        ctx.beginPath();

        ctx.fillStyle="#567d2d";

        ctx.arc(

            px,
            py,
            radius,
            0,
            Math.PI*2

        );

        ctx.fill();

    }

    // Head

    let angle=Math.atan2(direction.y,direction.x);

    ctx.save();

    ctx.translate(

        snake[0].x,

        snake[0].y

    );

    ctx.rotate(angle);

    ctx.fillStyle="#6f9740";

    ctx.beginPath();

    ctx.ellipse(

        0,
        0,
        14,
        10,
        0,
        0,
        Math.PI*2

    );

    ctx.fill();

    // Eyes

    ctx.fillStyle="white";

    ctx.beginPath();

    ctx.arc(5,-4,2.5,0,Math.PI*2);

    ctx.arc(5,4,2.5,0,Math.PI*2);

    ctx.fill();

    // Pupils

    ctx.fillStyle="black";

    ctx.beginPath();

    ctx.arc(6,-4,1,0,Math.PI*2);

    ctx.arc(6,4,1,0,Math.PI*2);

    ctx.fill();

    ctx.restore();

}

// ------------------------

function checkCollision(){

    for(let i=6;i<snake.length;i++){

        let dx=snake[0].x-snake[i].x;
        let dy=snake[0].y-snake[i].y;

        let distance=Math.sqrt(dx*dx+dy*dy);

        if(distance<SEGMENT_SIZE/2){

            gameOver=true;

        }

    }

}

// =====================================
// RESTART GAME
// =====================================

function restartGame(){

    gameOver = false;

    score = 0;

    snakeShouldGrow = false;

    direction = {
        x: 1,
        y: 0
    };


    createSnake();


    // Reset frog

    frog.x =
        Math.random() *
        (canvas.width - 100) +
        50;

    frog.y =
        Math.random() *
        (canvas.height - 100) +
        50;


    // Reset creatures

    createCreatures();

}
