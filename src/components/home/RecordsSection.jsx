import { motion } from 'framer-motion';
import { useRecords } from '../../hooks/useData';
import { SectionHeader, Badge, Skeleton, TabBar } from '../common';
import { Trophy, Target, Zap, TrendingUp, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecordsSection() {
  const { data: records, isLoading } = useRecords();

  if (isLoading) return <div className="py-12 container-premium"><Skeleton className="h-64 rounded-2xl" /></div>;

  const sections = [
    { key: 'mostRuns', title: 'Most International Runs', icon: TrendingUp, data: records?.mostRuns, unit: 'runs' },
    { key: 'mostWickets', title: 'Most International Wickets', icon: Target, data: records?.mostWickets, unit: 'wickets' },
    { key: 'highestScore', title: 'Highest Individual Scores', icon: Award, data: records?.highestScore, unit: '' },
    { key: 'fastestCentury', title: 'Fastest Centuries', icon: Zap, data: records?.fastestCentury, unit: 'balls' },
    { key: 'fastestFifty', title: 'Fastest Fifties', icon: Zap, data: records?.fastestFifty, unit: 'balls' },
    { key: 'mostSixes', title: 'Most Sixes (ODI)', icon: Star, data: records?.mostSixes, unit: 'sixes' },
  ];

  return (
    <section className="py-12">
      <div className="container-premium">
        <SectionHeader title="Cricket Records" subtitle="All-time cricket records and milestones" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, si) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.05 }}
              viewport={{ once: true }}
              className="premium-card overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100 dark:border-navy-700 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cricket-50 dark:bg-cricket-900/20 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-cricket-600 dark:text-cricket-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{section.title}</h3>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-navy-800">
                {section.data?.slice(0, 5).map((item, i) => (
                  <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-navy-800/50 transition-colors">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      i < 3 ? 'bg-cricket-100 text-cricket-700 dark:bg-cricket-900/30 dark:text-cricket-400' : 'text-gray-400'
                    }`}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.country}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono font-bold text-gray-900 dark:text-white text-sm">
                        {item.runs || item.wickets || item.score || item.balls || item.sixes}
                      </p>
                      {item.match && <p className="text-xs text-gray-400">{item.match}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
