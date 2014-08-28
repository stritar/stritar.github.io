
<% if ClassName = EventList %> 
<script type="text/javascript">
<% loop $Children %>
$('.opendatepopup[data-date="$Date.format(d)$Date.format(m)$Date.format(Y)"]').addClass('active');
$('.opendatepopup[data-date="$Date.format(d)$Date.format(m)$Date.format(Y)"]').data('content','$Content');
<% end_loop %>
</script>
<% end_if %> 
