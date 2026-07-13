import { useParams, Link } from 'react-router-dom';
import { useTournament } from '../hooks/useData';
import { Badge, GlassCard, Skeleton, SectionHeader } from '../components/common';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Calendar, Users, Star, Crown } from 'lucide-react';

export default function TournamentDetailPage() {
  const { id } = useParams();
  const { data: tournament, isLoading } = useTournament(id);

  if (isLoading) return <div className="py-8 container-premium"><Skeleton className="h-96 rounded-2xl" /></div>;
  if (!tournament) return <div className="py-8 container-premium text-center"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tournament not found</h2></div>;

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-navy-800 to-navy-900 py-16">
        <div className="container-premium">
          <Link to="/tournaments" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Tournaments
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-6xl">{tournament.logo}</span>
            <div>
              <h1 className="font-display text-4xl font-bold text-white">{tournament.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <Badge>{tournament.format}</Badge>
                <Badge variant="info">{tournament.frequency}</Badge>
                <Badge variant="success">Champion: {tournament.currentChampion}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-premium py-8">
        <GlassCard className="p-6 mb-8">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{tournament.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Trophy className="w-4 h-4" />
              <span>Most Titles: <strong className="text-gray-900 dark:text-white">{tournament.mostTitles}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Founded: <strong className="text-gray-900 dark:text-white">{tournament.founded}</strong></span>
            </div>
          </div>
        </GlassCard>

        {/* Previous Winners */}
        <SectionHeader title="Previous Winners" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tournament.previousWinners.map((winner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="premium-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-display font-bold text-gray-900 dark:text-white">{winner.year}</span>
                {i === 0 && <Badge variant="success">Current Champion</Badge>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-semibold text-cricket-600 dark:text-cricket-400">{winner.winner}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Runner-up: {winner.runnerUp}</span>
                </div>
                <div className="text-xs text-gray-400">Host: {winner.host}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Teams */}
        {tournament.teams && tournament.teams.length > 0 && (
          <div className="mt-8">
            <SectionHeader title="Participating Teams" />
            <div className="flex flex-wrap gap-3">
              {tournament.teams.map((team) => (
                <Badge key={team} className="px-4 py-2 text-sm">{team}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
