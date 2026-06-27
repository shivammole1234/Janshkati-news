import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, TrendingUp, History, CornerDownLeft, Filter } from 'lucide-react';
import { Language, Article } from '../types';
import { TRANSLATIONS, CATEGORIES } from '../data';
import { safeStorage } from '../App';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onArticleClick: (articleId: string) => void;
  articles: Article[];
}

export default function SearchOverlay({
  isOpen,
  onClose,
  currentLanguage,
  onArticleClick,
  articles
}: SearchOverlayProps) {
  const t = TRANSLATIONS[currentLanguage];
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load and save recent searches
  useEffect(() => {
    const saved = safeStorage.getItem('janshakti_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Autofocus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const trendingSearches = [
    { text: "Vande Bharat", english: "Vande Bharat", marathi: "वंदे भारत", hindi: "वंदे भारत" },
    { text: "Monsoon Update", english: "Monsoon", marathi: "मान्सून", hindi: "मानसून" },
    { text: "GST", english: "GST Collection", marathi: "जीएसटी", hindi: "जीएसटी" },
    { text: "IndiLLM", english: "AI Model", marathi: "कृत्रिम बुद्धिमत्ता", hindi: "कृत्रिम बुद्धिमत्ता" }
  ];

  // Filter logic
  const filteredArticles = articles.filter(art => {
    const titleText = (art.title[currentLanguage] || '').toLowerCase();
    const summaryText = (art.summary[currentLanguage] || '').toLowerCase();
    const searchTerms = query.toLowerCase();

    const matchesQuery = titleText.includes(searchTerms) || summaryText.includes(searchTerms);
    const matchesCategory = selectedCategory ? art.category === selectedCategory : true;

    return matchesQuery && matchesCategory;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const updated = [query.trim(), ...recentSearches.filter(s => s !== query.trim())].slice(0, 5);
    setRecentSearches(updated);
    safeStorage.setItem('janshakti_searches', JSON.stringify(updated));
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const clearRecent = () => {
    setRecentSearches([]);
    safeStorage.removeItem('janshakti_searches');
  };

  // Helper to highlight matching keywords
  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? (
            <mark key={i} className="bg-amber-200 text-brand-charcoal font-semibold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="search-overlay-container" className="fixed inset-0 z-50 flex flex-col bg-white overflow-hidden">
          {/* Header Bar */}
          <div className="border-b border-brand-border py-4 px-6 bg-brand-light">
            <div className="max-w-[1000px] mx-auto flex items-center justify-between">
              <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center relative mr-6">
                <Search className="w-5 h-5 text-brand-red absolute left-4" />
                <input
                  ref={inputRef}
                  type="text"
                  id="search-input-field"
                  placeholder={t.searchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white border-2 border-brand-border rounded-xl font-medium text-brand-charcoal focus:border-brand-red focus:outline-none shadow-sm transition-all text-sm md:text-base"
                />
                {query && (
                  <button
                    type="button"
                    id="search-clear-query-btn"
                    onClick={() => setQuery('')}
                    className="p-1 text-brand-muted-text hover:text-brand-charcoal absolute right-4 rounded-full hover:bg-brand-light"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Close Button */}
              <button
                id="search-close-btn"
                onClick={onClose}
                className="flex items-center space-x-1 px-4 py-2 bg-brand-charcoal text-white rounded-lg hover:bg-red-800 transition-colors text-sm font-semibold cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Panel: History, Trends & Category Filters */}
              <div className="lg:col-span-1 space-y-6">
                {/* Category Filters */}
                <div className="bg-brand-light p-5 rounded-2xl border border-brand-border">
                  <h3 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-3 flex items-center">
                    <Filter className="w-3.5 h-3.5 mr-2 text-brand-red" />
                    Filter by Section
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      id="search-cat-all"
                      onClick={() => setSelectedCategory(null)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        selectedCategory === null
                          ? 'bg-brand-red text-white'
                          : 'bg-white border border-brand-border text-brand-secondary-text hover:bg-brand-light'
                      }`}
                    >
                      {t.allCategories}
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        id={`search-cat-${cat.id}`}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-brand-red text-white'
                            : 'bg-white border border-brand-border text-brand-secondary-text hover:bg-brand-light'
                        }`}
                      >
                        {cat.label[currentLanguage]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="bg-brand-light p-5 rounded-2xl border border-brand-border">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider flex items-center">
                        <History className="w-3.5 h-3.5 mr-2 text-brand-red" />
                        {t.searchRecent}
                      </h3>
                      <button
                        id="search-clear-recent-btn"
                        onClick={clearRecent}
                        className="text-[10px] text-brand-muted-text hover:text-brand-red font-semibold uppercase"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {recentSearches.map((term, i) => (
                        <button
                          key={i}
                          id={`recent-search-${i}`}
                          onClick={() => handleRecentClick(term)}
                          className="w-full text-left py-1 px-2 rounded hover:bg-white text-xs font-medium text-brand-secondary-text hover:text-brand-red transition-colors flex items-center justify-between"
                        >
                          <span>{term}</span>
                          <CornerDownLeft className="w-3 h-3 text-brand-muted-text opacity-40" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                <div className="bg-brand-light p-5 rounded-2xl border border-brand-border">
                  <h3 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-3 flex items-center">
                    <TrendingUp className="w-3.5 h-3.5 mr-2 text-brand-red" />
                    {t.searchTrending}
                  </h3>
                  <div className="space-y-2">
                    {trendingSearches.map((item, idx) => (
                      <button
                        key={idx}
                        id={`trending-search-${idx}`}
                        onClick={() => handleRecentClick(item[currentLanguage] || item.text)}
                        className="w-full text-left py-2 px-3 bg-white border border-brand-border hover:border-brand-red hover:text-brand-red rounded-xl text-xs font-semibold text-brand-charcoal transition-all shadow-sm flex items-center justify-between"
                      >
                        <span>{idx + 1}. {item[currentLanguage] || item.text}</span>
                        <span className="text-[10px] text-brand-muted-text bg-brand-light px-1.5 py-0.5 rounded">Trending</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel: Live Results */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-brand-border">
                  <span className="text-xs font-bold text-brand-muted-text uppercase tracking-wider">
                    {filteredArticles.length} Search Results
                  </span>
                </div>

                {filteredArticles.length === 0 ? (
                  <div className="py-12 text-center text-brand-secondary-text">
                    <p className="font-serif text-lg italic mb-2">{t.searchNoResults}</p>
                    <p className="text-xs text-brand-muted-text">Try different keywords or check your spelling.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredArticles.map((art) => (
                      <motion.div
                        key={art.id}
                        id={`search-result-card-${art.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => {
                          onArticleClick(art.id);
                          onClose();
                        }}
                        className="p-4 bg-white border border-brand-border hover:border-brand-red rounded-xl shadow-sm hover:shadow transition-all flex space-x-4 cursor-pointer hover-lift group"
                      >
                        {/* Article image thumbnail */}
                        <div className="w-20 h-20 sm:w-28 sm:h-24 bg-brand-light rounded-lg overflow-hidden flex-shrink-0 border border-brand-border">
                          <img
                            src={art.image}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Article meta info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <span className="inline-block text-[10px] font-black tracking-wider text-brand-red uppercase mb-1">
                              {CATEGORIES.find(c => c.id === art.category)?.label[currentLanguage] || art.category}
                            </span>
                            <h4 className="font-serif font-bold text-sm sm:text-base text-brand-charcoal leading-snug group-hover:text-brand-red transition-colors line-clamp-2">
                              {highlightText(art.title[currentLanguage], query)}
                            </h4>
                          </div>
                          <div className="flex items-center space-x-3 text-[11px] text-brand-muted-text mt-1">
                            <span>{art.author.name}</span>
                            <span>•</span>
                            <span>{art.readTime} {t.minsRead}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
