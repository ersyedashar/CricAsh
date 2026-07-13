import { useState } from 'react';
import { useNews } from '../hooks/useData';
import { SectionHeader, Badge, Skeleton } from '../components/common';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Search, Newspaper } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'international', name: 'International' },
  { id: 'ipl', name: 'IPL' },
  { id: "women's cricket", name: "Women's Cricket" },
  { id: 'domestic', name: 'Domestic' },
  { id: 'opinion', name: 'Opinion' },
  { id: 'rankings', name: 'Rankings' },
];

export default function NewsPage() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const { data: newsItems, isLoading } = useNews({ category: category === 'all' ? undefined : category, search });

  return (
    <div className="py-8">
      <div className="container-premium">
        <SectionHeader title="Cricket News" subtitle="Latest news from the world of cricket" />

        {/* Filters */}
        <div className="premium-card p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search news..."
                className="input-search"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  category === c.id
                    ? 'bg-cricket-500 text-white'
                    : 'bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-72 rounded-2xl" />)}
          </div>
        ) : newsItems?.length === 0 ? (
          <div className="text-center py-16">
            <Newspaper className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No news articles found</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {newsItems?.[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <Link to={`/news/${newsItems[0].id}`} className="block premium-card-hover overflow-hidden group">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto overflow-hidden">
                      <img src={newsItems[0].image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <Badge variant="live" className="absolute top-4 left-4">Featured</Badge>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <Badge className="w-fit mb-3">{newsItems[0].category}</Badge>
                      <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white group-hover:text-cricket-600 dark:group-hover:text-cricket-400 transition-colors mb-3">
                        {newsItems[0].title}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">{newsItems[0].excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Date(newsItems[0].date).toLocaleDateString()}</span>
                        <span>By {newsItems[0].author}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems?.slice(1).map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/news/${item.id}`} className="block premium-card-hover overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <Badge className="absolute top-3 left-3">{item.category}</Badge>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-cricket-600 dark:group-hover:text-cricket-400 transition-colors line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{item.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(item.date).toLocaleDateString()}</span>
                        <span className="text-cricket-500 flex items-center gap-1">Read more <ArrowRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
