$(document).ready(function () {
    // Make navbtn active when page is scrolled down to slide
    $(‘#slide1′).waypoint(function (down) {
        $(‘#main.active’).removeClass(‘active’); // remove the class from the currently selected
        $(‘#main a.navbtn1′).addClass(‘active’); // add the class to the newly clicked link
    });

    $(‘#slide2′).waypoint(function (down) {
        $(‘#main.active’).removeClass(‘active’); // remove the class from the currently selected
        $(‘#main a.navbtn2′).addClass(‘active’); // add the class to the newly clicked link
    });

    $(‘#slide3′).waypoint(function (down) {
        $(‘#main.active’).removeClass(‘active’); // remove the class from the currently selected
        $(‘#main a.navbtn3′).addClass(‘active’); // add the class to the newly clicked link
    });
});
$(document).ready(function () {
    // Make navbtn active when page is scrolled up to slide
    $(‘#slide1′).waypoint(function (up) {
        $(‘#main.active’).removeClass(‘active’); // remove the class from the currently selected
        $(‘#main a.navbtn1′).addClass(‘active’); // add the class to the newly clicked link
    }, {
        offset: -1
    });

    $(‘#slide2′).waypoint(function (up) {
        $(‘#main.active’).removeClass(‘active’); // remove the class from the currently selected
        $(‘#main a.navbtn2′).addClass(‘active’); // add the class to the newly clicked link
    }, {
        offset: -1
    });

    $(‘#slide3′).waypoint(function (up) {
        $(‘#main.active’).removeClass(‘active’); // remove the class from the currently selected
        $(‘#main a.navbtn3′).addClass(‘active’); // add the class to the newly clicked link
    }, {
        offset: -1
    });
});