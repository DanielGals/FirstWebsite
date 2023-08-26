const numberInput = document.querySelector('.number-input');
let storedValueWithoutCommas = ''; 

  numberInput.addEventListener('input', function(event) {
    // Remove non-numeric characters
    const value = event.target.value.replace(/[^0-9]/g, '');

    // Limit to 8 digits (including commas)
    const limitedValue = value.substring(0, 8);

    // Remove commas for numeric calculations
    const numericValue = Number(limitedValue.replace(/,/g, ''));

    // Format value with commas for display
    const formattedValue = numericValue.toLocaleString('en-US');

    event.target.value = formattedValue;
  });

  numberInput.addEventListener('blur', function(event) {
    // Remove commas and store the value without commas
    storedValueWithoutCommas = event.target.value.replace(/,/g, '');
    
  });

  const confirmButton = document.getElementById('confirmButton');
  confirmButton.addEventListener('click', function() 
  {
    // Store the value without commas in a variable within the click function
    const CashInAmount = storedValueWithoutCommas;
    console.log(CashInAmount); // Now you can use valueToStore as needed
  });


// TO DISPLAY USERNAME
function UsernameText(username) {
    const welcomeDiv = document.getElementById('welcomeText');
      welcomeDiv.textContent = username;
  }
  document.addEventListener('DOMContentLoaded', () => {
    checkAccount();
  });
  async function checkAccount() {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    console.log(localStorage);
    try {
      // const accessToken = tokenHandler.getToken();
      const response = await fetch('http://localhost:8080/check-token', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`, // The password to access the API
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const data = await response.json();
      // data[0] is used to access the first element in the array
      UsernameText(data[0].username);

    } catch (error) {
      // Handle errors
    }
  }
  