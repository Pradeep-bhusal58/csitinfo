import React from 'react';
import { BookOpen, HelpCircle, FileText, CheckCircle2, ChevronRight, Award, GraduationCap, Github, Play, ArrowUpRight, User } from 'lucide-react';
import { motion } from 'motion/react';

const teamMembers = [
  {
    name: "Aman Bahadur Thapa",
    role: "Core Frontend Architect & Developer",
    college: "Patan Multiple Campus, Lalitpur",
    desc: "Spearheaded glassmorphic components layout and routing architectures matching real TU academic boards."
  },
  {
    name: "Prerna Adhikari",
    role: "Database & Backend Engineer",
    college: "Amrit Campus (ASCOL), Lainchaur",
    desc: "Designed strict MVC Express routing, database collections indexing, and secure JWT/bcrypt schemas."
  },
  {
    name: "Rohan Shrestha",
    role: "Academic Content Evaluator",
    college: "St. Xavier's College, Maitighar",
    desc: "Compiled TU board question historical archives, semester notes directories, and official course outlines."
  }
];

export const About: React.FC = () => {
  return (
    <div className="bg-[#020617] text-slate-100 min-h-screen pb-20">
      
      {/* 1. Page Header */}
      <div className="border-b border-white/10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(99,102,241,0.1),rgba(255,255,255,0))] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono font-bold text-indigo-300 tracking-wider bg-indigo-500/5 border border-indigo-500/20 px-3 py-1 rounded-full uppercase">
            About the Portal
          </span>
          <h1 className="mt-4 font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Empowering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Next Generation</span> of CSIT Scholars
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed">
            Learn more about Nepal's ultimate student-led central digital directory for BSc. Computer Science and Information Technology.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-20">
        
        {/* 2. Brand Story / Purpose section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="font-mono text-[10px] uppercase text-indigo-400 tracking-widest font-semibold">Origin Story</span>
            <h2 className="font-sans font-bold text-2xl text-white">Why CSIT Info Portal?</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              BSc CSIT is an incredible academic degree, but accessing organized learning syllabus guidelines, historical TU board questions, and verified PDF notes has historically been fractured.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              CSIT Info Portal was custom crafted to bridge this accessibility gap. We consolidate accurate, dean-verified curriculums, old question banks, and notes into an accessible digital hub.
            </p>
            <div className="pt-2">
              <span className="text-xs text-indigo-400 inline-flex items-center font-mono font-medium">
                Affiliation: Tribhuvan University, Nepal
              </span>
            </div>
          </div>

          {/* Right Features checklist */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-4">
            <div className="flex space-x-3 items-start">
              <div className="flex-shrink-0 mt-0.5 p-1 rounded-full bg-indigo-500/15 text-indigo-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Consolidated Resources</h4>
                <p className="text-xs text-slate-400">Eliminates scattered search and provides quick access to syllabi and previous years' papers.</p>
              </div>
            </div>

            <div className="flex space-x-3 items-start">
              <div className="flex-shrink-0 mt-0.5 p-1 rounded-full bg-indigo-500/15 text-indigo-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Strict TU Syllabus Alignment</h4>
                <p className="text-xs text-slate-400">Maintains 100% compliance with current IOST core guidelines from 1st to 8th semester.</p>
              </div>
            </div>

            <div className="flex space-x-3 items-start">
              <div className="flex-shrink-0 mt-0.5 p-1 rounded-full bg-indigo-500/15 text-indigo-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Responsive Platform Layout</h4>
                <p className="text-xs text-slate-400">Browse class outlines comfortably on mobile, tablet, or desktop systems.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Mission and Vision section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors">
              <BookOpen className="h-24 w-24" />
            </div>
            <div className="relative z-10 space-y-3">
              <h3 className="font-sans font-bold text-xl text-white flex items-center">
                <span className="w-1.5 h-6 bg-indigo-500 rounded mr-2 inline-block"></span>
                Our Mission
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                To democratize higher computer education by delivering structured, high-quality, free learning guides and boards archives to engineering and technology students across every district of Nepal.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors">
              <GraduationCap className="h-24 w-24" />
            </div>
            <div className="relative z-10 space-y-3">
              <h3 className="font-sans font-bold text-xl text-white flex items-center">
                <span className="w-1.5 h-6 bg-indigo-500 rounded mr-2 inline-block"></span>
                Our Vision
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                To become the central repository of collaboration for computer science students in Nepal, where scholars, teachers, and developers unify and uplift academic excellence together.
              </p>
            </div>
          </div>

        </section>

        {/* 4. Team Member Cards section */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="font-mono text-[10px] uppercase text-indigo-400 tracking-wider">The Founders</span>
            <h2 className="font-sans font-bold text-2xl text-white">Core Development Team</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Meet the Nepalese computer science scholars who gathered and compiled resources to craft this unified Web portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all flex flex-col justify-between backdrop-blur-md"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
                    <User className="h-5 w-5" />
                  </div>
                  <h4 className="font-sans font-bold text-base text-white">{member.name}</h4>
                  <p className="text-xs text-indigo-400 font-mono font-medium mt-0.5">{member.role}</p>
                  <p className="text-[10px] text-slate-500 font-sans mt-1.5 flex items-center font-medium">
                    <Award className="h-3 w-3 mr-1 text-indigo-400" /> {member.college}
                  </p>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                    {member.desc}
                  </p>
                </div>

                <div className="mt-5 border-t border-white/5 pt-3 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>TU Student ID Verified</span>
                  <a href="#" className="hover:text-indigo-400 flex items-center space-x-0.5">
                    <span>Profile</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
