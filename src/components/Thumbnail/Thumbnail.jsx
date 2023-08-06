import "./Thumbnail.css";

const Thumbnail = ({ format, image, text, theme }) => {
  const imageURL = `${image.path}/${format}.${image.extension}`;

  if (!text) {
    text = "Description unavailable";
  }

  return (
    <div className="thumbnail">
      <img src={imageURL} />
      <div className={`thumbnail-text ${theme}`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Thumbnail;
