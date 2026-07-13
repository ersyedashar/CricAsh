import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SearchModal from '../common/SearchModal';
import BackToTop from '../common/BackToTop';
import { useApp } from '../../context/AppContext';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { searchOpen } = useApp();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-navy-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-18">{children}</main>
      <Footer />
      {searchOpen && <SearchModal />}
      <BackToTop />
    </div>
  );
}
