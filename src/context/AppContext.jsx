import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('cw-bookmarks') || '[]');
    }
    return [];
  });

  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('cw-favorites') || '[]');
    }
    return [];
  });

  const [searchOpen, setSearchOpen] = useState(false);

  const toggleBookmark = useCallback((item) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.id === item.id && b.type === item.type);
      const next = exists ? prev.filter(b => !(b.id === item.id && b.type === item.type)) : [...prev, item];
      localStorage.setItem('cw-bookmarks', JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((playerId) => {
    setFavorites(prev => {
      const next = prev.includes(playerId) ? prev.filter(id => id !== playerId) : [...prev, playerId];
      localStorage.setItem('cw-favorites', JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback((id, type) => bookmarks.some(b => b.id === id && b.type === type), [bookmarks]);
  const isFavorite = useCallback((playerId) => favorites.includes(playerId), [favorites]);

  return (
    <AppContext.Provider value={{
      bookmarks, toggleBookmark, isBookmarked,
      favorites, toggleFavorite, isFavorite,
      searchOpen, setSearchOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
