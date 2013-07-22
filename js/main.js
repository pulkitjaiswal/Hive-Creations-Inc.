var wantedMarginsBetweenBoxes = 30;
var amountOfFriends = 0;
var messageBoxHasBeenMovedOut = false;
var messageBoxIsMoving = false;
var millisUntilMainWindowStartsToShowAfterAnimation = 500;
var toolbarLinks = ["mainwindow.html", "hiveway.html", ["user_settings.html","privacy_settings.html"], "mainwindow.html", "help.html"];
var menubarToolsPosition = 2;
var toolbarBubbleIcons = ["img/menu bar/menu bar functions/hiveway_bubble.png", "img/menu bar/menu bar functions/hiveway_bubble_with_text.png", "img/menu bar/menu bar functions/tools_popup.png", "img/menu bar/menu bar functions/hiveway_bubble.png", "img/menu bar/menu bar functions/help_bubble_with_text.png"];
var currentShownInMainWindow = 0;
var currentShownBuzzBoxTab = -1;
var messageBoxIsShowing = false;
var chatListNewestMessagePlacement = 0;

window.onresize = alignStuff;

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
		//Unimplemented as of now, might implement cookies here
	}
	setMessageIcon();
	alignStuff();
	placeMenuBar();
	profileImage();
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
	alignMessageBox();
	setBackground();

	//For resize when hiveway is showing
	if(currentShownInMainWindow==1){
		resizeHivewayWindow();
	}
	checkScreenSize();
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

/* 
Places the extra divs for tools
*/
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

/*
Places the profile image, and the images of the friends
 */
function profileImage(){
	adapter_getProfileInfo(); //TODO
	amountOfFriends = 4;
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

/**
 * Sets the profile name and location
 */
function profileName(name, location){
	var nameBox = $("#profileNameDiv");
	var profileImg = $("#profileImage");
	nameBox.css({"top": profileImg.position().top + profileImg.outerHeight(true) + 50, "width" : $("#profileBox").width()});
	$("#profilaNameInDiv").append(name).show().css("font-weight", "bold").addClass("hiveOrangeText");
	$("#profileLocationInDiv").append(location).show().css({"position" : "absolute", "left" : "+=2"}).addClass("hiveOrangeText");
}

/*
Sets the new amount of friends, shall later take amount of friends as in argument
TEMPORARY!!
 */
function setNewFriends(){
	for(var i = 0; i < amountOfFriends; i++){
		$("#friendProfileImg"+i).remove();
	}
	var newAmountOfFriends = $("#setFriends").val();
	profileImage(newAmountOfFriends);
}


/*
THIS NEEDS SERVER STUFF

need images
*/
function profileCompanyBoxes(amount){ //How to get the images?
	adapter_retrievUserFavoriteBrands();
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

//Function for when a item on the toolbar is clicked, can simulate a click on a element in toolbar by sending that items nr in the toolbar 
function toolbarClicked(outsideNumb){
	if(outsideNumb.type !="click"){
		var number = outsideNumb;
	}
	else{
		var number = $(this).data("number");
	}
	if(number==currentShownInMainWindow || number==menubarToolsPosition){
		return;
	}
	
	currentShownInMainWindow = number;
	
	setMainWindowBackgroundImage();

	//One of the user tools that contains more then one option has been pressed
	if(number>=10){
		var outerNumber = Math.floor(number/10);
		var innerNumber = number-10*outerNumber;
		$("#mainInnerWindow").load("mainwindow_resources/" + toolbarLinks[outerNumber][innerNumber]).delay(millisUntilMainWindowStartsToShowAfterAnimation).ready(function(){checkScreenSize();});
		if($("#profileBox").is(":visible")){
			toggleProfileBoxVisibility();
		}
	}
	else{
		if($("#profileBox").is(":visible")){
			$("#mainInnerWindow").load("mainwindow_resources/" + toolbarLinks[number]).delay(millisUntilMainWindowStartsToShowAfterAnimation).ready(function(){checkScreenSize();});
		}
		else{
			toggleProfileBoxVisibility();
			$("#mainInnerWindow").load("mainwindow_resources/" + toolbarLinks[number]).ready(function(){checkScreenSize();});
		}
	}

	/*
	If hiveway has been showing
	*/
	/*if(number!=1){
		$("#hivewayContainer").remove();
	}*/
}

//Positions the message icon
function setMessageIcon(){
	var icon = $("#messageIcon");
	var messageBox = $("#messageDiv");
	icon.click(function(){
		if(messageBoxIsShowing&&!messageBoxIsMoving){
			hideMessageBox();
		}
		else if(!messageBoxIsMoving){
			showMessageBox();
		}
	});
	var buttons = ["button_mailbox.png", "button_compose.png", "button_offers.png", "button_direct_trade.png"];
	for (var i = buttons.length; i >= 0; i--) {
		var buttonId = $("<div class='buzzBoxButton' id='buzzBoxButtonId" + i + "'></div>").appendTo(messageBox);
		buttonId.css({"top": i*(5+buttonId.width())+15, "background-image": "url(img/messaging/" + buttons[i] +")"});
		buttonId.data("buttonNr", i);
		buttonId.click(function(event){
			buzzBoxButtonPressed(event);
		});
	};
	var buzzBoxTab = $("<div id='buzzBoxTabDiv'></div>").appendTo(messageBox);
	$("<div id='buzzBoxTabDivMessageContainer'></div>").appendTo(buzzBoxTab);
	buzzBoxTab.css({"left": "+="+buttonId.outerWidth(true)});
	buttonId.trigger('click'); //To show the first message tab
}

function alignMessageBox(){
	var icon = $("#messageIcon");
	var messageBox = $("#messageDiv");
	if(messageBoxIsShowing){
		icon.css({"top" : $("#mainWindowToolbar").offset().top+20, "left" : $(window).width()-messageBox.outerWidth(true)*1.1-icon.width()});
		messageBox.css({"top" : icon.offset().top-1, "left" : icon.offset().left+icon.outerWidth(true)});
	}
	else{
		icon.css({"top" : $("#mainWindowToolbar").offset().top+20, "left" : $(window).width()-icon.width()});
		messageBox.css({"top" : icon.offset().top-1, "left" : icon.offset().left+icon.outerWidth(true)});
		messageBox.hide();
	}
}

//Shows the message box
function showMessageBox(){
	toogleMessageBoxIsMoving();
	var icon = $("#messageIcon");
	var messageBox = $("#messageDiv");
	icon.animate({"left" : "-="+messageBox.outerWidth(true)*1.1}, 500);
	messageBox.animate({"left" : "-="+messageBox.outerWidth(true)*1.1}, 500, function(){toogleMessageBoxIsMoving()});
	messageBox.show();
	messageBoxIsShowing = true;
}

//Hides the message box
function hideMessageBox(){
	toogleMessageBoxIsMoving();
	var icon = $("#messageIcon");
	var messageBox = $("#messageDiv");
	icon.animate({"left" : "+="+messageBox.outerWidth(true)*1.1}, 500);
	messageBox.animate({"left" : "+="+messageBox.outerWidth(true)*1.1}, 500, function(){toogleMessageBoxIsMoving()});
	messageBox.fadeOut(0);
	messageBoxIsShowing = false;
}

//Toggles if the message box is moving
function toogleMessageBoxIsMoving(){
	messageBoxIsMoving = !messageBoxIsMoving;
}

//function for handling the transitions between the different views in the buzzbox
function buzzBoxButtonPressed(event){
	var button = $(event.target);
	var buttonNr = button.data("buttonNr");
	if(currentShownBuzzBoxTab==buttonNr){
		return;
	}
	currentShownBuzzBoxTab = buttonNr;
	emptyTheContentInBuzzBox(); //Removes all content that is currently in the buzzbox
	var messageContainer = $("#buzzBoxTabDivMessageContainer");
	var buzzBoxTabDiv = $("#buzzBoxTabDiv");
	var newBoxBackground = ["/mailbox_tab/tab_mailbox.png", "/compose_and_thread_tab/tab_compose.png", "/offers_tab/tab_offers.png", "/direct_trade_tab/tab_direct_trade.png"];
	var img = new Image();
	img.onload = function(){
		buzzBoxTabDiv.css({"width": img.width, "height": img.height});
		messageContainer.css({"width": (buzzBoxTabDiv.width()-5)+20, "height": buzzBoxTabDiv.height()-2});
	};
	img.src = "img/messaging" + newBoxBackground[buttonNr];
	$("#buzzBoxTabDiv").css("background-image", "url(" + img.src +")");
	switch(buttonNr){
	case 0:
		showUserConversationsInBuzzBox();
		break;
	case 1:
		showComposeMessageInBuzzBox();
		break;
	case 2:
		break;
	case 3:
		break;
	}
}

function emptyTheContentInBuzzBox(){
	$(".buzzBoxContent").remove();
	chatListNewestMessagePlacement = 0;
	$("#buzzBoxTabDivMessageContainer").css({"height": $("#buzzBoxTabDiv").height()-2, "top": 0});
}

/*
			START OF USER CONVERSATION CODE
			THIS PART NEEDS SERVER STUFF
*/
function showUserConversationsInBuzzBox(){
	/*
	Should here get an array containing arrays of names from the server
	
	Identifie it with a conversation id?
	*/
	adapter_getUserConversations();
	var tempConversations = [["Me", "Daniel Almquist"], ["Me", "Austin Helm"], ["Me", "Essi Huotari", "Nishant Chemburkar"]];
	for(var i = 0; i < tempConversations.length*6; i++){
		addAConversationToBuzzBox(tempConversations[Math.floor(Math.random()*3)], i, 1337);
	}
}

function addAConversationToBuzzBox(arrayOfNames, int_placeInList, conversationID){
	var messageContainer = $("#buzzBoxTabDivMessageContainer");
	var stringWithNames = "";
	for(var i = 0; i< arrayOfNames.length; i++){
		stringWithNames += arrayOfNames[i] + ", ";
	}
	stringWithNames = stringWithNames.substring(0, stringWithNames.length-2);

	var div = $("<div id='buzzBoxConversation" + int_placeInList + "' class='hiveOrangeText buzzBoxContent buzzBoxConversation'>"+stringWithNames+"</div>").appendTo(messageContainer);
	
	if(int_placeInList!=0){
		var prevDiv = $("#buzzBoxConversation" + (int_placeInList-1));
		div.css({"top": prevDiv.position().top+prevDiv.outerHeight(true), "border-top": "1px solid gray"});
	}

	div.click(function(){
		emptyTheContentInBuzzBox();
		showConversationInBuzzBox(conversationID, false, stringWithNames);
		currentShownBuzzBoxTab = -1;
	});
}

/*Shows the clicked conversation
Conversation id is used to get conversation from server
The placeOnTop is for loading older messages and placing them on the top of the message list
*/
function showConversationInBuzzBox(int_conversationId, placeOnTop, names){
	var tabContainer= $("#buzzBoxTabDivMessageContainer");
	var buzzBoxDiv = $("#buzzBoxTabDiv");
	/*

	Get conversation from server

	*/
	adapter_getUserConversation(int_conversationId);
	tempOthersNames = "Other:";
	var chatNames = $("<div id='chatConversationNames' class='buzzBoxContent'>" + names + "</div>").appendTo(buzzBoxDiv);

	var chatInputBox = $("<input type='text' id='buzzBoxInputBox' class='buzzBoxContent'></input>").appendTo(buzzBoxDiv);
	chatInputBox.css({"top": buzzBoxDiv.height()-chatInputBox.height()-4, "width": buzzBoxDiv.width()-15});
	tabContainer.css({"height": "-="+(chatInputBox.height()+4)});
	chatInputBox.keyup(function(event){
		/*Enter detected*/
		if(event.keyCode == 13){
			sendMessage();
		}
	});

	tabContainer.css({"height": "-=" + chatNames.outerHeight(), "top": "+=" + chatNames.outerHeight()});

	var tempConversation = [new chatMessageObject("Hey", "2013-04-06 20:00", false), new chatMessageObject("Hey to u", "2013-04-06 20:00", true), new chatMessageObject("watcha doing?", "2013-04-06 20:00", false),new chatMessageObject("just shoping some", "2013-04-06 20:00", true), new chatMessageObject("oh nice", "2013-04-06 20:00", false), new chatMessageObject("yah, it be nice!", "2013-04-06 20:00", true), new chatMessageObject("I bet :)", "2013-04-06 20:00", false), new chatMessageObject("yeah :)", "2013-04-06 20:00", true), new chatMessageObject("test", "2013-04-06 20:00", true), new chatMessageObject("test", "2013-04-06 20:00", false)];
	for(var i = 0; i < tempConversation.length; i++){
		addChatMessage(tempOthersNames, tempConversation[i], placeOnTop);
	}
}

function sendMessage(){
	var chatInputBox = $("#buzzBoxInputBox");
	var text = chatInputBox.val();
	if(text==""){
		return;
	}
	var message = new chatMessageObject(text, "2013-04-06 20:00", true);
	chatInputBox.val("");

	/*
	SEND MESSAGE TO SERVER AND PUSH TO OTHERS
	*/
	adapter_sendChatMessage();

	addChatMessage(null ,message, false);
}

/*
I'm unsure when and how to trigger this function
I will leave this rather empty for now
*/
function retrieveMessageFromOther(){

	/*GET MESSAGE*/
	adapter_retrieveNewChatMessage();
	var message = new chatMessageObject("TEXT", "2013-04-06 20:00", false); //The false at the end is for showing that the message is sent from some one else

	addChatMessage(null ,message, false); //The false here is for adding the message at the bottom of the chat window, true will be used when old messages are loaded from the server and placed on top
}

function addChatMessage(name, chatMessageObj, placeOnTop){
	var messageContainer = $("#buzzBoxTabDivMessageContainer");
	var chatMessageContainer = $("<div class='hiveOrangeText buzzBoxContent buzzBoxMessageContainer'></div>").appendTo(messageContainer);
	if(chatMessageObj.isSelf){
		name = "Me:";
	}
	/*To add check for who sent last message, should be a check in userID?*/
	var chatName = $("<div class='chatMessageName'>" + name + "</div>");
	var chatMessage = $("<div class='chatmessageMessage'>" + chatMessageObj.message + "</div>");

	if(!placeOnTop){
		chatName.appendTo(chatMessageContainer);
		chatMessage.appendTo(chatMessageContainer);
		chatMessageContainer.css({"height": chatName.outerHeight()+chatMessage.outerHeight(), "top": chatListNewestMessagePlacement});
		chatListNewestMessagePlacement += chatMessageContainer.outerHeight();
	}
	else{
		chatName.appendTo(chatMessageContainer);
		chatMessage.appendTo(chatMessageContainer);
		var height = chatName.outerHeight()+chatMessage.outerHeight();
		chatMessageContainer.css({"height": height});
		chatMessageContainer.css({"top": -height});
		$(".buzzBoxMessageContainer").css({"top": "+="+height});
	}
	
	$(document).ready(function(){
		messageContainer.scrollTop(messageContainer.height());
	});
}

/*
			END OF USER CONVERSATION CODE
*/

/*
			START OF COMPOSE MESSAGE CODE
*/

function showComposeMessageInBuzzBox(){
	emptyTheContentInBuzzBox();
	var messageContainer = $("#buzzBoxTabDivMessageContainer");
	var buzzBoxDiv = $("#buzzBoxTabDiv");
	var nameInputBox = $("<input type='text' placeholder='To...' id='buzzBoxInputBox' class='buzzBoxContent'></input>").appendTo(messageContainer);
	var sendButton = $("<span id='buzzBoxComposeMessageSend' class='buzzBoxContent hiveOrangeText'>Send Message</span>").appendTo(messageContainer);
	var messageBox = $("<textarea rows='400' cols='40' id='buzzBoxComposeMessageBox' class='buzzBoxContent' spellcheck='true'></textarea>").appendTo(messageContainer);
	var tempNames = ["Daniel Almquist", "Austin Helm", "Essi Huotari", "Pulkit Jaiswal", "Nishant Chemburkar"];

	nameInputBox.css({"width": buzzBoxDiv.width()-16, "top": 2});
	nameInputBox.autocomplete({	source: tempNames });

	nameInputBox.on( "autocompleteselect",
		function() {
			messageBox.focus();
			console.log(nameInputBox.val());
	});	

	sendButton.css({"top": messageContainer.height()-(sendButton.height()+6), "left": buzzBoxDiv.width()/2-sendButton.width()/2});
	sendButton.mouseup(function(){
		sendComposedMessage();
	})

	messageBox.css({"width": nameInputBox.width(), "height": messageContainer.height()-(nameInputBox.position().top+nameInputBox.height()+sendButton.height()+20), "top": nameInputBox.position().top+nameInputBox.height()+4});
	nameInputBox.focus();
}

function sendComposedMessage(){
	var nameInput = $("#buzzBoxInputBox");
	var textInput = $("#buzzBoxComposeMessageBox");

	var recipient = nameInput.val();
	if(!recipient){
		nameInput.focus();
		return;
	}
	var messageText = textInput.val();
	if(!messageText){
		textInput.focus();
		return;
	}
	textInput.val("");
	nameInput.val("");
	console.log("To: " + recipient);
	console.log("Message: " + messageText);
	/*
		SEND MESSAGE TO SERVER
	*/

	adapter_sendNewComposedMessage(recipient, messageText);
}

/*
			END OF COMPOSE MESSAGE CODE
*/

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
		mainWindowDiv.css({"width": img.width-60, "height": img.height});
	};
	if(currentShownInMainWindow==20){
		img.src = 'img/settings/settings_box_outline.png';
		mainWindowDiv.css("background-image", "url(" + img.src +")");
	}
	else if(currentShownInMainWindow==21){
		img.src = 'img/settings/user_info_box_outline.png';
		mainWindowDiv.css("background-image", "url(" + img.src +")");
	}
	else if(currentShownInMainWindow==1){
		resizeHivewayWindow();
	}
	else{
		img.src = 'img/honey%20jar/honey%20jar%20box%20USE%20THIS%20ONE.png';
		mainWindowDiv.css("background-image", "url(" + img.src +")");
	}

	if(currentShownInMainWindow==1){
		mainWindowDiv.css({"overflow": "hidden"});
	}
	else{
		mainWindowDiv.css({"overflow": "visible"});
	}
}

function checkScreenSize(){
	var mainWindow = $("#mainInnerWindow");
	if($(document).height()<($("#headerDiv").height()+mainWindow.height()+mainWindow.position().top)){
		$("#backgroundDiv").css("overflow-y", "scroll");
	}
	else{
		var background = $("#backgroundDiv");
		background.animate({
    		scrollTop: 0
		}, 0);
		background.css("overflow-y", "hidden");
	}
}

function resizeHivewayWindow(){
	var mainWindowDiv = $("#mainInnerWindow");
	var newHeight = $(window).height()-mainWindowDiv.offset().top;
	mainWindowDiv.css({"width": "100%", "height": newHeight-5-60, "background-image": "none"});
}

//Hides or shows the profile box, re aligns the main window acordingly
function toggleProfileBoxVisibility(){
	$("#profileBox").toggle();
	alignStuff();
}

function chatMessageObject(message, timestap, isSelf){
		this.message = message;
		this.timestap = timestap;
		this.isSelf = isSelf;
}

$(window).ready(function(){
	stuffOnLoad();
});