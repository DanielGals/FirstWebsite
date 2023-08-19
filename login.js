
  
let button = document.querySelector('#login');
button.onclick = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  Authlogin(email,password)
}
// Assuming this function is triggered by a login form submission
async function Authlogin(email, password) {
  
  console.log(email);
  console.log(password);
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      const accessToken = data.accessToken;

      if (accessToken === 'invalid') {
        // Display an error message to the user
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Invalid email or password';
        errorMessage.style.display = 'block';
        throw new Error('Invalid email or password');
      }
      else
      {
        // Save the accessToken in local storage or a cookie for future API calls
      // Replace 'yourAccessTokenKey' with an appropriate key name
      //tokenHandler.setToken(accessToken);
      console.log(accessToken);
      localStorage.setItem('ACCESS_TOKEN', accessToken);
        window.location.href = '/dashboard.html';
      }
  
      

      
      // Continue with further actions (e.g., navigating to protected pages, etc.)
      // ...
    } catch (error) {
      // Handle login errors
      console.error('Login failed:', error);
    }
  }
 
