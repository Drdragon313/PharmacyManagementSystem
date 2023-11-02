import React from "react";
import bg from "../../Assets/bgSignin.png";
import "./SignUp.css";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="signupContainer">
      <div className="signupLogoContainer">
        <img className="signupPowerdby" src={bg} alt="31 Green Logo" />
      </div>
      <div className="signupFieldsContainer">
        <div className="signinFields">
          <h4>Create Account</h4>
          <p className="signinText">
            Access the Unified API with Embedded Free account.
          </p>
          <form>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label
                    htmlFor="first-name"
                    class="form-label signinBoldLabel"
                  >
                    First Name
                  </label>
                </div>

                <input
                  id="first-name"
                  type="text"
                  class="form-control"
                  aria-label="First name"
                />
              </div>

              <div class="col">
                <div class="mb-3">
                  <label htmlFor="last-name" class="form-label signinBoldLabel">
                    Last Name
                  </label>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Last name"
                />
              </div>
            </div>
            <div class="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                class="form-label signinBoldLabel"
              >
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required={true}
              />
            </div>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label
                    htmlFor="first-name"
                    class="form-label signinBoldLabel"
                  >
                    Company Name
                  </label>
                </div>

                <input
                  id="first-name"
                  type="text"
                  class="form-control"
                  aria-label="Company Name"
                />
              </div>

              <div class="col">
                <div class="mb-3">
                  <label htmlFor="last-name" class="form-label signinBoldLabel">
                    Company Website
                  </label>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Company Password"
                />
              </div>
            </div>
            <div class="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                class="form-label signinBoldLabel"
              >
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                required={true}
              ></input>
            </div>
            <div>
              <Link className="signinForget">Forget Password?</Link>
            </div>
            <button type="submit" class="btn my-3 signinbtn">
              Create Account
            </button>
            <div className="my-2 siginTerms">
              By signing up you agree to our <Link>Terms of Service</Link> and{" "}
              <Link> Privacy Policy.</Link>
            </div>
          </form>

          <div>
            <p className="signinFooter">
              Already have an account?{" "}
              <Link className="signinRegisterNow">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
