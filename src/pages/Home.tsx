import React, { useState, useEffect } from 'react';
import { academicService } from '../services/api.js';
import { CSITMaterialItem } from '../types.js';
import { BookOpen, FileText, HelpCircle, Bell, Search, Filter, Calendar, Award, GraduationCap, ChevronRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const semesters = [
  '1st Semester', '2nd Semester', '3rd Semester', '4th Semester',
  '5th Semester', '6th Semester', '7th Semester', '8th Semester'
];

export const Home: React.FC = () => {
  const [materials, setMaterials] = useState<CSITMaterialItem[]>([]);
  const [notices, setNotices] = useState<CSITMaterialItem[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>('1st Semester');
  const [activeTab, setActiveTab] = useState<'syllabus' | 'notes' | 'question'>('syllabus');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItemDetail, setSelectedItemDetail] = useState<CSITMaterialItem | null>(null);
  const [downloadSuccessItem, setDownloadSuccessItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortalData = async () => {
      setLoading(true);
      try {
        const materialRes = await academicService.getMaterials();
        if (materialRes.success) {
          setMaterials(materialRes.data);
          // Extract notices directly from responses
          const noticesList = materialRes.data.filter(m => m.type === 'notice');
          setNotices(noticesList);
        }
      } catch (err) {
        console.error('Failed to load academic resources', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortalData();
  }, []);

  // Filter materials depending on active configurations
  const filteredMaterials = materials.filter((m) => {
    const matchesType = m.type === activeTab;
    const matchesSemester = m.semester === selectedSemester;
    const matchesSearch = searchQuery
      ? m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesType && matchesSemester && matchesSearch;
  });

  return (
    <div className="bg-[#020617] text-slate-100 min-h-screen pb-16">
      
      {/* 1. Glassmorphic Gradient Hero Section */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))] border-b border-white/10 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Accent Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-6"
          >
            <GraduationCap className="h-4.5 w-4.5" />
            <span>Tribhuvan University Affiliation Standard Syllabus</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-indigo-400 bg-clip-text text-transparent"
          >
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">CSIT Info Portal</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            A unified learning, scheduling, and boards repository built to assist BSc Computer Science & 
            Information Technology (BSc CSIT) scholars across Nepal.
          </motion.p>

          {/* Quick Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 max-w-lg mx-auto relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search syllabus, old questions, notes by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </motion.div>
        </div>

        {/* Decorative Grid Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* 2. Main Portal Features & notices Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Academic Notices Bulletin - Left grid column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center space-x-2.5 mb-6 pb-4 border-b border-white/10">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Bell className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <h2 className="font-sans font-bold text-lg text-white">Dean Office Notices</h2>
                <p className="font-mono text-[10px] text-slate-500">Live Academic updates</p>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse flex space-x-3">
                    <div className="bg-slate-900 h-10 w-10 rounded-lg"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-slate-900 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-900 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : notices.length === 0 ? (
              <p className="text-sm text-slate-500 py-4">No recent academic notices found.</p>
            ) : (
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div 
                    key={notice.id}
                    onClick={() => setSelectedItemDetail(notice)}
                    className="p-3.5 rounded-lg bg-slate-950/40 hover:bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/10">
                        {notice.category || 'General'}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 flex items-center">
                        <Calendar className="mr-1 h-3 w-3" /> {notice.date}
                      </span>
                    </div>
                    <h3 className="font-sans font-semibold text-sm text-slate-200 group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {notice.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {notice.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Resource Filter Engine - Right grid columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            
            {/* Header filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-white/10 gap-4">
              <div>
                <h2 className="font-sans font-bold text-lg text-white">Academic Directory</h2>
                <p className="text-xs text-slate-400">Navigate CSIT courses and boards examinations directly</p>
              </div>

              {/* Resource Tabs selection: Syllabus, Notes, Questions */}
              <div className="inline-flex rounded-lg p-0.5 bg-slate-950 border border-white/5 text-xs">
                <button
                  onClick={() => setActiveTab('syllabus')}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'syllabus' ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Syllabus</span>
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'notes' ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Notes</span>
                </button>
                <button
                  onClick={() => setActiveTab('question')}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'question' ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>Questions</span>
                </button>
              </div>
            </div>

            {/* Semester Filter Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-6">
              {semesters.map((sem) => (
                <button
                  key={sem}
                  onClick={() => setSelectedSemester(sem)}
                  className={`py-2 px-3 text-xs rounded-lg font-mono tracking-tight text-center transition-all cursor-pointer border ${
                    selectedSemester === sem
                      ? 'bg-slate-950 text-indigo-400 border-indigo-500/40 font-semibold ring-1 ring-indigo-500/20'
                      : 'bg-slate-950/40 text-slate-400 border-white/5 hover:border-white/10 hover:text-slate-200'
                  }`}
                >
                  {sem}
                </button>
              ))}
            </div>

            {/* Content Results Display with glass design */}
            {loading ? (
              <div className="py-12 flex justify-center items-center">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredMaterials.length === 0 ? (
              <div className="py-12 text-center rounded-xl bg-slate-950/40 border border-white/5">
                <p className="text-slate-400 font-sans text-sm">No items found matching the selected context.</p>
                <p className="text-slate-500 text-xs mt-1">Check back later or try adjusting your search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMaterials.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={`material-${item.id}`}
                    onClick={() => setSelectedItemDetail(item)}
                    className="p-4 rounded-xl bg-slate-950/40 border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2.5">
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-indigo-500/5 text-indigo-300 border border-indigo-500/10">
                          {item.code || 'BSc CSIT'}
                        </span>
                        {item.year && (
                          <span className="font-mono text-[9px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                            Year {item.year}
                          </span>
                        )}
                      </div>
                      <h3 className="font-sans font-bold text-sm text-slate-200 group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      {item.subject && (
                        <p className="font-sans text-xs text-indigo-400/80 font-medium mt-1">
                          {item.subject}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 @container border-t border-white/5 pt-2.5">
                      <span className="text-[10px] text-slate-400 flex items-center font-mono font-medium">
                        {item.semester}
                      </span>
                      <span className="text-xs text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center font-mono">
                        View Details <ChevronRight className="ml-1 h-3.5 w-3.5" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Portal Status statistics grid (Aesthetic & Practical) */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-4 backdrop-blur-md">
            <div className="p-3 rounded-lg bg-indigo-400/10 text-indigo-400">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-slate-400 font-medium tracking-wider uppercase">Official Syllabus</p>
              <h4 className="text-xl font-sans font-bold text-white">100% Core Compliant</h4>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-4 backdrop-blur-md">
            <div className="p-3 rounded-lg bg-indigo-400/10 text-indigo-400">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-slate-400 font-medium tracking-wider uppercase">Exam Database</p>
              <h4 className="text-xl font-sans font-bold text-white">TU Board Questions</h4>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-4 backdrop-blur-md">
            <div className="p-3 rounded-lg bg-indigo-400/10 text-indigo-400">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-slate-400 font-medium tracking-wider uppercase">Portal Access</p>
              <h4 className="text-xl font-sans font-bold text-white">Free Student Portal</h4>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Detailed Overlay Modal (Fascinating UI Craftsmanship) */}
      <AnimatePresence>
        {selectedItemDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItemDetail(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[85vh] overflow-y-auto"
            >
              
              {/* Header tags */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {selectedItemDetail.type.toUpperCase()}
                </span>
                <button
                  onClick={() => setSelectedItemDetail(null)}
                  className="p-1 rounded bg-slate-950 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Title descriptions */}
              <h2 className="font-sans font-bold text-xl text-white mr-6">
                {selectedItemDetail.title}
              </h2>
              
              {selectedItemDetail.subject && (
                <p className="font-sans text-indigo-400 font-medium text-sm mt-1">
                  Subject: {selectedItemDetail.subject}
                </p>
              )}

              {/* Course Meta Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4 p-3 bg-slate-950/60 rounded-xl border border-white/5 font-mono text-xs text-slate-400">
                <div>
                  <span className="block text-[9px] text-slate-400 font-sans uppercase">Code</span>
                  <span className="text-white font-semibold">{selectedItemDetail.code || 'CSIT'}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-slate-400 font-sans uppercase">Semester</span>
                  <span className="text-white font-semibold">{selectedItemDetail.semester || 'Syllabus'}</span>
                </div>
                {selectedItemDetail.author && (
                  <div>
                    <span className="block text-[9px] text-slate-400 font-sans uppercase">Contributor</span>
                    <span className="text-white font-semibold">{selectedItemDetail.author}</span>
                  </div>
                )}
                {selectedItemDetail.year && (
                  <div>
                    <span className="block text-[9px] text-slate-400 font-sans uppercase">Board Year</span>
                    <span className="text-white font-semibold">{selectedItemDetail.year}</span>
                  </div>
                )}
                {selectedItemDetail.date && (
                  <div>
                    <span className="block text-[9px] text-slate-400 font-sans uppercase">Published Date</span>
                    <span className="text-white font-semibold">{selectedItemDetail.date}</span>
                  </div>
                )}
              </div>

              {/* Primary Material Content */}
              <div className="mt-6">
                <h4 className="font-sans font-bold text-sm text-slate-300 border-b border-white/10 pb-2 mb-3">Resource Content Overview</h4>
                
                {selectedItemDetail.content ? (
                  <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                    {selectedItemDetail.content}
                  </pre>
                ) : (
                  <p className="text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 rounded-xl border border-transparent">
                    {selectedItemDetail.description || "The core resources, old questions collection, solutions handbook and board compilation for Tribhuvan University (TU) curriculum standards."}
                  </p>
                )}
              </div>

              {downloadSuccessItem === selectedItemDetail.id && (
                <div className="mt-4 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono text-center">
                  ✓ Resource download initiated successfully. Thank you for using CSIT Portal!
                </div>
              )}

              {/* CTA Option */}
              <div className="mt-8 pt-4 border-t border-white/10 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setSelectedItemDetail(null);
                    setDownloadSuccessItem(null);
                  }}
                  className="px-4 py-2 rounded-full text-sm bg-slate-950 text-slate-400 hover:text-white"
                >
                  Close View
                </button>
                {(selectedItemDetail.type === 'notes' || selectedItemDetail.type === 'question') && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setDownloadSuccessItem(selectedItemDetail.id);
                      setTimeout(() => {
                        setDownloadSuccessItem(null);
                      }, 3000);
                    }}
                    className="px-6 py-2 rounded-full text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/30"
                  >
                    Download PDF
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

// Lucide icon helper
const X: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
