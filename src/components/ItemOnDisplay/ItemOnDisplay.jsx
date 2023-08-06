import "./ItemOnDisplay.css";
import { useEffect, useState } from "react";
import axios from "axios";
import RelatedItems from "../RelatedItems/RelatedItems";
import BookmarkIcon from "../BookmarkIcon/BookmarkIcon";

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
          `https://site--marvel-backend--kc7q9tc45mqv.code.run/${type}/${idOnDisplay}`
          //   `http://localhost:3000/${type}/${idOnDisplay}`
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

  // console.log(dataOnDisplay);

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
        X
      </button>
      <div className="container">
        {activeCharacter && activeComic && (
          <div className="titles">
            <h2
              onClick={() => {
                setType("character");
                setIdOnDisplay(activeCharacter);
              }}
            >
              Characters
            </h2>
            <h2
              onClick={() => {
                setType("comic");
                setIdOnDisplay(activeComic);
              }}
            >
              Comics
            </h2>
          </div>
        )}
        <h3>{itemTitle}</h3>
        <img
          src={`${dataOnDisplay.thumbnail.path}/portrait_uncanny.${dataOnDisplay.thumbnail.extension}`}
          alt={`Picture of ${itemTitle}`}
        />
        {dataOnDisplay.description && <p>{dataOnDisplay.description}</p>}
        <h4>Appearances</h4>
        {dataOnDisplay.comics && (
          <RelatedItems
            token={token}
            type={type}
            itemID={dataOnDisplay._id}
            characterId={dataOnDisplay._id}
            setIdOnDisplay={setIdOnDisplay}
            setType={setType}
          />
        )}
      </div>
    </div>
  );
};

export default ItemOnDisplay;
