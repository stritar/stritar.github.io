    <!-- Partners -->
    <section class="partners">
      <div class="container">
        <div class="row">
          <div class="col-x-12 text-center">
          	<% if ClassName = HomePage %> 
            <div class="showmore"><a href="javascript:void(0);" class="showold"></a></div>
            <% end_if %>
            $SiteConfig.FooterContent
          </div>
        </div>
      </div>
    </section>
    <!-- Footer -->
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-xs-12 text-center">
            <p class="ftitle icon home"><span></span>CSD Ljubljana Vič Rudnik<br>Mladinsko Središče Vič</p>
            <a class="icon location" href="$SiteConfig.FooterLocationURL" rel="external"><span></span>$SiteConfig.FooterLocation</a>
            <a class="icon mail" href="mailto:$SiteConfig.FooterEmail"><span></span>$SiteConfig.FooterEmail</a>
            <a class="icon phone" href="tel:+38612527769"><span></span>$SiteConfig.FooterPhone1, $SiteConfig.FooterPhone2</a>
            <div class="social">
              <ul class="list-unstyled list-inline">
                <li><a href="$SiteConfig.FooterFB" class="fb"></a></li>
                <li><a href="$SiteConfig.FooterTW" class="tw"></a></li>
                <li><a href="$SiteConfig.FooterIN" class="in"></a></li>
              </ul>
            </div>
            <p class="copyright">&copy; 2014 MSV</p>
            <p><a href="http://cnj.si" rel="external" class="cnj"></a></p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</div>