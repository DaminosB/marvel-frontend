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
  setPage,
  results,
  isLoading,
  type,
  setShowItemOnDisplay,
  setIdOnDisplay,
  bookmarks,
  token,
}) => {
  const [tempPage, setTempPage] = useState(page);
  const [numberOfPages, setNumberOfPages] = useState(1);

  const handleGoFirstPage = () => {
    setPage(1);
    setTempPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setTempPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (page < numberOfPages) {
      setPage(page + 1);
      setTempPage(page + 1);
    }
  };

  const handleGoLastPage = () => {
    setPage(numberOfPages);
    setTempPage(numberOfPages);
  };

  useEffect(() => {
    setNumberOfPages(Math.floor(count / 100) + 1);
    setTempPage(page);
  }, [results, numberOfPages]);

  return isLoading ? (
    <p>Chargement</p>
  ) : (
    <>
      <div className="navigation">
        <span>
          Page {page} of {numberOfPages} ({count} results)
        </span>
        <nav>
          <FontAwesomeIcon icon={faAnglesLeft} onClick={handleGoFirstPage} />
          <FontAwesomeIcon icon={faChevronLeft} onClick={handlePreviousPage} />
          <input
            type="number"
            value={tempPage}
            onChange={(event) => setTempPage(event.target.value)}
            min="1"
            max={numberOfPages}
            onBlur={() => setPage(tempPage)}
          />
          <FontAwesomeIcon icon={faChevronRight} onClick={handleNextPage} />
          <FontAwesomeIcon icon={faAnglesRight} onClick={handleGoLastPage} />
        </nav>
      </div>
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
      <div className="navigation">
        <span>
          Page {page} of {numberOfPages} ({count} results)
        </span>
        <nav>
          <FontAwesomeIcon icon={faAnglesLeft} onClick={handleGoFirstPage} />
          <FontAwesomeIcon icon={faChevronLeft} onClick={handlePreviousPage} />
          <input
            type="number"
            value={tempPage}
            onChange={(event) => setTempPage(event.target.value)}
            min="1"
            max={numberOfPages}
            onBlur={() => setPage(tempPage)}
          />
          <FontAwesomeIcon icon={faChevronRight} onClick={handleNextPage} />
          <FontAwesomeIcon icon={faAnglesRight} onClick={handleGoLastPage} />
        </nav>
      </div>
    </>
  );
};

export default ResultsArray;
