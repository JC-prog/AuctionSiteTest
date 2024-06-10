<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
 pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="ISO-8859-1">
		<title>Register Page</title>
		
		 <script> 
			function validate() { 
				
				 var name = document.getElementById("name").value;
				 var email = document.getElementById("email").value;
				 var contact = document.getElementById("contact").value;
				 var pass = document.getElementById("pass").value;
				 var re_pass= document.getElementById("re_pass").value;
				 
				 if (name==null || name=="") { 
					 alert("Name can't be blank"); 
					 return false; 
				 }
				 else if (email==null || email=="") { 
					 alert("Email can't be blank"); 
					 return false; 
				 }
				 else if (contact==null || contact.length<8) { 
					 alert("Phone number is not valid"); 
					 return false; 
				 }
				 else if(pass.length<6) { 
					 alert("Password must be at least 6 characters long."); 
					 return false; 
				 } 
				 else if (pass!=re_pass) { 
					 alert("Confirm Password should match with the Password"); 
					 return false; 
				 } 
			 } 
		</script> 
		
		<link rel="stylesheet" type="text/css" href="./index.css"/>	
	    <link rel="stylesheet" type="text/css" href="./components/navbar.css"/>
	    <link rel="stylesheet" type="text/css" href="./components/navbarLoginState.css"/>
	    <link rel="stylesheet" type="text/css" href="./components/menubar.css"/>
	    <link rel="stylesheet" type="text/css" href="./components/footer.css"/>
	    <link rel="stylesheet" type="text/css" href="./pages/register.css"/>
	</head>
<body>
	<jsp:include page="../components/navbar.jsp" />
	<jsp:include page="../components/menubar.jsp" />
	
	<div class="register-form-wrapper">
		<div class="form-container" id="register-form-container">
	        <h1>EzAuction</h1>
	        
	        <div class="form-links">
	            <a href="login.jsp" class="form-link">Login</a>
	            <a href="register.jsp" class="form-link-register">Sign Up</a>
	        </div>
	        
	        <form action="<%= request.getContextPath() %>/register" method="post" class="register-form" id="register-form" onsubmit="return validate()">
	            <table class="form-table">
	                <tr>
	                    <td><label for="name" class="form-label">Username</label></td>
	                    <td><input type="text" name="name" id="name" class="form-input" placeholder="Your Name" /></td>
	                </tr>
	                <tr>
	                    <td><label for="email" class="form-label">Email</label></td>
	                    <td><input type="email" name="email" id="email" class="form-input" placeholder="Your Email" /></td>
	                </tr>
	                <tr>
	                    <td><label for="contact" class="form-label">Contact Number</label></td>
	                    <td><input type="text" name="contact" id="contact" class="form-input" placeholder="Contact no" /></td>
	                </tr>
	                <tr>
	                    <td><label for="address" class="form-label">Address</label></td>
	                    <td><input type="text" name="address" id="address" class="form-input" placeholder="Your Address" /></td>
	                </tr>
	                <tr>
	                    <td><label for="pass" class="form-label">Password</label></td>
	                    <td><input type="password" name="pass" id="pass" class="form-input" placeholder="Password" /></td>
	                </tr>
	                <tr>
	                    <td><label for="re_pass" class="form-label">Re-Enter Password</label></td>
	                    <td><input type="password" name="re_pass" id="re_pass" class="form-input" placeholder="Repeat your password" /></td>
	                </tr>
	                <tr>
	                    <td colspan="2">
	                        <input type="checkbox" name="agree-term" id="agree-term" class="form-checkbox" />
	                        <label for="agree-term" class="label-agree-term">
	                            I agree to all statements in 
	                            <a href="#" class="term-service">Terms of service</a>
	                        </label>
	                    </td>
	                </tr>
	            </table>
	            <input type="submit" name="signup" id="signup" class="form-submit" value="Register" />
	        </form>
	        <div class="signup-image">
	            <a href="login.jsp" class="signup-image-link">I am already a member</a>
	        </div>
	    </div>
    </div>
    
    <jsp:include page="../components/footer.jsp" />
</body>
</html>