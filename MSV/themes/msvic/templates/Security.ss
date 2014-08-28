<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=1, minimum-scale=1.0, maximum-scale=1">
	<title>msvic.si Admin</title>
	<link href="/login/css/login.css" rel="stylesheet">
	<link href="/login/img/ico/favicon.ico" rel="icon" type="image/x-icon">
</head>
<body>
	<a href="http://cnj.si" class="cnj-logo"></a>
	<div class="login">
		<form id="MemberLoginForm_LoginForm" action="LoginForm" method="post" enctype="application/x-www-form-urlencoded">
		  <input type="hidden" name="AuthenticationMethod" value="MemberAuthenticator" class="hidden" id="MemberLoginForm_LoginForm_AuthenticationMethod">
		  <fieldset>
		    <legend>msvic.si</legend>
		    <div class="input">
			    <label for="email">USERNAME</label>
			    <input type="text" name="Email" class="text" id="MemberLoginForm_LoginForm_Email" required="required" aria-required="true">
			</div>
			<div class="input last">
			    <label for="password">PASSWORD</label>
			    <input type="password" name="Password" class="text password" id="MemberLoginForm_LoginForm_Password" required="required" aria-required="true">
			</div>
			<div>
				<input type="checkbox" name="Remember" value="1" class="checkbox" id="MemberLoginForm_LoginForm_Remember">
				<label class="inline" for="MemberLoginForm_LoginForm_Remember">remember me</label>
			</div>
			<div class="action">
				<input type="hidden" name="BackURL" value="/admin/pages" class="hidden" id="MemberLoginForm_LoginForm_BackURL">
				<button type="submit" name="action_dologin" class="action" id="MemberLoginForm_LoginForm_action_dologin">LOGIN</button>
			</div>
		  </fieldset>
		</form>
	</div>
</body>
</html>