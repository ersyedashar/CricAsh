import RecordsSection from '../components/home/RecordsSection';

export default function StatisticsPage() {
  return (
    <div className="py-8">
      <div className="container-premium">
        <h1 className="section-title mb-2">Statistics & Records</h1>
        <p className="section-subtitle mb-8">Comprehensive cricket statistics and all-time records</p>
      </div>
      <RecordsSection />
    </div>
  );
}
