import "./BookmarksPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ResultsArray from "../../components/ResultsArray/ResultsArray";
import ContentFetcher from "../../components/ContentFetcher/ContentFetcher";

const BookmarksPage = ({
  token,
  setShowItemOnDisplay,
  type,
  setType,
  setIdOnDisplay,
}) => {
  return (
    <ContentFetcher
      token={token}
      type={type}
      setType={setType}
      setShowItemOnDisplay={setShowItemOnDisplay}
      setIdOnDisplay={setIdOnDisplay}
    />
  );
};

export default BookmarksPage;
