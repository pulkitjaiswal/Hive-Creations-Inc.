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
	placeFilterBox();
	placeOfferBox();
}

/*
NEEDS SERVER STUFF
Should get listings and company adds
*/
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
		addSmallerHexs(false); //Should pass info gotten from the server, TODO
	}

}

/**
 * Places the filter box and initializes it
 */
function placeFilterBox(){
	var container = $("#hivewayContainer");
	var filterContainer = $("<div id='filterContainer' class='hiveBlueBorder'></div>");
	filterContainer.css({"top": container.offset().top});
	filterContainer.appendTo(container);
	$("<div class='hiveListHeader' style='display:block;position:relative;top:0;left:5%;'>Filter</div>").appendTo(filterContainer);
	var filterOptions = ["Company", "Brand", "Searchword"];
	for(i in filterOptions){
		var inputContainer = $("<div class='filterInputContainer'></div>");
		$("<span>"+filterOptions[i]+"</span>").appendTo(inputContainer);
		$("<input id='"+filterOptions[i]+"FilterInput'>").appendTo(inputContainer);
		inputContainer.appendTo(filterContainer);
	}
}

/**
 * Places the offer box and initializes it
 */
function placeOfferBox(){
	var container = $("#hivewayContainer");
	var offerContainer = $("<div id='offerContainer' class='hiveBlueBorder'></div>");
	var filterContainer = $("#filterContainer");
	offerContainer.appendTo(container);
	offerContainer.css({"top": (filterContainer.offset().top+filterContainer.outerHeight()*1.1)});
	$("<div class='hiveListHeader' style='display:block;position:relative;left:5%;'>Offer</div>").appendTo(offerContainer);
	
	/*
	TODO SERVER GET OF POINTS AND IMAGES
	------------------------------------
	 */
	
	var tempImagesWithText = [["img/tempImages/gapLogo.png", "2.34"], ["img/tempImages/hmLogo.png", "1.24"], ["img/tempImages/levisLogo.png", "4.37"], ["img/tempImages/poloLogo.png", "0.94"], ["img/tempImages/nikeLogo.png", "1.67"], ["img/tempImages/microsoftLogo.png", "2.03"]];
	
	/*
	CAROUSEL
	*/
 	var carouselDiv = $("<div id='jcarouselContainer' class='jcarousel'></div>")
	var carouselUL = $("<ul></ul>");
	carouselUL.appendTo(carouselDiv);
	for(i in tempImagesWithText){
		$("<li><img src='"+tempImagesWithText[i][0]+"' width='40' height='40' alt='' /><br /><center>"+tempImagesWithText[i][1]+"</center></li>").appendTo(carouselUL);
	}
	carouselDiv.appendTo(offerContainer);
	carouselDiv.jcarousel({
	});
	var leftCarouselButton = $("<div id='leftCarouselButton' class='carouselButton'><</div>");
	var rightCarouselButton = $("<div id='rightCarouselButton' class='carouselButton'>></div>");
	leftCarouselButton.appendTo(offerContainer);
	rightCarouselButton.appendTo(offerContainer);
	leftCarouselButton.css({"top": carouselDiv.position().top+15, "left": 5});
	rightCarouselButton.css({"top": carouselDiv.position().top+15, "right": 5});
	var carousel = $('.jcarousel');
	leftCarouselButton.click(function(){
		carousel.jcarousel('scroll', '-=1');
	});
	rightCarouselButton.click(function(){
		carousel.jcarousel('scroll', '+=1');
	});
	/*
	END CAROUSEL
	 */
	
	var offerOptions = ["To", "Enter amount"];
	for(i in offerOptions){
		var inputContainer = $("<div class='filterInputContainer'></div>");
		$("<span>"+offerOptions[i]+"</span>").appendTo(inputContainer);
		$("<input id='"+offerOptions[i]+"OfferInput'>").appendTo(inputContainer);
		inputContainer.appendTo(offerContainer);
	}

}

/*
	addedToBottom is for hiding newly added before compleatly loaded
*/
function addBigHex(addedToBottom, serverStuff){ //Should accept stuff from server
	var container = $("#hivewayContainer")
	var div = $("<div class='hivewayBigHex'><center>" + lastBigHexTopPosition + "</div>").appendTo(container);
	var leftPos = $("#mainInnerWindow").innerWidth()/2-190/2-130; //190 is big hex width
	div.css({"top": lastBigHexTopPosition+5, "left": leftPos});
	lastBigHexTopPosition += 5+159; //159 is big hex height
	/*if(addedToBottom){
		div.css("display", "none");
	}*/
}

/*
	addedToBottom is for hiding newly added before compleatly loaded
*/
function addSmallerHexs(addedToBottom, serverStuff){
	var topPos = lastSmallHexTopPositions+159+5; //159 is BigHex height
	for(var i = 0; i < 2; i++){
		addSmallerHex(topPos, i);
	}
	lastSmallHexTopPositions = topPos;
}

function addSmallerHex(topPos, nr){
	var container = $("#hivewayContainer");
	var div = $("<div class='hivewaySmallHex' id='smallHex"+topPos+"_"+nr+"'></div>").appendTo(container);
	var timer;
	div.hover(function(){
		var hoverDiv = $("<div class='hivewayOffersHover'></div>");
		hoverDiv.appendTo(div);
		if(nr==0){
			hoverDiv.css({"background-image": "url(img/hiveway/hiveway_bubble_left.png)", "left": "-=133", "top": "+=13"}); //133 is bubble width
		}
		else{
			hoverDiv.css({"background-image": "url(img/hiveway/hiveway_bubble_right.png)", "left": "+=124", "top": "+=13"}); //124 is small hex width
		}
	}, function(event){
		timer = setTimeout(function(){
			div.find($(".hivewayOffersHover")).remove();
		}, 200);
	});
	div.mouseover(function(){
		clearTimeout(timer);
	})
	div.css({"top": topPos, "left": (220+235*nr)});
	/*if(addedToBottom){
		div.css("display", "none");
	}*/
}

//Adds more boxes to the bottom of the hiveway
function addMoreItemsToHiveWay(){ //Should accept more stuff from the server.
	notUpdatingHiveway = false;
	for(var i = 0; i<10; i++){
		addBigHex(true);
		addSmallerHexs(true);
	}
	/*
	USE AJAX LOAD PLUGIN
	 */
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