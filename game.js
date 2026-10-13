const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let animationTime = 0;
let score = 0;
let highScore = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


// =====================================
// INITIALIZE CREATURES
// =====================================

createCreatures();


function gameLoop() {

    animationTime += 0.05;

    drawScene();

    requestAnimationFrame(gameLoop);

}

function drawScene(){

    drawGround();


    // =====================================
    // GAME LOGIC
    // =====================================

    if(!gameOver){

        checkEatFrog();

        updateCreatures();

        checkEatCreature();

    }


    // =====================================
    // DRAW WORLD
    // =====================================

    drawCreatures();

    drawFrog();

    drawSnake();


	// =====================================
	// GAME HUD
	// =====================================

	const hudX = 20;
	const hudY = 20;
	const hudWidth = 190;
	const hudHeight = 86;


	// =====================================
	// HUD PANEL
	// =====================================

	ctx.save();


	// Shadow

	ctx.fillStyle =
		"rgba(0, 0, 0, 0.12)";

	ctx.fillRect(
		hudX + 4,
		hudY + 5,
		hudWidth,
		hudHeight
	);


	// Main panel

	ctx.fillStyle =
		"rgba(7, 35, 42, 0.55)";

	ctx.fillRect(
		hudX,
		hudY,
		hudWidth,
		hudHeight
	);


	// Border

	ctx.strokeStyle =
		"rgba(145, 220, 220, 0.32)";

	ctx.lineWidth =
		1;

	ctx.strokeRect(
		hudX,
		hudY,
		hudWidth,
		hudHeight
	);


	// =====================================
	// ACCENT LINE
	// =====================================

	ctx.fillStyle =
		"#68b9bd";

	ctx.fillRect(
		hudX,
		hudY,
		4,
		hudHeight
	);


	// =====================================
	// SCORE LABEL
	// =====================================

	ctx.textAlign =
		"left";

	ctx.textBaseline =
		"middle";

	ctx.font =
		"bold 11px Arial";

	ctx.fillStyle =
		"rgba(190, 225, 225, 0.65)";

	ctx.fillText(
		"SCORE",
		hudX + 18,
		hudY + 27
	);


	// =====================================
	// SCORE VALUE
	// =====================================

	ctx.textAlign =
		"right";

	ctx.font =
		"bold 25px Arial";

	ctx.fillStyle =
		"#e7ffff";

	ctx.fillText(
		score,
		hudX + hudWidth - 16,
		hudY + 27
	);


	// =====================================
	// HIGH SCORE LABEL
	// =====================================

	ctx.textAlign =
		"left";

	ctx.font =
		"bold 9px Arial";

	ctx.fillStyle =
		"rgba(190, 225, 225, 0.45)";

	ctx.fillText(
		"HIGH SCORE",
		hudX + 18,
		hudY + 61
	);


	// =====================================
	// HIGH SCORE VALUE
	// =====================================

	ctx.textAlign =
		"right";

	ctx.font =
		"bold 16px Arial";

	ctx.fillStyle =
		"#a8d4d6";

	ctx.fillText(
		highScore,
		hudX + hudWidth - 16,
		hudY + 61
	);


	ctx.restore();


    // =====================================
    // GAME OVER
    // =====================================

    if(gameOver){

        ctx.fillStyle =
            "white";

        ctx.font =
            "60px Arial";

        ctx.textAlign =
            "center";


        ctx.fillText(
            "GAME OVER",
            canvas.width / 2,
            canvas.height / 2
        );


        ctx.font =
            "28px Arial";


        ctx.fillText(
            "Press R to Restart",
            canvas.width / 2,
            canvas.height / 2 + 50
        );

    }

}

function drawGround(){

    // =====================================
    // SEA WATER
    // =====================================

    ctx.fillStyle =
        "#176b78";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // =====================================
    // WATER MOVEMENT
    // =====================================

    const time =
        animationTime;


    ctx.strokeStyle =
        "rgba(125, 205, 205, 0.16)";

    ctx.lineWidth =
        1;


    // Horizontal water ripples

    for(
        let y = 20;
        y < canvas.height;
        y += 32
    ){

        ctx.beginPath();


        for(
            let x = -20;
            x < canvas.width + 20;
            x += 18
        ){

            const wave =
                Math.sin(
                    x * 0.035 +
                    time +
                    y * 0.08
                ) * 2.5;


            if(x === -20){

                ctx.moveTo(
                    x,
                    y + wave
                );

            }
            else{

                ctx.lineTo(
                    x,
                    y + wave
                );

            }

        }


        ctx.stroke();

    }


    // =====================================
    // SUBTLE SECOND WATER LAYER
    // =====================================

    ctx.strokeStyle =
        "rgba(180, 225, 220, 0.08)";


    for(
        let y = 8;
        y < canvas.height;
        y += 48
    ){

        ctx.beginPath();


        for(
            let x = -20;
            x < canvas.width + 20;
            x += 24
        ){

            const wave =
                Math.sin(
                    x * 0.025 -
                    time * 0.7 +
                    y * 0.05
                ) * 2;


            if(x === -20){

                ctx.moveTo(
                    x,
                    y + wave
                );

            }
            else{

                ctx.lineTo(
                    x,
                    y + wave
                );

            }

        }


        ctx.stroke();

    }


    // =====================================
    // MAP EDGE
    // =====================================

    ctx.strokeStyle =
        "#0c4b56";

    ctx.lineWidth =
        6;

    ctx.strokeRect(
        3,
        3,
        canvas.width - 6,
        canvas.height - 6
    );

}

function checkEatFrog(){

    let dx =
        headX -
        frog.x;

    let dy =
        headY -
        frog.y;

    let distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    if(distance < 25){

        // ---------------------------------
        // Remember score before eating frog
        // ---------------------------------

        const previousScore =
            score;


        // ---------------------------------
        // Eat frog
        // ---------------------------------

        moveFrog();


        // ---------------------------------
        // Check creature difficulty
        // ---------------------------------

        const previousCreatureGroup =
            Math.floor(
                previousScore / 50
            );

        const currentCreatureGroup =
            Math.floor(
                score / 50
            );


        // ---------------------------------
        // Add 2 creatures every 50 points
        // ---------------------------------

        if(
            currentCreatureGroup >
            previousCreatureGroup
        ){

            createCreatures();

        }

    }

}

gameLoop();
