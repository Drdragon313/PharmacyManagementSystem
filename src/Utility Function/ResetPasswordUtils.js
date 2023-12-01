import { PasswordRegex } from "./PasswordRegex";
import axios from "axios";
import { baseURL } from "../Components/BaseURLAPI/BaseURLAPI";
import { message } from "antd";

export const resendEmail = (userEmail) => {
  return axios
    .post(`${baseURL}/forget`, {
      email: userEmail,
    })
    .then(() => {
      message.success("Email Resent Successfully!", 3);
    })
    .catch(() => {
      message.error("Email Resending Failed!", 3);
    });
};

export const handleInputChangeUtil = (e, setData, setConditions) => {
  const { name, value } = e.target;
  setData((prevUserData) => ({
    ...prevUserData,
    [name]: value,
  }));
  setConditions({
    minLength: value.length >= 8,
    upperCase: /[A-Z]/.test(value),
    lowerCase: /[a-z]/.test(value),
    numberOrSpecialChar: /[0-9!@#$%^&*(),.?":{}|<>]/.test(value),
  });
};

export const handleSubmitUtil = (
  e,
  data,
  email,
  forgetPasswordKey,
  navigate,
  handleApiStatus
) => {
  e.preventDefault();
  if (data.password === data.confirmPassword) {
    const regex = PasswordRegex();
    if (regex.test(data.password)) {
      axios
        .post(`${baseURL}/update`, {
          email: email,
          passwordKey: forgetPasswordKey,
          password: data.password,
        })
        .then(() => {
          message.success("Password Updated Successfully!", 3);
          navigate("/passwordupdatesuccess");
          handleApiStatus(true);
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error &&
            error.response.data.error.message
          ) {
            message.error(error.response.data.error.message, 3);
          } else {
            message.error("Password updation Failed!", 3);
          }
          handleApiStatus(false);
        });
    } else {
      message.error("Password doesn't meet the required criteria");
    }
  } else {
    message.error("Passwords don't match!", 3);
  }
};

export const validateVerificationLink = async (
  email,
  forgetPasswordKey,
  handleApiStatus,
  setLoading
) => {
  try {
    const response = await axios.post(`${baseURL}/validate-verification-link`, {
      email,
      passwordKey: forgetPasswordKey,
    });

    if (response.status === 200) {
      handleApiStatus(true);
    } else {
      handleApiStatus(false);
    }
  } catch (error) {
    console.error("Error validating verification link:", error);
    handleApiStatus(false);
  } finally {
    setLoading(false);
  }
};
