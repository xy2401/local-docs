$(document).ready(function() {
	
	 function openLinkExternal(link)
		    {
		    	// The function dialogOpenLinkExternalCallback(link) will be injected into
		    	// this page at runtime by the R4 Desktop client. If it exists, call it on both
		    	// Mac and Windows. If it does not exist then the page is either being viewed
		    	// by an older Desktop client, or maybe directly in a browser. In that case
		    	// fall back to window.open() or some other way of opening the page.
		    	if (typeof dialogOpenLinkExternalCallback == 'function')
		    	{
		    		dialogOpenLinkExternalCallback(link);
		    	}
		    	else 
		    	{
		    		var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
		    		if (isMac)
		    		{
		    			// With the embedded help dialog, the Mac HTML dialog control cannot open in a new
		    			// browser window and the only choice is to open in the current window
		    			window.open(link, "_self");
		    		}
		    		else
		    		{
		    			// Windows supports opening a new page
		    			window.open(link, "_blank");
		    		}
		    	}
		    }
			
				
});