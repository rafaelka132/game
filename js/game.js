var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var nasty = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

nasty.src = "img/nasty.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";


var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3"

var gap = 120;

document.addEventListener("keydown", moveUp);

function moveUp() {
	yPos -=25;
	fly.play();
}

var pipe = [];

pipe[0] = {
	x : cvs.width,
	y : 0
}

var xPos = 10;
var yPos = 150;
grav = 1.5;

var score = 0;

function draw(){
	ctx.drawImage(bg, 0, 0);

	for(var i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipeUp.height + pipe[i].y + gap);

		pipe[i].x--;

		if(pipe[i].x == 125) {
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			});
		}

		if(xPos + nasty.width >= pipe[i].x
			&& xPos <= pipe[i].x + pipeUp.width
			&& (yPos <= pipe[i].y + pipeUp.height
				|| yPos + nasty.height >= pipe[i].y + pipeUp.height +
				 gap) || yPos + nasty.height >= cvs.height - fg.height+40) {
			location.reload();
		}

		if(pipe[i].x == 5) {
			score++;
			score_audio.play();
		}
	}

	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(nasty, xPos, yPos);

	ctx.fillStyle = "#000";
	ctx.font = "24px verdana";
	ctx.fillText("Счет: "+ score, 10, cvs.height-20)


	yPos += grav;
	requestAnimationFrame(draw);

}

pipeBottom.onload = draw;