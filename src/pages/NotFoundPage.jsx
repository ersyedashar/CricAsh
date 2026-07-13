import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="relative mb-8">
          <span className="font-display text-[12rem] md:text-[16rem] font-bold text-gray-100 dark:text-navy-800 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🏏</span>
              <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white">
                That&apos;s a <span className="text-cricket-500">Wicket!</span>
              </h1>
            </div>
          </div>
        </div>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for has been bowled out. It might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary flex items-center gap-2">
            <Home className="w-4 h-4" /> Back to CricAsh
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-8">Designed by <span className="text-cricket-500">Syed Ashar</span></p>
      </motion.div>
    </div>
  );
}
