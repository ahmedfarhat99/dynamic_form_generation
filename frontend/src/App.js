import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Participants from "./pages/Participants";
import Participant from "./pages/Participant";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      <Router>
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/participants"
              element={
                <Participants loading={loading} setLoading={setLoading} />
              }
            />
            <Route
              path="/participants/:id"
              element={
                <Participant loading={loading} setLoading={setLoading} />
              }
            />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
