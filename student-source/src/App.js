import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Browse from "./pages/Browse";
import MyFiles from "./pages/MyFiles";
import PPTResources from "./pages/PPTResources";
import CapstoneDocs from "./pages/CapstoneDocs";

// Optional global styles
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* 🏠 Home */}
        <Route path="/" element={<Home />} />

        {/* 📤 Upload Page */}
        <Route path="/upload" element={<Upload />} />

        {/* 📂 Browse Page */}
        <Route path="/browse" element={<Browse />} />

        {/* 📁 My Files */}
        <Route path="/myfiles" element={<MyFiles />} />

        {/* 📊 PPT Resources */}
        <Route path="/ppt" element={<PPTResources />} />

        {/* 📑 Capstone Docs */}
        <Route path="/capstone" element={<CapstoneDocs />} />

      </Routes>
    </Router>
  );
}

export default App;