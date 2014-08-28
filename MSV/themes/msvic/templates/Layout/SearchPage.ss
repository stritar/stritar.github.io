<% include Header %>
	<!-- Search -->
	<section class="search">
		<!--<% if $SearchForm %>$SearchForm<% end_if %>-->
		<form class="search-form" action="/ss/poisci/SearchForm" method="get" enctype="application/x-www-form-urlencoded">
			<input type="submit" value="" name="action_results" class="action">
			<input type="text" name="Search" placeholder="Išči">
		</form>
	</section>
    <!-- Main section -->
    <section class="main">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            $Content
          </div>
        </div>
      </div>
    </section>
<% include Footer %>