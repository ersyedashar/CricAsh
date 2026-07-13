import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export function SectionHeader({ title, subtitle, link, linkText = 'View All', className }) {
  return (
    <div className={cn('flex items-end justify-between mb-6', className)}>
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link} className="text-sm font-medium text-cricket-600 dark:text-cricket-400 hover:underline whitespace-nowrap">
          {linkText} →
        </Link>
      )}
    </div>
  );
}

export function Card({ children, className, hover = true, ...props }) {
  return (
    <div className={cn('premium-card', hover && 'premium-card-hover', className)} {...props}>
      {children}
    </div>
  );
}

export function GlassCard({ children, className, ...props }) {
  return (
    <div className={cn('glass-card', className)} {...props}>
      {children}
    </div>
  );
}

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-300',
    live: 'bg-red-500 text-white animate-pulse',
    success: 'bg-cricket-100 text-cricket-700 dark:bg-cricket-900/30 dark:text-cricket-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    format: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
  };
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  );
}

export function Skeleton({ className, ...props }) {
  return <div className={cn('skeleton', className)} {...props} />;
}

export function Avatar({ src, alt, size = 'md', className }) {
  const sizes = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
  };
  return (
    <div className={cn('rounded-full overflow-hidden bg-gray-200 dark:bg-navy-700', sizes[size], className)}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="text-center py-16">
      {Icon && <Icon className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      {description && <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm mx-auto">{description}</p>}
      {action}
    </div>
  );
}

export function TabBar({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 dark:bg-navy-800 rounded-xl overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200',
            active === tab.value
              ? 'bg-white dark:bg-navy-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function PlayerCard({ player, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Link to={`/players/${player.id}`} className="block premium-card-hover overflow-hidden group">
        <div className="relative h-48 bg-gradient-to-br from-navy-800 to-navy-900 overflow-hidden">
          <img
            src={player.photo}
            alt={player.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute top-3 right-3">
            <Badge variant="format">{player.team}</Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-white font-display text-xl font-bold">{player.name}</p>
            <p className="text-white/70 text-sm">{player.nickname}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">{player.country}</span>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full',
              player.role === 'Batsman' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              : player.role === 'Bowler' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
              : player.role.includes('All-Rounder') ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
            )}>
              {player.role}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-50 dark:bg-navy-700/50 rounded-lg p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">ODI Runs</p>
              <p className="font-bold text-gray-900 dark:text-white">{player.stats.odi.runs.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 dark:bg-navy-700/50 rounded-lg p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Average</p>
              <p className="font-bold text-gray-900 dark:text-white">{player.stats.odi.avg}</p>
            </div>
            <div className="bg-gray-50 dark:bg-navy-700/50 rounded-lg p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">SR</p>
              <p className="font-bold text-gray-900 dark:text-white">{player.stats.odi.sr}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function MatchCard({ match, index = 0 }) {
  const statusColor = match.isLive ? 'text-red-500' : match.status === 'Complete' ? 'text-cricket-500' : 'text-gray-500';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      viewport={{ once: true }}
      className="premium-card-hover overflow-hidden"
    >
      <div className="p-1 bg-gray-50 dark:bg-navy-700/30 border-b border-gray-100 dark:border-navy-700 flex items-center justify-between px-4 py-2">
        <Badge>{match.format}</Badge>
        <span className={`text-xs font-semibold ${statusColor}`}>
          {match.isLive && <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse" />}
          {match.status}
        </span>
      </div>
      <div className="p-4 space-y-3">
        {[match.team1, match.team2].map((team, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{team.flag}</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{team.name}</p>
                {team.score && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {team.score} <span className="text-gray-400 dark:text-gray-500">({team.overs})</span>
                  </p>
                )}
              </div>
            </div>
            {match.isLive && team.score && (
              <div className="text-right">
                {i === 0 && match.currentBatter && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">{match.currentBatter}</p>
                )}
                {i === 1 && match.currentBowler && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">{match.currentBowler}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {match.matchStatus && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-navy-700/30 border-t border-gray-100 dark:border-navy-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">{match.matchStatus}</p>
        </div>
      )}
      {match.result && (
        <div className="px-4 py-3 bg-cricket-50 dark:bg-cricket-900/10 border-t border-cricket-100 dark:border-cricket-900/20">
          <p className="text-xs font-semibold text-cricket-700 dark:text-cricket-400">{match.result}</p>
        </div>
      )}
    </motion.div>
  );
}

export function TournamentCard({ tournament, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <Link to={`/tournaments/${tournament.id}`} className="block premium-card-hover p-6 group">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{tournament.logo}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white group-hover:text-cricket-600 dark:group-hover:text-cricket-400 transition-colors">
              {tournament.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tournament.format} · {tournament.frequency}</p>
            <div className="flex items-center gap-4 mt-3">
              <Badge variant="success">{tournament.currentChampion}</Badge>
              <span className="text-xs text-gray-400">{tournament.mostTitles}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CountryCard({ team, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <Link to={`/teams/${team.id}`} className="block premium-card-hover p-5 group text-center">
        <span className="text-5xl block mb-3">{team.flag}</span>
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-cricket-600 dark:group-hover:text-cricket-400 transition-colors">
          {team.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Captain: {team.captain}</p>
        <div className="flex items-center justify-center gap-3 mt-3 text-xs text-gray-400">
          <span>Test: #{team.iccRanking.test}</span>
          <span>ODI: #{team.iccRanking.odi}</span>
          <span>T20: #{team.iccRanking.t20}</span>
        </div>
      </Link>
    </motion.div>
  );
}

export function RankingTable({ data, type = 'batting' }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 dark:border-navy-700">
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">#</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Player</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Country</th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={i}
              className="border-b border-gray-50 dark:border-navy-800 hover:bg-gray-50 dark:hover:bg-navy-800/50 transition-colors"
            >
              <td className="py-3 px-4">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  item.rank <= 3 ? 'bg-cricket-100 text-cricket-700 dark:bg-cricket-900/30 dark:text-cricket-400' : 'text-gray-500'
                }`}>
                  {item.rank}
                </span>
              </td>
              <td className="py-3 px-4">
                <Link to={`/players?search=${item.name}`} className="font-medium text-gray-900 dark:text-white hover:text-cricket-600 dark:hover:text-cricket-400 transition-colors">
                  {item.name}
                </Link>
              </td>
              <td className="py-3 px-4 hidden sm:table-cell text-gray-500 dark:text-gray-400">{item.country}</td>
              <td className="py-3 px-4 text-right">
                <span className="font-mono font-bold text-gray-900 dark:text-white">{item.rating}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
