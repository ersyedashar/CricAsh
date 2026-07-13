import { Trophy, Users, Globe, Target, Heart, Star, Code, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/common';

const features = [
  { icon: Users, title: 'Player Database', desc: 'Comprehensive profiles for every international cricketer' },
  { icon: Trophy, title: 'Live Coverage', desc: 'Real-time scores and ball-by-ball commentary' },
  { icon: Code, title: 'Advanced Stats', desc: 'Deep statistical analysis and comparisons' },
  { icon: Globe, title: 'Global Reach', desc: 'Covers all 18+ cricket-playing nations' },
  { icon: Star, title: 'Fantasy Tips', desc: 'Expert predictions and dream team picks' },
  { icon: Heart, title: 'Community', desc: 'Built by fans, for fans' },
];

export default function AboutPage() {
  return (
    <div className="py-8">
      <div className="container-premium max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-4">About CricAsh</h1>
          <p className="text-sm text-cricket-500 dark:text-cricket-400 font-medium mb-2">Every Cricket Story, One Destination.</p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Your premier destination for everything cricket. Live scores, player statistics, match analysis, and a comprehensive database of international cricketers.
          </p>
        </div>

        <GlassCard className="p-8 mb-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            CricAsh was created with a singular vision: to provide cricket fans worldwide with a premium, comprehensive, and beautifully designed platform that celebrates the sport we love. We believe that cricket statistics and information should be accessible, engaging, and visually stunning.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            From live match coverage to an exhaustive player database spanning every international cricketer, from historical records to fantasy cricket tips, CricAsh aims to be your one-stop destination for all things cricket.
          </p>
        </GlassCard>

        {/* Founder Card */}
        <GlassCard className="p-8 mb-8 text-center">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Founder & Developer</p>
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-cricket-500 to-primary-600 flex items-center justify-center mb-4 shadow-glow-green">
            <span className="text-3xl font-display font-bold text-white">SA</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Syed Ashar</h3>
          <p className="text-cricket-600 dark:text-cricket-400 font-medium mt-1">Founder & Developer of CricAsh</p>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md mx-auto text-sm leading-relaxed">
            Passionate about cricket and technology, Syed built CricAsh to bring every cricket fan closer to the sport they love. A premium platform designed with care for the global cricket community.
          </p>
        </GlassCard>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {features.map((item) => (
            <GlassCard key={item.title} className="p-6 text-center">
              <item.icon className="w-8 h-8 mx-auto text-cricket-500 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            </GlassCard>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Ready to explore?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/players" className="btn-primary">Explore Players</Link>
            <Link to="/rankings" className="btn-outline">View Rankings</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
