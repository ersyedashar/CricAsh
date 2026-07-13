import { SectionHeader, GlassCard, Badge } from '../components/common';
import { motion } from 'framer-motion';
import { Star, Users, TrendingUp, Cloud, Target, Zap, Shield, Award } from 'lucide-react';

const dreamTeam = [
  { name: 'Rohit Sharma', role: 'Captain / Opener', country: 'India', points: 95 },
  { name: 'Quinton de Kock', role: 'Wicket-Keeper', country: 'South Africa', points: 92 },
  { name: 'Virat Kohli', role: 'Batsman', country: 'India', points: 98 },
  { name: 'Babar Azam', role: 'Batsman', country: 'Pakistan', points: 94 },
  { name: 'Travis Head', role: 'Batsman', country: 'Australia', points: 91 },
  { name: 'Ben Stokes', role: 'All-Rounder', country: 'England', points: 90 },
  { name: 'Ravindra Jadeja', role: 'All-Rounder', country: 'India', points: 88 },
  { name: 'Rashid Khan', role: 'Bowler', country: 'Afghanistan', points: 93 },
  { name: 'Jasprit Bumrah', role: 'Bowler', country: 'India', points: 97 },
  { name: 'Shaheen Afridi', role: 'Bowler', country: 'Pakistan', points: 89 },
  { name: 'Kagiso Rabada', role: 'Bowler', country: 'South Africa', points: 87 },
];

const captainPicks = [
  { player: 'Virat Kohli', reason: 'In red-hot form with 3 centuries in last 5 matches', multiplier: '2x' },
  { player: 'Jasprit Bumrah', reason: 'Economy under 4 in last 10 matches', multiplier: '2x' },
  { player: 'Babar Azam', reason: 'Consistent run-scorer with 50+ average', multiplier: '2x' },
];

const pitchReports = [
  { venue: 'Narendra Modi Stadium', type: 'Batting friendly', spin: 'High', pace: 'Medium', dew: 'High', advice: 'Pick more spinners for 2nd innings' },
  { venue: 'Lord\'s', type: 'Green top', spin: 'Low', pace: 'High', dew: 'Low', advice: 'Fast bowlers will be key early on' },
  { venue: 'Melbourne Cricket Ground', type: 'Good batting', spin: 'Medium', pace: 'High', dew: 'Medium', advice: 'Balanced team recommended' },
];

export default function FantasyPage() {
  return (
    <div className="py-8">
      <div className="container-premium">
        <SectionHeader title="Fantasy Cricket" subtitle="Expert tips, dream teams, and predictions" />

        {/* Dream Team */}
        <div className="premium-card overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-100 dark:border-navy-700 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="font-semibold text-gray-900 dark:text-white">Dream Team of the Week</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-navy-700 bg-gray-50 dark:bg-navy-800/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase">#</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase">Player</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase hidden sm:table-cell">Role</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase hidden md:table-cell">Country</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-navy-800">
                {dreamTeam.map((player, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-navy-800/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">{i + 1}</td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900 dark:text-white">{player.name}</p>
                      <p className="text-xs text-gray-400 sm:hidden">{player.role}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500 hidden sm:table-cell">{player.role}</td>
                    <td className="py-3 px-4 text-sm text-gray-500 hidden md:table-cell">{player.country}</td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant={player.points >= 95 ? 'success' : player.points >= 90 ? 'info' : 'default'}>
                        {player.points}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Captain Picks */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-amber-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Captain Picks</h3>
            </div>
            <div className="space-y-4">
              {captainPicks.map((pick, i) => (
                <div key={i} className="p-4 bg-gray-50 dark:bg-navy-700/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900 dark:text-white">{pick.player}</p>
                    <Badge variant="success">{pick.multiplier}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{pick.reason}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Pitch Reports */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-cricket-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Pitch Reports</h3>
            </div>
            <div className="space-y-4">
              {pitchReports.map((pitch, i) => (
                <div key={i} className="p-4 bg-gray-50 dark:bg-navy-700/50 rounded-xl">
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">{pitch.venue}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{pitch.advice}</p>
                  <div className="flex gap-2">
                    <Badge>{pitch.type}</Badge>
                    <Badge variant="info">Spin: {pitch.spin}</Badge>
                    <Badge variant="warning">Pace: {pitch.pace}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Weather */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Cloud className="w-6 h-6 text-primary-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Weather Conditions</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { venue: 'Ahmedabad', temp: '32°C', condition: 'Sunny', humidity: '65%', wind: '12 km/h' },
              { venue: 'London', temp: '18°C', condition: 'Overcast', humidity: '72%', wind: '18 km/h' },
              { venue: 'Melbourne', temp: '24°C', condition: 'Clear', humidity: '55%', wind: '15 km/h' },
            ].map((w) => (
              <div key={w.venue} className="p-4 bg-gray-50 dark:bg-navy-700/50 rounded-xl text-center">
                <p className="font-semibold text-gray-900 dark:text-white">{w.venue}</p>
                <p className="text-3xl font-bold text-cricket-600 dark:text-cricket-400 mt-2">{w.temp}</p>
                <p className="text-sm text-gray-500 mt-1">{w.condition}</p>
                <div className="flex justify-center gap-3 mt-2 text-xs text-gray-400">
                  <span>💧 {w.humidity}</span>
                  <span>💨 {w.wind}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
