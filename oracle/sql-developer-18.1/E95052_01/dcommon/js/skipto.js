

/////////////////
/////////////////   ACCESSIBILITY (duplicate script to the one nested in main.js)
// Makes skip to content set focus to #main.

$( document ).ready(function() {
        // bind a click event to the 'skipto' link
        $(".skipto").click(function(event){
    
            // strip the leading hash and declare
            // the content we're skipping to
            var skipTo="#"+this.href.split('#')[1];
			//var skipTo="#content";
    
            // Setting 'tabindex' to -1 takes an element out of normal 
            // tab flow but allows it to be focused via javascript
            $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
    
            // when focus leaves this element, 
            // remove the tabindex attribute
            $(this).removeAttr('tabindex');
    
            }).focus(); // focus on the content container
        });
    });
	
	////////////////////// update homepage tiles if focus
	$(document).focusin(function(){

   // console.log( document.activeElement );

	
	var focusedElement = document.activeElement;


	
	 });




