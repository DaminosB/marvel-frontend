import "./Nav.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Nav = ({
  setPage,
  tempPage,
  setTempPage,
  count,
  page,
  numberOfPages,
}) => {
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

  const handleOnBlur = (event) => {
    if (!event.target.value) {
      console.log("ici");
      setPage(1);
      setTempPage(1);
    } else if (event.target.value <= numberOfPages) {
      setPage(tempPage);
    } else if (event.target.value > numberOfPages) {
      setPage(numberOfPages);
      setTempPage(numberOfPages);
    }
  };

  const handleOnKeyDown = (event) => {
    if (event.key === "Enter") {
      if (!event.target.value) {
        setPage(1);
        setTempPage(1);
      } else if (event.target.value <= numberOfPages) {
        setPage(event.target.value);
      } else if (event.target.value > numberOfPages) {
        setTempPage(numberOfPages);
        setPage(numberOfPages);
      }
    } else {
      setTempPage(event.target.value);
    }
  };

  return (
    <div className="navigation">
      <span>
        Page {page} of {numberOfPages} ({count} results)
      </span>
      <nav>
        <FontAwesomeIcon
          icon={faAnglesLeft}
          onClick={handleGoFirstPage}
          className={page === 1 ? "inactive" : ""}
        />
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={handlePreviousPage}
          className={page === 1 ? "inactive" : ""}
        />
        <input
          id="pagenumber"
          type="number"
          value={tempPage}
          onChange={(event) => setTempPage(event.target.value)}
          onBlur={(event) => handleOnBlur(event)}
          onKeyDown={(event) => handleOnKeyDown(event)}
        />
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={handleNextPage}
          className={page === numberOfPages ? "inactive" : ""}
        />
        <FontAwesomeIcon
          icon={faAnglesRight}
          onClick={handleGoLastPage}
          className={page === numberOfPages ? "inactive" : ""}
        />
      </nav>
    </div>
  );
};

export default Nav;
