import React from 'react';
import { LayoutDashboard, PenTool, Mic, Image, Settings, Video } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Tutorial Generator', icon: PenTool, path: '/tutorials' },
        { name: 'Script Studio', icon: PenTool, path: '/script' },
        { name: 'Audio Manager', icon: Mic, path: '/audio' },
        { name: 'Visual Board', icon: Image, path: '/visuals' },
        { name: 'Final Production', icon: Video, path: '/production' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <div className="h-screen w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                    AI Studio
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-teal-400 border border-teal-500/30'
                                : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-4 py-2 text-sm text-slate-500">
                    <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                    <div>
                        <p className="text-white font-medium">User</p>
                        <p className="text-xs">Pro Plan</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
