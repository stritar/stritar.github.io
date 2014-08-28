// instead of target="_blank" use: rel="external"
document.onclick = function(e)
{
  var target = e ? e.target : window.event.srcElement;    
  while (target && !/^(a|body)$/i.test(target.nodeName)){target = target.parentNode;}
  if (target && target.getAttribute('rel') && target.rel == 'external'){ var external = window.open(target.href); return external.closed; }
}
// ----------------------------------------------------------------------------------
function goToByScroll(id){ id = id.replace("link", ""); $('html,body').animate({ scrollTop: $("#"+id).offset().top},'slow'); }
// ----------------------------------------------------------------------------------
function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}
preload([
    '/ss/themes/msvic/img/buttons/ShowMore_Hover.svg',
    '/ss/themes/msvic/img/buttons/ShowMore_Click.svg',
    '/ss/themes/msvic/img/icons/FB_footer_hover&click.svg',
    '/ss/themes/msvic/img/icons/Twitter_footer_hover&click.svg',
    '/ss/themes/msvic/img/icons/Insta_footer_hover&click.svg',
    '/ss/themes/msvic/img/icons/calendar_close_hover.png',
    '/ss/themes/msvic/img/icons/calendar_close_hover@2x.png',
]);/*
imagesLoaded(document.body, function(){
  if ($('.no-touch').length) {
    skrollr.init({
      smoothScrolling: false,
      forceHeight: false
    });
  }
});*/
imagesLoaded(document.body, function(){
  if ($('.no-touch').length) {
    skrollr.init({
      smoothScrolling: false,
      forceHeight: false
    });
  }
});
// ----------------------------------------------------------------------------------
$(window).resize(function() { $(".draft").dotdotdot({});}).resize();
// ----------------------------------------------------------------------------------
if(!Modernizr.svg)
{
  $(document).ready(function(){
    //$(".logo img").attr("src","img/logo.png");
  });
}
// ----------------------------------------------------------------------------------
$(document).ready(function(){
  // search icon
  $("nav ul li:nth-child(2)").prepend( "<i class='icon_search'></i>" );
  // LIGHTBOX
  $('.lightbox').lightbox();
  // ---=---=---=---=---=---=---=---=---=---=---=---=---=---=---
  var height = $(window).height();
  var width = $(window).width();
  $('.screensize').html(width + ' x ' + height);
  // ---=---=---=---=---=---=---=---=---=---=---=---=---=---=---
  // SIDEBAR
  var nav = 'close';
  $('.right-menu, .closenav').click(function(){
    if (nav == 'close') {
      $('aside').css('transform','translate(0,0)');
      $('aside').css('visibility','visible'); /* ie 8 fix */
      $('.wrapper').css('transform','translate(-220px,0)').addClass('disabled-overlay');
      $("html, body").animate({ scrollTop: 0 }, 0);
      nav = 'open';
    }
    else {
      $('aside').css('transform','translate(100%,0)');
      $('aside').css('visibility','hidden'); /* ie 8 fix */
      $('.wrapper').css('transform','none').removeClass('disabled-overlay');
      $("html, body").animate({ scrollTop: 0 }, 0);
      nav = 'close';
    }
  });
  // ---=---=---=---=---=---=---=---=---=---=---=---=---=---=---
  // load more
  $(".short-article").hide();
  $(".short-article").slice(0, 5).slideToggle('slow');
  $(".showold").click(function(){
      var showing = $(".short-article:visible").length;
      $(".short-article").slice(showing - 1, showing + 5).fadeIn('slow');
  });


  // ---=---=---=---=---=---=---=---=---=---=---=---=---=---=---

  $('.opendatepopup').click(function(){
    // if noc active prevert click
    if(!$(this).hasClass('active'))
      e.preventDefault();
    // other stuff
    var day = $(this).data('day');
    var month = $(this).data('month');
    var year = $(this).data('year');
    var content = $(this).data('content');

    $('.popup').fadeIn(300);
    $('.popup .date').html(day+'.'+month+'.'+year);

    $('.popup .content_day').html(content);
    $('.opendatepopup').removeClass('selected');
    $(this).addClass('selected');
  });
  $('.popup .closep').click(function(){
    $('.popup').fadeOut(200);
  });
  // ---=---=---=---=---=---=---=---=---=---=---=---=---=---=---
  $('#kontaktform').validate({ // initialize the plugin
        rules: {
            Email: {
                required: true,
                email: true
            },
            Name: {
                required: true,
                minlength: 3
            },
            Message: {
                required: true,
                minlength: 15
            }
        }
    });
  // ---=---=---=---=---=---=---=---=---=---=---=---=---=---=---
  $('#skrollr-body').waypoint(function(direction) {
    if (direction == "down") 
    {
      $('.topbar').hide();
      $('.topbar').slideToggle('quick');
      $('.topbar').addClass('fixed');
    }
    else 
    {
      $('.topbar').removeClass('fixed');
    }
  });
  // ---=---=---=---=---=---=---=---=---=---=---=---=---=---=---
  $('.calendar > table > tbody > tr:last').addClass('last');

});
// ----------------------------------------------------------------------------------
$(window).resize( function (){
  var height = $(window).height();
  var width = $(window).width();
  $('.screensize').html(width + ' x ' + height);

});
// ----------------------------------------------------------------------------------