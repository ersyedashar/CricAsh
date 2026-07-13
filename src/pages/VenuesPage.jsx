import { useVenues } from '../hooks/useData';
import { SectionHeader, GlassCard, Skeleton } from '../components/common';
import { motion } from 'framer-motion';
import { MapPin, Users, Cloud, Trophy } from 'lucide-react';

export default function VenuesPage() {
  const { data: venues, isLoading } = useVenues();

  return (
    <div className="py-8">
      <div className="container-premium">
        <SectionHeader title="Cricket Venues" subtitle="Iconic cricket stadiums around the world" />
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">{[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-64 rounded-2xl" />)}</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {venues?.map((venue, i) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="premium-card-hover overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-bold text-white">{venue.name}</h3>
                    <p className="text-white/70 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {venue.city}, {venue.country}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-gray-50 dark:bg-navy-700/50 rounded-lg">
                      <Users className="w-4 h-4 mx-auto text-cricket-500 mb-1" />
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{venue.capacity.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Capacity</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-navy-700/50 rounded-lg">
                      <Trophy className="w-4 h-4 mx-auto text-amber-500 mb-1" />
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{venue.established}</p>
                      <p className="text-xs text-gray-400">Established</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-navy-700/50 rounded-lg">
                      <Trophy className="w-4 h-4 mx-auto text-purple-500 mb-1" />
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{venue.records.highestIndividual}</p>
                      <p className="text-xs text-gray-400">Best Score</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <span className="text-gray-400 shrink-0">Pitch:</span>
                      <span className="text-gray-600 dark:text-gray-300">{venue.pitchReport}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Cloud className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{venue.weather}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
