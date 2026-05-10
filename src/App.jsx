import { useState, useEffect } from "react";
import VideoUpload from "./VideoUpload";
import VideoPlayer from "./VideoPlayer";

const WORKER_URL = "https://video-streaming-worker.rsarw.workers.dev";

export default function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState("watch");

  const fetchVideos = async () => {
    try {
      const res = await fetch(`${WORKER_URL}/videos`);
      const data = await res.json();
      setVideos(data.videos || []);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    }
  };

  useEffect(() => { fetchVideos(); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ background: "#1a1a1a", padding: "16px 32px", display: "flex", alignItems: "center", gap: "24px", borderBottom: "1px solid #333" }}>
        <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>StreamVault</h1>
        <nav style={{ display: "flex", gap: "4px" }}>
          {["watch", "upload"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: activeTab === tab ? "#ff4500" : "transparent", color: activeTab === tab ? "#fff" : "#aaa", cursor: "pointer", fontSize: "14px", textTransform: "capitalize" }}>
              {tab}
            </button>
          ))}
        </nav>
      </header>
      <main style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
        {activeTab === "upload" && <VideoUpload workerUrl={WORKER_URL} onUploadComplete={() => { fetchVideos(); setActiveTab("watch"); }} />}
        {activeTab === "watch" && (
          <div>
            {selectedVideo ? (
              <div>
                <button onClick={() => setSelectedVideo(null)}
                  style={{ background: "none", border: "1px solid #444", color: "#aaa", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", marginBottom: "16px" }}>
                  ← Back
                </button>
                <VideoPlayer manifestUrl={selectedVideo.manifestUrl} title={selectedVideo.title} />
              </div>
            ) : (
              <div>
                <h2 style={{ fontSize: "18px", marginBottom: "24px" }}>Video Library</h2>
                {videos.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "80px", color: "#555" }}>
                    <p>No videos yet.</p>
                    <button onClick={() => setActiveTab("upload")}
                      style={{ marginTop: "16px", padding: "12px 24px", background: "#ff4500", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                      Upload Video
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                    {videos.map((video) => (
                      <div key={video.id} onClick={() => setSelectedVideo(video)}
                        style={{ background: "#1a1a1a", borderRadius: "12px", overflow: "hidden", cursor: "pointer", border: "1px solid #2a2a2a" }}>
                        <div style={{ background: "#2a2a2a", height: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: "40px", opacity: 0.3 }}>▶</span>
                        </div>
                        <div style={{ padding: "12px 16px" }}>
                          <p style={{ margin: 0, fontSize: "14px", fontWeight: 500 }}>{video.title}</p>
                          <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#666" }}>DASH · 480p / 720p</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}