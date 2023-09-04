import "./Home.css";
import FirstSlide from "./FirstSlide";
import SecondSlide from "./SecondSlide";
import ThirdSlide from "./ThirdSlide";
import FourthSlide from "./FourthSlide";

const Home = () => {
  return (
    <div className="my-home">
      <FirstSlide />
      <SecondSlide />
      <ThirdSlide />
      <FourthSlide />
    </div>
  );
};

export default Home;
