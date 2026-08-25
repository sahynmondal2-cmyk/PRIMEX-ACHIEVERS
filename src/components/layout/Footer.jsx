import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-dark-border pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand-900/40 via-dark-bg to-dark-bg pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-accent-dark flex items-center justify-center">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-none tracking-wide text-white">PRIMEX</span>
                <span className="font-sans font-semibold text-[10px] leading-none tracking-[0.2em] text-brand-300 uppercase">Achievers</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your Preparation. Our Platform. Your Achievement. Premium digital learning ecosystem for serious students.
            </p>

          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-white mb-2">Quick Links</h4>
            <Link to="/" className="text-slate-400 hover:text-brand-300 text-sm transition-colors">Home</Link>
            <Link to="/courses" className="text-slate-400 hover:text-brand-300 text-sm transition-colors">All Courses</Link>
            <Link to="/mock-test/t1" className="text-slate-400 hover:text-brand-300 text-sm transition-colors">Mock Tests</Link>
            <Link to="/dashboard" className="text-slate-400 hover:text-brand-300 text-sm transition-colors">Student Dashboard</Link>
            <Link to="/admin" className="text-slate-400 hover:text-brand-300 text-sm transition-colors">Admin Login</Link>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-white mb-2">Categories</h4>
            <a href="#" className="text-slate-400 hover:text-brand-300 text-sm transition-colors">Competitive Exams (JEE/NEET)</a>
            <a href="#" className="text-slate-400 hover:text-brand-300 text-sm transition-colors">School Curriculum</a>
            <a href="#" className="text-slate-400 hover:text-brand-300 text-sm transition-colors">Foundation Courses</a>
            <a href="#" className="text-slate-400 hover:text-brand-300 text-sm transition-colors">UPSC / State PSC</a>
            <a href="#" className="text-slate-400 hover:text-brand-300 text-sm transition-colors">Management (CAT)</a>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-white mb-2">Contact Us</h4>
            <div className="flex items-start gap-3 text-sm text-slate-400">
              <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
              <p>Primex Tower, Knowledge Park, Education Hub, New Delhi, 110016</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Phone className="w-4 h-4 text-brand-400 shrink-0" />
              <p>+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Mail className="w-4 h-4 text-brand-400 shrink-0" />
              <p>support@primexachievers.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} PRIMEX ACHIEVERS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
