$("#changeBackgroundSubmit").delegate(setBackground);

function setBackground(){
	$("#backgroundDiv").css("background-image", "url('" + $("#backgroundUrl").val() + "')");
}