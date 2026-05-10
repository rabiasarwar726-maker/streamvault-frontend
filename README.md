# StreamVault 🎬

A full-stack video streaming platform with CDN integration — built like YouTube/Netflix.

## Live Demo
🌐 https://streamvault-frontend-iota.vercel.app

## How It Works
1. User uploads a video → stored in Cloudflare R2 (CDN)
2. Auto-triggers FFmpeg transcoder on Render.com
3. Converts to DASH adaptive streaming (480p + 720p)
4. Served globally through Cloudflare CDN
5. Player auto-switches quality based on internet speed

## Tech Stack
- **Frontend:** React.js + dash.js
- **Backend:** Cloudflare Workers (Serverless)
- **Storage:** Cloudflare R2
- **Transcoder:** Node.js + FFmpeg on Render
- **Streaming:** MPEG-DASH Adaptive Bitrate

## Architecture
User → Cloudflare Worker → R2 Storage → Render Transcoder → FFmpeg → DASH Segments → R2 → CDN → User
## Features
- ✅ Video upload to Cloudflare R2
- ✅ Automatic FFmpeg transcoding
- ✅ DASH adaptive streaming (480p + 720p)
- ✅ Cloudflare CDN delivery
- ✅ Adaptive bitrate switching
- ✅ Video library

## Run Locally
```bash
cd frontend
npm install
npm start
```

## GitHub Repos
- Frontend: https://github.com/rabiasarwar726-maker/streamvault-frontend
- Transcoder: https://github.com/rabiasarwar726-maker/transcoder
