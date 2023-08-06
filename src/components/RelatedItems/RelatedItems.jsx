import "./RelatedItems.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Thumbnail from "../Thumbnail/Thumbnail";

const RelatedItems = ({
  token,
  itemID,
  characterId,
  setIdOnDisplay,
  type,
  setType,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [relatedData, setRelatedData] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://site--marvel-backend--kc7q9tc45mqv.code.run/comics/${characterId}`,
          //   `http://localhost:3000/comics/${characterId}`,
          { headers: { authorization: `Bearer ${token}` } }
        );
        setRelatedData(data.message.comics);
        setBookmarks(data.message.bookmarks);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div className="related-items">
      {relatedData.map((item) => {
        return (
          <div
            key={item._id}
            onClick={() => {
              setIdOnDisplay(item._id);
              setType("comic");
            }}
          >
            <h4>{item.title}</h4>
            <Thumbnail
              type="comic"
              bookmarks={bookmarks}
              id={item._id}
              format="standard_xlarge"
              image={item.thumbnail}
              text={item.description}
              theme={"red-theme"}
              token={token}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RelatedItems;
