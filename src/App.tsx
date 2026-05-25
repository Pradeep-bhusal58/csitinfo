import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { Home } from './pages/Home.js';
import { About } from './pages/About.js';
import { Contact } from './pages/Contact.js';
import { Login } from './pages/Login.js';
import { Register } from './pages/Register.js';
import { Dashboard } from './pages/Dashboard.js';
import { ProtectedRoute } from './components/ProtectedRoute.js';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-[#020617] font-sans tracking-normal antialiased text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
          {/* Background Atmospheric / Immersive Media Globs */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none"></div>
          
          {/* Main Visual Header Navbar */}
          <Navbar />

          {/* Central Route Segment */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Student Dashboard Route */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch all redirecting back to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Persistent Footer */}
          <Footer />

        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
