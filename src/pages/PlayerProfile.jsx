import { useParams, Link } from 'react-router-dom';
import { usePlayer } from '../hooks/useData';
import { Badge, GlassCard, Skeleton, TabBar } from '../components/common';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft, Heart, Share2, Bookmark, MapPin, Calendar, Ruler, Shirt,
  Trophy, Award, Star, TrendingUp, Target, Zap, Clock, ExternalLink
} from 'lucide-react';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale, PointElement, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale, PointElement, Filler);

export default function PlayerProfile() {
  const { id } = useParams();
  const { data: player, isLoading } = usePlayer(id);
  const { isFavorite, toggleFavorite } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFormat, setActiveFormat] = useState('odi');

  if (isLoading) {
    return (
      <div className="py-8 container-premium">
        <Skeleton className="h-96 rounded-2xl mb-6" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="py-8 container-premium text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Player not found</h2>
        <Link to="/players" className="btn-primary">Back to Players</Link>
      </div>
    );
  }

  const stats = player.stats[activeFormat];
  const fav = isFavorite(player.id);

  const statCards = [
    { label: 'Matches', value: stats.matches, icon: Shirt },
    { label: 'Runs', value: stats.runs?.toLocaleString(), icon: TrendingUp },
    { label: 'Average', value: stats.avg, icon: Target },
    { label: 'Strike Rate', value: stats.sr, icon: Zap },
    { label: 'Hundreds', value: stats.hundreds, icon: Award },
    { label: 'Fifties', value: stats.fifties, icon: Star },
  ];

  if (stats.wickets > 0) {
    statCards.push(
      { label: 'Wickets', value: stats.wickets, icon: Target },
      { label: 'Economy', value: stats.economy, icon: TrendingUp },
    );
  }

  const barData = {
    labels: ['Test', 'ODI', 'T20I', 'IPL'],
    datasets: [{
      label: 'Runs',
      data: [player.stats.test.runs, player.stats.odi.runs, player.stats.t20.runs, player.stats.ipl.runs],
      backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(41, 144, 255, 0.8)', 'rgba(168, 85, 247, 0.8)', 'rgba(245, 158, 11, 0.8)'],
      borderRadius: 8,
    }],
  };

  const avgData = {
    labels: ['Test', 'ODI', 'T20I', 'IPL'],
    datasets: [{
      label: 'Average',
      data: [player.stats.test.avg, player.stats.odi.avg, player.stats.t20.avg, player.stats.ipl.avg],
      backgroundColor: ['rgba(34, 197, 94, 0.6)', 'rgba(41, 144, 255, 0.6)', 'rgba(168, 85, 247, 0.6)', 'rgba(245, 158, 11, 0.6)'],
      borderRadius: 8,
    }],
  };

  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Career Stats', value: 'stats' },
    { label: 'Achievements', value: 'achievements' },
    { label: 'Timeline', value: 'timeline' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-80 md:h-96 bg-gradient-to-br from-navy-800 via-navy-900 to-cricket-900 overflow-hidden">
        <img src={player.photo} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-transparent" />
        <div className="container-premium relative h-full flex items-end pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 w-full">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              src={player.photo}
              alt={player.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="format">{player.country}</Badge>
                <Badge>{player.role}</Badge>
                <Badge variant="success">#{player.ranking[activeFormat]}</Badge>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">{player.name}</h1>
              <p className="text-white/60 text-lg">&quot;{player.nickname}&quot;</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(player.id)}
                className={`p-3 rounded-xl transition-all ${fav ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                <Heart className={`w-5 h-5 ${fav ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-premium py-8">
        {/* Personal Info */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Born', value: `${player.dob} (${player.age} years)`, icon: Calendar },
            { label: 'Birthplace', value: player.birthPlace, icon: MapPin },
            { label: 'Height', value: player.height, icon: Ruler },
            { label: 'Jersey', value: `#${player.jerseyNumber}`, icon: Shirt },
          ].map((item) => (
            <GlassCard key={item.label} className="p-4 flex items-center gap-3">
              <item.icon className="w-5 h-5 text-cricket-500 shrink-0" />
              <div>
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Format Selector */}
        <div className="mb-8">
          <TabBar
            tabs={[
              { label: 'Test', value: 'test' },
              { label: 'ODI', value: 'odi' },
              { label: 'T20I', value: 't20' },
              { label: 'IPL', value: 'ipl' },
            ]}
            active={activeFormat}
            onChange={setActiveFormat}
          />
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {statCards.map((s) => (
                <GlassCard key={s.label} className="p-4 text-center">
                  <s.icon className="w-5 h-5 mx-auto mb-2 text-cricket-500" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
                </GlassCard>
              ))}
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Career Runs by Format</h3>
                <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(148,163,184,0.1)' } }, x: { grid: { display: false } } } }} />
              </GlassCard>
              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Batting Average by Format</h3>
                <Bar data={avgData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(148,163,184,0.1)' } }, x: { grid: { display: false } } } }} />
              </GlassCard>
            </div>

            {/* Style & Role */}
            <GlassCard className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Playing Style</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy-700/50 rounded-xl">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-28">Batting</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{player.battingStyle}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy-700/50 rounded-xl">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-28">Bowling</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{player.bowlingStyle}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy-700/50 rounded-xl">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-28">Role</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{player.role}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy-700/50 rounded-xl">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-28">Team</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{player.team}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GlassCard className="overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-navy-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">{activeFormat.toUpperCase()} Career Statistics</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-50 dark:divide-navy-800">
                    {Object.entries(stats).map(([key, value]) => (
                      <tr key={key} className="hover:bg-gray-50 dark:hover:bg-navy-800/50 transition-colors">
                        <td className="px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </td>
                        <td className="px-6 py-3 text-sm font-bold text-gray-900 dark:text-white text-right">
                          {typeof value === 'number' ? value.toLocaleString() : value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {activeTab === 'achievements' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" /> Achievements
              </h3>
              <div className="space-y-3">
                {player.achievements.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-navy-700/50 rounded-xl">
                    <Award className="w-5 h-5 text-cricket-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{a}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-500" /> Awards
              </h3>
              <div className="space-y-3">
                {player.awards.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-navy-700/50 rounded-xl">
                    <Star className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{a}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {activeTab === 'timeline' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GlassCard className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-500" /> Career Timeline
              </h3>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-navy-700" />
                <div className="space-y-6">
                  {player.timeline.map((item, i) => (
                    <div key={i} className="relative pl-14">
                      <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-cricket-500 border-4 border-white dark:border-navy-800 shadow-sm" />
                      <div className="p-4 bg-gray-50 dark:bg-navy-700/50 rounded-xl">
                        <span className="text-xs font-bold text-cricket-600 dark:text-cricket-400">{item.year}</span>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Social & Rankings */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <GlassCard className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">ICC Rankings</h3>
            <div className="space-y-3">
              {Object.entries(player.ranking).map(([format, rank]) => (
                <div key={format} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-700/50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">{format}</span>
                  <Badge variant={rank <= 3 ? 'success' : rank <= 10 ? 'info' : 'default'}>
                    #{rank}
                  </Badge>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Social Media</h3>
            <div className="space-y-3">
              {Object.entries(player.social).map(([platform, handle]) => (
                <a key={platform} href="#" className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{platform}</span>
                  <span className="text-sm text-cricket-600 dark:text-cricket-400 flex items-center gap-1">
                    {handle} <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
