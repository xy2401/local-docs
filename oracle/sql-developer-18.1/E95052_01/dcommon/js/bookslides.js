// JavaScript Document
// April 17 2017



$(document).ready(function() {

console.log = function() {} // supress all console.logs


console.log(" ********  Running from doc ready");


	//To store timeout id
	var timeoutId;
	
	// Disable Previous Button On Page Load
	$('.SS-prev').prop('disabled', true);	
	$('.SS-next').prop('disabled', false);	



/////////////////////////////////////////////////////////////////
///// Check and resize hotspots with Container ID
/////////////////////////////////////////////////////////////////


window.refreshmap = function(containerID){

	// figure out if image used has a map assigned based on container id.

	console.log("Start of refreshmap: containerID is: "+containerID);

	// what if container id is undefined?
	if(containerID == undefined){
				
				console.log(" ****** error containerID is undefined "+containerID);

  				$(containerID + ' .SS-prev').prop('disabled', true);	
				}else{
				$(containerID + ' .SS-prev').prop('disabled', false);	
				
				};
	



	// loop each a tag in hot links - get id then use (this)
	var hotspots = $(containerID + ' .SS-item:visible > .hotspots ').find('a').each(function(){	
   	console.log("for loop this="+ this);
  

  	// for( i=0; i< hotspots.length; i++ )
	//{


 var coords = $(this).attr("data-coords");
	console.log("coords ="+ coords);



////////////////  get ratio of resized image to the source.

	
	// get image current width to see if resized
	var currentImage = $(containerID + ' .SS-item:visible > img');
		console.log("currentImage is "+currentImage.attr('src'));

		currentImageWidth = $(containerID + ' .SS-item:visible > img').width(); 
		console.log("*** containerID= "+containerID+"currentImageWidth is: "+ currentImageWidth);
	 

	// is zero
	if (currentImageWidth == 0){
    console.log("currentImageWidth is 0, which means it hasn't loaded yet")
    //currentImageWidth = 1;
	}

	// get the images original with and heigh to compare
	var imgwidth = $(containerID + ' .SS-item:visible > img').get(0).naturalWidth; 
		console.log("naturalWidth is: "+imgwidth);	

	if (imgwidth == 0){
    console.log("imgwidth set to 1")
    imgwidth = 1;
}

	//calculate ratio based on widths.
	var ratio = (currentImageWidth/imgwidth);
		console.log("ratio is: "+ratio);



////////////////


	// Get coordinates from <a tag
	// create array and position div
	var array = coords.split(',');
		//console.log("array 0 ="+ array[0]);
		//console.log("array 1 ="+ array[1]);
		//console.log("array 2 ="+ array[2]);
		//console.log("array 3 ="+ array[3]);
	//
	//$('#'+hotlinkid).css({left: array[0]+'px', top: array[1]+'px', width: array[2]+'px', height: array[3]+'px'}); 
	$(this).css({left: (array[0] * ratio)+'px', top: (array[1] * ratio)+'px', width: (array[2] * ratio)+'px', height: (array[3] * ratio)+'px'}); 




});	


}


/////////////////////////////////////////////////////////////////
///// Call refresh map on first load and pass Container ID
/////////////////////////////////////////////////////////////////



// On first load, in doc ready, add "display:block;" to first item of each of the SS-items. 
$('.SS-items' ).each(function() {
 		
 		 //set first ss-item to block
 		//$(this).find(".SS-item").css("display","block");
 		$(this).find(".SS-item" ).first().css("display","block");
 		console.log("first run this "+this);

 		// and then call resize so fist slide's hotspot responsive
 		var containerID = $(this).parent().attr("id"); 
 		console.log("first run this containerID "+'#'+containerID);
		window.refreshmap('#'+containerID);
	});




// how to call highlightarea without containerID on first load 
var findShows = $('.SS-items').each(function(){	
var	thisParentID = $(this).parent().attr("id");
console.log("this.parent attr ID"+ thisParentID);
window.refreshmap('#'+thisParentID);	
});


/////////////////////////////////////////////////////////////////
///// Check for image map with Container ID
/////////////////////////////////////////////////////////////////


window.highlightarea = function(containerID){

	// figure out if image used has a map assigned. 
	
	// First find the container we are working with
	

	//var containerID = '#'+findid;
	console.log("containerID"+containerID);
	
	// now that i hvae the container, see if the current image has a map
	var currentMap = $(containerID + ' .SS-item:visible').find('img').attr('usemap');
	console.log("currentMap"+currentMap);

	//check if current slide is active or it will show on all slides



	var test1 = $(containerID).find(currentMap);
	console.log("test1"+test1)
	$(currentMap).find("area").each(function() {
	console.log("test1"+test1)
	});

	// get the coordiantes from area 	
	var cords = $(containerID).find(currentMap).find('area').attr('coords').split(',');
	console.log("cords"+cords);

	// get href of map
	var mapHref = $('#'+areaID).attr('href');

	 
	// add a div, and apply coordiantes to it.
	$(".SS-item").append('<a class="a1"></a>');
	
	// apply coordiantes to .href1
    $('.a1').attr('style', 'left:'+cords[0]+'px; top:'+cords[1]+'px; width:'+ (cords[2]-cords[0]) +'px; height:'+ (cords[3]-cords[1]) +'px')
    // apply href to href1
	$('.a1').attr('href', mapHref);
	
	// to do: create a 'for each' loop for each map and area inside map
	
    //TEST:
    console.log(areaID);

}

/////////////////////////////////////////////////////////////////
///// End Image map check
/////////////////////////////////////////////////////////////////



	// Disable Previous 
	var checkPrevious = function(slideNum,containerID){
		
			if(slideNum == 0){
  				$(containerID + ' .SS-prev').prop('disabled', true);	
				}else{
				$(containerID + ' .SS-prev').prop('disabled', false);	
			};		
					
			//console.log("checkPrevious: slide="+ slideNum +" / containerID ="+containerID);
	};

	// Disable Next
	var checkNext = function(slideNum,containerID){

					
	//count the total number of nodes (SS-items)
	var countSSitems = $(containerID + ' .SS-items').children().length;

				if(slideNum+1 == countSSitems){
	  				 $(containerID + ' .SS-next').prop('disabled', true);	
				}else{
					 $(containerID + ' .SS-next').prop('disabled', false);	
				}
				
			//console.log("checkNext: slide="+slideNum+" countSSitems ="+countSSitems+" containerID ="+containerID);
	};
	

	// Accessibility: Set Focus To Main Object On Button Click
	var setFocus = function(focusOn){
            $(focusOn).attr('tabindex', -1).on('blur focusout', function () {
            // when focus leaves this element, 
            // remove the tabindex attribute
            $(this).removeAttr('tabindex');
            }).focus(); // focus on focusOn
        };
		

	// go to slide by name function
	window.gotoslide = function(filename){
	//needs "window." to make it global for onClick to work

	// if images used, find containter id
	var findid = $("img[src*='"+filename+"']").parent().parent().parent().closest("div").attr("id");	

	// if SVG used, find containter id
	if (findid == undefined){	
	var findid = $("object[data*='"+filename+"']").parent().parent().parent().parent().closest("div").attr("id");
	}

	var containerID = '#'+findid ;

	//Clear timeout if any
	clearTimeout(timeoutId);
	
    
	// hide current image
	$(containerID + ' .SS-item:visible').hide();
	
	// FIND OBJECT AND SHOW PARENT 
	//show image by filename
	$("img[src*='"+filename+"']").parent(".SS-item").show();
	
	//if it is an svg using object
	$("object[data*='"+filename+"']").parent().parent(".SS-item").show();

	//After item is shown, reset the index
	var indx = $(containerID + '  .SS-item:visible').index();

	var slidenumber = (indx +1);//zero based counting system
	$(containerID + ' .slidestatus').html("Slide "+slidenumber);
	
	
	var currentItem = (containerID +' .SS-item')



	//Call function to set focus to slide status
	setFocus(currentItem); 
	
	
	checkPrevious(indx,containerID);
	checkNext(indx,containerID);
	
	//Call image map function now that you know the containerID
     //highlightarea(containerID);
 	
 	// Call refresh map after 'go to slide'
	window.refreshmap(containerID);	



	}//end function
	


/////////////////////////////////////////////////////////////////
///// Main Next Slide Function
/////////////////////////////////////////////////////////////////
	
	
	window.slideImage = function( step, play, id) {

	//console.log("10: start slide image (" + id + " " + step + " " +  play + ")");
    // var step is current step/image number
    if (step == undefined)	{ console.log("error"); step = 1;}
    if (play == undefined)	{ console.log("error"); play = "play";}
    if (id == undefined)	{ console.log("error"); id = "";} // do more here later :)
    
	var containerID = '#'+id ;


    //var indx = 0;
    //Clear timeout if any
    clearTimeout ( timeoutId );
	
	//Get current image's index    
	var currentItemVis = $(containerID + ' .SS-item:visible');
	var indx =  $( containerID +' .SS-item' ).index( currentItemVis  );	

	var currentItem = (containerID +' .SS-item');
	
    if (step != 0) {
    //Fadeout this item
    //$('.SS-item:visible').fadeOut(0);
    $('#' + id + ' .SS-item:visible').hide();
    //$('#' + id + ' .SS-item:visible').fadeOut(1);// Fade out is smoother for animations, but requires absolute position
    }

   indx = (indx + step);

    // Check bounds for next item
    if (indx >= $(containerID + ' .SS-item').length) {
		indx = 0;
    } else if (indx < 0) {
		indx = $('#' + id + ' .SS-item').length - 1;
    }

		//If step == 0, we don't need to do any fadein our fadeout
		if (step != 0) {
		//Fadein next item
		//$('.SS-item:eq(' + indx + ')').fadeIn();
		//console.log("43: Target id " + id);
		$(containerID + ' .SS-item:eq(' + indx + ')').show();
		
		//disable next or previous buttons
		checkPrevious(indx,containerID);
		checkNext(indx,containerID);
		
		//Call image map function now that you know the containerID
     	//highlightarea(containerID);	
		window.refreshmap(containerID);	

		//Call function to set focus to slide status
		setFocus(currentItem); 
				

	
	  
    }

    // set html of status text to current step
    if (play == "stop") {
      $(containerID + ' .slidestatus').html("Slide " + (indx + 1));  
    }
	
	
	



    // get the speed from the data attributes
    // var slideshowjd = ('#' + id); //document.getElementById(id);

    //Get the "rate" from data attribute "speed".
    var rate = $(containerID).data('speed')
    if (rate == undefined) {
      rate = "100";// default
    }


    //Set timeout
    if (play == "play") {
    
      //timeoutId = setTimeout ( slideImage, rate );
      timeoutId = setTimeout(function() {
      slideImage(1, play, id);
      }, rate)

      //set html of status text
      $(containerID + ' .slidestatus').html('Playing');
    }


  };

/////////////////////////////////////////////////////////////////
///// SVG highlights called from AI svg interactivity with:
///// window.parent.highlightsvg(evt);
/////////////////////////////////////////////////////////////////



window.highlightsvg = function(evt){
evt.target.style.cursor='pointer';
evt.target.setAttribute('opacity', '.5');
evt.target.setAttribute('stroke-width', '2');
evt.target.setAttribute('stroke', 'red');

	};
window.highlightsvgoff = function(evt){
evt.target.style.cursor='pointer';
evt.target.setAttribute('opacity', '100');
evt.target.setAttribute('stroke-width', '1');
evt.target.setAttribute('stroke', '#778CE0');

//evt.target.setAttribute('fill', 'yellow');
	};



  
/////////////////////////////////////////////////////////////////
///// Button click Functions
/////////////////////////////////////////////////////////////////


  // When PREV button is clicked
  $('.SS-prev').click(function() {
    //get parent id
    var id = $(this).closest("div").attr("id");
    //slideImage with step = -1
    slideImage(-1, "stop", id);
  });
  
  
  // When NEXT button is clicked
  $('.SS-next').click(function() {
    //get parent id
    var id = $(this).closest("div").attr("id");
    //slideImage with step = 1
    slideImage(1, "stop", id);
  });

  
   // When PLAY button is clicked
  $('.SS-play').click(function() {
    //get parent id
    var id = $(this).closest("div").attr("id");
    //Start slide image
    slideImage(0, "play", id);
  });

  
  // When PAUSE button is clicked
  $('.SS-pause').click(function() {
    //Clear timeout
    clearTimeout(timeoutId);
    //get parent id
    var id = $(this).closest("div").attr("id");
    //set status text to paused
    $("#"+id + ' .slidestatus').html('Paused');
  });


}); // end doc ready



// need to make hotspots responsive.

$(window).resize(function() {
console.log(" **************  Running from window resize");
// for each ss-items, parent ID and pass it to the resize function
var findShows = $('.SS-items').each(function(){	
var	thisParentID = $(this).parent().attr("id");
console.log("this.parent attr ID "+ thisParentID);
window.refreshmap('#'+thisParentID);	
});
	}); // end window resize 


//scripts ran before images were loaded, so for the frist hotspot to be responsive, script must run after page load. 

$(window).load(function(){
console.log(" **************  Running from window load");

// for each ss-items, parent ID and pass it to the resize function
var findShows = $('.SS-items').each(function(){	
var	thisParentID = $(this).parent().attr("id");
console.log("this.parent attr ID "+ thisParentID);
window.refreshmap('#'+thisParentID);	
});
	}); // end window load 





