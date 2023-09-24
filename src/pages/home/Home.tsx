import "./Home.css";
import Divider from "./Divider";
import FirstSlide from "./FirstSlide";
import FourthSlide from "./FourthSlide";
import SecondSlide from "./SecondSlide";
import ThirdSlide from "./ThirdSlide";

const Home: React.FC = () => {
  return (
    <>
      <FirstSlide />
      <Divider />
      <SecondSlide />
      <Divider />
      <ThirdSlide />
      <Divider />
      <FourthSlide />
    </>
  );
};

export default Home;
