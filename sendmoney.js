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
  
  
    /*
    const CashInAmount = storedValueWithoutCommas; 
    console.log(CashInAmount); // Now you can use valueToStore as needed
    */

    const recipientIdInput = document.getElementById('recipientIdInput');
    
    //To Access the receipientID
    // recipientId = recipientIdInput.value;
    //  console.log('Recipient ID:', recipientId);

    const innerBox = document.getElementById('innerBox');
    const otpPage = document.getElementById('confirm-page');
    const confirmButton = document.getElementById('confirmButton');
    

    confirmButton.addEventListener('click', async function() 
    {
      //!! Error with checking conditions please fix ;(
      const amountDb = parseInt(await checkAccountAgain(), 10); // The second argument (10) specifies the radix (base 10).
      //Return Trans ID
      const amountInput = parseInt(storedValueWithoutCommas, 10);
      if(amountInput > amountDb)
      {
        console.log("Insufficient Funds");
        console.log(amountInput , " greater than " , amountDb);
      }
      else if (amountDb >= amountInput)
      {
        console.log("Amount is possible");
       
          innerBox.style.display = 'none';
          otpPage.style.display = 'block';
    
          const pangalan = await getUserID(recipientIdInput.value); // DISPLAY NAME OF CLIENT
          // ! For deducting balance
          
          const recipientName = pangalan;
          const recipientID = recipientIdInput.value;
          
    
          // Get the elements by their IDs
          const displayNameElement = document.getElementById("displayName");
          const displayIDElement = document.getElementById("displayID");
          const displayAmountElement = document.getElementById("displayAmount");
    
          // Update the content of the elements with the variables
          displayNameElement.textContent = "Receipents Name: " + recipientName;
          displayIDElement.textContent = "Receipents ID: " + recipientID;
          displayAmountElement.textContent = "AMOUNT: " + amountInput;
      }
    } );
    
    //After pressing the confirmation of all credentials

    const successPage = document.getElementById('success-page');
    const confirmButton2 = document.getElementById('confirmButton2');
    confirmButton2.addEventListener('click', async function() 
    {
        otpPage.style.display = 'none';
        successPage.style.display = 'block';

        const CashInAmount = storedValueWithoutCommas; //Amount
        console.log(CashInAmount, "amount to 2");

        let recipientId = recipientIdInput.value; //ID to send
        console.log('Recipient ID to 2:' + recipientId);

        const isInserted = await insertBalanceOnFrontend(recipientId, CashInAmount)

        // ! Bago to
        
        const transIDKO = await getTransIDReal(await checkAccountAgainAgain());

    
        const deduct = await deductBalance(transIDKO, CashInAmount);
        console.log('eto kung deducted na lods', deduct);
        console.log(isInserted, " eto kung inserted naba");

        
    }); 

    async function insertBalanceOnFrontend(accountId, amountToAdd) {
      try {
        const response = await fetch('https://zenbank-server.vercel.app/insert-balance', {
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
        return data.balance; // This should contain the new balance returned by the server
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async function deductBalance(accountId, amountToAdd) {
      try {
        const response = await fetch('http://localhost:8080/delete-balance', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accountId, amountToAdd }),
        });
        if (!response.ok) {
          // Handle error responses (e.g., server error)
          throw new Error('Failed to  delete balance');
        }
        const data = await response.json();
        return data.balance; // This should contain the new balance returned by the server
      } catch (error) {
        console.error(error);
        throw error;
      }
    }



    //! Create new API that takes transID to get user_id on (Accounts) db

    const apiUrl = 'http://localhost:8080';
    async function getUserID(transID) {
      try {
        
          const response = await fetch(`${apiUrl}/account/${transID}`); // ! Change this
          const userData = await response.json();
  
          if (userData && userData.balance !== undefined) {
  
              console.log('Eto yung final answer' + userData.user_id);

              //return userData.user_id;
              console.log(userData.user_id, " eto yung user_id" , transID );
              const anoTo = await getTransID(userData.user_id);
              console.log(anoTo, " eto final answer ng legitness");
              return await getTransID(userData.user_id)
             
          } else {
              
          }
      } catch (error) {
          console.error("Error fetching user data:", error);
         
      }
  }

  const apiUrl2 = 'http://localhost:8080';
  async function getTransID(user_id) {
    try {
        const response = await fetch(`${apiUrl2}/name/${user_id}`);
        const userData = await response.json();

        console.log('Eto yung final answer' + userData.full_name);
        return userData.full_name;
       
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
}

const TapiUrl = 'https://zenbank-server.vercel.app';
  async function getTransIDReal(user_id) {
    try {
        const response = await fetch(`${TapiUrl}/accounts/${user_id}`);
        const userData = await response.json();

        if (userData && userData.balance !== undefined) {

            console.log('Eto yung final answer' + userData.account_id);
            return userData.account_id;
        } else {
           
        }
    } catch (error) {
        
    }
}
  


    
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
      return await getTransID2(userID);
      
    } catch (error) {
      // Handle errors
    }
  }

  const apiUrl3 = 'https://zenbank-server.vercel.app';
  async function getTransID2(user_id) {
    try {
        const response = await fetch(`${apiUrl3}/accounts/${user_id}`);
        const userData = await response.json();

        if (userData && userData.balance !== undefined) {

            console.log('Balance of user: ' + userData.balance);
            return userData.balance;
        } else {
            balanceElement.textContent = "Balance information not available";
            accountNum.textContent = "Account NUmber not available";
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        balanceElement.textContent = "Error fetching balance";
    }
}

async function checkAccountAgainAgain() {
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
    return userID;
    
  } catch (error) {
    // Handle errors
  }
}