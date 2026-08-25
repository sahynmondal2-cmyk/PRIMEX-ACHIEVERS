import { useEffect, useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Download, BookOpen, ArrowRight } from 'lucide-react';
import { MOCK_COURSES } from '../../utils/mockData';


export default function PaymentSuccess() {
  const location = useLocation();
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Handle direct access without state
  if (!location.state) {
    return <Navigate to="/courses" />;
  }

  const { courseId, amount, transactionId } = location.state;
  const course = MOCK_COURSES.find(c => c.id === courseId) || MOCK_COURSES[0];

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg py-20 relative overflow-hidden flex items-center justify-center">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center border-emerald-500/30"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2, duration: 0.6 }}
            className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-emerald-500/50"
          >
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-slate-400 mb-8">Thank you for your purchase. Your learning journey begins now.</p>

          <div className="bg-dark-bg rounded-2xl p-6 mb-8 text-left border border-white/5">
            <div className="flex gap-4 items-center mb-6 pb-6 border-b border-white/10">
              <img src={course.image} alt={course.title} className="w-16 h-12 object-cover rounded" />
              <div>
                <h3 className="text-sm font-semibold text-white">{course.title}</h3>
                <p className="text-xs text-slate-400">Lifetime Access</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div className="text-slate-400">Transaction ID</div>
              <div className="text-white font-mono text-right">{transactionId}</div>
              
              <div className="text-slate-400">Date</div>
              <div className="text-white text-right">{new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
              
              <div className="text-slate-400">Amount Paid</div>
              <div className="text-white font-bold text-right">₹{amount}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-secondary py-3 px-6 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download Receipt
            </button>
            <Link to="/dashboard" className="btn-primary py-3 px-6 flex items-center justify-center gap-2">
              Start Learning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
