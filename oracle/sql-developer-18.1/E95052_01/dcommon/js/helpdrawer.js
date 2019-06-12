// JavaScript Document



$(document).ready(function() {

	
$(function() {

 if(! window.state){
    //var state = true;
	 window.state = true;
	 };
   //alert(state);
    
	$( "#helptab" ).click(function() {
      if ( window.state ) {
        $( "#helpdrawer" ).animate({
          right: 0
        }, 400, "easeOutSine" );
		//alert(state);true
		//alert(window.state);
      } else {
        $( "#helpdrawer" ).animate({
         right: -280
        }, 400, "easeOutSine" );
		//alert(state);false
		//alert(window.state);
      }
      window.state = !state;
    });
	
  });
	

// how about close if target is not helpdrawer?


$(document).mouseup(function (e)
{
    var container = $("#helpdrawer");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        //container.hide();
		//alert(window.state);
		 $( "#helpdrawer" ).animate({right: -280}, 400, "easeOutSine" );
		   window.state = true;
		
    }
});









});// close doc ready



/*$(function() {
    var state = true;
    $( 'html' ).click(function() {
      if ( state ) {
        $( "#helpdrawer" ).animate({
          right: 0
        }, 400, "easeOutSine" );
      } else {
        $( "#helpdrawer" ).animate({
         right: -280
        }, 400, "easeOutSine" );
      }
      state = !state;
    });
  });
		*/	