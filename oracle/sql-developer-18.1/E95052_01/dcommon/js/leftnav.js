// JavaScript Document

/*makes booknav sticky*/
$(document).ready(function(){

var mainnav = $(".left-nav-tut");
$(window).scroll(function(){
	if( $(this).scrollTop() > 250 ) {
		
		//do this
		mainnav.addClass("left-nav-tutscrl");
	}else{
		mainnav.removeClass("left-nav-tutscrl");
	}	
	
	
});//end function
});//end doc ready function





///////////////////////

/*if greater than 768 set class to active*/
//run on document load and on window resize
$(document).ready(function () {
sidebarfun();
});

//on resize
/*$(window).resize(function(){
sidebarfun();
    });
	*/
	


    /* Store the window width */
    var windowWidth = $(window).width();

    /* Resize Event */
    $(window).resize(function(){
        // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
        if ($(window).width() != windowWidth) {

            // Update the window width for next time
            windowWidth = $(window).width();

            // Do stuff here
			sidebarfun();

        }

        // Otherwise do nothing

    });


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
var sidebarfun = function(){
	           if ($(window).width() > 769) { 
		
		  opensidebar();
			$("#hidenav").css('display','none');			
						   
		   }else{
			   
			closesidebar();
				
				
			   };
	};
	

var opensidebar = function(){
	  // $(".left-nav").css('display','block'); 
		  // $(".navback").css('display','block');
		  
		  // set width 
		  $(".left-nav").css('display','block'); 
		  $(".navback").css('width',160+'px');  
		  $("#main").css('margin-left',160+'px'); 
		  //calculate width
		  //$("#main").css('width',220+'px');  
		  // or, width = total width - 160
		
		 // for search results 
		 		 $("#sidebar").css('display','block');
	 		$(".navbackwide").css('width',220+'px'); 
		   $("#bookContainer").css('margin-left',220+'px'); 
		   
		
		
		//hide menu icon
			$("#shownav").css('display','none');
			$("#hidenav").css('display','block');
			
};

var closesidebar = function(){
	
	   // set width
		   $(".left-nav").css('display','none');
  		    $(".navback").css('width',40+'px');
			$("#main").css('margin-left',40+'px'); 
		 // $("#main").css('margin-right',0+'px'); 
		
			// for search results
		 $("#sidebar").css('display','none');
			  $(".navbackwide").css('width',40+'px'); 
			 $("#bookContainer").css('margin-left',40+'px');
			
			$("#hidenav").css('display','none');
			$("#shownav").css('display','block');
				
				//show menu icon
				
};


$(document).ready(function(){

//////////////////////
$("#shownav").click(function(){
						   
		opensidebar();				   
						   
				});
//////////////////////
$("#hidenav").click(function(){
						   
		closesidebar();				   
						   
				});

					});	   
						   
/*responsive sidebar nav

$(document).ready(function(){

//////////////////////
$(".trig1").click(function(){
        $(".left-nav").toggle("fast"); 
        $(this).toggleClass("active"); 
        return false;
    });


///////////////////////

$("#X").click(function(){
      // trigger click is needed for css .active to work
	  $( ".trig1" ).trigger( "click" );
   return false;
    });


/////////////////////
});
*/