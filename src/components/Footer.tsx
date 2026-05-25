import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Mail, Globe, MapPin, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-slate-950/60 backdrop-blur-md text-slate-400">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand/About Grid */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-400 shadow-lg shadow-indigo-500/20">
                <BookOpen className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="font-sans font-bold text-base tracking-tight text-white">
                CSIT <span className="text-indigo-400">Portal</span>
              </span>
            </div>
            <p className="text-sm max-w-sm text-slate-400 leading-relaxed">
              The complete educational directory and info gateway for Tribhuvan University (TU) 
              BSc CSIT computer science students. Built to unify curriculum syllabi, boards guidelines, notices and board exam resources.
            </p>
            <div className="flex space-x-4 pt-2 text-slate-500">
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="mailto:info@csitportal.edu.np" className="hover:text-indigo-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Quick Access</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">Old Questions</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">Course Syllabus</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">Dean Notices</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition-colors">About Team</Link>
              </li>
            </ul>
          </div>

          {/* College Information/Contact Help */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Nepal CSIT Hub</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>Kirtipur, Kathmandu, Nepal</span>
              </p>
              <p className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>TU Affiliated Colleges Support</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>support@csitportal.edu.np</span>
              </p>
            </div>
          </div>

        </div>

        {/* Legal and Disclaimer bottom footer */}
        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CSIT Info Portal. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0 font-mono text-[10px]">
            <span className="hover:text-slate-400">Academic Use Only</span>
            <span className="hover:text-slate-400">BETA V1.0.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
