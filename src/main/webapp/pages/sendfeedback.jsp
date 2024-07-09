<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Send Feedback</title>
</head>
<body>
    <h1>Send Feedback</h1>
    <form action="SendFeedbackServlet" method="post">
        <label for="subject">Subject:</label><br>
        <input type="text" id="subject" name="subject" required><br><br>
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" rows="10" cols="50" required></textarea><br><br>
        <button type="submit">Submit</button>
    </form>
</body>
</html>
