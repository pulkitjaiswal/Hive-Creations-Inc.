$("#popupBillingSubmit").click(billingSubmit);
$("#addAnotherBillingInfo").click(addAnotherBilling);

function fitPopupToParrent(){
	var sideMargins = $("#inputDiv").innerWidth()/10;
	var topMargins = $("#inputDiv").innerHeight()/10;
	$("#popupBody").css({"padding-left": sideMargins*2, "padding-top" : topMargins, "padding-right": sideMargins*2, "padding-bottom": topMargins});
	$("#popupBillingSubmit").css({"left": $("#popupInputBox").width()/2, "top": $("#popupInputBox").height()+$("#popupBillingSubmit").height()*2});
}

function removePopup(){
	$("#inputDiv").fadeOut(200);
}

function billingSubmit(){
	//Check all the stuff that has been entered
	removePopup();
	console.log($("#popupInputBox").width()/2-$("#popupBillingSubmit").width()/2);
}

function addAnotherBilling(){
	//Check all the stuff that has been entered
	removePopup();
	//Grabb all the stuff that has been entered
	$("#inputDiv").fadeIn(400);
}