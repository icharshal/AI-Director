import React, { useState, useRef, useEffect } from 'react';
import { Download, Type, Palette, Image as ImageIcon } from 'lucide-react';

const VisualBoard = () => {
    const canvasRef = useRef(null);
    const [title, setTitle] = useState('How to Install Python');
    const [subtitle, setSubtitle] = useState('Complete Guide 2026');
    const [theme, setTheme] = useState('modern'); // modern, tech, minimal

    const themes = {
        modern: { bg: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)', text: '#ffffffff', accent: '#14b8a6' },
        tech: { bg: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', text: '#e2e8f0', accent: '#3b82f6' },
        minimal: { bg: '#ffffff', text: '#18181b', accent: '#000000' }
    };

    useEffect(() => {
        drawCanvas();
    }, [title, subtitle, theme]);

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const currentTheme = themes[theme];

        // Set dimensions (1280x720 - 720p standard)
        canvas.width = 1280;
        canvas.height = 720;

        // Background
        if (currentTheme.bg.includes('gradient')) {
            const gradient = ctx.createLinearGradient(0, 0, 1280, 720);
            if (theme === 'modern') {
                gradient.addColorStop(0, '#111827');
                gradient.addColorStop(1, '#1f2937');
            } else {
                gradient.addColorStop(0, '#0f172a');
                gradient.addColorStop(1, '#1e3a8a');
            }
            ctx.fillStyle = gradient;
        } else {
            ctx.fillStyle = currentTheme.bg;
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Decorative Accent
        ctx.fillStyle = currentTheme.accent;
        ctx.beginPath();
        ctx.arc(1200, 80, 200, 0, Math.PI * 2);
        ctx.globalAlpha = 0.1;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Text Styling
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Title
        ctx.fillStyle = currentTheme.text;
        ctx.font = 'bold 80px Inter, system-ui';
        ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 40);

        // Subtitle
        ctx.fillStyle = currentTheme.accent;
        ctx.font = '500 40px Inter, system-ui';
        ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 + 60);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = 'thumbnail.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-white">Visual Board</h1>
                    <p className="text-slate-400">Create professional thumbnails and title cards for your videos.</p>
                </div>
                <button
                    onClick={handleDownload}
                    className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold flex items-center gap-2 transition-colors"
                >
                    <Download size={20} /> Download Image
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 h-fit">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-teal-400 font-semibold mb-2">
                            <Type size={20} /> Text Settings
                        </div>

                        <div className="space-y-2">
                            <label className="text-slate-400 text-sm">Main Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white outline-none focus:border-teal-500 transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-slate-400 text-sm">Subtitle</label>
                            <input
                                type="text"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white outline-none focus:border-teal-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 border-t border-slate-800 pt-6">
                        <div className="flex items-center gap-2 text-teal-400 font-semibold mb-2">
                            <Palette size={20} /> Theme Style
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {Object.keys(themes).map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTheme(t)}
                                    className={`p-2 rounded-lg text-sm border capitalize transition-all ${theme === t
                                            ? 'bg-teal-500/20 border-teal-500 text-teal-400'
                                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-2xl">
                        <canvas
                            ref={canvasRef}
                            className="w-full h-auto rounded-xl bg-slate-950"
                        />
                    </div>
                    <p className="text-center text-slate-500 text-sm flex items-center justify-center gap-2">
                        <ImageIcon size={16} /> 1280 x 720 HD Preview
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VisualBoard;
