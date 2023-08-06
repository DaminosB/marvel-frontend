import "./BookmarksPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentFetcher from "../../components/ContentFetcher/ContentFetcher";

const BookmarksPage = ({
  token,
  setShowItemOnDisplay,
  type,
  setType,
  setIdOnDisplay,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });
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
