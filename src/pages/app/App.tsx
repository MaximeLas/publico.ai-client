import "./App.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Home from "../home/Home";

function App() {
  return (
    <div className="page-container">
      <Header />

      {/* Important: Every non-Header non-Footer class must get 4rem padding-bottom added.
      For details, go to App.css .page-container */}
      <Home />

      <Footer />
    </div>
  );
}

export default App;
