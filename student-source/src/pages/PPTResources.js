import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Page.css";

export default function PPTResources() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("files")) || [];
    setFiles(data.filter((f) => f.category === "ppt"));
  }, []);

  const handleDownload = (file) => {
    if (!file.fileData) return alert("File data not available for download.");
    const a = document.createElement("a");
    a.href = file.fileData;
    a.download = file.name;
    a.click();
  };

  const handleSaveToMyFiles = (file) => {
    const saved = JSON.parse(localStorage.getItem("savedFiles")) || [];
    const alreadySaved = saved.find((f) => f.name === file.name && f.category === file.category);
    if (alreadySaved) return alert("Already saved to My Files!");
    localStorage.setItem("savedFiles", JSON.stringify([...saved, file]));
    alert("Saved to My Files!");
  };

  return (
    <div className="page">

      {/* 🔙 Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>

      <h1>📊 PPT Resources</h1>

      <div className="grid">
        {files.length === 0 ? (
          <p>No PPT uploaded</p>
        ) : (
          files.map((file, index) => (
            <div className="item" key={index}>
              <div className="item-name">📊 {file.name}</div>
              {file.title && <div className="item-meta">{file.title}</div>}
              {file.subject && <div className="item-meta">📚 {file.subject}</div>}
              <div className="item-actions">
                <button className="save-btn" onClick={() => handleSaveToMyFiles(file)}>💾 Save</button>
                <button className="download-btn" onClick={() => handleDownload(file)}>⬇ Download</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}