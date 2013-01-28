//Places the profile image, and the images of the friends
function profileImageSettings(friends){
	amountOfFriends = friends;
	var profileImg = $("#profileImageSettings");
	//profileImg.css("background-image", "url('img/profile box/pic hexagon user.png')");
	var left = profileImg.offset().left;
	var top = profileImg.offset().top;
	profileImg.css({"background-image": "url('img/profile box/tempProfImage.png')"});
	profileImg.css({"left" : "30px"});
	for(var i = 0; i < amountOfFriends; i++){
		console.log(i);
		var friendImg = $('<div class="friendProfileImg"></div>').appendTo(profileImg);
		friendImg.attr("id", "friendProfileImgSettings"+i);
		friendImg.css("background-image", "url('img/profile box/pic hexagon friends.png')");
		var startPosLeft = profileImg.position().left+friendImg.width()/2+9;
		var startPosTop = profileImg.position().top+friendImg.height()/2+5;
		friendImg.css({"left" : startPosLeft + friendImg.width()*i+(i%2)*4-Math.floor(i/2)*(friendImg.width()+16),
			"top" : startPosTop - Math.floor(i/2)*(friendImg.height()-6)});
	}
}