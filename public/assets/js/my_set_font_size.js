function setFontSize(){
    $('[class="card-category"]').css('font-size', 'large');
    $('[class="card-category"]').css("font-family", 'Yekan');
    $('[class="navbar-brand"]').css('font-size', 'medium');
    $('[class="navbar-brand"]').css("font-family", 'Yekan');
    $("div.sidebar-wrapper > div.logo > a").css("font-size", 'large');
    $("div.sidebar-wrapper > div.logo > a").css("font-family", 'Yekan');
    $("div.sidebar-wrapper > ul.nav > li > a > p").css('font-size', 'large');
    $("div.sidebar-wrapper > ul.nav > li > a > p").css("font-family", 'Yekan');

        
    var elms = document.querySelectorAll("[id^='rain_']");
    for(var i = 0; i < elms.length; i++) {
        elms[i].style.fontSize = "medium";
        elms[i].style.fontFamily = "Yekan";
    }

    elms = document.querySelectorAll("[id='rain_total_value']");
    for(var i = 0; i < elms.length; i++) {
        elms[i].style.fontSize = "large";
        elms[i].style.fontFamily = "Yekan";
        elms[i].style.color = "rgba(243, 51, 255)";
    }

    elms = document.querySelectorAll("[id='rain_24_value']");
    for(var i = 0; i < elms.length; i++) {
        elms[i].style.fontSize = "large";
        elms[i].style.fontFamily = "Yekan";
        elms[i].style.color = "rgba(243, 51, 255)";
    }

    elms = document.querySelectorAll("[id='rain_12_value']");
    for(var i = 0; i < elms.length; i++) {
        elms[i].style.fontSize = "large";
        elms[i].style.fontFamily = "Yekan";
        elms[i].style.color = "rgba(243, 51, 255)";
    }



    // $('[class="myflex"]').css('display', 'flex');
    // $('[class="myflex"]').css('justify-content' , 'space-between');
}
