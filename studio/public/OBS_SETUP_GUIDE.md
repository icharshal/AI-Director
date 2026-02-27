# OBS Studio Setup Guide for Teleprompter Recording

To effortlessly record your screen and voiceover using the built-in teleprompter, follow these optimized settings.

## 1. Scene Setup

1. Open OBS Studio.
2. Create a new Scene called **"AI Studio Tutorial"**.
3. Add a **Window Capture** source:
   - Select your browser window running AI Studio.
   - Use the **Alt + Drag** (click and drag edges) method to crop the capture so it ONLY shows the teleprompter script area (the right side of the production screen).
4. (Optional) Add a **Video Capture Device** (Webcam) and place it next to the script or overlay it.

## 2. Audio Setup

1. Go to **Settings > Audio**.
2. **Desktop Audio**: Disable or set to your system output (if you want to record the AI voiceover playback).
3. **Mic/Auxiliary Audio**: Select your high-quality microphone.
4. **Noise Suppression**: Click the gear icon next to your Mic input > Filters > + > Noise Suppression (RNNoise) for crisp voiceovers.

## 3. Recording Workflow

1. In AI Studio, open your script in **Production / Teleprompter**.
2. Click the **"Maximize"** icon to go full screen for a cleaner view.
3. In OBS, hit **Start Recording**.
4. In AI Studio, click **Start Teleprompter**.
5. Read along with the scrolling text. The visual cue card on the left tells you exactly what to show on screen for that section (e.g., "Screen recording: Google Search").
6. When finished, hit **Stop Recording** in OBS.

## 4. Post-Production

You now have a clean video file with your voiceover. Import this into your video editor (CapCut, Premiere, or DaVinci) and simply layer the screen recordings (Step 1, Step 2, etc.) over the audio track.
