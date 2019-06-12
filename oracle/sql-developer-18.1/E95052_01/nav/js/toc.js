/*
  Copyright 2011, 2012, Oracle and/or its affiliates. All rights reserved.
  Author: John Russell
  Version: 2012.11.19
*/

/*
Expand or collapse a node in a tree view, or a show or hide a block element
on a page.
*/

var former;

function $(param)
{
	 return document.getElementById(param);
}
function $$(param)
{
	 return document.getElementsByTagName(param);
}

function visitTopic(frame, where, id)
{
/*
	If we cannot run because of an unsupported bit of Javascript, bow out now.
*/

	if (!$$ || !$)
	{
		return true;
	}

/*
	Change the background color of the link with the specified ID.
	But only if we're in the framed view.  Otherwise, the tree is about
	to disappear and get redrawn when we jump to the new page.
*/
	var divs;
//	if (top != self)
	{
		if ($$)
		{
			divs = $$("div");

			var progress = "";

			if (divs != null && divs.length > 0)
			{
				for (i = 0; i < divs.length; i++)
				{
					var currentDiv = divs[i];
					if ((currentDiv.id != null) && (currentDiv.id.match(/^div[0-9]+$/)))
					{
	//!! Internet Explorer doesn't like the value "inherit".
						currentDiv.style.backgroundColor = "#fff";
						progress += ".";
					}
				}
	//			alert("Changed div background colors to inherit: " + progress);
			}
		}

		var visitedTopic;
		if ($)
		{
			visitedTopic = $("div"+id);

			if (visitedTopic != null)
			{
	//				if (visitedTopic.style.backgroundColor)
	//				{
	//					visitedTopic.style.backgroundColor = "#f7f7e7";
						visitedTopic.style.backgroundColor = "#e6e6ef";
	//				}
	//				else if (visitedTopic.style.setProperty)
	//				{
	//					visitedTopic.style.setProperty("backgroundColor","#f7f7e7",null);
	//				}
	//				else if (visitedTopic.bgColor)
	//				{
	//					visitedTopic.bgColor = "#f7f7e7";
	//				}
	//				else
	//				{
	//!! IE reaches this point.
	//					alert("None of the usual style-setting options are available");
	//				}
			}
			else
			{
				alert("No visited topic to highlight");
			}
		}
		else
		{
			alert("No browser support for getElementById");
		}
	}

	if (parent.frames[frame])
	{
		document.lastVisitedTopic = where;
		parent.frames[frame].location = where;
	}
	else
	{
/*		alert("We are not actually inside a frame"); */
		where = where.replace(/frame=right/,"frame=");
		document.lastVisitedTopic = where;
		document.location = where;
	}

	return true;
}

function noFrames()
{
//	alert("About to hide frames...");
	if (document.lastVisitedTopic)
	{
//		alert("Setting window URL to last visited topic (" + document.lastVisitedTopic + "...");
		var unframedTopic = document.lastVisitedTopic;
		if (unframedTopic.match(/frame=right/))
		{
/*			alert("Mangling URL for better unframed experience..."); */
			unframedTopic = unframedTopic.replace(/frame=right/,"frame=");
		}
		top.location = unframedTopic;
	}
	else
	{
//		alert("Setting window URL to default (homepage)...");
//		top.location = "homepage";
		top.location = "portal.portal_db?selected=1&frame=";
	}
	return false;
}

function reFrame()
{
//	alert("About to show frames...");

	top.location = "portal.portal_db";
	return false;

	if (document.lastVisitedTopic)
	{
		var unframedTopic = document.lastVisitedTopic;
		if (unframedTopic.match(/frame=right/))
		{
			unframedTopic = unframedTopic.replace(/frame=right/,"frame=");
		}
		top.location = unframedTopic;
	}
	else
	{
		top.location = "portal.portal_db";
	}
	return false;
}

function flipEntry(name)
{
	var item = $(name);
	var showlink = $(name + '_show');
	var hidelink = $(name + '_hide');
	if (showlink == null)
	{
		alert("Can't find requested element " + name + "_show");
	}
	if (hidelink == null)
	{
		alert("Can't find requested element " + name + "_hide");
	}
	if (showlink == null || hidelink == null)
	{
		throw RangeError;
		return;
	}

	if (item.style.display == 'none')
	{
		item.style.display = former;
		hidelink.style.display = '';
		showlink.style.display = 'none';

	}
	else
	{
		former = item.style.display;
		item.style.display = 'none';
		hidelink.style.display = 'none';
		showlink.style.display = '';
	}
}

/* Force item to be hidden. */

function hideEntry(name)
{
	var item = $(name);
	var showlink = $(name + '_show');
	var hidelink = $(name + '_hide');
	if (showlink == null)
	{
		alert("Can't find requested element " + name + "_show in hideEntry()");
	}
	if (hidelink == null)
	{
		alert("Can't find requested element " + name + "_hide in hideEntry()");
	}
	if (showlink == null || hidelink == null)
	{
		throw RangeError;
		return;
	}

	if (item.style.display == 'none')
	{
		;
	}
	else
	{
		former = item.style.display;
		item.style.display = 'none';
		hidelink.style.display = 'none';
		showlink.style.display = '';
	}
}

/* Force item to be visible. */

function showEntry(name)
{
	var item = $(name);
	var showlink = $(name + '_show');
	var hidelink = $(name + '_hide');
	if (showlink == null)
	{
		alert("Can't find requested element " + name + "_show in showEntry()");
	}
	if (hidelink == null)
	{
		alert("Can't find requested element " + name + "_hide in showEntry()");
	}
	if (showlink == null || hidelink == null)
	{
		throw RangeError;
		return;
	}

	if (item.style.display == 'none')
	{
		item.style.display = former;
		showlink.style.display = 'none';
		hidelink.style.display = '';
	}
	else
	{
		;
	}
}

/* Switch back to a single-frame view. */
function hideFrames()
{
//	alert("Asked to close frames...");

//	alert("Old location: " + window.parent.location);
//	alert("New location: " + parent.frames[1].location);

  window.parent.location.href = parent.frames[1].location.href;
}
