//Places the profile image, and the images of the friends
//amountOfFriends taken from global variable declared in main.js
$("#hiveSearchResultBox").keyup(function(){searchForHiveInput();});
var previouslyAddedHeightToHiveResultBox = 0;

function settingsOnLoad(){
profileImageSettings();
positionUserSettingsText();
placeSettingsThemes(["img/settings/background_image_lineup.png","img/settings/background_image_lineup.png","img/settings/background_image_lineup.png","img/settings/background_image_lineup.png"]);
positionHiveSearchResult();
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
	textDiv.css({"left": $("#mainInnerWindow").width()+parseInt($("#mainInnerWindow").css("padding-left"),10)-textDivWidth});
}

//Function for placing the chosable themes, in argument is an array with themes images to show, maximum of four themes
function placeSettingsThemes(themesArray){
	var previousPos = 0;
	if(themesArray instanceof Array && typeof(themesArray[0])== "string"){
		var i = 0;
		var leftDiv = $("#profileSettingsThemesPredefined .profileSettingsThemesLeft");
		var rightDiv = $("#profileSettingsThemesPredefined .profileSettingsThemesRight");
		var rightTopText = $("<div class='hiveOrangeText'><span class='hiveBracketTextButton'>[Choose]</span> a background theme</div>").appendTo(rightDiv);
		rightTopText.css({"position": "absolute", "top": 15});
		while(i<themesArray.length && i<4){
			var div = $("<div class='profileSettingsThemesClass'></div>").appendTo(leftDiv);
			div.attr("id", "profileSettingsThemesPredefined"+i);
			div.css({"top": (previousPos+20)});
			var textDiv = $("<div class='hiveOrangeText hiveBracketTextButton'></div>").appendTo(div);
			textDiv.attr("id", "profileSettingsThemesPredefinedText"+i);
			textDiv.css({"top": -22, "position": "absolute"});
			textDiv.html("<span id ='profileSettingsThemesPredefinedTextViewButton" + i + "'>[view]</span> <span id ='profileSettingsThemesPredefinedTextChooseButton" + i + "'>[choose]</span>");
			previousPos = parseInt(div.css("top"),10)+div.height();
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

function positionHiveSearchResult(){
	var div = $("#hiveSearchResultBox");
	div.css({"left": $("#mainInnerWindow").outerWidth(true)+10, "top": 20});
	var topBackgroundImage = $("<div id='hiveSearchResultBoxTop'></div>").appendTo(div);
	var bottomBackgroundImage = $("<div id='hiveSearchResultBoxBottom'></div>").appendTo(div);
	var middleBackgroundImage = $("<div id='hiveSearchResultBoxMiddle'></div>").appendTo(div);
	middleBackgroundImage.css("top", topBackgroundImage.height());
	bottomBackgroundImage.css("top", (middleBackgroundImage.height()+middleBackgroundImage.position().top));
}

function searchForHiveInput(){
	var searchInput = $("#inputSearchHive").val();
	var results = searchForHive(searchInput);
	updateHiveResultList(results);
}

function searchForHive(searchInput){
	//TODO get result form the server
	var result = new Array();
	for (var j = 0; j <Math.ceil(Math.random()*5); j++) {
		var hiveMembers = new Array();
		for(var i = 0; i<Math.ceil(Math.random()*5); i++){
			hiveMembers[i] = new Object();
			hiveMembers[i].hive = searchInput+ " "+j;
			hiveMembers[i].firstName = "Daniel "+i;
			hiveMembers[i].lastName = "Almquist";
		}
		result[j] = new hiveObject(searchInput+ " "+j, hiveMembers.length, hiveMembers);
	}
	return result;
}

function hiveObject(hiveName,amountOfMembers,members)
{
	this.hiveName=hiveName;
	this.amountOfMembers=amountOfMembers;
	var membersArray = new Array();
	for(var i = 0; i<amountOfMembers; i++){
			membersArray[i] = new Object();
			membersArray[i].firstName = "Daniel "+i;
			membersArray[i].lastName = "Almquist";
	}
	this.members = membersArray;
}

//Takes an Array of hiveObjects
function updateHiveResultList(results){
	clearResultTable();
	$(".hiveResultTableEntry").remove();
	var tbody = $("#hiveResultTable");
    if (tbody == null){
    	return;
    }
	for (var r = 0; r < results.length; r++) {
        var trow = $("<tr>");
        var hive = "<span class = 'hiveResultTableHiveName hiveListHeader hiveOrangeText'>" + results[r].hiveName + "</span>";
        for(var i = 0; i < results[r].amountOfMembers; i++){
        	hive = hive + "<br /><span class = 'hiveResultTablePersonName hiveOrangeText'>" + results[r].members[i].firstName + " " + results[r].members[i].lastName + "</span>"
        }
        trow.addClass("hiveResultTableEntry");
        trow.html(hive+"<br />");
        trow.appendTo(tbody);
    } 
    var newTableHeight = tbody.height();
    var sizeToAdd = newTableHeight-previouslyAddedHeightToHiveResultBox;
    var middleBackgroundImage = $("#hiveSearchResultBoxMiddle");
    middleBackgroundImage.css("height", "+=" +sizeToAdd);
    previouslyAddedHeightToHiveResultBox = newTableHeight;
    var bottomBackgroundImage = $("#hiveSearchResultBoxBottom");
    bottomBackgroundImage.css("top", (middleBackgroundImage.height()+middleBackgroundImage.position().top));

}
function clearResultTable(){
	var tbody = $("#hiveResultTable");
}

$(window).ready(function(){
	settingsOnLoad();
});
