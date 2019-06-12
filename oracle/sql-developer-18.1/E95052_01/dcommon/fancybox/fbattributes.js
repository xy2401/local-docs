// JavaScript Document
            //$(".fancybox-wrap").focus();	
            //$(".fancybox-wrap").focus();
			//$('.fancybox-iframe').contents().find('.selector').attr("tabindex",1).focus();
			// $(".fancybox-wrap").attr("tabindex",0).focus();
			// $(".fancybox-wrap") .trigger( "focus" );
			
			
			
	$(document).ready(function() {
		$(".fancybox").fancybox();
	});
	
	$(document).ready(function() {
	
	
	$(".various").fancybox({
		maxWidth	: 640,
		maxHeight	: 480,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		
		helpers: {
  			overlay: {
      			locked: false
  				}
			},
		afterShow : function () {
            $(".fancybox-wrap").focus();	
			addiframeesc();	
        },
	    afterClose: function() {
        	$(this.element).focus();
   		 }
	});
	
		$(".variousauto").fancybox({
		maxWidth	: 640,
		maxHeight	: 480,
		fitToView	: false,
		width		: '98%',
		height		: 'auto',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
				helpers: {
  				  overlay: {
      					locked: false
  				  }
			},
		afterShow : function () {
            $(".fancybox-wrap").focus();
			addiframeesc();	
        },
	    afterClose: function() {
        	$(this.element).focus();
   		 }
	});
/*});
$('.fancybox-iframe').contents().find('.selector').focus()

    $(document).ready(function () {*/

        $(".popup").fancybox({
			fitToView	: false,
			width		: '98%',
			maxWidth: 500,
            height: 340,
			autoSize	: false,
			closeClick	: true,
            transitionIn: 'elastic',
            transitionOut: 'elastic',
            type: 'iframe',
			
			helpers: {
  				  overlay: {
      					locked: false
  				  }
			},
		afterShow : function () {
            $(".fancybox-wrap").focus();
			addiframeesc();		
        },
	    afterClose: function() {
        	$(this.element).focus();
   		 }
  
        });
		
		
		$(".fb800660").fancybox({
		//minWidth	: 800,
		//minHeight	: 660,
		fitToView	: false,
		width		: 805,
		height		: 660,
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		
		helpers: {
  			overlay: {
      			locked: false
  				}
			},
		afterShow : function () {
            $(".fancybox-wrap").focus();
			addiframeesc();		
        },
	    afterClose: function() {
        	$(this.element).focus();
   		 }
	});
	
		
		
    });
	
	
	function addiframeesc() {
		
		//script is incomplete
		
// append escape key to videos		
//http://jaspreetchahal.org/how-to-inject-javascript-into-an-iframe/
//http://stackoverflow.com/questions/21795761/insert-content-into-iframe

var textvar = "test";
var $iframe = $(".fancybox-iframe");

$(".fancybox-iframe").ready(function() {
   $(".fancybox-iframe").contents().find("body").append("");// this works on coursel page get-started-1b
   //$(".fancybox-iframe").contents().find("body")
});


};
