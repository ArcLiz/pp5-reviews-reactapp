import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const {username, password1, password2} = signUpData;

  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={username} onChange={handleChange} />
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password1" value={password1} onChange={handleChange} />
        {errors.password1 && <span>{errors.password1}</span>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" name="password2" value={password2} onChange={handleChange} />
        {errors.password2 && <span>{errors.password2}</span>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
