import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import TutorialGenerator from './pages/TutorialGenerator';
import VisualBoard from './pages/VisualBoard';
import Production from './pages/Production';
import ScriptStudio from './pages/ScriptStudio';
import AudioManager from './pages/AudioManager';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tutorials" element={<TutorialGenerator />} />
          <Route path="script" element={<ScriptStudio />} />
          <Route path="audio" element={<AudioManager />} />
          <Route path="visuals" element={<VisualBoard />} />
          <Route path="production" element={<Production />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
