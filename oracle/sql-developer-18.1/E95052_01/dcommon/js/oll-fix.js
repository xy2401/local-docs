// JavaScript Document

$(document).ready(function() {
    $('a[data-fancybox-type="iframe"]').each(function() {
        var url = $(this).attr('href');
        var that = this;
        var splitOn = "CONTENT_ID:"
        if(url.indexOf(splitOn) > 0) {
            var content_id = url.substr(url.lastIndexOf(splitOn) + splitOn.length, url.length);
            $.getJSON("https://apex.oracle.com/pls/apex/oll_rest/oll/docs/content/" + content_id + "?callback=?", function(data) {
                if (data.link) {
                    $(that).attr('href', data.link);
                    $(that).fancybox({
                        helpers : {
                            media: true
                        },
                        youtube : {
                            autoplay: 1
                        }
                    });
                }
            });
        }
    });
});

