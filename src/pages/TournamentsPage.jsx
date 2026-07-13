import { useTournaments } from '../hooks/useData';
import { TournamentCard, SectionHeader, Skeleton } from '../components/common';

export default function TournamentsPage() {
  const { data: tournaments, isLoading } = useTournaments();

  return (
    <div className="py-8">
      <div className="container-premium">
        <SectionHeader title="Tournaments" subtitle="Major cricket competitions worldwide" />
        {isLoading ? (
          <div className="grid sm:grid-cols-2 gap-6">{[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-36 rounded-2xl" />)}</div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">{tournaments?.map((t, i) => <TournamentCard key={t.id} tournament={t} index={i} />)}</div>
        )}
      </div>
    </div>
  );
}
