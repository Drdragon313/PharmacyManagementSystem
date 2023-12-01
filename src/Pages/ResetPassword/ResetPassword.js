import React from "react";
import PasswordResetForm from "../../Components/PasswordResetForm/PasswordResetForm";
const ResetPassword = () => {
  return (
    <div className="reset-password-body">
      <PasswordResetForm heading="Reset Password" buttonText="Reset Password" />
    </div>
  );
};

export default ResetPassword;
