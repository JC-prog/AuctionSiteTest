<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Payment Page</title>
    <script src="https://js.stripe.com/v3/"></script>
    <script>
    let stripe;
    let elements;
    document.addEventListener("DOMContentLoaded", function() {
    		stripe = Stripe("pk_test_51PRZT506m6t4vRTRbBrLYDRpcjwTtDFVpAZcimoSEt2BgUVSY9mHQ4CG1tMBVg8e8u53WAUDWEZktTsBCWf0MBrK00iCRJ8o0a"); // Replace with your own publishable key
    		console.log(stripe);
    		const appearance = {
	        	    theme: 'stripe',
	        	  };
    		let clientSecret = '<%=request.getAttribute("clientSecret")%>'
	        	  elements = stripe.elements({ appearance, clientSecret });
	        	  const paymentElementOptions = {
	        			    layout: "tabs",
	        			  };
	        			  const paymentElement = elements.create("payment", paymentElementOptions);
	        			  paymentElement.mount("#payment-element");
	        			
    	});
        
        const appearance = {
        	    theme: 'stripe',
        	  };
        	  elements = stripe.elements({ appearance, clientSecret });

        // Custom styling can be passed to options when creating an Element
        var style = {
            base: {
                fontSize: '16px',
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };

        // Create an instance of the card Element
        var card = elements.create('card', {style: style});

        // Add an instance of the card Element into the `card-element` div
        card.mount('#card-element');

        // Handle form submission
        var form = document.getElementById('payment-form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            stripe.createToken(card).then(function(result) {
                if (result.error) {
                    // Inform the user if there was an error
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // Token represents a card payment token that you can safely send to your server
                    stripeTokenHandler(result.token);
                }
            });
        });

        // Submit the form with the token ID
        function stripeTokenHandler(token) {
            var form = document.getElementById('payment-form');
            var hiddenInput = document.createElement('input');
            hiddenInput.setAttribute('type', 'hidden');
            hiddenInput.setAttribute('name', 'stripeToken');
            hiddenInput.setAttribute('value', token.id);
            form.appendChild(hiddenInput);

            // Submit the form
            form.submit();
        }
    </script>
</head>
<body>
    <h1>Payment for Item No: <%= request.getAttribute("itemNo") %></h1>
    <h2>Transaction ID: <%= request.getAttribute("transactionID") %></h2>
    <h2>Sale Amount: $<%= request.getAttribute("saleAmount") %></h2>
    
     <!-- Display a payment form -->
    <form id="payment-form" action="PaymentServlet" method="post">
      <div id="payment-element">
        <!--Stripe.js injects the Payment Element-->

      </div>
        <input type="hidden" name="transactionID" value="<%= request.getAttribute("transactionID") %>">
        <input type="hidden" name="itemNo" value="<%= request.getAttribute("itemNo") %>">
        <input type="hidden" name="saleAmount" value="<%= request.getAttribute("saleAmount") %>">
        <button type="submit">Submit Payment</button>
     <!-- <button id="submit" >
        <div class="spinner hidden" id="spinner">
         
        
        </div>
        <span id="button-text">Submit Payment</span>
        </button>-->
      <div id="payment-message" class="hidden"></div>
    </form>
<!--  
    <form id="payment-form" action="PaymentServlet" method="post">
        <div id="card-element">
            <!-- A Stripe Element will be inserted here. -->
   <!--       </div>

        <!-- Used to display form errors. -->
   <!--       <div id="card-errors" role="alert"></div>

        <input type="hidden" name="transactionID" value="<%= request.getAttribute("transactionID") %>">
        <input type="hidden" name="itemNo" value="<%= request.getAttribute("itemNo") %>">
        <input type="hidden" name="saleAmount" value="<%= request.getAttribute("saleAmount") %>">

        <button type="submit">Submit Payment</button>
    </form>
    -->
</body>
</html>
