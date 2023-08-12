import "./Connexion.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import Login from "./Login";
import Signup from "./Signup";

const Connexion = ({ setToken, setShowConnexion }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  const handleOnClick = () => {
    setShowConnexion(false);
  };

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setShowConnexion(false);
    }
  });

  return (
    <div className="modal-wrapper" onClick={handleOnClick}>
      <form
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          type="button"
          className="close-button"
          onClick={() => {
            setShowConnexion(false);
          }}
        >
          <FontAwesomeIcon icon={faRectangleXmark} />
        </button>
        <div className="titles">
          <h2
            className={showLogin ? "active" : "inactive"}
            onClick={() => {
              setShowLogin(true);
              setShowSignup(false);
            }}
          >
            Login
          </h2>
          <h2
            className={showSignup ? "active" : "inactive"}
            onClick={() => {
              setShowSignup(true);
              setShowLogin(false);
            }}
          >
            Signup
          </h2>
        </div>
        {showLogin && (
          <Login setToken={setToken} setShowConnexion={setShowConnexion} />
        )}
        {showSignup && (
          <Signup setToken={setToken} setShowConnexion={setShowConnexion} />
        )}
      </form>
    </div>
  );
};

export default Connexion;
