
$(document).ready(function() {
/*var height = $('.holder1').height();
	$('.holder2').css('padding-top',height);*/
	$('input, textarea').placeholder();	
	/* Lightbox Trigger */
    $('.lightbox').nivoLightbox({effect: 'fadeScale', keyboardNav: true, errorMessage: 'Fotografije ne morem naloÅ¾iti!'});
    /* Form Validation */
    $("#contact").validate();
    /* Paralax */
    $('#scene').parallax();
    /* Dot Dot */
	$(window).resize(function() { $(".draft").dotdotdot({});}).resize();
	/* Sidebar */
	var nav = 'close';
	$('.right-menu, .closenav').click(function(){
		if (nav == 'close') {
			$('aside').css('transform','translate(0,0)');
			$('aside').css('visibility','visible'); /* ie 8 fix */
			$('.wrapper').css('transform','translate(-260px,0)').addClass('disabled-overlay');
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



$(window).scroll(function() {
 

	 $('.waypoint1').waypoint(function(direction) {
    if (direction == "up") { console.log('test1');   }
    if (direction == "down") { console.log('test2'); }
  }, {
      offset: 100     
  });
});



/* Contact Form */
$(document).ready(function() {
    $("#submit_btn").click(function() { 
        //set message and delay after send
        var btn = $(this);
        btn.text('PoÅ¡iljam...').addClass('disabled');
          setTimeout(function () {
              btn.text('PoÅ¡lji').removeClass('disabled');
          }, 5000);
        //get input field values
        var user_name       = $('input[name=name]').val(); 
        var user_email      = $('input[name=email]').val();
        //var lang            = $('input[name=lang]').val();
        //var user_phone      = $('input[name=phone]').val();
        var user_message    = $('textarea[name=message]').val();
        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if(user_name==""){ 
            $('input[name=name]').css('border-color','#ff0000'); 

            proceed = false;
        }
        if(user_email==""){ 
            $('input[name=email]').css('border-color','#ff0000'); 
            proceed = false;
        }
        /*
        if(user_phone=="") {    
            $('input[name=phone]').css('border-color','red'); 
            proceed = false;
        }*/
        if(user_message=="") {  
            $('textarea[name=message]').css('border-color','#ff0000');  
            proceed = false;
        }
        //everything looks good! proceed...
        if(proceed) 
        {
            //data to be sent to server
            post_data = {'userName':user_name, 'userEmail':user_email, 'userMessage':user_message};
            
            //Ajax post data to server
            $.post('/kirby/contact.php', post_data, function(response){  

                //load json data from server and output message     
        if(response.type == 'error')
        {
          output = '<div class="error">'+response.text+'</div>';
        }else{
            output = '<div class="success">'+response.text+'</div>';
          
          //reset values in all input fields
          $('#contact_form input').val(''); 
          $('#contact_form textarea').val(''); 
        }
        $("#result").hide().html(output).slideDown();
            }, 'json');
      
        }
    });
    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").keyup(function() { 
        $("#contact_form input, #contact_form textarea").css('border-color',''); 
        $("#result").slideUp();
    }); 
    // $('#footer').effect("highlight", {color:'black'}, 1000);
});


// load more
  $(".newsitem").hide();
  $(".newsitem").slice(0, 3).show();

  $(".showold").click(function(){
      var showing = $(".newsitem:visible").length;
      $(".newsitem").slice(showing - 1, showing + 3).fadeIn('slow');
  });

/*
	if ($('.wrapper').hasClass("disabled-overlay")) {
	    	$('.wrapper').click(function(){
	    		$('aside').css('transform','translate(100%,0)');
				$('aside').css('visibility','hidden');
				$('.wrapper').css('transform','none').removeClass('disabled-overlay');
				$("html, body").animate({ scrollTop: 0 }, 0);
				nav = 'close';
	    	});
		}
*/


});

function showSuccess()
{
  $(function() {
      $('<div class="success-form"><div class="inside"><div class="close"><i class="fa fa-times"></i></div><h2>VaÅ¡e sporoÄilo je bilo uspeÅ¡no poslano!</h2><p>Odgovorili vam bomo v najkrajÅ¡em moÅ¾nem Äasu.</p><p style="color:#666;"><small>To okno se bo avtomatsko zaprlo Äez 20 sekund.</small></p></div></div>').fadeIn(300)
      .insertBefore('body')
      .delay(20000)
      .fadeOut(function() {
        $(this).remove(); 
      });
      $(".success-form").click(function(){
        $(this).remove();
      });
  });
}


$(window).resize( function (){
	
});