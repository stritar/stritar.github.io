$('.').toggle(function() { // this refer to the just clicked button.
    $('button.active').click(); // Remove active class from all other buttons.
    $(this).addClass("active-toggle");
}, function() {
    $(this).removeClass("active-toggle");
});

$('html,body').bind('mousewheel',function(ev, delta) {
    var scrollTop = $(this).scrollTop();
    $(this).scrollTop(scrollTop-Math.round(delta * 1));
});