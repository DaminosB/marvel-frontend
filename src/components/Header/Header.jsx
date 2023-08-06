import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../assets/img/logo.png";
const Header = ({ token, setToken, setShowConnexion }) => {
  const navigate = useNavigate();
  return (
    <header className="container">
      <img src={logo} alt="logo Marvel" />
      <div>
        <Link to="/">
          <h1>MARVEL.database</h1>
        </Link>
      </div>
      {token ? (
        <div>
          <button
            onClick={() => {
              navigate("/user/bookmarks");
            }}
          >
            Bookmarks
          </button>
          <button
            onClick={() => {
              setToken("");
              Cookies.remove("token");
              navigate();
            }}
          >
            Log out
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setShowConnexion(true);
            }}
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
