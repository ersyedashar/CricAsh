import { useState } from 'react';
import { useRankings } from '../hooks/useData';
import { SectionHeader, RankingTable, TabBar, Skeleton } from '../components/common';

export default function RankingsPage() {
  const [format, setFormat] = useState('test');
  const [type, setType] = useState('batting');
  const { data: rankings, isLoading } = useRankings(format);

  return (
    <div className="py-8">
      <div className="container-premium">
        <SectionHeader title="ICC Rankings" subtitle="Official International Cricket Council rankings" />
        <div className="premium-card overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-navy-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <TabBar
              tabs={[
                { label: 'Test', value: 'test' },
                { label: 'ODI', value: 'odi' },
                { label: 'T20I', value: 't20' },
              ]}
              active={format}
              onChange={setFormat}
            />
            <div className="flex gap-2">
              {['batting', 'bowling'].map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    type === t ? 'bg-cricket-500 text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-12 rounded-lg" />)}
            </div>
          ) : (
            <RankingTable data={rankings?.[type] || []} type={type} />
          )}
        </div>
      </div>
    </div>
  );
}
