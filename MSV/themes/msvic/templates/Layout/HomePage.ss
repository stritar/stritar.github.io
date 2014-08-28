<% include Header %>
    <!-- Main section -->
    <section class="main">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            $Form
            <% loop $Children %>
                <!-- Article -->
                <article class="short-article">
                  <a href="$Link">
                    <header>
                      <h2>$Title</h2>
                      <p class="date"><time datetime='$Date'>$Date.format('d.m.Y')</time></p>
                    </header>
                    <div class="draft">
                      $ShortText
                    </div>
                  </a>
                </article>
                <!-- End Article -->
            <% end_loop %>
          </div>
        </div>
      </div>
    </section>
<% include Footer %>