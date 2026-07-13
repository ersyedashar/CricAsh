import Hero from '../components/home/Hero';
import StatsBar from '../components/home/StatsBar';
import LiveMatches from '../components/home/LiveMatches';
import TrendingPlayers from '../components/home/TrendingPlayers';
import UpcomingAndResults from '../components/home/UpcomingAndResults';
import FeaturedTournaments from '../components/home/FeaturedTournaments';
import TopRankings from '../components/home/TopRankings';
import LatestNews from '../components/home/LatestNews';
import RecordsSection from '../components/home/RecordsSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MessageSquare, Shield, Scale } from 'lucide-react';

function QuickActions() {
  const actions = [
    { label: 'Compare Players', icon: Scale, path: '/compare', color: 'from-blue-500 to-blue-600' },
    { label: 'Fantasy Tips', icon: Star, path: '/fantasy', color: 'from-purple-500 to-purple-600' },
    { label: 'News Hub', icon: MessageSquare, path: '/news', color: 'from-amber-500 to-amber-600' },
    { label: 'Teams', icon: Shield, path: '/teams', color: 'from-cricket-500 to-cricket-600' },
  ];

  return (
    <section className="py-8">
      <div className="container-premium">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, i) => (
            <motion.div
              key={action.path}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={action.path}
                className={`block p-5 rounded-2xl bg-gradient-to-br ${action.color} text-white hover:scale-105 transition-transform duration-300 shadow-lg`}
              >
                <action.icon className="w-8 h-8 mb-3" />
                <p className="font-semibold">{action.label}</p>
                <ArrowRight className="w-4 h-4 mt-2 opacity-70" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sponsors() {
  const sponsors = ['ICC', 'MRF', 'BYJU\'S', 'Dream11', 'Mastercard', 'Emirates', 'BKT', 'RFYoung'];
  return (
    <section className="py-12 border-t border-gray-100 dark:border-navy-800">
      <div className="container-premium">
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Trusted by Leading Brands</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {sponsors.map((s) => (
            <div key={s} className="text-2xl font-display font-bold text-gray-300 dark:text-gray-700 hover:text-gray-400 dark:hover:text-gray-600 transition-colors cursor-default">
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <LiveMatches />
      <QuickActions />
      <TrendingPlayers />
      <UpcomingAndResults />
      <FeaturedTournaments />
      <TopRankings />
      <RecordsSection />
      <LatestNews />
      <Sponsors />
    </>
  );
}
