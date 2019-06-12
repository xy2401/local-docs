/*
  Version: 2013.11.21
  Author: Robert Crews
  Copyright 2014, Oracle and/or its affiliates. All rights reserved.
*/

var callevent, element, classToSet;

function increaseHeight() {
  "use strict";
  var toShowIDName = "#" + element.id;
  if (!element.id.match(/^subexpandable/)) {
    $(toShowIDName).width("100%");
  } else {
    $(toShowIDName).width("100%");
  }
  $(toShowIDName).slideDown("slow");
  element.className = classToSet;
  return;
}

function decreaseHeight() {
  "use strict";
  var toShowIDName = "#" + element.id;
  if (!element.id.match(/^subexpandable/)) {
    $(toShowIDName).width("100%");
  } else {
    $(toShowIDName).width("100%");
  }
  $(toShowIDName).slideUp("slow");
  element.className = classToSet;
  return;
}

function expandCollapseText(show) {
  "use strict";
  var dowhat, getdid, iP, eb, i;
  eb = document.getElementsByTagName("div");
  for (i in eb) {
    if (eb.hasOwnProperty(i)) {
      if ((eb[i].className === "visible" || eb[i].className === "invisible")) {
        if (show) {
          element = eb[i];
          classToSet = 'visible';
          increaseHeight();
        } else {
          element = eb[i];
          classToSet = 'invisible';
          decreaseHeight();
        }
        dowhat = (show ? "collapse" : "expand");
        getdid = eb[i].id;
        if (getdid.match(/^expandable/)) {
          getdid = getdid.replace(/expandable/, "p");
          iP = document.getElementById(getdid);
          iP.onclick = function () {collapseList(this, dowhat); };
          if (show) {
            iP.className = "barclicked";
          } else {
            iP.className = "bar";
          }
        }
      }
    }
  }
}

function anyExpanded() {
  "use strict";
  var what = "Expand All", i, eb;
  eb = document.getElementsByTagName("div");
  for (i in eb) {
    if (eb.hasOwnProperty(i)) {
      if (eb[i].className === "visibles") {
        what = "Collapse All";
        break;
      }
    }
  }
  toggleMainText(what);
  return;
}

function toggle() {
  "use strict";
  var state = document.getElementById("currentState");
  if (state.innerHTML === "Expand All") {
    state.innerHTML = "Collapse All";
    expandCollapseText(true);
    subExpandCollapseText(true);
  } else {
    state.innerHTML = "Expand All";
    subExpandCollapseText(false);
    expandCollapseText(false);
  }
}

function toggleMainText(text) {
  "use strict";
  var state = document.getElementById("currentState");
  state.innerHTML = text;
}

function createCookie(name, value, days) {
  "use strict";
  var date, expires = "";
  if (days) {
    date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  "use strict";
  var i = 0, c, nameEQ = name + "=", ca = document.cookie.split(";");
  for (i = 0; i < ca.length; i += 1) {
    c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return "";
}

function addCollapseListHandler() {
  "use strict";
  var d = document.getElementById("DOC"), e, ip, i, browser, updiv, leftdiv, rightdiv;
  d.insertBefore(document.createElement("br"), d.firstChild);
  updiv = document.createElement("div");

  leftdiv = document.createElement("div");
  leftdiv.style.styleFloat = 'left';
  leftdiv.style.cssFloat = 'left';  

  rightdiv = document.createElement("div"); 
  rightdiv.style.styleFloat = 'right';
  rightdiv.style.cssFloat = 'right';  
   
  e = document.createElement("a");
  e.setAttribute("href", "javascript:toggle()");
  e.setAttribute("id", "currentState");
  e.appendChild(document.createTextNode("Expand All"));
  leftdiv.appendChild(e);

  browser = document.createElement("a");
  browser.setAttribute("href", "../../index.htm");
  browser.onclick = function () {
      createCookie("MOBILE_PREF", "regular");
      window.location = "../../index.htm";
  };

  browser.setAttribute("id", "browserchoice");
  browser.appendChild(document.createTextNode("Browser Interface"));
  rightdiv.appendChild(browser);
  
  updiv.appendChild(leftdiv);
  updiv.appendChild(rightdiv);
  
  d.insertBefore(updiv, d.firstChild);
  
  ip = document.getElementsByTagName("p");
  for (i = 0; i < ip.length; i = i + 1) {
    if (ip[i].className.match(/bar$/)) {
      ip[i].onclick = function () {collapseList(this, 'expand'); };
    }
  }
  expandCollapseText(false);
  subExpandCollapseText(false);
}

function collapseList(node, action) {
  "use strict";
  var i, getdivid = node.id, idiv, subdivhere, subdivs, rgxp, subDivsToLookFor, subs, get2maindiv, mainDivID, thePs;
  if (getdivid.match(/^p/)) {
    if (action === 'expand') {
      subExpandCollapseText(false); // when a node is collapsed, collapse all its sub nodes
      expandCollapseText(false);
      if (getdivid.match(/^p/)) {
        getdivid = getdivid.replace(/p/, "expandable");
        idiv = document.getElementById(getdivid);
        node.className = "barclicked";
        element = idiv;
        classToSet = "visible";
        increaseHeight();
        node.onclick = function () {collapseList(this, 'collapse'); };
      }
    } else {
      if (getdivid.match(/^p/)) {
        subs = document.getElementById(getdivid);
        subDivsToLookFor = getdivid.replace(/p/, "subexpandable");
        subDivsToLookFor = subDivsToLookFor + "-";
        rgxp = new RegExp(subDivsToLookFor, "g");
        subdivs = document.getElementsByTagName("div");
        for (i in subdivs) {
          if (subdivs.hasOwnProperty(i)) {
            subdivhere = subdivs[i].id;
            if ((subdivs[i].className === "visibles" && subdivhere.match(rgxp))) {
              classToSet = "invisibles";
              element = subdivs[i];
              decreaseHeight();
            }
          }
        }
        getdivid = getdivid.replace(/p/, "expandable");
        idiv = document.getElementById(getdivid);
        node.className = "bar";
        classToSet = "invisible";
        element = idiv;
        decreaseHeight();
        node.onclick = function () {collapseList(this, 'expand'); };
        anyExpanded();
      }
    }
  } else {
    if (getdivid.match(/^sp/)) {
      get2maindiv = getdivid.replace(/sp/, "expandable");
      get2maindiv = get2maindiv.replace(new RegExp("-(.*)"), "");
      mainDivID = document.getElementById(get2maindiv);
      getdivid = getdivid.replace(/sp/, "subexpandable");
      idiv = document.getElementById(getdivid);
      thePs = mainDivID.getElementsByTagName("p");
      if (action === 'expand') {
        subExpandCollapseText(false);
        node.className = "subbarclicked"; // set the expanding color to orange
        element = idiv;
        classToSet = "visibles";
        increaseHeight();
        node.onclick = function () {collapseList(this, 'collapse'); };
      } else {
        // get the current height of the object
        // this will contain the table rows. So get the count
        node.className = "subbar"; // set the collapsing color to green
        element = idiv;
        classToSet = "invisibles";
        decreaseHeight();
        node.onclick = function () {collapseList(this, 'expand'); };
      }
    }
  }
}

function subExpandCollapseText(show) {
  "use strict";
  var getdid, dowhat, iP, eb, i;
  eb = document.getElementsByTagName("div");
  for (i in eb) {
    if (eb.hasOwnProperty(i)) {
      if ((eb[i].className === "visibles" || eb[i].className === "invisibles") && eb[i].id.match(/^subexpandable/)) {
        if (show) {
          element = eb[i];
          classToSet = 'visibles';
          increaseHeight();
        } else {
          element = eb[i];
          classToSet = 'invisibles';
          decreaseHeight();
        }
        getdid = eb[i].id;
        dowhat = (show ? "collapse" : "expand");
        if (getdid.match(/^subexpandable/)) {
          getdid = getdid.replace(/subexpandable/, "sp");
          iP = document.getElementById(getdid);
          iP.onclick = function () {collapseList(this, dowhat); };
          if (show) {
            iP.className = "subbarclicked";
          } else {
            iP.className = "subbar";
          }
        }
      }
    }
  }
}

function showTabBar (node) {
  var getdivid = node.id, idiv, get2mainbar, mainTabID;
  expandCollapseText();
  if (getdivid.match(/^p/)) {
    collapseList(node, 'expand');
  } else {
    if (getdivid.match(/^sp/)) {
      // expand the main bar first
      get2mainbar = getdivid.replace(/sp/, "p");
      get2mainbar = get2mainbar.replace(new RegExp("-(.*)"), "");
      mainTabID = document.getElementById(get2mainbar);
      collapseList(mainTabID, 'expand');
      // expand the sub bar
      collapseList(node, 'expand');
    }
  }
  return;
}