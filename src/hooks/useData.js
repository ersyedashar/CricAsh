import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { cricketAPI, isAPIConfigured } from '../services/api';
import { players } from '../data/players';
import { teams } from '../data/teams';
import { tournaments } from '../data/tournaments';
import { liveMatches, upcomingMatches, recentResults, scorecard } from '../data/matches';
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
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['liveMatches'],
    queryFn: async () => {
      if (isAPIConfigured()) {
        try {
          const allMatches = await cricketAPI.getCurrentMatches();
          if (allMatches && allMatches.length > 0) {
            return allMatches.filter((m) => m.isLive);
          }
        } catch (err) {
          console.warn('CricAPI live matches failed, using mock data:', err.message);
        }
      }
      return simulateDelay(liveMatches);
    },
    refetchInterval: isAPIConfigured() ? 30000 : false,
    staleTime: isAPIConfigured() ? 20000 : 5 * 60 * 1000,
  });

  return query;
}

export function useUpcomingMatches() {
  return useQuery({
    queryKey: ['upcomingMatches'],
    queryFn: async () => {
      if (isAPIConfigured()) {
        try {
          const allMatches = await cricketAPI.getCurrentMatches();
          if (allMatches && allMatches.length > 0) {
            const upcoming = allMatches.filter((m) => !m.isLive && !m.result);
            if (upcoming.length > 0) return upcoming;
          }
        } catch (err) {
          console.warn('CricAPI upcoming failed, using mock data:', err.message);
        }
      }
      return simulateDelay(upcomingMatches);
    },
  });
}

export function useRecentResults() {
  return useQuery({
    queryKey: ['recentResults'],
    queryFn: async () => {
      if (isAPIConfigured()) {
        try {
          const allMatches = await cricketAPI.getCurrentMatches();
          if (allMatches && allMatches.length > 0) {
            const results = allMatches.filter((m) => m.result);
            if (results.length > 0) return results;
          }
        } catch (err) {
          console.warn('CricAPI results failed, using mock data:', err.message);
        }
      }
      return simulateDelay(recentResults);
    },
  });
}

export function useAllMatches() {
  return useQuery({
    queryKey: ['allMatches'],
    queryFn: async () => {
      if (isAPIConfigured()) {
        try {
          const allMatches = await cricketAPI.getCurrentMatches();
          if (allMatches && allMatches.length > 0) return allMatches;
        } catch (err) {
          console.warn('CricAPI all matches failed, using mock data:', err.message);
        }
      }
      return simulateDelay([...liveMatches, ...upcomingMatches, ...recentResults]);
    },
  });
}

export function useMatchScorecard(matchId) {
  return useQuery({
    queryKey: ['scorecard', matchId],
    queryFn: async () => {
      if (isAPIConfigured()) {
        try {
          const data = await cricketAPI.getMatchScorecard(matchId);
          if (data) return data;
        } catch (err) {
          console.warn('CricAPI scorecard failed, using mock data:', err.message);
        }
      }
      return simulateDelay(scorecard);
    },
    enabled: !!matchId,
  });
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
