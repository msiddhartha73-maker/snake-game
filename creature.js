// ===============================
// Python Hunter - Creature System
// ===============================

let creatures = [];

const CREATURE_COUNT = 5;
const CREATURE_INCREASE = 2;
const CREATURE_SCORE_INTERVAL = 50;
const CREATURE_RADIUS = 10;
const CREATURE_SPEED = 0.7;


// =====================================
// CREATE CREATURES
// =====================================

function createCreatures(){

    creatures = [];


    // =====================================
    // CALCULATE CREATURE COUNT
    // =====================================

    const extraCreatureGroups =
        Math.floor(
            score /
            CREATURE_SCORE_INTERVAL
        );


    const creatureCount =
        CREATURE_COUNT +
        (
            extraCreatureGroups *
            CREATURE_INCREASE
        );


    // =====================================
    // CREATE CREATURES
    // =====================================

    for(
        let i = 0;
        i < creatureCount;
        i++
    ){

        let creature = {

            x: 0,

            y: 0,

            directionX: 0,

            directionY: 0,

            speed:
                CREATURE_SPEED +
                Math.random() * 0.4,

            changeTimer:
                Math.random() * 120,

            radius:
                CREATURE_RADIUS

        };


        placeCreature(creature);

        creatures.push(creature);

    }

}


// =====================================
// PLACE CREATURE
// =====================================

function placeCreature(creature){

    const margin = 40;

    creature.x =
        margin +
        Math.random() *
        Math.max(
            1,
            canvas.width -
            margin * 2
        );

    creature.y =
        margin +
        Math.random() *
        Math.max(
            1,
            canvas.height -
            margin * 2
        );

    chooseCreatureDirection(creature);

}


// =====================================
// CHOOSE RANDOM DIRECTION
// =====================================

function chooseCreatureDirection(creature){

    const angle =
        Math.random() *
        Math.PI * 2;

    creature.directionX =
        Math.cos(angle);

    creature.directionY =
        Math.sin(angle);

}


// =====================================
// UPDATE CREATURES
// =====================================

function updateCreatures(){

    for(let creature of creatures){

        creature.changeTimer--;

        if(creature.changeTimer <= 0){

            chooseCreatureDirection(
                creature
            );

            creature.changeTimer =
                60 +
                Math.random() * 120;

        }


        creature.x +=
            creature.directionX *
            creature.speed;

        creature.y +=
            creature.directionY *
            creature.speed;


        // ---------------------------------
        // Keep creature inside the map
        // ---------------------------------

        const margin =
            creature.radius;


        if(
            creature.x <
            margin
        ){

            creature.x =
                margin;

            creature.directionX =
                Math.abs(
                    creature.directionX
                );

        }


        if(
            creature.x >
            canvas.width -
            margin
        ){

            creature.x =
                canvas.width -
                margin;

            creature.directionX =
                -Math.abs(
                    creature.directionX
                );

        }


        if(
            creature.y <
            margin
        ){

            creature.y =
                margin;

            creature.directionY =
                Math.abs(
                    creature.directionY
                );

        }


        if(
            creature.y >
            canvas.height -
            margin
        ){

            creature.y =
                canvas.height -
                margin;

            creature.directionY =
                -Math.abs(
                    creature.directionY
                );

        }

    }

}


// =====================================
// DRAW CREATURES
// =====================================

function drawCreatures(){

    for(let creature of creatures){

        ctx.save();

        ctx.translate(
            creature.x,
            creature.y
        );


        // ---------------------------------
        // Body
        // ---------------------------------

        ctx.fillStyle =
            "#9b6b32";

        ctx.beginPath();

        ctx.arc(
            0,
            0,
            creature.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();


        // ---------------------------------
        // Small eyes
        // ---------------------------------

        ctx.fillStyle =
            "#d9d9c7";

        ctx.beginPath();

        ctx.arc(
            -3,
            -2,
            1.5,
            0,
            Math.PI * 2
        );

        ctx.arc(
            3,
            -2,
            1.5,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.restore();

    }

}


// =====================================
// CREATURE COLLISION
// =====================================

function checkEatCreature(){

    for(let creature of creatures){

        const dx =
            headX -
            creature.x;

        const dy =
            headY -
            creature.y;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if(
            distance <
            SEGMENT_SIZE / 2 +
            creature.radius
        ){

            gameOver = true;

            return;

        }

    }

}



