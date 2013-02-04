//Places the profile image, and the images of the friends
//amountOfFriends taken from global variable declared in main.js

function settingsOnLoad(){
profileImageSettings();
positionUserSettingsText();
placeSettingsThemes(["img/settings/background_image_lineup.png","img/settings/background_image_lineup.png","img/settings/background_image_lineup.png","img/settings/background_image_lineup.png"]);
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

//Function for placing the chosable themes, in argument is an array with themes images to show, maximum of four themes
function placeSettingsThemes(themesArray){
	var previousPos = 0;
	if(themesArray instanceof Array && typeof(themesArray[0])== "string"){
		console.log("isArray! " + themesArray.length);
		var i = 0;
		var leftDiv = $("#profileSettingsThemesPredefined .profileSettingsThemesLeft");
		var rightDiv = $("#profileSettingsThemesPredefined .profileSettingsThemesRight");
		var rightTopText = $("<div class='hiveOrangeText'><span class='hiveBracketTextButton'>[Choose]</span> a background theme</div>").appendTo(rightDiv);
		rightTopText.css({"position": "absolute", "top": 15});
		console.log(leftDiv);
		while(i<themesArray.length && i<4){
			var div = $("<div class='profileSettingsThemesClass'></div>").appendTo(leftDiv);
			div.attr("id", "profileSettingsThemesPredefined"+i);
			div.css({"top": (previousPos+20)});
			var textDiv = $("<div class='hiveOrangeText hiveBracketTextButton'></div>").appendTo(div);
			textDiv.attr("id", "profileSettingsThemesPredefinedText"+i);
			textDiv.css({"top": -22, "position": "absolute"});
			textDiv.html("<span id ='profileSettingsThemesPredefinedTextViewButton" + i + "'>[view]</span> <span id ='profileSettingsThemesPredefinedTextChooseButton" + i + "'>[choose]</span>");
			previousPos = parseInt(div.css("top"),10)+div.height();
			//console.log(previousPos);
			i++;
		}
		var rightBottomText = $("<div class='hiveOrangeText'>or</div>").appendTo(rightDiv);
		rightBottomText.css({"position": "absolute", "top": previousPos-14});
	}
	var leftDiv = $("#profileSettingsThemesUser .profileSettingsThemesLeft");
	var div = $("<div class='profileSettingsThemesClass'></div>").appendTo(leftDiv);
	div.attr("id", "profileSettingsThemesUserDiv");
	div.css({"top": (previousPos+45)});
	var textDiv = $("<div class='hiveOrangeText hiveBracketTextButton'></div>").appendTo(div);
	textDiv.attr("id", "profileSettingsThemesUserText");
	textDiv.css({"top": -22, "position": "absolute"});
	textDiv.html("<span id ='profileSettingsThemesUserTextViewButton'>[view]</span> <span id ='profileSettingsThemesUserTextChooseButton'>[choose]</span>");
	var rightDiv = $("#profileSettingsThemesUser .profileSettingsThemesRight");
	var rightBottomText = $("<div class='hiveOrangeText'></div>").appendTo(rightDiv);
	rightBottomText.html("<span class='hiveBracketTextButton'>[Upload]</span> your own photos");
	rightBottomText.css({"position": "absolute", "top": previousPos+40});
}