import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Info, Flag, ChevronRight, ChevronLeft, LayoutGrid } from 'lucide-react';
import { MOCK_TESTS } from '../../utils/mockData';

// Mock questions generator
const generateQuestions = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    text: `Sample question ${i + 1}: Which of the following is correct regarding the theory of relativity? This is a mock question to simulate the real test environment.`,
    options: [
      "It depends on the observer's frame of reference",
      "Time remains constant in all frames",
      "Speed of light varies with the source",
      "Mass decreases as velocity approaches speed of light"
    ],
    status: 'unvisited' // unvisited, answered, unanswered, marked, marked_answered
  }));
};

export default function MockTestInterface() {
  const { id } = useParams();
  const navigate = useNavigate();
  const test = MOCK_TESTS.find(t => t.id === id) || MOCK_TESTS[0];
  
  const [questions, setQuestions] = useState(generateQuestions(test.questions > 20 ? 20 : test.questions)); // Cap at 20 for demo
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(test.duration * 60);
  const [showPaletteMobile, setShowPaletteMobile] = useState(false);

  useEffect(() => {
    // Mark first question as visited
    const newQs = [...questions];
    if(newQs[0].status === 'unvisited') newQs[0].status = 'unanswered';
    setQuestions(newQs);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      submitTest();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentQIdx];

  const handleOptionSelect = (optionIdx) => {
    setAnswers({ ...answers, [currentQ.id]: optionIdx });
  };

  const clearResponse = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQ.id];
    setAnswers(newAnswers);
  };

  const navigateToQuestion = (idx) => {
    const newQs = [...questions];
    if(newQs[idx].status === 'unvisited') {
      newQs[idx].status = 'unanswered';
    }
    setQuestions(newQs);
    setCurrentQIdx(idx);
    setShowPaletteMobile(false);
  };

  const handleNext = (status) => {
    const newQs = [...questions];
    const hasAnswer = answers[currentQ.id] !== undefined;
    
    if (status === 'save') {
      newQs[currentQIdx].status = hasAnswer ? 'answered' : 'unanswered';
    } else if (status === 'mark') {
      newQs[currentQIdx].status = hasAnswer ? 'marked_answered' : 'marked';
    }

    setQuestions(newQs);

    if (currentQIdx < questions.length - 1) {
      navigateToQuestion(currentQIdx + 1);
    }
  };

  const submitTest = () => {
    // Calculate basic mock score
    const answeredCount = Object.keys(answers).length;
    navigate(`/mock-test/${test.id}/result`, { 
      state: { 
        answers, 
        total: questions.length, 
        answered: answeredCount,
        timeSpent: test.duration * 60 - timeLeft
      } 
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'answered': return 'bg-emerald-500 text-white border-emerald-600';
      case 'unanswered': return 'bg-red-500 text-white border-red-600';
      case 'marked': return 'bg-purple-500 text-white border-purple-600';
      case 'marked_answered': return 'bg-purple-500 text-white border-emerald-500 border-2';
      default: return 'bg-transparent text-slate-300 border-slate-600';
    }
  };

  const stats = {
    answered: questions.filter(q => q.status === 'answered').length,
    unanswered: questions.filter(q => q.status === 'unanswered').length,
    marked: questions.filter(q => q.status === 'marked' || q.status === 'marked_answered').length,
    unvisited: questions.filter(q => q.status === 'unvisited').length,
  };

  // Fullscreen layout hiding navbar
  return (
    <div className="fixed inset-0 bg-dark-bg z-[100] flex flex-col font-sans">
      {/* Header */}
      <div className="bg-dark-card border-b border-dark-border h-16 flex items-center justify-between px-4 sm:px-6 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-white font-bold text-lg hidden sm:block">{test.title}</h1>
          <h1 className="text-white font-bold text-lg sm:hidden">PRIMEX Test</h1>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 bg-brand-900/30 px-3 sm:px-4 py-1.5 rounded-lg border border-brand-500/20">
            <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-brand-400'}`} />
            <span className={`font-mono font-bold text-lg ${timeLeft < 300 ? 'text-red-400' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <button onClick={() => setShowPaletteMobile(!showPaletteMobile)} className="lg:hidden p-2 text-slate-300 hover:text-white bg-white/5 rounded-lg border border-white/10">
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Question Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          
          <div className="h-12 bg-white/5 border-b border-dark-border flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-white font-bold">Question {currentQIdx + 1}</span>
              <span className="text-xs text-slate-400">/ {questions.length}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> +{Math.round(test.marks/test.questions)}
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> {test.negativeMarking}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-lg text-white mb-8 leading-relaxed">
                {currentQ.text}
              </div>

              <div className="space-y-4">
                {currentQ.options.map((opt, idx) => (
                  <label 
                    key={idx} 
                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                      answers[currentQ.id] === idx 
                        ? 'bg-brand-500/10 border-brand-500' 
                        : 'bg-dark-card border-dark-border hover:border-slate-600'
                    }`}
                  >
                    <div className="pt-1">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers[currentQ.id] === idx ? 'border-brand-500 bg-brand-500' : 'border-slate-500'}`}>
                        {answers[currentQ.id] === idx && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                    </div>
                    <span className="text-slate-300">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="h-16 sm:h-20 bg-dark-card border-t border-dark-border flex items-center justify-between px-4 sm:px-6 shrink-0 gap-2">
            <div className="flex gap-2 sm:gap-4">
              <button onClick={clearResponse} className="px-3 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium border border-white/10 text-slate-300 hover:bg-white/5 transition-colors">
                Clear Response
              </button>
              <button onClick={() => handleNext('mark')} className="px-3 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30 transition-colors flex items-center gap-2">
                <Flag className="w-4 h-4 hidden sm:block" /> Mark for Review
              </button>
            </div>
            
            <button onClick={() => handleNext('save')} className="px-6 sm:px-8 py-2 rounded-lg text-sm font-bold bg-brand-500 text-white hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 flex items-center gap-2">
              Save & Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Palette Sidebar */}
        <div className={`w-80 bg-dark-card border-l border-dark-border flex flex-col fixed lg:relative right-0 top-16 lg:top-0 bottom-0 z-50 transition-transform duration-300 ${showPaletteMobile ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
          <div className="p-4 border-b border-dark-border shrink-0">
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
              <div className="flex items-center gap-2"><div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center text-white">{stats.answered}</div> Answered</div>
              <div className="flex items-center gap-2"><div className="w-5 h-5 rounded bg-red-500 flex items-center justify-center text-white">{stats.unanswered}</div> Unanswered</div>
              <div className="flex items-center gap-2"><div className="w-5 h-5 rounded bg-purple-500 flex items-center justify-center text-white">{stats.marked}</div> Marked</div>
              <div className="flex items-center gap-2"><div className="w-5 h-5 rounded border border-slate-600 flex items-center justify-center text-slate-400">{stats.unvisited}</div> Not Visited</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-sm font-semibold text-white mb-4">Physics Section</h3>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => navigateToQuestion(idx)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center font-bold text-sm border transition-transform hover:scale-105 ${getStatusColor(q.status)} ${currentQIdx === idx ? 'ring-2 ring-brand-400 ring-offset-2 ring-offset-dark-card' : ''}`}
                >
                  {q.id}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-dark-border shrink-0 bg-dark-bg/50">
            <button 
              onClick={() => {
                if(window.confirm("Are you sure you want to submit the test?")) {
                  submitTest();
                }
              }}
              className="w-full py-3 rounded-lg text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Submit Test
            </button>
          </div>
        </div>
        
        {/* Mobile backdrop */}
        {showPaletteMobile && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setShowPaletteMobile(false)} />
        )}
      </div>
    </div>
  );
}
