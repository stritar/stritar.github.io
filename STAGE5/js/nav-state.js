$(function () {
    var sections = $("section");
    var navigation_links = $("nav a");

    sections.waypoint({
        handler: function (direction) {

            var active_section;
            active_section = $(this);
            if (direction === "up") active_section = active_section.prev();

            var active_link = $('nav a[href="#' + active_section.attr("id") + '"]');
            navigation_links.removeClass("selected");
            active_link.addClass("selected");

        },
        offset: '25%'
    })


});