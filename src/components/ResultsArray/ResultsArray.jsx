import "./ResultsArray.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Thumbnail from "../Thumbnail/Thumbnail";

const ResultsArray = ({
  count,
  page,
  results,
  isLoading,
  type,
  setShowItemOnDisplay,
  setIdOnDisplay,
  bookmarks,
  token,
  numberOfPages,
}) => {
  return isLoading ? (
    <p>Chargement</p>
  ) : (
    <>
      <section className="results-array">
        {results.map((result, index) => {
          let thumbnailTitle = "";
          let thumbnailTheme = "";
          if (type === "character") {
            thumbnailTitle = result.name;
            thumbnailTheme = "blue-theme";
          } else if (type === "comic") {
            thumbnailTitle = result.title;
            thumbnailTheme = "red-theme";
          }

          return (
            <div
              key={result._id}
              onClick={() => {
                setShowItemOnDisplay(true);
                setIdOnDisplay(result._id);
              }}
            >
              <h3>{thumbnailTitle}</h3>
              <Thumbnail
                id={result._id}
                format="portrait_xlarge"
                image={result.thumbnail}
                text={result.description}
                theme={thumbnailTheme}
                bookmarks={bookmarks}
                type={type}
                token={token}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default ResultsArray;
