$(document).ready(function () {
    // Make navbtn active::before when page is scrolled down to slide
    $(‘#Home′).waypoint(function (down) {
        $(‘#main.active::before’).removeClass(‘active::before’); // remove the class from the currently selected
        $(‘#main a.NavHome′).addClass(‘active::before’); // add the class to the newly clicked link
    });

    $(‘#Aboutme′).waypoint(function (down) {
        $(‘#main.active::before’).removeClass(‘active::before’); // remove the class from the currently selected
        $(‘#main a.NaveAbout′).addClass(‘active::before’); // add the class to the newly clicked link
    });

    $(‘#Latestwork′).waypoint(function (down) {
        $(‘#main.active::before’).removeClass(‘active::before’); // remove the class from the currently selected
        $(‘#main a.NavLatest′).addClass(‘active::before’); // add the class to the newly clicked link
    });
});
$(document).ready(function () {
    // Make navbtn active::before when page is scrolled up to slide
    $(‘#Home′).waypoint(function (up) {
        $(‘#main.active::before’).removeClass(‘active::before’); // remove the class from the currently selected
        $(‘#main a.NavHome′).addClass(‘active::before’); // add the class to the newly clicked link
    }, {
        offset: -1
    });

    $(‘#Aboutme′).waypoint(function (up) {
        $(‘#main.active::before’).removeClass(‘active::before’); // remove the class from the currently selected
        $(‘#main a.NaveAbout′).addClass(‘active::before’); // add the class to the newly clicked link
    }, {
        offset: -1
    });

    $(‘#Latestwork′).waypoint(function (up) {
        $(‘#main.active::before’).removeClass(‘active::before’); // remove the class from the currently selected
        $(‘#main a.NavLatest′).addClass(‘active::before’); // add the class to the newly clicked link
    }, {
        offset: -1
    });
});