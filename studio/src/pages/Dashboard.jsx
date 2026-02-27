import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Plus, Wand2 } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <h2 className="text-3xl font-bold text-white">Welcome back</h2>
                <p className="text-slate-400 mt-1">Ready to create your next viral video?</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/tutorials" className="block">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white cursor-pointer hover:shadow-lg hover:shadow-teal-500/20 transition-all group h-full">
                        <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Plus size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-1">Create Tutorial</h3>
                        <p className="text-white/80 text-sm">"How to install..." videos</p>
                    </div>
                </Link>

                <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 text-white cursor-pointer hover:border-indigo-500/50 transition-all group">
                    <div className="bg-indigo-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
                        <Wand2 size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-1">AI Generator</h3>
                    <p className="text-slate-400 text-sm">Generate from topic</p>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-xl font-semibold text-white mb-6">Recent Projects</h3>
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 text-center text-slate-500">
                    <Video className="mx-auto mb-4 opacity-50" size={48} />
                    <p>No projects yet. Start creating!</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
