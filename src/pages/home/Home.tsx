import "./Home.css";
import FirstImpression from "./FirstImpression";
import TheProblem from "./TheProblem";
import OurSolution from "./OurSolution";
import OurMission from "./OurMission";
import OurTeam from "./OurTeam";
import Questions from "./Questions";

const Home = () => {
  return (
    <body className="my-home">
      <FirstImpression />
      <TheProblem />
      <OurSolution />
      <OurMission />
      <OurTeam />
      <Questions />
    </body>
  );
};

export default Home;
