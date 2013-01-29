//Places the profile image, and the images of the friends
//amountOfFriends taken from global variable declared in main.js

function settingsOnLoad(){
profileImageSettings();
positionUserSettingsText();
}

function profileImageSettings(){
	var profileImg = $("#profileImageSettings");
	var left = profileImg.offset().left;
	var top = profileImg.offset().top;
	profileImg.css({"background-image": "url('img/profile box/tempProfImage.png')"});
	profileImg.css({"left" : "30px"});
	for(var i = 0; i < amountOfFriends; i++){
		var friendImg = $('<div class="friendProfileImg"></div>').appendTo(profileImg);
		friendImg.attr("id", "friendProfileImgSettings"+i);
		friendImg.css("background-image", "url('img/profile box/pic hexagon friends.png')");
		var startPosLeft = profileImg.position().left+friendImg.width()/2+9;
		var startPosTop = profileImg.position().top+friendImg.height()/2+5;
		friendImg.css({"left" : startPosLeft + friendImg.width()*i+(i%2)*4-Math.floor(i/2)*(friendImg.width()+16),
			"top" : startPosTop - Math.floor(i/2)*(friendImg.height()-6)});
	}
}

function positionUserSettingsText(){
	var textDiv = $("#profileSettingsText");
	var textDivWidth = textDiv.width();
	console.log($("#mainInnerWindow").css("padding-left"));
	textDiv.css({"left": $("#mainInnerWindow").width()+parseInt($("#mainInnerWindow").css("padding-left"),10)-textDivWidth});
}