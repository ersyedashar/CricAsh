import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || '';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error('API Error:', err.message);
    return Promise.reject(err);
  }
);

export const cricketAPI = {
  getLiveMatches: () => api.get('/api/matches/live'),
  getUpcomingMatches: () => api.get('/api/matches/upcoming'),
  getRecentResults: () => api.get('/api/matches/results'),
  getMatchScorecard: (id) => api.get(`/api/matches/${id}/scorecard`),
  getPlayers: (params) => api.get('/api/players', { params }),
  getPlayer: (id) => api.get(`/api/players/${id}`),
  getRankings: (format) => api.get(`/api/rankings/${format}`),
  getNews: (params) => api.get('/api/news', { params }),
  getTeams: () => api.get('/api/teams'),
  getTeam: (id) => api.get(`/api/teams/${id}`),
  getTournaments: () => api.get('/api/tournaments'),
  getTournament: (id) => api.get(`/api/tournaments/${id}`),
  search: (query) => api.get(`/api/search?q=${encodeURIComponent(query)}`),
};

export default api;
