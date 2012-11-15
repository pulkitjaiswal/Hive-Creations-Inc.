
function fitPopupToParrent(){
	var sideMargins = $("#inputDiv").innerWidth()/10;
	var topMargins = $("#inputDiv").innerHeight()/10;
	$("#popupBody").css({"padding-left": sideMargins, "padding-top" : topMargins, "padding-right": sideMargins, "padding-bottom": topMargins});
}