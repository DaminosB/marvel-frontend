import "./Loading.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div>
        <FontAwesomeIcon icon={faSpinner} spin />
        <span>Please wait</span>
      </div>
    </div>
  );
};

export default Loading;
