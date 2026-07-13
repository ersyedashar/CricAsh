import axios from 'axios';

const CRICAPI_BASE = 'https://api.cricapi.com/v1';
const CRICAPI_KEY = import.meta.env.VITE_CRICAPI_KEY || '';

export const isAPIConfigured = () => Boolean(CRICAPI_KEY && CRICAPI_KEY !== 'YOUR_API_KEY_HERE');

const cricApi = axios.create({
  baseURL: CRICAPI_BASE,
  timeout: 15000,
  params: { apikey: CRICAPI_KEY },
});

cricApi.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error('CricAPI Error:', err.message);
    return Promise.reject(err);
  }
);

function getCountryFlag(teamName) {
  const flags = {
    'India': '🇮🇳', 'Australia': '🇦🇺', 'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Pakistan': '🇵🇰',
    'South Africa': '🇿🇦', 'New Zealand': '🇳🇿', 'Sri Lanka': '🇱🇰', 'West Indies': '🏏',
    'Bangladesh': '🇧🇩', 'Afghanistan': '🇦🇫', 'Zimbabwe': '🇿🇼', 'Ireland': '🇮🇪',
    'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Netherlands': '🇳🇱', 'Nepal': '🇳🇵', 'USA': '🇺🇸',
    'Canada': '🇨🇦', 'UAE': '🇦🇪', 'Oman': '🇴🇲', 'Papua New Guinea': '🇵🇬',
  };
  return flags[teamName] || '🏏';
}

function getShortName(teamName) {
  const shortNames = {
    'India': 'IND', 'Australia': 'AUS', 'England': 'ENG', 'Pakistan': 'PAK',
    'South Africa': 'SA', 'New Zealand': 'NZ', 'Sri Lanka': 'SL', 'West Indies': 'WI',
    'Bangladesh': 'BAN', 'Afghanistan': 'AFG', 'Zimbabwe': 'ZIM', 'Ireland': 'IRE',
    'Scotland': 'SCO', 'Netherlands': 'NED', 'Nepal': 'NEP', 'USA': 'USA',
  };
  return shortNames[teamName] || teamName?.slice(0, 3).toUpperCase() || 'TBD';
}

function formatMatchType(type) {
  if (!type) return 'T20';
  const t = type.toLowerCase();
  if (t.includes('test')) return 'Test';
  if (t.includes('odi') || t.includes('one day')) return 'ODI';
  return 'T20I';
}

export function transformMatch(m) {
  if (!m) return null;

  const team1Name = m.teams?.[0] || 'TBD';
  const team2Name = m.teams?.[1] || 'TBD';
  const score1 = m.score?.find((s) => s.inning?.includes(team1Name));
  const score2 = m.score?.find((s) => s.inning?.includes(team2Name));

  const isLive = m.status?.toLowerCase().includes('live') ||
    m.status?.toLowerCase().includes('progress') ||
    (m.matchStarted && !m.matchEnded);

  const isComplete = m.matchEnded ||
    m.status?.toLowerCase().includes('won') ||
    m.status?.toLowerCase().includes('draw') ||
    m.status?.toLowerCase().includes('tie') ||
    m.status?.toLowerCase().includes('complete');

  function formatScore(s) {
    if (!s) return undefined;
    return `${s.r}/${s.w}`;
  }

  function formatOvers(s) {
    if (!s) return undefined;
    return `${s.o}`;
  }

  let status;
  if (isComplete) {
    status = m.status || 'Complete';
  } else if (isLive) {
    status = m.status || 'Live';
  } else {
    const matchDate = m.date ? new Date(m.date) : null;
    status = matchDate ? matchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Upcoming';
  }

  return {
    id: m.id,
    format: formatMatchType(m.matchType),
    status,
    isLive,
    team1: {
      name: team1Name,
      shortName: getShortName(team1Name),
      flag: getCountryFlag(team1Name),
      score: formatScore(score1),
      overs: formatOvers(score1),
    },
    team2: {
      name: team2Name,
      shortName: getShortName(team2Name),
      flag: getCountryFlag(team2Name),
      score: formatScore(score2),
      overs: formatOvers(score2),
    },
    venue: m.venue || '',
    date: m.date || '',
    matchStatus: isLive ? (m.status || 'In Progress') : isComplete ? (m.status || 'Match Ended') : undefined,
    result: isComplete ? m.status : undefined,
  };
}

export const cricketAPI = {
  async getCurrentMatches() {
    if (!isAPIConfigured()) return null;
    const res = await cricApi.get('/currentMatches');
    if (res.status !== 'success' || !res.data) return null;
    return res.data.map(transformMatch).filter(Boolean);
  },

  async getMatchScorecard(matchId) {
    if (!isAPIConfigured()) return null;
    const res = await cricApi.get('/matchScorecard', { params: { matchId } });
    if (res.status !== 'success' || !res.data) return null;
    return res.data;
  },

  async getPlayers(offset = 0, search = '') {
    if (!isAPIConfigured()) return null;
    const res = await cricApi.get('/players', { params: { offset, search } });
    if (res.status !== 'success' || !res.data) return null;
    return res.data;
  },

  async getPlayerInfo(playerId) {
    if (!isAPIConfigured()) return null;
    const res = await cricApi.get('/playerInfo', { params: { playerId } });
    if (res.status !== 'success' || !res.data) return null;
    return res.data;
  },

  async getSeries() {
    if (!isAPIConfigured()) return null;
    const res = await cricApi.get('/series');
    if (res.status !== 'success' || !res.data) return null;
    return res.data;
  },
};

export default cricApi;
