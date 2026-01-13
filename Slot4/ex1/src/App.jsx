import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Orchid from "./components/Orchid";
import About from "./components/About";
import Contact from "./components/Contact";
import { OrchidsData } from "./data/ListOfOrchidss";


function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Orchid orchidList={OrchidsData} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>


        </main>

        <Footer
          avatar="https://cdn2.fptshop.com.vn/unsafe/800x0/meme_cho_1_e568e5b1a5.jpg"
          name="Nguyen Cong Toan"
          email="toan20171020@gmail.com"
        />
      </div>
    </Router>
  );
}

export default App;
