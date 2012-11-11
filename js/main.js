var wantedMarginsBetweenBoxes = 30;
var amountOfFriends = 0;
window.onresize = alignStuff;
var messageBoxHasBeenMovedOut = false;
var messageBoxIsMoving = false;

function stuffOnLoad(){
		alignStuff();
		placeMenuBar();
		setRoundDivOnMainWindow();
		profileImage(4);
		profileName("Daniel Almquist", "Stockholm");
		profileCompanyBoxes(8);
		placeSearchDiv();
		$("#headerBanner").css("top", $("#headerBanner").position().top-20);//temporary
}

//Aligns the different divs
function alignStuff(){
	var windowWidth = $(window).width();
	var mainWindowWidth = $("#mainWindow").width();
	var mainWindowSideMargins = (windowWidth-mainWindowWidth)/2;
	if(mainWindowSideMargins >= 0){
		$("#mainWindow").css("margin", "0px " + mainWindowSideMargins + "px");
		$("#headerBanner").css("left", mainWindowSideMargins);
		$("#searchBarDiv").css("left", windowWidth-mainWindowSideMargins-$("#searchBarDiv").width());
	}
	else{
		$("#mainWindow").css("margin", "0px 0px");
		$("#headerBanner").css("left", "0px");
		$("#searchBarDiv").css("left", mainWindowWidth-$("#searchBarDiv").width());
	}
	$("#profileBox").css("left", $("#mainWindowToolbar").position().left+$("#mainWindowToolbar").width()+wantedMarginsBetweenBoxes);
	$("#mainInnerWindow").css("left", $("#profileBox").position().left+$("#profileBox").outerWidth(true)+wantedMarginsBetweenBoxes);
	setMessageIcon();
	setBackground()
}

function placeSearchDiv(){
	var searchBar = $("#searchBarDiv");
	var header = $("#headerBanner");
	searchBar.css("top", header.position().top + header.outerHeight(true) - 70);
}

function setBackground(){
	var mainDiv = $("#backgroundDiv");
	mainDiv.css({"width" : $(window).width(), "height" : $(window).height()-mainDiv.position().top});
}
//Places the menubar and the divs ontop of it
function placeMenuBar(){
	var amountOfMenuButtons = 5;
	for(var i = 0; i < amountOfMenuButtons; i++){
		var div = $("<div class='transparentMenuBarDiv'></div>").appendTo("#mainWindowToolbar");
		div.attr("id", "transparentMenuBarDiv"+i);
		div.css({"left" : $("#menuBarBackImg").position().left, "top" : $("#menuBarBackImg").position().top+i*56.7});
		div.click(animateMainWindow);
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
		buttonIcon.css({"left" : $("#transparentMenuBarDiv4").position().left+$("#transparentMenuBarDiv4").width()+"px","top" : $("#transparentMenuBarDiv4").position().top+$("#transparentMenuBarDiv4").height()/4+"px"});
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
		var startPosLeft = profileImg.position().left+profileImg.width()-friendImg.width()/2+2;
		var startPosTop = profileImg.position().top+profileImg.height()-friendImg.height()/2+3;
		friendImg.css({"left" : startPosLeft + friendImg.width()*i+(i%2)*4-Math.floor(i/2)*(friendImg.width()+16),
			"top" : startPosTop - Math.floor(i/2)*(friendImg.height()-6)});
	}
}

function profileName(name, location){
	var nameBox = $("#profileNameDiv");
	var profileImg = $("#profileImage");
	nameBox.css({"top": profileImg.position().top + profileImg.outerHeight(true) + 50, "width" : $("#profileBox").width()});
	$("#profilaNameInDiv").append(name).show().css("font-weight", "bold");
	$("#profileLocationInDiv").append(location).show().css({"position" : "absolute", "left" : "+=2"})
}

//Sets the new amount of friends, shall later take amount of friends as in argument
function setNewFriends(){
	for(var i = 0; i < amountOfFriends; i++){
		$("#friendProfileImg"+i).remove();
	}
	var newAmountOfFriends = $("#setFriends").val();
	profileImage(newAmountOfFriends);
}

function profileCompanyBoxes(amount){ //How to get the images?
	var startTopPos = $("#profileNameDiv").position().top + $("#profileNameDiv").outerHeight(true)+20;
	var startLeftPos = $("#profileNameDiv").position().left;
	for(var i = 0; i < amount; i++){
		var div = $("<div class='profileCompanyImg'></div>").appendTo("#profileBox");
		div.attr("id", "profileCompanyImgDiv"+i);
		div.css({"left" : startLeftPos + (i%4)*($(".profileCompanyImg").width()+4+1/3) , "top" : startTopPos + Math.floor(i/4)*($(".profileCompanyImg").height()+4+1/3), "background" : "gray"});
	}
}

//For placing the a round div over the honey jar in the main window
function setRoundDivOnMainWindow(){
				 var mainWindow = $("#mainInnerWindow");
				 var div = $("<div class='transparentMenuBarDiv'></div>").appendTo("#mainInnerWindow");
				 div.attr("id", "roundDivMainWindow");
				 var left = mainWindow.outerWidth(true)-div.width();
				 div.css({"left" : left, "top" : 0, "opacity" :0});
				 div.click(animateMainWindow);
}

function animateMainWindow(){
				var mainWindow = $("#mainInnerWindow");
		    var curHeight = mainWindow.height();
   			var curWidth = mainWindow.width()
				console.log("width" + curWidth + " height" + curHeight);
        mainWindow.animate({height: 0, width: curWidth, opacity: "toggle"}, { queue:true, duration:500 });
        mainWindow.animate({height: curHeight, width: curWidth, opacity: "toggle"}, { queue:true, duration:500 });
      	return false;
  }

function setMessageIcon(){
	var icon = $("#messageIcon");
	var messageBox = $("#messageDiv");
	icon.css({"top" : $("#mainWindowToolbar").offset().top+20, "left" : $(window).width()-icon.width()});
	messageBox.css({"top" : icon.offset().top, "left" : icon.offset().left+icon.outerWidth(true)});
	messageBox.hide();
}

function showMessageBox(){
	var icon = $("#messageIcon");
	var messageBox = $("#messageDiv");
	console.log("in");
	icon.animate({"left" : "-="+messageBox.outerWidth(true)}, 500);
	messageBox.animate({"left" : "-="+messageBox.outerWidth(true)}, 500);
	messageBox.show();
}

function hideMessageBox(){
	var icon = $("#messageIcon");
	var messageBox = $("#messageDiv");
	console.log("out");
	icon.animate({"left" : "+="+messageBox.outerWidth(true)}, 500);
	messageBox.animate({"left" : "+="+messageBox.outerWidth(true)}, 500);
	messageBox.fadeOut(0);
}

function toogleMessageBoxIsMoving(){
	messageBoxIsMoving = !messageBoxIsMoving;
}

//For detecting where the mouse is
$(document).ready(function() {
    $('div').hover(function() { 
        var isOverId = (this.id);
		if(isOverId=="messageIcon"||isOverId=="messageDiv"){
			if(!messageBoxHasBeenMovedOut&&!messageBoxIsMoving){
				toogleMessageBoxIsMoving();
				showMessageBox();
				messageBoxHasBeenMovedOut=true;
				setTimeout(function(){toogleMessageBoxIsMoving()}, 500);
			}
		}
		else{
			if(messageBoxHasBeenMovedOut&&!messageBoxIsMoving){
				toogleMessageBoxIsMoving();
				hideMessageBox();
				messageBoxHasBeenMovedOut=false;
				setTimeout(function(){toogleMessageBoxIsMoving()}, 500);
			}
		}
    });
});