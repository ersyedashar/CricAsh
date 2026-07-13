import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Trophy, TrendingUp, ArrowRight, Play, Star } from 'lucide-react';
import { Badge } from '../common';

const heroSlides = [
  {
    id: 1,
    title: 'Live Cricket\nat its Best',
    subtitle: 'Watch every ball, every run, every wicket — live.',
    cta: 'Watch Live',
    ctaLink: '/matches/live',
    secondary: 'Explore Players',
    secondaryLink: '/players',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=800&fit=crop',
    gradient: 'from-navy-900 via-navy-800/90 to-cricket-900/80',
  },
  {
    id: 2,
    title: 'T20 World Cup\nChampions',
    subtitle: 'India lifts the trophy — relive every moment.',
    cta: 'View Highlights',
    ctaLink: '/tournaments/t20-world-cup',
    secondary: 'Player Stats',
    secondaryLink: '/players',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop',
    gradient: 'from-cricket-900 via-cricket-800/90 to-navy-900/80',
  },
  {
    id: 3,
    title: 'Player\nDatabase',
    subtitle: 'Explore stats for every international cricketer.',
    cta: 'Explore Now',
    ctaLink: '/players',
    secondary: 'Compare',
    secondaryLink: '/compare',
    image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1200&h=800&fit=crop',
    gradient: 'from-primary-900 via-primary-800/90 to-navy-900/80',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
        </motion.div>
      </AnimatePresence>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-cricket-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
      </div>

      {/* Content */}
      <div className="container-premium relative z-10 pt-20">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="live" className="mb-4">
                <Zap className="w-3 h-3 mr-1" /> LIVE CRICKET
              </Badge>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight whitespace-pre-line mb-4">
                {slide.title}
              </h1>
              <p className="text-lg text-white/70 mb-8 max-w-lg">{slide.subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <Link to={slide.ctaLink} className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                  {slide.cta} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to={slide.secondaryLink} className="btn-secondary text-lg px-8 py-4 text-white">
                  {slide.secondary}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-cricket-500' : 'w-3 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="absolute bottom-10 right-8 hidden md:flex items-center gap-2">
          <button
            onClick={() => setCurrent((p) => (p - 1 + heroSlides.length) % heroSlides.length)}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrent((p) => (p + 1) % heroSlides.length)}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
