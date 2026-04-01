import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";
import "./Upload.css";

const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function Upload() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("notes");
  const [fileSize, setFileSize] = useState("");

  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // ✅ NEW: store files from Supabase
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  // ✅ NEW: fetch files from Supabase
  async function fetchFiles() {
    const { data, error } = await supabase
      .storage
      .from("student-file")
      .list("", { limit: 100 });

    if (error) {
      console.error(error);
    } else {
      setFiles(data);
    }
  }

  const handleFile = (selected) => {
    if (!selected) return;

    setErrorMsg("");

    if (selected.size > MAX_SIZE_BYTES) {
      setErrorMsg(
        `File too large (${(selected.size / 1024 / 1024).toFixed(1)} MB). Max: ${MAX_SIZE_MB} MB`
      );
      return;
    }

    setFile(selected);
    setFileSize((selected.size / 1024 / 1024).toFixed(2));
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !subject) {
      alert("Please fill required fields");
      return;
    }

    setUploading(true);
    setUploadDone(false);
    setErrorMsg("");

    try {
      const filePath = `${category}/${Date.now()}_${file.name}`;

      const { error } = await supabase.storage
        .from("student-file")
        .upload(filePath, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from("student-file")
        .getPublicUrl(filePath);

      const downloadURL = data.publicUrl;

      await saveMetadata(file, downloadURL);

      setUploadDone(true);

      // ✅ NEW: refresh file list after upload
      fetchFiles();

    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const saveMetadata = async (uploadedFile, downloadURL) => {
    const newFile = {
      name: uploadedFile.name,
      title,
      subject,
      desc,
      category,
      downloadURL,
      fileType: uploadedFile.type,
      uploadedAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("files")) || [];
    localStorage.setItem("files", JSON.stringify([...existing, newFile]));

    await supabase.from("files").insert([
      {
        name: uploadedFile.name,
        title,
        subject,
        desc,
        category,
        download_url: downloadURL,
        file_type: uploadedFile.type,
        uploaded_at: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="upload-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>

      <h1>📤 Upload Resource</h1>

      <div className="upload-box">

        <div
          className={`drop-zone ${dragActive ? "active" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input type="file" onChange={handleChange} hidden id="fileInput" />

          <label htmlFor="fileInput">
            {file ? (
              <p>📄 {file.name}</p>
            ) : (
              <p>📂 Drag & Drop file here or click to upload</p>
            )}
          </label>
        </div>

        {fileSize && (
          <p className="file-size-info">
            📦 Size: <strong>{fileSize} MB</strong>
          </p>
        )}

        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
        <textarea placeholder="Description" onChange={(e) => setDesc(e.target.value)}></textarea>

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="notes">Notes</option>
          <option value="ppt">PPT</option>
          <option value="capstone">Capstone</option>
        </select>

        {errorMsg && <div className="error-box">{errorMsg}</div>}

        {uploadDone && (
          <div className="success-msg">
            ✅ File uploaded successfully!
          </div>
        )}

        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "⚡ Upload"}
        </button>
      </div>

      {/* ✅ NEW: Show uploaded files */}
      <div style={{ marginTop: "30px" }}>
        <h2>📁 Uploaded Files</h2>

        {files.length === 0 ? (
          <p>No files found</p>
        ) : (
          files.map((file) => {
            const { data } = supabase
              .storage
              .from("student-file")
              .getPublicUrl(file.name);

            return (
              <div key={file.name}>
                <a href={data.publicUrl} target="_blank" rel="noreferrer">
                  {file.name}
                </a>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}