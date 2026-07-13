import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Menu, X, Sun, Moon, Bell, Bookmark, ChevronDown,
  Trophy, Users, Calendar, BarChart3, Newspaper, Star, Zap,
  MapPin, Target, Scale, Home
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';

const navItems = [
  { label: 'Home', path: '/', icon: Home },
  {
    label: 'Players', path: '/players', icon: Users,
    children: [
      { label: 'All Players', path: '/players' },
      { label: 'By Country', path: '/players/country' },
      { label: 'Top Rankings', path: '/rankings' },
    ],
  },
  {
    label: 'Matches', path: '/matches', icon: Calendar,
    children: [
      { label: 'Live Matches', path: '/matches/live' },
      { label: 'Upcoming', path: '/matches/upcoming' },
      { label: 'Results', path: '/matches/results' },
    ],
  },
  {
    label: 'Tournaments', path: '/tournaments', icon: Trophy,
    children: [
      { label: 'All Tournaments', path: '/tournaments' },
      { label: 'ICC World Cup', path: '/tournaments/icc-world-cup' },
      { label: 'T20 World Cup', path: '/tournaments/t20-world-cup' },
      { label: 'IPL', path: '/tournaments/ipl' },
    ],
  },
  { label: 'Teams', path: '/teams', icon: Target },
  { label: 'Rankings', path: '/rankings', icon: BarChart3 },
  { label: 'Stats', path: '/statistics', icon: Scale },
  { label: 'News', path: '/news', icon: Newspaper },
  { label: 'Fantasy', path: '/fantasy', icon: Star },
  { label: 'Venues', path: '/venues', icon: MapPin },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { setSearchOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-navy-900/90 backdrop-blur-xl shadow-glass border-b border-gray-200/50 dark:border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-premium">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-cricket-500 to-cricket-700 rounded-xl flex items-center justify-center shadow-glow-green">
                <span className="text-white font-display font-bold text-lg">C</span>
              </div>
              <span className="hidden sm:block font-display text-xl font-bold text-gray-900 dark:text-white">
                CRIC<span className="text-cricket-500">ASH</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.children ? item.children[0].path : item.path}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      location.pathname === item.path || (item.children && item.children.some(c => location.pathname === c.path))
                        ? 'text-cricket-600 dark:text-cricket-400 bg-cricket-50 dark:bg-cricket-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                    {item.children && <ChevronDown className="w-3 h-3" />}
                  </Link>
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-48 py-2 bg-white dark:bg-navy-800 rounded-xl shadow-premium border border-gray-100 dark:border-navy-700"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-cricket-600 dark:hover:text-cricket-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                className="hidden sm:flex p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-navy-900 shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-gradient-to-br from-cricket-500 to-cricket-700 rounded-xl flex items-center justify-center">
                      <span className="text-white font-display font-bold text-lg">C</span>
                    </div>
                    <span className="font-display text-xl font-bold text-gray-900 dark:text-white">
                      CRIC<span className="text-cricket-500">ASH</span>
                    </span>
                  </Link>
                  <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <div key={item.path}>
                      <Link
                        to={item.children ? item.children[0].path : item.path}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                      >
                        <item.icon className="w-5 h-5 text-cricket-500" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                      {item.children && (
                        <div className="ml-12 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="block px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-cricket-600 dark:hover:text-cricket-400 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
