import { useState } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, FileText, Award, CreditCard, 
  Settings, LogOut, Play, CheckCircle2, Clock 
} from 'lucide-react';
import { MOCK_COURSES } from '../../utils/mockData';

function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Courses Enrolled", value: "3", icon: BookOpen, color: "text-blue-400" },
          { label: "Tests Attempted", value: "12", icon: FileText, color: "text-purple-400" },
          { label: "Average Score", value: "78%", icon: Award, color: "text-emerald-400" },
          { label: "Learning Hours", value: "45h", icon: Clock, color: "text-brand-400" }
        ].map((stat, i) => (
          <div key={i} className="bg-dark-card border border-dark-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <span className="text-3xl font-display font-bold text-white">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Continue Learning</h3>
          <div className="space-y-4">
            {MOCK_COURSES.slice(0, 2).map((course, i) => (
              <div key={course.id} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                <img src={course.image} alt={course.title} className="w-24 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm line-clamp-1 mb-1">{course.title}</h4>
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Module {i+2}: Advanced Concepts</span>
                    <span>{65 - (i*20)}% Completed</span>
                  </div>
                  <div className="h-1.5 w-full bg-dark-bg rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${65 - (i*20)}%` }}></div>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 hover:bg-brand-500 hover:text-white transition-colors shrink-0 self-center">
                  <Play className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Recent Test Results</h3>
          <div className="space-y-4">
            {[
              { name: "JEE Full Mock 1", score: "245/300", date: "2 days ago" },
              { name: "Physics Part Test", score: "85/100", date: "5 days ago" },
              { name: "Maths Calculus", score: "72/80", date: "1 week ago" }
            ].map((test, i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-medium text-white text-sm">{test.name}</h4>
                  <span className="text-xs text-slate-500">{test.date}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-400">{test.score}</div>
                  <Link to={`/mock-test/t1/result`} className="text-[10px] text-brand-400 hover:underline">View Report</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const location = useLocation();
  const path = location.pathname.split('/').pop();

  const menu = [
    { name: "Overview", path: "overview", icon: LayoutDashboard },
    { name: "My Courses", path: "courses", icon: BookOpen },
    { name: "Mock Tests", path: "tests", icon: FileText },
    { name: "Certificates", path: "certificates", icon: Award },
    { name: "Payments", path: "payments", icon: CreditCard },
    { name: "Settings", path: "settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Sidebar */}
      <div className="w-64 bg-dark-card border-r border-dark-border hidden md:flex flex-col shrink-0">
        <div className="p-6 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-400 to-accent-dark flex items-center justify-center text-xl font-bold text-white shadow-lg">
              S
            </div>
            <div>
              <h3 className="font-bold text-white leading-tight">Student Name</h3>
              <p className="text-xs text-brand-400">Pro Member</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item) => {
            const isActive = path === item.path || (path === 'dashboard' && item.path === 'overview');
            return (
              <Link
                key={item.path}
                to={`/dashboard/${item.path === 'overview' ? '' : item.path}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-dark-border">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-16 bg-dark-card border-b border-dark-border flex items-center px-6 md:hidden">
          <h2 className="text-white font-bold">Student Dashboard</h2>
        </div>
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            {/* Other routes can be added here for a full implementation */}
            <Route path="*" element={<div className="text-slate-400">Section coming soon...</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
