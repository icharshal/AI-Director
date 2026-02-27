import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Play, Trash2, Clock } from 'lucide-react';

const ScriptStudio = () => {
    const [savedScripts, setSavedScripts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // In a real app, this would come from a database. 
        // For local edition, we'll check localStorage for 'savedScripts' array 
        // AND the current active project.
        const allScripts = [];

        // Get current project
        const current = localStorage.getItem('currentProject');
        if (current) {
            try {
                const parsed = JSON.parse(current);
                allScripts.push({ ...parsed, id: 'current', date: new Date().toISOString() });
            } catch (e) { }
        }

        setSavedScripts(allScripts);
    }, []);

    const handleOpen = (script) => {
        localStorage.setItem('currentProject', JSON.stringify(script));
        navigate('/production');
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-white">Script Studio</h1>
                <p className="text-slate-400">Manage your generated scripts and projects.</p>
            </div>

            <div className="grid gap-4">
                {savedScripts.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800">
                        <FileText size={48} className="mx-auto text-slate-600 mb-4" />
                        <h3 className="text-xl text-white font-bold mb-2">No Saved Scripts</h3>
                        <p className="text-slate-400 mb-6">Create your first script in the Tutorial Generator.</p>
                        <button
                            onClick={() => navigate('/tutorials')}
                            className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold transition-colors"
                        >
                            Create New Script
                        </button>
                    </div>
                ) : (
                    savedScripts.map((script, idx) => (
                        <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between hover:border-teal-500/30 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-teal-500/10 rounded-lg text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">{script.title}</h3>
                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <span className="flex items-center gap-1"><Clock size={12} /> Last Modified: Just now</span>
                                        <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-400 uppercase tracking-widest text-[10px]">{script.sections.length} Sections</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleOpen(script)}
                                    className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg font-medium transition-all flex items-center gap-2"
                                >
                                    <Play size={16} /> Open Production
                                </button>
                                <button className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-500 rounded-lg transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ScriptStudio;
