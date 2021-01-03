
const MOVEMENT_SPEED = 10.0;

function warriorClass() {

	this.x = 75;
	this.y = 75;
	this.ang = 0;
	this.speed = 0;
	this.myPic;
	this.name = "untitled warrior";
	this.keys = 0;

	this.keyHeld_Forward = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_MoveLeft = false;
	this.keyHeld_MoveRight = false;

	this.controlKeyUp;
	this.controlKeyRight; 
	this.controlKeyDown; 
	this.controlKeyLeft;

	this.setupInput = function(upKey, rightKey, downKey, leftKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey; 
		this.controlKeyDown = downKey; 
		this.controlKeyLeft = leftKey;
	}

	this.reset = function(whichImage, warriorName) {
	 	this.name = warriorName;
	 	this.myPic = whichImage;
	 	this.speed = 0;

		for (var eachRow=0; eachRow < LEVEL_ROWS; eachRow++) {
			for (var eachCol=0; eachCol < LEVEL_COLS; eachCol++) {
				var arrayIndex = rowCallToArrayIndex(eachCol, eachRow);
				if (levelGrid[arrayIndex] == LEVEL_PLAYERSTART) {
					levelGrid[arrayIndex] = LEVEL_GROUND;
					this.ang = -Math.PI/2;
					this.x = eachCol * LEVEL_W + LEVEL_W/2;
					this.y = eachRow * LEVEL_H + LEVEL_H/2;
					return;
				}
			}
		}
		console.log("NO PLAYER START FOUND");
	}

	 this.move = function() {

		if (this.keyHeld_Forward) {
			this.speed = MOVEMENT_SPEED;
			this.ang = -Math.PI/2;
		} else if (this.keyHeld_MoveRight) {
			this.speed = MOVEMENT_SPEED;
			this.ang = 0;
		} else if (this.keyHeld_Reverse) {
			this.speed = -MOVEMENT_SPEED;
			this.ang = -Math.PI/2;
		} else if (this.keyHeld_MoveLeft){
			this.speed = -MOVEMENT_SPEED;
			this.ang = 0;		
		} else {
			this.speed = 0;
			this.ang = -Math.PI/2;
		}

		this.x += Math.cos(this.ang) * this.speed;
		this.y += Math.sin(this.ang) * this.speed;

		warriorLevelHandling(this);
	}

	this.reverseLastMove = function() {
		this.x -= Math.cos(this.ang) * this.speed;
		this.y -= Math.sin(this.ang) * this.speed;
	}

	this.addKey = function() {
		this.keys++;
	}

	this.removeKey = function() {
		this.keys--;
	}

	this.hasKey = function() {
		return this.keys > 0;
	}
 
	 this.draw = function() {
		drawBitmapCenteredWithRotation(this.myPic, this.x, this.y, 0);
	}
}
