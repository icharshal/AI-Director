# AI-Director 🎬

AI-Director is a powerful, privacy-focused, and offline-capable tool for creating high-quality software tutorials and educational video content. Leverage local AI for script generation and system voices for professional narration without cloud dependencies.

## 🚀 Key Features

- **📝 AI Script Generator**: Connected to local Ollama instances (like `qwen3:4b` or `llama3`) for intelligent research and script writing.
- **🗣️ Local Audio Engine**: Uses high-quality OS-native neural voices (Microsoft, macOS, etc.) via Browser TTS APIs.
- **🎬 Production Suite**:
  - **Teleprompter Mode**: Full-screen, auto-scrolling script reader for flawless OBS recordings.
  - **Visual Board**: Built-in canvas editor for Title Cards and Thumbnails.
  - **OBS Setup Guide**: Integrated instructions for optimal screen recording.
- **🔒 Privacy First**: All data remains on your machine in local storage. No tracking, no cloud APIs.

---

## 🛠️ Prerequisites

- **Node.js** (v18 or higher)
- **Ollama** (Optional, for AI script generation) - [Download here](https://ollama.com/)
- **Docker & Docker Desktop** (Optional, for containerized deployment)

---

## 🏃‍♂️ How to Run

### Method 1: Local Development (Node.js)

1. **Install Dependencies**:

   ```bash
   cd studio
   npm install
   ```

2. **Start Development Server**:

   ```bash
   npm run dev
   ```

3. **Access the App**:
   Go to `http://localhost:5173` in your browser.

---

### Method 2: Docker Deployment (Recommended)

Run the entire stack, including the AI engine, with a single command:

1. **Start Services**:

   ```bash
   docker-compose up -d --build
   ```

2. **Initialize AI Model**:
   Pull the recommended model into the engine:

   ```bash
   docker exec -it local-ai-engine ollama pull qwen3:4b
   ```

3. **Access the App**:
   Open **[http://localhost:8080](http://localhost:8080)**.

---

## 🧩 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: Ollama API
- **Audio**: Web Speech API (Text-to-Speech)
- **Infrastructure**: Docker, Nginx

## � Privacy & Security

This tool follows a strict **"Local First"** philosophy.

- **No Cloud APIs**: Your scripts and audio never leave your machine.
- **No Tracking**: No analytics or telemetry.
- **Your Data**: You own 100% of the generated content.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
*Created with ❤️ by the AI-Director Team.*
