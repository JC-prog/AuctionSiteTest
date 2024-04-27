<html>
<body>
<h2>EZ Auction</h2>

	<button onclick="redirectTo('login')">Login</button>
    <button onclick="redirectTo('register')">Register</button>

    <script>
        function redirectTo(path) {
            var currentUrl = window.location.href;
            var baseUrl = currentUrl.split('?')[0];
            window.location.href = baseUrl + path;
        }
    </script>

</body>
</html>
