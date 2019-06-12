// JavaScript Document


$(document).ready(function() {
	
/*login/logout*/
$('html').click(function() {
   $('#languages').hide(); 
   	 $('#menucontainer').hide(); /*also hide this if both clicked;*/
});

$('#language').click(function(event){
     event.stopPropagation();
});

$('#langtoggle').click(function(event){
     $('#languages').toggle();
	  $('#menucontainer').hide(); /*also hide this if both clicked;*/
});




/*language*/
$('html').click(function() {
   $('#menucontainer').hide(); 
   $('#languages').hide(); /*also hide this if both clicked;*/
});

$('#menuwrap').click(function(event){
     event.stopPropagation();
});

$('#menutoggle').click(function(event){
     $('#menucontainer').toggle();
	    $('#languages').hide(); /*also hide this if both clicked;*/
});


});






/* Set page margin to header*/
jQuery(document).ready(function($){
								
		var $headerheight = ($("header").height());//+'px'
		var $headercombo = ($headerheight);//($headerheight + 20);
		$("#content").css({'margin-top':($headercombo+'px')}); // 


});	


$(window).resize(function() {

		var $headerheight = ($("header").height());//+'px'
		var $headercombo = ($headerheight);//($headerheight + 20);
		$("#content").css({'margin-top':($headercombo+'px')}); // 
	});	
	
	
/* Set mobile devices settings*/
	
$(document).ready(function() {

if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
 
	}else{
	//add css background class to form select 
	 $(".SELECTLRG").addClass("SELECTLRGBG");
}

});