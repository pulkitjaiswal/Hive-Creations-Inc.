var imageBigHex; 
var imageSmallHex;
var lastBigHexTopPosition = 0;
var lastSmallHexTopPositions = -((103-1)/2); //Half the size of the smaller hex

function preLoad(){
	imageBigHex = (new Image()).src = "img/hiveway/big_hexacon.png";
	imageSmallHex = (new Image()).src = "img/hiveway/small_hexacon.png";

	if($("#profileBox").is(":visible")){
		toggleProfileBoxVisibility();
	}
	//$("#mainInnerWindow").toggle();
}
preLoad();


$(window).ready(function(){
	onHivewayLoad();
});

$("#mainInnerWindow").resize(function(){
	sizeTheHiveway();
});


function onHivewayLoad(){
	placeTheHiveway();
}

function placeTheHiveway(){
	var mainWindowDiv = $("#mainInnerWindow"); 
	/*
		Get the first (?) part of the listings from server

		? because there should probably be a way to load more stuff in to it, so the listing is partly loaded here
	*/
	var container = $("<div id='hivewayContainer'></div>").appendTo(mainWindowDiv);
	container.css({"height": "100%", "width": mainWindowDiv.width()}).css("width", "+=60");
	
	var size = 20;

	for(var i = 0; i < size; i++){
		addBigHex(); //Should pass info gotten from the server, TODO
	}
	for(var i = 0; i < size-1; i++){
		addSmallerHex(); //Should pass info gotten from the server, TODO
	}

	sizeTheHiveway();
}

function addBigHex(){ //Should accept stuff from server
	var container = $("#hivewayContainer")
	var div = $("<div class='hivewayBigHex'></div>").appendTo(container);
	div.css({"top": lastBigHexTopPosition+5});
	lastBigHexTopPosition = div.position().top+div.height();
}

function addSmallerHex(){
	var container = $("#hivewayContainer");
	var topPos = lastSmallHexTopPositions+159+5; //159 is BigHex height
	for(var i = 0; i < 2; i++){
		var div = $("<div class='hivewaySmallHex'></div>").appendTo(container);
		div.css({"top": topPos, "left": (350+235*i)});
		lastSmallHexTopPositions = topPos;
	}
}

function sizeTheHiveway(){
	var leftPos = $("#mainInnerWindow").innerWidth()/2-$(".hivewayBigHex").width()/2;
	$(".hivewayBigHex").css({"left": leftPos});
}