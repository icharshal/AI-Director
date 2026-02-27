import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Monitor, Command, CheckCircle, Copy, ArrowRight, Download, FileText } from 'lucide-react';

import { generateScript, checkOllamaStatus } from '../services/ai';

const TutorialGenerator = () => {
    const [software, setSoftware] = useState('');
    const [os, setOs] = useState('Windows 11');
    const [generatedScript, setGeneratedScript] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const navigate = useNavigate();
    const [voices, setVoices] = useState([]);
    const [selectedVoiceIdx, setSelectedVoiceIdx] = useState(0);
    const [speakingSection, setSpeakingSection] = useState(null);
    const [useAI, setUseAI] = useState(false);
    const [ollamaAvailable, setOllamaAvailable] = useState(false);

    React.useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            const defaultVoiceIdx = availableVoices.findIndex(v => v.name.includes('Google') || v.name.includes('English'));
            if (defaultVoiceIdx !== -1) setSelectedVoiceIdx(defaultVoiceIdx);
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        // Check Ollama status
        checkOllamaStatus().then(available => {
            setOllamaAvailable(available);
            if (available) setUseAI(true);
        });
    }, []);

    const handleSpeak = (text, index) => {
        if (speakingSection === index) {
            window.speechSynthesis.cancel();
            setSpeakingSection(null);
            return;
        }

        window.speechSynthesis.cancel();
        setSpeakingSection(index);

        const utterance = new SpeechSynthesisUtterance(text);
        if (voices[selectedVoiceIdx]) {
            utterance.voice = voices[selectedVoiceIdx];
        }

        utterance.onend = () => setSpeakingSection(null);
        window.speechSynthesis.speak(utterance);
    };

    const handleGenerate = async () => {
        if (!software) return;
        setIsGenerating(true);

        try {
            if (useAI && ollamaAvailable) {
                const script = await generateScript(software, os);
                setGeneratedScript(script);
            } else {
                // Fallback to template if AI is off or unavailable
                await new Promise(r => setTimeout(r, 1000));
                const script = {
                    title: `How to Install ${software} on ${os} (Template Mode)`,
                    sections: [
                        {
                            type: 'Intro',
                            text: `Hey everyone! In this video, I'm going to show you exactly how to download and install ${software} on ${os} in ${new Date().getFullYear()}.`,
                            visual: 'Facecam or Channel Intro Logo'
                        },
                        {
                            type: 'Step 1: Search',
                            text: `First, open your favorite browser and search for "${software} download". Make sure you click on the official website link used usually the first result.`,
                            visual: `Screen recording: Google search for "${software}"`
                        },
                        {
                            type: 'Step 2: Download',
                            text: `Once you're on the official page, look for the "Download" button. Since we are on ${os}, the site should automatically detect your operating system. Click to download the installer.`,
                            visual: `Screen recording: ${software} Official Website`
                        },
                        {
                            type: 'Step 3: Installation',
                            text: `Open the installer file we just downloaded. You might see a security prompt—just click "Yes". Follow the installation wizard, accept the agreement, and I recommend keeping the default install location.`,
                            visual: `Screen recording: ${software} Installer window clicking "Next"`
                        },
                        {
                            type: 'Step 4: Verification',
                            text: `To verify everything is working, let's open the Command Prompt or Terminal. Type "${software.toLowerCase()} --version" and hit enter. If you see version numbers, you're good to go!`,
                            visual: `Screen recording: Terminal window showing version output`
                        },
                        {
                            type: 'Outro',
                            text: `If this video helped you, please smash that like button and subscribe for more ${os} tutorials. See you in the next one!`,
                            visual: 'Channel Outro Screen'
                        }
                    ]
                };
                setGeneratedScript(script);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to generate script. Please check Ollama connection.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                    Software Tutorial Generator
                </h1>
                <p className="text-slate-400 text-lg">
                    Create a perfect "How-to" script in seconds using {useAI ? <span className="text-teal-400 font-bold">Local AI</span> : "Smart Templates"}.
                </p>
                {ollamaAvailable ? (
                    <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full text-xs font-bold border border-teal-500/20">
                        <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                        Ollama Connected
                    </div>
                ) : (
                    <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/20">
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        Ollama Not Found (Using Templates)
                    </div>
                )}
            </div>

            {/* Input Section */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-slate-300 font-medium ml-1">Software Name</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
                            <input
                                type="text"
                                placeholder="e.g. Python, VS Code, Node.js"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                                value={software}
                                onChange={(e) => setSoftware(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-slate-300 font-medium ml-1">Operating System</label>
                        <div className="relative">
                            <Monitor className="absolute left-4 top-3.5 text-slate-500" size={20} />
                            <select
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none appearance-none cursor-pointer"
                                value={os}
                                onChange={(e) => setOs(e.target.value)}
                            >
                                <option>Windows 11</option>
                                <option>Windows 10</option>
                                <option>macOS Sequoia</option>
                                <option>Ubuntu Linux</option>
                            </select>
                        </div>
                    </div>

                    {/* Voice Selector */}
                    <div className="space-y-2 md:col-span-2">
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-slate-300 font-medium ml-1">AI Voice (Local System)</label>
                            {ollamaAvailable && (
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <span className="text-xs text-slate-400">Use AI Generation</span>
                                    <input
                                        type="checkbox"
                                        checked={useAI}
                                        onChange={(e) => setUseAI(e.target.checked)}
                                        className="accent-teal-500 w-4 h-4"
                                    />
                                </label>
                            )}
                        </div>
                        <select
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none appearance-none cursor-pointer"
                            value={selectedVoiceIdx}
                            onChange={(e) => setSelectedVoiceIdx(Number(e.target.value))}
                        >
                            {voices.map((voice, idx) => (
                                <option key={idx} value={idx}>
                                    {voice.name} ({voice.lang})
                                </option>
                            ))}
                            {voices.length === 0 && <option>Loading system voices...</option>}
                        </select>
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!software || isGenerating}
                    className={`w-full mt-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${software && !isGenerating
                        ? 'bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white shadow-lg shadow-teal-500/20 transform hover:-translate-y-0.5'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                >
                    {isGenerating ? (
                        <span className="animate-pulse">Generating Script with {useAI ? 'Ollama AI' : 'Template'}...</span>
                    ) : (
                        <>
                            Generate Installation Guide <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </div>

            {/* Results Section */}
            {generatedScript && (
                <div className="space-y-6 animate-fade-in-up">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white max-w-2xl truncate">{generatedScript.title}</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    const element = document.createElement("a");
                                    const file = new Blob([JSON.stringify(generatedScript, null, 2)], { type: 'text/plain' });
                                    element.href = URL.createObjectURL(file);
                                    element.download = `${generatedScript.title.replace(/\s+/g, '_')}.json`;
                                    document.body.appendChild(element);
                                    element.click();
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors text-sm font-medium"
                            >
                                <Download size={16} /> Save JSON
                            </button>
                            <button
                                onClick={() => {
                                    let textContent = `# ${generatedScript.title}\n\n`;
                                    generatedScript.sections.forEach(s => {
                                        textContent += `## ${s.type}\n(Visual: ${s.visual})\n\nVOICEOVER:\n${s.text}\n\n---\n\n`;
                                    });
                                    const element = document.createElement("a");
                                    const file = new Blob([textContent], { type: 'text/plain' });
                                    element.href = URL.createObjectURL(file);
                                    element.download = `${generatedScript.title.replace(/\s+/g, '_')}.txt`;
                                    document.body.appendChild(element);
                                    element.click();
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors text-sm font-medium"
                            >
                                <FileText size={16} /> Save Text
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors text-sm font-medium">
                                <Copy size={16} /> Copy Text
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {generatedScript.sections.map((section, index) => (
                            <div key={index} className="bg-slate-900/50 border border-slate-800/50 p-6 rounded-xl hover:border-teal-500/30 transition-all group">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Visual Cue Column */}
                                    <div className="md:w-1/3 space-y-2">
                                        <span className="text-xs font-bold tracking-wider text-teal-500 uppercase bg-teal-500/10 px-2 py-1 rounded">
                                            {section.type}
                                        </span>
                                        <div className="bg-black/40 rounded-lg p-4 border border-slate-800 h-full flex flex-col justify-center items-center text-center">
                                            <Command className="text-slate-600 mb-2 group-hover:text-teal-400 transition-colors" size={24} />
                                            <p className="text-slate-400 text-sm font-medium">{section.visual}</p>
                                        </div>
                                    </div>

                                    {/* Script Column */}
                                    <div className="md:w-2/3 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide">Voiceover Script</h3>
                                            <button
                                                onClick={() => handleSpeak(section.text, index)}
                                                className={`p-2 rounded-full transition-colors ${speakingSection === index
                                                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                                    : 'bg-teal-500/20 text-teal-400 hover:bg-teal-500/30'
                                                    }`}
                                            >
                                                {speakingSection === index ? <div className="animate-pulse w-4 h-4 bg-current rounded-sm" /> : <ArrowRight className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <textarea
                                            value={section.text}
                                            onChange={(e) => {
                                                const newScript = { ...generatedScript };
                                                newScript.sections[index].text = e.target.value;
                                                setGeneratedScript(newScript);
                                            }}
                                            className={`w-full bg-transparent border border-transparent hover:border-slate-700 focus:border-teal-500 rounded p-2 text-lg leading-relaxed font-light outline-none resize-none transition-all ${speakingSection === index ? 'text-teal-100' : 'text-white'
                                                }`}
                                            rows={Math.max(3, Math.ceil(section.text.length / 60))}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Bar */}
                    <div className="flex justify-end pt-8">
                        <button
                            onClick={() => {
                                localStorage.setItem('currentProject', JSON.stringify(generatedScript));
                                navigate('/production');
                            }}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                        >
                            <CheckCircle size={20} /> Open in Teleprompter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TutorialGenerator;
