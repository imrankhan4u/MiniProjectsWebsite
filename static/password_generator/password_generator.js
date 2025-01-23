function generatePassword() {
  const length = document.getElementById("length").value;
  const passwordDisplay = document.getElementById("password-display");
  const warningMessage = document.getElementById("warning");

  // Clear previous messages
  passwordDisplay.innerHTML = "";
  warningMessage.innerHTML = "";

  if (length < 8) {
      warningMessage.innerHTML = "Min length: 8";
      return;
  }

  // Characters to choose from
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  
  let password = "";
  
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
  }

  // Display generated password
  passwordDisplay.innerHTML = "Generated Password: " + password;
}
