<%@ page language="java" contentType="text/html; charset=UTF-8"
     pageEncoding="UTF-8"%>
 <!DOCTYPE html>
 <html>
 	<head>
 	<meta charset="UTF-8">
 	<title>Admin Login</title>
 	<link rel="stylesheet" type="text/css" href="login.css"/>
 </head>
 <body>
    <h1>Login</h1>
    <div class="form-container-wrapper">
        <div class="form-container" id="login-form-container">
            <form action="/login" method="post" id="login-form" class="form">
                <div class="form-row">
                    <label for="username" class="form-label">Username:</label>
                    <input type="text" id="username" name="username" class="form-input" placeholder="Enter your username">
                </div>

                <div class="form-row">
                    <label for="password" class="form-label">Password:</label>
                    <input type="password" id="password" name="password" class="form-input" placeholder="Enter your password">
                </div>

                <input type="submit" value="Login" class="form-submit">
            </form>
        </div>
    </div>
 </body>