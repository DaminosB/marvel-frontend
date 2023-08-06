import "./Connexion.css";
import { useState } from "react";
import axios from "axios";

const Signup = ({ setToken, setShowConnexion }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (value, func) => {
    func(value);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        // "https://site--marvel-backend--kc7q9tc45mqv.code.run/user/signup",
        "http://localhost:3000/user/signup",
        {
          email,
          password,
          username,
        }
      );
      console.log(data.connexion.token);
      setToken(data.connexion.token);
      setShowConnexion(false);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <label htmlFor="username">
        <input
          type="username"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(event) => {
            handleChange(event.target.value, setUsername);
          }}
        />
      </label>
      <label htmlFor="email">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            handleChange(event.target.value, setEmail);
          }}
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            handleChange(event.target.value, setPassword);
          }}
        />
      </label>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button
        className={isLoading ? "disabled" : ""}
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        disabled={isLoading}
      >
        {isLoading ? "Please wait" : "Signup"}
      </button>
    </>
  );
};

export default Signup;
