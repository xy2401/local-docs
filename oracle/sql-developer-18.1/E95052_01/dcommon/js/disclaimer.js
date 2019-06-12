/* Copyright 2017, Oracle and/or its affiliates. All rights reserved.
 * Version: 2017.10.05
 *
 * Legal Notices: http://docs.oracle.com/cd/E23003_01/html/en/cpyr.htm
 */

window.ohcdisclaimer = "1.0.2";

(function () {

//for IE without debug console open
if (!window.console) {
  window.console = {
    log: function () {}
  };
}

// Polyfill for String.endsWith
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.lastIndexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

function addCss(rules, id) {
  var style = document.createElement('style');
  style.setAttribute("id", id);
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = rules;
  } else {
    style.appendChild(document.createTextNode(rules));
  }
  document.getElementsByTagName("head")[0].appendChild(style);
};


// Test for JavaDoc content when only main window should be used
function isMainFramePart() {
    var elements = document.getElementsByTagName('frameset');
    var filename = location.pathname.split("/").pop();
    if(elements.length > 0 || filename.endsWith("-frame.html")) {
        return false;
    } else {
        return true;
    }
}

function modifyDocFooter(msg) {
  var padDiv = document.createElement('div');
  padDiv.setAttribute("id", "pad-footer-cn");
  var footerDiv = document.createElement('div');
  footerDiv.setAttribute("id", "footer-cn");
  footerDiv.innerHTML = msg;
  document.body.appendChild(padDiv);
  document.body.appendChild(footerDiv);
}

function addChinaDisclaimer() {

        if ( ! isMainFramePart() ) {
            // Nothing to do
            return;
        }

//        var msg = 'Cloud Services in China region is operated by Tencent Cloud Computing (Beijing) Limited Liability based on Oracle cloud technologies, unless otherwise specified in your order.<br/>ICP# 12345';
//
        // Extra processing for China;
        var msg = 'Cloud Services in China region is operated by Tencent Cloud Computing (Beijing) Limited Liability based on Oracle cloud technologies, unless otherwise specified in your order.';
        var rules = "";
        rules += "#footer-cn {";
        rules += "z-index: 9999;";
        rules += "position: fixed;";
        rules += "bottom: 0;";
        rules += "left: 0;";
        rules += "right: 0;";
        rules += "margin: 0 auto 0 auto;";
        rules += "width: 95%;";
        rules += "background: #B10000;";
        rules += "color: white;";
        rules += "border-radius: 1em 1em 0 0;";
        rules += "box-shadow: 0 0 1em grey;";
        rules += "padding: 0.0em 1em;";
        rules += "text-align: center;";
        rules += "font-size: 13.5px;";
        rules += "line-height: 20px;";
        rules += "font-weight: normal;";
        rules += "font-family: 'Helvetica Neue', Helvetica, 'Open Sans', arial, sans-serif;";
        rules += "clear: both;";
        rules += "}";
        rules += "#pad-footer-cn {";
        rules += "height: 100px;";
        rules += "clear: both;";
        rules += "}";
        rules += "@media (min-width: 320px) {";
        rules += "#pad-footer-cn {";
        rules += "height: 80px;";
        rules += "}";
        rules += "}";
        rules += "@media (min-width: 420px) {";
        rules += "#pad-footer-cn {";
        rules += "height: 60px;";
        rules += "}";
        rules += "}";
        rules += "@media (min-width: 620px) {";
        rules += "#pad-footer-cn {";
        rules += "height: 40px;";
        rules += "}";
        rules += "}";
        rules += "@media (min-width: 1160px) {";
        rules += "#pad-footer-cn {";
        rules += "height: 20px;";
        rules += "}";
        rules += "}";
        var myElem = document.getElementById('cn_footer_style');
        if (myElem === null) {
            addCss(rules, "cn_footer_style");
        }
        myElem = document.getElementById('footer-cn');
        if (myElem === null) {
            modifyDocFooter( msg );
        }
}

//runs after dom and after a 2 second delay to allow other scripts to finish
function delayedFunction() {
  addChinaDisclaimer();
}

//runs after dom
function onLoad() {
  var e = document.getElementById("doceng-ajax-disclaimer");
  if(e !== null) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', window.location);
    xhr.onerror = function() {
      console.log('Disclaimer detector could not fetch requested headers');
    };
    xhr.onload = function() {
      var re = new RegExp("name=PMUSER_COUNTRY_CODE; value=CN;");
      if( re.test( xhr.getResponseHeader('x-akamai-session-info')) ) {
        addChinaDisclaimer();
        window.setTimeout(delayedFunction, 2000);
      }
    };
    xhr.setRequestHeader("Pragma", "akamai-x-get-extracted-values" );
    xhr.send(null);
  } else {
      addChinaDisclaimer();
      window.setTimeout(delayedFunction, 2000);
  }
}

// code below runs the onLoad method above after the dom is loaded
if (window.addEventListener) {
  window.addEventListener('load', onLoad, false);
}  else if (window.attachEvent) {
  window.attachEvent('onload', onLoad);
} else {
  window.onload = onLoad;
}

})();
