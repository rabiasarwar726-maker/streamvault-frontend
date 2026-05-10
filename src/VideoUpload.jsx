import { useState } from "react";

const WORKER_URL = "https://video-streaming-worker.rsarw.workers.dev";

export default function VideoUpload({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      setStatus("Uploading to R2...");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);

      const res = await fetch(`${WORKER_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const { key } = await res.json();

      setStatus("Transcoding to 480p + 720p DASH... takes 1-3 minutes.");
      await fetch(`${WORKER_URL}/trigger-transcode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      setTimeout(() => {
        setUploading(false);
        onUploadComplete();
      }, 90000);

    } catch (err) {
      setStatus("Error: " + err.message);
      setUploading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Upload a Video</h2>
      <div
        onClick={() => !uploading && document.getElementById("fileInput").click()}
        style={{
          border: "2px dashed #ff4500", borderRadius: "12px",
          padding: "60px", cursor: uploading ? "default" : "pointer",
          marginBottom: "20px"
        }}
      >
        {file ? <><p>{file.name}</p><p>{(file.size / 1024 / 1024).toFixed(1)} MB</p></> : <p>Click to select MP4 video</p>}
      </div>
      <input id="fileInput" type="file" accept="video/mp4" style={{ display: "none" }}
        onChange={e => setFile(e.target.files[0])} />
      {file && !uploading && (
        <button onClick={handleUpload} style={{
          background: "#ff4500", color: "white", border: "none",
          padding: "12px 32px", borderRadius: "8px", fontSize: "16px", cursor: "pointer"
        }}>
          Upload & Transcode
        </button>
      )}
      {status && (
        <div style={{ marginTop: "20px", padding: "16px", background: "#1a1a1a", borderRadius: "8px" }}>
          {status}
        </div>
      )}
    </div>
  );
}