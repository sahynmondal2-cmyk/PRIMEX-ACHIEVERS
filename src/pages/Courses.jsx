import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, User, BookOpen, Star, Play } from 'lucide-react';
import { MOCK_COURSES } from '../utils/mockData';

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Competitive Exams', 'School', 'Foundation', 'Special Courses'];

  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-dark-card border-b border-dark-border pt-12 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-900/40 to-transparent" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Explore Our Courses</h1>
          <p className="text-slate-400 max-w-2xl text-lg mb-10">
            Expert-led instruction designed to help you achieve top ranks and academic excellence. 
            Find the perfect program for your goals.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text"
                placeholder="Search for courses, subjects, or exams..."
                className="w-full bg-dark-bg border border-dark-border rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn-primary py-4 px-8 flex items-center justify-center gap-2">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl -mt-8 relative z-20">
        {/* Categories */}
        <div className="flex overflow-x-auto gap-3 pb-6 mb-8 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeCategory === category 
                  ? 'bg-brand-500 text-white shadow-[0_0_15px_rgba(86,102,232,0.4)]' 
                  : 'bg-dark-card text-slate-300 border border-dark-border hover:border-brand-500/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full border border-dark-border hover:border-brand-500/30 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:shadow-brand-500/10"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/20 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 bg-dark-bg/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-brand-300 border border-white/10">
                    {course.category}
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {course.discount}% OFF
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="bg-dark-bg/80 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-white flex items-center gap-1 border border-white/10">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {course.rating}
                    </div>
                    <div className="bg-dark-bg/80 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-white border border-white/10">
                      ({course.reviews} reviews)
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-brand-300 transition-colors">{course.title}</h3>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-slate-400 mb-6">
                    <span className="flex items-center gap-2"><User className="w-4 h-4 text-brand-400" /> {course.faculty}</span>
                    <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-brand-400" /> {course.lessons} Lessons</span>
                    <span className="flex items-center gap-2"><Play className="w-4 h-4 text-brand-400" /> {course.duration}</span>
                    <span className="flex items-center gap-2"><Star className="w-4 h-4 text-brand-400" /> {course.students}+ Students</span>
                  </div>
                  
                  <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 line-through">₹{course.originalPrice}</span>
                      <span className="text-2xl font-display font-bold text-white">₹{course.price}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/courses/${course.id}`} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-white/10">
                        Details
                      </Link>
                      <Link to={`/checkout/${course.id}`} className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-brand-500/20">
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-dark-card rounded-full flex items-center justify-center border border-dark-border mb-6">
              <Search className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No courses found</h3>
            <p className="text-slate-400">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveCategory('All');}}
              className="mt-6 text-brand-400 hover:text-brand-300 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
