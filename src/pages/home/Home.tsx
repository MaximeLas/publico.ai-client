import "./Home.css";
import Dividers from "./Dividers";
import FirstSlide from "./FirstSlide";
import FourthSlide from "./FourthSlide";
import SecondSlide from "./SecondSlide";
import ThirdSlide from "./ThirdSlide";

const Home = () => {
  return (
    <div className="my-home">
      <FirstSlide />
      <Dividers />
      <SecondSlide />
      <Dividers />
      <ThirdSlide />
      <Dividers />
      <FourthSlide />
    </div>
  );
};

export default Home;
