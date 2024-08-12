<%@ page language="java" contentType="text/html; charset=UTF-8"
     pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f2f5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .form-container-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
        .form-container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 300px;
            text-align: center;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        .form-row {
            margin-bottom: 15px;
            text-align: left;
        }
        .form-label {
            display: block;
            margin-bottom: 5px;
            color: #555;
        }
        .form-input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .form-input:focus {
            border-color: #007bff;
            outline: none;
        }
        .form-submit {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            border: none;
            border-radius: 4px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .form-submit:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="form-container-wrapper">
        <div class="form-container" id="login-form-container">
            <h1>Login</h1>
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
</html>
