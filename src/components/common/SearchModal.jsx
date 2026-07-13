import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { players } from '../../data/players';
import { teams } from '../../data/teams';
import { tournaments } from '../../data/tournaments';

export default function SearchModal() {
  const { setSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    const handleEsc = (e) => e.key === 'Escape' && setSearchOpen(false);
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setSearchOpen]);

  const results = query.length > 1 ? {
    players: players.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5),
    teams: teams.filter(t => t.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3),
    tournaments: tournaments.filter(t => t.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3),
  } : { players: [], teams: [], tournaments: [] };

  const trending = ['Virat Kohli', 'Live Scores', 'World Cup 2027', 'IPL Auction', 'ICC Rankings'];

  const handleSelect = (path) => {
    navigate(path);
    setSearchOpen(false);
  };

  const totalResults = results.players.length + results.teams.length + results.tournaments.length;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          className="relative w-full max-w-2xl bg-white dark:bg-navy-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-navy-700"
        >
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-navy-700">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search players, teams, tournaments..."
              className="flex-1 bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-400 outline-none"
            />
            <button onClick={() => setSearchOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-4">
            {query.length < 2 ? (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" /> Trending
                </p>
                <div className="flex flex-wrap gap-2">
                  {trending.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-cricket-50 hover:text-cricket-600 dark:hover:bg-cricket-900/20 dark:hover:text-cricket-400 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : totalResults === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Search className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p className="font-medium">No results found for &quot;{query}&quot;</p>
                <p className="text-sm mt-1">Try searching for a player, team, or tournament</p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.players.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Players</p>
                    {results.players.map((player) => (
                      <button
                        key={player.id}
                        onClick={() => handleSelect(`/players/${player.id}`)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-colors text-left"
                      >
                        <img src={player.photo} alt="" className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">{player.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{player.country} · {player.role}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
                {results.teams.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Teams</p>
                    {results.teams.map((team) => (
                      <button
                        key={team.id}
                        onClick={() => handleSelect(`/teams/${team.id}`)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-colors text-left"
                      >
                        <span className="text-2xl">{team.flag}</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{team.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{team.captain}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
                {results.tournaments.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tournaments</p>
                    {results.tournaments.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleSelect(`/tournaments/${t.id}`)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-colors text-left"
                      >
                        <span className="text-2xl">{t.logo}</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{t.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{t.format} · {t.frequency}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="px-5 py-3 border-t border-gray-100 dark:border-navy-700 flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-navy-700 rounded text-gray-500">ESC</kbd> to close</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-navy-700 rounded text-gray-500">↵</kbd> to select</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
