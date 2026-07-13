import { useRecentResults, useUpcomingMatches } from '../../hooks/useData';
import { MatchCard, SectionHeader, Badge, Skeleton } from '../common';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function UpcomingAndResults() {
  const { data: upcoming, isLoading: l1 } = useUpcomingMatches();
  const { data: results, isLoading: l2 } = useRecentResults();

  return (
    <section className="py-12">
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Upcoming */}
          <div>
            <SectionHeader title="Upcoming Matches" link="/matches/upcoming" />
            {l1 ? (
              <div className="space-y-4">{[1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}</div>
            ) : (
              <div className="space-y-4">
                {upcoming?.slice(0, 5).map((match, i) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="premium-card-hover p-4 flex items-center gap-4"
                  >
                    <div className="text-center shrink-0 w-16">
                      <p className="text-xs text-gray-400 uppercase">{match.format}</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="w-px h-10 bg-gray-200 dark:bg-navy-700" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{match.team1.flag}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{match.team1.shortName}</span>
                        <span className="text-gray-400">vs</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{match.team2.shortName}</span>
                        <span className="text-lg">{match.team2.flag}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 truncate">{match.venue} · {match.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Results */}
          <div>
            <SectionHeader title="Recent Results" link="/matches/results" />
            {l2 ? (
              <div className="space-y-4">{[1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}</div>
            ) : (
              <div className="space-y-4">
                {results?.slice(0, 5).map((match, i) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="premium-card-hover p-4"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-center shrink-0 w-16">
                        <p className="text-xs text-gray-400 uppercase">{match.format}</p>
                      </div>
                      <div className="w-px h-8 bg-gray-200 dark:bg-navy-700" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-sm">
                          <span>{match.team1.flag}</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{match.team1.shortName}</span>
                          <span className="text-gray-400">{match.team1.score}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span>{match.team2.flag}</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{match.team2.shortName}</span>
                          <span className="text-gray-400">{match.team2.score}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-cricket-50 dark:bg-cricket-900/10 rounded-lg px-3 py-2">
                      <p className="text-xs font-semibold text-cricket-700 dark:text-cricket-400">{match.result}</p>
                      {match.manOfTheMatch && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">⭐ {match.manOfTheMatch}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
