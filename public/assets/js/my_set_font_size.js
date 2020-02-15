function setFontSize(){
    var defaultFont = "Bahij";
    $('[class="card-category"]').css('font-size', 'large').css("font-family", defaultFont);
    $('[class="navbar-brand"]').css('font-size', 'medium').css("font-family", defaultFont);
    $("div.sidebar-wrapper > div.logo > a").css("font-size", 'large').css("font-family", defaultFont);
    $("div.sidebar-wrapper > ul.nav > li > a > p").css('font-size', 'large').css("font-family", defaultFont);
    
    $('[class="divtrial"]').css('display', 'flex').css('flex-direction','column').css('align-items','center').css('text-align','right');
    $('[class="trial"]').css('font-size', 'large').css('font-family', defaultFont).css('align','right');
    
    
    var elms = document.querySelectorAll("[id^='rain_']");
    for(var i = 0; i < elms.length; i++) {
        elms[i].style.fontSize = "medium";
        elms[i].style.fontFamily = defaultFont;
    }

    elms = document.querySelectorAll("[id='rain_total_value']");
    for(var i = 0; i < elms.length; i++) {
        elms[i].style.fontSize = "large";
        elms[i].style.fontFamily = defaultFont;
        elms[i].style.color = "rgba(243, 51, 255)";
    }

    elms = document.querySelectorAll("[id='rain_24_value']");
    for(var i = 0; i < elms.length; i++) {
        elms[i].style.fontSize = "large";
        elms[i].style.fontFamily = defaultFont;
        elms[i].style.color = "rgba(243, 51, 255)";
    }

    elms = document.querySelectorAll("[id='rain_12_value']");
    for(var i = 0; i < elms.length; i++) {
        elms[i].style.fontSize = "large";
        elms[i].style.fontFamily = defaultFont;
        elms[i].style.color = "rgba(243, 51, 255)";
    }



    // $('[class="myflex"]').css('display', 'flex');
    // $('[class="myflex"]').css('justify-content' , 'space-between');
}
