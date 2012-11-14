$("#creditCardInfo").data("placeInList", 0).click(listItemClicked);
$("#billingAddress").data("placeInList", 1).click(listItemClicked);
$("#shippingAddress").data("placeInList", 2).click(listItemClicked);
$("#deleteAccount").data("placeInList", 3).click(listItemClicked);
var itemsInList =["creditCardInfo.html", "billingAddress.html", "shippingAddress.html", "deleteAccount.html"]
var firstTimeClicked = false;


function listItemClicked(){
	firstTimeClicked = true;
	div=$("#inputDiv");
	console.log($(this).data("placeInList"));
	div.load("mainwindow_resources/privacy_settings/" + itemsInList[$(this).data("placeInList")]);
	var offsetLeftToMainWindow = $("#mainInnerWindow").offset().left;
	var offsetTopToMainWindow = $("#mainInnerWindow").offset().top;
	console.log("Left " + offsetLeftToMainWindow);
	console.log("Top " + offsetTopToMainWindow);
	div.css({"left": $("#backgroundDiv").width()*0.25-offsetLeftToMainWindow, "top": $("#backgroundDiv").height()*0.25-offsetTopToMainWindow});
	div.css({"width": $("#backgroundDiv").width()*0.5, "height": $("#backgroundDiv").height()*0.6});
	div.show();
	detectClickOutside();
}

function detectClickOutside(event){
	if(event == null){
		$(window).click(detectClickOutside);
		return;
	}
	if(event.target.id != "inputDiv" && !firstTimeClicked){
		$(window).unbind("click", detectClickOutside);
		$("#inputDiv").hide();
	}
	firstTimeClicked = false;
}