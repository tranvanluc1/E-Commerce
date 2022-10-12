const valid = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  if (!name || !email || !password) {
    return "Please add all fields.";
  }
  if (!validateEmail(email)) return "Please provide a valid email.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (password !== confirmPassword)
    return "Confirm Password did not match the password.";
};

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default valid;
