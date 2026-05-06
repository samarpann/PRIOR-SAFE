import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Shield, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Defend Your Workforce.",
    subtitle: "PREMIUM INDUSTRIAL PROTECTION",
    description: "Equip your team with state-of-the-art Personal Protective Equipment. Gear that doesn't compromise on safety or comfort.",
    image: "/images/hero1.png",
    accent: "#b23a86",
    icon: <Shield size={18} />
  },
  {
    id: 2,
    title: "Precision Engineering.",
    subtitle: "ADVANCED OPTICAL GEAR",
    description: "Anti-fog, UV-resistant safety goggles and premium visors designed for high-risk environments.",
    image: "/images/hero2.png",
    accent: "#b23a86",
    icon: <Zap size={18} />
  },
  {
    id: 3,
    title: "Extreme Durability.",
    subtitle: "HEAVY-DUTY SAFETY GEAR",
    description: "Rigorous stress testing ensures every piece of gear surpasses global safety benchmarks.",
    image: "/images/hero3.png",
    accent: "#b23a86",
    icon: <Award size={18} />
  }
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl mb-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] scale-110 animate-slow-zoom"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
          <div className="absolute inset-0 bg-slate-950/20" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center px-12 md:px-24 z-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-600/20 backdrop-blur-md border border-industrial-600/30 rounded-full text-industrial-400 text-xs font-black uppercase tracking-widest mb-6"
            >
              {slides[current].icon}
              {slides[current].subtitle}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-7xl font-black text-white leading-[1] mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-brand)' }}
            >
              {slides[current].title.split(' ').map((word, i) => (
                <span key={i} className={i === slides[current].title.split(' ').length - 1 ? "text-industrial-600" : ""}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-slate-400 text-base md:text-lg max-w-xl mb-6 leading-relaxed font-medium"
            >
              {slides[current].description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-4"
            >
              <Link 
                to="/products"
                className="group flex items-center gap-3 bg-industrial-600 hover:bg-industrial-700 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-industrial-600/30 active:scale-95"
              >
                Get Started
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/about"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-2xl font-bold text-lg transition-all"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-12 flex items-center gap-4 z-20">
        <button 
          onClick={prevSlide}
          className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white transition-all active:scale-90"
        >
          <ArrowLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white transition-all active:scale-90"
        >
          <ArrowRight size={24} />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-12 left-12 flex gap-2 z-20">
        {slides.map((_, i) => (
          <div 
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${i === current ? "w-12 bg-industrial-600" : "w-4 bg-white/20"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
