import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Users, Globe, Zap } from 'lucide-react';

const stats = [
  { label: 'Players', value: 524, icon: Users, suffix: '+' },
  { label: 'Countries', value: 18, icon: Globe, suffix: '' },
  { label: 'Matches Tracked', value: 15000, icon: Trophy, suffix: '+' },
  { label: 'Live Tournaments', value: 12, icon: Zap, suffix: '' },
];

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative -mt-12 z-20 mb-16">
      <div className="container-premium">
        <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-premium border border-gray-100 dark:border-navy-700 p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-cricket-50 dark:bg-cricket-900/20 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-cricket-600 dark:text-cricket-400" />
                </div>
                <p className="font-display text-3xl font-bold text-gray-900 dark:text-white">
                  {inView ? <CountUp end={stat.value} duration={2} separator="," /> : '0'}{stat.suffix}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
