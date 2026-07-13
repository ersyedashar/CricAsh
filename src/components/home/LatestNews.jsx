import { useNews } from '../../hooks/useData';
import { SectionHeader, Badge, Skeleton } from '../common';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

export default function LatestNews() {
  const { data: newsItems, isLoading } = useNews();

  return (
    <section className="py-12 bg-white dark:bg-navy-900/50">
      <div className="container-premium">
        <SectionHeader
          title="Latest News"
          subtitle="Stay updated with cricket news from around the world"
          link="/news"
          linkText="All News"
        />
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-72 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems?.slice(0, 6).map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Link to={`/news/${item.id}`} className="block premium-card-hover overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className="absolute top-3 left-3">{item.category}</Badge>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-cricket-600 dark:group-hover:text-cricket-400 transition-colors line-clamp-2 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-cricket-500 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
