let frog = {
    x: 200,
    y: 200,
    radius: 18
};

function moveFrog() {

    frog.x = Math.random() * (canvas.width - 100) + 50;
    frog.y = Math.random() * (canvas.height - 100) + 50;

    snakeShouldGrow = true;

    score++;

    if (score > highScore) {
        highScore = score;
    }

}

function drawFrog() {

    // Body
    ctx.fillStyle = "#3dbb3d";

    ctx.beginPath();
    ctx.arc(frog.x, frog.y, frog.radius, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(frog.x - 6, frog.y - 8, 4, 0, Math.PI * 2);
    ctx.arc(frog.x + 6, frog.y - 8, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.arc(frog.x - 6, frog.y - 8, 2, 0, Math.PI * 2);
    ctx.arc(frog.x + 6, frog.y - 8, 2, 0, Math.PI * 2);
    ctx.fill();

}
