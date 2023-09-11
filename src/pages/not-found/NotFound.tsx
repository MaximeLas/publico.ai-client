import { useEffect, useState } from "react";
import "./NotFound.css";

const NotFound = () => {
  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setImgUrl(res.message);
        }
      });
  }, []);

  return (
    <div className="not-found-container">
      <h1 className="big-text">Whoops, this page doesn't exist!</h1>
      <br />
      {!!imgUrl && <img className="dog-pic" src={imgUrl} alt="Happy dog" />}
      <br />
      <br />
      {!!imgUrl && <p>Enjoy this picture of a dog.</p>}
    </div>
  );
};

export default NotFound;
