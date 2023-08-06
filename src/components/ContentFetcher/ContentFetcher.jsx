import "./ContentFetcher.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Filter from "../Filter/Filter";
import ResultsArray from "../ResultsArray/ResultsArray";

const ContentFetcher = ({
  type,
  setType,
  setShowItemOnDisplay,
  setIdOnDisplay,
  token,
}) => {
  const [searchBar, setSearchBar] = useState("");

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);

  const location = useLocation();

  useEffect(() => {
    try {
      const fetchData = async () => {
        setIsLoading(true);

        if (location.pathname === "/") {
          const { data } = await axios.get(
            `https://site--marvel-backend--kc7q9tc45mqv.code.run/${type}s?page=${page}&name=${searchBar}`
            // `http://localhost:3000/${type}?page=${page}&name=${searchBar}`
          );
          const dataToDisplay = data.message.results;
          setData(dataToDisplay);
        } else if (location.pathname === "/user/bookmarks") {
          const { data } = await axios.get(
            `https://site--marvel-backend--kc7q9tc45mqv.code.run/user/bookmarks/${type}`,
            // `http://localhost:3000/user/bookmarks/${type}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setData(data.message);
        }
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      setIsLoading(false);
      console.log(error.response);
    }
  }, [type, searchBar, page]);

  return (
    <main className="container">
      <Filter searchBar={searchBar} setSearchBar={setSearchBar} type={type} />
      <div className="titles">
        <h2
          className={type === "character" ? "active" : "inactive"}
          onClick={() => {
            setType("character");
          }}
        >
          Characters
        </h2>
        <h2
          className={type === "comic" ? "active" : "inactive"}
          onClick={() => {
            setType("comic");
          }}
        >
          Comics
        </h2>
      </div>
      <ResultsArray
        results={data}
        type={type}
        isLoading={isLoading}
        setShowItemOnDisplay={setShowItemOnDisplay}
        setIdOnDisplay={setIdOnDisplay}
      />
    </main>
  );
};

export default ContentFetcher;
