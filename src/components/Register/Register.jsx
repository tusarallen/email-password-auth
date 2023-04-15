import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    // 1.prevent page refresh
    event.preventDefault();
    setSuccess("");
    setError("");
    // 2.collect from data
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    // validate(RegX)
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("please add at least one uppercase");
      return;
    } else if (!/^(?=.*[0-9].*[0-9])/.test(password)) {
      setError("please add at least two numbers");
      return;
    } else if (password.length < 6) {
      setError("please add at least 6 characters in your password");
      return;
    }

    // 3.create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        event.target.reset();
        setSuccess("user has been created successfully");
        sendVerificationEmail(result.user);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const sendVerificationEmail = (user) => {
    sendEmailVerification(user).then((result) => {
      console.log(result);
      alert("please verify your email address");
    });
  };

  const handleImageChange = (event) => {
    // console.log(event.target.value);
    // setEmail(event.target.value);
  };

  const handlePasswordBlur = (event) => {
    // console.log(event.target.value);
  };

  return (
    <div className="w-50 mx-auto">
      <h4>Please Register</h4>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleImageChange}
          className="w-50 mb-4 rounded ps-2"
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
          required
        />
        <br />
        <input
          onBlur={handlePasswordBlur}
          className="w-50 mb-4 rounded ps-2"
          type="password"
          name="password"
          id="password"
          placeholder="Your Password"
          required
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
      <p>
        <small>
          Already have an account ? Please
          <Link to="/login">Login</Link>
        </small>
      </p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Register;
