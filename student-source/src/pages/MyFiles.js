import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Page.css";

export default function MyFiles() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [savedFiles, setSavedFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("uploaded");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("files")) || [];
    setFiles(data);
    const saved = JSON.parse(localStorage.getItem("savedFiles")) || [];
    setSavedFiles(saved);
  }, []);

  // Delete from uploaded files
  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
    localStorage.setItem("files", JSON.stringify(updated));
    alert("File deleted successfully!");
  };

  // Delete from saved files
  const handleDeleteSaved = (index) => {
    if (!window.confirm("Remove this file from saved?")) return;
    const updated = [...savedFiles];
    updated.splice(index, 1);
    setSavedFiles(updated);
    localStorage.setItem("savedFiles", JSON.stringify(updated));
  };

  const handleDownload = (file) => {
    if (!file.fileData) return alert("File data not available for download.");
    const a = document.createElement("a");
    a.href = file.fileData;
    a.download = file.name;
    a.click();
  };

  return (
    <div className="page">

      {/* 🔙 Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>

      <h1>📁 My Files</h1>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "uploaded" ? "active" : ""}`}
          onClick={() => setActiveTab("uploaded")}
        >
          📤 Uploaded by Me
        </button>
        <button
          className={`tab-btn ${activeTab === "saved" ? "active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          💾 Saved Files
        </button>
      </div>

      {/* Uploaded Files Tab */}
      {activeTab === "uploaded" && (
        <div className="grid">
          {files.length === 0 ? (
            <p>No files uploaded</p>
          ) : (
            files.map((file, index) => (
              <div className="item" key={index}>
                <div className="item-name">📄 {file.name}</div>
                <div className="item-meta">🏷 {file.category}</div>
                {file.title && <div className="item-meta">{file.title}</div>}
                <div className="item-actions">
                  <button className="download-btn" onClick={() => handleDownload(file)}>⬇ Download</button>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>🗑 Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Saved Files Tab */}
      {activeTab === "saved" && (
        <div className="grid">
          {savedFiles.length === 0 ? (
            <p>No saved files</p>
          ) : (
            savedFiles.map((file, index) => (
              <div className="item" key={index}>
                <div className="item-name">📄 {file.name}</div>
                <div className="item-meta">🏷 {file.category}</div>
                {file.title && <div className="item-meta">{file.title}</div>}
                <div className="item-actions">
                  <button className="download-btn" onClick={() => handleDownload(file)}>⬇ Download</button>
                  <button className="delete-btn" onClick={() => handleDeleteSaved(index)}>✖ Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}