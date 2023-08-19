// Select the input fields
const fnameInput = document.getElementById("full_name");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm_password");

// Select the corresponding icons
const fnameIcon = document.getElementById("fnameIcon");
const usernameIcon = document.getElementById("usernameIcon");
const emailIcon = document.getElementById("emailIcon");
const phoneIcon = document.getElementById("phoneIcon");
const addressIcon = document.getElementById("addressIcon");
const passwordIcon = document.getElementById("passwordIcon");
const confirmIcon = document.getElementById("confirmIcon");


// Add event listeners to input fields
fnameInput.addEventListener("input", checkFirstname);
emailInput.addEventListener("input", checkEmail);
passwordInput.addEventListener("input", checkPassword);
usernameInput.addEventListener("input", checkUsername);
phoneInput.addEventListener("input", checkPhone);
addressInput.addEventListener("input", checkAddress);
confirmInput.addEventListener("input", checkConfirm);


function checkFirstname() {
    const firstName = fnameInput.value;
    fnameIcon.style.visibility = firstName.length >= 9 ? "visible" : "hidden";
  }

function checkUsername() {
    const firstName = usernameInput.value;
    usernameIcon.style.visibility = firstName.length >= 6 ? "visible" : "hidden";
  }  
function checkPhone() {
    const firstName = phoneInput.value;
    const emailRegex = /^\d{11}$/;
    phoneIcon.style.visibility = emailRegex.test(firstName) ? "visible" : "hidden";
  }
function checkAddress() {
    const firstName = addressInput.value;
    addressIcon.style.visibility = firstName.length >= 8 ? "visible" : "hidden";
  }
function checkConfirm() {
    const password = passwordInput.value;
    const confirmPass = confirmInput.value;
    const passwordsMatch = password === confirmPass;
    confirmIcon.style.visibility = passwordsMatch ? "visible" : "hidden";
}
  
  function checkEmail() {
    const email = emailInput.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    emailIcon.style.visibility = emailRegex.test(email) ? "visible" : "hidden";
  }
  
  function checkPassword() {
    const password = passwordInput.value;
    passwordIcon.style.visibility = password.length >= 8 ? "visible" : "hidden";
  }

  function areAllFieldsValid() {
    const firstName = fnameInput.value;
    const username = usernameInput.value;
    const phone = phoneInput.value;
    const address = addressInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    const firstNameIsValid = firstName.length >= 9;
    const usernameIsValid = username.length >= 6;
    const phoneIsValid = /^\d{11}$/.test(phone);
    const addressIsValid = address.length >= 8;
    const emailIsValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    const passwordIsValid = password.length >= 8;
    const passwordsMatch = password === confirmPassword;

    return (
        firstNameIsValid &&
        usernameIsValid &&
        phoneIsValid &&
        addressIsValid &&
        emailIsValid &&
        passwordIsValid &&
        passwordsMatch
    );
}

  let button = document.querySelector('#createAccount');
  button.onclick = () => {

    if (areAllFieldsValid()) 
    {
        const fnameInput = document.getElementById("full_name").value;
        const usernameInput = document.getElementById("username").value;
        const emailInput = document.getElementById("email").value;
        const phoneInput = document.getElementById("phone").value;
        const addressInput = document.getElementById("address").value;
        const passwordInput = document.getElementById("password").value;
        
        

        createUser(usernameInput, passwordInput, fnameInput, emailInput, phoneInput, addressInput);
        
    } 
    else{
        console.log('INVALID' + fnameInput);
    }
  }

  async function createUser(username, password, full_name, email, phone, address) {
    const userData = {
      username: username,
      password: password,
      full_name: full_name,
      email: email,
      phone: phone,
      address: address
    };
  
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const data = await response.json();
      const accessToken = data.accessToken;
      console.log('User created. Access Token: ' + accessToken);
      
      //Store in local storage
      localStorage.setItem('ACCESS_TOKEN', accessToken);


      window.location.href = '/dashboard.html';
  
      
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Re-throw the error to be caught by the caller.
    }
  }