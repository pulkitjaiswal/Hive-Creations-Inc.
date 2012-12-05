function fitPopupToParrent(){
	var sideMargins = $("#inputDiv").innerWidth()/10;
	var topMargins = $("#inputDiv").innerHeight()/10;
	$("#popupBody").css({"padding-left": sideMargins*2, "padding-top" : topMargins, "padding-right": sideMargins*2, "padding-bottom": topMargins});
	//$(".popupSubmitButton").css({"left": $("#popupInputBox").width()/2, "top": $("#popupInputBox").height()+$("#popupBillingSubmit").height()*2});
}

function setNewBackgroundImage(){
	var imgUrl = $("#backgroundUrl").val();
	$("#backgroundUrl").val("");
	if(typeof(Storage)!=="undefined"){
		localStorage.setItem("customBackgroundSet", "true");
		localStorage.setItem("customBackgroundUrl", imgUrl);
	}
	else{
		null;
	}
	$("#backgroundDiv").css("background-image", "url('" + imgUrl + "')");
	$(document.elementFromPoint(0, 0)).click();  
	setBackground();
}

function setDefaultBackgroundImage(){
	if(typeof(Storage)!=="undefined"){
		localStorage.customBackgroundSet = "false";
	}
	else{
		null;
	}
	location.reload();
}