import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Form, Button, Alert} from "react-bootstrap";
import axios from "axios";
import {useSetCurrentUser} from "../../contexts/CurrentUserContext";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const {username, password} = signInData;
  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post("/dj-rest-auth/login/", signInData);
      await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" value={username} onChange={handleChange} placeholder="Enter username" />
        {errors.username && (
          <Alert variant="danger" className="mt-1">
            {errors.username.map((error, idx) => (
              <div key={idx}>{error}</div>
            ))}
          </Alert>
        )}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
        {errors.password && (
          <Alert variant="danger" className="mt-1">
            {errors.password.map((error, idx) => (
              <div key={idx}>{error}</div>
            ))}
          </Alert>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign In
      </Button>

      {errors.non_field_errors && (
        <Alert variant="warning" className="mt-3">
          {errors.non_field_errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </Alert>
      )}
    </Form>
  );
};

export default SignInForm;
