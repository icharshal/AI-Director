import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Mic, Maximize, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Production = () => {
    const [script, setScript] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentLine, setCurrentLine] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem('currentProject');
        if (saved) {
            setScript(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        let interval;
        if (isPlaying && script) {
            interval = setInterval(() => {
                // Auto-scroll simulation
                if (scrollRef.current) {
                    scrollRef.current.scrollBy({ top: 1, behavior: 'smooth' });
                }
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isPlaying, script]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };

    if (!script) return (
        <div className="text-center mt-20 text-slate-400">
            <p>No active project found.</p>
            <Link to="/tutorials" className="text-teal-400 hover:underline">Create a script first</Link>
        </div>
    );

    return (
        <div className={`flex flex-col h-[calc(100vh-4rem)] animate-fade-in ${isFullScreen ? 'fixed inset-0 z-50 bg-black p-8 h-screen' : ''}`}>

            {/* Controls Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-4">
                    {!isFullScreen && (
                        <Link to="/tutorials" className="p-2 hover:bg-slate-800 rounded-full text-slate-400">
                            <ArrowLeft size={20} />
                        </Link>
                    )}
                    <div>
                        <h1 className="text-xl font-bold text-white">{script.title}</h1>
                        <p className="text-sm text-teal-500 font-mono flex items-center gap-2">
                            PRODUCTION MODE
                            <span className="text-slate-600">|</span>
                            <a href="/OBS_SETUP_GUIDE.md" target="_blank" className="hover:text-teal-300 underline">OBS Setup Guide</a>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleFullScreen}
                        className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-colors"
                        title="Toggle Fullscreen for OBS Capture"
                    >
                        <Maximize size={20} />
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isPlaying
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-teal-500 hover:bg-teal-600 text-white'
                            }`}
                    >
                        {isPlaying ? <><Square size={20} fill="currentColor" /> Stop Teleprompter</> : <><Play size={20} fill="currentColor" /> Start Teleprompter</>}
                    </button>
                </div>
            </div>

            {/* Main Teleprompter Area */}
            <div className="flex-1 overflow-hidden relative grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Visual Cue Card (Left Side) */}
                <div className="hidden lg:flex flex-col gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50 h-full">
                    <h3 className="text-slate-400 font-medium uppercase tracking-wider flex items-center gap-2">
                        <Mic size={18} /> Current Visual Instruction
                    </h3>
                    <div className="flex-1 flex items-center justify-center bg-black/40 rounded-xl border-2 border-dashed border-slate-800">
                        <p className="text-2xl text-center text-slate-300 font-light px-8">
                            {script.sections[currentLine]?.visual || "Get Ready..."}
                        </p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-blue-200 text-sm">
                        <span className="font-bold">OBS TIP:</span> Crop your screen capture to just the teleprompter on the right if you want to record yourself reading!
                    </div>
                </div>

                {/* Scrolling Script (Right/Center) */}
                <div className="lg:col-span-2 bg-black rounded-2xl border-4 border-slate-800 relative overflow-hidden">
                    <div
                        ref={scrollRef}
                        className="absolute inset-0 overflow-y-auto p-12 scroll-smooth no-scrollbar"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        <div className="space-y-12 pb-[50vh] pt-[20vh]">
                            {script.sections.map((section, idx) => (
                                <div
                                    key={idx}
                                    className={`transition-all duration-500 ${idx === currentLine ? 'opacity-100 scale-105' : 'opacity-40 blur-[1px]'
                                        }`}
                                    onClick={() => setCurrentLine(idx)}
                                >
                                    <p className="text-sm text-teal-500 font-bold uppercase mb-2">
                                        {section.type} • {section.visual}
                                    </p>
                                    <p className="text-5xl font-bold text-white leading-tight">
                                        {section.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Focus overlay */}
                    <div className="absolute top-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-black to-transparent pointer-events-none"></div>

                    {/* Reading Guide Line */}
                    <div className="absolute top-[25vh] left-4 right-4 h-1 bg-red-500/30 rounded pointer-events-none"></div>
                </div>

            </div>
        </div>
    );
};

export default Production;
