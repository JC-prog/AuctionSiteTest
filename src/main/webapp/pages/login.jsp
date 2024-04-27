<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Login</title>
</head>
<body>
	<h2>This is Login Page</h2>
	<h2>EZ Auction</h2>
	
	<form action="login" method="post">
		Username : <input type="text" name="uName"><br>
		Password : <input type="password" name="password"><br>
		<input type="radio" id="buyer" name="role" value="buyer">
	    <label for="buyer">Buyer</label><br>
	    <input type="radio" id="seller" name="role" value="seller">
	    <label for="seller">Seller</label><br>
		<input type="submit">
	</form>
</body>
</html>