import { useLiveMatches, useUpcomingMatches, useRecentResults } from '../hooks/useData';
import { MatchCard, SectionHeader, TabBar, Skeleton, EmptyState } from '../components/common';
import { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function MatchesPage() {
  const [tab, setTab] = useState('live');
  const { data: live, isLoading: l1 } = useLiveMatches();
  const { data: upcoming, isLoading: l2 } = useUpcomingMatches();
  const { data: results, isLoading: l3 } = useRecentResults();

  const tabs = [
    { label: 'Live', value: 'live' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Results', value: 'results' },
  ];

  const isLoading = tab === 'live' ? l1 : tab === 'upcoming' ? l2 : l3;
  const data = tab === 'live' ? live : tab === 'upcoming' ? upcoming : results;

  return (
    <div className="py-8">
      <div className="container-premium">
        <SectionHeader title="Matches" subtitle="All cricket matches" />
        <div className="mb-6">
          <TabBar tabs={tabs} active={tab} onChange={setTab} />
        </div>
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 rounded-2xl" />)}
          </div>
        ) : !data || data.length === 0 ? (
          <EmptyState icon={Calendar} title="No matches found" description="Check back later for updates" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((match, i) => (
              <MatchCard key={match.id} match={match} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
