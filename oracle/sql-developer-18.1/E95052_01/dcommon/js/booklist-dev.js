// JavaScript Document


    
$(document).ready(function(){
    $('html').on('click', function() {
        $('.gui-selectbox-dialog:visible').hide();
    }); 
    
    $('.gui-selectbox').on('click', function(event) {
        $('.gui-selectbox-dialog:visible').hide();
        $(this).find('.gui-selectbox-dialog').show();
        
        event.stopPropagation();
    });
       
    $('.gui-selectbox-dialog ul').on('click', 'li', function(event) {
       // alert('selected = ' + $(this).text());
        event.stopPropagation();
    });
});

/*
$(document).ready(function() {
	
	///////////////////////////////////
	
	$('.infolink').click(function() {

	   $(this).next(".bookinfo").fadeIn(300)//.delay(3000).fadeOut(1000);
	   		 var container  = $(".bookinfo");
			alert(container);
			$('.downloadinfo').fadeOut(10);			
	});
	
		
	/////////////////////////////////
	
	
	$('.downloadlink').click(function() {
			$(this).next(".downloadinfo").fadeIn(300)//.delay(3000).fadeOut(1000);
			 var container  = $(".downloadinfo");
			alert(container);
			$('.bookinfo').fadeOut(10);
		
			
	 });
	
	///////////////////////////////////
	
	
		/*$("html").click(function() {
			 $('.bookinfo').fadeOut(10);
			 $('.downloadinfo').fadeOut(10);
			 
			 });*/
			 
			 
	
/*	$(document).mouseup(function (e){
    var container = $(this);

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {container.fadeOut(10);}
	
	*/
	////////////////////////////////
	
		
/*	$(document).mouseup(function (e){
    var container = $(".downloadinfo");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {container.fadeOut(10);}

	
	////////////////////////////////
});	*/
	
	
	
	
	
	








/*$(function() {
$('.moreinfo').attr("disabled", "disabled");
setTimeout(enableButton, 5000);

function enableButton(){
   $('.moreinfo').removeAttr('disabled');
}

 
});*/