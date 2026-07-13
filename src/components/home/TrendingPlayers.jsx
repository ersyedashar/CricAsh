import { usePlayers } from '../../hooks/useData';
import { PlayerCard, SectionHeader, Skeleton } from '../common';

export default function TrendingPlayers() {
  const { data: players, isLoading } = usePlayers();

  return (
    <section className="py-12 bg-white dark:bg-navy-900/50">
      <div className="container-premium">
        <SectionHeader
          title="Trending Players"
          subtitle="The best cricketers in the world right now"
          link="/players"
          linkText="All Players"
        />
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-80 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {players?.slice(0, 8).map((player, i) => (
              <PlayerCard key={player.id} player={player} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
