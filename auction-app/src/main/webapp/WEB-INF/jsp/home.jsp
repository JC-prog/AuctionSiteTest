<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home</title>
</head>
<body>
    <h1>Welcome to the Home Page</h1>
    <form action="${pageContext.request.contextPath}/category" method="get">
        <button type="submit">Category Management</button>
    </form>
</body>
</html>
