import { useState } from 'react';
import { usePlayers } from '../hooks/useData';
import { PlayerCard, SectionHeader, TabBar, EmptyState } from '../components/common';
import { motion } from 'framer-motion';
import { Search, Filter, Users } from 'lucide-react';

const countries = ['All', 'India', 'Australia', 'England', 'Pakistan', 'South Africa', 'New Zealand', 'Sri Lanka', 'Bangladesh', 'Afghanistan', 'West Indies'];
const roles = ['All', 'Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'];

export default function PlayersPage() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('All');
  const [role, setRole] = useState('All');

  const { data: players, isLoading } = usePlayers({
    search,
    country: country === 'All' ? undefined : country,
    role: role === 'All' ? undefined : role,
  });

  return (
    <div className="py-8">
      <div className="container-premium">
        <SectionHeader
          title="Player Database"
          subtitle={`Explore ${players?.length || 0} international cricketers`}
        />

        {/* Search & Filters */}
        <div className="premium-card p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search players by name..."
                className="input-search"
              />
            </div>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-navy-800 border border-gray-200 dark:border-navy-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cricket-500 outline-none"
            >
              {countries.map(c => <option key={c} value={c}>{c === 'All' ? 'All Countries' : c}</option>)}
            </select>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-navy-800 border border-gray-200 dark:border-navy-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cricket-500 outline-none"
            >
              {roles.map(r => <option key={r} value={r}>{r === 'All' ? 'All Roles' : r}</option>)}
            </select>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="skeleton h-80 rounded-2xl" />
            ))}
          </div>
        ) : players?.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No players found"
            description="Try adjusting your search or filters"
          />
        ) : (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{players?.length} players found</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {players?.map((player, i) => (
                <PlayerCard key={player.id} player={player} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
