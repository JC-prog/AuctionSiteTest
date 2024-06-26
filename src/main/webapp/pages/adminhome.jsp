<!DOCTYPE html>
<html>
<head>
    <title>Admin Home</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .top-right {
            position: absolute;
            top: 10px;
            right: 10px;
        }
        .button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }
        .button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <h1>Welcome Admin</h1>
    <div class="top-right">
        <form action="ViewUsersServlet" method="get">
            <button type="submit" class="button">View Users</button>
        </form>
    </div>
</body>
</html>
