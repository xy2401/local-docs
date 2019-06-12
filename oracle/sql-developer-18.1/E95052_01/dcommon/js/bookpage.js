// JavaScript Document

$(document).ready(function () {
	
	
 var $sidebar = $('#sidebar'), $splitter = $('#splitter'), $bar1 = $('#bar1'), $bar2 = $('#bar2'), $navbackwide = $('.navbackwide'), $bookContainer = $('#bookContainer');
   
$('#splitter').click(function() {
  var clicks = $(this).data('clicks');
  if (clicks) {
   // alert('odd number of clicks');
   	//open
	
            $('#toctoggle').attr("src","dcommon/img/toc-close.png");
			
			$sidebar.animate({ width: 'show' }, 500);
			$navbackwide.animate({ width: 'show' }, 500);
			$bar1.animate({ width: '220px' }, 400);
			
			$bar2.animate({ marginLeft: '220px' }, 400);
			$bookContainer.animate({ marginLeft: '220px' }, 400);
  
   
  } else {
    //alert('even number of clicks');
 //closed
 
 			$('#toctoggle').attr("src","dcommon/img/toc-open.png");
			       
			$sidebar.animate({ width: 'hide' }, 300);
			$navbackwide.animate({ width: 'hide' }, 300);
			$bar1.animate({ width: '40px' }, 400);
						
			$bar2.animate({ marginLeft: '40px' }, 400);
			$bookContainer.animate({ marginLeft: '0px' }, 400);
	
  }
  $(this).data("clicks", !clicks);
});

});