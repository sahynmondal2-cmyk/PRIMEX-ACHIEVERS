import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Play, Trophy, Users, User, Star, BarChart3, Clock, BookOpen } from 'lucide-react';
import { MOCK_COURSES, MOCK_TESTS } from '../utils/mockData';

export default function Home() {
  const featuredCourses = MOCK_COURSES.slice(0, 3);
  const featuredTests = MOCK_TESTS.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-dark-bg z-0" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-accent-dark/20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Hero Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                <span className="text-xs font-medium text-slate-300">New Batches Starting Soon</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1]">
                Your Preparation.<br />
                <span className="text-gradient">Our Platform.</span><br />
                Your Achievement.
              </h1>
              
              <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
                Learn from structured courses, practice with powerful mock tests, track your progress and move closer to your goals.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link to="/courses" className="btn-primary flex items-center gap-2">
                  Explore Courses <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/mock-test/t1" className="btn-secondary flex items-center gap-2">
                  Start Free Mock Test
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-white/10">
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-display font-bold text-white">50+</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Courses</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-display font-bold text-white">10k+</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Mock Attempts</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-display font-bold text-white">98%</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Satisfaction</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Visual Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 glass-card rounded-2xl p-6 shadow-2xl border-white/10 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                {/* Mock Dashboard UI */}
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-400 to-accent-dark flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Welcome back, Student</h4>
                      <p className="text-xs text-slate-400">Ready to conquer your goals?</p>
                    </div>
                  </div>
                  <div className="bg-brand-500/20 text-brand-300 text-xs px-3 py-1 rounded-full font-medium border border-brand-500/30">
                    Pro Plan
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-4 h-4 text-brand-400" />
                      <span className="text-xs text-slate-400">Mock Score</span>
                    </div>
                    <span className="text-2xl font-bold text-white">284/300</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-accent-light" />
                      <span className="text-xs text-slate-400">Study Time</span>
                    </div>
                    <span className="text-2xl font-bold text-white">42 hrs</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-brand-900/50 to-dark-card rounded-xl p-4 border border-brand-500/20">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-white">Current Course Progress</span>
                    <span className="text-xs text-brand-400">68%</span>
                  </div>
                  <div className="w-full h-2 bg-dark-bg rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-400 to-accent-light w-[68%] rounded-full relative">
                      <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 glass-panel rounded-xl p-4 shadow-xl border-white/10 z-20 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">All India Rank</p>
                  <p className="text-lg font-bold text-white">Top 1%</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 glass-panel rounded-xl p-4 shadow-xl border-white/10 z-20 flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-brand-500 border-2 border-dark-card"></div>
                  <div className="w-8 h-8 rounded-full bg-accent-dark border-2 border-dark-card"></div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-dark-card"></div>
                </div>
                <div className="text-xs text-slate-300 font-medium">Joined by 50k+ students</div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 bg-dark-card border-y border-dark-border relative">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Master Your Subjects with <span className="text-brand-400">Expert Faculty</span></h2>
              <p className="text-slate-400">Comprehensive structured courses designed to build strong foundations and advanced problem-solving skills.</p>
            </div>
            <Link to="/courses" className="text-brand-400 hover:text-brand-300 font-medium flex items-center gap-2 transition-colors">
              View All Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <motion.div 
                key={course.id}
                whileHover={{ y: -10 }}
                className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-dark-bg/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-brand-300 border border-white/10">
                    {course.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{course.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> {course.faculty}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {course.lessons} Lessons</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-6 line-clamp-2 flex-grow">{course.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                    <div>
                      <span className="text-2xl font-bold text-white">₹{course.price}</span>
                      <span className="text-sm text-slate-500 line-through ml-2">₹{course.originalPrice}</span>
                    </div>
                    <Link to={`/courses/${course.id}`} className="px-4 py-2 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 rounded-lg text-sm font-medium transition-colors border border-brand-500/20">
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial & Results */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600/10 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <span className="text-brand-400 font-semibold tracking-wider uppercase text-sm mb-4 block">Proven Results</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-16 max-w-3xl mx-auto">
            Join Thousands of Students Who Achieved Their Dreams With Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "The structured curriculum and mock tests exactly replicate the real exam environment. Highly recommended!", name: "Rahul S.", exam: "JEE Advanced AIR 420" },
              { text: "Faculty support is unmatched. The video solutions for tests helped me identify my weak areas instantly.", name: "Priya M.", exam: "NEET Score: 685" },
              { text: "Best platform for serious preparation. The analytics dashboard tells you exactly what to study next.", name: "Amit K.", exam: "CAT 99.8%ile" }
            ].map((t, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl border-white/5 text-left relative">
                <div className="text-brand-500 mb-4 opacity-50">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                </div>
                <p className="text-slate-300 mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-400 to-accent-dark flex items-center justify-center font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{t.name}</h4>
                    <span className="text-xs text-brand-400">{t.exam}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900 to-dark-bg z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-0" />
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center glass-card rounded-3xl p-12 border-brand-500/30">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Start Your Preparation?
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Join PRIMEX ACHIEVERS today and get access to premium courses, detailed mock tests, and expert faculty guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/courses" className="btn-primary w-full sm:w-auto text-lg px-8 py-4">
              Explore All Courses
            </Link>
            <Link to="/mock-test/t1" className="btn-secondary w-full sm:w-auto text-lg px-8 py-4 bg-white/5">
              Take Free Mock Test
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
