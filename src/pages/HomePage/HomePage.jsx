import "./HomePage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../../components/Filter/Filter";
import ResultsArray from "../../components/ResultsArray/ResultsArray";
import ContentFetcher from "../../components/ContentFetcher/ContentFetcher";

const HomePage = ({ setShowItemOnDisplay, type, setType, setIdOnDisplay }) => {
  return (
    <ContentFetcher
      type={type}
      setType={setType}
      setShowItemOnDisplay={setShowItemOnDisplay}
      setIdOnDisplay={setIdOnDisplay}
    />
  );
};

export default HomePage;
