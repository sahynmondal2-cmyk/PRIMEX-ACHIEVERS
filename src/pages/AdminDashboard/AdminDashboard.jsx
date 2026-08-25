import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, FileText, CreditCard, 
  Settings, LogOut, TrendingUp, IndianRupee, Activity
} from 'lucide-react';

function AdminOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Platform Overview</h2>
        <div className="flex gap-2">
          <button className="bg-white/5 border border-white/10 text-slate-300 px-4 py-2 rounded-lg text-sm hover:text-white transition-colors">Export Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "₹24.5L", icon: IndianRupee, color: "text-emerald-400" },
          { label: "Active Students", value: "1,240", icon: Users, color: "text-blue-400" },
          { label: "Total Courses", value: "54", icon: BookOpen, color: "text-purple-400" },
          { label: "Tests Attempted", value: "15k+", icon: Activity, color: "text-brand-400" }
        ].map((stat, i) => (
          <div key={i} className="bg-dark-card border border-dark-border rounded-2xl p-6 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-current opacity-[0.03] ${stat.color} rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110`} />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-3xl font-display font-bold text-white">{stat.value}</span>
              <span className="text-xs text-emerald-400 flex items-center mb-1"><TrendingUp className="w-3 h-3 mr-1" /> +12%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Recent Payments</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-dark-bg/50 border-b border-dark-border">
                <tr>
                  <th className="px-4 py-3 font-medium">Student</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Rahul Sharma", amount: "₹4,999", status: "Success", date: "Today, 10:24 AM" },
                  { name: "Priya Patel", amount: "₹3,999", status: "Success", date: "Today, 09:15 AM" },
                  { name: "Amit Kumar", amount: "₹1,999", status: "Pending", date: "Yesterday" },
                  { name: "Sneha Reddy", amount: "₹5,999", status: "Success", date: "Yesterday" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-dark-border/50 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-200">{row.name}</td>
                    <td className="px-4 py-3 font-mono text-slate-300">{row.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        row.status === 'Success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 
                        'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Top Performing Courses</h3>
          <div className="space-y-4">
            {[
              { name: "Complete JEE Mains & Advanced", students: 5400, rev: "₹2.6Cr" },
              { name: "NEET Biology Masterclass", students: 4200, rev: "₹1.6Cr" },
              { name: "CAT Quant & DILR", students: 4900, rev: "₹3.4Cr" },
              { name: "UPSC CSAT Complete Guide", students: 3800, rev: "₹2.2Cr" }
            ].map((course, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <h4 className="font-medium text-white text-sm line-clamp-1 mb-1">{course.name}</h4>
                  <span className="text-xs text-slate-400">{course.students.toLocaleString()} Students</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-400">{course.rev}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const location = useLocation();
  const path = location.pathname.split('/').pop();

  const menu = [
    { name: "Overview", path: "overview", icon: LayoutDashboard },
    { name: "Manage Courses", path: "courses", icon: BookOpen },
    { name: "Manage Students", path: "students", icon: Users },
    { name: "Mock Tests", path: "tests", icon: FileText },
    { name: "Payments", path: "payments", icon: CreditCard },
    { name: "Settings", path: "settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Sidebar */}
      <div className="w-64 bg-dark-card border-r border-dark-border hidden md:flex flex-col shrink-0">
        <div className="p-6 border-b border-dark-border flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl text-white">PRIMEX</span>
            <span className="text-[10px] tracking-widest text-brand-400 uppercase">Admin Panel</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item) => {
            const isActive = path === item.path || (path === 'admin' && item.path === 'overview');
            return (
              <Link
                key={item.path}
                to={`/admin/${item.path === 'overview' ? '' : item.path}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-dark-border">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <LogOut className="w-5 h-5" />
            Back to Site
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-16 bg-dark-card border-b border-dark-border flex items-center px-6 md:hidden">
          <h2 className="text-white font-bold">Admin Dashboard</h2>
        </div>
        <div className="p-6 md:p-8 flex-1 overflow-y-auto bg-[#0a0a1f]">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="*" element={<div className="text-slate-400">Admin Section coming soon...</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
