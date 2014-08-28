<% include Header %>
    <!-- Main section -->
    <section class="main">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>$Title</h1>
            $Content
            <!-- Contact Form -->
            <form id="kontaktform" role="form" action="/ss/kontakt/Form" method="post" enctype="application/x-www-form-urlencoded">
              <p id="Form_Form_error" class="message " style="display: none"></p>
              <div class="form-group">
                <input type="text" class="form-control" name="Name" id="name" placeholder="Ime">
              </div>
              <div class="form-group">
                <input type="email" class="form-control" name="Email" id="email" placeholder="E-naslov">
              </div>
              <div class="form-group">
                <textarea class="form-control" rows="1" name="Message" placeholder="Sporočilo"></textarea>
              </div>
              <input type="hidden" name="SecurityID" value="$SecurityID" class="hidden" id="Form_Form_SecurityID" />
              <div class="text-center">
                <button type="submit" name="action_submit" class="btn btn-default">Pošlji</button>
              </div>
            </form>
            <!-- End Contact Form -->
          </div>
        </div>
      </div>
    </section>
<% include Footer %>