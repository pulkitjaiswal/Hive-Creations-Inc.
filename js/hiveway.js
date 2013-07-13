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
	filterContainer.appendTo(container);
	$("<div class='hiveListHeader' style='display:block;position:relative;top:0;left:5%;'>Filter</div>").appendTo(filterContainer);
	var filterOptions = ["Company", "Brand", "Searchword"];
	for(i in filterOptions){
		var inputContainer = $("<div class='hivewayInputContainer'></div>");
		$("<span>"+filterOptions[i]+"</span>").appendTo(inputContainer);
		$("<input id='"+filterOptions[i]+"FilterInput'>").appendTo(inputContainer);
		inputContainer.appendTo(filterContainer);
	}
}

/**
 * Places the offer box and initializes it
 */
function placeOfferBox(name, item){
	var offerContainer = $("#offerContainer");
	if(offerContainer.lenght!=0){
		offerContainer.remove();
	}
	var container = $("#hivewayContainer");
	offerContainer = $("<div id='offerContainer' class='hiveBlueBorder'></div>");
	var filterContainer = $("#filterContainer");
	offerContainer.appendTo(container);
	offerContainer.css({"top": 340});
	$("<div class='hiveListHeader' style='display:block;position:relative;left:5%;'>Offer to</div>").appendTo(offerContainer);
	$("<div id='offerBoxName' style='display:block;position:relative;left:5%;color:gray;font-weight:bold;'>"+name+"</div>").appendTo(offerContainer);
	$("<div class='hiveListHeader' style='display:block;position:relative;left:5%;margin-top:8px;'>Get</div>").appendTo(offerContainer);
	$("<div style='padding:5px;'><img src='"+item.url+"' alt='"+item.name+"'></img><div style='position:relative;display:inline;color:gray;font-weight:bold;top:-10px;left:8px;'>"+item.name+"</div></div>").appendTo(offerContainer);
	var inputContainer = $("<div class='hivewayInputContainer'></div>");
	$("<span>Desired amount</span>").appendTo(inputContainer);
	$("<input id='desiredAmountOfferInput'>").appendTo(inputContainer);
	inputContainer.appendTo(offerContainer);

	/*
	TODO SERVER GET OF POINTS AND IMAGES
	------------------------------------
	 */
	
	var tempImagesWithText = [["img/tempImages/gapLogo.png", "2.34", "Gap"], ["img/tempImages/hmLogo.png", "1.24", "H&M"], ["img/tempImages/levisLogo.png", "4.37", "Levis"], ["img/tempImages/poloLogo.png", "0.94", "Polo"], ["img/tempImages/nikeLogo.png", "1.67", "Nike"], ["img/tempImages/microsoftLogo.png", "2.03", "Microsoft"]];
	
	/*
	CAROUSEL
	*/
 	var carouselDiv = $("<div id='jcarouselContainerOfferBox' class='jcarousel'></div>")
	var carouselUL = $("<ul></ul>");
	carouselUL.appendTo(carouselDiv);
	for(i in tempImagesWithText){
		var img = $("<li><img src='"+tempImagesWithText[i][0]+"' width='40' height='40' alt='' /><br /><center>"+tempImagesWithText[i][1]+"</center></li>").appendTo(carouselUL);
		img.data("numberInList", i);
		img.click(function(){
			var element = $(this);
			$("#jcarouselContainerOfferBox>ul>li").removeClass("selectedCarouselImage hiveBlueBorder");
			var number = element.data("numberInList");
			$("#selectedNameToOffer").html(tempImagesWithText[number][2]);
			element.addClass("selectedCarouselImage hiveBlueBorder");

		});
	}
	carouselDiv.appendTo(offerContainer);
	carouselDiv.jcarousel({
	});
	var leftCarouselButton = $("<div id='leftCarouselButton' class='carouselButton leftBlueCarouselButton'></div>");
	var rightCarouselButton = $("<div id='rightCarouselButton' class='carouselButton rightBlueCarouselButton'></div>");
	leftCarouselButton.appendTo(offerContainer);
	rightCarouselButton.appendTo(offerContainer);
	leftCarouselButton.css({"top": carouselDiv.position().top+20, "left": 5});
	rightCarouselButton.css({"top": carouselDiv.position().top+20, "right": 5});
	var carousel = $('#jcarouselContainerOfferBox');
	leftCarouselButton.click(function(){
		carousel.jcarousel('scroll', '-=1');
	});
	rightCarouselButton.click(function(){
		carousel.jcarousel('scroll', '+=1');
	});
	/*
	END CAROUSEL
	 */
	 $("<div class='hiveListHeader' id='selectedNameToOffer' style='display:block;position:relative;left:5%;color:gray;'><br/></div>").appendTo(offerContainer);
	var inputContainer = $("<div class='hivewayInputContainer'></div>");
	$("<span>Enter amount</span>").appendTo(inputContainer);
	$("<input id='amountOfferInput'>").appendTo(inputContainer);
	inputContainer.appendTo(offerContainer);
	var offerButton = $("<div id='hivewayOfferBoxOfferButton' class='hiveOrangeText'>Offer</div>");
	offerButton.appendTo(offerContainer);
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

/**
 * Adds a smal hex and gives it content
 * @param {[type]} topPos Position measured from top
 * @param {[type]} nr     0 is to the left, 1 is to the right
 */
function addSmallerHex(topPos, nr){
	var container = $("#hivewayContainer");
	var div = $("<div class='hivewaySmallHex' id='smallHex"+topPos+"_"+nr+"'></div>").appendTo(container);
	var timer;
	div.hover(function(){
		var hoverDiv = $("<div class='hivewayOffersHover'></div>");
		hoverDiv.appendTo(div);
		hoverDiv.ready(function(){
			if(nr==0){
				hoverDiv.css({"background-image": "url(img/hiveway/hiveway_bubble_left.png)", "left": "-=133"}); //133 is bubble width
			}
			else{
				hoverDiv.css({"background-image": "url(img/hiveway/hiveway_bubble_right.png)", "left": "+=124"}); //124 is small hex width
			}
		});
		appendContentToHoverDiv(hoverDiv);
	}, function(event){
		timer = setTimeout(function(){
			div.find($(".hivewayOffersHover")).remove();
		}, 100);
	});
	div.mouseover(function(){
		clearTimeout(timer);
	})
	div.css({"top": topPos, "left": (220+235*nr)});
	/*if(addedToBottom){
		div.css("display", "none");
	}*/
}

/**
 * Adding content to the small hex hover box
 * @param  {[Ref]} container Reference to the hover box
 */
function appendContentToHoverDiv(container){
	var tempImagesWithText = [["img/tempImages/gapLogo.png", "2.34", "Gap"], ["img/tempImages/hmLogo.png", "1.24", "H&M"], ["img/tempImages/levisLogo.png", "4.37", "Levis"], ["img/tempImages/poloLogo.png", "0.94", "Polo"], ["img/tempImages/nikeLogo.png", "1.67", "Nike"], ["img/tempImages/microsoftLogo.png", "2.03", "Microsoft"]];
	/*
	CAROUSEL
	*/
 	var carouselDiv = $("<div id='jcarouselContainerHoverBox' class='jcarousel'></div>")
	var carouselUL = $("<ul></ul>");
	carouselUL.appendTo(carouselDiv);
	for(i in tempImagesWithText){
		var img = $("<li><img id='"+tempImagesWithText[i][2]+"Image' src='"+tempImagesWithText[i][0]+"' width='40' height='40' alt='' /><br /><center>"+tempImagesWithText[i][1]+"</center></li>").appendTo(carouselUL);
		img.data("numberInList", i)
		img.click(function(event){
			var number = $(this).data("numberInList");
			placeOfferBox("Daniel Almquist", {url: tempImagesWithText[number][0], name: tempImagesWithText[number][2]});
		});
	}
	carouselDiv.appendTo(container);
	carouselDiv.jcarousel({
	});
	var leftCarouselButton = $("<div class='carouselButton leftWhiteCarouselButton'></div>");
	var rightCarouselButton = $("<div class='carouselButton rightWhiteCarouselButton'></div>");
	leftCarouselButton.appendTo(container);
	rightCarouselButton.appendTo(container);
	leftCarouselButton.css({"top": carouselDiv.position().top+15, "left": 5});
	rightCarouselButton.css({"top": carouselDiv.position().top+15, "right": 5});
	var carousel = $('#jcarouselContainerHoverBox');
	leftCarouselButton.click(function(){
		carousel.jcarousel('scroll', '-=1');
	});
	rightCarouselButton.click(function(){
		carousel.jcarousel('scroll', '+=1');
	});
	/*
	END CAROUSEL
	 */
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