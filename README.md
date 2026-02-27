# AI Video Studio (Local Edition)

**A privacy-focused, offline-capable tool for creating high-quality software tutorials and educational content.**

This application runs locally on your machine, leveraging **Browser APIs** for Text-to-Speech and **Local LLMs (Ollama)** for intelligent script generation. No API keys or cloud subscriptions required.

## 🚀 Features

### 📝 AI Script Generator

- **Local AI Integration**: Connects to your local Ollama instance (e.g., `qwen3:4b` or `llama3`) for intelligent research and writing.
- **Smart Templates**: Fallback mode for instant, structured "How-to" guides without AI.
- **Visual Cues**: Automatically suggests what to record (e.g., "Screen recording: Google Search").

### 🗣️ Local Audio Engine

- **System Voices**: Utilizes the high-quality voices already installed on your OS (Microsoft Neural, macOS Siri, etc.).
- **Audio Manager**: Test and preview all available voices in the dedicated Audio Lab.
- **Playback**: Listen to specific sections or the entire script before recording.

### 🎬 Production Tools

- **Teleprompter Mode**: Full-screen, auto-scrolling script reader designed for OBS capturing.
- **Visual Board**: Create professional Title Cards and Thumbnails with a built-in canvas editor.
- **OBS Integration**: Includes a built-in setup guide for optimal screen recording.

### 💾 Data Management

- **Script Studio**: Save and manage your projects locally.
- **Exports**: Download scripts as JSON (backup) or human-readable Text files.
- **Offline First**: All data is stored in your browser's LocalStorage.

## 🛠️ Prerequisites

1. **Node.js**: (v16 or higher)
2. **Ollama** (Optional, for AI features):
    - Install from [ollama.com](https://ollama.com/)
    - Pull a localized model: `ollama pull qwen3:4b`

## 🏃‍♂️ How to Run

1. **Navigate to the project folder:**

    ```bash
    cd studio
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm run dev
    ```

4. **Open in Browser:**
    Go to `http://localhost:5173` (or the port shown in your terminal).

## 🔒 Privacy

This tool follows a strict **"Local First"** philosophy.
- **No Cloud APIs**: Your scripts and audio never leave your machine.
- **No Tracking**: No analytics or telemetry.
- **Your Data**: You own 100% of the generated content.
