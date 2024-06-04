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
</head>
<body>
 <div align="center">
  <h1>Register Form</h1>
  
  <form action="<%= request.getContextPath() %>/register" method="post" class="register-form" id="register-form" onsubmit="return validate()">
	   <table style="with: 80%">
	    <tr>
	     <td>UserName</td>
	     <td><input type="text" name="name" id="name" placeholder="Your Name"  /></td>
	    </tr>
	     <tr>
	     <td>Email</td>
	     <td><input type="email" name="email" id="email" placeholder="Your Email" /></td>
	    </tr>
	     <tr>
	     <td>Contact Number</td>
	     <td><input type="text" name="contact" id="contact"	placeholder="Contact no" /></td>
	    </tr>
	     <tr>
	     <td>Address</td>
	     <td><input type="text" name="address" id="address"	placeholder="Your Address" /></td>
	    </tr>
	    <tr>
	     <td>Password</td>
	     <td><input type="password" name="pass" id="pass" placeholder="Password" /></td>
	    </tr>
	    <tr>
	     <td>Re-Enter Password</td>
	     <td><input type="password" name="re_pass" id="re_pass"	placeholder="Repeat your password" /></td>
	    </tr>
	    	    
	     <tr>
	 
	     <td><input type="checkbox" name="agree-term" id="agree-term"
									class="agree-term" /> <label for="agree-term"
									class="label-agree-term"><span><span></span></span>I
									agree all statements in <a href="#" class="term-service">Terms
										of service</a></label></td>
	    </tr>
	    
	   </table>
    <input type="radio" id="buyer" name="role" value="buyer">
    <label for="buyer">Buyer</label><br>
    <input type="radio" id="seller" name="role" value="seller">
    <label for="seller">Seller</label><br>
   <input type="submit" name="signup" id="signup" class="form-submit" value="Register" />
  </form>
  
  <div class="signup-image">
						<a href="login.jsp" class="signup-image-link">I am already
							member</a>
					</div>
  
 </div>
</body>
</html>