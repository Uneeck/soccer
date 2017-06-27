var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var hitSound = new Audio('audio/hit.mp3');
var goalSound = new Audio('audio/goal.mp3');
var pilka_img = document.getElementById("ball");
var p1_img = document.getElementById("p1");
var p2_img = document.getElementById("p2");
var x = canvas.width/2+500;
var y = canvas.height/2;
var x1 = canvas.width/2-500;
var y1 = canvas.height/2;
var x2 = canvas.width/2;
var y2 = canvas.height/2;
var dy = 1*dirChange();
var dx = 1*dirChange();
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var wPressed = false;
var sPressed = false;
var aPressed = false;
var dPressed = false;
var p1score = 0;
var p2score = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    } else if(e.keyCode == 38) {
        upPressed = true;
    } 
    else if(e.keyCode == 40) {
        downPressed = true;
    } else if(e.keyCode == 32) {
        downPressed = true;
    } else if(e.keyCode == 87) {
        wPressed = true;
    } else if(e.keyCode == 83) {
        sPressed = true;
    } else if(e.keyCode == 65) {
        aPressed = true;
    } else if(e.keyCode == 68) {
        dPressed = true;
    }  
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }else if(e.keyCode == 38) {
        upPressed = false;
    } 
    else if(e.keyCode == 40) {
        downPressed = false;
    } else if(e.keyCode == 32) {
        downPressed = false;
    } else if(e.keyCode == 87) {
        wPressed = false;
    } else if(e.keyCode == 83) {
        sPressed = false;
    } else if(e.keyCode == 65) {
        aPressed = false;
    } else if(e.keyCode == 68) {
        dPressed = false;
    } 
}


function player1score(){
	ctx.font = "bold 34px Sans-Serif";
	ctx.fillStyle = "rgba(0,0,0,0.3)";
	ctx.fillText(p1score, 50,50);
}

function player2score(){
	ctx.font = "bold 34px Sans-Serif";
	ctx.fillStyle = "rgba(0,0,0,0.3)";
	ctx.fillText(p2score, canvas.width-50,50);
}


function playSound(soundName) {
    soundName.volume = 0.2;
    (soundName).play();
}


function player1() {
    ctx.drawImage(p1_img, x, y, 40,35);
}

function player2() {
    ctx.drawImage(p2_img, x1, y1, 40,35);
}

function drawBall() {
    ctx.drawImage(pilka_img, x2, y2, 22,22);
}

function linia(){
    ctx.beginPath();
	ctx.moveTo(600, 0);
	ctx.lineTo(600, 600);
	ctx.stroke();
}

function bramka1() {
    ctx.rect(1,200,18,200);
    ctx.stroke();

}

function bramka2() {
    ctx.rect(1181,200,18,200);
    ctx.stroke();
}


function pole() { 
    ctx.beginPath();
    ctx.arc(600, 300, 50, 0, Math.PI*2);
    ctx.stroke();
    ctx.strokeStyle = "#000";
    ctx.closePath();
}

function scoreCheck(){
	if (p1score == 1){
		ctx.font = "40px KulminoituvaRegular";
		ctx.fillText("PLAYER 1 WINS!", canvas.width/2,canvas.height/2);

	} else if (p2score == 1){
		ctx.font = "40px KulminoituvaRegular";
		ctx.fillText("PLAYER 2 WINS!", 100,canvas.height/2);
	}
}

function player2move(){
    if(dPressed) {
        x1 += 2;
    }
    if(aPressed) {
        x1 -= 2;
    }
    if(wPressed) {
        y1 -= 2;
    }
if(sPressed) {
        y1 += 2;
    }
}

function player1move(){
    if(rightPressed) {
        x += 2;
    }
    if(leftPressed) {
        x -= 2;
    }
    if(upPressed) {
        y -= 2;
    }
if(downPressed) {
        y += 2;
    }
}

function dirChange(){
    var num = Math.floor(Math.random()*2);
    var dir;
    if (num == 0){
        dir = -1;
    } else {
        dir = 1;
    }
    return dir;
}

function ballCollision(){
	//warunek dla koła
    var roznicaX = x - x2;
    var roznicaY = y - y2;
    var distance = Math.sqrt(roznicaX*roznicaX + roznicaY*roznicaY);
    var roznicaX1 = x1 - x2;
    var roznicaY1 = y1 - y2;
    var distance1 = Math.sqrt(roznicaX1*roznicaX1 + roznicaY1*roznicaY1);

    if(distance < 25){
        if (dx < 0){
            dx = Math.random()*2;
            playSound(hitSound);
        } else {
            dx = -Math.random()*2;
        }
        if (dy < 0){
            dy = Math.random()*2;
            playSound(hitSound);
        } else {
            dy = -Math.random()*2;
        }
    }

    if(distance1 < 25){
        if (dx < 0){
            dx = Math.random()*2;
            playSound(hitSound);
        } else {
            dx = -Math.random()*2;
        }
        if (dy < 0){
            dy = Math.random()*2;
            playSound(hitSound);
        } else {
            dy = -Math.random()*2;
        }
    }
}

function wallCollision() {
    if (y2 > canvas.height - 22 || y2 < 0){
        dy = -dy;
    }
    if (x2 > canvas.width - 22){
        dx = -dx;    
    } else if (x2 < 0){
        dx = -dx;
    }
}

function gol() {
    if (x2 < 1 && y2 > 200 && y2 < 400 ){
		p2score++;
    	playSound(goalSound);
        restart();
    }

    if (x2 > 1178 && y2 > 200 && y2 < 400 ){
    	p1score++;
    	playSound(goalSound);
        restart();
    }
}

function playerOutPrevent(){
	if (x1 < -2){
		x1 = -2;
	} else if (y1 < 0){
		y1 = 0;
	} else if (y1 > 566){
		y1 = 566;
	} else if (x1 > 1178){
		x1 = 1178;
	}

	if (x < 0){
		x = 0;
	} else if (y < 0){
		y = 0;
	} else if (y > 566){
		y = 566;
	} else if (x > 1166){
		x = 1166;
	}
}

function endGame(){
    dx = 0;
    dy = 0;
    setTimeout(restart, 1000);
}

function restart(){
	x = canvas.width/2+500;
	y = canvas.height/2;
	x1 = canvas.width/2-500;
	y1 = canvas.height/2;
	x2 = canvas.width/2;
	y2 = canvas.height/2;
	dy = Math.random()*2*dirChange();
	dx = Math.random()*2*dirChange();
}


function moveBall(){
    x2 += dx;
    y2 += dy;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bramka1();
    bramka2();
    gol();
    linia();
    pole();
    drawBall();
    player1();
    player2();
    player2move();
    player1move();
    ballCollision();
    wallCollision();
    moveBall();
  	player1score();
  	player2score();
    playerOutPrevent();
}

setInterval(draw, 0);