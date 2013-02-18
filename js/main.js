var wantedMarginsBetweenBoxes = 30;
var amountOfFriends = 0;
window.onresize = alignStuff;
var messageBoxHasBeenMovedOut = false;
var messageBoxIsMoving = false;
var millisUntilMainWindowStartsToShowAfterAnimation = 500;
var toolbarLinks = ["mainwindow.html", "hiveway.html", ["user_settings.html","privacy_settings.html"], "mainwindow.html", "help.html"];
var menubarToolsPosition = 2;
var toolbarBubbleIcons = ["img/menu bar/menu bar functions/hiveway_bubble.png", "img/menu bar/menu bar functions/hiveway_bubble_with_text.png", "img/menu bar/menu bar functions/tools_popup.png", "img/menu bar/menu bar functions/hiveway_bubble.png", "img/menu bar/menu bar functions/help_bubble_with_text.png"];
var currentShownInMainWindow = 0;
var mainWindowIsMoving = false;

function stuffOnLoad(){
	//Sets the background image
	if(typeof(Storage)!=="undefined"){
		var imgIsSet = localStorage.getItem("customBackgroundSet");
		if(imgIsSet === null){

		}				
		else if( imgIsSet == "true"){
			$("#backgroundDiv").css("background-image", "url('" + localStorage.customBackgroundUrl + "')");
		}
	}
	else{
		//Unimplemented as of now
	}
	alignStuff();
	placeMenuBar();
	setRoundDivOnMainWindow();
	profileImage(4);
	profileName("Daniel Almquist", "Stockholm");
	profileCompanyBoxes(8);
	placeSearchDiv();
	placeLogoutText();
	$("#headerBanner").css("top", $("#headerBanner").position().top-20);//temporary
	$("#mainInnerWindowTextArea").load("mainwindow_resources/mainwindow.html");//Sets the content in the main window
	$("#logoutText").mousedown(function(){
		setOpacityOnEmelent(this, 0.5);
	});
	$("#logoutText").mouseup(logUserOut);
}

//Aligns the different divs when the window is resized
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
	
	if($("#profileBox").is(":visible")){
		$("#profileBox").css("left", $("#mainWindowToolbar").position().left+$("#mainWindowToolbar").width()+wantedMarginsBetweenBoxes);
		$("#mainInnerWindow").css("left", $("#profileBox").position().left+$("#profileBox").outerWidth(true)+wantedMarginsBetweenBoxes);
	}
	else{
		$("#mainInnerWindow").css("left", $("#mainWindowToolbar").position().left+$("#mainWindowToolbar").outerWidth(true)+wantedMarginsBetweenBoxes);
	}

	$("#logoutText").css("left", $("#searchBarDiv").position().left+$("#searchBarDiv").width()+15);
	setMessageIcon();
	setBackground();
}
	

function placeSearchDiv(){
	var searchBar = $("#searchBarDiv");
	var header = $("#headerBanner");
	searchBar.css("top", header.position().top + header.outerHeight(true) - 70);
}

function placeLogoutText(){
	$("#logoutText").css("top", $("#searchBarDiv").position().top);
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
		div.data("number", i);
		div.click(toolbarClicked);
		$("#transparentMenuBarDiv"+i).hover(
			function(event){
				var itemNumberHovered = $(this).data("number");
				var leftPos = $("#"+event.target.id).position().left+$("#"+event.target.id).width();
				var topPos = $("#"+event.target.id).position().top+$("#"+event.target.id).height()/4;
				//For the tools item popout
				if(itemNumberHovered==menubarToolsPosition){
					var buttonIcon = $('<div class="menubarButtonIcon"><img src="' + toolbarBubbleIcons[itemNumberHovered] + '"/></div>').appendTo("#mainWindowToolbar");
					buttonIcon.css({"left" : leftPos, "top" : topPos});
					$(this).css({"width": "+=86", "z-index": 2});
					placeMenubarButtonIconExtraDivs($(this));
				}
				else{
					var buttonIcon = $('<div class="menubarButtonIcon"><img src="' + toolbarBubbleIcons[itemNumberHovered] + '"/></div>').appendTo("#mainWindowToolbar");
					buttonIcon.css({"left" : leftPos, "top" : topPos});
				}		
			},
			function(event){
				//For the tools item popout
				if($(this).data("number")==menubarToolsPosition){
					$(this).css({"width": "-=86", "z-index": 0});
					$('.menubarButtonIcon').remove();
					$('.menubarButtonIconExtraDiv').remove();
				}
				else{
					$('.menubarButtonIcon').remove();
				}
				
			}
		);
	}
}

//Places the extra divs for tools
function placeMenubarButtonIconExtraDivs(item){
	for(var i = 0; i < 2; i++){
		var div = $('<div class="menubarButtonIconExtraDiv"></div>').appendTo($(item));
		div.data("number", item.data("number")*10+i);
		var leftPos = $(item).position().left+$(item).width()-66+42*i;
		var topPos = $(item).height()/4;
		div.css({"left": leftPos, "top": topPos});
		div.click(toolbarClicked);
	}
}

//Places the profile image, and the images of the friends
function profileImage(friends){
	amountOfFriends = friends;
	var profileImg = $("#profileImage");
	//profileImg.css("background-image", "url('img/profile box/pic hexagon user.png')");
	profileImg.css("background-image", "url('img/profile box/tempProfImage.png')");
	profileImg.css({"left" : "30px"});
	for(var i = 0; i < amountOfFriends; i++){
		var friendImg = $('<div class="friendProfileImg"></div>').appendTo("#profileBox");
		friendImg.attr("id", "friendProfileImg"+i);
		friendImg.css("background-image", "url('img/profile box/pic hexagon friends.png')");
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
	$("#profilaNameInDiv").append(name).show().css("font-weight", "bold").addClass("hiveOrangeText");
	$("#profileLocationInDiv").append(location).show().css({"position" : "absolute", "left" : "+=2"}).addClass("hiveOrangeText");
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
	var tempComppanyImages = ["poloLogo.png", "starbucksLogo.png", "hmLogo.png", "levisLogo.png", "lacostLogo.png", "gapLogo.png", "microsoftLogo.png", "nikeLogo.png"];
	var tempCompanyNames = ["Polo", "Starbucks", "H&M", "Levi's", "Lacost", "GAP", "Microsoft", "Nike"];
	var startTopPos = $("#profileNameDiv").position().top + $("#profileNameDiv").outerHeight(true)+20;
	var startLeftPos = $("#profileNameDiv").position().left;
	for(var i = 0; i < amount; i++){
		var div = $("<div class='profileCompanyImg'></div>").appendTo("#profileBox");
		div.attr("id", "profileCompanyImgDiv"+i);
		div.attr("title", tempCompanyNames[i]);
		div.css({"left" : startLeftPos + (i%4)*($(".profileCompanyImg").width()+4+1/3) , "top" : startTopPos + Math.floor(i/4)*($(".profileCompanyImg").height()+4+1/3),
			"background-image": "url('img/tempImages/" + tempComppanyImages[i] + "')"});
	}
}

//For placing the a round div over the honey jar in the main window
function setRoundDivOnMainWindow(){
	 var mainWindow = $("#mainInnerWindow");
	 var div = $("<div class='transparentMenuBarDiv'></div>").appendTo("#mainInnerWindow");
	 div.attr("id", "roundDivMainWindow");
	 var left = mainWindow.outerWidth(true)-div.width();
	 div.css({"left" : left, "top" : 0, "opacity" :0});
	 div.data("number", 0); //sets the same id as the first button in the toolbar
	 div.click(toolbarClicked);
}

//For animating the main window
function animateMainWindow(){
	var mainWindow = $("#mainInnerWindow");
	var curHeight = mainWindow.height();
	var curWidth = mainWindow.width();
	mainWindow.animate({height: 0, width: curWidth, opacity: "toggle"}, { queue:true, duration: millisUntilMainWindowStartsToShowAfterAnimation }).delay(100);
	mainWindow.animate({height: curHeight, width: curWidth, opacity: "toggle"}, 500, toggleMainWindowMoving);
	return false;
  }

//Function for when a item on the toolbar is clicked, can simulate a click on a element in toolbar by sending that items nr in the toolbar 
function toolbarClicked(outsideNumb){
	if(outsideNumb.type !="click"){
		var number = outsideNumb;
	}
	else{
		var number = $(this).data("number");
	}
	if(number==currentShownInMainWindow || mainWindowIsMoving || number==menubarToolsPosition){
		return;
	}
	
	currentShownInMainWindow = number;
	
	//One of the user tools that contains more then one option has been pressed
	if(number>=10){
		var outerNumber = Math.floor(number/10);
		var innerNumber = number-10*outerNumber;
		$("#mainInnerWindowTextArea").load("mainwindow_resources/" + toolbarLinks[outerNumber][innerNumber]).delay(millisUntilMainWindowStartsToShowAfterAnimation);
		setMainWindowBackgroundImage();
		if($("#profileBox").is(":visible")){
			toggleProfileBoxVisibility();
		}
	}
	else{
		if($("#profileBox").is(":visible")){
			toggleMainWindowMoving();
			animateMainWindow();
			setTimeout(function(){
			$("#mainInnerWindowTextArea").load("mainwindow_resources/" + toolbarLinks[number]).delay(millisUntilMainWindowStartsToShowAfterAnimation);
				}, millisUntilMainWindowStartsToShowAfterAnimation);
		}
		else{
			setMainWindowBackgroundImage();
			toggleProfileBoxVisibility();
			$("#mainInnerWindowTextArea").load("mainwindow_resources/" + toolbarLinks[number]);
		}
	}
}

//Positions the message icon
function setMessageIcon(){
	var icon = $("#messageIcon");
	var messageBox = $("#messageDiv");
	icon.css({"top" : $("#mainWindowToolbar").offset().top+20, "left" : $(window).width()-icon.width()});
	messageBox.css({"top" : icon.offset().top, "left" : icon.offset().left+icon.outerWidth(true)});
	messageBox.hide();
}

//Shows the message box
function showMessageBox(){
	var icon = $("#messageIcon");
	var messageBox = $("#messageDiv");
	icon.animate({"left" : "-="+messageBox.outerWidth(true)}, 500);
	messageBox.animate({"left" : "-="+messageBox.outerWidth(true)}, 500);
	messageBox.show();
}

//Hides the message box
function hideMessageBox(){
	var icon = $("#messageIcon");
	var messageBox = $("#messageDiv");
	icon.animate({"left" : "+="+messageBox.outerWidth(true)}, 500);
	messageBox.animate({"left" : "+="+messageBox.outerWidth(true)}, 500);
	messageBox.fadeOut(0);
}

//Toggles if the message box is moving
function toogleMessageBoxIsMoving(){
	messageBoxIsMoving = !messageBoxIsMoving;
}

function toggleMainWindowMoving(){
	mainWindowIsMoving = !mainWindowIsMoving;
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

function setOpacityOnEmelent(id, amount){
	$(id).css({"opacity" : amount, "filter" : "alpha(opacity=" +amount+")"});
}

function logUserOut(){
	setOpacityOnEmelent(this, 1);
	alert("Do logout stuff in php");
}
//Sets the main window background
function setMainWindowBackgroundImage(){
	var mainWindowDiv = $("#mainInnerWindow");
	var img = new Image();
	img.onload = function(){
		$("#mainInnerWindow").css({"width": img.width-60, "height": img.height});
	};	
	if(currentShownInMainWindow==20){
		img.src = 'img/settings/settings_box_outline.png';
		mainWindowDiv.css("background-image", "url(" + img.src +")");
	}
	else if(currentShownInMainWindow==21){
		img.src = 'img/settings/user_info_box_outline.png';
		mainWindowDiv.css("background-image", "url(" + img.src +")");
	}
	else{
		img.src = 'img/honey%20jar/honey%20jar%20box%20USE%20THIS%20ONE.png';
		mainWindowDiv.css("background-image", "url(" + img.src +")");
	}
}

//Hides or shows the profile box, re aligns the main window acordingly
function toggleProfileBoxVisibility(){
	$("#profileBox").toggle();
	alignStuff();
}