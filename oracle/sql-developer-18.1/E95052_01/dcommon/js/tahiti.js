// JavaScript Documenta
/*
  Copyright 2006, 2013, Oracle and/or its affiliates. All rights reserved.
  Author: Divya Venkataraman, Robert Crews
  Version: 2013.12.19
*/
var basePath = "http://stdoc-web02.idc.oracle.com:8080/extras/tahitisearch/newfmw/dcommon/";
var baseURL = "http://tahiti-stage.us.oracle.com/pls/";
//alert(screen.width);
function addLoadEvent(func) {
  "use strict";
  var oldOnload = window.onload;
  if (typeof window.onload !== "function") {
    window.onload = func;
  } else {
    window.onload = function () { oldOnload(); func(); };
  }
}

function loadViewPort() {
  "use strict";
    var js, fjs = document.getElementsByTagName("script")[0], p = document.createElement("meta");
    p.setAttribute("name", "viewport");
    p.setAttribute("content", "initial-scale=1, width=device-width");
    if (fjs) {
      fjs.parentNode.insertBefore(p, fjs);
    }

}
addLoadEvent(loadViewPort);

function modifyAction(aEle) {
  "use strict";
  var searchform = document.getElementById("searchpage");
  if (searchform !== null) {
    searchform.action = baseURL + aEle.id + "/search";
    searchform.submit();
  }
  return false;
}

function modifyAdvancedAction(sEle) {
  "use strict";
  var advanced = document.getElementById("advancedsearchpage");
  if (advanced !== null) {
    advanced.action = baseURL + sEle.options[sEle.selectedIndex].value + "/advanced";
  }
}

/*function addHeader() {
  "use strict";
  var img, header;
  img = document.createElement("img");
  img.src = basePath + "img/oracle.gif";
  img.alt = "Oracle Logo";
  header = document.getElementById("HEADER");
  header.appendChild(img);
}
*/
function addHeader() {
  "use strict";
  var logoDiv, header, h1Set, i = 0, newDiv,
    navBar, ul, li1, li2, li3, a1, a2, a3, span1,
    span2, span3, navCon, brEle, brEle1, sibling,
    newHeader;
  logoDiv = document.createElement("div");
  logoDiv.id = "logocover";
  header = document.getElementById("HEADER");
  newHeader = document.createElement("div");
  newHeader.className = "wrapper";
  newHeader.appendChild(logoDiv);
  /*h1Set = document.getElementsByTagName("h1");
  for (i = 0; i < h1Set.length; i += 1) {
    if (h1Set[i].className === 'FMWtitle') {
      newDiv = document.createElement("div");
      newDiv.id = "productName";
      //alert(h1Set[i].innerText);
      newDiv.appendChild(document.createTextNode(h1Set[i].innerHTML));
      newHeader.appendChild(newDiv);
    }
  }
  */
  /*navBar = document.createElement("div");
  navBar.id = "navBar";
  navBar.className = "io";
  ul = document.createElement("ul");
  li1 = document.createElement("li");
  a1 = document.createElement("a");
  a1.className = "menu1";
  a1.href = "http://docs.oracle.com/middleware/1212/index.html";
  a1.title = "Home";
  span1 = document.createElement("span");
  span1.appendChild(document.createTextNode("Home"));
  a1.appendChild(span1);
  li1.appendChild(a1);
  ul.appendChild(li1);
  li2 = document.createElement("li");
  a2 = document.createElement("a");
  a2.className = "menu2";
  a2.href = "home.php";
  a2.title = "What's new";
  span2 = document.createElement("span");
  span2.appendChild(document.createTextNode("What's New"));
  a2.appendChild(span2);
  li2.appendChild(a2);
  ul.appendChild(li2);
  li3 = document.createElement("li");
  a3 = document.createElement("a");
  a3.className = "menu3";
  a3.href = "http://docs.oracle.com/middleware/1212/allbooks.htm";
  a3.title = "All Books";
  span3 = document.createElement("span");
  span3.appendChild(document.createTextNode("All Books"));
  a3.appendChild(span3);
  li3.appendChild(a3);
  ul.appendChild(li3);
  navBar.appendChild(ul);
  brEle = document.createElement("br");
  brEle.className = "clearfloat";
  newHeader.appendChild(brEle);
  newHeader.appendChild(navBar);
  navCon = document.createElement("div");
  navCon.id = "navcontainer";
  newHeader.appendChild(navCon);*/
  brEle1 = document.createElement("br");
  brEle1.className = "clearfloat";
  newHeader.appendChild(brEle1); 
  header.appendChild(newHeader);
 
  sibling = document.createElement("div");
  sibling.className = "header-container";
  header.parentNode.insertBefore(sibling, header.nextSibling);
}
addLoadEvent(addHeader);

function addSearchHeader() {
  "use strict";
  var h2Ele, navSec,
    topicSet, bookSet, toph2Set, i = 0, j = 0, bh2Set,
    ulEle, liOpt1, liOpt2, aOpt1, h21Ele, resSet,
    aOpt2, releaseDiv, excBooks;
  h2Ele = document.createElement("h3");
  h2Ele.appendChild(document.createTextNode("Refine Search:"));
  navSec = document.getElementById("NAV");
  resSet = document.getElementById("RESULTS");
  if (navSec !== null) {
    releaseDiv = document.createElement("div");
    releaseDiv.className = "filter";
    releaseDiv.id = "RELEASE";

    h21Ele = document.createElement("h2");
    h21Ele.appendChild(document.createTextNode("Release"));
    releaseDiv.appendChild(h21Ele);

    ulEle = document.createElement("ul");
    liOpt1 = document.createElement("li");
    liOpt1.className = "selected release";
    aOpt1 = document.createElement("a");
    aOpt1.href = "";
    aOpt1.id = "fmw121200";
    aOpt1.onclick = function () { modifyAction(this); return false; };
    aOpt1.appendChild(document.createTextNode("12c (12.1.2)"));
    liOpt1.appendChild(aOpt1);
    ulEle.appendChild(liOpt1);

    liOpt2 = document.createElement("li");
    aOpt2 = document.createElement("a");
    aOpt2.href = "";
    aOpt2.id = "fmw121100";
    aOpt2.onclick = function () { modifyAction(this); return false; };
    aOpt2.appendChild(document.createTextNode("12c Release 1 (12.1.1)"));
    liOpt2.appendChild(aOpt2);
    ulEle.appendChild(liOpt2);

    /*liOpt3 = document.createElement("li");
    aOpt3 = document.createElement("a");
    aOpt3.href = "";
    aOpt3.id = "fmw121300";
    aOpt3.onclick = function() { modifyAction(this); return false; };
    aOpt3.appendChild(document.createTextNode("12g Release 3 (12.1.3.0)"));
    liOpt3.appendChild(aOpt3);
    ulEle.appendChild(liOpt3);

    liOpt4 = document.createElement("li");
    aOpt4 = document.createElement("a");
    aOpt4.href = "";
    aOpt4.id = "fmw121200";
    aOpt4.onclick = function() { modifyAction(this); return false; };
    aOpt4.appendChild(document.createTextNode("12g Release 2 (12.1.2.0)"));
    liOpt4.appendChild(aOpt4);
    ulEle.appendChild(liOpt4);
    */
    releaseDiv.appendChild(ulEle);
    //navSec.insertBefore(releaseDiv, navSec.firstChild);

    navSec.insertBefore(h2Ele, navSec.firstChild);
    topicSet = document.getElementById("TOPICS");
	bookSet = document.getElementById("BOOKS");
	excBooks = document.getElementById("EXCBOOKS");
    if(topicSet !== null) {
		toph2Set = topicSet.getElementsByTagName("h2");
		for (i = 0; i < toph2Set.length; i += 1) {
		  if (i === 0) {
			toph2Set[i].innerHTML = "Information Types";
		  }
		}
    }
    if(bookSet !== null) {
		bh2Set = bookSet.getElementsByTagName("h2");    
		for (j = 0; j < bh2Set.length; j += 1) {
		  if (j === 0) {
			bh2Set[j].innerHTML = "Top Matching Books";
		  }
		}
    }
    if (topicSet !== null && bookSet !== null) {
      navSec.insertBefore(bookSet.parentNode.removeChild(bookSet), topicSet);
    }
    if (topicSet !== null && excBooks !== null) {
      navSec.insertBefore(excBooks.parentNode.removeChild(excBooks), topicSet);
    }
	if (resSet !== null) {
      resSet.parentNode.insertBefore(resSet, navSec);
    }
  }
}
addLoadEvent(addSearchHeader);

function addBreadCrumbs() {
  "use strict";
  var h1Set, i = 0, breaddiv, a1, a2, h1Parent, feedback,
    h1new, contentDiv, submitButton, printSec, printDiv,
    advContent, newSpan;
  contentDiv = document.getElementById("CONTENT");
  advContent = document.getElementById("ADVCONTENT");
  h1Set = document.getElementsByTagName("h1");
  if (contentDiv) {
    h1Parent = contentDiv.parentNode;
  } else if (advContent) {
    h1Parent = advContent.parentNode;
  }
 
  submitButton = document.getElementById("SUBMIT");
  if (submitButton) {
    submitButton.value = "GO";
  }
}
addLoadEvent(addBreadCrumbs);

function addFormFilter() {
  "use strict";
  var labelEle, searchForm, clearable;
  clearable = document.getElementById("WORD");
  if (clearable !== null) {
    if (clearable.value === '' || clearable.value === null) {
      clearable.value = "Enter Keyword";
    }
    clearable.onfocus = function () { if (this.value === 'Enter Keyword') { this.value = ''; } };
    clearable.size = "30";
  }
  searchForm = document.getElementById("SEARCHFORM");
  if (searchForm !== null) {
    labelEle = document.createElement("label");
    labelEle.setAttribute("for", "RELEASE");
    labelEle.appendChild(document.createTextNode("Search "));
    searchForm.insertBefore(labelEle, searchForm.firstChild);
    /*advSearch = document.getElementById("ADVANCEDSEARCH");
    if (advSearch !== null) {
      searchForm.insertBefore(document.createElement("br"), advSearch);
    }*/
  }
}
addLoadEvent(addFormFilter);

function modifyAdvLabels() {
  "use strict";
  var advContent, labProd, i = 0;
  advContent = document.getElementById("ADVANCED_SEARCH_FORM");
  if (advContent) {
    labProd = document.getElementsByTagName("label");
    for (i = 0; i < labProd.length; i += 1) {
      if (labProd[i].htmlFor === 'prod_cat') {
        labProd[i].innerHTML = "Products";
      } else if (labProd[i].htmlFor === 'partno') {
        labProd[i].innerHTML = "Documents";
      } else if (labProd[i].htmlFor === 'info_type') {
        labProd[i].innerHTML = "Information Type";
      } else if (labProd[i].htmlFor === 'job_role') {
        labProd[i].innerHTML = "Roles";
      } else if (labProd[i].htmlFor === 'results_per_page') {
        labProd[i].innerHTML = "Results per page:";
      } else if (labProd[i].htmlFor === 'not_words_search') {
        labProd[i].innerHTML = "Exclude results that contain:";
      } else if (labProd[i].htmlFor === 'search_param') {
        labProd[i].className = "hideLabel";
      }
    }     
  }
}
addLoadEvent(modifyAdvLabels);

function addResultHeader() {
  "use strict";
  var h2Ele, selUl, i = 0, pagUl, cloneUl, counter = 0, resultsEle,
    resultInfo, j = 0, liSet, selLi = 0, cloneLi, pageLi, k = 0,
    prevSet, nextSet, prevLink, nextLink, liSets, cloneVal,
    isAllBooks = false, aEle, excSLi = 0, exselUl,
    excloneLi, excloneVal, exaEle, exliSets, exh2Ele, hrefVal,
    allBookHref, newLiSet, resCon;

  resultsEle = document.getElementById("RESULTS");
  selUl = document.createElement("ul");
  selUl.className = "selected";
  liSet = document.getElementsByTagName("li");
  exselUl = document.createElement("ul");
  exselUl.className = "selected";
  for (i = 0; i < liSet.length; i += 1) {
    if (liSet[i].className === "selected" || liSet[i].className === "selected hidden") {
      if (liSet[i].parentNode.parentNode.id !== 'EXCBOOKS') {
        if (selLi > 0) {
          liSets = document.createElement("li");
          liSets.className = "pipe";
          liSets.appendChild(document.createTextNode("|"));
          selUl.appendChild(liSets);
        }
        for (j = 0; j < liSet[i].childNodes.length; j += 1) {
          if (liSet[i].childNodes[j].nodeName === 'a' || liSet[i].childNodes[j].nodeName === 'A') {
            cloneLi = document.createElement("li");
            cloneLi.className = "highlight";
            for (k = 0; k < liSet[i].childNodes[j].childNodes.length; k += 1) {
              if (liSet[i].childNodes[j].childNodes[k].nodeName === '#text' && ((liSet[i].childNodes[j].childNodes[k].textContent === "All Books" || liSet[i].childNodes[j].childNodes[k].parentNode.textContent === "All Books" || liSet[i].childNodes[j].childNodes[k].parentNode.innerText === "All Books")
                || (liSet[i].childNodes[j].childNodes[k].textContent === "All Product Suites" || liSet[i].childNodes[j].childNodes[k].parentNode.textContent === "All Product Suites" || liSet[i].childNodes[j].childNodes[k].parentNode.innerText === "All Product Suites")
                || (liSet[i].childNodes[j].childNodes[k].textContent === "All Job Roles" || liSet[i].childNodes[j].childNodes[k].parentNode.textContent === "All Job Roles" || liSet[i].childNodes[j].childNodes[k].parentNode.innerText === "All Job Roles")
                || (liSet[i].childNodes[j].childNodes[k].textContent === "All Information Types" || liSet[i].childNodes[j].childNodes[k].parentNode.textContent === "All Information Types" || liSet[i].childNodes[j].childNodes[k].parentNode.innerText === "All Information Types"))) {
                isAllBooks = true;
              }
              cloneVal = liSet[i].childNodes[j].childNodes[k].cloneNode(true);
              cloneLi.appendChild(cloneVal);
            }
          }
        }
        if (isAllBooks === false) {
          newLiSet = liSet[i].parentNode.getElementsByTagName("li");
          if (newLiSet.length !== 0) {
            if (newLiSet[0].getElementsByTagName("a").length !== 0) {
              allBookHref = newLiSet[0].getElementsByTagName("a")[0].href;
            }
          }
          selUl.appendChild(document.createTextNode(" "));
          aEle = document.createElement("a");
          aEle.className = "cross";
          aEle.href = allBookHref;
          aEle.appendChild(document.createTextNode("x"));
          cloneLi.appendChild(aEle);
        } else {
          isAllBooks = false;
        }
        selUl.appendChild(cloneLi);
        //if (liSet[i].parentNode.className === 'topBooks' && liSet[i].parentNode.parentNode.id === 'BOOKS') {
        //}
      }
      selLi += 1;
    } else if (liSet[i].parentNode.className === 'topBooks' && liSet[i].parentNode.parentNode.id === 'EXCBOOKS') {
      if (excSLi > 0) {
        exliSets = document.createElement("li");
        exliSets.className="pipe";
        exliSets.appendChild(document.createTextNode("|"));
        exselUl.appendChild(exliSets);
      }
      for (j = 0; j < liSet[i].childNodes.length; j += 1) {
        if (liSet[i].childNodes[j].nodeName === 'a' || liSet[i].childNodes[j].nodeName === 'A') {
          excloneLi = document.createElement("li");
          excloneLi.className = "highlight";
          hrefVal = liSet[i].childNodes[j].href;
          for (k = 0; k < liSet[i].childNodes[j].childNodes.length; k += 1) {
            /*if (liSet[i].childNodes[j].childNodes[k].innerText.contains("All Books")) {
              isAllBooks = true;
            }
            */
            excloneVal = liSet[i].childNodes[j].childNodes[k].cloneNode(true);
            excloneLi.appendChild(excloneVal);
          }
        }
      }
      if (liSet[i].parentNode.className === 'topBooks' && liSet[i].parentNode.parentNode.id === 'EXCBOOKS') {
        exselUl.appendChild(document.createTextNode(" "));
        exaEle = document.createElement("a");
        exaEle.className = "cross";
        exaEle.href = hrefVal;
        exaEle.appendChild(document.createTextNode("x"));
        excloneLi.appendChild(exaEle);
      }
      exselUl.appendChild(excloneLi);
      excSLi += 1;
    }
  }

  pagUl = document.getElementsByTagName("ul");
  for (j = 0; j < pagUl.length; j += 1) {
    if (pagUl[j].className === "paginator") {
      if (counter === 0) {
        pageLi = pagUl[j].getElementsByTagName("li");
        for (k = 0; k < pageLi.length; k += 1) {
          if (pageLi[k].className === "prev") {
            prevLink = pageLi[k].getElementsByTagName("a");
            if (prevLink.length > 0) {
              prevLink[0].innerHTML = "";
              prevSet = document.createElement("img");
              prevSet.src = basePath + "img/Search-Previous.gif";
              prevSet.width = "12";
              prevSet.height = "15";
              prevSet.alt = "Previous";
              prevLink[0].appendChild(prevSet);
            }
          }
          if (pageLi[k].className === "next") {
            nextLink = pageLi[k].getElementsByTagName("a");
            if (nextLink.length > 0) {
              nextLink[0].innerHTML = "";
              nextSet = document.createElement("img");

              nextSet.src = basePath + "img/Search-Next.gif";
              nextSet.width = "12";
              nextSet.height = "15";
              nextSet.alt = "Next";
              nextLink[0].appendChild(nextSet);
            }
          }
        }
        cloneUl = pagUl[j].cloneNode(true);
        pagUl[j].style.paddingTop = "30px";
        counter += 1;
      }
      pagUl[j].parentNode.removeChild(pagUl[j]);
    }
  }
  if (selLi > 0 || counter > 0 || excSLi > 0) {
    resultInfo = document.createElement("div");
    resultInfo.className = "resultinfo";
    if (selLi > 0) {
      h2Ele = document.createElement("h2");
      h2Ele.appendChild(document.createTextNode("Results for:"));
      resultInfo.appendChild(h2Ele);
      resultInfo.appendChild(selUl);
    }
    if (excSLi > 0) {
      resultInfo.appendChild(document.createElement("p"));
      exh2Ele = document.createElement("h2");
      exh2Ele.appendChild(document.createTextNode("Excluded Books:"));
      resultInfo.appendChild(exh2Ele);
      resultInfo.appendChild(exselUl);
    }
    if (counter > 0) {
      resultInfo.appendChild(cloneUl);
    }
    resCon = document.getElementById("resultscont");
    if(resCon !== null) {
		resCon.parentNode.insertBefore(resultInfo, resCon.nextSibling);
    } else {
		resultsEle.insertBefore(resultInfo, resultsEle.firstChild);
    }
  }
}
addLoadEvent(addResultHeader);
function addFooter() {
  "use strict";
  var cprCont, divLink, cprP, footerEle, currentYear, feedback, socialDiv,
    fbA, fbI, lkA, lkI, twA, twI, ytA, ytI, rsA, rsI, searchForm, navSec,
    newFooter, socialBar, twLike, golike, gplusone, fblike, fbroot,
    fbLikeClass, aboutOra, legalNot, termOfUse, privRights;
  footerEle = document.getElementById("FOOTER");
  searchForm = document.getElementById("SEARCHFORM");
  navSec = document.getElementById("NAV");
  if (searchForm !== null && navSec === null) {
    footerEle.className = "plain";
  }
  divLink = document.createElement("div");
  //divLink.className = "wrapper";
  aboutOra = document.createElement("a");
  aboutOra.href = "http://www.oracle.com/us/corporate/index.html";
  aboutOra.appendChild(document.createTextNode("About Oracle"));
  divLink.appendChild(aboutOra);
  divLink.appendChild(document.createTextNode(" | "));
  feedback = document.createElement("a");
  feedback.href = "http://docs.oracle.com/middleware/1212/assets/pg-contact.htm";
  feedback.appendChild(document.createTextNode("Send Feedback"));
  divLink.appendChild(feedback);
  //divLink.appendChild(document.createTextNode(" | "));
  legalNot = document.createElement("a");
  legalNot.href = "http://www.oracle.com/us/legal/index.html";
  legalNot.appendChild(document.createTextNode("Legal Notices"));
  /*divLink.appendChild(legalNot);
  divLink.appendChild(document.createTextNode(" | "));
  termOfUse = document.createElement("a");
  termOfUse.href = "http://www.oracle.com/us/legal/terms/index.html";
  termOfUse.appendChild(document.createTextNode("Terms of Use"));
  divLink.appendChild(termOfUse);
  divLink.appendChild(document.createTextNode(" | "));
  privRights = document.createElement("a");
  privRights.href = "http://www.oracle.com/us/legal/privacy/index.html";
  privRights.appendChild(document.createTextNode("Your Privacy Rights"));
  divLink.appendChild(privRights);*/
  divLink.appendChild(document.createElement("br"));
 // divLink.appendChild(document.createElement("br"));
  cprP = document.createElement("span");
  currentYear = new Date().getFullYear();
  cprCont = document.createTextNode("Copyright \u00A9 " + currentYear + ", Oracle and/or its affiliates. All rights reserved. ");
  cprP.appendChild(cprCont);
  cprP.appendChild(legalNot);
  divLink.appendChild(cprP);
  newFooter = document.createElement("div");
  newFooter.className = "footerbar wrapper";
  newFooter.appendChild(divLink);
  footerEle.appendChild(newFooter);
  socialDiv = document.createElement("div");
  socialDiv.className = "socialicons wrapper";
  fbA = document.createElement("a");
  fbA.href = "https://www.facebook.com/FusionMiddleware?fref=ts";
  fbA.target = "_blank";
  fbI = document.createElement("img");
  fbI.src = basePath + "img/f_spacer.gif";
  fbI.alt = "Facebook";
  fbI.className = "socialIcon facebook";
  fbA.appendChild(fbI);
  socialDiv.appendChild(fbA);
  socialDiv.appendChild(document.createTextNode(" "));
  lkA = document.createElement("a");
  lkA.href = "http://www.linkedin.com/groups?gid=142076&trk=myg_ugrp_ovr";
  lkA.target = "_blank";
  lkI = document.createElement("img");
  lkI.src = basePath + "img/f_spacer.gif";
  lkI.alt = "Linked In";
  lkI.className = "socialIcon linkedin";
  lkA.appendChild(lkI);
  socialDiv.appendChild(lkA);
  socialDiv.appendChild(document.createTextNode(" "));
  twA = document.createElement("a");
  twA.href = "https://twitter.com/OracleMiddle";
  twA.target = "_blank";
  twI = document.createElement("img");
  twI.src = basePath + "img/f_spacer.gif";
  twI.alt = "Twitter";
  twI.className = "socialIcon twitter";
  twA.appendChild(twI);
  socialDiv.appendChild(twA);
  socialDiv.appendChild(document.createTextNode(" "));
  ytA = document.createElement("a");
  ytA.href = "http://www.youtube.com/oracle";
  ytA.target = "_blank";
  ytI = document.createElement("img");
  ytI.src = basePath + "img/f_spacer.gif";
  ytI.alt = "YouTube";
  ytI.className = "socialIcon youtube";
  ytA.appendChild(ytI);
  socialDiv.appendChild(ytA);
  socialDiv.appendChild(document.createTextNode(" "));
  rsA = document.createElement("a");
  rsA.href = "http://www.oracle.com/pls/fmw121200/new_html";
  rsA.target = "_blank";
  rsI = document.createElement("img");
  rsI.src = basePath + "img/f_spacer.gif";
  rsI.alt = "RSS Feeds";
  rsI.className = "socialIcon rss";
  rsA.appendChild(rsI);
  socialDiv.appendChild(rsA);
  //footerEle.appendChild(socialDiv);
  socialBar = document.createElement("div");
  socialBar.className = "socialBar wrapper";
  twLike = document.createElement("div");
  twLike.id = "tw-like";
  twA = document.createElement("a");
  twA.href = "https://twitter.com/share";
  twA.className = "twitter-share-button";
  twA.setAttribute("data-count", "none");
  twA.appendChild(document.createTextNode("Tweet"));
  twLike.appendChild(twA);
  socialDiv.appendChild(twLike);
  golike = document.createElement("div");
  golike.id = "go-like";
  gplusone = document.createElement("div");
  gplusone.className = "g-plusone";
  gplusone.setAttribute("data-size", "medium");
  gplusone.setAttribute("data-annotation", "none");
  golike.appendChild(gplusone);
  socialDiv.appendChild(golike);
  fblike = document.createElement("div");
  fblike.id = "fb-like";
  fbroot = document.createElement("div");
  fbroot.id = "fb-root";
  fblike.appendChild(fbroot);
  fbLikeClass = document.createElement("div");
  fbLikeClass.className = "fb-like";
  fbLikeClass.setAttribute("data-href", "https://www.facebook.com/FusionMiddleware");
  fbLikeClass.setAttribute("data-width", "450");
  fbLikeClass.setAttribute("data-layout", "button_count");
  fbLikeClass.setAttribute("data-show-faces", "false");
  fbLikeClass.setAttribute("data-send", "true");
  fblike.appendChild(fbroot);
  fblike.appendChild(fbLikeClass);
  socialDiv.appendChild(fblike);
  footerEle.appendChild(socialDiv);
  //footerEle.appendChild(cprP);
  //footerEle.appendChild(document.createElement("br"));
  //cprLink = document.createElement("a");
  //cprLink.href = "html/cpyr.htm";
  //cprLink.appendChild(document.createTextNode("Legal Info"));
  //footerEle.appendChild(cprLink);
}
/*
function addFooter() {
  "use strict";
  var cprCont, divLink, cprP, footerEle, currentYear;
  footerEle = document.getElementById("FOOTER");
  divLink = document.createElement("div");
  footerEle.appendChild(divLink);
  cprP = document.createElement("p");
  currentYear = new Date().getFullYear();
  cprCont = document.createTextNode("\u00A9 " + currentYear + ", Oracle and/or its affiliates. All rights reserved.");
  cprP.appendChild(cprCont);
  footerEle.appendChild(cprP);
  //footerEle.appendChild(document.createElement("br"));
  //cprLink = document.createElement("a");
  //cprLink.href = "html/cpyr.htm";
  //cprLink.appendChild(document.createTextNode("Legal Info"));
  //footerEle.appendChild(cprLink);
}
*/
//addLoadEvent(addFooter);

function loadJQuery() {
  "use strict";

  /*function loadCSS(url) {
    var link = document.createElement('link');
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  }*/

  function loadScript(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  //loadCSS(basePath + "dcommon/css/jqtransform.css");
  loadScript(basePath + "js/jquery-latest.js");
  loadScript(basePath + "js/modernizr-2.6.1-respond-1.1.0.min.js");
  var checkReady = function (callback) {
    if (window.jQuery) {
      loadScript(basePath + "js/jquery.jqtransform.js");
      //loadScript(basePath + "dcommon/js/jquery.clearableTextField.js");
    } else {
      window.setTimeout(function () { checkReady(callback); }, 1);
    }
  };
  checkReady(function () {});

  //loadCSS(basePath + "dcommon/css/tahiti.css");
}
addLoadEvent(loadJQuery);
//loadJQuery();

function modifyResults() {
  "use strict";

  function createLoop(divSec) {
    var i, j, k, ulSet, liSet, aElement, outerBGSec, toolsSec,
      pdfExists = false, h2Ele, pdfLink, bookEle, clonedBook, searchImg,
      hideImg, searchHideDiv, searchLink = "", hideLink, searchA, hideA,
      contLink, conExists;

    for (i = 0; i < divSec.childNodes.length; i += 1) {

      if ((divSec.childNodes[i].nodeName === 'CITE' ||
          divSec.childNodes[i].nodeName === 'cite') &&
          divSec.childNodes[i].className === 'booktitle') {
        clonedBook = divSec.childNodes[i].cloneNode(true);
      }

      if (divSec.childNodes[i].nodeName === 'ul' ||
          divSec.childNodes[i].nodeName === 'UL') {
        ulSet = divSec.childNodes[i];
        if (ulSet.className === 'tools') {
          outerBGSec = document.createElement("div");
          outerBGSec.className = "outerbg";
          toolsSec = document.createElement("div");
          toolsSec.className = "bookinfo";

          for (j = 0; j < ulSet.childNodes.length; j += 1) {
            if (ulSet.childNodes[j].nodeName === 'li' ||
                ulSet.childNodes[j].nodeName === 'LI') {
              liSet = ulSet.childNodes[j].childNodes;
              for (k = 0; k < liSet.length; k += 1) {
                aElement = liSet[k];

                if (aElement.nodeName === 'A' || aElement.nodeName === 'a') {
                  if (aElement.className === 'pdf') {
                    pdfExists = true;
                    pdfLink = aElement.href;
                  }
                  if (aElement.className === 'hide') {
                    hideLink = aElement.href;
                  }
                  if (aElement.className === 'thisbook') {
                    searchLink = aElement.href;
                  }
                  if (aElement.className === 'contents') {
                    contLink = aElement.href;
                    conExists = true;
                  }
                }
              }
            }
          }

          if (pdfExists || conExists) {
            h2Ele = document.createElement("h2");
            h2Ele.appendChild(document.createTextNode("Found in: "));
            bookEle = document.createElement("a");
            if (pdfExists) {
              bookEle.href = pdfLink;
            } else {
              bookEle.href = contLink;
            }
            bookEle.className = "booktitle";

            if (clonedBook) {
              bookEle.appendChild(clonedBook);
            }

            searchHideDiv = document.createElement("div");
            searchHideDiv.className = "searchHide";
            searchA = document.createElement("a");
            if (searchLink !== null && searchLink !== '') {
              searchA.href = searchLink;
            }
            searchA.className = "searchBook";
            searchImg = document.createElement("img");
            searchImg.alt = "Search this Book";
            //searchImg.src = "search.png";
            if (searchLink !== null && searchLink !== '') {
              searchImg.src = basePath + "img/srch-narrow-srch.gif";
            } else {
              searchImg.src = basePath + "img/srch-narrow-40pcnt.gif";
            }
            searchA.appendChild(searchImg);
            hideA = document.createElement("a");
            hideA.href = hideLink;
            hideA.className = "hideBook";
            hideImg = document.createElement("img");
            hideImg.alt = "Hide this Book";
            //hideImg.src = "hide.png";
            hideImg.src = basePath + "img/srch-exclude.gif";
            hideA.appendChild(hideImg);
            searchHideDiv.appendChild(searchA);
            searchHideDiv.appendChild(document.createTextNode(" "));
            searchHideDiv.appendChild(hideA);
            toolsSec.appendChild(searchHideDiv);
            toolsSec.appendChild(h2Ele);
            toolsSec.appendChild(bookEle);
            outerBGSec.appendChild(toolsSec);
            divSec.appendChild(outerBGSec);
          }
        }
      }
    }
  }

  var i = 0, divs = document.getElementsByTagName("div");
  for (i = 0; i < divs.length; i += 1) {
    if (divs[i].className === "hit") {
      createLoop(divs[i]);
    }
  }
}
addLoadEvent(modifyResults);

function reloadPaginator() {
  "use strict";
  var i = 0, pagUl, cloneUl, counter = 0;
  pagUl = document.getElementsByTagName("ul");
  for (i = 0; i < pagUl.length; i += 1) {
    if (pagUl[i].className === "paginator") {
      if (counter === 0) {
        cloneUl = pagUl[i].cloneNode(true);
        document.getElementById("RESULTS").appendChild(cloneUl);
        counter += 1;
      }
    }
  }
}
//addLoadEvent(reloadPaginator);
function reloadAdvPage() {
  "use strict";
  var excF, resPage, advSearch, subSec, textFil, firstTxt, spanEle,
    relSec, prodSec, span2Ele, liOpt1, liOpt2, releaseSec, advSub,
    resText, excText, divEmail, ulEle, liEle1, liEle2, a1, a2, searchEle;
  advSearch = document.getElementById("ADVANCED_SEARCH_FORM");
  subSec = document.getElementById("SUBADV");
  textFil = document.getElementById("SEARCHTXT");
  prodSec = document.getElementById("PROD_CAT");
  //fmwT = document.getElementById("FMWtitle");
  if (advSearch !== null) {
    searchEle = document.getElementById("search_word");
    if (searchEle !== null) {
      if (searchEle.value === '' || searchEle.value === null) {
        searchEle.value = "Enter Keyword";
      }
      searchEle.onfocus = function () { if (this.value === 'Enter Keyword') { this.value = ''; } };
    }
    divEmail = document.createElement("div");
    divEmail.className = "floatRight";
    ulEle = document.createElement("ul");
    liEle1 = document.createElement("li");
    liEle1.className = "email";
    a1 = document.createElement("a");
    a1.title = "Email Us";
    a1.href = "mailto:appserverdocs_us@oracle.com";
    liEle1.appendChild(a1);
    ulEle.appendChild(liEle1);
    liEle2 = document.createElement("li");
    liEle2.className = "allbooks";
    a2 = document.createElement("a");
    a2.title = "All Books";
    a2.href = "http://docs.oracle.com/middleware/1212/allbooks.htm";
    liEle2.appendChild(a2);
    ulEle.appendChild(liEle2);
    divEmail.appendChild(ulEle);
    //advSearch.parentNode.insertBefore(divEmail, advSearch);
    resPage = document.getElementById("RESULTSPAGE");
    resText = document.createElement("span");
    resText.className = "blockSpan";
    resText.appendChild(document.createTextNode("Results per page:"));
    if (resPage !== null) {
      //resPage.insertBefore(resText, resPage.firstChild);
      advSearch.insertBefore(resPage.parentNode.removeChild(resPage), subSec);
    }
    excF = document.getElementById("SEARCHNOTFILTER");
    excText = document.createElement("span");
    excText.appendChild(document.createTextNode("Exclude results that contain:"));
    if (excF !== null) {
      //excF.insertBefore(document.createElement("br"), excF.firstChild);
      //excF.insertBefore(excText, excF.firstChild);
      advSearch.insertBefore(excF.parentNode.removeChild(excF), subSec);
    }
    advSub = document.getElementById("ADVSUBMIT");
    if (advSub !== null) {
      advSub.setAttribute("value","Submit");
    }
  }
  /*if (textFil !== null) {
    firstTxt = textFil.firstChild;
    spanEle = document.createElement("span");
    spanEle.className = "leftFloat";
    spanEle.appendChild(document.createTextNode("Search: "));
    textFil.insertBefore(spanEle, firstTxt);
  }*/
  if (prodSec !== null) {
    span2Ele = document.createElement("span");
    span2Ele.className = "boldSpan";
    span2Ele.appendChild(document.createTextNode("Show results from:"));
    releaseSec = document.createElement("p");
    relSec = document.createElement("select");
    relSec.setAttribute("name", "release");
    relSec.setAttribute("id", "release");
    liOpt1 = document.createElement("option");
    liOpt1.name = "release";
    liOpt1.checked = "checked";
    liOpt1.value = "fmw121200";
    liOpt1.appendChild(document.createTextNode("12c (12.1.2)"));
    relSec.appendChild(liOpt1);

    liOpt2 = document.createElement("option");
    liOpt2.name = "release";
    //liOpt2.checked = "checked";
    liOpt2.value = "fmw121100";
    liOpt2.appendChild(document.createTextNode("12c Release 1 (12.1.1)"));
    relSec.appendChild(liOpt2);

    /*liOpt3 = document.createElement("option");
    liOpt3.name="release";
    liOpt3.checked = "checked";
    liOpt1.value = "12gR3";
    liOpt3.appendChild(document.createTextNode("12g Release 3 (12.1.3.0)"));
    relSec.appendChild(liOpt3);

    liOpt4 = document.createElement("option");
    liOpt4.name="release";
    liOpt4.checked = "checked";
    liOpt1.value = "12gR2";
    liOpt4.appendChild(document.createTextNode("12g Release 2 (12.1.2.0)"));
    relSec.appendChild(liOpt4);
    */
    releaseSec.appendChild(span2Ele);
    //relSec.onchange = function() { modifyAdvancedAction(this); };
    //releaseSec.appendChild(relSec);
    advSearch.insertBefore(releaseSec, prodSec);
  }
}
addLoadEvent(reloadAdvPage);

function loadTwitter() {
  "use strict";
  var checkReady = function (callback) {
    function loadTweet(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
      }
    }
    if (document.getElementById("tw-like")) {
      //loadScript(basePath + "js/jquery.jqtransform.js");
      //alert("HEre");
      loadTweet(document, 'script', 'twitter-wjs');
      //loadScript(basePath + "js/jquery.clearableTextField.js");
    } else {
      window.setTimeout(function () { checkReady(callback); }, 1);
    }
  };
  checkReady(function () {});
}
addLoadEvent(loadTwitter);

function loadGPlusFb() {
  "use strict";
  function googleplus() {
    var po = document.createElement('script'), s = document.getElementsByTagName('script')[0];
    po.type = 'text/javascript';
    //po.async = true;
    po.src = "https://apis.google.com/js/plusone.js";
    s.parentNode.insertBefore(po, s);
    return;
  }
  function facebook(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "http://connect.facebook.net/en_US/all.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
  }
  facebook(document, 'script', 'facebook-jssdk');
  googleplus();
}

addLoadEvent(loadGPlusFb);
