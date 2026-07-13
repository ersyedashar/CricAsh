import { useTournaments } from '../../hooks/useData';
import { TournamentCard, SectionHeader, Skeleton } from '../common';

export default function FeaturedTournaments() {
  const { data: tournaments, isLoading } = useTournaments();

  return (
    <section className="py-12 bg-white dark:bg-navy-900/50">
      <div className="container-premium">
        <SectionHeader
          title="Featured Tournaments"
          subtitle="Major cricket competitions around the world"
          link="/tournaments"
          linkText="All Tournaments"
        />
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-36 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tournaments?.slice(0, 8).map((t, i) => (
              <TournamentCard key={t.id} tournament={t} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
