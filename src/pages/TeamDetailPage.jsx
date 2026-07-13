import { useParams, Link } from 'react-router-dom';
import { useTeam, usePlayers } from '../hooks/useData';
import { Badge, GlassCard, SectionHeader, Skeleton } from '../components/common';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Users, Target, MapPin, Star } from 'lucide-react';

export default function TeamDetailPage() {
  const { id } = useParams();
  const { data: team, isLoading } = useTeam(id);
  const { data: players } = usePlayers({ country: team?.name });

  if (isLoading) return <div className="py-8 container-premium"><Skeleton className="h-96 rounded-2xl" /></div>;
  if (!team) return <div className="py-8 container-premium text-center"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team not found</h2></div>;

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-navy-800 to-navy-900 py-16">
        <div className="container-premium">
          <Link to="/teams" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Teams
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-7xl">{team.flag}</span>
            <div>
              <h1 className="font-display text-4xl font-bold text-white">{team.name}</h1>
              <p className="text-white/60 mt-2">{team.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-premium py-8">
        {/* Key Info */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <GlassCard className="p-5">
            <Users className="w-6 h-6 text-cricket-500 mb-2" />
            <p className="text-xs text-gray-400">Captain</p>
            <p className="font-semibold text-gray-900 dark:text-white">{team.captain}</p>
          </GlassCard>
          <GlassCard className="p-5">
            <Star className="w-6 h-6 text-primary-500 mb-2" />
            <p className="text-xs text-gray-400">Coach</p>
            <p className="font-semibold text-gray-900 dark:text-white">{team.coach}</p>
          </GlassCard>
          <GlassCard className="p-5">
            <Target className="w-6 h-6 text-amber-500 mb-2" />
            <p className="text-xs text-gray-400">Home Ground</p>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{team.homeGround}</p>
          </GlassCard>
          <GlassCard className="p-5">
            <Trophy className="w-6 h-6 text-purple-500 mb-2" />
            <p className="text-xs text-gray-400">ICC Rankings</p>
            <div className="flex gap-2 mt-1">
              <Badge variant="info">Test #{team.iccRanking.test}</Badge>
              <Badge variant="success">ODI #{team.iccRanking.odi}</Badge>
              <Badge variant="warning">T20 #{team.iccRanking.t20}</Badge>
            </div>
          </GlassCard>
        </div>

        {/* Titles */}
        <GlassCard className="p-6 mb-8">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Major Titles</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'World Cup', count: team.titles.worldCup },
              { label: 'T20 World Cup', count: team.titles.t20WorldCup },
              { label: 'Champions Trophy', count: team.titles.championsTrophy },
              { label: 'WTC', count: team.titles.wtc },
            ].map(t => (
              <div key={t.label} className="text-center p-4 bg-gray-50 dark:bg-navy-700/50 rounded-xl">
                <p className="text-3xl font-bold text-cricket-600 dark:text-cricket-400">{t.count}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Current Squad */}
        <SectionHeader title="Current Squad" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {players?.map((player, i) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link to={`/players/${player.id}`} className="flex items-center gap-3 p-4 premium-card-hover">
                <img src={player.photo} alt="" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{player.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{player.role}</p>
                </div>
              </Link>
            </motion.div>
          ))}
          {(!players || players.length === 0) && (
            <p className="text-gray-500 dark:text-gray-400 col-span-full text-center py-8">No players in database for this team</p>
          )}
        </div>
      </div>
    </div>
  );
}
