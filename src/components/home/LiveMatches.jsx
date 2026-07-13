import { useLiveMatches } from '../../hooks/useData';
import { MatchCard, SectionHeader, Skeleton } from '../common';

export default function LiveMatches() {
  const { data: matches, isLoading } = useLiveMatches();

  return (
    <section className="py-12">
      <div className="container-premium">
        <SectionHeader
          title="Live Matches"
          subtitle="Follow the action in real-time"
          link="/matches/live"
          linkText="All Matches"
        />
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches?.map((match, i) => (
              <MatchCard key={match.id} match={match} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
