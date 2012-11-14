$("#creditCardInfo").data("placeInList", 0).click(listItemClicked);
$("#billingAddress").data("placeInList", 1).click(listItemClicked);
$("#shippingAddress").data("placeInList", 2).click(listItemClicked);
$("#deleteAccount").data("placeInList", 3).click(listItemClicked);

function listItemClicked(){
	console.log($(this).data("placeInList"));
	div=$("#inputDiv");
	div.css({"left": $("#contentList").position().left, "top": $("#contentList").position().top});
	div.css({"width": $("#mainInnerWindow").width(), "height": $("#mainInnerWindow").height()})
	div.show();
}