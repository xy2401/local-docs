$(document).ready(function() {
    
    $('.infolink').click(function(event) {
        //Fade the box in during .3 sec, show it for 3, and let it fade out again
        $(".bookinfo").not($(this).next('.bookinfo')).clearQueue().fadeOut(800);
        $('.downloadinfo').clearQueue().fadeOut(800);    
        $(this).next('.bookinfo').show().delay(10000).fadeOut(2000);
        event.stopPropagation();

    });
    
    $('.downloadlink').click(function(event) {
        $(".downloadinfo").not($(this).next('.downloadinfo')).clearQueue().fadeOut(800);
        $('.bookinfo').clearQueue().fadeOut(800);
        $(this).next(".downloadinfo").show().delay(10000).fadeOut(2000);
        event.stopPropagation();
     });
     
     $('.bookinfo').click(function(event) {
        event.stopPropagation();
     });
     
     $('.downloadinfo').click(function(event) {
        event.stopPropagation();
     });
     
     $('html').click(function() {
        $('.bookinfo').clearQueue().fadeOut(800);
        $('.downloadinfo').clearQueue().fadeOut(800);
     });
    
});

