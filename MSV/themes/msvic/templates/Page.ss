<!DOCTYPE html>
<!-- SliceUp by Darjan Pezer - HTML5 and CSS3 Ready! -->
<!--[if lt IE 7]><html lang="$ContentLocale" class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]><html lang="$ContentLocale" class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if IE 8]><html lang="$ContentLocale" class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--><html lang="$ContentLocale" class="no-js"><!--<![endif]-->
<head>
  <% base_tag %>
  <script type="text/javascript" src="//use.typekit.net/cfn8eyo.js"></script>
  <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
  <meta charset="utf-8">
  <!--<meta http-equiv="X-UA-Compatible" content="IE=edge"> htaccess -->
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
  <title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> | $SiteConfig.Title</title>
  $MetaTags(false)
  <meta name="robots" content="index, follow">
  <!-- CSS Styles -->
  <link rel="stylesheet" href="$ThemeDir/css/bootstrap.css">
  <link rel="stylesheet" href="$ThemeDir/js/lightbox/themes/default/jquery.lightbox.css">
  <link rel="stylesheet" href="$ThemeDir/css/style.css">
  <link rel="stylesheet" href="$ThemeDir/css/media-queries.css">
  <!-- Fav and Touch icons -->
  <link rel="shortcut icon" href="$ThemeDir/ico/favicon.ico">
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="$ThemeDir/ico/apple-touch-icon-144x144-precomposed.png">
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="$ThemeDir/ico/apple-touch-icon-114x114-precomposed.png">
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="$ThemeDir/ico/apple-touch-icon-72x72-precomposed.png">
  <link rel="apple-touch-icon-precomposed" sizes="57x57" href="$ThemeDir/ico/apple-touch-icon-57x57-precomposed.png">
  <link rel="apple-touch-icon-precomposed" href="$ThemeDir/ico/apple-touch-icon-precomposed.png">
  <!-- JS Frameworks -->
  <script src="$ThemeDir/js/modernizr.custom.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script> 
  <script src="$ThemeDir/js/gsap/jquery.gsap.min.js" type="text/javascript"></script>
  <script src="$ThemeDir/js/gsap/TweenMax.min.js" type="text/javascript"></script>
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body class="$ClassName<% if not $Menu(2) %> no-sidebar<% end_if %>" <% if $i18nScriptDirection %>dir="$i18nScriptDirection"<% end_if %>>
<!--[if lt IE 8]>
<div class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</div>
<![endif]-->
<!-- Start -->
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/sl_SI/sdk.js#xfbml=1&appId=277110629140089&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<% if ClassName != ErrorPage %>
$Layout
<% else %>
<div class="error">
  <p><img src="$ThemeDir/img/headers/404_trees.png" alt="trees"></p>
  <div class="etext">
    <p class="text-center"><span>404</span><br>Menda smo zašli...</p>
  </div>
  <p class="text-center"><a href="$BaseHref" class="ebtn">Nazaj domov</a></p>
</div>
<% end_if %>
<!-- End -->
<!-- Below Footer -->
<!-- All custom JavaScripts -->
<script src="$ThemeDir/js/checkmobile.js"></script>
<script src="$ThemeDir/js/sticky-navigation-fixer.js"></script>
<script src="$ThemeDir/js/retina.min.js"></script>
<script src="$ThemeDir/js/imagesloaded.min.js"></script>
<script src="$ThemeDir/js/skrollr.min.js"></script>
<script src="$ThemeDir/js/waypoints.min.js"></script>
<script src="$ThemeDir/js/jquery.dotdotdot.min.js"></script>
<script src="$ThemeDir/js/lightbox/jquery.lightbox.min.js"></script>
<script src="$ThemeDir/js/jquery.validate.min.js"></script>
<script src="$ThemeDir/js/main.js"></script>
<% if ClassName = ArticlePage %><script><% loop $ChildrenOf(koledar) %>$('.opendatepopup[data-date="$Date.format(d)$Date.format(m)$Date.format(Y)"]').addClass('active');$('.opendatepopup[data-date="$Date.format(d)$Date.format(m)$Date.format(Y)"]').data('content','$oneLineContent($Content)');<% end_loop %></script><% end_if %>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
<% if $SiteConfig.GoogleAnalytics %><script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', '$SiteConfig.GoogleAnalytics', 'auto');
  ga('send', 'pageview');
</script><% end_if %>
</body>
</html>