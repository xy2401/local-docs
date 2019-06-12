// JavaScript Document


$(document).ready(function(){
    
/*	    $(".home-box").mouseenter(function() {
$(this).children('.in-box').animate({'top': '0px'}, 250);
  })*/
	
    $(".home-box").click(function() {
$(this).children('.in-box').animate({'top': '0px'}, 250);
  })
    
	
/*	$(body).mouseenter(function() {
$('.in-box').animate({'top': '190px'}, 50);
  }); */ 
		  
	
    $('.in-box').mouseleave(function() {
  $('.in-box').animate({'top': '190px'}, 250);
  });
  
  
});



