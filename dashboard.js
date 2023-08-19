


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
      console.log(data[0].username);
    } catch (error) {
      // Handle errors
    }
  }
  


