var x = 100;
var y = 100;
maxX = 1200;
minX = 100;
maxY = 600;
minY = 50;
var cvs;
var ctx;
var ball = {
    x: 100,
    y: 200,
    r: 10,
    dx: 7,
    dy: 5
}
var bat = [];
bat[0] = {
    x: 0,
    y: 300,
    width: 10,
    height: 150
};

bat[1] = {
    x: window.innerWidth - 10,
    y: 300,
    width: 10,
    height: 150,
    dy: 60
}
myScore = 0;
compScore = 0;
compTurn = true;
gameOver = false;

function init() {
    cvs = document.querySelector("canvas");
    ctx = cvs.getContext("2d")
    ctx.font = '48px serif';
    ctx.fillText(myScore, 300, 100);
    ctx.fillText(compScore, 900, 100);

    cvs.fillStyle = "black";
    cvs.width = window.innerWidth
    cvs.height = window.innerHeight

    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.moveTo(window.innerWidth / 2, 0);
    ctx.lineTo(window.innerWidth / 2, window.innerHeight);
    ctx.stroke();

    ball.x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    ball.y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI, false); //ball
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "white";
    bat[0].y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    bat[1].y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    ctx.fillRect(bat[0].x, bat[0].y, bat[0].width, bat[0].height) //bat1

    ctx.fillRect(bat[1].x, bat[1].y, bat[1].width, bat[1].height) //bat2

    cvs.addEventListener("mousemove", function(e) {
        bat[0].y = e.offsetY

    })
    cvs.addEventListener("click", function(e) {
        if (compScore == 3 || myScore == 3)
            console.log("in click")
        gameOver = true;


    })
}


function animate() {

    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, (window.innerWidth), (window.innerHeight));
    console.log("in animate")
    if (gameOver == true) {

        compScore = 0;
        myScore = 0;
        gameOver = false;
    } else if (myScore == 3) {
        ctx.font = '70px monospace';
        ctx.textAlign = "center"
        ctx.fillText("You Won", window.innerWidth / 2, 400);

        ctx.font = '30px monospace';
        ctx.textAlign = "center"
        ctx.fillText("Click to continue", window.innerWidth / 2, 550);
    } else if (compScore == 3) {
        ctx.font = '70px monospace';
        ctx.textAlign = "center"
        ctx.fillText("Computer Won", window.innerWidth / 2, 400);

        ctx.font = '30px monospace';
        ctx.textAlign = "center"
        ctx.fillText("Click to continue", window.innerWidth / 2, 550);

    } else {
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.moveTo(window.innerWidth / 2, 0);
        ctx.lineTo(window.innerWidth / 2, window.innerHeight);
        ctx.stroke();


        ctx.font = '150px monospace';
        ctx.fillText(myScore, window.innerWidth / 4, 200);
        ctx.fillText(compScore, window.innerWidth * 0.75, 200);

        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI, false);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(bat[0].x, bat[0].y, bat[0].width, bat[0].height)


        ctx.fillRect(bat[1].x, bat[1].y, bat[1].width, bat[1].height)
        ball.x = ball.x + ball.dx;

        ball.y = ball.y + ball.dy;

        if (ball.x - ball.r <= bat[0].width && ball.y >= bat[0].y && ball.y <= bat[0].y + bat[0].height || bat[1].x <= ball.x + ball.r && ball.y >= bat[1].y && ball.y <= bat[1].y + bat[1].height) { ball.dx = -ball.dx; }
        if (ball.y + ball.r >= window.innerHeight || ball.y - ball.r < 0) { ball.dy = -ball.dy; }

        if (ball.y > bat[1].y + bat[1].height / 2 && compTurn == true)
            bat[1].y += bat[1].dy;
        if (ball.y < bat[1].y + bat[1].height / 2 && compTurn == true)
            bat[1].y -= bat[1].dy;

        if (ball.x - ball.r <= bat[0].width) {
            compTurn = true;
            console.log("no compturn")

        }
        if (bat[1].x <= ball.x + ball.r) {
            console.log(" compturn")
            compTurn = false;
        }
        if (ball.x > window.innerWidth || ball.x < 0) {
            ball.x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            ball.y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
            ball.dx = -ball.dx
            compTurn = true;

            ball.x > window.innerWidth ? myScore++ : compScore++
        }
    }



}


animate()