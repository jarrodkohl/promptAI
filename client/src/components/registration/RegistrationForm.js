import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";
import { GoogleLogin } from 'react-google-login'

const RegistrationForm = ({ user }) => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    validateInput(userPayload);
    try {
      if (Object.keys(errors).length === 0) {
        const response = await fetch("/api/v1/users", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        console.log(response)
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const userData = await response.json();
        console.log(userData)
        setShouldRedirect(true);
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onGoogleSignInSuccess = (response) => {
    console.log(response);
    const { email, givenName, familyName, googleId } = response.profileObj;
    const id_token = response.tokenId;
    const userData = {
      id_token,
      email,
      givenName: givenName,
      familyName: familyName,
      googleId: googleId,
    };
    fetch('/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(response => {
      // Handle the response from your server
      // If authentication is successful, redirect the user to your app
      // If not, display an error message and let the user try again
    }).catch(error => {
      console.error('Error authenticating with Google', error);
    });
  }

  const onGoogleSignInFailure = (error) => {
    console.error('Error authenticating with Google', error);
  }

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="grid-container">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
        <div>
          <GoogleLogin
            clientId={user?.clientId}
            onSuccess={onGoogleSignInSuccess}
            onFailure={onGoogleSignInFailure}
            cookiePolicy={"single_host_origin"}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                Sign In with Google
              </button>
            )}
          />
        </div>
      </form>
    </div>
  );

};

export default RegistrationForm;
