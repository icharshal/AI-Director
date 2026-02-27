# Docker Deployment Guide

## Prerequisites

- Docker Desktop installed.

## Quick Start

1. **Build and Run:**
   Run the following command from this directory:

   ```bash
   docker-compose up -d --build
   ```

2. **Initialize AI Model:**
   Since the Ollama container starts empty, you need to pull the AI model once:

   ```bash
   docker exec -it local-ai-engine ollama pull qwen3:4b
   ```

   *(Note: This might take a few minutes as it downloads the ~2.5GB model).*

3. **Access the App:**
   Open your browser to: **[http://localhost:8080](http://localhost:8080)**

## Configuration

- **Ports:** The web app runs on port `8080` by default. You can change this in `docker-compose.yml`.
- **Data:** Ollama models are stored in a persistent Docker volume `ollama_data`, so you don't need to re-download them after restarting.
- **GPU Support:** To speed up AI generation, enable GPU support by uncommenting the `deploy` section in `docker-compose.yml`. You need the NVIDIA Container Toolkit installed.
