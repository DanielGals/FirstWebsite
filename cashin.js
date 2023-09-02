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

  const innerBox = document.getElementById('innerBox');
  const otpPage = document.getElementById('otpPage');
  const confirmButton = document.getElementById('confirmButton');
  const confirmButton2 = document.getElementById('confirmButton2');

  

  confirmButton.addEventListener('click', async function() 
  {
    innerBox.style.display = 'none';
    otpPage.style.display = 'block';
    

    // Store the value without commas in a variable within the click function
    // * Cash in value
    const CashInAmount = storedValueWithoutCommas; 
    console.log(CashInAmount); // Now you can use valueToStore as needed

    const OTP = generateRandomSixDigits();
    console.log(OTP);


    const email = await checkEmail();
    console.log(email + " tae");

    //TODO SEND EMAIL
    // GAWA NG FUNCTION NA NAG RERETUR NG RANDOM 6 DIGITS
    // CONDITIONS

    Email.send({
      // Host : "smtp.elasticemail.com",
      // Username : "janjangallaron@gmail.com",
      // Password : "BD8983ABD54BF68F269E456794BB241BBBF9",
      SecureToken : "b599c0f0-c2dd-4c9e-a4ee-46597c0214c8",
      To : `${email}`,
      From : "janjangallaron@gmail.com",
      Subject : "OTP VERIFICATION ALIEN ZEN BANK",
      Body : `Secure your banking with ease! Enter the 6-digit OTP ${OTP} we've sent you to verify your account and enjoy peace of mind in every transaction. Your financial security is our priority. Trust in us, trust in your bank.`
  }).then(
    
  );
  const confirmButton2 = document.getElementById("confirmButton2");
  const otpInput = document.querySelector(".otp-input");

  const success = document.getElementById('success-page');


  confirmButton2.addEventListener("click", async function() {
      const enteredOTP = otpInput.value;

      if (enteredOTP == OTP) {
          // Do something with the enteredOTP variable, like sending it for verification
          console.log("CORRECT");
          
          otpPage.style.display = 'none';
          success.style.display = 'block';

          const TransID = await checkAccountAgain(); //Return Trans ID
          console.log(TransID + "received ko na final na talga");

          //DATABASE CREATED
          //Create API endpoint
          
          console.log(CashInAmount + " Amount ng cash in");
          insertBalanceOnFrontend(TransID, CashInAmount);

      } else {
          const errorMessage = document.getElementById('error-message');
          errorMessage.textContent = 'Invalid OTP Code';
          errorMessage.style.display = 'block';
          throw new Error('Invalid email or password');
      }
  });
  });

  
  async function insertBalanceOnFrontend(accountId, amountToAdd) {
    try {
      const response = await fetch('http://localhost:8080/insert-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountId, amountToAdd }),
      });
  
      if (!response.ok) {
        // Handle error responses (e.g., server error)
        throw new Error('Failed to insert balance');
      }
  
      const data = await response.json();
      return data.newBalance; // This should contain the new balance returned by the server
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
    
  // });

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
      const response = await fetch('https://zenbank-server.vercel.app/check-token', {
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

async function checkEmail() {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  console.log(localStorage);
  try {
    // const accessToken = tokenHandler.getToken();
    const response = await fetch('https://zenbank-server.vercel.app/check-token', {
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
    return data[0].email;

  } catch (error) {
    // Handle errors
  }
}
  //

  function generateRandomSixDigits() {
    return Math.floor(100000 + Math.random() * 900000);
  }



  const apiUrl = 'https://zenbank-server.vercel.app';
  async function getTransID(user_id) {
    try {
        const response = await fetch(`${apiUrl}/accounts/${user_id}`);
        const userData = await response.json();

        if (userData && userData.balance !== undefined) {

            console.log('Eto yung final answer' + userData.account_id);
            return userData.account_id;
        } else {
            balanceElement.textContent = "Balance information not available";
            accountNum.textContent = "Account NUmber not available";
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        balanceElement.textContent = "Error fetching balance";
    }
}

 async function checkAccountAgain() {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    console.log(localStorage);
    try {
      // const accessToken = tokenHandler.getToken();
      const response = await fetch('https://zenbank-server.vercel.app/check-token', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`, // The password to access the API
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const data = await response.json();
      
     

      //CALL Fetch Balance HERE
      const userID = data[0].user_id;
      console.log(userID, " USER ID");
      console.log(data[0].username);
      return await getTransID(userID);
      
    } catch (error) {
      // Handle errors
    }
  }
  