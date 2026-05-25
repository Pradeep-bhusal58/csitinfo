import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { Calendar, User, Mail, Award, LogOut, CheckSquare, Sparkles, Plus, Trash2, Calculator, Save, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

interface SemesterGoal {
  id: string;
  text: string;
  completed: boolean;
}

export const Dashboard: React.FC = () => {
  const { user, logoutUser } = useAuth();
  
  // Localized interactive Scholar Planner state
  const [goals, setGoals] = useState<SemesterGoal[]>([
    { id: '1', text: 'Thoroughly practice Discrete Mathematical induction models', completed: true },
    { id: '2', text: 'Conduct visual code comparisons on Stack vs Queue buffers', completed: false },
    { id: '3', text: 'Obtain previous year papers of Operating Systems exam', completed: false },
  ]);
  const [newGoalText, setNewGoalText] = useState('');

  // Localized Nepal CSIT GPA calculation tool
  const [subjects, setSubjects] = useState([
    { name: 'Subject A', creditHrs: 3, gradePoint: 4.0 },
    { name: 'Subject B', creditHrs: 3, gradePoint: 3.6 },
    { name: 'Subject C', creditHrs: 3, gradePoint: 3.2 },
    { name: 'Subject D', creditHrs: 3, gradePoint: 2.8 },
    { name: 'Subject E', creditHrs: 3, gradePoint: 3.0 },
  ]);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    const item: SemesterGoal = {
      id: `gl_${Date.now()}`,
      text: newGoalText.trim(),
      completed: false
    };
    setGoals([...goals, item]);
    setNewGoalText('');
  };

  const handleToggleGoal = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  // Compute SGPA (Semester Grade Point Average)
  const calculateSGPA = () => {
    let totalCreditHours = 0;
    let totalWeightedPoints = 0;
    subjects.forEach(sub => {
      totalCreditHours += sub.creditHrs;
      totalWeightedPoints += (sub.creditHrs * sub.gradePoint);
    });
    return totalCreditHours > 0 ? (totalWeightedPoints / totalCreditHours).toFixed(2) : "0.00";
  };

  const handleUpdateGrade = (index: number, val: number) => {
    const updated = [...subjects];
    updated[index].gradePoint = Number(val);
    setSubjects(updated);
  };

  return (
    <div className="bg-[#020617] text-slate-100 min-h-screen pb-20">
      
      {/* Dashboard Top banner */}
      <div className="border-b border-white/10 bg-slate-900/10 py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block">BSc CSIT Scholar Lounge</span>
              <h1 className="font-sans font-extrabold text-2xl text-white">Welcome, {user?.name}!</h1>
              <p className="text-xs text-slate-400 flex items-center mt-1">
                <Mail className="h-3.5 w-3.5 mr-1.5 text-slate-500" /> {user?.email}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={logoutUser}
              className="px-5 py-2 rounded-full text-xs font-mono font-medium border border-rose-500/20 bg-rose-500/5 text-rose-400 hover:bg-rose-500 hover:text-white cursor-pointer active:scale-95 transition-all flex items-center space-x-1.5"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out lounge</span>
            </button>
          </div>

        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_300px_at_80%_-20%,rgba(99,102,241,0.06),transparent)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Planner checklist column - Left */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Scholar Goal Planner */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-5">
            <div className="pb-3 border-b border-white/10">
              <h2 className="font-sans font-bold text-lg text-white flex items-center">
                <CheckSquare className="h-5 w-5 mr-2 text-indigo-400" />
                Semester Study Goals Planner
              </h2>
              <p className="text-xs text-slate-400">Add checklist modules to schedule syllabus revisions</p>
            </div>

            {/* Form */}
            <form onSubmit={handleAddGoal} className="flex gap-2">
              <input
                type="text"
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                placeholder="e.g. Complete 3rd Sem DSA board practice solutions..."
                className="flex-grow px-3.5 py-2 bg-slate-950/60 border border-white/5 rounded-xl text-xs placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent text-slate-300 transition-all"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full text-xs flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Goal</span>
              </button>
            </form>

            {/* List */}
            <div className="space-y-2.5">
              {goals.length === 0 ? (
                <p className="text-xs text-slate-500 py-3 text-center">Your scheduler checklist is dry. Draft a study goal above!</p>
              ) : (
                goals.map((goal) => (
                  <div 
                    key={goal.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/40 border border-white/5 group transition-colors"
                  >
                    <div className="flex items-stretch space-x-3 cursor-pointer select-none" onClick={() => handleToggleGoal(goal.id)}>
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => {}}
                        className="rounded border-white/10 text-indigo-500 focus:ring-indigo-500 h-4.5 w-4.5 shrink-0 accent-indigo-500 mt-0.5"
                      />
                      <span className={`text-xs font-medium font-sans ${goal.completed ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                        {goal.text}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="p-1 rounded bg-slate-900 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 2. Personalized TU Syllabus Checklist Tracker */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-4">
            <h2 className="font-sans font-bold text-lg text-white flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-400" />
              Syllabus Coverage Audit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 text-xs">
                <span className="font-mono text-[9px] text-slate-500 block">Syllabus Complete</span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl font-sans font-black text-white">42%</span>
                  <span className="text-indigo-400 font-medium font-mono">Exam Semester 1</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 text-xs">
                <span className="font-mono text-[9px] text-slate-500 block">Total Compiled Credits</span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl font-sans font-black text-white">120 Hrs</span>
                  <span className="text-indigo-400 font-medium font-mono">BSc CSIT</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* GPA Calculator Column - Right */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Interactive Nepal CSIT GPA calculation tool */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-5">
            <div className="pb-3 border-b border-white/10">
              <h3 className="font-sans font-bold text-sm text-white flex items-center uppercase tracking-wide">
                <Calculator className="h-4 w-4 mr-2 text-indigo-400" />
                CSIT GPA Forecaster
              </h3>
              <p className="text-[10px] text-slate-400">Evaluate dynamic GPA projections from credit targets</p>
            </div>

            <div className="space-y-3">
              {subjects.map((sub, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs bg-slate-950/40 p-2.5 rounded-xl border border-white/5">
                  <span className="text-slate-300 font-medium truncate shrink-0 max-w-28">{sub.name} (3 Cr)</span>
                  <select
                    value={sub.gradePoint}
                    onChange={(e) => handleUpdateGrade(idx, Number(e.target.value))}
                    className="bg-slate-950 border border-white/5 rounded px-2 py-1 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer text-right min-w-18 font-mono"
                  >
                    <option value="4.0">A (4.0)</option>
                    <option value="3.6">A- (3.6)</option>
                    <option value="3.2">B+ (3.2)</option>
                    <option value="3.0">B (3.0)</option>
                    <option value="2.8">B- (2.8)</option>
                    <option value="2.4">C+ (2.4)</option>
                    <option value="2.0">C (2.0)</option>
                    <option value="1.0">D (1.0)</option>
                    <option value="0.0">F (0.0)</option>
                  </select>
                </div>
              ))}
            </div>

            {/* Calculated GPA box */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-indigo-500/10 text-center space-y-1 relative overflow-hidden">
              <span className="text-[9px] font-mono text-slate-400 block uppercase tracking-wider">Projected Semester SGPA</span>
              <span className="text-3xl font-sans font-black text-indigo-400 tracking-tight block">
                {calculateSGPA()}
              </span>
              <p className="text-[10px] text-slate-500 font-mono">TU GPA Criteria Compliant</p>
            </div>
          </div>

          {/* Quick Academic Profile Summary Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-transparent border border-indigo-500/10 text-xs text-slate-400 space-y-2.5">
            <h4 className="font-sans font-bold text-white text-sm flex items-center">
              <GraduationCap className="h-4.5 w-4.5 text-indigo-400 mr-2" />
              Portal Scholar Integrity
            </h4>
            <p className="leading-relaxed">
              As a logged-in scholar, your profile supports personal academic trackers. Contribute verified PDF files to earn a <b>TU Contributor badge</b> on notices lists!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
