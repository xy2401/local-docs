/*
  Copyright 2014, 2015, Oracle and/or its affiliates. All rights reserved.
  Version:  2015.8.13
*/
var prodList = {}, baseurl = "", listOfCategories = new Array(),
  langErr = 0, dcommonPath ="", langList = {}, homeurl = "", langCode = { "ar":"Arabic",
"ca":"Catalan",
"cs":"Czech",
"da":"Danish",
"de":"German",
"el":"Greek",
"en":"English",
"es":"Spanish",
"fi":"Finnish",
"fr":"French",
"hi":"Hindi",
"hr":"Croatian",
"hu":"Hungarian",
"it":"Italian",
"he":"Hebrew",
"ja":"Japanese",
"ja.ja_JP.ja-JP":"Japanese",
"ko":"Korean",
"nl":"Dutch",
"no":"Norwegian",
"pl":"Polish",
"pt":"Portuguese",
"pt-BR":"Brazilian Portuguese",
"ro":"Romanian",
"ru":"Russian",
"sk":"Slovak",
"sv":"Swedish",
"th":"Thai",
"tr":"Turkish",
"vi":"Vietnamese",
"zh-CN":"Simplified Chinese",
"zh-TW":"Traditional Chinese"
  };
function setBaseUrl() {
  var body, cat;
  body = document.getElementsByTagName("body")[0];
  baseurl = window.location.hostname + "/";
  if (baseurl.indexOf("pdb-stage") !== -1) {
    baseurl = "http://" + baseurl + "web/";
  } else {
    baseurl = "//" + baseurl;
  }
  homeurl = baseurl;
  if (document.getElementById("searchbody") === undefined || document.getElementById("searchbody") === null) {
    baseurl += "en/";
  } else {
    baseurl += "apps/search/";
  }
   if (body.id !== undefined && body.id === 'WELCOME') {
    dcommonPath = "doc/dcommon/";
  } else if (body.id !== undefined && body.id === 'PORTAL_1' && body.className === 'INDEX') {
    dcommonPath = "dcommon/";
  } else if (body.className === 'INDEX_DATA_FILE') {
    dcommonPath = "dcommon/";
  }else if (body.id !== undefined && body.id.indexOf('PORTAL') !== -1 && body.className !== 'INDEX') {
    cat = document.getElementById("category");
    if (cat !== undefined && cat !== null && cat.innerHTML.indexOf("Cloud") !== -1) {
      dcommonPath = "dcommon/";
    } else {
      dcommonPath = "../dcommon/";
    }
  } else if (body.id !== undefined && body.className.indexOf("category-page") === -1 || body.id !== 'searchbody' ) {
    dcommonPath = "/dcommon/";
  } else {
    dcommonPath = "dcommon/";
  }
 // alert(baseurl + " " + window.location.hostname);
}
addLoadEvent(setBaseUrl);
function addLoadEvent(func) {
  "use strict";
  var oldOnload = window.onload;
  if (typeof window.onload !== "function") {
    window.onload = func;
  } else {
    window.onload = function () { oldOnload(); func(); };
  }
}
function initializeValues() {
  "use strict";
  listOfCategories = new Array();
  getCategories();
}
//addLoadEvent(initializeValues);

function getCategories() {
    var searchURL = "";
    function setBase() {
     searchURL = window.location.hostname + "/";
     if (searchURL.indexOf("pdb-stage") !== -1) {
       searchURL = "http://" + searchURL+"oracleSearchCategories.jsp";
     } else {
       searchURL = "//" + searchURL.replace("/$","") + "apps/search/searchCategories.jsp";
     }
    }
    setBase();
    $.ajax({
      url: searchURL,
      dataType: "json",
      async: false,
      success: function( data) {
        var responseJson = data;
        var count = 0;
        for(var keyProd in responseJson){
          var thisProdName   = keyProd; // db, cloud etc
          var thisProdValues = responseJson[thisProdName];
          listOfCategories[thisProdName] = thisProdValues;
          //count = count + 1;
          //alert ("adding: "+thisProdName+": "+thisProdValues);
        }
      }
   });
}
function getHttpObject() {
  var xhr = false;
  if (window.XMLHttpRequest) {
    xhr = new window.XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      xhr = new window.ActiveXObject("Msxml2.XMLHTTP");
    } catch (e1) {
      try {
        xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
      } catch (e2) {
        xhr = false;
      }
    }
  }
  return xhr;
}
function readJSON() {
    //"use strict";
    var request = getHttpObject();
    var jsProd = {"products":[
 {"name":"Cloud", "href":"cloud/", "id":"Cloud", "filter":"cloud"},
 {"name":"Applications", "href":"applications/", "id":"Applications", "filter":"applications"},
 {"name":"Middleware", "href":"middleware/", "id":"Middleware", "filter":"middleware"}, 
 {"name":"Database", "href":"database/", "id":"Database", "filter":"database"},
  {"name":"Big Data", "href":"bigdata/", "id":"Bigdata", "filter":"bigdata"},
 {"name":"Enterprise Manager", "href":"enterprise-manager/", "id":"Enterprise", "filter":"enterprisemanager"},
 {"name":"Engineered Systems", "href":"engineered-systems/", "id":"Engineered", "filter":"engineeredsystems"},
 {"name":"Java", "href":"java/", "id":"Java", "filter":"java"},
 {"name":"Hardware", "href":"hardware/", "id":"Hardware", "filter":"hardware"},
 {"name":"Virtualization", "href":"virtualization/", "id":"Virtualization", "filter":"virtualization"},
 {"name":"Storage", "href":"storage/", "id":"Storage", "filter":"storage"},
 {"name":"Operating Systems", "href":"operating-systems/", "id":"Operating", "filter":"operatingsystems"}, 
 {"name":"Industries", "href":"industries/", "id":"Industries", "filter":"industries"}, 
 {"name":"Browse All Products", "href":"browseall.html", "id":"browseall", "filter":"allproducts"},
 {}
]};
    function parseResponse_json() {
        var jso, ul1, ipr = 0, iIter;
        //if (request.readyState === 4) {
          //if (request.status === 200 || request.status === 304 || request.status === 0) {
            prodList = jsProd;
            addNavigation();
            modifyHeader();
              if (document.getElementById("content") !== null && document.getElementById("content") !== undefined) {
    document.getElementById("content").style.marginTop = document.getElementsByTagName('header')[0].offsetHeight + "px !important";
  }
          //}
        //}
    }
    parseResponse_json();
    
}
addLoadEvent(readJSON);
function getCookieData(c){
var g=c.length;
var e=document.cookie.length;
var d=0;
var f;
while(d<e){
var b=d+g;
if(document.cookie.substring(d,b)==c){
f=document.cookie.indexOf(";",b);
if(f==-1){f=document.cookie.length;}b++;
var a=decodeURIComponent(document.cookie.substring(b,f).replace(/\+/g,"%20"));
return cleanCookieContent(a);
}
d++;
}
return "";
}
function cleanCookieContent(b){
var d=(typeof(b)=="undefined")?"NoData":b,i;
var a="<>";
if(d!="NoData"){
var c=d.length;
for(i=0;i<c;i++){
if(d.substr(i,1)!="."&&a.search(d.substr(i,1))>-1){
d="Invalid";
i=c+1;
}
}
}
return d;
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
function sso_sign_out(){
  var rUrl=escape(window.location.href);
  if ((rUrl.indexOf("/secure")!=-1)) {
    rUrl="http://www.oracle.com/partners/";
  }
  invalidateAuthCookie();
  /*if (window.location.host.indexOf("-stage")>-1) {
    window.location="https://login-stage.oracle.com/sso/logout?p_done_url="+rUrl;
  } else {
  */
    window.location="https://login.oracle.com/sso/logout?p_done_url="+rUrl;
  //}
}

function invalidateAuthCookie() {
  var b=readCookie("ORASSO_AUTH_HINT");
  if(b!=null) {
    var a="ORASSO_AUTH_HINT=INVALID; Max-Age=0; domain=.oracle.com; path=/;";
    document.cookie=a;
  }
}
function getHttpObject1() {
  var xhr = false;
  if (window.XMLHttpRequest) {
    xhr = new window.XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      xhr = new window.ActiveXObject("Msxml2.XMLHTTP");
    } catch (e1) {
      try {
        xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
      } catch (e2) {
        xhr = false;
      }
    }
  }
  return xhr;
}
function readLang() {
  var request = getHttpObject1(), body, linkEle, i1 = 0, urlpath = "";
  body = document.getElementsByTagName('body')[0];
  //if (urlpath === undefined  || urlpath === null) {
    if (body.id === 'WELCOME') {
      urlpath = window.location.href.replace(/\/[\x20-\x2E\x30-\x7E]+$/, "/doc/nav/language.json");
      if (urlpath.indexOf("language.json") === -1) {
        urlpath += "/doc/nav/language.json";
      }
    } else if (body.id === 'PORTAL_1' && body.className === 'INDEX') {
      urlpath = window.location.href.replace(/\/[\x20-\x2E\x30-\x7E]+$/, "/nav/language.json");
      if (urlpath.indexOf("language.json") === -1) {
        urlpath += "/nav/language.json";
      }
    } else if (body.id.indexOf('PORTAL') !== -1 && body.className !== 'INDEX') {
      urlpath = window.location.href.replace(/\/[\x20-\x2E\x30-\x7E]+$/, "/language.json");
      if (urlpath !== undefined && urlpath !== null && urlpath.indexOf("language.json") === -1) {
        urlpath += "/language.json";
      }
    } else if (body.id === 'searchbody' ) {
      //alert(window.location.href);      
      urlpath = window.location.href.replace(/\/[\x20-\x2E\x30-\x7E]+$/, "/language.json");
      if (urlpath !== undefined && urlpath !== null && urlpath.indexOf("language.json") === -1) {
        urlpath += "/language.json";
      }
   } else if (body.className.indexOf("category-page") === -1 || body.id !== 'searchbody' ) {
      linkEle = document.getElementsByTagName("link");
      for (i1 = 0; i1 < linkEle.length; i1 += 1) {
        if (linkEle[i1].getAttribute("rel") === 'Start' || linkEle[i1].getAttribute("rel") === 'start') {
            urlpath =linkEle[i1].href.replace(/\/[\x20-\x2E\x30-\x7E]+$/,'/nav/language.json');
        }
      }
      if (urlpath !== undefined && urlpath !== null && urlpath.indexOf("language.json") === -1) {
        urlpath += "/nav/language.json";
      }
    }
 // }
  if (urlpath !== undefined && urlpath !== null && urlpath.length > 0) {
    function getHttpObject() {
      var xhr = false;
      if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest();
      } else if (window.ActiveXObject) {
        try {
          xhr = new window.ActiveXObject("Msxml2.XMLHTTP");
        } catch (e1) {
          try {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
          } catch (e2) {
            xhr = false;
          }
        }
      }
      return xhr;
    }
    var langData = { "lang" : [
{"c": "en", "h" : "#"},
{ }
]};
     function parseResponse_lang() {
        var jso, ul1, ipr = 0, iIter;
        //if (request.readyState === 4) {
          //if (request.status === 200 || request.status === 304 || request.status === 0) {
             jso = langData;
             for (ipr = 0; ipr < jso.lang.length; ipr += 1) {
              if (jso.lang[ipr] !== undefined) {
                if (jso.lang[ipr].c !== undefined) {
                  //langCode[jso.lang[ipr].c] = jso.lang[ipr].n;
                  var keys = jso.lang[ipr].c, href = jso.lang[ipr].h;
                  langList[keys] = href;
                }
              }
             }
             langErr = 1;
          /*} else {
            langErr = 1;
          }*/
        //}
    }
    parseResponse_lang();
  /*try {
    if (request) {
      request.onreadystatechange = function () {
        parseResponse_lang(request);
      };
      request.open("GET", urlpath, true);
      request.send(null);
    }
  } catch (e) {
    langErr = 1;
  }*/
  }
}
addLoadEvent(readLang);
function modifyHeader() {
  "use strict";
  var oldHeader, headerDiv, logoA, searchDiv, simpDiv, i = 0, headerImg, sL = 0, cat, libpn,
    searchForm, searchLabel, prodLabel, prodSelect, option, search, button, folder = "", spanS,
    headerEle, body, spanUI, alloption, j = 0, setProd = 0, headernav, user = "", folderSearch,
    liSign, aSign, imgSign, spanSign, shadUl, shadLi, shadA, ulSign, langShad, gospan, searchURL,
    langURL, linkEle, i1 = 0, searchDiv1, spanSearch, productSearch, metas, k = 0, divLogo;
  /*function setBase() {
   searchURL = window.location.hostname + "/";
   if (searchURL.indexOf("pdb-stage") !== -1) {
     searchURL = "http://" + searchURL+"oracleSearch.jsp";
   } else {
     searchURL = "//" + searchURL.replace("/$","") + "apps/search/search.jsp";
   }
  }
  setBase();*/
  searchURL = "http://docs.oracle.com/apps/search/search.jsp";
  oldHeader = document.getElementsByTagName('header')[0];
  while (oldHeader.lastChild) {
    oldHeader.removeChild(oldHeader.lastChild);
  }
  body = document.getElementsByTagName('body')[0];
  headerDiv = document.createElement("div");
  headerDiv.className = "w1024";
  headerDiv.style.minHeight = "55px";
  headerDiv.style.display = "block";
  headerDiv.style.margin = "0";
  headerDiv.style.padding = "0";
  divLogo = document.createElement("div");
  divLogo.className = "oracle-logo";
  logoA = document.createElement("a");
  setBaseUrl();
  logoA.href = "#"; // This will be http://docs.oracle.com externally
  headerImg = document.createElement("img");
  headerImg.border = "0";
  headerImg.maxWidth = "none";
  headerImg.width = "236";
  headerImg.height = "22";
  headerImg.alt = "Oracle Documentation";
  setBaseUrl();
  headerImg.src = dcommonPath + "img/oracle-doc-logo.png";
  logoA.appendChild(headerImg);
  divLogo.appendChild(logoA);
  headerDiv.appendChild(divLogo);
  headernav = document.createElement("div");
  headernav.id = "headernav";
  headernav.className = "glyph";
  ulSign = document.createElement("ul");
  if (getCookieData("ORA_UCM_INFO").split("~").length > 3) {
      user = "Welcome " + getCookieData("ORA_UCM_INFO").split("~")[2];
  }
  cat = document.getElementById("category");
  if (user === "") {
    liSign = document.createElement("li");
    liSign.id = "login";
    aSign = document.createElement("a");
    aSign.id = "signInLink";
    aSign.href = "http://www.oracle.com/webapps/redirect/signon?nexturl=" +
    window.location.href;
    imgSign = document.createElement("img");
    imgSign.width = "14";
    imgSign.height = "19";
    imgSign.style.verticalAlign = "text-bottom";
    imgSign.alt = "Sign In Icon";
    imgSign.style.padding = "0";
    setBaseUrl();
    imgSign.src = dcommonPath + "img/sign-on.png";
    aSign.appendChild(imgSign);
    aSign.appendChild(document.createTextNode(" Sign In"));
    liSign.appendChild(aSign);
    ulSign.appendChild(liSign);
  } else {
    liSign = document.createElement("li");
    liSign.id = "login";    
    aSign = document.createElement("a");
    aSign.href = "#";
    aSign.id = "signInLink";    
    aSign.appendChild(document.createTextNode(user));
    spanSign = document.createElement("span");
    spanSign.className = "JetFW-caret-s_16";
    spanSign.appendChild(document.createTextNode(" "));
    aSign.appendChild(spanSign);
    liSign.appendChild(aSign);
    shadUl = document.createElement("ul");
    shadUl.className = "shadow";
    shadLi = document.createElement("li");
    shadA = document.createElement("a");
    shadA.href = "#";
    shadA.appendChild(document.createTextNode("Sign Out"));
    shadA.onclick = function () { return function(){sso_sign_out();}}();
    shadLi.appendChild(shadA);
    shadUl.appendChild(shadLi);
    liSign.appendChild(shadUl);
    ulSign.appendChild(liSign);
  }
  //ulSign.appendChild(langLi);
  //headernav.appendChild(ulSign);
  headerDiv.appendChild(headernav);
  /*spanUI = document.createElement("span");
  spanUI.setAttribute("role", "status");
  spanUI.setAttribute("aria-live", "polite");
  spanUI.className = "ui-helper-hidden-accessible";*/
  if (document.getElementById("searchbody") === undefined || document.getElementById("searchbody") === null) {
    searchDiv = document.createElement("div");
    searchDiv.className = "headersearch";
    searchDiv1 = document.createElement("div");
    searchDiv1.id = "searchcontent";
    spanSearch = document.createElement("span");
    spanSearch.setAttribute("role", "status");
    spanSearch.setAttribute("aria-live", "polite");
    spanSearch.className = "ui-helper-hidden-accessible";
    searchDiv1.appendChild(spanSearch);
    /*searchDiv.style.position = "relative";
    searchDiv.style.marginRight = "15px";
    searchDiv.style.marginTop = "11px";
    searchDiv.style.cssFloat ="right";*/
    //simpDiv = document.createElement("div");
    //simpDiv.id = "SIMPLESEARCH";
    searchForm = document.createElement("form");
    searchForm.id = "searchpage";
    searchForm.name = "searchpage";
    searchForm.action = searchURL;
    searchLabel = document.createElement("label");
    /*searchLabel.style.cssFloat = "left";
    searchLabel.style.fontSize = "12px";
    searchLabel.style.paddingRight = "7px";
    searchLabel.style.top = "5px";
    searchLabel.style.position = "relative";
    searchLabel.style.fontWeight = "bold";*/
    searchLabel.htmlFor = "searchField";
    searchLabel.className = "obscure";
    searchLabel.appendChild(document.createTextNode("Search "));
    searchForm.appendChild(searchLabel);
    spanS = document.createElement("span");
    spanS.className = "selectspan";
    prodLabel = document.createElement("label");
    prodLabel.className = "obscure";
    //prodLabel.style.cssFloat = "left";
    prodLabel.htmlFor = "selectproduct";
    prodLabel.appendChild(document.createTextNode("Select a product"));
    spanS.appendChild(prodLabel);
    //searchForm.appendChild(spanUI);
    prodSelect = document.createElement("select");
    prodSelect.id = "selectproduct";
    prodSelect.className = "SELECTLRG";
    prodSelect.name = "category";
    gospan = document.createElement("span");
    gospan.className = "gospan";
    /*prodSelect.style.cssFloat = "left";
    prodSelect.style.margin = "0 3px";
    prodSelect.style.marginRight = "0";*/
    if (listOfCategories.length < 1) {
      getCategories();
    }
    //prodSelect.name = "filter";
    if (prodList.products !== undefined ) {
      alloption = document.createElement("option");
      alloption.value = "all";
      alloption.appendChild(document.createTextNode("All Products"));
      prodSelect.appendChild(alloption);
    }
    if(listOfCategories.length > 1) {
    for (var key in listOfCategories) {
      if (prodList.products !== undefined ) {
          setProd = 0;
          for (i = 0; i < prodList.products.length - 2; i += 1) {
              if (prodList.products[i] !== undefined) {
                  if (prodList.products[i].name !== undefined) {
                      if(prodList.products[i].filter !== undefined) {
                        if(key.indexOf(prodList.products[i].filter) !== -1) {
                          option = document.createElement("option");
                          option.appendChild(document.createTextNode(prodList.products[i].name));
                          if (prodList.products[i].id !== undefined) {
                              if (prodList.products[i].filter !== undefined) {
                                option.value = prodList.products[i].filter;
                              } else { 
                                option.value = prodList.products[i].id;
                              }
                               if(document.getElementById((prodList.products[i].id).toLowerCase()+"body") !== null) {
                                    option.selected = true;
                               } else {
                                if(cat !== undefined && cat !== null) {
                                  if(cat.innerHTML.indexOf(prodList.products[i].name) !== -1) {
                                    option.selected = true;
                                  }
                                }
                               }
                          } else {
                              option.value = prodList.products[i].name;
                              if(document.getElementById((prodList.products[i].name).toLowerCase()+"body") !== null) {
                                option.selected = true;
                            } else {
                              if(cat !== undefined && cat !== null) {
                                if(cat.innerHTML.indexOf(prodList.products[i].name) !== -1) {
                                  option.selected = true;
                                }
                              }
                            }
                          }
                          setProd = 1;
                          prodSelect.appendChild(option);
                        }
                      }
                  }
              }
          }
          if ( setProd === 0) {
             option = document.createElement("option");
             option.value = key;
             option.appendChild(document.createTextNode(listOfCategories[key]));
             prodSelect.appendChild(option);
          }
      }
    }
    } else {
      if (prodList.products !== undefined ) {
          setProd = 0;
          for (i = 0; i < prodList.products.length - 2; i += 1) {
              if (prodList.products[i] !== undefined) {
                  if (prodList.products[i].name !== undefined) {
                      if(prodList.products[i].filter !== undefined) {
                        //if(key.indexOf(prodList.products[i].filter) !== -1) {
                          option = document.createElement("option");
                          option.appendChild(document.createTextNode(prodList.products[i].name));
                          if (prodList.products[i].id !== undefined) {
                              if (prodList.products[i].filter !== undefined) {
                                option.value = prodList.products[i].filter;
                              } else { 
                                option.value = prodList.products[i].id;
                              }
                               if(document.getElementById((prodList.products[i].id).toLowerCase()+"body") !== null) {
                                    option.selected = true;
                               } else {
                                if(cat !== undefined && cat !== null) {
                                  if(cat.innerHTML.indexOf(prodList.products[i].name) !== -1) {
                                    option.selected = true;
                                  }
                                }
                               }
                          } else {
                              option.value = prodList.products[i].name;
                              if(document.getElementById((prodList.products[i].name).toLowerCase()+"body") !== null) {
                                option.selected = true;
                            } else {
                              if(cat !== undefined && cat !== null) {
                                if(cat.innerHTML.indexOf(prodList.products[i].name) !== -1) {
                                  option.selected = true;
                                }
                              }
                            }
                          }
                          setProd = 1;
                          prodSelect.appendChild(option);
                        //}
                      }
                  }
              }
          }
          /*if ( setProd === 0) {
             option = document.createElement("option");
             option.value = prodList.products[i].filter;
             option.appendChild(document.createTextNode(listOfCategories[key]));
             prodSelect.appendChild(option);
          }*/
      }
    }
    spanS.appendChild(prodSelect);
    searchForm.appendChild(spanS);
    search = document.createElement("input");
    search.id = "searchField";
    search.className = "ui-autocomplete-input";
    search.onblur = function () { addText(this); };
    search.onfocus = function () { checkText(this); };
    //search.onload = function () { if() {this.value !== 'All Products'} };
    search.value = "Search products";
    search.type = "text";
    search.style.color = "#999";
    //search.style.paddingLeft = "1px";
    //search.style.cssFloat = "left";
    search.name = "q";
    gospan.appendChild(search);
    productSearch = document.createElement("input");
    productSearch.type = "hidden";
    productSearch.name = "product";
    productSearch.id = "productSearch";
    productSearch.value = "";
    metas = document.getElementsByTagName("meta");
    for (k = 0; k < metas.length; k += 1) {
      if ((metas[k].name === "dcterms.identifier")) {
        folder = metas[k].content.toLowerCase();
      }
      if(metas[k].name === "partno" && productSearch.value === "") {
         productSearch.value = metas[k].content.toLowerCase();
      }
    }
    if(productSearch.value === "" && folder !== "") {
      productSearch.value = folder;
    } else if ( folder !== "" && productSearch.value !== "") {
      folderSearch = document.createElement("input");
      folderSearch.type = "hidden";
      folderSearch.name = "folder";
      folderSearch.value = folder;
      //searchForm.appendChild(folderSearch);
    }
    if (productSearch.value === "") {
      libpn = document.getElementById("libpn");
      if (libpn !== null && libpn !== undefined) {
        if(libpn.innerHTML !== undefined && libpn.innerHTML !== null && libpn.innerHTML !== undefined) {
          productSearch.value = libpn.innerHTML;
        }
      }
    }
    searchForm.appendChild(productSearch);
    button = document.createElement("input");
    button.id = "SEARCHBUTTON";
    button.type = "submit";
    //button.style.cssFloat = "left";
    button.value = "Search";
    gospan.appendChild(button);
    searchForm.appendChild(gospan);
    searchDiv1.appendChild(searchForm);
    searchDiv.appendChild(searchDiv1);
    headerDiv.appendChild(searchDiv);
  }
  headerEle = document.getElementsByTagName('header')[0];
  if (headerEle !== undefined && headerEle !== null) {
    headerEle.appendChild(headerDiv);
  } else {
    headerEle = document.createElement("header");
    headerEle.appendChild(headerDiv);
    body.insertBefore(headerEle, body.firstChild);
  }
  if (document.getElementById("content") !== null && document.getElementById("content") !== undefined) {
    document.getElementById("content").style.marginTop = headerEle.offsetHeight + "px";
  }
}
//addLoadEvent(modifyHeader);

function addNavigation() {
    "use strict";
    var leftNav, ul, li, a, homeA, homeLi, homeImg, content, body, createNav = false, i = 0, showCont,
      hideCont, divs, divNav = false, j = 0;
    body = document.getElementsByTagName("body");
    for (i = 0; i < body.length; i += 1) {
        if (body[i].className && body[i].className.indexOf("category-page") !== -1) { createNav = true; }
    }
    divs = document.getElementsByTagName("div");
    for (i = 0; i < divs.length; i += 1) {
        if (divs[i].className && divs[i].className.indexOf("left-nav") !== -1) { divNav = true; }
    }
    if (createNav && !divNav) {
        showCont = document.createElement("div");
        showCont.id = "shownav";
        showCont.title = "Show Navigation";
        showCont.onclick = function() { return function() {opensidebar(); return false;}}();
        hideCont = document.createElement("div");
        hideCont.id = "hidenav";
        hideCont.onclick = function() { return function() {closesidebar(); return false;}}();
        leftNav = document.createElement("div");
        leftNav.className = "left-nav";
        ul = document.createElement("ul");
        homeLi = document.createElement("li");
        homeA = document.createElement("a");
        homeA.id = "Home";
        setBaseUrl();
        homeA.href = baseurl; // This will be http://docs.oracle.com externally
        homeImg = document.createElement("img");
        homeImg.width = "7";
        homeImg.height = "10";
        homeImg.alt = "left arrow";
        homeImg.src = dcommonPath + "img/arrow-left.png";
        homeA.appendChild(homeImg);
        homeA.appendChild(document.createTextNode(" Home"));
        homeLi.appendChild(homeA);
        ul.appendChild(homeLi);
         if (prodList.products !== undefined) {
          for (i = 0; i < prodList.products.length; i += 1) {
              if (prodList.products[i] !== undefined) {
                  if (prodList.products[i].name !== undefined) {
                    li = document.createElement("li");
                    a = document.createElement("a");
                    if (prodList.products[i].id !== undefined) {
                        a.id = prodList.products[i].id;
                    } else {
                        a.id = prodList.products[i].name;
                       
                    }
                    if (prodList.products[i].href !== undefined) {
                        a.href = baseurl +prodList.products[i].href;
                    } else {
                        a.href = "#";
                    }
                    if(document.getElementById((prodList.products[i].id).toLowerCase()+"body") !== null) {
                      a.className = "selected";
                    }
                    a.appendChild(document.createTextNode(prodList.products[i].name));
                    li.appendChild(a);
                    ul.appendChild(li);
                  }
              }
          }
         }
         leftNav.appendChild(ul);
         content = document.getElementById("content");
         if (content !== null) {
            content.insertBefore(leftNav, content.firstChild);
            sidebarfun();
            if(document.getElementById("hidenav") === undefined || document.getElementById("shownav") === null) {
            content.insertBefore(hideCont, content.firstChild);
            }
            if(document.getElementById("shownav") === undefined || document.getElementById("shownav") === null) {
            content.insertBefore(showCont, content.firstChild);
            }
         }
     }
    if (document.getElementById("content") !== null && document.getElementById("content") !== undefined) {
    document.getElementById("content").style.marginTop = document.getElementsByTagName('header')[0].offsetHeight + "px";
  }
}
//addLoadEvent(addNavigation);
function addCatalyst() {
  "use strict";
  var siteUrl = "//www.oracleimg.com/us/assets/metrics/ora_docs.js";
  function loadScript(url) {
    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = url;
    if (document.getElementsByTagName('body')[0] !== null && document.getElementsByTagName('body')[0] !== undefined) {
      document.getElementsByTagName('body')[0].appendChild(script);
    }
  }
  loadScript(siteUrl);
}
//addLoadEvent(addCatalyst);

function modifyFooter () {
  "use strict";
  var oldFooter, footerDiv, body, divs, i = 0, footerExist = false, footDiv, cpyrSpan,
    ulFooterLinks, ulFli1, aF1, ulFli2, aF2, ulFli3, aF3, ulFli4, aF4, ulFli5, aF5, langURL,
    footList, mainDiv, ulLang, langLi, langA, langImg, langSpan, enLang, enLangA, langShad,
    linkEle, sL = 0, body, i1 = 0, d = new Date();
  body = document.getElementsByTagName('body')[0];
  oldFooter = document.getElementsByTagName('footer')[0];
  footerDiv = document.createElement("div");
  footerDiv.className = "footer-container clearboth";
  footDiv = document.createElement("div");
  footDiv.style.maxWidth = "994px";
  footDiv.style.padding = "10px 0 0 17px";
  mainDiv = document.createElement("div");
  mainDiv.id = "footernav";
  mainDiv.className = "glyph";
  ulLang = document.createElement("ul");
  langLi = document.createElement("li");
  langA = document.createElement("a");
  langA.href = "#";
  langImg = document.createElement("img");
  langImg.width = "16";
  langImg.height = "16";
  langImg.style.verticalAlign = "middle";
  langImg.style.margin = "0 4px";
  langImg.alt = "Choose your language";
  setBaseUrl();
  langImg.src = dcommonPath + "img/func_worldglobe_16_act.png";
  langA.appendChild(langImg);
  langSpan = document.createElement("span");
  langSpan.className = "JetFW-caret-n_16";
  langSpan.appendChild(document.createTextNode(" "));
  langA.appendChild(langSpan);
  langLi.appendChild(langA);
  langShad = document.createElement("ul");
  langShad.className = "shadow";
  if (body.id === 'WELCOME') {
    langURL = window.location.href.replace(/\/[\x20-\x2E\x30-\x7E]+$/, "/doc/nav/language.json");
  } else if (body.id === 'PORTAL_1' && body.className === 'INDEX') {
    langURL = window.location.href.replace(/\/[\x20-\x2E\x30-\x7E]+$/, "/nav/language.json");
  } else if (body.id.indexOf('PORTAL') !== -1 && body.className !== 'INDEX') {
    langURL = window.location.href.replace(/\/[\x20-\x2E\x30-\x7E]+$/, "/language.json");
  } else if (body.id === 'searchbody' ) {
      //alert(window.location.href);      
      langURL = window.location.href.replace(/\/[\x20-\x2E\x30-\x7E]+$/, "/language.json");
      if (langURL !== undefined && langURL !== null && langURL.indexOf("language.json") === -1) {
        langURL += "/language.json";
      }
  } else if (body.className.indexOf("category-page") === -1 || body.id !== 'searchbody' ) {
    linkEle = document.getElementsByTagName("link");
    for (i1 = 0; i1 < linkEle.length; i1 += 1) {
      if (linkEle[i1].getAttribute("rel") === 'Start' || linkEle[i1].getAttribute("rel") === 'start') {
          langURL =linkEle[i1].href.replace(/\/[\x20-\x2E\x30-\x7E]+$/,'/nav/language.json');
      }
    }
  }
  //alert(langURL);
  if (langURL === undefined || langURL === "") {
    enLang = document.createElement("li");
    enLangA = document.createElement("a");
    enLangA.href = "#";
    enLangA.appendChild(document.createTextNode("English"));
    enLang.appendChild(enLangA);
    langShad.appendChild(enLang);
  } else {
    var checkReady = function (callback) {
     if (langErr === 1) {
        sL = 0;
        for (var keys in langList) {
          //alert(keys +" : "+langList[keys]+ " : "+langCode[keys]);
          if (langList[keys] !== undefined) {
            enLang = document.createElement("li");
            enLangA = document.createElement("a");
            enLangA.href = langList[keys];
            enLangA.id = keys;
            if (langCode[keys]) {
              enLangA.appendChild(document.createTextNode(langCode[keys]));
            } else {
              enLangA.appendChild(document.createTextNode(keys));
            }
            enLang.appendChild(enLangA);
            langShad.appendChild(enLang);
            sL += 1;
          }
        }
        if (sL === 0) {
          enLang = document.createElement("li");
          enLangA = document.createElement("a");
          enLangA.href = "#";
          enLangA.appendChild(document.createTextNode("English"));
          enLang.appendChild(enLangA);
          langShad.appendChild(enLang);
        }
     } else {
       window.setTimeout(function () { checkReady(callback); }, 1);
     }
    };
    checkReady(function () {});
  }
  langLi.appendChild(langShad);
  ulLang.appendChild(langLi);
  mainDiv.appendChild(ulLang);
  footDiv.appendChild(mainDiv);
  footList = document.createElement("div");
  footList.className = "footer-list"; 
  ulFooterLinks = document.createElement("ul");  
  ulFli1 = document.createElement("li");
  aF1 = document.createElement("a");
  aF1.href = "http://www.oracle.com/corporate/index.html";
  aF1.appendChild(document.createTextNode("About Oracle"));
  ulFli1.appendChild(aF1);
  ulFooterLinks.appendChild(ulFli1);
  ulFli2 = document.createElement("li");
  aF2 = document.createElement("a");
  aF2.href = "http://www.oracle.com/us/corporate/contact/index.html";
  aF2.appendChild(document.createTextNode("Contact Us"));
  ulFli2.appendChild(aF2);
  ulFooterLinks.appendChild(ulFli2);
  ulFli3 = document.createElement("li");
  aF3 = document.createElement("a");
  aF3.href = "http://www.oracle.com/us/legal/index.html";
  aF3.appendChild(document.createTextNode("Legal Notices"));
  ulFli3.appendChild(aF3);
  ulFooterLinks.appendChild(ulFli3);
  ulFli4 = document.createElement("li");
  aF4 = document.createElement("a");
  aF4.href = "http://www.oracle.com/us/legal/terms/index.html";
  aF4.appendChild(document.createTextNode("Terms of Use"));
  ulFli4.appendChild(aF4);
  ulFooterLinks.appendChild(ulFli4);
  ulFli5 = document.createElement("li");
  aF5 = document.createElement("a");
  aF5.href = "http://www.oracle.com/us/legal/privacy/index.html";
  aF5.appendChild(document.createTextNode("Your Privacy Rights"));
  ulFli5.appendChild(aF5);
  ulFooterLinks.appendChild(ulFli5);
  footList.appendChild(ulFooterLinks);
  footDiv.appendChild(footList);
  cpyrSpan = document.createElement("span");
  cpyrSpan.className = "small";
  cpyrSpan.style.display = "block";
  cpyrSpan.appendChild(document.createTextNode("Copyright \u00A9 " + d.getFullYear() + ", Oracle and/or its affiliates. All rights reserved. "));
  footDiv.appendChild(cpyrSpan);
  footerDiv.appendChild(footDiv);
  if (oldFooter !== undefined && oldFooter !== null) {
    while (oldFooter.lastChild) {
      oldFooter.removeChild(oldFooter.lastChild);
    }
    oldFooter = document.getElementsByTagName('footer')[0];
    oldFooter.appendChild(footerDiv);
  } else {
      divs = document.getElementsByTagName("body");
      for (i = 0; i < divs.length; i += 1) {
          if (divs[i].className && divs[i].className.indexOf("footer-container") !== -1) { footerExist = true; }
      }
      if(! footerExist) {
        body = document.getElementsByTagName('body')[0];
        body.appendChild(footerDiv);
      }
  }
}
addLoadEvent(modifyFooter);

function openWindow (aEle) {
  "use strict";
  var myWin = window.open(aEle.href, "_blank", "menubar=no, toolbar=no");
  return false;
}
function createComments() {
  "use strict";
  var userCommentsTitleLabel, userCommentsTitle, subject, From, postPublic,
    postPublicLabel, postAnonymous, postAnonymousLabel, div2, publicRadio, signOn,
    signOnLink, user = "", userCommentsBodyLabel, userCommentsBody, hidden,
    topictitle, p, a1, a2, a3, submit, outDiv, commentForm, l10n, fbForm,
    fullSec, thanksMsg, newImg, newImg1, newImg2;
  fbForm = document.getElementById("feedbackForm");
  if (fbForm !== null && typeof fbForm !== 'undefined') {
    l10n = {
      reader_comment : "Reader Comment",
      subject : "Subject",
      from : "From",
      anonymous : "Anonymous",
      or : " (or ",
      sign_in : "Sign In",
      comment_first_part : "Comments, corrections, and suggestions are forwarded to authors every week.",
      comment_second_part : "By submitting, you confirm you agree to the ",
      comment_third_part : "terms and conditions",
      comment_fourth_part : ". ",
      comment_fifth_part : "Use the ",
      comment_fifth_part_otn : "OTN forums",
      comment_sixth_part : " for product questions. ",
      comment_seventh_part : "For support or consulting, file a service request through ",
      comment_eighth_part : "My Oracle Support",
      submit : "Submit"
    };
    if (readCookie("ORA_UCM_INFO").match(/([\-.+\w]+@[\-.+\w]+)/)) {
      user = RegExp.$1;
    }
    userCommentsTitleLabel = document.createElement("label");
    //userCommentsTitleLabel.style.color = "#666";
    userCommentsTitleLabel.htmlFor = "userCommentsTitle";
    userCommentsTitleLabel.appendChild(document.createTextNode(l10n.subject));

    userCommentsTitle = document.createElement("input");
    userCommentsTitle.type = "text";
    userCommentsTitle.name = "title";
    userCommentsTitle.id = "userCommentsTitle";
    userCommentsTitle.style.width = "100%";

    subject = document.createElement("p");
    subject.style.marginBottom = "6px";
    //subject.style.marginTop = "1ex";
    subject.appendChild(userCommentsTitleLabel);
    subject.appendChild(document.createTextNode(" "));
    subject.appendChild(userCommentsTitle);

    From = document.createElement("label");
    From.style.color = "#666";
    From.style.height = "2px";
    From.style.textIndent = "-5900px";
    From.appendChild(document.createTextNode(l10n.from));

    postPublic = document.createElement("input");
    postPublic.type = "radio";
    postPublic.name = "submitter";
    postPublic.value = user.toLowerCase();
    postPublic.id = "postPublic";

    postPublicLabel = document.createElement("label");
    postPublicLabel.htmlFor = "postPublic";
    postPublicLabel.appendChild(document.createTextNode(user.toLowerCase()));

    postAnonymous = document.createElement("input");
    postAnonymous.type = "radio";
    postAnonymous.name = "submitter";
    postAnonymous.value = "";
    postAnonymous.id = "postAnonymous";

    postAnonymousLabel = document.createElement("label");
    postAnonymousLabel.htmlFor = "postAnonymous";
    postAnonymousLabel.appendChild(document.createTextNode(l10n.anonymous));

    div2 = document.createElement("p");
    div2.style.margin = "0 0 1ex 0";
    div2.appendChild(From);
    div2.appendChild(document.createTextNode(" \u00A0 \u00A0 "));
    publicRadio = document.createElement("span");
    publicRadio.appendChild(postPublic);
    //publicRadio.appendChild(document.createElement("br"));
    publicRadio.appendChild(document.createTextNode(" "));
    publicRadio.appendChild(postPublicLabel);
    publicRadio.appendChild(document.createTextNode(" "));
    publicRadio.appendChild(document.createElement("br"));
    div2.appendChild(document.createElement("br"));
    div2.appendChild(publicRadio);
    div2.appendChild(postAnonymous);
    div2.appendChild(document.createTextNode(" "));
    div2.appendChild(postAnonymousLabel);

    signOn = document.createElement("span");
    signOn.style.display = "none";
    signOn.appendChild(document.createTextNode(l10n.or));
    signOnLink = document.createElement("a");
    signOnLink.href = "http://www.oracle.com/webapps/redirect/signon?nexturl=" +
      window.location.href;
    signOnLink.appendChild(document.createTextNode(l10n.sign_in));
    if (document.getElementById("searchbody") !== undefined && document.getElementById("searchbody") !== null) {
      signOnLink.className = "newwindow";
      signOnLink.target = "_blank";
      newImg = document.createElement("img");
      newImg.src = dcommonPath + "img/new-window.png";
      newImg.alt = "Opens a new window";
      newImg.style.display = "inline";
      newImg.style.border = "none";
      newImg.style.borderRadius = "0";
      newImg.style.margin = "0 0 0 2px";
      newImg.style.padding = "0";
      signOnLink.appendChild(newImg);
    }
    signOn.appendChild(signOnLink);
    signOn.appendChild(document.createTextNode(")"));
    div2.appendChild(signOn);

    if (user === "") {
      publicRadio.style.display = "none";
      signOn.style.display = "inline";
      postAnonymous.defaultChecked = true;
    } else {
      postPublic.defaultChecked = true;
      //postPublic.style.marginLeft = "-12px";
    }

    userCommentsBodyLabel = document.createElement("label");
    userCommentsBodyLabel.htmlFor = "userCommentsBody";
    userCommentsBodyLabel.appendChild(document.createTextNode("Comment body:"));
    userCommentsBodyLabel.style.display = "none";

    userCommentsBody = document.createElement("textarea");
    userCommentsBody.id = "userCommentsBody";
    userCommentsBody.style.width = "100%";
    userCommentsBody.rows = "5";
    //userCommentsBody.cols = "50";
    userCommentsBody.name = "comment_text";

    hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.id = "path";
    hidden.name = "path";
    hidden.value = window.location.href;

    topictitle = document.createElement("input");
    topictitle.type = "hidden";
    topictitle.name = "topictitle";
    topictitle.id = "topictitle";
    topictitle.value = document.title;

    p = document.createElement("p");
    //p.style.color = "#333";
    //p.style.marginTop = "0";
    //p.style.marginBottom = "0.75rem";
    p.style.fontSize = "12px";
    p.appendChild(document.createTextNode(l10n.comment_first_part));
    p.appendChild(document.createTextNode(" " + l10n.comment_second_part));
    a1 = document.createElement("a");
    a1.style.fontSize = "12px";
    a1.href = "//docs.oracle.com/cd/E23003_01/html/" + "en" +
        "/comment_disclaimer.htm";
    a1.appendChild(document.createTextNode(l10n.comment_third_part));
    p.appendChild(a1);
    p.appendChild(document.createTextNode(l10n.comment_fourth_part));
    p.appendChild(document.createTextNode(l10n.comment_fifth_part));
    a2 = document.createElement("a");
    a2.style.fontSize = "12px";
    a2.href = "https://community.oracle.com/";
    a2.appendChild(document.createTextNode(l10n.comment_fifth_part_otn));
    if (document.getElementById("searchbody") !== undefined && document.getElementById("searchbody") !== null) {
      a2.className = "newwindow";
      a2.target = "_blank";
      newImg1 = document.createElement("img");
      newImg1.src = dcommonPath + "img/new-window.png";
      newImg1.alt = "Opens a new window";
      newImg1.style.display = "inline";
      newImg1.style.border = "none";
      newImg1.style.borderRadius = "0";
      newImg1.style.margin = "0 0 0 2px";
      newImg1.style.padding = "0";
      a2.appendChild(newImg1);
    }
    p.appendChild(a2);
    p.appendChild(document.createTextNode(l10n.comment_sixth_part));
    p.appendChild(document.createTextNode(
      l10n.comment_seventh_part
    ));
    a3 = document.createElement("a");
    a3.href = "https://support.oracle.com/";
    a3.style.fontSize = "12px";
    a3.appendChild(document.createTextNode(l10n.comment_eighth_part));
    if (document.getElementById("searchbody") !== undefined && document.getElementById("searchbody") !== null) {
      a3.className = "newwindow";
      a3.target = "_blank";
      newImg2 = document.createElement("img");
      newImg2.src = dcommonPath + "img/new-window.png";
      newImg2.alt = "Opens a new window";
      newImg2.style.display = "inline";
      newImg2.style.border = "none";
      newImg2.style.borderRadius = "0";
      newImg2.style.margin = "0 0 0 2px";
      newImg2.style.padding = "0";
      a3.appendChild(newImg2);
    }
    p.appendChild(a3);
    p.appendChild(document.createTextNode("."));

    submit = document.createElement("input");
    submit.type = "submit";
    submit.value = l10n.submit;
    submit.className = "button";
    submit.id = "submitajax";
    submit.style.marginTop = "7px";
    //submit.style.cssFloat = "right";
    submit.onclick = function() {submitFeedback(); return false;};
    submit.style.display = "block";
    outDiv = document.createElement("div");
    outDiv.style.marginTop = "0px";
    outDiv.style.marginRight = "0px";
    outDiv.appendChild(subject);
    outDiv.appendChild(hidden);
    outDiv.appendChild(topictitle);
    outDiv.appendChild(subject);
    outDiv.appendChild(userCommentsBody);
    div2.appendChild(document.createElement("br"));
    div2.appendChild(submit);
    outDiv.appendChild(div2);
    //outDiv.appendChild(document.createElement("br"));
    commentForm = document.createElement("form");
    commentForm.method = "post";
    //commentForm.style.marginTop = "1rem";
    if (window.location.href.indexOf(".us.oracle.com") !== -1) {
      commentForm.action = "//tahiti-stage.us.oracle.com/pls/tahiti/comments_test";
    } else {
      commentForm.action = "//www.oracle.com/pls/tahiti/comments_test";
    }
    commentForm.appendChild(outDiv);
    //append this commentForm inside the element, where you want it to be posted.
    fullSec = document.createElement("div");
    fullSec.id = "commentSection";
    fullSec.appendChild(commentForm);
    fullSec.appendChild(p);
    fbForm.appendChild(fullSec);
    thanksMsg = document.createElement("div");
    thanksMsg.id = "thanksMsg";
    thanksMsg.style.display = "none";
    thanksMsg.style.fontSize = "14px";
    thanksMsg.appendChild(document.createTextNode("Thank you for your feedback."));
    fbForm.appendChild(thanksMsg);
  }
}
addLoadEvent(createComments);
function submitFeedback() {
  var submitter = $("input:radio[name=submitter]:checked").val();
  var userCommentsBody = $("#userCommentsBody").val();
  var userCommentsTitle = $("#userCommentsTitle").val();
  var path = $("#path").val();
  var topictitle = $("#topictitle").val();
  var action = "//www.oracle.com/pls/tahiti/comments_test";
  if (window.location.href.indexOf(".us.oracle.com") !== -1) {
    action = "//tahiti-stage.us.oracle.com/pls/tahiti/comments_test";
  } else {
    action = "//www.oracle.com/pls/tahiti/comments_test";
  }
  var dataString = 'submitter='+ submitter + '&comment_text=' + userCommentsBody + '&title=' + userCommentsTitle + '&path=' + encodeURIComponent(path) + '&topictitle=' + topictitle +'';
  if((userCommentsBody !== null && userCommentsBody.trim().length > 0) || (userCommentsTitle !== null && userCommentsTitle.trim().length > 0)){
    $("#thanksMsg").css("width",$("#commentSection").width()+'px');
    $("#commentSection").css("display","none");
    $("#thanksMsg").css("display","block");
    $.ajax({
    type: "POST",
    url: action,
    data: dataString,
    success: function(){
      setTimeout(doSomething, 2000);
      function doSomething() {
        $("#userCommentsBody").val('');
        $("#userCommentsTitle").val('');
        $('#commentSection').css("display","block");
        $("#thanksMsg").css("display","none");
      }
    }, 
    error: function(){
      setTimeout(doSomething, 2000);
      function doSomething() {
        $("#userCommentsBody").val('');
        $("#userCommentsTitle").val('');
        $('#commentSection').css("display","block");
        $("#thanksMsg").css("display","none");
      }

      }
    });
  }
}
function targetChange() {
  "use strict";
  var aList, i = 0, r = new RegExp('^(?:[a-z]+:)?//', 'i'), img, classInfo, cat;
  aList = document.getElementsByTagName("a");
  if (document.getElementById("searchbody") === undefined || document.getElementById("searchbody") === null) {
    cat = document.getElementById("category");
    if (cat === null || (cat !== undefined && cat !== null && cat.innerHTML.indexOf("Cloud") === -1)) {
      for (i = 0; i < aList.length; i += 1) {
        classInfo = "";
        if (aList[i].getAttribute("class")) {
          classInfo = aList[i].className + " ";
        }
        setBaseUrl();
        if (aList[i].href && r.test(aList[i].href) && !aList[i].getAttribute("target") && ((classInfo !== '' && classInfo.indexOf("newwindow") === -1 && classInfo.indexOf("various") === -1) || classInfo === '') && !((aList[i].parentNode.parentNode.parentNode.getAttribute("class") && aList[i].parentNode.parentNode.parentNode.className.indexOf("footer-list") !== -1)) && aList[i].href.indexOf("/pls/topic") === -1) {
          if (aList[i].href.indexOf(".oracle.com") === -1) {
            aList[i].target = "_blank";
            img = document.createElement("img");
            img.src = dcommonPath + "img/new-window.png";
            img.alt = "Opens a new window";
            img.style.display = "inline";
            img.style.border = "none";
            img.style.borderRadius = "0";
            img.style.margin = "0 0 0 2px";
            img.style.padding = "0";
            aList[i].className = classInfo + "newwindow";
            aList[i].appendChild(img);
          } else if (aList[i].href.indexOf("docs.oracle.com") === -1 && aList[i].href.indexOf(window.location.hostname) === -1) {
            aList[i].target = "_blank";
            img = document.createElement("img");
            img.src = dcommonPath + "img/new-window.png";
            img.alt = "Opens a new window";
            img.style.display = "inline";
            img.style.border = "none";
            img.style.borderRadius = "0";
            img.style.margin = "0 0 0 2px";
            img.style.padding = "0";
            aList[i].className = classInfo + "newwindow";
            aList[i].appendChild(img);    
          } else if (aList[i].className.indexOf("old-layout") !== -1) {
            aList[i].target = "_blank";
            img = document.createElement("img");
            img.src = dcommonPath + "img/new-window.png";
            img.alt = "Opens a new window";
            img.style.display = "inline";
            img.style.border = "none";
            img.style.borderRadius = "0";
            img.style.margin = "0 0 0 2px";
            img.style.padding = "0";
            aList[i].className = classInfo + "newwindow";
            aList[i].appendChild(img);
          } else if (aList[i].href.indexOf(".pdf") !== -1) {
            //aList[i].target = "_blank";
            img = document.createElement("img");
            img.src = dcommonPath + "img/new-window.png";
            img.alt = "Opens a new window";
            img.style.display = "inline";
            img.style.border = "none";
            img.style.borderRadius = "0";
            img.style.margin = "0 0 0 2px";
            img.style.padding = "0";
            aList[i].className = classInfo + "newwindow";
            aList[i].appendChild(img);
            aList[i].onclick = function() { return function() {openWindow(this); return false;}}();
          }
        }
      }
    }
  }
}
//addLoadEvent(targetChange);

function resizeHeader() {
  var headerEle;
  headerEle = document.getElementsByTagName('header')[0];
  if (headerEle !== undefined && headerEle !== null && document.getElementById("content") !== null && document.getElementById("content") !== undefined) {
    document.getElementById("content").style.marginTop = headerEle.offsetHeight + "px";
  }
}
addLoadEvent(resizeHeader);
window.addEventListener("resize", resizeHeader);