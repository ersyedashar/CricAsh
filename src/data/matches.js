export const liveMatches = [
  {
    id: 'live-1', format: 'Test', status: 'Day 3 - Stumps',
    team1: { name: 'India', shortName: 'IND', flag: '🇮🇳', score: '487/6d & 121/3', overs: '154.2 & 28.4' },
    team2: { name: 'Australia', shortName: 'AUS', flag: '🇦🇺', score: '310 & 28/0', overs: '98.5 & 8.2' },
    venue: 'Narendra Modi Stadium, Ahmedabad', date: '2026-01-12',
    toss: 'India won the toss and elected to bat',
    currentBatter: 'V. Kohli (45*)', currentBowler: 'P. Cummins (2/34)',
    requiredRunRate: '0.00', matchStatus: 'Australia need 271 runs',
    manOfTheMatch: null, isLive: true,
  },
  {
    id: 'live-2', format: 'ODI', status: '50th Over',
    team1: { name: 'England', shortName: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', score: '312/8', overs: '49.3' },
    team2: { name: 'Pakistan', shortName: 'PAK', flag: '🇵🇰', score: '185/4', overs: '32.0' },
    venue: 'Lord\'s, London', date: '2026-07-10',
    toss: 'England won the toss and elected to bat',
    currentBatter: 'B. Azam (67*)', currentBowler: 'J. Archer (1/28)',
    requiredRunRate: '6.75', matchStatus: 'Pakistan need 128 runs',
    manOfTheMatch: null, isLive: true,
  },
  {
    id: 'live-3', format: 'T20I', status: 'Innings Break',
    team1: { name: 'South Africa', shortName: 'SA', flag: '🇿🇦', score: '198/5', overs: '20.0' },
    team2: { name: 'West Indies', shortName: 'WI', flag: '🏏', score: '45/1', overs: '5.3' },
    venue: 'Newlands, Cape Town', date: '2026-07-11',
    toss: 'South Africa won the toss and elected to bat',
    currentBatter: 'S. Hope (22*)', currentBowler: 'K. Rabada (1/15)',
    requiredRunRate: '9.83', matchStatus: 'WI need 154 runs',
    manOfTheMatch: null, isLive: true,
  },
];

export const upcomingMatches = [
  {
    id: 'up-1', format: 'Test', status: 'Upcoming',
    team1: { name: 'India', shortName: 'IND', flag: '🇮🇳' },
    team2: { name: 'Australia', shortName: 'AUS', flag: '🇦🇺' },
    venue: 'Melbourne Cricket Ground', date: '2026-12-26', event: 'Boxing Day Test',
  },
  {
    id: 'up-2', format: 'ODI', status: 'Upcoming',
    team1: { name: 'England', shortName: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    team2: { name: 'India', shortName: 'IND', flag: '🇮🇳' },
    venue: "Lord's, London", date: '2026-07-14', event: '3rd ODI',
  },
  {
    id: 'up-3', format: 'T20I', status: 'Upcoming',
    team1: { name: 'Australia', shortName: 'AUS', flag: '🇦🇺' },
    team2: { name: 'South Africa', shortName: 'SA', flag: '🇿🇦' },
    venue: 'SCG, Sydney', date: '2026-07-18', event: '1st T20I',
  },
  {
    id: 'up-4', format: 'Test', status: 'Upcoming',
    team1: { name: 'Pakistan', shortName: 'PAK', flag: '🇵🇰' },
    team2: { name: 'England', shortName: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    venue: 'Gaddafi Stadium, Lahore', date: '2026-08-05', event: '1st Test',
  },
  {
    id: 'up-5', format: 'ODI', status: 'Upcoming',
    team1: { name: 'New Zealand', shortName: 'NZ', flag: '🇳🇿' },
    team2: { name: 'Bangladesh', shortName: 'BAN', flag: '🇧🇩' },
    venue: 'Basin Reserve, Wellington', date: '2026-07-20', event: '2nd ODI',
  },
];

export const recentResults = [
  {
    id: 'res-1', format: 'Test', status: 'Complete',
    team1: { name: 'India', shortName: 'IND', flag: '🇮🇳', score: '410 & 178/5d', overs: '120.3 & 48.2' },
    team2: { name: 'England', shortName: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', score: '283 & 135', overs: '89.1 & 52.4' },
    venue: 'Edgbaston, Birmingham', result: 'India won by 170 runs',
    manOfTheMatch: 'J. Bumrah (8/65)',
  },
  {
    id: 'res-2', format: 'ODI', status: 'Complete',
    team1: { name: 'Australia', shortName: 'AUS', flag: '🇦🇺', score: '286/9', overs: '50.0' },
    team2: { name: 'South Africa', shortName: 'SA', flag: '🇿🇦', score: '288/4', overs: '47.3' },
    venue: 'Newlands, Cape Town', result: 'South Africa won by 6 wickets',
    manOfTheMatch: 'Q. de Kock (122)',
  },
  {
    id: 'res-3', format: 'T20I', status: 'Complete',
    team1: { name: 'Pakistan', shortName: 'PAK', flag: '🇵🇰', score: '165/7', overs: '20.0' },
    team2: { name: 'New Zealand', shortName: 'NZ', flag: '🇳🇿', score: '158/8', overs: '20.0' },
    venue: 'Gaddafi Stadium, Lahore', result: 'Pakistan won by 7 runs',
    manOfTheMatch: 'S. Afridi (3/22)',
  },
];

export const scorecard = {
  matchId: 'live-1',
  innings: [
    {
      team: 'India', score: '487/6d', overs: 154.2,
      batting: [
        { name: 'Rohit Sharma', dismissal: 'c Smith b Cummins', runs: 68, balls: 89, fours: 8, sixes: 2, sr: 76.40 },
        { name: 'Yashasvi Jaiswal', dismissal: 'lbw b Hazlewood', runs: 42, balls: 67, fours: 6, sixes: 0, sr: 62.69 },
        { name: 'Virat Kohli', dismissal: 'not out', runs: 136, balls: 201, fours: 14, sixes: 2, sr: 67.66 },
        { name: 'Rishabh Pant', dismissal: 'c Labuschagne b Lyon', runs: 88, balls: 102, fours: 10, sixes: 3, sr: 86.27 },
        { name: 'Ravindra Jadeja', dismissal: 'st de Kock b Lyon', runs: 77, balls: 88, fours: 8, sixes: 1, sr: 87.50 },
        { name: 'Axar Patel', dismissal: 'c Cummins b Hazlewood', runs: 34, balls: 40, fours: 4, sixes: 1, sr: 85.00 },
      ],
      bowling: [
        { name: 'Pat Cummins', overs: 32.2, maidens: 6, runs: 89, wickets: 2, economy: 2.75, extras: 4 },
        { name: 'Josh Hazlewood', overs: 30.0, maidens: 8, runs: 78, wickets: 2, economy: 2.60, extras: 2 },
        { name: 'Nathan Lyon', overs: 45.0, maidens: 5, runs: 145, wickets: 2, economy: 3.22, extras: 6 },
      ],
      extras: { byes: 8, legByes: 12, wides: 4, noBalls: 2, total: 26 },
    },
    {
      team: 'Australia', score: '310', overs: 98.5,
      batting: [
        { name: 'Usman Khawaja', dismissal: 'c Pant b Bumrah', runs: 45, balls: 82, fours: 5, sixes: 0, sr: 54.88 },
        { name: 'David Warner', dismissal: 'b Jadeja', runs: 38, balls: 52, fours: 4, sixes: 1, sr: 73.08 },
        { name: 'Marnus Labuschagne', dismissal: 'c Kohli b Jadeja', runs: 92, balls: 156, fours: 11, sixes: 0, sr: 58.97 },
        { name: 'Steve Smith', dismissal: 'lbw b Bumrah', runs: 67, balls: 108, fours: 8, sixes: 0, sr: 62.04 },
        { name: 'Travis Head', dismissal: 'c Axar b Kuldeep', runs: 42, balls: 45, fours: 5, sixes: 2, sr: 93.33 },
      ],
      bowling: [
        { name: 'Jasprit Bumrah', overs: 25.5, maidens: 7, runs: 56, wickets: 3, economy: 2.17, extras: 2 },
        { name: 'Ravindra Jadeja', overs: 32.0, maidens: 4, runs: 98, wickets: 3, economy: 3.06, extras: 3 },
        { name: 'Kuldeep Yadav', overs: 24.0, maidens: 3, runs: 72, wickets: 2, economy: 3.00, extras: 1 },
      ],
      extras: { byes: 5, legByes: 8, wides: 3, noBalls: 1, total: 17 },
    },
  ],
  fallOfWickets: [
    { runs: '89/1', wicket: 'Jaiswal', overs: '22.3' },
    { runs: '156/2', wicket: 'Rohit', overs: '38.1' },
    { runs: '289/3', wicket: 'Pant', overs: '72.4' },
    { runs: '389/4', wicket: 'Kohli', overs: '112.5' },
    { runs: '453/5', wicket: 'Jadeja', overs: '140.2' },
    { runs: '487/6', wicket: 'Axar', overs: '154.2' },
  ],
  partnerships: [
    { batsmen: 'Rohit & Kohli', runs: 67, balls: 89, overs: '15.3-31.1' },
    { batsmen: 'Kohli & Pant', runs: 133, balls: 198, overs: '31.1-65.2' },
    { batsmen: 'Kohli & Jadeja', runs: 100, balls: 128, overs: '65.2-88.4' },
    { batsmen: 'Pant & Jadeja', runs: 64, balls: 67, overs: '88.4-102.0' },
  ],
};

export default { liveMatches, upcomingMatches, recentResults, scorecard };
