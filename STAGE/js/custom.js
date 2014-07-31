$('.').toggle(function() { // this refer to the just clicked button.
    $('button.active').click(); // Remove active class from all other buttons.
    $(this).addClass("active-toggle");
}, function() {
    $(this).removeClass("active-toggle");
});

