<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List, com.model.Feedback" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Feedback List</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <h1>Feedback List</h1>
    <table>
        <thead>
            <tr>
                <th>Subject</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <%
                List<Feedback> feedbackList = (List<Feedback>) request.getAttribute("feedbackList");
                if (feedbackList != null) {
                    for (Feedback feedback : feedbackList) {
                        out.println("<tr>");
                        out.println("<td>" + feedback.getSubject() + "</td>");
                        out.println("<td><form action='ViewFeedbackServlet' method='post'>");
                        out.println("<input type='hidden' name='feedbackID' value='" + feedback.getFeedbackID() + "'/>");
                        out.println("<button type='submit'>View</button>");
                        out.println("</form></td>");
                        out.println("</tr>");
                    }
                }
            %>
        </tbody>
    </table>
</body>
</html>
