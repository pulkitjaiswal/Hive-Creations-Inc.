var imageBigHex; 
var imageSmallHex;
var lastBigHexTopPosition = 0;
var lastSmallHexTopPositions = -((103-1)/2); //Half the size of the smaller hex
var notUpdatingHiveway = true;

function preLoad(){
	imageBigHex = (new Image()).src = "img/hiveway/big_hexacon.png";
	imageSmallHex = (new Image()).src = "img/hiveway/small_hexacon.png";

	if($("#profileBox").is(":visible")){
		toggleProfileBoxVisibility();
	}
}
preLoad();


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
	container.scroll(function(){
		if(container.scrollTop()>(lastBigHexTopPosition-1500) && notUpdatingHiveway){
			addMoreItemsToHiveWay();
		}
	});
	
	var size = 20;

	for(var i = 0; i < size; i++){
		addBigHex(false); //Should pass info gotten from the server, TODO
	}
	for(var i = 0; i < size-1; i++){
		addSmallerHex(false); //Should pass info gotten from the server, TODO
	}

}

/*
	addedToBottom is for hiding newly added before compleatly loaded
*/
function addBigHex(addedToBottom){ //Should accept stuff from server
	var container = $("#hivewayContainer")
	var div = $("<div class='hivewayBigHex'><center>" + lastBigHexTopPosition + "</div>").appendTo(container);
	var leftPos = $("#mainInnerWindow").innerWidth()/2-$(".hivewayBigHex").width()/2-50;
	div.css({"top": lastBigHexTopPosition+5, "left": leftPos});
	lastBigHexTopPosition += 5+div.height();
	/*if(addedToBottom){
		div.css("display", "none");
	}*/
}

/*
	addedToBottom is for hiding newly added before compleatly loaded
*/
function addSmallerHex(addedToBottom){
	var container = $("#hivewayContainer");
	var topPos = lastSmallHexTopPositions+159+5; //159 is BigHex height
	for(var i = 0; i < 2; i++){
		var div = $("<div class='hivewaySmallHex'></div>").appendTo(container);
		div.css({"top": topPos, "left": (300+235*i)});
		lastSmallHexTopPositions = topPos;
		/*if(addedToBottom){
			div.css("display", "none");
		}*/
	}
}

function addMoreItemsToHiveWay(){ //Should accept more stuff from the server.
	notUpdatingHiveway = false;
	for(var i = 0; i<10; i++){
		addBigHex(true);
		addSmallerHex(true);
	}
	/*var bigHexes = $(".hivewayBigHex");
	var smallHexes = $(".hivewaySmallHex");
	bigHexes.bind("ready", function(){
		console.log("LOADED");
		setInterval(
		function(){
			console.log("FIOR");
			$('.hivewayBigHex, .hivewaySmallHex').css("display", "block");
		},
		5000);
		
	});
	bigHexes.unbind("ready");*/
	notUpdatingHiveway = true;
}

$(window).ready(function(){
	onHivewayLoad();
});

//onHivewayLoad(); //For local use only