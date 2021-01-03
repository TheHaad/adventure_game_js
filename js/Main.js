
var canvas, canvasContext;

var warrior = new warriorClass();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	colorText('LOADING', canvas.width/2, canvas.height/2);
	
	loadImages();
}

function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond)

	setupInput();
	loadLevel(levelOne);
}

function loadLevel(whichLevel) {
	levelGrid = whichLevel.slice();
	warrior.reset(warriorPic, "Blue Storm");
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	warrior.move();
}

function drawAll() {
	drawLevel();
	warrior.draw();
}