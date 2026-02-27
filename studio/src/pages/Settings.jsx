import React, { useState, useEffect } from 'react';
import { User, Shield, Info, Save } from 'lucide-react';

const Settings = () => {
    const [name, setName] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const savedName = localStorage.getItem('userName');
        if (savedName) setName(savedName);
    }, []);

    const handleSave = () => {
        localStorage.setItem('userName', name);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-slate-400">Manage your studio preferences.</p>
            </div>

            <div className="space-y-6">

                {/* User Profile */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <User className="text-teal-500" /> User Profile
                    </h3>

                    <div className="space-y-4 max-w-md">
                        <div className="space-y-2">
                            <label className="text-slate-400 text-sm font-medium">Creator Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white outline-none focus:border-teal-500 transition-colors"
                            />
                        </div>
                        <button
                            onClick={handleSave}
                            className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all"
                        >
                            <Save size={18} /> {saved ? 'Saved!' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                {/* About Protocol */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Info className="text-blue-500" /> About AI Studio
                    </h3>
                    <div className="space-y-4 text-slate-400 leading-relaxed">
                        <p>
                            <span className="text-white font-bold">AI Video Creator (Local Edition)</span> is designed to run entirely offline on your machine.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong className="text-teal-400">Local Privacy:</strong> No data is sent to external cloud servers.</li>
                            <li><strong className="text-teal-400">Browser Native:</strong> Uses built-in Web Speech API for TTS.</li>
                            <li><strong className="text-teal-400">Zero Cost:</strong> No API keys or subscriptions required.</li>
                        </ul>
                        <div className="pt-4 border-t border-slate-800 mt-4">
                            <p className="text-xs text-slate-600">Version 1.0.0 • Local Build</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Settings;
