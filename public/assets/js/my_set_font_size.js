function myFunction(x) {
    var defaultFont = "Yekan";
    if (x.matches) { // If media query matches
        // document.body.style.backgroundColor = "yellow";
        $('[class="card-label"]').css('font-size', '4.1vw')
        $('[class="status"]').css('font-size', '4.1vw')
        $('[class="card-category"]').css('font-size', '5.5vw').css("font-family", defaultFont);
        $('[class="mylabel"]').css('font-size', 'x-large').css("font-family", defaultFont);
        $('[class="navbar-brand"]').css('top', '-1vh').css('font-size', '3.8vw').css("font-family", defaultFont);
        $("div.sidebar-wrapper > div.logo > a").css("font-size", 'large').css("font-family", defaultFont);
        $("div.sidebar-wrapper > ul.nav > li > a > p").css('font-size', 'large').css("font-family", defaultFont);

        $('[class="trial"]').css('font-size', 'large').css('font-family', defaultFont).css('align', 'right');
        $('[class="card-title"]').css('font-family', defaultFont);
        $('[class="value"]').css('color', 'rgba(243, 51, 255)').css('font-size', '4.3vw');
        $('[class="unit"]').css('color', 'rgba(243, 51, 255)').css('font-size', '3.3vw');
        $('[class="mytitle"]').css('z-index', '21').css('text-align', 'center').css('font-size', '3.8vw').css('position', 'relative').css('top', '-3.5vh').css('left', '0.8vh').css('color', 'red').css('height', '8px').css('font-family', defaultFont);
        elms = document.querySelectorAll("#date_of_last_recieved_data_label")
        elms.forEach(elm => {
            elm.style.fontSize = "3.5vw";
        })
        elms = document.querySelectorAll("#date_of_last_recieved_data_value");
        elms.forEach(elm => {
            elm.style.fontSize = "3.5vw";
            elm.style.color = "rgba(243, 51, 255)";
        })
        $('[class="chart-area"]').css('height', '28vh').css('width', '100%')
        $('div.ad > img.ad').css('height', '30vh').css('width', '95vw')

        $('[class="fixed-plugin"]').css('top', '82vh').css('right', '1px').css('width', '45px')
        $('[class="control-box"]').css('top', '82vh').css('right', '48px').css('width', '130px')
        $('#mapid').css('width','87vw').css('height','92vh')

    } else {
        // document.body.style.backgroundColor = "pink";
        $('[class="card-label"]').css('font-size', '1.1vw')
        $('[class="status"]').css('font-size', '1.1vw')
        $('[class="card-category"]').css('font-size', '3.5vmin').css("font-family", defaultFont);
        $('[class="mylabel"]').css('font-size', 'large').css("font-family", defaultFont);
        $('[class="navbar-brand"]').css('top', '0.1vh').css('font-size', '1.8vw').css("font-family", defaultFont);
        $("div.sidebar-wrapper > div.logo > a").css("font-size", 'large').css("font-family", defaultFont);
        $("div.sidebar-wrapper > ul.nav > li > a > p").css('font-size', 'large').css("font-family", defaultFont);

        $('[class="trial"]').css('font-size', 'large').css('font-family', defaultFont).css('align', 'right');
        $('[class="card-title"]').css('font-family', defaultFont);
        $('[class="value"]').css('color', 'rgba(243, 51, 255)').css('font-size', '1.3vw');
        $('[class="unit"]').css('color', 'rgba(243, 51, 255)').css('font-size', '1vw');
        $('[class="mytitle"]').css('z-index', '21').css('text-align', 'center').css('font-size', '1.8vw').css('position', 'relative').css('top', '-5.5vh').css('left', '8.5vh').css('color', 'red').css('height', '0px').css('font-family', defaultFont);
        elms = document.querySelectorAll("#date_of_last_recieved_data_label")
        elms.forEach(elm => {
            elm.style.fontSize = "1vw";
        })
        elms = document.querySelectorAll("#date_of_last_recieved_data_value");
        elms.forEach(elm => {
            elm.style.fontSize = "1.1vw";
            elm.style.color = "rgba(243, 51, 255)";
        })
        $('[class="chart-area"]').css('height', '20vh').css('width', '100%')
        $('div.ad > img.ad').css('height', '90vh').css('width', '90vw')

        $('[class="fixed-plugin"]').css('top', '94vh').css('right', '18px').css('width', '45px')
        $('[class="control-box"]').css('top', '94vh').css('right', '64px').css('width', '130px')
        // $('#mapid').css('width','87vw').css('height','92vh')
        //$('#mapid').css('width','82%').css('height','90%')
    }
}


function setFontSize() {
    var defaultFont = "Yekan";
    ////////////////////////////////////////////////////B
    var x = window.matchMedia("(max-width: 700px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction) // Attach listener function on state changes
    /////////////////////////////////////////////////////E






    // var elms = document.querySelectorAll("[id^='rain_'], [id^='level_']");
    // elms.forEach(elm => {
    //     elm.style.fontSize = "medium";

    // })

    // $('[class="myflex"]').css('display', 'flex');
    // $('[class="myflex"]').css('justify-content' , 'space-between');
    //$('[class="divtrial"]').css('display', 'flex').css('flex-direction', 'column').css('align-items', 'center').css('text-align', 'right');
}
