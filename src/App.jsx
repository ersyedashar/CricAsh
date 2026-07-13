import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const PlayersPage = lazy(() => import('./pages/PlayersPage'));
const PlayerProfile = lazy(() => import('./pages/PlayerProfile'));
const TeamsPage = lazy(() => import('./pages/TeamsPage'));
const TeamDetailPage = lazy(() => import('./pages/TeamDetailPage'));
const TournamentsPage = lazy(() => import('./pages/TournamentsPage'));
const TournamentDetailPage = lazy(() => import('./pages/TournamentDetailPage'));
const MatchesPage = lazy(() => import('./pages/MatchesPage'));
const RankingsPage = lazy(() => import('./pages/RankingsPage'));
const StatisticsPage = lazy(() => import('./pages/StatisticsPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const FantasyPage = lazy(() => import('./pages/FantasyPage'));
const VenuesPage = lazy(() => import('./pages/VenuesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-cricket-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/players/:id" element={<PlayerProfile />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/teams/:id" element={<TeamDetailPage />} />
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/matches/live" element={<MatchesPage />} />
          <Route path="/matches/upcoming" element={<MatchesPage />} />
          <Route path="/matches/results" element={<MatchesPage />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/fantasy" element={<FantasyPage />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
