import React from "react";
import PasswordResetForm from "../../Components/PasswordResetForm/PasswordResetForm";

const SetPassword = () => {
  return (
    <div className="reset-password-body">
      <PasswordResetForm headingText="Set" buttonText="Set Password" />
    </div>
  );
};

export default SetPassword;
