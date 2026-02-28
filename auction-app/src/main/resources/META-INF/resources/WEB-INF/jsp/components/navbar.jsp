<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="./navbarLoginState.css"/>
</head>
<body>
    <div class="navbar">
        <div class="navbar-brand">
        	<a href="/auctionapp/">EzAuction</a></div>
        <div class="search-container">
            <form action="search" method="get">
                <input type="text" name="query" class="search-input" placeholder="What are you looking for?">
                <input type="submit" class="search-button" value="Search">
            </form>
        </div>
        <jsp:include page="./navbarLoginState.jsp" />
    </div>
</body>
</html>
