function setFontSize(){
    $('[class="card-category"]').css('font-size', 'large');
    $('[class="card-category"]').css("font-family", 'Yekan');
    $('[class="navbar-brand"]').css('font-size', 'medium');
    $('[class="navbar-brand"]').css("font-family", 'Yekan');
    $("div.sidebar-wrapper > div.logo > a").css("font-size", 'x-larg');
    $("div.sidebar-wrapper > div.logo > a").css("font-family", 'Yekan');
    $("div.sidebar-wrapper > ul.nav > li > a > p").css('font-size', 'large');
    $("div.sidebar-wrapper > ul.nav > li > a > p").css("font-family", 'Yekan');

        
    var elms = document.querySelectorAll("[id^='rain_']");
    for(var i = 0; i < elms.length; i++) {
        elms[i].style.fontSize = "medium";
        elms[i].style.fontFamily = "Yekan";
    }
}
