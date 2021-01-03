var warriorPic = document.createElement("img");

var levelPics = []
var picsToLoad = 0;

function beginLoadingImage(imgVar, filename) {
	imgVar.onload = countLoadedmagesAndLaunchReady;
	imgVar.src = "images/" + filename;
}

function countLoadedmagesAndLaunchReady() {
	picsToLoad--;
	if (picsToLoad == 0) {
		imageLoadingDoneSoStartGame()
	}
}

function loadImageForLevelCode(levelCode, filename) {
	levelPics[levelCode] = document.createElement("img");
	beginLoadingImage(levelPics[levelCode], filename);			
}

function loadImages() {
	var imageList = [
		{varName: warriorPic, theFile: "warrior.png"},
		{levelType: LEVEL_GROUND, theFile: "world_ground.png"},
		{levelType: LEVEL_WALL, theFile: "world_wall.png"},
		{levelType: LEVEL_GOAL, theFile: "world_goal.png"},
		{levelType: LEVEL_DOOR, theFile: "world_door.png"},
		{levelType: LEVEL_KEY, theFile: "world_key.png"}
	];

	picsToLoad = imageList.length;

	for (var i=0; i < imageList.length; i++) {
		if (imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);			
		} else {
			loadImageForLevelCode(imageList[i].levelType, imageList[i].theFile);
		}
	}
}