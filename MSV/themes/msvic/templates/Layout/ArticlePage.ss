<% include Header %>
    <!-- Main section -->
    <section class="main">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <article class="full">
              <h2>$Title</h2>
              <p class="date"><time datetime='$Date'>$Date.format('d.m.Y')</time></p>
              <div class="short">$ShortText</div>
              $Content
              <% if DisplayCalendar %>
              <div class="calendar">
                <div class="popup">
                  <a href="javascript:void(0)" class="closep">&nbsp;</a>
                  <p class="date"></p>
                  <div class="content_day"></div>
                </div>
                <p class="monthyear">$Mesec $Leto</p>
                $getCalendar($Mesec,$Leto)
              </div>
              <% end_if %>
              
              <div style="float:left;"><a href="https://twitter.com/share" class="twitter-share-button">Tweet</a></div>
              <div class="fb-share-button" data-width="90" style="float:left; width:90px;" data-href="$AbsoluteLink" data-type="button_count"></div>
            </article>  
          </div>
        </div>
      </div>
    </section>
<% include Footer %>