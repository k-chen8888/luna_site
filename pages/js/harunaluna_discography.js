$(document).ready(function () {
    
    // Normalize all image sizes based on screen width
    if ( $("a.artwork img").length && $('.discography').length ){
        
        if ( $(window).width() <= 727 ) {
            $("a.artwork img").width(350);
            $("a.artwork img").height(350);
            
            $('.discography').width(350);
            $('.discography').children('div.title').width(350);
            $('.discography').children('div.year').width(350);
        } else if ( $(window).width() > 727 && $(window).width() <= 1010 ) {
            $("a.artwork img").width(500);
            $("a.artwork img").height(500);
            
            $('.discography').width(500);
            $('.discography').children('div.title').width(500);
            $('.discography').children('div.year').width(500);
        } else {
            $("a.artwork img").width(700);
            $("a.artwork img").height(700);
            
            $('.discography').width(700);
            $('.discography').children('div.title').width(700);
            $('.discography').children('div.year').width(700);
        }
        
    }
    
    // Set text to fade in
    if( $('.discography').length ){
        
        $('.discography').each(function (index, item) {
            
            
            // Clean up
            $( item ).children('div.title').hide();
            $( item ).children('div.year').hide();
            $( item ).children('p').remove()
            
            
            // Style backgrounds, fonts, positions
            
            if ( $(window).width() <= 727 ) {
                
                $( item ).children('div.title').css({
                    "font-size": "150%"
                });
                $( item ).children('div.year').css({
                    "font-size": "125%"
                });
                
            } else if ( $(window).width() > 727 && $(window).width() <= 1010 ) {
                
                $( item ).children('div.title').css({
                    "font-size": "225%"
                });
                $( item ).children('div.year').css({
                    "font-size": "200%"
                });
                
            } else {
                
                $( item ).children('div.title').css({
                    "font-size": "300%"
                });
                $( item ).children('div.year').css({
                    "font-size": "250%"
                });
                
            }
            
            $( item ).css({
                "position": "relative",
                "margin": "2px"
            });
            $( item ).children('div.title').css({
                "background-color": "rgba(65, 105, 225, .6)",
                "position": "absolute",
                "top": "0"
            });
            $( item ).children('div.year').css({
                "background-color": "rgba(65, 105, 225, .6)",
                "position": "absolute",
                "bottom": "0"
            });
            
            
            // Reveal text when mouseover
            $( item ).mouseenter(function () {
                $( item ).children('div.title').fadeIn(500);
                $( item ).children('div.year').fadeIn(500);
            });
            $( item ).mouseleave(function () {
                $( item ).children('div.title').fadeOut(500);
                $( item ).children('div.year').fadeOut(500);
            });
            
            
            // Change colors when hovering over link
            $( item ).children('div.title').children('a').mouseenter(function () {
                $( item ).children('div.title').animate({ backgroundColor: 'rgba(255, 183, 197, .6)' }, 500);
            });
            $( item ).children('div.title').children('a').mouseleave(function () {
                $( item ).children('div.title').animate({ backgroundColor: 'rgba(65, 105, 225, .6)' }, 500);
            });
            
        });
        
    }
    
});