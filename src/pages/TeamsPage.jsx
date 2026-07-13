import { useTeams } from '../hooks/useData';
import { CountryCard, SectionHeader, Skeleton } from '../components/common';
import { motion } from 'framer-motion';

export default function TeamsPage() {
  const { data: teams, isLoading } = useTeams();

  return (
    <div className="py-8">
      <div className="container-premium">
        <SectionHeader
          title="Cricket Teams"
          subtitle={`${teams?.length || 0} international cricket-playing nations`}
        />
        {isLoading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-48 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teams?.map((team, i) => (
              <CountryCard key={team.id} team={team} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
