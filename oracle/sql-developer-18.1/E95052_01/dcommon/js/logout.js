// JavaScript Document

/*$(document).ready(function() {
		$('.parent').click(function() {
			$('.sub-nav').toggleClass('visible');
		});
	});
*/
$(document).ready(function() {
	
	
$('html').click(function() {
   $('#menucontainer').hide(); 
});

$('#menuwrap').click(function(event){
     event.stopPropagation();
});

$('#menutoggle').click(function(event){
     $('#menucontainer').toggle();
});


});