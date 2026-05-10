import { useEffect, useRef } from "react";
import * as dashjs from "dashjs";

export default function VideoPlayer({ manifestUrl, title }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current || !manifestUrl) return;
    const player = dashjs.MediaPlayer().create();
    playerRef.current = player;
    player.initialize(videoRef.current, manifestUrl, false);
    player.updateSettings({
      streaming: {
        abr: {
          autoSwitchBitrate: { video: true },
          initialBitrate: { video: 1400 },
          maxBitrate: { video: 2800 },
        },
      },
    });
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [manifestUrl]);

  return (
    <div>
      <h2 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "16px", color: "#fff" }}>{title}</h2>
      <div style={{ background: "#000", borderRadius: "12px", overflow: "hidden", maxWidth: "900px" }}>
        <video ref={videoRef} controls style={{ width: "100%", display: "block", aspectRatio: "16/9" }} />
      </div>
      <p style={{ marginTop: "12px", fontSize: "13px", color: "#555" }}>
        DASH Streaming · 480p / 720p Adaptive · Cloudflare R2
      </p>
    </div>
  );
}