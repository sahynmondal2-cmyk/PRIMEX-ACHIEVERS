import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Clock, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { MOCK_TESTS } from '../../utils/mockData';

export default function MockTestInstructions() {
  const { id } = useParams();
  const test = MOCK_TESTS.find(t => t.id === id) || MOCK_TESTS[0];

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <div className="mb-8">
          <Link to="/courses" className="text-brand-400 hover:text-brand-300 text-sm font-medium">
            ← Back to Tests
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mt-4">{test.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-400">
            <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-brand-400" /> {test.questions} Questions</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand-400" /> {test.duration} Minutes</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-400" /> {test.marks} Max Marks</span>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 border-white/10"
        >
          <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">General Instructions</h2>
          
          <div className="space-y-4 mb-8 text-slate-300 text-sm leading-relaxed">
            <p><strong>1.</strong> The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself.</p>
            <p><strong>2.</strong> The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg border-2 border-slate-600 bg-transparent flex items-center justify-center font-bold text-xs text-slate-400">1</div>
                <span>You have not visited the question yet.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg border-2 border-red-500 bg-red-500/20 flex items-center justify-center font-bold text-xs text-red-400">2</div>
                <span>You have not answered the question.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg border-2 border-emerald-500 bg-emerald-500/20 flex items-center justify-center font-bold text-xs text-emerald-400">3</div>
                <span>You have answered the question.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg border-2 border-purple-500 bg-purple-500/20 flex items-center justify-center font-bold text-xs text-purple-400">4</div>
                <span>You have marked for review.</span>
              </div>
            </div>

            <h3 className="font-bold text-white text-base mt-6">Navigating & Answering</h3>
            <p><strong>3.</strong> To select your answer, click on the button of one of the options.</p>
            <p><strong>4.</strong> To deselect your chosen answer, click on the button of the chosen option again or click on the Clear Response button.</p>
            <p><strong>5.</strong> To save your answer, you MUST click on the Save & Next button.</p>
            <p><strong>6.</strong> To mark the question for review, click on the Mark for Review & Next button.</p>

            <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4 mt-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
              <p className="text-brand-100 text-sm">
                Marking Scheme: Correct answer fetches <strong>+{Math.round(test.marks/test.questions)}</strong> marks. Incorrect answer fetches <strong>{test.negativeMarking}</strong> marks. Unanswered questions fetch 0 marks.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-brand-500" required id="agree" />
              <span className="text-sm text-slate-300 select-none">I have read and understood the instructions.</span>
            </label>
            <Link 
              to={`/mock-test/${test.id}/take`} 
              className="btn-primary py-3 px-8 flex items-center gap-2"
              onClick={(e) => {
                if(!document.getElementById('agree').checked) {
                  e.preventDefault();
                  alert("Please agree to the instructions before proceeding.");
                }
              }}
            >
              Begin Test <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
