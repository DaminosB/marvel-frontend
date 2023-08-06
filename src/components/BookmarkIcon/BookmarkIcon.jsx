import "./BookmarkIcon.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

const BookmarkIcon = ({
  isBookmarked,
  theme,
  handleAddBookmark,
  handleRemoveBookmark,
}) => {
  return isBookmarked ? (
    <button>
      <FontAwesomeIcon
        icon={solidHeart}
        className={`bookmark ${theme}`}
        onClick={(event) => {
          event.stopPropagation();
          handleRemoveBookmark();
        }}
      />
    </button>
  ) : (
    <button>
      <FontAwesomeIcon
        icon={regularHeart}
        className={`bookmark ${theme}`}
        onClick={(event) => {
          event.stopPropagation();
          handleAddBookmark();
        }}
      />
    </button>
  );
};

export default BookmarkIcon;
