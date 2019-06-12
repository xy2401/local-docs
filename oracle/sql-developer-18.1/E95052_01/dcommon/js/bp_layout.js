/*
  bp_layout.js
  Copyright 2007, 2013, Oracle and/or its affiliates. All rights reserved.
  Author: Vijayender Cherupally, Robert Crews
  Version: 2013.6.30
*/


function addLoadEvent(func) {
  "use strict";
  var oldOnload = window.onload;
  if (typeof window.onload !== "function") {
    window.onload = func;
  } else {
    window.onload = function () { oldOnload(); func(); };
  }
}

function stripeLi() {
  "use strict";
  var i = 0, j = 0, uls, lis,
    divs = document.getElementsByTagName("div");
  if (!document.getElementsByTagName) {
    return false;
  }
  for (i = 0; i < divs.length; i += 1) {
    if (divs[i].getAttribute("class") === "portlet" ||
        (navigator.appName.indexOf("Microsoft") !== -1 &&
        divs[i].className === "portlet")) {
      uls = divs[i].getElementsByTagName("ul");
      if (uls.length > 0) {
        lis = uls[uls.length - 1].getElementsByTagName("li");
        for (j = 0; j < lis.length; j += 1) {
          if (j % 2 === 0) {
            lis[j].style.background = "white";
          }
        }
      }
    }
  }
}
//addLoadEvent(stripeLi);

function stripeTr() {
  "use strict";
  var i = 0, j = 0, trs,
    tbodys = document.getElementsByTagName("tbody");
  if (!document.getElementsByTagName) {
    return false;
  }
  for (i = 0; i < tbodys.length; i += 1) {
    trs = tbodys[i].getElementsByTagName("tr");
    for (j = 0; j < trs.length; j += 1) {
      if (j % 2 === 0) {
        trs[j].style.background = "white";
      }
    }
  }
}
//addLoadEvent(stripeTr);

function advancedSearch(mode) {
  "use strict";
  if (!document.getElementById) {
    return false;
  }
  if (mode === 'show') {
    if (document.getElementById("BASIC") !== null) {
      document.getElementById("BASIC").style.display = "none";
    }
    if (document.getElementById("ADVANCED") !== null) {
      document.getElementById("ADVANCED").style.display = "block";
    }
  } else {
    if (document.getElementById("BASIC") !== null) {
      document.getElementById("BASIC").style.display = "block";
    }
    if (document.getElementById("ADVANCED") !== null) {
      document.getElementById("ADVANCED").style.display = "none";
    }
  }
}
addLoadEvent(advancedSearch);

function underlineTitles() {
  "use strict";
  var p1 = document.createElement("span"), p2;
  p1.style.position = "absolute";
  p1.style.right = "1em";
  p1.style.color = "#666";
  p1.style.textDecoration = "underline";
  p1.style.cursor = "pointer";
  p1.style.fontSize = "80%";
  p1.style.marginTop = "0";

  function underline() {
    var i = 0, j = 0, li, div = document.getElementsByTagName("div");
    for (i = 0; i < div.length; i += 1) {
      if (div[i].className === "portlet") {
        li = div[i].getElementsByTagName("li");
        for (j = 0; j < li.length; j += 1) {
          li[j].style.marginBottom = "1px";
          li[j].style.borderBottom = "solid 1px #666";
          li[j].style.paddingBottom = "1px";
        }
      }
    }
    document.getElementById("p1").style.display = "none";
    document.getElementById("p2").style.display = "block";
  }

  function plain() {
    var i = 0, j = 0, li, div = document.getElementsByTagName("div");
    for (i = 0; i < div.length; i += 1) {
      if (div[i].className === "portlet") {
        li = div[i].getElementsByTagName("li");
        for (j = 0; j < li.length; j += 1) {
          li[j].style.marginBottom = "0";
          li[j].style.borderBottom = "none";
          li[j].style.paddingBottom = "0";
        }
      }
    }
    document.getElementById("p1").style.display = "block";
    document.getElementById("p2").style.display = "none";
  }

  p2 = p1.cloneNode(false);
  p1.appendChild(document.createTextNode("Underline Titles"));
  p1.onclick = function () { underline(); };
  p1.id = "p1";
  p2.appendChild(document.createTextNode("Remove Title Underlines"));
  p2.onclick = function () { plain(); };
  p2.id = "p2";
  p2.style.display = "none";

  if(document.getElementById("FOOTER")) {
  document.getElementById("FOOTER").insertBefore(p1,
    document.getElementById("FOOTER").firstChild);
  document.getElementById("FOOTER").insertBefore(p2,
    document.getElementById("FOOTER").firstChild);
    }
}
addLoadEvent(underlineTitles);

function collapsiblePortlet() {
  "use strict";
  var h2Ele, i = 0, j = 0, aEle, h2Parent, divEle, divID, imgEle;
  function showHide(tabHref, nav) {
    var shID, table, imagePM;
    if (tabHref.id !== null) {
      shID = tabHref.id;
      shID = shID.replace('tableHref', '');
      if (tabHref !== null) {
        table = document.getElementById('table' + shID);
        if (table !== null && table.style.display !== 'none') {
          table.style.display = 'none';
          imagePM = document.getElementById('imagePM' + shID);
          if (imagePM !== null) {
            imagePM.src = nav + 'images/expand.gif';
          }
        } else if (table !== null) {
          table.style.display = 'inline';
          imagePM = document.getElementById('imagePM' + shID);
          if (imagePM !== null) {
            imagePM.src = nav + 'images/collapse.gif';
          }
        }
      }
    }
  }
  h2Ele = document.getElementsByTagName("h2");
  for (i = 0; i < h2Ele.length; i += 1) {
    h2Parent = h2Ele[i].parentNode;
    divID = "";
    if (h2Parent.nodeName === 'div' || h2Parent.nodeName === 'DIV') {
      divEle = h2Parent.getElementsByTagName("div");
      for (j = 0; j < divEle.length; j += 1) {
        if (divEle[j].id !== null) {
          if (divID === "" && divEle[j].id.indexOf('table') !== -1) {
            divID = divEle[j].id;
            divID = divID.replace("table", "");
          }
        }
      }
      if (divID !== "") {
        aEle = document.createElement("a");
        aEle.id = "tableHref" + divID;
        imgEle = document.createElement("img");
        if (document.getElementById("PORTAL_1") !== null) {
          aEle.href = "#";
          aEle.onclick = function () { showHide(this, 'nav/'); return false; };
          imgEle.src = "nav/images/collapse.gif";
        } else {
          if (document.getElementById("WELCOME") !== null) {
            aEle.href = "#";
            aEle.onclick = function () { showHide(this, 'doc/nav/'); return false; };
            imgEle.src = "doc/nav/images/collapse.gif";
          } else {
            aEle.href = "#";
            aEle.onclick = function () { showHide(this, ''); return false; };
            imgEle.src = "images/collapse.gif";
          }
        }
        imgEle.alt = "collapse";
        imgEle.border = "0";
        imgEle.id = "imagePM" + divID;
        aEle.appendChild(imgEle);
        h2Ele[i].insertBefore(aEle, h2Ele[i].firstChild);
      }
    }
  }
}
//addLoadEvent(collapsiblePortlet);

function showSummary(obj) {
  "use strict";
  var summarySpan, i;
  summarySpan = obj.getElementsByTagName("div");
  for (i = 0; i < summarySpan.length; i += 1) {
    if (summarySpan[i].getAttribute("class") === "summary") {
      summarySpan[i].style.display = "inline-block";
      if (summarySpan[i].previousSibling.previousSibling && summarySpan[i].previousSibling.previousSibling.style) {
        summarySpan[i].previousSibling.previousSibling.style.backgroundColor = "#F2FAFF";
      } else if (summarySpan[i].previousSibling) {
        summarySpan[i].previousSibling.style.backgroundColor = "#F2FAFF";
      }
      //obj.style.display = "inline-block";
    }
  }
}

function delayHide(obj) {
  "use strict";
  var checkReady = function (callback) {
      //alert(obj);
      window.setTimeout(function () { hideSummary(obj); }, 2000);
  };
    checkReady(function () {});
}

function hideSummary(obj) {
  "use strict";
  var summarySpan, i;
  summarySpan = obj.getElementsByTagName("div");
  for (i = 0; i < summarySpan.length; i += 1) {
    if (summarySpan[i].getAttribute("class") === "summary") {
      summarySpan[i].style.display = "none";
      if (summarySpan[i].previousSibling.previousSibling && summarySpan[i].previousSibling.previousSibling.style) {
        summarySpan[i].previousSibling.previousSibling.style.backgroundColor = "#FFFFFF";
      } else if (summarySpan[i].previousSibling) {
        summarySpan[i].previousSibling.style.backgroundColor = "#FFFFFF";
      }
      obj.style.textDecoration = "none";
      //obj.style.display = "inline-block";
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

function modifyHeader() {
  "use strict";
  var oldHeader, headerDiv, logoDiv, brEle, contHead, headerEle, login, user,
    signOn, signOnLink;
  logoDiv = document.getElementById("logocover");
  login = document.createElement("div");
  login.id = "login";
  login.style.cursor = "pointer";
  signOn = document.createElement("span");
  signOnLink = document.createElement("a");
  signOnLink.href = "http://www.oracle.com/webapps/redirect/signon?nexturl=" +
    window.location.href;
  signOnLink.appendChild(document.createTextNode("Sign In"));
  signOn.appendChild(signOnLink);
  if (readCookie("ORA_UCM_INFO").match(/([\-.+\w]+@[\-.+\w]+)/)) {
    user = RegExp.$1;
  }
  if (!user || user === "") {
    login.appendChild(signOn);
  } else {
    login.onmouseover= function(action){return function(){logout(action);}}('over');
    login.onmouseout= function(action){return function(){logout(action);}}('out');
    login.onclick = function () { return function(){sso_sign_out();}}();
    login.appendChild(document.createTextNode(user.toLowerCase()));
  }
  if (logoDiv) {
    logoDiv.parentNode.insertBefore(login, logoDiv.nextSibling);
  }
  /*if (oldHeader) {
    while (oldHeader.lastChild) {
      oldHeader.removeChild(oldHeader.lastChild);
    }
    headerDiv = document.createElement("div");
    headerDiv.id = "HEADER";
    logoDiv = document.createElement("div");
    logoDiv.id = "logocover";
    headerDiv.appendChild(logoDiv);
    brEle = document.createElement("br");
    brEle.className = "clearfloat";
    headerDiv.appendChild(brEle);
    contHead = document.createElement("div");
    contHead.className = "header-container";
    headerDiv.appendChild(contHead);
    headerDiv.appendChild(document.createElement("br"));
    headerEle = document.getElementsByTagName('header')[0];
    headerEle.appendChild(headerDiv);
  }*/
}
function logout(action) {
  if (!document.documentElement.firstChild) return false;
  if (!document.documentElement.removeAttribute) return false;
  if (!document.getElementById) return false;
  var le = document.getElementById("login");
  if (le == null) return false;  
  if (action.match(/^over$/)) {
    //le.setAttribute("href", "http://pdb.us.oracle.com/logout.jsp");
    le.style.textDecoration = "underline";
    le.style.color = "#0080FF";
    le.firstChild.nodeValue = "Logout " + le.firstChild.nodeValue;
  }
  else {
    //le.removeAttribute("href");
    le.style.textDecoration = "none";
    le.style.color = "black";
    le.firstChild.nodeValue =
      le.firstChild.nodeValue.replace("Logout ", "");
  }
}
addLoadEvent(modifyHeader);

function modifyFooter() {
  "use strict"; 
  var footerEle, footerDiv, h3Ele, hwsfA, ulFooterLinks, ulFli1, aF1, ulFli2,
    aF2, ulFli3, aF3, ulFli4, aF4, ulFli5, aF5, ulFli6, aF6, ulFli7, aF7,
    ulFli8, aF8, sclIcons, sclli1, aS1, sclli2, aS2, sclli3, aS3, sclli4, aS4,
    sclli5, aS5, sclli6, aS6, engT;
  footerEle = document.getElementsByTagName('footer')[0];
  if (footerEle) {
    while (footerEle.lastChild) {
      footerEle.removeChild(footerEle.lastChild);
    }
    footerDiv = document.createElement("div");
    footerDiv.id = "FOOTER";
    h3Ele = document.createElement("h3");
    hwsfA = document.createElement("a");
    hwsfA.href = "http://www.oracle.com/us/corporate/index.html";
    hwsfA.appendChild(document.createTextNode("Hardware and Software, "))
    engT = document.createElement("span");
    engT.appendChild(document.createTextNode("Engineered to Work Together"));
    hwsfA.appendChild(engT);
    h3Ele.appendChild(hwsfA);
    footerDiv.appendChild(h3Ele);
    footerDiv.appendChild(document.createElement("br"));
    ulFooterLinks = document.createElement("ul");
    ulFooterLinks.className = "FOOTER-links";
    ulFli1 = document.createElement("li");
    aF1 = document.createElement("a");
    aF1.href = "http://www.oracle.com/us/syndication/subscribe/index.html";
    aF1.appendChild(document.createTextNode("Subscribe"));
    ulFli1.appendChild(aF1);
    ulFooterLinks.appendChild(ulFli1);
    ulFli2 = document.createElement("li");
    aF2 = document.createElement("a");
    aF2.href = "http://www.oracle.com/us/corporate/careers/index.html";
    aF2.appendChild(document.createTextNode("Careers"));
    ulFli2.appendChild(aF2);
    ulFooterLinks.appendChild(ulFli2);
    ulFli3 = document.createElement("li");
    aF3 = document.createElement("a");
    aF3.href = "http://www.oracle.com/us/corporate/contact/index.html";
    aF3.appendChild(document.createTextNode("Contact Us"));
    ulFli3.appendChild(aF3);
    ulFooterLinks.appendChild(ulFli3);
    ulFli4 = document.createElement("li");
    aF4 = document.createElement("a");
    aF4.href = "http://www.oracle.com/us/sitemaps/index.html";
    aF4.appendChild(document.createTextNode("Site Maps"));
    ulFli4.appendChild(aF4);
    ulFooterLinks.appendChild(ulFli4);
    ulFli5 = document.createElement("li");
    aF5 = document.createElement("a");
    aF5.href = "http://www.oracle.com/us/legal/privacy/overview/index.html";
    aF5.appendChild(document.createTextNode("Legal Notices"));
    ulFli5.appendChild(aF5);
    ulFooterLinks.appendChild(ulFli5);
    ulFli6 = document.createElement("li");
    aF6 = document.createElement("a");
    aF6.href = "http://www.oracle.com/us/legal/terms/index.html";
    aF6.appendChild(document.createTextNode("Terms of Use"));
    ulFli6.appendChild(aF6);
    ulFooterLinks.appendChild(ulFli6);
    ulFli7 = document.createElement("li");
    aF7 = document.createElement("a");
    aF7.href = "http://www.oracle.com/us/legal/privacy/overview/index.html";
    aF7.appendChild(document.createTextNode("Privacy"));
    ulFli7.appendChild(aF7);
    ulFooterLinks.appendChild(ulFli7);
    ulFli8 = document.createElement("li");
    ulFli8.className = "FOOTER-mobile";
    aF8 = document.createElement("a");
    aF8.href = "http://www.oracle.com/us/corporate/mobile-application/index.html";
    aF8.appendChild(document.createTextNode("Oracle Mobile"));
    ulFli8.appendChild(aF8);
    ulFooterLinks.appendChild(ulFli8);
    footerDiv.appendChild(ulFooterLinks);

    sclIcons = document.createElement("ul");
    sclIcons.className = "scl-icons";
    sclli1 = document.createElement("li");
    sclli1.className = "scl-facebook";
    aS1 = document.createElement("a");
    aS1.href = "http://www.oracle.com/us/social-media/facebook/index.html";
    aS1.title = "Oracle on Facebook";
    aS1.appendChild(document.createTextNode("Facebook"));
    sclli1.appendChild(aS1);
    sclIcons.appendChild(sclli1);
    sclli2 = document.createElement("li");
    sclli2.className = "scl-linkedin";
    aS2 = document.createElement("a");
    aS2.href = "http://www.oracle.com/us/social-media/linkedin/index.html";
    aS2.title = "Oracle on LinkedIn";
    aS2.appendChild(document.createTextNode("LinkedIn"));
    sclli2.appendChild(aS2);
    sclIcons.appendChild(sclli2);
    sclli3 = document.createElement("li");
    sclli3.className = "scl-twitter";
    aS3 = document.createElement("a");
    aS3.href = "http://www.oracle.com/us/social-media/twitter/index.html";
    aS3.title = "Follow Oracle on Twitter";
    aS3.appendChild(document.createTextNode("Twitter"));
    sclli3.appendChild(aS3);
    sclIcons.appendChild(sclli3);
    sclli4 = document.createElement("li");
    sclli4.className = "scl-googleplus";
    aS4 = document.createElement("a");
    aS4.href = "https://plus.google.com/u/0/115607918987921226255";
    aS4.title = "Follow Oracle on Google+";
    aS4.appendChild(document.createTextNode("Google+"));
    sclli4.appendChild(aS4);
    sclIcons.appendChild(sclli4);
    sclli5 = document.createElement("li");
    sclli5.className = "scl-youtube";
    aS5 = document.createElement("a");
    aS5.href = "http://www.youtube.com/oracle/";
    aS5.title = "Watch Oracle on YouTube";
    aS5.appendChild(document.createTextNode("YouTube"));
    sclli5.appendChild(aS5);
    sclIcons.appendChild(sclli5);
    sclli6 = document.createElement("li");
    sclli6.className = "scl-feed";
    aS6 = document.createElement("a");
    aS6.href = "http://www.oracle.com/us/syndication/feeds/index.html";
    aS6.title = "Oracle RSS Feeds";
    aS6.appendChild(document.createTextNode("Oracle RSS Feed"));
    sclli6.appendChild(aS6);
    sclIcons.appendChild(sclli6);
    footerDiv.appendChild(sclIcons);
    footerEle.appendChild(footerDiv);
  }
}
addLoadEvent(modifyFooter);

function sso_sign_out(){
  var rUrl=escape(window.location.href);
  if ((rUrl.indexOf("/secure")!=-1)) {
    rUrl="http://www.oracle.com/partners/";
  }
  invalidateAuthCookie();
  if (window.location.host.indexOf("-stage")>-1) {
    window.location="https://login-stage.oracle.com/sso/logout?p_done_url="+rUrl;
  } else {
    window.location="https://login.oracle.com/sso/logout?p_done_url="+rUrl;
  }
}

function invalidateAuthCookie() {
  var b=readCookie("ORASSO_AUTH_HINT");
  if(b!=null) {
    var a="ORASSO_AUTH_HINT=INVALID; Max-Age=0; domain=.oracle.com; path=/;";
    document.cookie=a;
  }
}