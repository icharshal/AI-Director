import React, { useState, useEffect } from 'react';
import { Mic, Play, Volume2 } from 'lucide-react';

const AudioManager = () => {
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [testText, setTestText] = useState("Hello! I am ready to create content for your videos.");

    useEffect(() => {
        const loadVoices = () => {
            const available = window.speechSynthesis.getVoices();
            setVoices(available);
            if (available.length > 0 && !selectedVoice) {
                setSelectedVoice(available[0]);
            }
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const handleTest = (voice) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(testText);
        utterance.voice = voice;
        window.speechSynthesis.speak(utterance);
        setSelectedVoice(voice);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-white">Audio Manager</h1>
                <p className="text-slate-400">Explore and test available system voices for your projects.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Voice List */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[70vh] flex flex-col">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Mic size={20} className="text-teal-400" />
                        Available Voices ({voices.length})
                    </h3>
                    <div className="overflow-y-auto space-y-2 pr-2 custom-scrollbar flex-1">
                        {voices.map((voice, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleTest(voice)}
                                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${selectedVoice?.name === voice.name
                                        ? 'bg-teal-500/10 border-teal-500 text-teal-400'
                                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                                    }`}
                            >
                                <span className="font-medium truncate">{voice.name}</span>
                                <span className="text-[10px] uppercase bg-black/30 px-2 py-1 rounded text-slate-500">
                                    {voice.lang}
                                </span>
                            </button>
                        ))}
                        {voices.length === 0 && <p className="text-slate-500 italic">No system voices found.</p>}
                    </div>
                </div>

                {/* Test Area */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                        <h3 className="text-white font-bold mb-4">Voice Tester</h3>
                        <textarea
                            value={testText}
                            onChange={(e) => setTestText(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white min-h-[150px] outline-none focus:border-teal-500 transition-colors mb-4"
                            placeholder="Type something to test..."
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Volume2 size={16} />
                                <span>Currently testing: <span className="text-white font-bold">{selectedVoice?.name || "None"}</span></span>
                            </div>
                            <button
                                onClick={() => selectedVoice && handleTest(selectedVoice)}
                                disabled={!selectedVoice}
                                className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                            >
                                <Play size={18} fill="currentColor" /> Test Voice
                            </button>
                        </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
                        <h4 className="text-blue-200 font-bold mb-2">Did you know?</h4>
                        <p className="text-blue-300/80 text-sm leading-relaxed">
                            The available voices depend on your operating system. You can install more high-quality voices in your Windows or macOS settings, and they will automatically appear here!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioManager;
