
export const generateScript = async (software, os, model = 'qwen3:4b') => {
    const prompt = `
  You are an expert tech content creator. Create a detailed video script for a YouTube tutorial titled "How to Install ${software} on ${os}".
  
  Return ONLY valid JSON with this structure:
  {
    "title": "Video Title Here",
    "sections": [
      {
        "type": "Intro" | "Step 1" | "Step 2" | "Outro",
        "visual": "Description of what is on screen (e.g. 'Show Google Search')",
        "text": "The exact script for the voiceover to read."
      }
    ]
  }
  
  Keep the tone professional yet friendly. Ensure steps are accurate for ${os}.
  Do not include any text outside the JSON.
  `;

    try {
        const response = await fetch('/api/ollama/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model,
                prompt: prompt,
                stream: false,
                format: "json"
            }),
        });

        if (!response.ok) {
            throw new Error('Ollama API failed');
        }

        const data = await response.json();
        const rawText = data.response;

        // Try to extract JSON from markdown or raw text
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : rawText;

        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.error("JSON Parse Error on:", jsonString);
            throw new Error("Failed to parse AI response");
        }
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw error;
    }
};

export const checkOllamaStatus = async () => {
    try {
        const response = await fetch('/api/ollama/tags');
        return response.ok;
    } catch {
        return false;
    }
}
