export const PasswordRegex = () => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,}$/;
  return regex;
};
