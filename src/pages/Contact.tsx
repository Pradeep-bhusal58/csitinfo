import React, { useState } from 'react';
import { contactService } from '../services/api.js';
import { Mail, Send, MapPin, Phone, MessageSquare, ShieldAlert, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [apiResult, setApiResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setApiResult({ success: false, message: "Please build out name, electronic mail, and message text." });
      return;
    }

    setSubmitting(true);
    setApiResult(null);

    try {
      const res = await contactService.submitMessage(formData);
      if (res.success) {
        setApiResult({ success: true, message: res.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setApiResult({ success: false, message: res.message || "Failed to submit request." });
      }
    } catch (err: any) {
      setApiResult({
        success: false,
        message: err.response?.data?.message || err.message || "A system networking error occurs."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#020617] text-slate-100 min-h-screen pb-20">
      
      {/* Page Header banner */}
      <div className="border-b border-white/10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(99,102,241,0.1),rgba(255,255,255,0))] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono font-bold text-indigo-300 tracking-wider bg-indigo-500/5 border border-indigo-500/10 px-3 py-1 rounded-full uppercase">
            Portal Assistance
          </span>
          <h1 className="mt-4 font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Our Desk</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-400 leading-relaxed">
            Have boards resources to contribute? Encountered errors in syllabus schedules? Send a message and help coordinate learning!
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form container - Left column */}
          <div className="lg:col-span-7 bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-xl shadow-xl space-y-6">
            <div className="pb-2 border-b border-white/10">
              <h2 className="font-sans font-bold text-lg text-white">Send Us An Inquiry</h2>
              <p className="text-xs text-slate-400">Complete details to register an academic dispatch</p>
            </div>

            {/* API Status Messages */}
            <AnimatePresence>
              {apiResult && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className={`p-4 rounded-xl text-xs flex items-start space-x-2.5 border ${
                    apiResult.success 
                      ? 'bg-indigo-500/5 border-indigo-500/25 text-indigo-400' 
                      : 'bg-rose-500/5 border-rose-500/25 text-rose-400'
                  }`}
                >
                  <MessageSquare className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{apiResult.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs text-slate-400 font-mono tracking-wide uppercase mb-1.5">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Samir Karki"
                  className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/5 rounded-xl text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent text-slate-300 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs text-slate-400 font-mono tracking-wide uppercase mb-1.5">Student Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@college.edu.np"
                  className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/5 rounded-xl text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent text-slate-300 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs text-slate-400 font-mono tracking-wide uppercase mb-1.5">Inquiry Details / Resource Link</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Indicate syllabus chapters, corrections, contributor materials or portal issues..."
                  className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/5 rounded-xl text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent text-slate-300 transition-all resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex justify-center items-center space-x-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-semibold rounded-full text-sm shadow-lg shadow-indigo-500/20 cursor-pointer active:scale-[0.98] transition-all"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Dispatch Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info cards - Right column */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            
            {/* Direct Coordinates */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-5 backdrop-blur-md">
              <h2 className="font-sans font-bold text-white text-base">Portal Coordinates</h2>
              
              <div className="space-y-4 text-xs text-slate-400">
                <div className="flex space-x-3 items-center">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase">Academic Support</span>
                    <a href="mailto:support@csitportal.edu.np" className="hover:text-indigo-400 text-slate-300 font-medium">support@csitportal.edu.np</a>
                  </div>
                </div>

                <div className="flex space-x-3 items-center">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase">Geographical Base</span>
                    <span className="text-slate-300 font-medium font-sans">Kirtipur, Kathmandu, Nepal</span>
                  </div>
                </div>

                <div className="flex space-x-3 items-center">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase">Phone Coordination</span>
                    <span className="text-slate-300 font-medium font-sans">+977 1-4331755 (TU Support)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contribution Guide */}
            <div className="bg-gradient-to-br from-indigo-500/5 to-transparent p-6 rounded-2xl border border-indigo-500/10 space-y-3.5">
              <div className="flex items-center space-x-2 text-indigo-400">
                <Sparkles className="h-4 w-4" />
                <h4 className="font-sans font-bold text-sm">Contribute Learning Resources</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                If you compiled solved board papers or hand-written notes, you can link your GitHub or Google Drive sharing link here. Verifying team reviews usually completes resource listings inside the database in 24 hours.
              </p>
              <div className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider">
                🎁 Earn Contributor Badges!
              </div>
            </div>

            {/* Disclaimer info banner */}
            <div className="p-4 rounded-xl bg-slate-900/10 border border-white/5 flex items-start space-x-3 text-[11px] text-slate-400">
              <ShieldAlert className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
              <p>
                <b>Disclaimers:</b> CSIT Info Portal is an open study collective and is not officially affiliated with Tribhuvan University (TU) Dean's Office or Institute of Science and Technology (IoST).
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
