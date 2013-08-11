//Places the profile image, and the images of the friends
//amountOfFriends taken from global variable declared in main.js

function settingsOnLoad(){
	profileImageSettings();
	positionUserSettingsText();
	placeSettingsThemes(["img/settings/background_image_lineup.png","img/settings/background_image_lineup.png","img/settings/background_image_lineup.png","img/settings/background_image_lineup.png"]);
	//positionHiveSearchResult();
	setButtonFunctionality();
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
	var innerWindow = $("#mainInnerWindow");
	textDiv.css({"left": innerWindow.width()+parseInt(innerWindow.css("padding-left"),10)-textDivWidth});
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

function searchForHiveInput(){
	var searchInput = $("#inputSearchHive").val();
	var results = searchForHive(searchInput);
	updateHiveResultList(results);
}

function setButtonFunctionality(){
	$("#changeProfilePicButton").click(changeProfilePicClicked);
	//$("#createHiveButton").click(createHiveClicked);
	$("#editHiveButton").click(editHiveClicked);
	$("#requestToHiveButton").click(requestToHiveClicked);
	$("#addBrandButton").click(addBrandClicked);
}

function changeProfilePicClicked(){
	var div = getCleanSideBox();
	var container = $("<div id='hiveSettingsSideBoxContentContainer' class='settingSideBoxContent hiveOrangeText'></div>");
	container.appendTo(div);
	$('<div class="hiveHeader">Edit profile picture</div>').appendTo(container);
	var browseButton = $("<div id='browseImageButton' class='hiveBracketTextButton'>[Browse]</div>");
	browseButton.appendTo(container);
	var fakeInput = $("<input type='file' style='display:none;'></input>");
	fakeInput.appendTo(container);
	var pictureFileField = $('<input class="settingsSearchBar" placeholder="Browse for image.." type="text"></input>');
	pictureFileField.appendTo(container);
	fakeInput.change(function(){
		pictureFileField.val((fakeInput.val()));
		$(".loaderDiv").show();
	});
	browseButton.click(function(){
		fakeInput.trigger("click");
		return false;
	});
	pictureFileField.click(function(){
		fakeInput.trigger("click");
		return false;
	});

	/*
	GET PROFILE PIC

	 */
	var userImage = $("<div id='newUserImageDiv'></div>");
	$("<img id='newUserImageImg' src='img/settings/new_user_pic_placeholder.png'></img>").appendTo(userImage);
	userImage.appendTo(container);
	$("<div>Click and drag the picture to adjust</div>").appendTo(container);
	$("<div class='loaderDiv'></div>").appendTo(userImage).css({"top": -80, "backgroundImage": "url(img/settings/profile-image-ajax-loader.gif)"});

	$("<div style='margin-top:20px;width:auto;'><span id='saveProfileImageButton' class='hiveBracketTextButton'>[Save]</span></div>").appendTo(container);
	$("#saveProfileImageButton").click(function(){alert("Save The Image!")});
	updateSideBoxSize(container);
}

function editHiveClicked(){
	var div = getCleanSideBox();
	var container = $("<div id='hiveSettingsSideBoxContentContainer' class='settingSideBoxContent hiveOrangeText'></div>");
	container.appendTo(div);
	$('<div class="hiveHeader">Edit your hive</div>').appendTo(container);
	/*
	GET HIVE INFO

	 */
	var editHiveContainer = $("<div id='editHiveContainer'></div>");
	editHiveContainer.appendTo(container);
	var temp = new hiveObject("beez", 3, []);
	$("<div class='hiveResultHiveName'>"+ temp.hiveName +"</div>").appendTo(editHiveContainer);
	for(i=0; i<temp.amountOfMembers; i++){
		var person = $("<div class='editHivePersonNames' style='padding-right:14px;'>"+ temp.members[i].firstName + " " + temp.members[i].lastName  +"</div>");
		person.appendTo(editHiveContainer);
		var personDeleteButton = $("<div class='hiveMemberDeleteButton' id='deleteHiveMember"+i+"'></div>");
		personDeleteButton.appendTo(person);
		personDeleteButton.data("number", i);
		personDeleteButton.click(function(){console.log("Delete member "+$(this).data("number"));});
	}
	$("<div style='font-weight:bold;margin:20px 0px 5px 0px;'>Invite friends to your Hive</div>").appendTo(container);
	$("<div style='margin-left:2px'>Search for friend</div>").appendTo(container);
	var friendSearchInput = $("<input class='settingsSearchBar' type='text' placeholder='Search for friend..' style='margin:2px 0px 0px 2px'></input>");
	friendSearchInput.appendTo(container);
	var tempNames = ["Daniel Almquist", "Austin Helm", "Essi Huotari", "Pulkit Jaiswal", "Nishant Chemburkar"];
	friendSearchInput.autocomplete({source: tempNames });

    $("<div style='margin:15px 0px 0px 2px'>Send an email invitation</div>").appendTo(container);
    var emailInvitationInput = $("<input class='settingsSearchBar' type='text' placeholder='Send email invitation..' style='margin:2px 0px 0px 2px'></input>");
	emailInvitationInput.appendTo(container);
	updateSideBoxSize(container);
}

function requestToHiveClicked(){
	var div = getCleanSideBox();
	var searchBox = $('<input id="inputSearchHive" class="settingSideBoxContent" placeholder="Search for hive" type="text"></input>');
	searchBox.appendTo(div);
	var table = $('<table id="hiveResultTable" class="settingSideBoxContent"><tbody></tbody></table>');
	table.appendTo(div);
	searchBox.keyup(function(){searchForHiveInput();});
	updateSideBoxSize(table);
}

function addBrandClicked(){
	var div = getCleanSideBox();
	var container = $("<div id='hiveSettingsSideBoxContentContainer' class='settingSideBoxContent hiveOrangeText'></div>");
	container.appendTo(div);
	$('<div class="hiveHeader">Edit brands</div>').appendTo(container);
	$("<div style='font-weight:bold;margin:20px 0px 5px 0px;'>Your favorits</div>").appendTo(container);

	/**
	 * CAROUSELL
	 */
	 var tempImagesWithText = [["img/tempImages/gapLogo.png", "Gap"], ["img/tempImages/hmLogo.png", "H&M"], ["img/tempImages/levisLogo.png", "Levis"], ["img/tempImages/poloLogo.png", "Polo"], ["img/tempImages/nikeLogo.png", "Nike"], ["img/tempImages/microsoftLogo.png", "Microsoft"]];

 	var carouselDiv = $("<div id='jcarouselContainerEditBrand' class='jcarousel'></div>")
	var carouselUL = $("<ul></ul>");
	carouselUL.appendTo(carouselDiv);
	for(i = 0; i<6; i++){
		var number = Math.floor(Math.random()*6);
		var img = $("<li><img src='"+tempImagesWithText[number][0]+"' width='40' height='40' alt='"+ tempImagesWithText[number][1] +"' /><br /></li>").appendTo(carouselUL);
		var removeButton = $("<div class='removeBrandButton'></div>").appendTo(img);
		removeButton.click(function(event){
			$(this).parent().remove();
		});
	}
	carouselDiv.appendTo(container);
	carouselDiv.jcarousel({
	});
	var leftCarouselButton = $("<div id='leftCarouselButton' class='carouselButton leftBlueCarouselButton'></div>");
	var rightCarouselButton = $("<div id='rightCarouselButton' class='carouselButton rightBlueCarouselButton'></div>");
	leftCarouselButton.appendTo(container);
	rightCarouselButton.appendTo(container);
	leftCarouselButton.css({"top": carouselDiv.position().top+20, "left": 5});
	rightCarouselButton.css({"top": carouselDiv.position().top+20, "right": 5});
	leftCarouselButton.click(function(){
		carouselDiv.jcarousel('scroll', '-=1');
	});
	rightCarouselButton.click(function(){
		carouselDiv.jcarousel('scroll', '+=1');
	});
	/*
	END CAROUSEL
	 */
	
	$("<div style='font-weight:bold;margin:10px 0px 5px 0px;'>Add brands</div>").appendTo(container);

	updateSideBoxSize(container);
}

function getCleanSideBox(){
	addSideBoxIfNonExisting();
	$(".settingSideBoxContent").remove();
	return $("#hiveSettingsSideBox");
}

function addSideBoxIfNonExisting(){
	var div = $("#hiveSettingsSideBox");
	if(div.length!=0){
		return;
	}
	var div = $("<div id='hiveSettingsSideBox'></div>");
	div.appendTo($("#profileBoxSettings"));
	div.css({"left": $("#mainInnerWindow").outerWidth(true)+10, "top": 20});
	var topBackgroundImage = $("<div id='hiveSettingsSideBoxTop'></div>").appendTo(div);
	var bottomBackgroundImage = $("<div id='hiveSettingsSideBoxBottom'></div>").appendTo(div);
	var middleBackgroundImage = $("<div id='hiveSettingsSideBoxMiddle'></div>").appendTo(div);
	middleBackgroundImage.css("top", topBackgroundImage.height());
	bottomBackgroundImage.css("top", (middleBackgroundImage.height()+middleBackgroundImage.position().top));
}

/*
NEEDS SERVER
*/
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
	$(".hiveResultTableEntry").remove();
	var tbody = $("#hiveResultTable");
    if (tbody == null){
    	return;
    }
	for (var r = 0; r < results.length; r++) {
        var trow = $("<tr>");
        var hive = "<span class = 'hiveOrangeText hiveResultHiveName'>" + results[r].hiveName + "</span>";
        for(var i = 0; i < results[r].amountOfMembers; i++){
        	hive = hive + "<br /><span class = 'hiveResultTablePersonName hiveOrangeText'>" + results[r].members[i].firstName + " " + results[r].members[i].lastName + "</span>"
        }
        trow.addClass("hiveResultTableEntry");
        trow.html(hive+"<br />");
        trow.appendTo(tbody);
    } 
    updateSideBoxSize(tbody);
}

function updateSideBoxSize(elementInBox){
	var newSize = elementInBox.height()-$("#hiveSettingsSideBoxBottom").height()+12;
    var middleBackgroundImage = $("#hiveSettingsSideBoxMiddle");
    middleBackgroundImage.css("height", newSize);
    var bottomBackgroundImage = $("#hiveSettingsSideBoxBottom");
    bottomBackgroundImage.css("top", (middleBackgroundImage.height()+middleBackgroundImage.position().top));
}

$(document).ready(function(){
	settingsOnLoad();
});
