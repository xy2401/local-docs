(function() {
    if (!window.console) {
        window.console = {
            log: function() {
            }
        };
    }

  var ThorSDK;
 
  String.prototype.truncate = function(n) {
    return this.substr(0, n - 1) + (this.length > n ? "&hellip;" : "");
  };
 
  ThorSDK = (function() {
    function ThorSDK(options) {
      if (this.baseUrl == null) {
        this.baseUrl = "//gdata.youtube.com/feeds/api/";
      }
      if (this.user == null) {
        this.user = "OracleDBVision";
      }
      this.videosUrl = this.baseUrl + 'users/' + this.user + '/uploads';
      this.videoUrl = this.baseUrl + 'videos/';
      this.defaultParams = {
        'v': '2',
        'alt': 'jsonc',
        'orderby': 'published'
      };
      if (this.playlistId == null) {
        this.playlistId = 'PLrOQdZi2oX27Fvr1gBK8i5O-Ilun9RoQm';
      }
      this.playlistUrl = this.baseUrl + 'playlists/' + this.playlistId;
      this.version = "0.0.3-alpha";
      this.carouselImg = "";
      this.playlistImg = "";
      this.ollUrl = "";
      this.useOll = false;
    }
 
    ThorSDK.prototype.setOptions = function(options) {
      console.log(options);
      console.log(options.user);
      this.playlistId = options.playlist ? options.playlist : this.playlistId;
      this.user = options.user ? options.user : this.user;
      this.videosUrl = this.baseUrl + 'users/' + this.user + '/uploads';
      this.playlistUrl = this.baseUrl + 'playlists/' + this.playlistId;
      this.carouselImg = options.carouselImg ? options.carouselImg : this.carouselImg;
      this.playlistImg = options.playlistImg ? options.playlistImg : this.playlistImg;
      this.ollUrl = options.ollUrl ? options.ollUrl : this.ollUrl;
      return this.useOll = options.useOll ? options.useOll : this.useOll;
    };
 
    ThorSDK.prototype.getParamsString = function(params) {
      var k, result, v;
      if (params == null) {
        params = {};
      }
      params = jQuery.extend(params, this.defaultParams);
      result = "?";
      for (k in params) {
        v = params[k];
        result += "&" + k + "=" + v;
      }
      return result;
    };
 
    ThorSDK.prototype.getVideos = function(params, callback) {
      if (window.thor.useOll) {
        return jQuery.getJSON(this.ollUrl, callback);
      } else {
        return jQuery.getJSON(this.videosUrl + this.getParamsString(params), callback);
      }
    };
 
    ThorSDK.prototype.getVideo = function(videoId, params, callback) {
      return jQuery.getJSON(this.videoUrl + videoId + this.getParamsString(params), callback);
    };
 
    ThorSDK.prototype.getPlaylist = function(params, callback) {
      return jQuery.getJSON(this.playlistUrl + this.getParamsString(params), callback);
    };
 
    ThorSDK.getDescription = function(text) {
      var regex;
      regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/g;
      return text.split("\n").join("<br />").replace(regex, "<a href='$1'>$1</a>");
    };
 
    ThorSDK.prototype.createVideos = function(json) {
      var $video, video, _i, _len, _ref, _results;
      $video = '';
      _ref = json.data.items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        video = _ref[_i];
        $video = "<div id='container-" + video.id + "' class='video-container col3'>";
        $video += window.thor.createFancyBoxStructure(video.id, window.thor.createThumbnailUrl(video.id, window.thor.playlistImg));
        $video += "<div id='video-information' class=''>";
        $video += "<div class='video-title' id='title-" + video.id + "'>";
        $video += "<h4>" + video.title + "</h4></div>";
        $video += "<div class='video-video-description' id='description-" + video.id + "' class='' ></div> </div>";
        jQuery("#thor_list_container").append($video + "</div>");
		_results.push(jQuery('#description-' + video.id).html(ThorSDK.getDescription(video.description)));
      }
      return _results;
    };
 
    ThorSDK.prototype.createVideosUsingOll = function(json) {
	  var $video, video, _i, _len, _ref;
      $video = '';
      _ref = json.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        video = _ref[_i];
        video.id = video.link.substring(video.link.lastIndexOf('/') + 1);
        $video = "<div id='container-" + video.id + "' data-product-id='" + video.product_id + "' class='video-container col3'>";
		$video += "<a class='various iframe' data-fancybox-type='iframe' href='" + video.link + "?autoplay=1'><img src='" + video.thumbnail_link + "' alt='" + video.title + "'></a>";
        $video += "<div class='video-information'>";
        $video += "<div class='video-title' id='title-" + video.id + "'>";
        $video += "<h4>" + video.title + "</h4></div>";
		//remove line breaks because the oll descriptions use them where we don't want html breaks
		video.description = video.description.replace(/(\r\n|\n|\r)/gm,"");
        $video += "<div class='video-video-description' id='description-" + video.id + "'>" + $.trim(video.description) + "</div></div>";
        jQuery("#thor_list_container").append($video + "</div>");
      }
    };
 
    ThorSDK.prototype.populateVideos = function() {
      if (window.thor.useOll) {
        this.getVideos(null, window.thor.createVideosUsingOll);
      } else {
        this.getVideos(null, window.thor.createVideos);
      }
      return this.getPlaylist(null, window.thor.createCarousel);
    };
 
    ThorSDK.prototype.populateCarousel = function() {
      return this.getPlaylist(null, window.thor.createCarousel);
    };
 
    ThorSDK.prototype.populateList = function() {
      return this.getVideos(null, window.thor.createVideos);
    };
 
    ThorSDK.prototype.createCarousel = function(json) {
      var $carouselContainer, $carouselInner, $class, $controls, $i, $indicators, $videos, video, _i, _len, _ref;
      $carouselContainer = "<div id='carousel-example-generic' class='carousel slide' data-ride='carousel' style='position:relative;'>";
      $carouselInner = '<div class="carousel-inner">';
      $indicators = '<ol class="carousel-indicators">';
      $videos = '';
      $i = 0;
      $class = '';
      _ref = json.data.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        video = _ref[_i];
        if ($i === 0) {
          $class = 'active';
        } else {
          $class = ' ';
        }
        console.log(video);
        $indicators += '<li data-target="#carousel-example-generic" data-slide-to="' + $i + '" class=" ' + $class + ' "></li>';
        $videos += '<div class="item carousel-video ' + $class + '"  v-id="' + video.video.id + '">';
        $videos += '<a class="various iframe" data-fancybox-type="iframe" href="http://www.youtube.com/embed/' + video.video.id + '?autoplay=1">';
        $videos += '<img src="' + window.thor.createThumbnailUrl(video.video.id, window.thor.carouselImg) + '" alt="" >';
        $videos += '</a>';
        $videos += '<div class="carousel-caption"">';
        $videos += '<h3>' + video.video.title + '</h3>';
        $videos += '<p>' + video.video.description.truncate(300) + '</p>';
        $videos += '</div>';
        $videos += '</div>';
        $i++;
      }
      $carouselContainer += $indicators + '</ol>';
      $carouselInner += $videos;
      $carouselInner += '</div>';
      $controls = ' <!-- Controls --> <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left"></span> </a> <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right"></span> </a>';
      $carouselContainer += $carouselInner;
      $carouselContainer += $controls;
      $carouselContainer += '</div>';
      return jQuery("#thor_carousel_container").append($carouselContainer);
    };
 
    ThorSDK.prototype.createFancyBoxStructure = function(videoId, thumbnailUrl) {
      var string;
      return string = '<a class="various iframe" data-fancybox-type="iframe" href="http://www.youtube.com/embed/' + videoId + '?autoplay=1"> <img src="' + thumbnailUrl + '" alt="" > </a>';
    };
 
    ThorSDK.prototype.clearContainers = function() {
      this.clearList();
      return this.clearCarousel();
    };
 
    ThorSDK.prototype.clearList = function() {
      return $("#thor_list_container").children().remove();
    };
 
    ThorSDK.prototype.clearCarousel = function() {
      return $("#thor_carousel_container").children().remove();
    };
 
    ThorSDK.prototype.createThumbnailUrl = function(videoId, type) {
      var string;
      return string = "http://img.youtube.com/vi/" + videoId + "/" + type + "default.jpg";
    };
 
    return ThorSDK;
 
  })();
 
  window.thor = new ThorSDK;
 
}).call(this);