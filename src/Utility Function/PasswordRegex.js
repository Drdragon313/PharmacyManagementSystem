export const PasswordRegex = () => {
  const regex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
  return regex;
};
