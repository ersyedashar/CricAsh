import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, Github, Twitter, Instagram, Youtube, Facebook } from 'lucide-react';

const footerLinks = {
  'Cricket': [
    { label: 'Live Scores', path: '/matches/live' },
    { label: 'Upcoming Matches', path: '/matches/upcoming' },
    { label: 'Recent Results', path: '/matches/results' },
    { label: 'Rankings', path: '/rankings' },
    { label: 'Statistics', path: '/statistics' },
  ],
  'Explore': [
    { label: 'Players Database', path: '/players' },
    { label: 'Teams', path: '/teams' },
    { label: 'Tournaments', path: '/tournaments' },
    { label: 'Venues', path: '/venues' },
    { label: 'Compare Players', path: '/compare' },
  ],
  'Tournaments': [
    { label: 'ICC World Cup', path: '/tournaments/icc-world-cup' },
    { label: 'T20 World Cup', path: '/tournaments/t20-world-cup' },
    { label: 'Champions Trophy', path: '/tournaments/champions-trophy' },
    { label: 'IPL', path: '/tournaments/ipl' },
    { label: 'PSL', path: '/tournaments/psl' },
  ],
  'More': [
    { label: 'Fantasy Cricket', path: '/fantasy' },
    { label: 'News', path: '/news' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'About', path: '/about' },
    { label: 'Privacy Policy', path: '/privacy' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-navy-950 text-gray-300 mt-auto">
      {/* Newsletter */}
      <div className="border-b border-white/5">
        <div className="container-premium py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-display font-bold text-white">Stay Updated</h3>
              <p className="text-gray-400 mt-1">Get the latest cricket news and live score updates from CricAsh.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cricket-500 transition-all"
              />
              <button className="btn-primary whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="container-premium py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-cricket-500 to-cricket-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">C</span>
              </div>
              <span className="font-display text-xl font-bold text-white">
                CRIC<span className="text-cricket-400">ASH</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your premier destination for live cricket scores, player statistics, match analysis, and everything cricket.
            </p>
            <p className="text-gray-500 text-xs mb-3">Founded by <span className="text-cricket-400 font-medium">Syed Ashar</span></p>
            <div className="flex items-center gap-3">
              {[Twitter, Instagram, Youtube, Facebook, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-cricket-500/20 flex items-center justify-center text-gray-400 hover:text-cricket-400 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-gray-400 hover:text-cricket-400 transition-colors flex items-center gap-1">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-premium py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CricAsh. All rights reserved. Made with <span className="text-red-500">&#10084;</span> by <span className="text-cricket-400">Syed Ashar</span>.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link to="/faq" className="hover:text-gray-300 transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
