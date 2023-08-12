import "./Thumbnail.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BookmarkIcon from "../BookmarkIcon/BookmarkIcon";
import Loading from "../Loading/Loading";

const Thumbnail = ({
  format,
  image,
  text,
  theme,
  bookmarks,
  id,
  type,
  token,
}) => {
  const [thumbnailText, setThumbnailText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const imageURL = `${image.path}/${format}.${image.extension}`;

  const location = useLocation();

  const handleAddBookmark = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `https://site--marvel-backend--kc7q9tc45mqv.code.run/user/add-bookmark/${type}/${id}`,
        // `http://localhost:3000/user/add-bookmark/${type}/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseMessage(data.message);
      setTimeout(() => {
        setIsBookmarked(true);
        setResponseMessage("");
      }, 2500);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRemoveBookmark = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(
        `https://site--marvel-backend--kc7q9tc45mqv.code.run/user/remove-bookmark/${type}/${id}`,
        // `http://localhost:3000/user/remove-bookmark/${type}/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseMessage(data.message);
      setTimeout(() => {
        setIsBookmarked(false);
        setResponseMessage("");
      }, 2500);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (bookmarks) {
      const bookmarkIndex = bookmarks.findIndex(
        (bookmarkID) => bookmarkID === id
      );
      if (bookmarkIndex !== -1) {
        setIsBookmarked(true);
      }
    }

    if (!text) {
      setThumbnailText("Description unavailable");
    }
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="thumbnail">
      <img src={imageURL} />

      {token && (
        <BookmarkIcon
          isBookmarked={isBookmarked}
          theme={theme}
          handleAddBookmark={handleAddBookmark}
          handleRemoveBookmark={handleRemoveBookmark}
        />
      )}
      <div className={`thumbnail-text ${theme}`}>
        <p>{thumbnailText}</p>
      </div>
      {responseMessage && (
        <div
          className="thumbnail-infos"
          onClick={(event) => event.stopPropagation()}
        >
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
