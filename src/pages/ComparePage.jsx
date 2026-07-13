import { useState, useMemo } from 'react';
import { usePlayers } from '../hooks/useData';
import { SectionHeader, GlassCard, Skeleton, Avatar } from '../components/common';
import { motion } from 'framer-motion';
import { Scale, Search, TrendingUp, Target, Zap, Award, Star } from 'lucide-react';
import { Bar, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, Filler, Tooltip, Legend);

export default function ComparePage() {
  const { data: allPlayers, isLoading } = usePlayers();
  const [p1Id, setP1Id] = useState(1);
  const [p2Id, setP2Id] = useState(2);

  const player1 = useMemo(() => allPlayers?.find(p => p.id === p1Id), [allPlayers, p1Id]);
  const player2 = useMemo(() => allPlayers?.find(p => p.id === p2Id), [allPlayers, p2Id]);

  if (isLoading) return <div className="py-8 container-premium"><Skeleton className="h-96 rounded-2xl" /></div>;

  const renderCompare = (label, val1, val2, higher = true) => {
    const v1 = parseFloat(val1) || 0;
    const v2 = parseFloat(val2) || 0;
    const winner = v1 > v2 ? 1 : v2 > v1 ? 2 : 0;
    return (
      <div className="grid grid-cols-3 gap-4 items-center py-3 border-b border-gray-50 dark:border-navy-800 last:border-0">
        <div className={`text-right font-mono font-bold ${winner === 1 ? 'text-cricket-600 dark:text-cricket-400' : 'text-gray-900 dark:text-white'}`}>
          {val1}
        </div>
        <div className="text-center text-xs font-semibold text-gray-400 uppercase">{label}</div>
        <div className={`text-left font-mono font-bold ${winner === 2 ? 'text-cricket-600 dark:text-cricket-400' : 'text-gray-900 dark:text-white'}`}>
          {val2}
        </div>
      </div>
    );
  };

  const radarData = player1 && player2 ? {
    labels: ['Runs', 'Average', 'SR', '100s', '50s', 'Wickets'],
    datasets: [
      {
        label: player1.name,
        data: [
          player1.stats.odi.runs / 100, player1.stats.odi.avg, player1.stats.odi.sr / 10,
          player1.stats.odi.hundreds, player1.stats.odi.fifties / 5, player1.stats.odi.wickets / 5,
        ],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 0.8)',
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
      },
      {
        label: player2.name,
        data: [
          player2.stats.odi.runs / 100, player2.stats.odi.avg, player2.stats.odi.sr / 10,
          player2.stats.odi.hundreds, player2.stats.odi.fifties / 5, player2.stats.odi.wickets / 5,
        ],
        backgroundColor: 'rgba(41, 144, 255, 0.2)',
        borderColor: 'rgba(41, 144, 255, 0.8)',
        pointBackgroundColor: 'rgba(41, 144, 255, 1)',
      },
    ],
  } : null;

  const barData = player1 && player2 ? {
    labels: ['Test Runs', 'ODI Runs', 'T20I Runs', 'IPL Runs'],
    datasets: [
      { label: player1.name, data: [player1.stats.test.runs, player1.stats.odi.runs, player1.stats.t20.runs, player1.stats.ipl.runs], backgroundColor: 'rgba(34, 197, 94, 0.7)', borderRadius: 6 },
      { label: player2.name, data: [player2.stats.test.runs, player2.stats.odi.runs, player2.stats.t20.runs, player2.stats.ipl.runs], backgroundColor: 'rgba(41, 144, 255, 0.7)', borderRadius: 6 },
    ],
  } : null;

  return (
    <div className="py-8">
      <div className="container-premium">
        <SectionHeader title="Compare Players" subtitle="Compare career statistics of two players" />

        {/* Player Selectors */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[{ id: p1Id, set: setP1Id, label: 'Player 1' }, { id: p2Id, set: setP2Id, label: 'Player 2' }].map(({ id, set, label }) => (
            <GlassCard key={label} className="p-4">
              <label className="text-xs font-semibold text-gray-400 uppercase mb-2 block">{label}</label>
              <select
                value={id}
                onChange={(e) => set(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-navy-800 border border-gray-200 dark:border-navy-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cricket-500 outline-none"
              >
                {allPlayers?.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.country})</option>
                ))}
              </select>
            </GlassCard>
          ))}
        </div>

        {player1 && player2 && (
          <>
            {/* Player Headers */}
            <div className="grid grid-cols-3 gap-4 mb-8 items-center">
              <div className="text-right">
                <Avatar src={player1.photo} alt={player1.name} size="lg" className="ml-auto" />
                <p className="font-semibold text-gray-900 dark:text-white mt-3">{player1.name}</p>
                <p className="text-sm text-gray-500">{player1.country}</p>
              </div>
              <div className="text-center">
                <Scale className="w-8 h-8 mx-auto text-cricket-500" />
                <p className="text-xs text-gray-400 mt-2">VS</p>
              </div>
              <div>
                <Avatar src={player2.photo} alt={player2.name} size="lg" />
                <p className="font-semibold text-gray-900 dark:text-white mt-3">{player2.name}</p>
                <p className="text-sm text-gray-500">{player2.country}</p>
              </div>
            </div>

            {/* Comparison Table */}
            <GlassCard className="p-6 mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">ODI Career Comparison</h3>
              {renderCompare('Matches', player1.stats.odi.matches, player2.stats.odi.matches)}
              {renderCompare('Runs', player1.stats.odi.runs.toLocaleString(), player2.stats.odi.runs.toLocaleString())}
              {renderCompare('Average', player1.stats.odi.avg, player2.stats.odi.avg)}
              {renderCompare('Strike Rate', player1.stats.odi.sr, player2.stats.odi.sr)}
              {renderCompare('Hundreds', player1.stats.odi.hundreds, player2.stats.odi.hundreds)}
              {renderCompare('Fifties', player1.stats.odi.fifties, player2.stats.odi.fifties)}
              {renderCompare('Highest', player1.stats.odi.highest, player2.stats.odi.highest)}
            </GlassCard>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Runs Comparison</h3>
                <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(148,163,184,0.1)' } }, x: { grid: { display: false } } } }} />
              </GlassCard>
              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Performance Radar</h3>
                {radarData && (
                  <Radar data={radarData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } }, scales: { r: { beginAtZero: true, grid: { color: 'rgba(148,163,184,0.1)' }, angleLines: { color: 'rgba(148,163,184,0.1)' } } } }} />
                )}
              </GlassCard>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
