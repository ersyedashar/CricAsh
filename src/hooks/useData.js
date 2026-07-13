import { useQuery } from '@tanstack/react-query';
import { players } from '../data/players';
import { teams } from '../data/teams';
import { tournaments } from '../data/tournaments';
import { liveMatches, upcomingMatches, recentResults } from '../data/matches';
import { news } from '../data/news';
import { venues, rankings, records } from '../data/venues';

const simulateDelay = (data, ms = 300) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export function usePlayers(filters = {}) {
  return useQuery({
    queryKey: ['players', filters],
    queryFn: async () => {
      let result = [...players];
      if (filters.country) result = result.filter((p) => p.country === filters.country);
      if (filters.role) result = result.filter((p) => p.role.includes(filters.role));
      if (filters.search) {
        const s = filters.search.toLowerCase();
        result = result.filter((p) => p.name.toLowerCase().includes(s) || p.country.toLowerCase().includes(s));
      }
      return simulateDelay(result);
    },
  });
}

export function usePlayer(id) {
  return useQuery({
    queryKey: ['player', id],
    queryFn: async () => simulateDelay(players.find((p) => p.id === Number(id)) || null),
  });
}

export function useTeams() {
  return useQuery({ queryKey: ['teams'], queryFn: async () => simulateDelay(teams) });
}

export function useTeam(id) {
  return useQuery({
    queryKey: ['team', id],
    queryFn: async () => simulateDelay(teams.find((t) => t.id === id) || null),
  });
}

export function useTournaments() {
  return useQuery({ queryKey: ['tournaments'], queryFn: async () => simulateDelay(tournaments) });
}

export function useTournament(id) {
  return useQuery({
    queryKey: ['tournament', id],
    queryFn: async () => simulateDelay(tournaments.find((t) => t.id === id) || null),
  });
}

export function useLiveMatches() {
  return useQuery({ queryKey: ['liveMatches'], queryFn: async () => simulateDelay(liveMatches) });
}

export function useUpcomingMatches() {
  return useQuery({ queryKey: ['upcomingMatches'], queryFn: async () => simulateDelay(upcomingMatches) });
}

export function useRecentResults() {
  return useQuery({ queryKey: ['recentResults'], queryFn: async () => simulateDelay(recentResults) });
}

export function useNews(filters = {}) {
  return useQuery({
    queryKey: ['news', filters],
    queryFn: async () => {
      let result = [...news];
      if (filters.category) result = result.filter((n) => n.category.toLowerCase() === filters.category.toLowerCase());
      if (filters.search) {
        const s = filters.search.toLowerCase();
        result = result.filter((n) => n.title.toLowerCase().includes(s) || n.excerpt.toLowerCase().includes(s));
      }
      return simulateDelay(result);
    },
  });
}

export function useVenues() {
  return useQuery({ queryKey: ['venues'], queryFn: async () => simulateDelay(venues) });
}

export function useRankings(format = 'test') {
  return useQuery({
    queryKey: ['rankings', format],
    queryFn: async () => simulateDelay(rankings[format] || rankings.test),
  });
}

export function useRecords() {
  return useQuery({ queryKey: ['records'], queryFn: async () => simulateDelay(records) });
}
