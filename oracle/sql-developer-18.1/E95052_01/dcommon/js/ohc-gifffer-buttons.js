(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define("Gifffer", [], factory);
  else if(typeof exports === 'object')
    exports["Gifffer"] = factory();
  else
    root["Gifffer"] = factory();
})(this, function() {
var d = document;
var playSize = 60;

var Gifffer = function() {
  var images, i = 0, gifs = [];

  images = d.querySelectorAll('[data-gifffer]');
  for(; i<images.length; ++i) process(images[i], gifs);
  // returns each gif container to be usable programmatically
  return gifs;
};

function formatUnit(v) {
  return v + (v.toString().indexOf('%') > 0 ? '' : 'px');
};

function createContainer(w, h, el, altText) {
  var alt;
  var con = d.createElement('div');
  var buttoncon = d.createElement('div');
  var cls = el.getAttribute('class');
  var id = el.getAttribute('id');

  cls ? con.setAttribute('class', el.getAttribute('class')) : null;
  id ? con.setAttribute('id', el.getAttribute('id')) : null;
  
  con.setAttribute('style', 'border:1px solid red; position:relative; padding:5px;');
  buttoncon.setAttribute('style', 'position:absolute; top:-35px;');
  
  //con.setAttribute('aria-label','Animated Gif Play and Stop');
  //con.setAttribute('aria-hidden', 'true');


  // // // // creating play button
  var play = d.createElement('button');
  play.setAttribute('class','btn btn-primary btn-xs gifffer-play-button');
  play.setAttribute('style','margin:5px 5px 5px 0;');

  var playicon = d.createElement('i');
  playicon.setAttribute('class','glyphicons glyphicons-play');
  playicon.setAttribute('aria-hidden','true');
  playicon.setAttribute('style','top:3px;');




  // add text to button
  var textplay = document.createTextNode(" Play");       // Create a text node
  
  play.appendChild(playicon); 
  play.appendChild(textplay); 


  play.setAttribute('aria-label','Play animated gif');

  // // // // creating stop button
  var stop = d.createElement('button');
  stop.setAttribute('class','btn btn-primary btn-xs gifffer-stop-button');
stop.setAttribute('style','margin:5px 5px 5px 0;');

  var stopicon = d.createElement('i');
  stopicon.setAttribute('class','glyphicons glyphicons-stop');
  stopicon.setAttribute('aria-hidden','true');
  stopicon.setAttribute('style','top:3px;');


  // add text to button
  var textstop = document.createTextNode(" Stop");       // Create a text node
  
  stop.appendChild(stopicon); 
  stop.appendChild(textstop); 

  stop.setAttribute('aria-label','stop animated gif');

  //var trngl = d.createElement('DIV');
  //trngl.setAttribute('style', 'width:0;height: 0;border-top:14px solid transparent;border-bottom:14px solid transparent;border-left:14px solid rgb(255, 255, 255);position:absolute;left:26px;top:16px;');
  //play.appendChild(trngl);

  // create alt text if available
  if (altText) {
    alt = d.createElement('p');
    alt.setAttribute('class','gifffer-alt');
    alt.setAttribute('style', 'border:0;clip:rect(0 0 0 0);height:1px;overflow:hidden;padding:0;position:absolute;width:1px;');
    alt.innerText = altText + ', image';
	
	//8-9
	play.setAttribute('aria-label', 'play: '+altText);
	stop.setAttribute('aria-label', 'stop: '+altText);
	//console.log("altText "+altText);
  }

  // dom placement
  buttoncon.appendChild(play);
  buttoncon.appendChild(stop);
  
  con.appendChild(buttoncon)
  
  el.parentNode.replaceChild(con, el);
  altText ? con.parentNode.insertBefore(alt, con.nextSibling) : null;
  return { c: con, p: play,  s: stop };
};

function calculatePercentageDim (el, w, h, wOrig, hOrig) {
  var parentDimW = el.parentNode.offsetWidth;
  var parentDimH = el.parentNode.offsetHeight;
  var ratio = wOrig / hOrig;

  if (w.toString().indexOf('%') > 0) {
    w = parseInt(w.toString().replace('%', ''));
    w = (w / 100) * parentDimW;
    h = w / ratio;
  } else if (h.toString().indexOf('%') > 0) {
    h = parseInt(h.toString().replace('%', ''));
    h = (h / 100) * parentDimW;
    w = h / ratio;
  }

  return { w: w, h: h };
};

function process(el, gifs) {
  var url, con, c, w, h, duration,play, gif, playing = false, cc, isC, durationTimeout, dims, altText;

  url = el.getAttribute('data-gifffer');
  w = el.getAttribute('data-gifffer-width');
  h = el.getAttribute('data-gifffer-height');
  duration = el.getAttribute('data-gifffer-duration');
  altText = el.getAttribute('data-gifffer-alt');
  el.style.display = 'block';

  // creating the canvas
  c = document.createElement('canvas');
  isC = !!(c.getContext && c.getContext('2d'));
  if(w && h && isC) cc = createContainer(w, h, el, altText);

  // waiting for image load
  el.onload = function() {
    if(!isC) return;

    w = w || el.width;
    h = h || el.height;

    // creating the container
    if (!cc) cc = createContainer(w, h, el, altText);
    con = cc.c;
    play = cc.p;
	stop = cc.s;
    dims = calculatePercentageDim(con, w, h, el.width, el.height);

    // add the container to the gif arraylist
    gifs.push(con);

    // listening for image click
    //con.addEventListener('click', function() {

    play.addEventListener("click", playFunction);

function playFunction() {
    

      clearTimeout(durationTimeout);
      
	  if(!playing) {
        playing = true;
        gif = document.createElement('IMG');
        gif.setAttribute('style', 'width:100%;height:100%;');
        gif.setAttribute('data-uri', Math.floor(Math.random()*100000) + 1);

        setTimeout(function() {
          gif.src = url;
        }, 0);
        //con.removeChild(play);
        //set play to inactive instead
		play.disabled = true;
		//play.setAttribute('class','btn btn-default btn-xs gifffer-play-button');

		//set focus to animation
        con.removeChild(c);
        con.appendChild(gif);
        if(parseInt(duration) > 0) {
          durationTimeout = setTimeout(function() {
            playing = false;
            //con.appendChild(play);
			//set play to active?
			//play.setAttribute('class','btn btn-primary btn-xs gifffer-play-button');	
			play.disabled = false;	
			
            con.removeChild(gif);
            con.appendChild(c);
            gif = null;
          }, duration);
        }
      }	  //instead of else, create listener for 'stop'.
	  
    };


// new stop function

stop.addEventListener('click', function() {
      clearTimeout(durationTimeout);

      console.log('stop clicked');
        playing = false;
        //con.appendChild(play);
    // this starts the playing
    //play.setAttribute('class','btn btn-primary btn-xs gifffer-play-button');
		play.disabled = false;	
        con.removeChild(gif);
        con.appendChild(c);

        gif = null;


    });







    // canvas
    c.width = dims.w;
    c.height = dims.h;
    c.getContext('2d').drawImage(el, 0, 0, dims.w, dims.h);
    con.appendChild(c);

    // setting the actual image size
    con.setAttribute('style', 'position:relative; width:' + dims.w + 'px;height:' + dims.h + 'px; padding:5px; margin-top:40px;');

    c.style.width = '100%';
    c.style.height = '100%';
    
    if (w.toString().indexOf('%') > 0 && h.toString().indexOf('%') > 0) {
      con.style.width = w;
      con.style.height = h;
    } else if (w.toString().indexOf('%') > 0) {
      con.style.width = w;
      con.style.height = 'inherit';
    } else if (h.toString().indexOf('%') > 0) {
      con.style.width = 'inherit';
      con.style.height = h;
    } else {
      con.style.width = dims.w + 'px';
      con.style.height = dims.h + 'px';
    }

  };
  el.src = url;
}

return Gifffer;

});
