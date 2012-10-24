
var wantedMarginsBetweenBoxes = 30;
var amountOfFriends = 0;
window.onresize = alignStuff;


function stuffOnLoad(){
		alignStuff();
		placeMenuBar();
		profileImage(4);
}

//Aligns the different divs
function alignStuff(){
	var windowWidth = $(window).width();
	var mainWindowWidth = $("#mainWindow").width();
	var mainWindowSideMargins = (windowWidth-mainWindowWidth)/2;
	if(mainWindowSideMargins >= 0){
		$("#mainWindow").css("margin", "0px " + mainWindowSideMargins + "px");
		$("#hiveLogo").css("left", mainWindowSideMargins);
		$("#searchBarDiv").css("left", windowWidth-mainWindowSideMargins-$("#searchBarDiv").width());
	}
	else{
		$("#mainWindow").css("margin", "0px 0px");
		$("#hiveLogo").css("left", "0px");
		$("#searchBarDiv").css("left", mainWindowWidth-$("#searchBarDiv").width());
	}
	$("#profileBox").css("left", $("#mainWindowToolbar").position().left+$("#mainWindowToolbar").width()+wantedMarginsBetweenBoxes);
	$("#mainInnerWindow").css("left", $("#profileBox").position().left+$("#profileBox").outerWidth(true)+wantedMarginsBetweenBoxes);
}

//Places the menubar and the divs ontop of it
function placeMenuBar(){
	var amountOfMenuButtons = 5;
	for(var i = 0; i < amountOfMenuButtons; i++){
		var div = $("<div class='transparentMenuBarDiv'></div>").appendTo("#mainWindowToolbar");
		div.attr("id", "transparentMenuBarDiv"+i);
		div.css({"left" : $("#menuBarBackImg").position().left, "top" : $("#menuBarBackImg").position().top+i*56.7});
	}
	
	//TO BE REPLACED WITH A FOR LOOP
	$("#transparentMenuBarDiv0").hover(
	function(){
		var buttonIcon = $('<img src="img/menu bar/menu bar functions/hiveway_bubble.png" id="menubarHoneyButtonIcon" class="menubarButtonIcon"/>').appendTo("#mainWindowToolbar");
		buttonIcon.css({"left" : $("#transparentMenuBarDiv0").position().left+$("#transparentMenuBarDiv0").width()+"px", "top" : $("#transparentMenuBarDiv0").position().top+$("#transparentMenuBarDiv0").height()/4+"px"});
	},
	function(){
		$('#menubarHoneyButtonIcon').remove();
	});
	
	$("#transparentMenuBarDiv1").hover(
	function(){
		var buttonIcon = $('<img src="img/menu bar/menu bar functions/hiveway_bubble_with_text.png" id="menubarHivewayButtonIcon" class="menubarButtonIcon"/>').appendTo("#mainWindowToolbar");
		buttonIcon.css({"left" : $("#transparentMenuBarDiv1").position().left+$("#transparentMenuBarDiv1").width()+"px", "top" : $("#transparentMenuBarDiv1").position().top+$("#transparentMenuBarDiv1").height()/4+"px"});
	},
	function(){
		$('#menubarHivewayButtonIcon').remove();
	});
	
	$("#transparentMenuBarDiv2").hover(
	function(){
		var buttonIcon = $('<img src="img/menu bar/menu bar functions/hiveway_bubble.png" id="menubar2ButtonIcon" class="menubarButtonIcon"/>').appendTo("#mainWindowToolbar");
		buttonIcon.css({"left" : $("#transparentMenuBarDiv2").position().left+$("#transparentMenuBarDiv2").width()+"px", "top" : $("#transparentMenuBarDiv2").position().top+$("#transparentMenuBarDiv2").height()/4+"px"});
	},
	function(){
		$('#menubar2ButtonIcon').remove();
	});
	
	$("#transparentMenuBarDiv3").hover(
	function(){
		var buttonIcon = $('<img src="img/menu bar/menu bar functions/hiveway_bubble.png" id="menubar3ButtonIcon" class="menubarButtonIcon"/>').appendTo("#mainWindowToolbar");
		buttonIcon.css({"left" : $("#transparentMenuBarDiv3").position().left+$("#transparentMenuBarDiv3").width()+"px", "top" : $("#transparentMenuBarDiv3").position().top+$("#transparentMenuBarDiv3").height()/4+"px"});
	},
	function(){
		$('#menubar3ButtonIcon').remove();
	});
	
	$("#transparentMenuBarDiv4").hover(
	function(){
		var buttonIcon = $('<img src="img/menu bar/menu bar functions/help_bubble_with_text.png" id="menubarHelpButtonIcon" class="menubarButtonIcon"/>').appendTo("#mainWindowToolbar");
		buttonIcon.css({"left" : $("#transparentMenuBarDiv4").position().left+$("#transparentMenuBarDiv4").width()+"px", "top" : $("#transparentMenuBarDiv4").position().top+$("#transparentMenuBarDiv4").height()/4+"px"});
	},
	function(){
		$('#menubarHelpButtonIcon').remove();
	});
	//END FOR LOOP
}

//Places the profile image, and the images of the friends
function profileImage(friends){
	amountOfFriends = friends;
	var profileImg = $("#profileImage");
	profileImg.css({"left" : "30px"});
	for(var i = 0; i < amountOfFriends; i++){
		var friendImg = $('<img src="img/profile box/pic hexagon friends.png" class="friendProfileImg"/>').appendTo("#profileBox");
		friendImg.attr("id", "friendProfileImg"+i);
		var left = profileImg.position().left+profileImg.width()-friendImg.width()/2+2+friendImg.width()*i+(i%2)*4-Math.floor(i/2)*(friendImg.width()+15);
		var top = profileImg.position().top+profileImg.height()-friendImg.height()/3-Math.floor(i/2)*(friendImg.height()-6);
		friendImg.css({"left" : left+"px", "top" : top+"px"});
		}
}

//Sets the new amount of friends
function setNewFriends(){
	for(var i = 0; i < amountOfFriends; i++){
		$("#friendProfileImg"+i).remove();
	}
	var newAmountOfFriends = $("#setFriends").val();
	profileImage(newAmountOfFriends);
}