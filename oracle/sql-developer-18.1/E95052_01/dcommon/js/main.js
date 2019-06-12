// JavaScript Document
//May.25.2016
///////////////////////////////////

/////////////////
/////////////////  Set page content margin to header


$(document).ready(function() {
		var headerheight = ($("header").height());//+'px'
		var headercombo = (headerheight);//($headerheight + 20);
		//console.log("header height load "+headerheight);
		$("#content").css({'margin-top':(headercombo+'px')}); // 
});	


$(window).resize(function() {
		var headerheight = ($("header").height());//+'px'
		var headercombo = (headerheight);//($headerheight + 20);
		//console.log("header height resize "+headerheight);
		$("#content").css({'margin-top':(headercombo+'px')}); // 
});	
	



/////////////////
/////////////////  MatchHeight function

function resizecolumns(){
	
$('.col2equal > div').matchHeight();

// get started 
$('.gs-block-2').matchHeight();
$('.gs4b > div').matchHeight();
$('.gs-col-wrapper > div').matchHeight();

};


/////////////////
/////////////////   equalize & responsive

$(document).ready(function() {
resizecolumns();
});
$(window).resize(function() {
resizecolumns();
});






////////////////////////////////
////////////////////////////////
// begin doc ready section
$(document).ready(function(){




////////////////////////////////
// begin leftnav group
// Left Navigation

	
var sidebarfun = function(){
	      if ($(window).width() > 769) { 
		  opensidebar();
			$("#hidenav").css('display','none');
			$("#hidenavw").css('display','none');   
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
		
		// for search results  and tutorials
		$("#sidebar").css('display','block');
	 	$(".navbackwide").css('width',220+'px'); 
		$("#bookContainer").css('margin-left',220+'px'); 
		   		
		//hide menu icon
		$("#shownav").css('display','none');
		$("#hidenav").css('display','block');
		$("#hidenavw").css('display','block');
			
};

var closesidebar = function(){
	
		// set width
		   	$(".left-nav").css('display','none');
  		    $(".navback").css('width',40+'px');
			$("#main").css('margin-left',40+'px'); 
		// $("#main").css('margin-right',0+'px'); 
		
			// for search results and tutorials
			$("#sidebar").css('display','none');
			$(".navbackwide").css('width',40+'px'); 
			$("#bookContainer").css('margin-left',40+'px');
			
			$("#hidenav").css('display','none');
			$("#hidenavw").css('display','none');
			$("#shownav").css('display','block');
				
};



/////////////////
/////////////////  responsive sidebar

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



$("#shownav").click(function(){opensidebar();});

$("#hidenav").click(function(){closesidebar();});

$("#hidenavw").click(function(){closesidebar();});

sidebarfun();

// end leftnav group

////////////////////////////////
//Makes booknav sticky


var mainnav = $(".left-nav-tut");
$(window).scroll(function(){
	if( $(this).scrollTop() > 250 ) {
		//do this
		mainnav.addClass("left-nav-tutscrl");
	}else{
		mainnav.removeClass("left-nav-tutscrl");
	}		
});//end function





////////////////////////////////
//Set mobile devices settings
  

if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
	}else{
	//add css background class to form select 
	$(".SELECTLRG").addClass("SELECTLRGBG");
}


////////////////////////////////
// book page chevron handling

	$("#bookAccordion .panel-api .collapse").on('show.bs.collapse', function () {
        $(this).siblings(".panel-heading").find(".glyphicons").removeClass("glyphicons-chevron-right").addClass("glyphicons-chevron-down");
	});
	
	$("#bookAccordion .panel-api .collapse").on('hide.bs.collapse', function () {
        $(this).siblings(".panel-heading").find(".glyphicons").addClass("glyphicons-chevron-right").removeClass("glyphicons-chevron-down");
	});

	
////////////////////////////////
// get started 2 (icons) role select menu handling		

		
$('select[name="roles"]').change(function(event){
    var selected = $(this).find('option:selected');
    var value = selected.attr("value");
    var name=  $(this).attr("name");
    var selector = '[for-field="'+name+'"]';
    $('.accordion-body'+selector).addClass('collapse');
    var selectorForValue = selector+'[for-value="'+value+'"]';
    var selectedPanel = $('.accordion-body'+ selectorForValue  );
    selectedPanel.removeClass('collapse');
})


$( "#target" ).submit(function( event ) {
  alert( "Handler for .submit() called." );
  event.preventDefault();
});



//////////// end doc ready section
});








/////////////////
/////////////////   ACCESSIBILITY
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
    //console.log('something on the page just gained focus');
    // want to find the focused element?
   	// console.log( 'focused element: ' );
   // console.log( document.activeElement );

	
	var focusedElement = document.activeElement;

/////////////////  (GROUPED WITH ABOVE SCRIPT)
/////////////////   ACCESSIBILITY : Help Drawer icon color change on focus


// HELP DRAWER BUTTON 	
	if ($('#helpbutton').is(focusedElement)) {
	//change background color
  $('.helpicon').css('color','#000');
	}else{
  $('.helpicon').css('color','');
	}
/////////////////  (GROUPED WITH ABOVE SCRIPT)
/////////////////   ACCESSIBILITY HOMEPAGE : Set Background of focused element

// cloud 	
	if ($('#hm-cloud-link').is(focusedElement)) {
	//change background color
	$('#hm-cloud').css('background-color','#e4c8df');
	}else{$('#hm-cloud').css('background-color','');}


// application 	
	if ($('#hm-application-link').is(focusedElement)) {
	//change background color
	$('#hm-application').css('background-color','#c5e2f6');
	}else{$('#hm-application').css('background-color','');}

// middleware 	
	if ($('#hm-middle-link').is(focusedElement)) {
	//change background color
	$('#hm-middleware').css('background-color','#f6ccc2');
	}else{$('#hm-middleware').css('background-color','');}

// database 	
	if ($('#hm-database-link').is(focusedElement)) {
	//change background color
	$('#hm-database').css('background-color','#e7eecd');
	}else{$('#hm-database').css('background-color','');}

/*New Row*/
// bigdata 	
	if ($('#hm-bigdata-link').is(focusedElement)) {
	//change background color
	$('#hm-bigdata').css('background-color','#f6ced2');
	}else{$('#hm-bigdata').css('background-color','');}
	
// enterprise 	
	if ($('#hm-enterprise-link').is(focusedElement)) {
	//change background color
	$('#hm-enterprise').css('background-color','#fbe9c5');
	}else{$('#hm-enterprise').css('background-color','');}

// engineered 	
	if ($('#hm-engineered-link').is(focusedElement)) {
	//change background color
	$('#hm-engineered').css('background-color','#c7e7e9');
	}else{$('#hm-engineered').css('background-color','');	}
	
// java 	
	if ($('#hm-java-link').is(focusedElement)) {
	//change background color
	$('#hm-java').css('background-color','#d5e1e9');
	}else{$('#hm-java').css('background-color','');}
	
/*New Row*/
// hardware 	
	if ($('#hm-hardware-link').is(focusedElement)) {
	//change background color
	$('#hm-hardware').css('background-color','#c9e3ca');
	}else{$('#hm-hardware').css('background-color','');}

// Servers 	
	if ($('#hm-server-link').is(focusedElement)) {
	//change background color
	$('#hm-server').css('background-color','#c9e3ca');
	}else{$('#hm-server').css('background-color','');}

// Networking 	
	if ($('#hm-network-link').is(focusedElement)) {
	//change background color
	$('#hm-network').css('background-color','#f8e1ed');
	}else{$('#hm-network').css('background-color','');}

// virtualization 	
	if ($('#hm-virtualization-link').is(focusedElement)) {
	//change background color	
	$('#hm-virtualization').css('background-color','#c6e8f5');
	}else{$('#hm-virtualization').css('background-color','');}

// storage 	
	if ($('#hm-storage-link').is(focusedElement)) {
	//change background color	
	$('#hm-storage').css('background-color','#efcddf');
	}else{$('#hm-storage').css('background-color','');}

// operating 	
	if ($('#hm-operating-link').is(focusedElement)) {
	//change background color	
	$('#hm-operating').css('background-color','#fae2c3');
	}else{$('#hm-operating').css('background-color','');}

/*New Row*/
// ind 	
	if ($('#hm-ind-link').is(focusedElement)) {
	//change background color	
	$('#hm-ind').css('background-color','#c5c3df');
		}else{$('#hm-ind').css('background-color','');}
	
	


	
	 });

	 
/////////////////
/////////////////  scroll to function - extend jquery
$(document).ready(function(){	 
	 
	 jQuery.fn.extend({
	
	scrollToMe: function () {
    var x = jQuery(this).offset().top - 100;
    jQuery('html,body').animate({scrollTop: x}, 80);
}});


	 });
	 
	 

// BACKGROUND CLICK HANDLER - Picks up 'a' link inside element	 
// for high contrast and accessibility links, the link had to be on the h2.
// this makes the whole box clickable


$(document).ready(function(){		 
	
	// create link function
	function findchildlink(divclicked){ 

	 console.log("fn findchildlink called " + divclicked);
	 var firstlink =  ($(divclicked).find('a:first').attr('href'));
	 window.location = firstlink;
// return false;	 
	 }
	
	//homepage block link, find child - for accessibility
$("#hm-cloud").click(function() {findchildlink(this);});
$("#hm-application").click(function() {findchildlink(this);});
$("#hm-middleware").click(function() {findchildlink(this);});
$("#hm-database").click(function() {findchildlink(this);});
$("#hm-bigdata").click(function() {findchildlink(this);});
$("#hm-enterprise").click(function() {findchildlink(this);});
$("#hm-engineered").click(function() {findchildlink(this);});
$("#hm-java").click(function() {findchildlink(this);});
$("#hm-hardware").click(function() {findchildlink(this);});
$("#hm-virtualization").click(function() {findchildlink(this);});
$("#hm-storage").click(function() {findchildlink(this);});
$("#hm-operating").click(function() {findchildlink(this);});
$("#hm-ind").click(function() {findchildlink(this);});
$("#hm-server").click(function() {findchildlink(this);});
$("#hm-network").click(function() {findchildlink(this);});

		}); 

/////////////////
/////////////////   ACCESSIBILITY HOMEPAGE New Tabs


$(document).ready(function() {

	var panel1 = new tabpanel("tabpanel1", false);
});

//
// keyCodes() is an object to contain keycodes needed for the application
//
function keyCodes() {
	// Define values for keycodes
	this.tab        = 9;
	this.enter      = 13;
	this.esc        = 27;

	this.space      = 32;
	this.pageup     = 33;
	this.pagedown   = 34;
	this.end        = 35;
	this.home       = 36;

	this.left       = 37;
	this.up         = 38;
	this.right      = 39;
	this.down       = 40; 

} // end keyCodes

//
// tabpanel() is a class constructor to create a ARIA-enabled tab panel widget.
//
// @param (id string) id is the id of the div containing the tab panel.
//
// @param (accordian boolean) accordian is true if the tab panel should operate
//         as an accordian; false if a tab panel
//
// @return N/A
//
// Usage: Requires a div container and children as follows:
//
//         1. tabs/accordian headers have class 'tab'
//
//         2. panels are divs with class 'panel'
//
function tabpanel(id, accordian) {

	// define the class properties
	
	this.panel_id = id; // store the id of the containing div
	this.accordian = accordian; // true if this is an accordian control
	this.$panel = $('#' + id);  // store the jQuery object for the panel
	this.keys = new keyCodes(); // keycodes needed for event handlers
	this.$tabs = this.$panel.find('.tab-accessibility'); // Array of panel tabs.
	this.$panels = this.$panel.children('.panel-accessibility'); // Array of panels.

	// Bind event handlers
	this.bindHandlers();

	// Initialize the tab panel
	this.init();

} // end tabpanel() constructor

//
// Function init() is a member function to initialize the tab/accordian panel. Hides all panels. If a tab
// has the class 'selected', makes that panel visible; otherwise, makes first panel visible.
//
// @return N/A
//
tabpanel.prototype.init = function() {
	var $tab; // the selected tab - if one is selected

	// add aria attributes to the panels
	this.$panels.attr('aria-hidden', 'true');

	// get the selected tab
	$tab = this.$tabs.filter('[aria-selected="true"]');

	if ($tab == undefined) {
		$tab = this.$tabs.first();
	}

	// show the panel that the selected tab controls and set aria-hidden to false
	this.$panel.find('#' + $tab.attr('aria-controls')).attr('aria-hidden', 'false');

} // end init()

//
// Function switchTabs() is a member function to give focus to a new tab or accordian header.
// If it's a tab panel, the currently displayed panel is hidden and the panel associated with the new tab
// is displayed.
//
// @param ($curTab obj) $curTab is the jQuery object of the currently selected tab
//
// @param ($newTab obj) $newTab is the jQuery object of new tab to switch to
//
// @return N/A
//
tabpanel.prototype.switchTabs = function($curTab, $newTab) {

	// Remove the highlighting from the current tab
	$curTab.removeClass('focus');

	// remove tab from the tab order and update its aria-selected attribute
	$curTab.attr('tabindex', '-1').attr('aria-selected', 'false');

	// update the aria attributes
	
	// Highlight the new tab and update its aria-selected attribute
	$newTab.attr('aria-selected', 'true');

	// If this is a tab panel, swap displayed tabs
	if (this.accordian == false) {
		// hide the current tab panel and set aria-hidden to true
		this.$panel.find('#' + $curTab.attr('aria-controls')).attr('aria-hidden', 'true');

		// show the new tab panel and set aria-hidden to false
		this.$panel.find('#' + $newTab.attr('aria-controls')).attr('aria-hidden', 'false');
	}

	// Make new tab navigable
	$newTab.attr('tabindex', '0');

	// give the new tab focus
	$newTab.focus();

} // end switchTabs()

//
// Function togglePanel() is a member function to display or hide the panel associated with an accordian header
//
// @param ($tab obj) $tab is the jQuery object of the currently selected tab
//
// @return N/A
//
tabpanel.prototype.togglePanel = function($tab) {

	$panel = this.$panel.find('#' + $tab.attr('aria-controls'));
	console.log('563 $panel = '+$panel);
	
	if ($panel.attr('aria-hidden') == 'true') {
		console.log("566 $panel.attr false");
		//$panel.slideDown(100);
		//$panel.attr('aria-hidden', 'false');
	}
	else {
		console.log("570 $panel.attr true");
		//$panel.slideUp(100);
		//$panel.attr('aria-hidden', 'true');
	}
} // end togglePanel()

//
// Function bindHandlers() is a member function to bind event handlers for the tabs
//
// @return N/A
//
tabpanel.prototype.bindHandlers = function() {

	var thisObj = this; // Store the this pointer for reference

	//////////////////////////////
	// Bind handlers for the tabs / accordian headers

	// bind a tab keydown handler
	this.$tabs.keydown(function(e) {
		return thisObj.handleTabKeyDown($(this), e);
	});

	// bind a tab keypress handler
	this.$tabs.keypress(function(e) {
		return thisObj.handleTabKeyPress($(this), e);
	});

	// bind a tab click handler
	this.$tabs.click(function(e) {
		return thisObj.handleTabClick($(this), e);
	});

	// bind a tab focus handler
	this.$tabs.focus(function(e) {
		return thisObj.handleTabFocus($(this), e);
	});

	// bind a tab blur handler
	this.$tabs.blur(function(e) {
		return thisObj.handleTabBlur($(this), e);
	});

	/////////////////////////////
	// Bind handlers for the panels
	
	// bind a keydown handlers for the panel focusable elements
	this.$panels.keydown(function(e) {
		return thisObj.handlePanelKeyDown($(this), e);
	});

	// bind a keypress handler for the panel
	this.$panels.keypress(function(e) {
		return thisObj.handlePanelKeyPress($(this), e);
	});

} // end bindHandlers()

//
// Function handleTabKeyDown() is a member function to process keydown events for a tab
//
// @param ($tab obj) $tab is the jquery object of the tab being processed
//
// @param (e obj) e is the associated event object
//
// @return (boolean) Returns true if propagating; false if consuming event
//
tabpanel.prototype.handleTabKeyDown = function($tab, e) {

	if (e.altKey) {
		// do nothing
		return true;
	}

	switch (e.keyCode) {
		case this.keys.enter:
		case this.keys.space: {

			// Only process if this is an accordian widget
			if (this.accordian == false) {
				// display or collapse the panel
				this.togglePanel($tab);

				e.stopPropagation();
				return false;
			}

			return true;
		}
		case this.keys.left:
		case this.keys.up: {

			var thisObj = this;
			var $prevTab; // holds jQuery object of tab from previous pass
			var $newTab; // the new tab to switch to

			if (e.ctrlKey) {
				// Ctrl+arrow moves focus from panel content to the open
				// tab/accordian header.
			}
			else {
				var curNdx = this.$tabs.index($tab);

				if (curNdx == 0) {
					// tab is the first one:
					// set newTab to last tab
					$newTab = this.$tabs.last();
				}
				else {
					// set newTab to previous
					$newTab = this.$tabs.eq(curNdx - 1);
				}

				// switch to the new tab
				this.switchTabs($tab, $newTab);
			}

			e.stopPropagation();
			return false;
		}
		case this.keys.right:
		case this.keys.down: {

			var thisObj = this;
			var foundTab = false; // set to true when current tab found in array
			var $newTab; // the new tab to switch to

			var curNdx = this.$tabs.index($tab);

			if (curNdx == this.$tabs.length-1) {
				// tab is the last one:
				// set newTab to first tab
				$newTab = this.$tabs.first();
			}
			else {
				// set newTab to next tab
				$newTab = this.$tabs.eq(curNdx + 1);
			}

			// switch to the new tab
			this.switchTabs($tab, $newTab);

			e.stopPropagation();
			return false;
		}
		case this.keys.home: {

			// switch to the first tab
			this.switchTabs($tab, this.$tabs.first());

			e.stopPropagation();
			return false;
		}
		case this.keys.end: {

			// switch to the last tab
			this.switchTabs($tab, this.$tabs.last());

			e.stopPropagation();
			return false;
		}
	}
} // end handleTabKeyDown()

//
// Function handleTabKeyPress() is a member function to process keypress events for a tab.
//
//
// @param ($tab obj) $tab is the jquery object of the tab being processed
//
// @param (e obj) e is the associated event object
//
// @return (boolean) Returns true if propagating; false if consuming event
//
tabpanel.prototype.handleTabKeyPress = function($tab, e) {

	if (e.altKey) {
		// do nothing
		return true;
	}

	switch (e.keyCode) {
		case this.keys.enter:
		case this.keys.space:
		case this.keys.left:
		case this.keys.up:
		case this.keys.right:
		case this.keys.down:
		case this.keys.home:
		case this.keys.end: {
			e.stopPropagation();
			return false;
		}
		case this.keys.pageup:
		case this.keys.pagedown: {

			// The tab keypress handler must consume pageup and pagedown
			// keypresses to prevent Firefox from switching tabs
			// on ctrl+pageup and ctrl+pagedown

			if (!e.ctrlKey) {
				return true;
			}

			e.stopPropagation();
			return false;
		}
	}

	return true;

} // end handleTabKeyPress()

//
// Function handleTabClick() is a member function to process click events for tabs
//
// @param ($tab object) $tab is the jQuery object of the tab being processed
//
// @param (e object) e is the associated event object
//
// @return (boolean) returns true
//
tabpanel.prototype.handleTabClick = function($tab, e) {
console.log('start handleTabClick');
   // hide the panels
   this.$panels.attr('aria-hidden', 'true');
   var $hidepanel = this.$panels.attr('aria-hidden', 'true');
	console.log('869'+$hidepanel);
	
	// remove all tabs from the tab order and reset their aria-selected attribute
	this.$tabs.attr('tabindex', '-1').attr('aria-selected', 'false');

	
	// Update the selected tab's aria-selected attribute
	$tab.attr('aria-selected', 'true');
	console.log('877 Update the selected tabs aria-selected attribute $tab'+$tab);
	// show the clicked tab panel
	this.$panel.find('#' + $tab.attr('aria-controls')).attr('aria-hidden', 'false');

	
	// make clicked tab navigable
	$tab.attr('tabindex', '0');

	
	// give the tab focus
	$tab.focus();

	return true;

} // end handleTabClick()

//
// Function handleTabFocus() is a member function to process focus events for tabs
//
// @param ($tab object) $tab is the jQuery object of the tab being processed
//
// @param (e object) e is the associated event object
//
// @return (boolean) returns true
//
tabpanel.prototype.handleTabFocus = function($tab, e) {
console.log('start handleTabFocus');
	// Add the focus class to the tab
	$tab.addClass('focus');

	return true;

} // end handleTabFocus()

//
// Function handleTabBlur() is a member function to process blur events for tabs
//
// @param ($tab object) $tab is the jQuery object of the tab being processed
//
// @param (e object) e is the associated event object
//
// @return (boolean) returns true
//
tabpanel.prototype.handleTabBlur = function($tab, e) {

	// Remove the focus class to the tab
	$tab.removeClass('focus');

	return true;

} // end handleTabBlur()


/////////////////////////////////////////////////////////
// Panel Event handlers
//

//
// Function handlePanelKeyDown() is a member function to process keydown events for a panel
//
// @param ($elem obj) $elem is the jquery object of the element being processed
//
// @param (e obj) e is the associated event object
//
// @return (boolean) Returns true if propagating; false if consuming event
//
tabpanel.prototype.handlePanelKeyDown = function($elem, e) {
console.log('start handlePanelKeyDown');
	if (e.altKey) {
		// do nothing
		return true;
	}

	switch (e.keyCode) {
		case this.keys.esc: {
			e.stopPropagation();
			return false;
		}
		case this.keys.left:
		case this.keys.up: {

			if (!e.ctrlKey) {
				// do not process
				return true;
			}
	
			// get the jQuery object of the tab
			var $tab = $('#' + $elem.attr('aria-labelledby'));

			// Move focus to the tab
			$tab.focus();

			e.stopPropagation();
			return false;
		}
		case this.keys.pageup: {

			var $newTab;

			if (!e.ctrlKey) {
				// do not process
				return true;
			}

			// get the jQuery object of the tab
			var $tab = this.$tabs.filter('[aria-selected="true"]');

			// get the index of the tab in the tab list
			var curNdx = this.$tabs.index($tab);

			if (curNdx == 0) {
				// this is the first tab, set focus on the last one
				$newTab = this.$tabs.last();
			}
			else {
				// set focus on the previous tab
				$newTab = this.$tabs.eq(curNdx - 1);
			}

			// switch to the new tab
			this.switchTabs($tab, $newTab);

			e.stopPropagation();
			e.preventDefault();
			return false;
		}
		case this.keys.pagedown: {

			var $newTab;

			if (!e.ctrlKey) {
				// do not process
				return true;
			}

			// get the jQuery object of the tab
			var $tab = $('#' + $elem.attr('aria-labelledby'));

			// get the index of the tab in the tab list
			var curNdx = this.$tabs.index($tab);

			if (curNdx == this.$tabs.length-1) {
				// this is the last tab, set focus on the first one
				$newTab = this.$tabs.first();
			}
			else {
				// set focus on the next tab
				$newTab = this.$tabs.eq(curNdx + 1);
			}

			// switch to the new tab
			this.switchTabs($tab, $newTab);

			e.stopPropagation();
			e.preventDefault();
			return false;
		}
	}

	return true;

} // end handlePanelKeyDown()

//
// Function handlePanelKeyPress() is a member function to process keypress events for a panel
//
// @param ($elem obj) $elem is the jquery object of the element being processed
//
// @param (e obj) e is the associated event object
//
// @return (boolean) Returns true if propagating; false if consuming event
//
tabpanel.prototype.handlePanelKeyPress = function($elem, e) {

	if (e.altKey) {
		// do nothing
		return true;
	}

	if (e.ctrlKey && (e.keyCode == this.keys.pageup || e.keyCode == this.keys.pagedown)) {
			e.stopPropagation();
			e.preventDefault();
			return false;
	}

	switch (e.keyCode) {
		case this.keys.esc: {
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
	}

	return true;

} // end handlePanelKeyPress()

// focusable is a small jQuery extension to add a :focusable selector. It is used to
// get a list of all focusable elements in a panel. Credit to ajpiano on the jQuery forums.
//
$.extend($.expr[':'], {
	focusable: function(element) {
		var nodeName = element.nodeName.toLowerCase();
		var tabIndex = $(element).attr('tabindex');

		// the element and all of its ancestors must be visible
		if (($(element)[nodeName == 'area' ? 'parents' : 'closest'](':hidden').length) == true) {
			return false;
		}

		// If tabindex is defined, its value must be greater than 0
		if (!isNaN(tabIndex) && tabIndex < 0) {
			return false;
		}

		// if the element is a standard form control, it must not be disabled
		if (/input|select|textarea|button|object/.test(nodeName) == true) {

	       		return !element.disabled;
		}

		// if the element is a link, href must be defined
		if ((nodeName == 'a' ||  nodeName == 'area') == true) {

			return (element.href.length > 0);
		}
		    	   
		// this is some other page element that is not normally focusable.
		return false;
	}
});





//}); 