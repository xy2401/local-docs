// JavaScript Document

$(document).ready(function() {
	
//SET TAB BY ADDING ?tab=2  http://www.com?tab=1	

	if(window.location.href.indexOf("tab") > -1) {
      
	 // alert("YES, your url contains the tab var");
   	$.urlParam = function(name){
    var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    if(results === null){ return 0; }else {
    return results[1] || 0;}}
 
	// example.com?tab=1
	$.urlParam('tab');        // 1
// set variable to url string value
	var urlAttrValue = ("#tab"+($.urlParam('tab')));  
	if(document.getElementById("pn"+($.urlParam('tab'))) !== null && document.getElementById("pn"+($.urlParam('tab'))) !== undefined) {
    	if(document.getElementById("libpn") !== null && document.getElementById("libpn") !== undefined && document.getElementById("pn"+($.urlParam('tab'))).innerHTML !== null) {
			document.getElementById("libpn").innerHTML = document.getElementById("pn"+($.urlParam('tab'))).innerHTML;
			if(document.getElementById("productSearch") !== null && document.getElementById("productSearch") !== undefined) {
				document.getElementById("productSearch").value = document.getElementById("pn"+($.urlParam('tab'))).innerHTML;
			}
    	}
    }   
	   
    }else{
	//alert("your url DOES NOT contains the tab var");
	// set variable to Tab 1 if url string doesn't exist
	var urlAttrValue = "#tab1";
    if(document.getElementById("pn1") !== null && document.getElementById("pn1") !== undefined) {
		if(document.getElementById("libpn") !== null && document.getElementById("libpn") !== undefined && document.getElementById("pn1").innerHTML !== null) {
			document.getElementById("libpn").innerHTML = document.getElementById("pn1").innerHTML;
			if(document.getElementById("productSearch") !== null && document.getElementById("productSearch") !== undefined) {
				document.getElementById("productSearch").value = document.getElementById("pn1").innerHTML;
			}
		}
	}
	};
	



	     // Show/Hide Tabs Content
        $('.tabs ' + urlAttrValue).show().siblings().hide();
        $('.tabs-home ' + urlAttrValue).show().siblings().hide();
        // Change/remove current tab to active
         $('a[href=' + urlAttrValue +']').parent('li').addClass('active').siblings().removeClass('active');
 
        //e.preventDefault();
		
});	
		

$(document).ready(function() {
		
//////////on click function for tabs
    $('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = $(this).attr('href');

 //alert(currentAttrValue);
         // Show/Hide Tabs Content
        $('.tabs ' + currentAttrValue).show().siblings().hide();
        //window.location.search = "?tab="+currentAttrValue.replace("#tab","");
        if(history.replaceState) {
        if (currentAttrValue.replace("#tab","") === "1") {
            var uri = window.location.toString();
            if (uri.indexOf("?") > 0) {
                var clean_uri = uri.substring(0, uri.indexOf("?"));
                window.history.replaceState({}, document.title, clean_uri);
            }
            if(document.getElementById("pn1") !== null && document.getElementById("pn1") !== undefined) {
            	if(document.getElementById("libpn") !== null && document.getElementById("libpn") !== undefined && document.getElementById("pn1").innerHTML !== null) {
					document.getElementById("libpn").innerHTML = document.getElementById("pn1").innerHTML;
					if(document.getElementById("productSearch") !== null && document.getElementById("productSearch") !== undefined) {
						document.getElementById("productSearch").value = document.getElementById("pn1").innerHTML;
					}
            	}
            }
        } else {
        	if(document.getElementById("pn"+currentAttrValue.replace("#tab","")) !== null && document.getElementById("pn"+currentAttrValue.replace("#tab","")) !== undefined) {
            	if(document.getElementById("libpn") !== null && document.getElementById("libpn") !== undefined && document.getElementById("pn"+currentAttrValue.replace("#tab","")).innerHTML !== null) {
					document.getElementById("libpn").innerHTML = document.getElementById("pn"+currentAttrValue.replace("#tab","")).innerHTML;
					if(document.getElementById("productSearch") !== null && document.getElementById("productSearch") !== undefined) {
						document.getElementById("productSearch").value = document.getElementById("pn"+currentAttrValue.replace("#tab","")).innerHTML;
					}
            	}
            }
          	history.replaceState({"page": "Oracle Document"}, "Replace previous URL", "?tab="+currentAttrValue.replace("#tab",""));
          }
        }
        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');

        e.preventDefault();
		
    });
});



/*tabs home*/
$(document).ready(function() {
    $('.tab-home a').on('click', function(e)  {
        var currentAttrValue = $(this).attr('href');
 
        // Show/Hide Tabs
        $('.tabs-home ' + currentAttrValue).show().siblings().hide();
        if(history.replaceState) {
        if (currentAttrValue.replace("#tab","") === "1") {
            var uri = window.location.toString();
            if (uri.indexOf("?") > 0) {
                var clean_uri = uri.substring(0, uri.indexOf("?"));
                window.history.replaceState({}, document.title, clean_uri);
            }
        } else {
          	history.replaceState({"page": "Oracle Document"}, "Replace previous URL", "?tab="+currentAttrValue.replace("#tab",""));
          }
        }
        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');

        e.preventDefault();
    });
});