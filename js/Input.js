const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var mouseX;
var mouseY;

function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	warrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}

function keySet(whichCar, evt, setTo) {
	if (evt.keyCode == whichCar.controlKeyLeft) {
		whichCar.keyHeld_MoveLeft = setTo;
	}
	if (evt.keyCode == whichCar.controlKeyRight) {
		whichCar.keyHeld_MoveRight = setTo;
	}
	if (evt.keyCode == whichCar.controlKeyUp) {
		whichCar.keyHeld_Forward = setTo;
	}
	if (evt.keyCode == whichCar.controlKeyDown) {
		whichCar.keyHeld_Reverse = setTo;
	}
}

function keyPressed(evt) {
	keySet(warrior,evt, true);
	evt.preventDefault();
}

function keyReleased(evt) {
	keySet(warrior,evt, false);
}