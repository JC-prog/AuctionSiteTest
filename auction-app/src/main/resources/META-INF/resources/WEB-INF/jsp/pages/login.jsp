<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
	<meta charset="UTF-8">
	<title>Login</title>
	<link rel="stylesheet" type="text/css" href="./index.css"/>	
    <link rel="stylesheet" type="text/css" href="./components/navbar.css"/>
    <link rel="stylesheet" type="text/css" href="./components/navbarLoginState.css"/>
    <link rel="stylesheet" type="text/css" href="./components/menubar.css"/>
    <link rel="stylesheet" type="text/css" href="./components/footer.css"/>
    <link rel="stylesheet" type="text/css" href="./pages/login.css"/>
</head>
<body>
	<jsp:include page="../components/navbar.jsp" />
	<jsp:include page="../components/menubar.jsp" />
	
	<div class="form-container-wrapper">
		<div class="form-container" id="login-form-container">
		    <h1 class="form-title">EzAuction</h1>
		    
		    <div class="form-links">
		        <a href="login.jsp" class="form-link-login">Login</a>
		        <a href="register.jsp" class="form-link">Sign Up</a>
		    </div>
		
		    <form action="login" method="post" id="login-form" class="form">
		        <div class="form-row">
		            <label for="uName" class="form-label">Username:</label>
		            <input type="text" id="uName" name="uName" class="form-input" placeholder="Enter your username">
		        </div>
		        
		        <div class="form-row">
		            <label for="password" class="form-label">Password:</label>
		            <input type="password" id="password" name="password" class="form-input" placeholder="Enter your password">
		        </div>
		        
		        <input type="submit" value="Login" class="form-submit">
		    </form>
		</div>
	</div>
	
	<jsp:include page="../components/footer.jsp" />

</body>
</html>