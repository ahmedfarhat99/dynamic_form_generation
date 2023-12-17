import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Participants from "./pages/Participants";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
