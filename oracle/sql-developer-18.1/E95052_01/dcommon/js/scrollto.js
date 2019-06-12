// JavaScript Document

/*$(document).ready(function (){
            $(".click").click(function (){
                //$(this).animate(function(){
                    $('html, body').animate({
                        scrollTop: $("#top").offset().top
                    }, 2000);
                //});
            });
        });
	*/
	
	$(document).ready(function (){
           
		    $(".scroll-stage").click(function (){
				
	 $('html, body').animate({
                        scrollTop: $("#stage").offset().top
                    }, 500);
		
		   });
		
		     });