import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, BookOpen, Clock, Award, CheckCircle2, User, 
  Star, FileText, Download, ChevronDown, ChevronUp 
} from 'lucide-react';
import { MOCK_COURSES } from '../utils/mockData';

export default function CourseDetails() {
  const { id } = useParams();
  const course = MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0];
  const [activeTab, setActiveTab] = useState('overview');
  const [openModule, setOpenModule] = useState(0);

  const curriculum = [
    { title: "Module 1: Introduction and Fundamentals", lessons: 12, duration: "8 hrs" },
    { title: "Module 2: Advanced Concepts and Theory", lessons: 24, duration: "16 hrs" },
    { title: "Module 3: Problem Solving Strategies", lessons: 18, duration: "12 hrs" },
    { title: "Module 4: Previous Year Papers Analysis", lessons: 15, duration: "10 hrs" },
    { title: "Module 5: Mock Tests & Discussions", lessons: 10, duration: "15 hrs" }
  ];

  return (
    <div className="min-h-screen bg-dark-bg pb-24">
      {/* Course Hero */}
      <div className="relative pt-12 pb-24 border-b border-dark-border">
        <div className="absolute inset-0 z-0">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-20 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg to-dark-bg"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full text-xs font-medium border border-brand-500/30">
                  {course.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-yellow-400 font-medium">
                  <Star className="w-4 h-4 fill-yellow-400" /> {course.rating} ({course.reviews} reviews)
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                {course.title}
              </h1>
              
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                {course.description} Get complete access to video lectures, study materials, mock tests, and live doubt clearing sessions.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-dark-card border border-dark-border flex items-center justify-center overflow-hidden">
                    <User className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Created by</p>
                    <p className="text-sm font-semibold text-white">{course.faculty}</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-white/10 hidden md:block"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-900/50 flex items-center justify-center text-brand-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Lessons</p>
                    <p className="text-sm font-semibold text-white">{course.lessons} Lectures</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-white/10 hidden md:block"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-dark/20 flex items-center justify-center text-accent-light">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Duration</p>
                    <p className="text-sm font-semibold text-white">{course.duration}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Pricing Card */}
            <div className="lg:col-span-1 relative">
              <div className="glass-card rounded-2xl p-6 border-white/10 sticky top-24 z-20">
                <div className="relative h-48 rounded-xl overflow-hidden mb-6 group cursor-pointer border border-white/5">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/20">
                    <div className="w-16 h-16 rounded-full bg-brand-500/90 backdrop-blur-sm flex items-center justify-center pl-1 shadow-xl shadow-brand-500/30 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-medium">
                    Preview Course
                  </div>
                </div>

                <div className="flex items-end gap-3 mb-6">
                  <span className="text-4xl font-display font-bold text-white">₹{course.price}</span>
                  <span className="text-lg text-slate-500 line-through mb-1">₹{course.originalPrice}</span>
                  <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold mb-1 border border-emerald-500/30">
                    {course.discount}% OFF
                  </span>
                </div>

                <Link to={`/checkout/${course.id}`} className="btn-primary w-full block text-center mb-4 text-lg py-4">
                  Buy Now
                </Link>
                
                <p className="text-xs text-center text-slate-400 mb-6">30-Day Money-Back Guarantee</p>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider">This course includes:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <Play className="w-4 h-4 text-brand-400" /> {course.duration} on-demand video
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <FileText className="w-4 h-4 text-brand-400" /> 25+ Downloadable PDF resources
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <BookOpen className="w-4 h-4 text-brand-400" /> 10 Full-length mock tests
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <Award className="w-4 h-4 text-brand-400" /> Certificate of completion
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-6 max-w-7xl pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-dark-border mb-8 scrollbar-hide">
              {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium capitalize whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab 
                      ? 'border-brand-500 text-brand-400' 
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              
              {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-4">About this Course</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      This comprehensive program is meticulously designed by top educators to provide you with an edge in your preparation. 
                      Starting from the very basics, it builds up to advanced problem-solving techniques necessary for securing a top rank.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      You will get access to structured theory modules, hundreds of solved examples, assignments with video solutions, and a rigorous testing system that simulates the real exam environment.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-4">What you'll learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Complete conceptual clarity from basics to advanced level",
                        "Time management strategies and short-trick methods",
                        "In-depth analysis of previous years' question papers",
                        "Real-time exam simulation through adaptive mock tests",
                        "Doubt clearing mechanisms and personalized mentorship",
                        "Comprehensive revision strategies for final month"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'curriculum' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-display font-bold text-white">Course Curriculum</h3>
                    <span className="text-sm text-slate-400">{course.lessons} lectures • {course.duration}</span>
                  </div>
                  
                  <div className="space-y-4">
                    {curriculum.map((module, idx) => (
                      <div key={idx} className="border border-dark-border bg-dark-card rounded-xl overflow-hidden">
                        <button 
                          className="w-full px-6 py-4 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
                          onClick={() => setOpenModule(openModule === idx ? -1 : idx)}
                        >
                          <div className="flex items-center gap-4 text-left">
                            {openModule === idx ? <ChevronUp className="w-5 h-5 text-brand-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                            <span className="font-semibold text-white">{module.title}</span>
                          </div>
                          <span className="text-xs text-slate-400 hidden sm:block">{module.lessons} lectures • {module.duration}</span>
                        </button>
                        
                        {openModule === idx && (
                          <div className="px-6 py-2 border-t border-dark-border">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                  <Play className="w-4 h-4 text-brand-400" />
                                  <span className="text-sm text-slate-300 hover:text-brand-300 cursor-pointer transition-colors">Lesson {i + 1}: Important concepts and theory</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                  {i === 0 && <span className="bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded border border-brand-500/30">Preview</span>}
                                  <span>45:00</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'instructor' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 rounded-2xl border-white/5">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-full bg-dark-card border border-dark-border flex items-center justify-center overflow-hidden shrink-0">
                      <User className="w-10 h-10 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{course.faculty}</h3>
                      <p className="text-brand-400 text-sm mb-4">Senior Faculty Member, PRIMEX ACHIEVERS</p>
                      
                      <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Star className="w-4 h-4 text-yellow-400" /> 4.9 Instructor Rating
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <User className="w-4 h-4 text-brand-400" /> 50,000+ Students
                        </div>
                      </div>
                      
                      <p className="text-slate-300 text-sm leading-relaxed">
                        With over 15 years of teaching experience, {course.faculty} has mentored thousands of students to secure top ranks in competitive exams. Known for breaking down complex concepts into simple, understandable segments, their teaching methodology focuses heavily on practical application and logical reasoning.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex items-center gap-6 mb-8 bg-dark-card p-6 rounded-2xl border border-dark-border">
                    <div className="text-center">
                      <div className="text-5xl font-display font-bold text-white mb-2">{course.rating}</div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />)}
                      </div>
                      <div className="text-xs text-slate-400">Course Rating</div>
                    </div>
                    <div className="flex-grow space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-3 text-sm">
                          <span className="w-12 text-slate-400 flex items-center gap-1">{star} <Star className="w-3 h-3" /></span>
                          <div className="flex-grow h-2 bg-dark-bg rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : 2}%` }}></div>
                          </div>
                          <span className="w-8 text-right text-slate-500 text-xs">{star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '5%' : '2%'}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[1, 2, 3].map((_, idx) => (
                      <div key={idx} className="border-b border-dark-border pb-6 last:border-0">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center text-brand-300 font-bold">
                            S
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-white text-sm">Student Name</h4>
                              <span className="text-xs text-slate-500">2 weeks ago</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          This course is absolutely fantastic. The way concepts are explained is very intuitive. The practice materials and mock tests provided at the end of each module have really boosted my confidence. Definitely worth the investment!
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
