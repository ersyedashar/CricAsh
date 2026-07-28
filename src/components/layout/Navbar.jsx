import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Menu, X, Sun, Moon, ChevronDown, ChevronRight,
  Home, Calendar, Newspaper, BarChart3, Phone, Trophy, Target, Users, Star, MapPin, Scale
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';

const navItems = [
  { label: 'Home', path: '/', icon: Home },
  {
    label: 'Live Scores', path: '/matches/live', icon: Calendar,
    children: [
      { label: 'Live Matches', path: '/matches/live' },
      { label: 'Upcoming', path: '/matches/upcoming' },
      { label: 'Results', path: '/matches/results' },
    ],
  },
  { label: 'Matches', path: '/matches', icon: Trophy },
  { label: 'News', path: '/news', icon: Newspaper },
  { label: 'Rankings', path: '/rankings', icon: BarChart3 },
  { label: 'Contact', path: '/contact', icon: Phone },
  { label: 'More', path: '#', icon: ChevronDown, children: [
    { label: 'Players', path: '/players', icon: Users },
    { label: 'Teams', path: '/teams', icon: Target },
    { label: 'Tournaments', path: '/tournaments', icon: Trophy },
    { label: 'Stats', path: '/statistics', icon: BarChart3 },
    { label: 'Fantasy', path: '/fantasy', icon: Star },
    { label: 'Venues', path: '/venues', icon: MapPin },
    { label: 'Compare', path: '/compare', icon: Scale },
  ]},
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { setSearchOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setMobileSubmenu(null);
  }, [location]);

  const isActive = (path) => {
    if (path === '#') return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Founder Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-7 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border-b border-amber-500/20">
        <div className="container-premium h-full flex items-center justify-center">
          <span className="text-[10px] sm:text-xs tracking-[0.2em] text-amber-400/80 font-medium uppercase">
            ✦ Founder: <span className="text-amber-300 font-semibold">Syed Ashar</span> ✦
          </span>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed top-7 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 dark:bg-navy-900/95 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-gray-200/50 dark:border-white/5'
            : 'bg-white/70 dark:bg-navy-900/80 backdrop-blur-xl border-b border-transparent'
        }`}
      >
        <div className="container-premium">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative w-9 h-9 md:w-10 md:h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-cricket-400 via-cricket-500 to-cricket-700 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-cricket-500 to-cricket-700 rounded-xl flex items-center justify-center shadow-glow-green group-hover:shadow-lg">
                  <span className="text-white font-display font-black text-lg md:text-xl">C</span>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg md:text-xl font-black text-gray-900 dark:text-white tracking-tight">
                  CRIC<span className="text-cricket-500">ASH</span>
                </span>
                <span className="text-[9px] md:text-[10px] text-gray-400 dark:text-gray-500 tracking-[0.25em] uppercase font-medium -mt-0.5">
                  Cricket Hub
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onFocus={() => item.children && setActiveDropdown(item.label)}
                  onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setActiveDropdown(null); }}
                >
                  <Link
                    to={item.children ? item.children[0].path : item.path}
                    onKeyDown={(e) => { if (item.children && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setActiveDropdown(activeDropdown === item.label ? null : item.label); } }}
                    className={`relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      isActive(item.path)
                        ? 'text-cricket-600 dark:text-cricket-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {isActive(item.path) && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 bg-cricket-50 dark:bg-cricket-900/20 rounded-xl"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {item.label}
                      {item.children && <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                    </span>
                  </Link>
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1.5 w-52 py-2 bg-white dark:bg-navy-800 rounded-2xl shadow-premium border border-gray-100 dark:border-navy-700 overflow-hidden"
                        role="menu"
                      >
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cricket-500 to-amber-500" />
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.path}
                            role="menuitem"
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 ${
                              location.pathname === child.path
                                ? 'text-cricket-600 dark:text-cricket-400 bg-cricket-50/50 dark:bg-cricket-900/10'
                                : 'text-gray-600 dark:text-gray-300 hover:text-cricket-600 dark:hover:text-cricket-400 hover:bg-gray-50 dark:hover:bg-white/5'
                            }`}
                          >
                            {child.icon && <child.icon className="w-4 h-4 opacity-60" />}
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
            <div className="flex items-center gap-1.5 md:gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="relative p-2 rounded-xl text-gray-400 dark:text-gray-500 hover:text-cricket-500 dark:hover:text-cricket-400 hover:bg-cricket-50 dark:hover:bg-cricket-900/20 transition-all duration-200"
                aria-label="Search"
              >
                <Search className="w-4.5 h-4.5 md:w-5 md:h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-xl text-gray-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-200"
                aria-label="Toggle theme"
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'dark' ? <Sun className="w-4.5 h-4.5 md:w-5 md:h-5" /> : <Moon className="w-4.5 h-4.5 md:w-5 md:h-5" />}
                </motion.div>
              </button>

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-navy-700 mx-1" />

              {/* Auth Buttons - Desktop */}
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/contact"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 hover:text-cricket-600 dark:hover:text-cricket-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/contact"
                  className="relative px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cricket-500 to-cricket-600 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow-green hover:scale-105 active:scale-95 group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Sign Up</span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden relative p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-14 md:h-16" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 250 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-navy-900 shadow-2xl overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="sticky top-0 z-10 bg-white dark:bg-navy-900 border-b border-gray-100 dark:border-navy-800">
                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-gradient-to-br from-cricket-500 to-cricket-700 rounded-xl flex items-center justify-center shadow-glow-green">
                      <span className="text-white font-display font-black text-lg">C</span>
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="font-display text-lg font-black text-gray-900 dark:text-white">
                        CRIC<span className="text-cricket-500">ASH</span>
                      </span>
                      <span className="text-[9px] text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase">Cricket Hub</span>
                    </div>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
                <div className="px-5 pb-4 flex items-center gap-2">
                  <div className="flex-1 h-8 flex items-center gap-2 px-3 bg-gray-100 dark:bg-navy-800 rounded-xl">
                    <Search className="w-3.5 h-3.5 text-gray-400" />
                    <input
                      placeholder="Search..."
                      className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none"
                      onFocus={() => { setSearchOpen(true); setMobileOpen(false); }}
                    />
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-navy-800 text-gray-500 dark:text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-0.5">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.children && item.label === 'More' ? (
                      <>
                        <button
                          onClick={() => setMobileSubmenu(mobileSubmenu === item.label ? null : item.label)}
                          className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                          <span className="font-semibold text-sm">{item.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSubmenu === item.label ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileSubmenu === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 space-y-0.5 py-1 border-l-2 border-cricket-500/30 pl-3">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    to={child.path}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-500 dark:text-gray-400 hover:text-cricket-600 dark:hover:text-cricket-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                  >
                                    {child.icon && <child.icon className="w-4 h-4 opacity-60" />}
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.children ? item.children[0].path : item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                          isActive(item.path)
                            ? 'text-cricket-600 dark:text-cricket-400 bg-cricket-50 dark:bg-cricket-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                        }`}
                      >
                        {item.icon && <item.icon className="w-5 h-5" />}
                        {item.label}
                        {item.children && item.label !== 'More' && <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Auth Section */}
              <div className="border-t border-gray-100 dark:border-navy-800 p-5 space-y-3">
                <div className="flex items-center justify-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                  <span className="tracking-[0.15em] uppercase font-semibold">✦ Founder: Syed Ashar ✦</span>
                </div>
                <div className="flex gap-3">
                  <Link
                    to="/contact"
                    className="flex-1 px-4 py-3 text-center text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 border-2 border-gray-200 dark:border-navy-700 rounded-xl hover:border-cricket-500 hover:text-cricket-600 dark:hover:text-cricket-400 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/contact"
                    className="flex-1 px-4 py-3 text-center text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cricket-500 to-cricket-600 rounded-xl hover:shadow-glow-green transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
