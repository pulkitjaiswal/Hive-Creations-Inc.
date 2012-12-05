$("#changeProfilePhoto").data("placeInList", 0).click(listItemClicked);
$("#managaHive").data("placeInList", 1).click(listItemClicked);
$("#manageBrands").data("placeInList", 2).click(listItemClicked);
$("#chBackground").data("placeInList", 3).click(listItemClicked);
$("#saveChangesButton").click(saveButtonClick);
var itemsInList =["changeProfilePhoto.html", "managaHive.html", "manageBrands.html", "changeBackground.html"];
var firstTimeClicked = false;


function listItemClicked(){
	firstTimeClicked = true;
	div=$("#inputDiv");
	div.load("mainwindow_resources/user_settings/" + itemsInList[$(this).data("placeInList")]);
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
