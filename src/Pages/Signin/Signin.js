import React from "react";
import signinlogo from "../../Components/Images/SigninLogo.svg";
import "./Signin.css";
import { Link } from "react-router-dom";
//This file is new
//I published this branch but it showed all the files as new files so i had to delete the branch and commit again so that
//only changed files could be shown
const Signin = () => {
  return (
    <div className="siginContainer">
      <div className="signinLogoContainer">
        <img className="sigininPowerdby" src={signinlogo} alt="Logo"></img>
      </div>
      <div className="siginFieldsContainer">
        <div className="signinFields">
          <h5>Welcome Back!</h5>
          <p className="signinText">Lets get you signed in...</p>
          <form>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label signinBoldLabel"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required={true}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label signinBoldLabel"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                required={true}
              ></input>
            </div>
            <div>
              <Link className="signinForget">Forget Password?</Link>
            </div>
            <button type="submit" className="btn my-3 signinbtn">
              Log In
            </button>
          </form>
          <div className="my-2 siginTerms"></div>
          <div>
            <p className="signinFooter">
              Don't Have an account?
              <Link className="signinRegisterNow">Register Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
