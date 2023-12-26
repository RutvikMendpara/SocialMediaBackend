function isValidEmail(email) {
  // Regular expression for a simple email validation
  const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  // Test the email against the pattern
  return pattern.test(email);
}

function isValidPassword(password) {
  // At least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Test the password against the pattern
  return pattern.test(password);
}

module.exports = { isValidEmail, isValidPassword };
