


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

      //CALL Fetch Balance HERE
      const userID = data[0].user_id;
      await fetchUserDataAndDisplayBalance(userID);
      console.log(userID, " USER ID");
      console.log(data[0].username);
    } catch (error) {
      // Handle errors
    }
  }
  
  const balanceElement = document.getElementById("balance");
  const accountNum = document.getElementById("account");
  // Replace 'YOUR_API_URL' with the actual URL of your API
  const apiUrl = 'https://zenbank-server.vercel.app';

  // Function to fetch user data and update the balance element
  async function fetchUserDataAndDisplayBalance(user_id) {
      try {
          const response = await fetch(`${apiUrl}/accounts/${user_id}`);
          const userData = await response.json();

          if (userData && userData.balance !== undefined) {
              balanceElement.textContent = `YOUR BALANCE: ${userData.balance}`;
              accountNum.textContent = `account number: ${userData.account_id}`;
          } else {
              balanceElement.textContent = "Balance information not available";
              accountNum.textContent = "Account NUmber not available";
          }
      } catch (error) {
          console.error("Error fetching user data:", error);
          balanceElement.textContent = "Error fetching balance";
      }
  }


  async function checkBalance() {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    console.log(localStorage);
    try {
      // const accessToken = tokenHandler.getToken();
      const response = await fetch('https://zenbank-server.vercel.app/check-balance', {
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
      console.log(data[0].username);
    } catch (error) {
      // Handle errors
    }
  }
  


