import "./Home.css";
import Divider from "./Divider";
import FirstSlide from "./FirstSlide";
import FourthSlide from "./FourthSlide";
import SecondSlide from "./SecondSlide";
import ThirdSlide from "./ThirdSlide";

const Home = () => {
  return (
    <div className="my-home">
      <FirstSlide />
      <Divider />
      <SecondSlide />
      <Divider />
      <ThirdSlide />
      <Divider />
      <FourthSlide />
    </div>
  );
};

export default Home;
