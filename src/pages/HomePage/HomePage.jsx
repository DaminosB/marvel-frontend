import "./HomePage.css";
import ContentFetcher from "../../components/ContentFetcher/ContentFetcher";

const HomePage = ({
  setShowItemOnDisplay,
  type,
  setType,
  setIdOnDisplay,
  token,
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

export default HomePage;
