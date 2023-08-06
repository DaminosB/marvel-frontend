import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import Connexion from "./components/Connexion/Connexion";
import ItemOnDisplay from "./components/ItemOnDisplay/ItemOnDisplay";
import BookmarksPage from "./pages/BookmarksPage/BookmarksPage";

function App() {
  const [token, setToken] = useState(Cookies.get("token"));

  const [showConnexion, setShowConnexion] = useState(false);
  const [showItemOnDisplay, setShowItemOnDisplay] = useState(false);

  const [type, setType] = useState("character");
  const [idOnDisplay, setIdOnDisplay] = useState("");

  useEffect(() => {
    token && Cookies.set("token", token);
  }, [token]);
  return (
    <>
      <Router>
        <Header
          token={token}
          setToken={setToken}
          setShowConnexion={setShowConnexion}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                setShowItemOnDisplay={setShowItemOnDisplay}
                type={type}
                setType={setType}
                setIdOnDisplay={setIdOnDisplay}
              />
            }
          ></Route>
          <Route
            path="/user/bookmarks"
            element={
              <BookmarksPage
                token={token}
                setShowItemOnDisplay={setShowItemOnDisplay}
                type={type}
                setType={setType}
                setIdOnDisplay={setIdOnDisplay}
              />
            }
          ></Route>
        </Routes>
        {showConnexion && (
          <Connexion setToken={setToken} setShowConnexion={setShowConnexion} />
        )}
        {showItemOnDisplay && (
          <ItemOnDisplay
            setToken={setToken}
            setShowItemOnDisplay={setShowItemOnDisplay}
            type={type}
            setType={setType}
            idOnDisplay={idOnDisplay}
            setIdOnDisplay={setIdOnDisplay}
          />
        )}
      </Router>
    </>
  );
}

export default App;
