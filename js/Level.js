
const LEVEL_W = 50;
const LEVEL_H = 50;
const LEVEL_COLS = 16;
const LEVEL_ROWS = 12;
var levelOne =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1,
				 1, 0, 4, 0, 4, 0, 1, 0, 2, 0, 1, 0, 1, 4, 4, 1,
				 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 5, 1, 1,
				 1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1,
				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 1, 1,
				 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
				 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 1, 1,
				 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
				 1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 1, 1, 1, 1, 1, 1,
				 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];


var levelGrid = [];
const LEVEL_GROUND = 0;
const LEVEL_WALL = 1;
const LEVEL_PLAYERSTART = 2;
const LEVEL_GOAL = 3;
const LEVEL_DOOR = 5;
const LEVEL_KEY = 4;

function returnTileTypeAtColRow(col, row) {
	if (col >= 0 && col < LEVEL_COLS && row >= 0 && row < LEVEL_ROWS) {
		var levelIndexUnderCoord = rowCallToArrayIndex(col, row);
		return (levelGrid[levelIndexUnderCoord]);
	} else {
		return LEVEL_WALL;
	}
}

function removeLevelObject(col, row) {
	var levelIndexUnderCoord = rowCallToArrayIndex(col, row);
	levelGrid[levelIndexUnderCoord] = LEVEL_GROUND;
}

function warriorLevelHandling(warrior) {
	var warriorLevelCol = Math.floor(warrior.x/LEVEL_W);
	var warriorLevelRow = Math.floor(warrior.y/LEVEL_H);
	var tileHere = returnTileTypeAtColRow(warriorLevelCol, warriorLevelRow)
	
	if (tileHere == LEVEL_GOAL) {
		console.log(warrior.name + " WINS!!");
		loadLevel(levelOne);
	} else if (tileHere == LEVEL_DOOR) {
		if (warrior.hasKey()) {
			removeLevelObject(warriorLevelCol, warriorLevelRow);
			warrior.removeKey();
		} else {
			warrior.reverseLastMove();
			warrior.speed = 0;
		}
 	} else if (tileHere == LEVEL_KEY) {
 		warrior.addKey();
		removeLevelObject(warriorLevelCol, warriorLevelRow);
	} 
	else if (tileHere != LEVEL_GROUND) {
		warrior.reverseLastMove();
		warrior.speed = 0;
	}
}


function rowCallToArrayIndex(col, row) {
	return col + LEVEL_COLS * row;
}

function isTransparentlLevelType(tileKind) {
	return (tileKind == LEVEL_GOAL || tileKind == LEVEL_KEY || tileKind == LEVEL_DOOR)
}

function drawLevel() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for (var eachRow=0; eachRow < LEVEL_ROWS; eachRow++) {
		for (var eachCol=0; eachCol < LEVEL_COLS; eachCol++) {
			var tileKindHere = levelGrid[arrayIndex];
			var useImg = levelPics[tileKindHere];
			if (isTransparentlLevelType(tileKindHere)) {
				canvasContext.drawImage(levelPics[LEVEL_GROUND], drawTileX, drawTileY);
			}
			canvasContext.drawImage(useImg, drawTileX, drawTileY);
			drawTileX += LEVEL_W;
			arrayIndex++;
		}
		drawTileY += LEVEL_H;
		drawTileX = 0;
	}
}