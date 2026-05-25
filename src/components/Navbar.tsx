import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { Menu, X, BookOpen, LogOut, LayoutDashboard, Send, Award, Home, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, logoutUser, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-indigo-400 font-semibold' : 'text-slate-300 hover:text-indigo-400';
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand Section */}
          <Link to="/" className="flex items-center space-x-2 group h-full">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-400 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                CSIT <span className="text-indigo-400">Portal</span>
              </span>
              <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest leading-none">
                BSc CSIT HUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={`${isActive('/')} flex items-center space-x-1.5 text-sm transition-colors`}>
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/about" className={`${isActive('/about')} flex items-center space-x-1.5 text-sm transition-colors`}>
              <User className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link to="/contact" className={`${isActive('/contact')} flex items-center space-x-1.5 text-sm transition-colors`}>
              <Send className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={`${isActive('/dashboard')} flex items-center space-x-1.5 text-sm transition-colors`}>
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <div className="h-4 w-px bg-slate-800"></div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-slate-400 font-medium">Hi, {user?.name.split(' ')[0]} 👋</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg text-sm bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-slate-300 hover:text-indigo-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 rounded-full text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 active:scale-95 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-900 bg-slate-950 px-4 py-4 space-y-3 shadow-2xl">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2 rounded-lg p-2 text-base text-slate-300 hover:bg-slate-900 hover:text-indigo-400 transition-all"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2 rounded-lg p-2 text-base text-slate-300 hover:bg-slate-900 hover:text-indigo-400 transition-all"
          >
            <User className="h-5 w-5" />
            <span>About</span>
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2 rounded-lg p-2 text-base text-slate-300 hover:bg-slate-900 hover:text-indigo-400 transition-all"
          >
            <Send className="h-5 w-5" />
            <span>Contact</span>
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 rounded-lg p-2 text-base text-slate-300 hover:bg-slate-900 hover:text-indigo-400 transition-all"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Student Dashboard</span>
              </Link>
              <div className="h-px bg-slate-900 my-2"></div>
              <div className="flex items-center justify-between p-2">
                <span className="text-xs text-slate-400 font-medium">Logged in as {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm bg-rose-500/10 border border-rose-500/30 text-rose-400"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex justify-center items-center py-2.5 rounded-full border border-slate-800 text-sm text-slate-300 hover:bg-slate-900 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="flex justify-center items-center py-2.5 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 shadow-lg shadow-indigo-500/30"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
