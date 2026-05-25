import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { User, Mail, Lock, ShieldAlert, Award, ArrowRight, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Register: React.FC = () => {
  const { registerUser, isAuthenticated, error, clearError } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [localError, setLocalError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Clear global context errors on mount/unmount
  useEffect(() => {
    clearError();
    return () => clearError();
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setLocalError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setLocalError("Please fill in all requested registration fields.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must possess at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match. Please verify.");
      return;
    }

    setSubmitting(true);
    setLocalError(null);

    const res = await registerUser(name, email, password);
    setSubmitting(false);

    if (res.success) {
      navigate('/dashboard');
    }
  };

  const displayedError = localError || error;

  return (
    <div className="bg-[#020617] text-slate-100 min-h-[90vh] flex items-center justify-center py-16 px-4">
      
      {/* Absolute Backdrop Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl space-y-6 z-10">
        
        {/* Brand Accent */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/35 mb-4 text-indigo-400">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="font-sans font-extrabold text-2xl text-white">BSc CSIT Registration</h1>
          <p className="text-xs text-slate-400 mt-1">Join the ultimate central workspace portal for CSIT scholars</p>
        </div>

        {/* Display Error Message Alerts */}
        <AnimatePresence>
          {displayedError && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/25 text-rose-400 text-xs flex items-start space-x-2.5"
            >
              <ShieldAlert className="h-4.5 w-4.5 shrink-0 mt-0.5" />
              <span>{displayedError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">Full Scholar Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Samir Karki"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-white/5 rounded-xl text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-300 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@college.edu.np"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-white/5 rounded-xl text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-300 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 6 alphanumeric characters"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-white/5 rounded-xl text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-300 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-white/5 rounded-xl text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-300 transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-850 text-white font-bold rounded-full text-sm shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 flex items-center justify-center space-x-1 cursor-pointer transition-all active:scale-[0.98]"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Existing User Redirect */}
        <div className="border-t border-white/5 pt-4 text-center">
          <p className="text-xs text-slate-500">
            Already registered on CSIT Portal?{' '}
            <Link to="/login" className="text-indigo-400 font-medium hover:underline">
              Sign In Here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
