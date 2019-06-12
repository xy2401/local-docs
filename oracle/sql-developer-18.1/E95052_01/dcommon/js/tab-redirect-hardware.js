// JavaScript Document 
/*   
Version:  2016.June.24 
*/

$(document).ready(function() {
	
//SET TAB BY ADDING ?tab=2  

function getQueryStringArray(){
    var assoc=[]; 
    var items = window.location.search.substring(1).split('&'); 
    for(var j = 0; j < items.length; j++) { 
       var a = items[j].split('='); assoc[a[0]] = a[1]; 
    }
    return assoc;
	console.log(assoc);
}

// set action for url attribute
var qs = getQueryStringArray();
var url = '';
if (qs.tab !== 'undefined' && qs.tab) {
   switch (qs.tab) {
      case '7':
        url = "/en/networking";
        break;
      default:
        url = "/en/servers";
   }
 } else {
        url = "/en/servers";
   }
   window.location.href = url; //reroute
		
});	
		
