<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.model.Feedback" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Feedback Details</title>
</head>
<body>
    <h1>Feedback Details</h1>
    <%
        Feedback feedback = (Feedback) request.getAttribute("feedback");
        if (feedback != null) {
    %>
    <p><strong>Sender ID:</strong> <%= feedback.getSenderID() %></p>
    <p><strong>Sender Email:</strong> <%= feedback.getSenderEmail() %></p>
    <p><strong>Subject:</strong> <%= feedback.getSubject() %></p>
    <p><strong>Message:</strong> <%= feedback.getMessage() %></p>
    <p><strong>Timestamp:</strong> <%= feedback.getTimestamp() %></p>
    <%
        } else {
            out.println("<p>No feedback details available.</p>");
        }
    %>
    <form action="ViewFeedbackServlet" method="get">
        <button type="submit">Back to Feedback List</button>
    </form>
</body>
</html>
