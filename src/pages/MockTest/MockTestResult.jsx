import { useLocation, Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Clock, CheckCircle2, XCircle, MinusCircle, BarChart3, ArrowRight, Download } from 'lucide-react';
import { MOCK_TESTS } from '../../utils/mockData';
// Optional: import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function MockTestResult() {
  const { id } = useParams();
  const location = useLocation();
  const test = MOCK_TESTS.find(t => t.id === id) || MOCK_TESTS[0];

  if (!location.state) {
    return <Navigate to={`/mock-test/${id}`} />;
  }

  const { answers, total, answered, timeSpent } = location.state;
  
  // Calculate mock result
  // Assuming 25% correct, 25% wrong, 50% unattempted for demo if randomly clicked
  // We'll generate a realistic looking result based on number of answers
  const correct = Math.floor(answered * 0.7);
  const wrong = answered - correct;
  const skipped = total - answered;
  
  const marksPerQuestion = Math.round(test.marks / total);
  const negativeMarking = parseFloat(test.negativeMarking);
  
  const score = (correct * marksPerQuestion) + (wrong * negativeMarking);
  const percentage = (score / test.marks) * 100;
  
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
  };

  const getRank = () => {
    if (percentage > 90) return "Top 1%";
    if (percentage > 80) return "Top 5%";
    if (percentage > 60) return "Top 20%";
    return "Top 50%";
  };

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/dashboard" className="text-brand-400 hover:text-brand-300 text-sm font-medium">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-display font-bold text-white mt-4">Test Result: {test.title}</h1>
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" /> Report
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Score Card */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-8 border-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px]" />
              
              <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="relative">
                  {/* Fake Circular Progress */}
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle cx="96" cy="96" r="88" className="stroke-dark-border" strokeWidth="12" fill="none" />
                    <circle 
                      cx="96" cy="96" r="88" 
                      className="stroke-brand-500" 
                      strokeWidth="12" 
                      fill="none" 
                      strokeDasharray={2 * Math.PI * 88}
                      strokeDashoffset={2 * Math.PI * 88 * (1 - Math.max(0, percentage) / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-display font-bold text-white">{Math.max(0, score)}</span>
                    <span className="text-sm text-slate-400">out of {test.marks}</span>
                  </div>
                </div>

                <div className="flex-1 w-full text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {percentage >= 80 ? "Excellent Performance! 🏆" : 
                     percentage >= 60 ? "Good Job! Keep practicing. 👍" : 
                     "Needs Improvement. Don't give up! 💪"}
                  </h2>
                  <p className="text-slate-400 mb-6">You scored better than {getRank()} of the {test.studentsAttempted.toLocaleString()} students who took this test.</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="text-slate-400 text-xs mb-1 flex items-center justify-center md:justify-start gap-1">
                        <Clock className="w-3 h-3" /> Time Taken
                      </div>
                      <div className="text-white font-bold">{formatTime(timeSpent)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="text-slate-400 text-xs mb-1 flex items-center justify-center md:justify-start gap-1">
                        <Trophy className="w-3 h-3 text-yellow-400" /> Rank
                      </div>
                      <div className="text-white font-bold text-lg">{getRank()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 glass-card rounded-2xl p-8 border-white/10"
            >
              <h3 className="text-lg font-bold text-white mb-6">Subject-wise Analysis</h3>
              
              <div className="space-y-6">
                {[
                  { name: "Physics", score: 45, max: 100, color: "bg-blue-500" },
                  { name: "Chemistry", score: 85, max: 100, color: "bg-purple-500" },
                  { name: "Mathematics", score: 60, max: 100, color: "bg-emerald-500" }
                ].map(sub => (
                  <div key={sub.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white font-medium">{sub.name}</span>
                      <span className="text-slate-400">{sub.score} / {sub.max}</span>
                    </div>
                    <div className="h-2 w-full bg-dark-bg rounded-full overflow-hidden">
                      <div className={`h-full ${sub.color} rounded-full`} style={{ width: `${(sub.score/sub.max)*100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl p-6 border-white/10"
            >
              <h3 className="text-lg font-bold text-white mb-6">Question Analysis</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-slate-200">Correct</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-lg">{correct}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="text-slate-200">Incorrect</span>
                  </div>
                  <span className="text-red-400 font-bold text-lg">{wrong}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-500/10 border border-slate-500/20">
                  <div className="flex items-center gap-3">
                    <MinusCircle className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-200">Skipped</span>
                  </div>
                  <span className="text-slate-400 font-bold text-lg">{skipped}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Accuracy</span>
                  <span className="text-white font-bold">{answered > 0 ? Math.round((correct/answered)*100) : 0}%</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6 border-brand-500/30 bg-gradient-to-b from-brand-900/40 to-transparent"
            >
              <h3 className="text-lg font-bold text-white mb-2">Review Answers</h3>
              <p className="text-sm text-slate-400 mb-6">Check detailed step-by-step solutions for all questions to identify your mistakes.</p>
              
              <button className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 mb-3">
                View Solutions <ArrowRight className="w-4 h-4" />
              </button>
              
              <Link to={`/mock-test/${id}`} className="btn-secondary w-full py-3 text-sm flex items-center justify-center gap-2 bg-transparent text-center">
                Retake Test
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
