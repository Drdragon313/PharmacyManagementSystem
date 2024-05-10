export const PasswordRegex = () => {
  const regex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>~`\-\/\\+';=_])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
  return regex;
};
