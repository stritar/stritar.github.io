$(document).ready(function () {
    $('section').waypoint(function (direction) {
        var me = $(this); //added
        thisId = $(this).attr('id');
        $('nav a').each(function () {
            var secondaryID = $(this).attr('class');
            if (secondaryID == thisId) {
                $('nav a').removeClass('active:before');

                //added
                if (direction === 'up') {
                    me = $(this).prev();
                }

                //added
                if (!me.length) {
                    me = $(this);
                }

                $(this).addClass('active:before');
            }
        });
    }, {
        offset: '0'
    });
});
$('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 500);
            return false;
        }
    }
});