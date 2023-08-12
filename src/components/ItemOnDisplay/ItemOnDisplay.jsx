import "./ItemOnDisplay.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import RelatedItems from "../RelatedItems/RelatedItems";

const ItemOnDisplay = ({
  token,
  setShowItemOnDisplay,
  type,
  setType,
  idOnDisplay,
  setIdOnDisplay,
}) => {
  const [dataOnDisplay, setDataOnDisplay] = useState({});
  const [theme, setTheme] = useState("");
  const [itemTitle, setItemTitle] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [activeCharacter, setActiveCharacter] = useState("");
  const [activeComic, setActiveComic] = useState("");

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get(
          `https://site--marvel-backend--kc7q9tc45mqv.code.run/${type}/${idOnDisplay}`,
          // `http://localhost:3000/${type}/${idOnDisplay}`,
          { headers: { authorization: `Bearer ${token}` } }
        );
        setDataOnDisplay(data.message);

        if (type === "character") {
          setTheme("blue-theme");
          setItemTitle(data.message.name);
          setActiveCharacter(data.message._id);
        } else if (type === "comic") {
          setTheme("red-theme");
          setItemTitle(data.message.title);
          setActiveComic(data.message._id);
        }

        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.response);
    }
  }, [idOnDisplay]);

  return isLoading ? (
    <p>isLoading</p>
  ) : (
    <div className={`display-wrapper ${theme}`}>
      <button
        onClick={() => {
          setShowItemOnDisplay(false);
          setActiveCharacter("");
          setActiveComic("");
        }}
      >
        <FontAwesomeIcon icon={faXmarkCircle} />
      </button>
      <div className="container">
        {activeCharacter && activeComic && (
          <div className="titles">
            <h2
              onClick={() => {
                setType("character");
                setIdOnDisplay(activeCharacter);
              }}
              className={type === "character" ? "active" : "inactive"}
            >
              Characters
            </h2>
            <h2
              onClick={() => {
                setType("comic");
                setIdOnDisplay(activeComic);
              }}
              className={type === "comic" ? "active" : "inactive"}
            >
              Comics
            </h2>
          </div>
        )}
        <h3>{itemTitle}</h3>
        <div className="item-infos">
          <img
            src={`${dataOnDisplay.thumbnail.path}/portrait_uncanny.${dataOnDisplay.thumbnail.extension}`}
            alt={`Picture of ${itemTitle}`}
          />
          {dataOnDisplay.description && <p>{dataOnDisplay.description}</p>}
        </div>
        {dataOnDisplay.comics && (
          <>
            <h4>Appearances</h4>
            <RelatedItems
              token={token}
              type={type}
              itemID={dataOnDisplay._id}
              characterId={dataOnDisplay._id}
              setIdOnDisplay={setIdOnDisplay}
              setType={setType}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ItemOnDisplay;
