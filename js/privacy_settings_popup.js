$("#popupBillingSubmit").click(billingSubmit);
$("#addAnotherBillingInfo").click(addAnotherBilling);
$("#popupCreditCardSubmit").click(creditCardSubmit);
$("#addAnotherCreditCard").click(addAnotherCreditCard);

function fitPopupToParrent(){
	var sideMargins = $("#inputDiv").innerWidth()/10;
	var topMargins = $("#inputDiv").innerHeight()/10;
	$("#popupBody").css({"padding-left": sideMargins*2, "padding-top" : topMargins, "padding-right": sideMargins*2, "padding-bottom": topMargins});
	//$(".popupSubmitButton").css({"left": $("#popupInputBox").width()/2, "top": $("#popupInputBox").height()+$("#popupBillingSubmit").height()*2});
}

function removePopup(){
	$("#inputDiv").fadeOut(200);
}

function billingSubmit(){
	//Check all the stuff that has been entered
	removePopup();
	console.log($("#popupInputBox").width()/2-$("#popupBillingSubmit").width()/2);
}

function addAnotherBilling(){
	//Check all the stuff that has been entered
	removePopup();
	//Grabb all the stuff that has been entered
	$("#inputDiv").fadeIn(400);
}

function creditCardSubmit(){
	//Check all the stuff that has been entered
	removePopup();
	console.log($("#popupInputBox").width()/2-$("#popupBillingSubmit").width()/2);
}

function addAnotherCreditCard(){
	//Check all the stuff that has been entered
	removePopup();
	//Grabb all the stuff that has been entered
	$("#inputDiv").fadeIn(400);
}

$(function() {
    $('.date-picker').datepicker( {
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'mm/yy',
        minDate: 0,
        showButtonPanel: false,
        onClose: function(dateText, inst) { 
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, 1));
        }
    });
});