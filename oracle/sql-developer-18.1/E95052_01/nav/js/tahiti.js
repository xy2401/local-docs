/*
  Copyright 2011, 2014, Oracle and/or its affiliates. All rights reserved.
  Author: Robert Crews
  Version: 2014.02.11
*/
var jsonString = {}, favURL = "http://www.oracle.com/pls/tahiti/favorites";
function addLoadEvent(func) {
  "use strict";
  var oldOnload = window.onload;
  if (typeof window.onload !== "function") {
    window.onload = func;
  } else {
    window.onload = function () { oldOnload(); func(); };
  }
}

// This is used on the Advanced Search page
function changeBooks(catval) {
  "use strict";

  var i, id = "search_single_control_" + catval,
    p = document.getElementsByTagName("p");

  for (i = 0; i < p.length; i += 1) {
    if (p[i].className === "books") {
      p[i].style.display = "none";
      p[i].getElementsByTagName("select")[0].removeAttribute("name");
    }
  }
  p = document.getElementById(id);
  if (p !== null) {
    p.style.display = "block";
    p.getElementsByTagName("select")[0].name = "partno";
  } else {
    document.getElementById("search_single_control").style.display = "block";
  }
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

function mobileInterface() {
  "use strict";
  var deviceAgent = navigator.userAgent.toLowerCase();
  if (deviceAgent.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i)) {
    if (readCookie("MOBILE_PREF") !== "regular") {
      if (window.location.href.match(/\/nav\/portal/)) {
        window.location = "mobile/index.html";
      } else if (!window.location.href.match(/\/nav\//)) {
        window.location = "nav/mobile/index.html";
      }
    }
  }
}
mobileInterface();

function jsonpCallback() {
  "use strict";
  var favSec, signon, aHref, jso = jsonString, table,
    ipr = 0, cnt = 0, a, img, tbody, tr, td1, td2;
  favSec = document.getElementById("favlist");
  signon = document.getElementById("signin");
  if (signon !== null) {
    signon.href = "http://www.oracle.com/webapps/redirect/signon?nexturl=" +
      window.location.href;
  }
  if (jso.favorites !== undefined) {
    table = document.createElement("table");
    table.style.border = "none";
    table.style.paddingLeft = "3em";
    table.style.paddingTop = "0.5em";
    table.summary = "List of my favorites books.";
    table.id = "tThisDocument";
    tbody = document.createElement("tbody");
    for (ipr = 0; ipr < jso.favorites.length; ipr += 1) {
      if (jso.favorites[ipr] !== undefined) {
        if (jso.favorites[ipr].a !== undefined) {
          a = document.createElement("a");
          img = document.createElement("img");
          img.src = "images/remfav.gif";
          img.alt = "Remove from favorites";
          a.appendChild(img);
          a.href = favURL + "?id=" + jso.favorites[ipr].a;
          aHref = document.createElement("a");
          aHref.href = jso.favorites[ipr].h;
          aHref.innerHTML = jso.favorites[ipr].t.replace('\xAE', '');
          //aHref.appendChild(document.createTextNode(jso.favorites[ipr].t.replace('\xAE', '')));
          tr = document.createElement("tr");
          td1 = document.createElement("td");
          td1.appendChild(a);
          tr.appendChild(td1);
          td2 = document.createElement("td");
          td2.appendChild(aHref);
          tr.appendChild(td2);
          tbody.appendChild(tr);
          cnt += 1;
        }
      }
    }
    table.appendChild(tbody);
    if (cnt > 0) {
      if (favSec !== null) {
        favSec.appendChild(table);
      }
    } else {
      favSec.appendChild(document.createTextNode("No books added to favorites list."));
    }
  } else {
    if (window.location.href.indexOf("http") === 0) {
      if (favSec !== null) {
        favSec.style.color = "red";
        favSec.appendChild(document.createTextNode("You need to be logged into your OTN account to access your favorites list."));
      }
    } else {
      if (favSec !== null) {
        favSec.style.color = "red";
        favSec.appendChild(document.createTextNode("Favorites feature is not available offline."));
        if (signon !== null) {
          signon.style.display = "none";
        }
      }
    }
  }
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

function mobileInterface(){
  var deviceAgent = navigator.userAgent.toLowerCase();
  if(deviceAgent.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i)){
    if (readCookie("MOBILE_PREF") !== "regular"){
      if (window.location.href.match(/\/nav\/portal/)) {
          window.location = "mobile/index.html";
      }
      else if (! window.location.href.match(/\/nav\//)) {
          window.location = "nav/mobile/index.html";
      }
    }
  }
}
mobileInterface();
