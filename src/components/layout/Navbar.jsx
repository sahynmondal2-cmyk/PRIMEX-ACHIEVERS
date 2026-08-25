import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, User, LogOut } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Mock Tests', path: '/mock-test/t1' }, // Demo link
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-dark-bg/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-accent-dark flex items-center justify-center shadow-lg shadow-brand-500/20">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl leading-none tracking-wide text-white">PRIMEX</span>
            <span className="font-sans font-semibold text-[10px] leading-none tracking-[0.2em] text-brand-300 uppercase">Achievers</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-brand-300',
                    location.pathname === link.path ? 'text-brand-400' : 'text-slate-300'
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-dark-card border border-dark-border flex items-center justify-center">
                  <User className="w-4 h-4 text-brand-400" />
                </div>
                Dashboard
              </Link>
            ) : (
              <>
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Log In
                </button>
                <Link to="/courses" className="btn-primary py-2 px-5 text-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-dark-card border-b border-dark-border md:hidden p-6 shadow-2xl flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="block text-lg font-medium text-slate-300 hover:text-brand-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-px bg-dark-border w-full" />
          <div className="flex flex-col gap-4">
            {isLoggedIn ? (
              <Link to="/dashboard" className="btn-secondary text-center" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
            ) : (
              <>
                <button 
                  className="btn-secondary"
                  onClick={() => { setIsLoggedIn(true); setMobileMenuOpen(false); }}
                >
                  Log In
                </button>
                <Link to="/courses" className="btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
