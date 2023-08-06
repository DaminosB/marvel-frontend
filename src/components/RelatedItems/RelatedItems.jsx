import "./RelatedItems.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Thumbnail from "../Thumbnail/Thumbnail";

const RelatedItems = ({ itemsId, characterId, setIdOnDisplay, setType }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [relatedData, setRelatedData] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        console.log("wesh");
        setIsLoading(true);
        const { data } = await axios.get(
          `https://site--marvel-backend--kc7q9tc45mqv.code.run/comics/${characterId}`
          //   `http://localhost:3000/comics/${characterId}`
        );
        console.log(data);
        setRelatedData(data.message.comics);
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
      {relatedData.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setIdOnDisplay(item._id);
              setType("comic");
            }}
          >
            <h4>{item.title}</h4>
            <Thumbnail
              format="standard_xlarge"
              image={item.thumbnail}
              text={item.description}
              theme={"red-theme"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RelatedItems;
