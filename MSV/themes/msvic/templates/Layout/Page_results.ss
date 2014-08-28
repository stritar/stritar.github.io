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

            <h1>$Title</h1>

            <% if $Query %>
                <p class="searchQuery">Iskali ste po izrazu &quot;{$Query}&quot;</p>
            <% end_if %>

            <% if $Results %>
            <ul class="list-unstyled sresults">
                <% loop $Results %>
                <li>
                    <h4>
                        <a href="$Link">
                            <% if $MenuTitle %>
                            $MenuTitle
                            <% else %>
                            $Title
                            <% end_if %>
                        </a>
                    </h4>
                    <% if $Content %>
                        <p>$Content.LimitWordCountXML</p>
                    <% end_if %>
                    <a class="readMoreLink" href="$Link" title="Read more about &quot;{$Title}&quot;">Preberite več o &quot;{$Title}&quot;...</a>
                </li>
                <% end_loop %>
            </ul>
            <% else %>
            <p>Vaše iskanje žal ni obrodilo sadov.</p>
            <% end_if %>

            <% if $Results.MoreThanOnePage %>
            <div id="PageNumbers">
                <div class="pagination">
                    <% if $Results.NotFirstPage %>
                    <a class="prev" href="$Results.PrevLink" title="View the previous page">&larr;</a>
                    <% end_if %>
                    <span>
                        <% loop $Results.Pages %>
                            <% if $CurrentBool %>
                            $PageNum
                            <% else %>
                            <a href="$Link" title="View page number $PageNum" class="go-to-page">$PageNum</a>
                            <% end_if %>
                        <% end_loop %>
                    </span>
                    <% if $Results.NotLastPage %>
                    <a class="next" href="$Results.NextLink" title="View the next page">&rarr;</a>
                    <% end_if %>
                </div>
                <p>Stran $Results.CurrentPage od $Results.TotalPages</p>
            </div>
            <% end_if %>

         </div>




        </div>
      </div>
    </section>
<% include Footer %>