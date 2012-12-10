$("#creditCardInfo").data("placeInList", 0).click(listItemClicked);
$("#billingAddress").data("placeInList", 1).click(listItemClicked);
$("#shippingAddress").data("placeInList", 2).click(listItemClicked);
$("#deleteAccount").data("placeInList", 3).click(listItemClicked);
$("#saveChangesButton").click(saveButtonClick);
var itemsInList =["creditCardInfo.html", "billingAddress.html", "shippingAddress.html", "deleteAccount.html"]
var firstTimeClicked = false;


function listItemClicked(){
	firstTimeClicked = true;
	div=$("#inputDiv");
	div.load("mainwindow_resources/privacy_settings/" + itemsInList[$(this).data("placeInList")]);
	var offsetLeftToMainWindow = $("#mainInnerWindow").offset().left;
	var offsetTopToMainWindow = $("#mainInnerWindow").offset().top;
	div.css({"left": $("#backgroundDiv").width()*0.3-offsetLeftToMainWindow, "top": $("#backgroundDiv").height()*0.25-offsetTopToMainWindow});
	div.css({"width": $("#backgroundDiv").width()*0.4, "height": $("#backgroundDiv").height()*0.75});
	div.fadeIn(200);
	detectClickOutside();
}

function detectClickOutside(event){
	if(event == null){
		$(window).click(detectClickOutside);
		return;
	}
	var innerXPos = event.pageX-$("#inputDiv").offset().left;
	var innerYPos = event.pageY-$("#inputDiv").offset().top;
	var xIsIn = (innerXPos>=0)&&(innerXPos<=$("#popupBody").innerWidth());
	var yIsIn = (innerYPos>=0)&&(innerYPos<=$("#popupBody").innerHeight());
	if((!xIsIn || !yIsIn) && !firstTimeClicked){
		$(window).unbind("click", detectClickOutside);
		$("#inputDiv").fadeOut(200);
	}
	firstTimeClicked = false;
}

function saveButtonClick(){
	toolbarClicked(0);
}

$(".settingsListItem").hover(
	function(event){
		if($(event.target).attr("class")!="settingsListItem"){
			$(event.target).parent().children(".settingsListItemImage").css("background-size", "23px");
		}
		else{
			$(event.target).children(".settingsListItemImage").css("background-size", "23px");			
		}
	},
	function(event){
		$(".settingsListItemImage").css("background-size", "30px")
	});