import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>

      <nav className="navbar">
        <h2>⚡ Student Resources</h2>
        <div>
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/upload")}>Upload</span>
        </div>
      </nav>

      <div className="hero">
        <h1>Student Resource Platform</h1>
        <p>Share & explore study materials</p>

        <input placeholder="Search notes, PPTs..." />

        <button onClick={() => navigate("/upload")}>
          Upload Now
        </button>
      </div>

      <div className="categories">

        <div className="card" onClick={() => navigate("/upload")}>📤 Upload</div>
        <div className="card" onClick={() => navigate("/browse")}>📂 Notes</div>
        <div className="card" onClick={() => navigate("/myfiles")}>📁 My Files</div>
        <div className="card" onClick={() => navigate("/ppt")}>📊 PPT</div>
        <div className="card" onClick={() => navigate("/capstone")}>📑 Capstone</div>

      </div>

      <footer>© 2026 Student Platform</footer>

    </div>
  );
}