import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, Calendar, Clock, MessageSquare, Heart, Bookmark, Share2, 
  Tv, Sparkles, Newspaper, ShieldAlert, CheckCircle2, ChevronRight, X 
} from 'lucide-react';
import { Language, Article, UserProfile } from './types';
import { MOCK_ARTICLES, TRANSLATIONS, CATEGORIES } from './data';
import { getArticlesFromFirestore } from './utils/firebaseSync';
import AdminWorkspace from './components/AdminWorkspace';

export const navigateToPath = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('pushstate-changed'));
};
import { EPAPER_PAGES } from './epaperData';
import { generateEPaperPDF, downloadEPaperPDFDirect } from './utils/pdfGenerator';

// Component imports
import Header from './components/Header';
import BreakingTicker from './components/BreakingTicker';
import SearchOverlay from './components/SearchOverlay';
import ArticleModal from './components/ArticleModal';
import UserProfileModal from './components/UserProfileModal';
import Sidebar from './components/Sidebar';
import LatestNews from './components/LatestNews';
import VideoSection from './components/VideoSection';
import ShortsSection from './components/ShortsSection';
import PhotoGallery from './components/PhotoGallery';
import LiveNews from './components/LiveNews';
import EditorialSection from './components/EditorialSection';
import Footer from './components/Footer';
import EPaperPDFView from './components/EPaperPDFView';
import AdPlacement from './components/AdPlacement';
import AdminPanelModal from './components/AdminPanelModal';


// Maharashtra local news cities translations
const MAHARASHTRA_CITIES = [
  { id: 'all', label: { english: 'All Cities', marathi: 'सर्व शहरे', hindi: 'सभी शहर' } },
  { id: 'mumbai', label: { english: 'Mumbai', marathi: 'मुंबई', hindi: 'मुंबई' } },
  { id: 'pune', label: { english: 'Pune', marathi: 'पुणे', hindi: 'पुणे' } },
  { id: 'jalgaon', label: { english: 'Jalgaon', marathi: 'जळगाव', hindi: 'जलगांव' } },
  { id: 'dhule', label: { english: 'Dhule', marathi: 'धुळे', hindi: 'धुले' } },
  { id: 'bhusawal', label: { english: 'Bhusawal', marathi: 'भुसावळ', hindi: 'भुसावल' } },
  { id: 'nashik', label: { english: 'Nashik', marathi: 'नाशिक', hindi: 'नाशिक' } },
  { id: 'nagpur', label: { english: 'Nagpur', marathi: 'नागपूर', hindi: 'नागपूर' } },
  { id: 'akola', label: { english: 'Akola', marathi: 'अकोला', hindi: 'अकोला' } },
  { id: 'satara', label: { english: 'Satara', marathi: 'सातारा', hindi: 'सातारा' } },
  { id: 'amravati', label: { english: 'Amravati', marathi: 'अमरावती', hindi: 'अमरावती' } },
];

// Robust local storage wrapper to prevent SecurityErrors in sandboxed iframes
export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem(key) : null;
    } catch (e) {
      console.warn("localStorage is not accessible:", e);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn("localStorage is not accessible:", e);
    }
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn("localStorage is not accessible:", e);
    }
  }
};

// Robust copy helper with legacy fallback for iframe environments without permission
export const safeCopyText = (text: string, onSuccess?: () => void) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        console.warn("navigator.clipboard failed, using fallback:", err);
        fallbackCopyText(text, onSuccess);
      });
  } else {
    fallbackCopyText(text, onSuccess);
  }
};

const fallbackCopyText = (text: string, onSuccess?: () => void) => {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (successful && onSuccess) {
      onSuccess();
    }
  } catch (err) {
    console.error('Fallback copy text failed:', err);
  }
};

export default function App() {
  // Global application states
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');
  const [activeCategory, setActiveCategory] = useState<string>('home');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Custom Clientside Router for admin workspace
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.pathname === '/youradmin');

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(window.location.pathname === '/youradmin');
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate-changed', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate-changed', handleLocationChange);
    };
  }, []);

  // Firebase dynamic Articles state
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);

  const loadAllArticles = async () => {
    try {
      const dbArts = await getArticlesFromFirestore();
      if (dbArts && dbArts.length > 0) {
        const dbIds = new Set(dbArts.map(a => a.id));
        const filteredMock = MOCK_ARTICLES.filter(a => !dbIds.has(a.id));
        setArticles([...dbArts, ...filteredMock]);
      } else {
        setArticles(MOCK_ARTICLES);
      }
    } catch (err) {
      console.warn("Could not load dynamic articles:", err);
      setArticles(MOCK_ARTICLES);
    }
  };

  useEffect(() => {
    loadAllArticles();
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSelectedCity('all');
  };
  
  // Modals state
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [epaperOpen, setEpaperOpen] = useState(false);
  const [epaperPage, setEpaperPage] = useState<number>(1);
  const [epaperTranslateMode, setEpaperTranslateMode] = useState<boolean>(false);
  const [epaperViewMode, setEpaperViewMode] = useState<'pdf' | 'interactive'>('pdf');
  const [epaperPdfUrl, setEpaperPdfUrl] = useState<string | null>(null);
  const [generatingPdf, setGeneratingPdf] = useState<boolean>(false);

  // Generate and cache ePaper PDF when open, page, or translation mode changes
  useEffect(() => {
    if (epaperOpen) {
      setGeneratingPdf(true);
      const displayLang = epaperTranslateMode ? 'english' : 'marathi';
      generateEPaperPDF({ pageNumber: epaperPage, language: displayLang })
        .then((url) => {
          if (epaperPdfUrl) {
            URL.revokeObjectURL(epaperPdfUrl);
          }
          setEpaperPdfUrl(url);
          setGeneratingPdf(false);
        })
        .catch((err) => {
          console.error("PDF generation error:", err);
          setGeneratingPdf(false);
        });
    }
  }, [epaperOpen, epaperPage, epaperTranslateMode]);

  // Cleanup PDF blob URL on unmount
  useEffect(() => {
    return () => {
      if (epaperPdfUrl) {
        URL.revokeObjectURL(epaperPdfUrl);
      }
    };
  }, []);
  
  // Local persistence for user states
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Shivam Mole",
    email: "shivammole15@gmail.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    isSubscribed: false,
    bookmarks: [],
    history: [],
    likedArticles: [],
    followedCategories: ['politics', 'maharashtra', 'india'],
    notifications: {
      breakingNews: true,
      dailyNewsletter: true,
      weeklyRoundup: false
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize and load saved bookmarks/likes from localStorage
  useEffect(() => {
    const savedBookmarks = safeStorage.getItem('janshakti_bookmarks');
    const savedLikes = safeStorage.getItem('janshakti_likes');
    const savedProfile = safeStorage.getItem('janshakti_profile');

    if (savedBookmarks) {
      try {
        const parsed = JSON.parse(savedBookmarks);
        setBookmarkedIds(parsed);
        setUserProfile(prev => ({ ...prev, bookmarks: parsed }));
      } catch (e) { console.error(e); }
    }
    if (savedLikes) {
      try {
        const parsed = JSON.parse(savedLikes);
        setLikedIds(parsed);
        setUserProfile(prev => ({ ...prev, likedArticles: parsed }));
      } catch (e) { console.error(e); }
    }
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setUserProfile(parsed);
      } catch (e) { console.error(e); }
    }
  }, []);

  // Sync state modifications to storage
  const saveUserProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    safeStorage.setItem('janshakti_profile', JSON.stringify(newProfile));
  };

  const handleBookmarkToggle = (articleId: string) => {
    let updated: string[];
    if (bookmarkedIds.includes(articleId)) {
      updated = bookmarkedIds.filter(id => id !== articleId);
      triggerToast("Article removed from bookmarks");
    } else {
      updated = [...bookmarkedIds, articleId];
      triggerToast("Article saved to bookmarks");
    }
    setBookmarkedIds(updated);
    saveUserProfile({ ...userProfile, bookmarks: updated });
    safeStorage.setItem('janshakti_bookmarks', JSON.stringify(updated));
  };

  const handleLikeToggle = (articleId: string) => {
    let updated: string[];
    if (likedIds.includes(articleId)) {
      updated = likedIds.filter(id => id !== articleId);
    } else {
      updated = [...likedIds, articleId];
      triggerToast("You liked this article!");
    }
    setLikedIds(updated);
    saveUserProfile({ ...userProfile, likedArticles: updated });
    safeStorage.setItem('janshakti_likes', JSON.stringify(updated));
  };

  const handleArticleOpen = (articleId: string) => {
    setSelectedArticleId(articleId);
    // Add to history list if not present
    if (!userProfile.history.includes(articleId)) {
      const updatedHistory = [articleId, ...userProfile.history].slice(0, 10);
      saveUserProfile({ ...userProfile, history: updatedHistory });
    }
  };

  const handleShareClick = (articleId: string) => {
    safeCopyText(`${window.location.origin}/article/${articleId}`, () => {
      triggerToast("Link copied to clipboard!");
    });
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const t = TRANSLATIONS[currentLanguage];

  // Group and query filters based on active category
  const trendingArticles = articles.filter(a => a.isTrending);
  
  // Hero section article (first featured item or fallback)
  const heroArticle = articles.find(a => a.isFeatured && a.category === 'maharashtra') || articles[0];
  const fourFeaturedGrid = articles.filter(a => a.id !== heroArticle.id).slice(0, 4);

  // Dynamic filter for content display
  const mainArticlesFeed = activeCategory === 'home' 
    ? articles 
    : articles.filter(a => {
        if (a.category !== activeCategory) return false;
        if (activeCategory === 'maharashtra' && selectedCity !== 'all') {
          return a.city === selectedCity;
        }
        return true;
      });

  if (isAdminRoute) {
    return (
      <AdminWorkspace 
        currentLanguage={currentLanguage} 
        onClose={() => navigateToPath('/')} 
        onRefreshArticles={loadAllArticles}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col antialiased">
      {/* 1. Header Navigation System */}
      <Header
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onSearchOpen={() => setSearchOpen(true)}
        onProfileOpen={() => setProfileOpen(true)}
        onAdminOpen={() => setAdminOpen(true)}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onSubscribeOpen={() => setSubscribeOpen(true)}
        onEpaperOpen={() => setEpaperOpen(true)}
        userProfile={userProfile}
      />

      {/* 2. Breaking News Ticker */}
      <BreakingTicker 
        currentLanguage={currentLanguage} 
        onArticleClick={handleArticleOpen} 
      />

      {/* 3. Global Toast Notifications Container */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 left-6 z-50 bg-brand-charcoal text-white text-xs font-bold py-3.5 px-5 rounded-2xl shadow-2xl border border-brand-red/30 flex items-center space-x-2.5"
          >
            <Sparkles className="w-4 h-4 text-brand-red animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Main Page Body Container */}
      <main className="flex-1 max-w-[1280px] mx-auto px-4 py-6 md:py-8 w-full space-y-12">
        {/* Global Header-level Leaderboard Ad Campaign */}
        <AdPlacement 
          placement="header" 
          currentLanguage={currentLanguage} 
          currentCategory={activeCategory}
          className="max-w-4xl mx-auto mb-4"
        />

        {activeCategory === 'home' ? (
          /* ========================================================
             HOME PAGE EDITORIAL ARCHITECTURE
             ======================================================== */
          <div className="space-y-12">
            {/* Hero Grid Block (Featured large card + side column list) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Big Featured Hero Card */}
              <div className="lg:col-span-8 space-y-4">
                <div 
                  id="hero-featured-card"
                  onClick={() => handleArticleOpen(heroArticle.id)}
                  className="group cursor-pointer rounded-3xl overflow-hidden border border-brand-border bg-white shadow-sm hover:shadow hover-lift transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={heroArticle.image} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-brand-red text-white text-[10px] font-black uppercase px-3 py-1.5 rounded shadow-lg tracking-widest animate-pulse">
                      FEATURED COVERAGE
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 space-y-4">
                    <span className="inline-block text-[10px] font-black tracking-widest text-brand-red uppercase">
                      {CATEGORIES.find(c => c.id === heroArticle.category)?.label[currentLanguage] || heroArticle.category}
                    </span>

                    <h2 className="font-serif font-black text-2xl sm:text-3xl md:text-3.5xl text-brand-charcoal leading-tight tracking-tight group-hover:text-brand-red transition-all">
                      {heroArticle.title[currentLanguage]}
                    </h2>

                    <p className="text-brand-secondary-text text-sm leading-relaxed line-clamp-3">
                      {heroArticle.summary[currentLanguage]}
                    </p>

                    {/* Meta information footer bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-brand-border text-xs text-brand-muted-text">
                      <div className="flex items-center space-x-2">
                        <img 
                          src={heroArticle.author.avatar} 
                          alt="" 
                          className="w-8 h-8 rounded-full object-cover border border-brand-border" 
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-bold text-brand-charcoal">{heroArticle.author.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>{heroArticle.date}</span>
                        <span>•</span>
                        <span>{heroArticle.readTime} mins read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Trending Lists */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-brand-light p-6 rounded-3xl border border-brand-border space-y-4 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-brand-charcoal border-b border-brand-border pb-2 mb-4 flex items-center">
                      <Sparkles className="w-4 h-4 text-brand-red mr-1.5" />
                      Editor's Picks
                    </h3>
                    <div className="space-y-4 divide-y divide-brand-border/60">
                      {fourFeaturedGrid.map((art, idx) => (
                        <div
                          key={art.id}
                          id={`editors-pick-${art.id}`}
                          onClick={() => handleArticleOpen(art.id)}
                          className={`group cursor-pointer flex gap-4 ${idx > 0 ? 'pt-4' : ''}`}
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-brand-border flex-shrink-0">
                            <img src={art.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                          </div>
                          <div className="space-y-1 min-w-0 flex-1">
                            <span className="text-[9px] font-bold text-brand-red uppercase">
                              {CATEGORIES.find(c => c.id === art.category)?.label[currentLanguage] || art.category}
                            </span>
                            <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal leading-snug group-hover:text-brand-red transition-all line-clamp-2">
                              {art.title[currentLanguage]}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    id="hero-read-all-picks"
                    onClick={() => handleCategoryChange('opinion')}
                    className="w-full py-2.5 bg-brand-charcoal hover:bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow"
                  >
                    View All Editorials
                  </button>
                </div>
              </div>
            </div>

            {/* Master Page Column Layout: (Main feed left, widgets right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Latest Feed Column */}
              <div className="lg:col-span-8">
                <LatestNews
                  currentLanguage={currentLanguage}
                  articles={mainArticlesFeed}
                  onArticleClick={handleArticleOpen}
                  onBookmarkToggle={handleBookmarkToggle}
                  bookmarkedIds={bookmarkedIds}
                  onLikeToggle={handleLikeToggle}
                  likedIds={likedIds}
                  onShareClick={handleShareClick}
                />
              </div>

              {/* Sticky Sidebar widgets column */}
              <div className="lg:col-span-4">
                <Sidebar
                  currentLanguage={currentLanguage}
                  trendingArticles={trendingArticles}
                  onArticleClick={handleArticleOpen}
                  onSubscribeNewsletter={(email) => triggerToast(`Registered ${email} successfully!`)}
                />
              </div>
            </div>

            {/* Shorts & Reels Section */}
            <ShortsSection currentLanguage={currentLanguage} />

            {/* Photo Stories Masonry */}
            <PhotoGallery currentLanguage={currentLanguage} articles={articles} onArticleClick={handleArticleOpen} />

            {/* Editorial Opinions Panel */}
            <EditorialSection currentLanguage={currentLanguage} articles={articles} onArticleClick={handleArticleOpen} />
          </div>
        ) : (
          /* ========================================================
             SPECIFIC SECTION / CATEGORY VIEW LAYOUT
             ======================================================== */
          <div className="space-y-8">
            {/* Category header display */}
            <div className="border-b border-brand-border pb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs text-brand-muted-text uppercase font-bold tracking-widest mb-1">
                  <span>Section Index</span>
                  <span>/</span>
                  <span className="text-brand-red font-black">
                    {CATEGORIES.find(c => c.id === activeCategory)?.label[currentLanguage]}
                  </span>
                </div>
                <h2 className="font-serif font-black text-3xl sm:text-4xl text-brand-charcoal">
                  {CATEGORIES.find(c => c.id === activeCategory)?.label[currentLanguage]} Curation
                </h2>
              </div>
              {activeCategory === 'maharashtra' && (
                <div className="flex items-center space-x-2 self-start md:self-auto">
                  <label htmlFor="city-select" className="text-xs font-bold text-brand-muted-text uppercase tracking-widest">
                    {currentLanguage === 'english' ? 'Filter by City:' : currentLanguage === 'marathi' ? 'शहर निवडा:' : 'शहर चुनें:'}
                  </label>
                  <select
                    id="city-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="cursor-pointer bg-white border border-brand-charcoal text-brand-charcoal text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red min-w-[150px]"
                  >
                    {MAHARASHTRA_CITIES.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.label[currentLanguage]}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Sub-grid listing for Category specific feeds */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Articles lists left */}
              <div className="lg:col-span-8">
                {mainArticlesFeed.length === 0 ? (
                  <div className="py-20 text-center text-brand-secondary-text bg-brand-light rounded-3xl border border-brand-border border-dashed space-y-3">
                    <ShieldAlert className="w-12 h-12 text-brand-red mx-auto animate-bounce" />
                    <p className="font-serif italic text-lg">No active articles in this section today.</p>
                    <p className="text-xs">We are currently drafting live bulletins. Please check back shortly.</p>
                    <button
                      id="category-empty-home"
                      onClick={() => handleCategoryChange('home')}
                      className="px-4 py-2 bg-brand-charcoal text-white rounded-lg hover:bg-brand-red text-xs font-bold transition-all mt-4"
                    >
                      Return to Home
                    </button>
                  </div>
                ) : (
                  <LatestNews
                    currentLanguage={currentLanguage}
                    articles={mainArticlesFeed}
                    onArticleClick={handleArticleOpen}
                    onBookmarkToggle={handleBookmarkToggle}
                    bookmarkedIds={bookmarkedIds}
                    onLikeToggle={handleLikeToggle}
                    likedIds={likedIds}
                    onShareClick={handleShareClick}
                  />
                )}
              </div>

              {/* Sidebar right */}
              <div className="lg:col-span-4">
                <Sidebar
                  currentLanguage={currentLanguage}
                  trendingArticles={trendingArticles}
                  onArticleClick={handleArticleOpen}
                  onSubscribeNewsletter={(email) => triggerToast(`Registered ${email} successfully!`)}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 5. Broad Newspaper Corporate Footer */}
      <Footer
        currentLanguage={currentLanguage}
        onCategoryChange={handleCategoryChange}
        onSubscribeOpen={() => setSubscribeOpen(true)}
        onEpaperOpen={() => setEpaperOpen(true)}
      />

      {/* ========================================================
         DIALOG / OVERLAY MODAL SYSTEMS
         ======================================================== */}

      {/* 1. Article Reader Slide-over Drawer */}
      <ArticleModal
        articleId={selectedArticleId}
        onClose={() => setSelectedArticleId(null)}
        currentLanguage={currentLanguage}
        onBookmarkToggle={handleBookmarkToggle}
        isBookmarked={selectedArticleId ? bookmarkedIds.includes(selectedArticleId) : false}
        onLikeToggle={handleLikeToggle}
        isLiked={selectedArticleId ? likedIds.includes(selectedArticleId) : false}
        onArticleClick={handleArticleOpen}
      />

      {/* 2. Interactive Search Panel */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        currentLanguage={currentLanguage}
        onArticleClick={handleArticleOpen}
        articles={articles}
      />

      {/* 3. User Dashboard Modal */}
      <UserProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        currentLanguage={currentLanguage}
        userProfile={userProfile}
        onSaveProfile={saveUserProfile}
        onArticleClick={handleArticleOpen}
        articles={articles}
      />

      {/* 3.5. Ad Desk & Campaigns Management Panel Overlay */}
      <AdminPanelModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        currentLanguage={currentLanguage}
        onAdsUpdated={() => {
          triggerToast("Ad campaigns updated successfully!");
        }}
      />

      {/* 4. Custom Subscription Checkout Dialog */}
      <AnimatePresence>
        {subscribeOpen && (
          <div id="subscribe-dialog" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/60 backdrop-blur-sm select-none">
            <div className="absolute inset-0" onClick={() => setSubscribeOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl border border-brand-border w-full max-w-md p-6 overflow-hidden z-10"
            >
              <div className="space-y-4">
                <div className="p-3 bg-red-100 text-brand-red rounded-xl w-12 h-12 flex items-center justify-center">
                  <Newspaper className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-xl text-brand-charcoal">Subscribe to Janshakti Plus</h3>
                  <p className="text-xs text-brand-secondary-text">Support unbiased journalism and get access to the complete digital paper archives.</p>
                </div>

                <div className="p-4 bg-brand-light rounded-xl space-y-2 border border-brand-border text-xs">
                  <div className="flex justify-between font-bold text-brand-charcoal">
                    <span>Yearly Subscription Package</span>
                    <span className="text-brand-red">₹999 / year</span>
                  </div>
                  <p className="text-brand-muted-text">Includes complete e-Paper digital copy access, priority print deliveries, and ad-free viewing modes.</p>
                </div>

                <button
                  id="pay-subscription-btn"
                  onClick={() => {
                    saveUserProfile({ ...userProfile, isSubscribed: true });
                    setSubscribeOpen(false);
                    triggerToast("Thank you for your premium subscription! Enjoy full e-Paper access.");
                  }}
                  className="w-full py-3 bg-brand-red hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Authorize Payment (Simulated)
                </button>
                <button
                  id="close-subscription-btn"
                  onClick={() => setSubscribeOpen(false)}
                  className="w-full py-2 bg-brand-light text-brand-secondary-text border border-brand-border hover:bg-brand-border text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Custom E-Paper Replica Modal */}
      <AnimatePresence>
        {epaperOpen && (
          <div id="epaper-dialog" className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-brand-charcoal/90 backdrop-blur-sm select-none">
            <div className="absolute inset-0" onClick={() => setEpaperOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-brand-border w-full max-w-[1050px] h-[90vh] max-h-[850px] flex flex-col overflow-hidden z-10"
            >
              {/* Header */}
              <div className="p-4 md:p-5 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between bg-brand-light gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-brand-red/10 rounded-xl">
                    <Newspaper className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <span className="font-serif font-black text-base text-brand-charcoal block">
                      Janshakti Digital E-Paper Replica
                    </span>
                    <span className="text-[10px] text-brand-secondary-text font-bold block">
                      Jalgaon, Nashik, Dhule, Nandurbar Editions • Friday, June 26, 2026
                    </span>
                  </div>
                </div>

                {/* Paywall Bypass Notification & Actions */}
                <div className="flex items-center space-x-2.5">
                  <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-sm">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    <span className="font-sans uppercase tracking-wider">🔓 Complimentary Premium Access Granted (Bypassed)</span>
                  </div>
                  <button
                    id="epaper-close-btn"
                    onClick={() => setEpaperOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white text-brand-charcoal shadow-sm border border-brand-border/40 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Page Quick Navigation Strip */}
              <div className="px-5 py-3 border-b border-brand-border bg-white flex flex-wrap items-center justify-between gap-3">
                {/* Pages tabs */}
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  {EPAPER_PAGES.map((page) => (
                    <button
                      key={page.pageNumber}
                      onClick={() => setEpaperPage(page.pageNumber)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        epaperPage === page.pageNumber
                          ? 'bg-brand-red text-white shadow-sm'
                          : 'bg-brand-light hover:bg-brand-border text-brand-charcoal border border-brand-border/40'
                      }`}
                    >
                      Page {page.pageNumber}: {page.title[currentLanguage] || page.title.english}
                    </button>
                  ))}
                </div>

                {/* View Mode & Translation controls */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* View Mode Selector */}
                  <div className="flex items-center space-x-1 bg-brand-light p-1 rounded-xl border border-brand-border/40">
                    <button
                      onClick={() => setEpaperViewMode('pdf')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                        epaperViewMode === 'pdf'
                          ? 'bg-brand-red text-white shadow-sm'
                          : 'text-brand-secondary-text hover:text-brand-charcoal'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                      <span>📄 Original PDF</span>
                    </button>
                    <button
                      onClick={() => setEpaperViewMode('interactive')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                        epaperViewMode === 'interactive'
                          ? 'bg-brand-red text-white shadow-sm'
                          : 'text-brand-secondary-text hover:text-brand-charcoal'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h7"></path>
                      </svg>
                      <span>📰 Interactive Reader</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-brand-secondary-text">Translation:</span>
                    <button
                      onClick={() => setEpaperTranslateMode(!epaperTranslateMode)}
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide transition-all cursor-pointer border ${
                        epaperTranslateMode
                          ? 'bg-brand-red/10 border-brand-red text-brand-red shadow-sm'
                          : 'bg-brand-light border-brand-border text-brand-secondary-text hover:bg-brand-border'
                      }`}
                    >
                      {epaperTranslateMode ? "🇬🇧 English" : "🇮🇳 Marathi / Hindi"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Main E-Paper Display */}
              {(() => {
                const currentPage = EPAPER_PAGES.find(p => p.pageNumber === epaperPage) || EPAPER_PAGES[0];
                const displayLang = epaperTranslateMode ? 'english' : 'marathi';

                return (
                  <div className="flex-1 overflow-hidden p-4 md:p-6 bg-[#EBEBE5] flex flex-col lg:flex-row gap-6">
                    {/* Left Panel: Show PDF IFrame or Interactive Replica based on epaperViewMode */}
                    {epaperViewMode === 'pdf' ? (
                      <EPaperPDFView
                        pageNumber={epaperPage}
                        setPageNumber={setEpaperPage}
                        language={displayLang}
                        translateMode={epaperTranslateMode}
                        setTranslateMode={setEpaperTranslateMode}
                        onArticleClick={(id) => {
                          setSelectedArticleId(id);
                        }}
                        onDownloadPage={async () => {
                          triggerToast("Downloading page PDF replica...");
                          try {
                            const displayLangLabel = epaperTranslateMode ? 'English' : 'Marathi';
                            await downloadEPaperPDFDirect({
                              pageNumber: epaperPage,
                              language: displayLang,
                              filename: `Janshakti_Epaper_Page_${epaperPage}_${displayLangLabel}.pdf`
                            });
                            triggerToast("PDF downloaded successfully!");
                          } catch (e) {
                            console.error(e);
                            triggerToast("Failed to download PDF.");
                          }
                        }}
                        onDownloadFull={async () => {
                          triggerToast("Generating entire 6-page newspaper PDF...");
                          try {
                            const displayLangLabel = epaperTranslateMode ? 'English' : 'Marathi';
                            await downloadEPaperPDFDirect({
                              language: displayLang,
                              filename: `Janshakti_Epaper_Full_Edition_${displayLangLabel}.pdf`
                            });
                            triggerToast("Full edition PDF downloaded successfully!");
                          } catch (e) {
                            console.error(e);
                            triggerToast("Failed to generate full PDF.");
                          }
                        }}
                        triggerToast={triggerToast}
                      />
                    ) : (
                      /* Left Column: Interactive Digital replica spread */
                      <div className="flex-1 bg-[#FDFCF7] border border-brand-border rounded-2xl shadow-xl p-5 md:p-8 flex flex-col justify-between max-w-[700px] mx-auto min-h-[550px] overflow-y-auto">
                        {/* Newspaper Masthead Header inside the page */}
                        <div className="border-b-4 border-double border-brand-charcoal pb-4 mb-5">
                          <div className="flex flex-col items-center text-center">
                            <span className="text-[10px] md:text-xs font-semibold text-brand-charcoal tracking-wide uppercase">
                              {displayLang === 'marathi' ? 'आपला आवाज आपली शक्ती' : 'Your Voice, Your Strength'}
                            </span>
                            
                            <div className="w-full flex items-center justify-center my-1">
                              <div className="h-[2px] md:h-[3px] bg-brand-red flex-1" />
                              {displayLang === 'marathi' ? (
                                <span className="text-3xl md:text-4xl lg:text-5xl font-devanagari font-black text-brand-red px-6 leading-none select-none tracking-wider">
                                  जनशक्ती
                                </span>
                              ) : (
                                <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-brand-red px-6 leading-none select-none tracking-tight">
                                  Janshakti
                                </span>
                              )}
                              <div className="h-[2px] md:h-[3px] bg-brand-red flex-1" />
                            </div>

                            {/* Edition & Page info line */}
                            <div className="w-full border-t border-brand-charcoal/30 pt-1.5 flex items-center justify-between text-[9px] md:text-xs font-bold text-brand-secondary-text">
                              <span>जळगाव, नाशिक, धुळे, नंदुरबार आवृत्ती</span>
                              <span className="text-brand-red uppercase">PAGE {currentPage.pageNumber} ({currentPage.title[displayLang]})</span>
                              <span>शुक्रवार, २६ जून २०२६ • किंमत ₹२</span>
                            </div>
                          </div>
                        </div>

                        {/* Editorial Columns Grid */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
                          {/* Main Leading Story column */}
                          {currentPage.articles.filter(a => a.isMain).map((article) => (
                            <div key={article.id} className="md:col-span-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-brand-border/60 pb-5 md:pb-0 md:pr-6">
                              <div className="space-y-3">
                                <span className="bg-brand-red text-white text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                                  {displayLang === 'marathi' ? 'मुख्य वृत्त' : 'Lead Story'}
                                </span>
                                <h3 className="font-serif font-black text-lg md:text-xl text-brand-charcoal leading-snug cursor-pointer hover:text-brand-red transition-all">
                                  {article.title[displayLang]}
                                </h3>
                                {article.author && (
                                  <span className="text-[10px] text-brand-secondary-text font-bold block italic">
                                    — {article.author[displayLang]}
                                  </span>
                                )}
                                <p className="text-[11px] md:text-xs text-brand-charcoal leading-relaxed font-serif text-justify first-letter:text-3xl first-letter:font-black first-letter:text-brand-red first-letter:float-left first-letter:mr-2">
                                  {article.content[displayLang][0]}
                                </p>
                                {article.content[displayLang].slice(1).map((para, idx) => (
                                  <p key={idx} className="text-[11px] md:text-xs text-brand-charcoal leading-relaxed font-serif text-justify">
                                    {para}
                                  </p>
                                ))}
                              </div>
                              <div className="mt-4 pt-3 border-t border-brand-border/40 text-[9px] text-brand-muted-text font-bold text-center uppercase">
                                Official Digital Replica Spread
                              </div>
                            </div>
                          ))}

                          {/* Secondary Stories column */}
                          <div className="md:col-span-4 space-y-5">
                            {currentPage.articles.filter(a => !a.isMain).map((article, idx) => (
                              <div 
                                key={article.id} 
                                className={`space-y-2 cursor-pointer hover:bg-brand-light p-2.5 rounded-xl border border-transparent hover:border-brand-border transition-all ${
                                  idx > 0 ? 'border-t border-brand-border/40 pt-4' : ''
                                }`}
                              >
                                <span className="text-[8px] text-brand-red font-black uppercase tracking-wider">
                                  {displayLang === 'marathi' ? 'स्थानिक वृत्त' : 'Secondary Story'}
                                </span>
                                <h4 className="font-serif font-extrabold text-xs text-brand-charcoal leading-tight">
                                  {article.title[displayLang]}
                                </h4>
                                <p className="text-[10px] text-brand-secondary-text leading-relaxed font-serif line-clamp-4">
                                  {article.content[displayLang][0]}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Small Ad / Replica Info Footer */}
                        <div className="mt-6 pt-3 border-t-2 border-brand-charcoal flex items-center justify-between text-[8px] text-brand-muted-text font-black">
                          <span>epaper.janashakti.in</span>
                          <span>DAILY REPLICA READ SHEET</span>
                          <span>JANSHAKTI NEWS GROUP</span>
                        </div>
                      </div>
                    )}

                    {/* Right Column: Immersive interactive reading guides & full contents */}
                    <div className="w-full lg:w-[320px] bg-white rounded-2xl border border-brand-border p-5 flex flex-col justify-between space-y-4 h-full overflow-y-auto">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 pb-2 border-b">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                          <h4 className="font-serif font-black text-sm text-brand-charcoal">
                            {epaperViewMode === 'pdf' ? 'Original Print Layout' : 'Interactive Reading Desk'}
                          </h4>
                        </div>
                        <p className="text-xs text-brand-secondary-text leading-relaxed">
                          This is a digital replication of the real print edition of <strong className="text-brand-charcoal">Janshakti</strong> published on Friday, June 26, 2026. 
                          You can switch pages at the top or toggle translations to read comfortably.
                        </p>

                        <div className="space-y-2.5 pt-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-brand-red block">
                            Stories on this Page:
                          </span>
                          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                            {currentPage.articles.map((art) => (
                              <div
                                key={art.id}
                                className="p-2.5 rounded-xl bg-brand-light hover:bg-brand-red/5 border border-brand-border hover:border-brand-red/20 transition-all cursor-pointer text-left"
                              >
                                <h5 className="font-serif font-bold text-xs text-brand-charcoal leading-snug line-clamp-2">
                                  {art.title[displayLang]}
                                </h5>
                                <span className="text-[9px] text-brand-muted-text font-bold uppercase mt-1 block">
                                  Read Article
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Extra actions */}
                      <div className="space-y-2.5 pt-4 border-t">
                        <button
                          onClick={async () => {
                            triggerToast("Downloading page PDF replica...");
                            try {
                              const displayLang = epaperTranslateMode ? 'english' : 'marathi';
                              const displayLangLabel = epaperTranslateMode ? 'English' : 'Marathi';
                              await downloadEPaperPDFDirect({
                                pageNumber: epaperPage,
                                language: displayLang,
                                filename: `Janshakti_Epaper_Page_${epaperPage}_${displayLangLabel}.pdf`
                              });
                              triggerToast("PDF downloaded successfully!");
                            } catch (e) {
                              console.error(e);
                              triggerToast("Failed to download PDF.");
                            }
                          }}
                          className="w-full py-2.5 bg-brand-charcoal hover:bg-brand-red text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                          </svg>
                          <span>Download Page PDF</span>
                        </button>
                        <button
                          onClick={async () => {
                            triggerToast("Generating entire 6-page newspaper PDF...");
                            try {
                              const displayLang = epaperTranslateMode ? 'english' : 'marathi';
                              const displayLangLabel = epaperTranslateMode ? 'English' : 'Marathi';
                              await downloadEPaperPDFDirect({
                                language: displayLang,
                                filename: `Janshakti_Epaper_Full_Edition_${displayLangLabel}.pdf`
                              });
                              triggerToast("Full edition PDF downloaded successfully!");
                            } catch (e) {
                              console.error(e);
                              triggerToast("Failed to generate full PDF.");
                            }
                          }}
                          className="w-full py-2 bg-brand-light hover:bg-brand-border text-brand-charcoal text-xs font-bold rounded-xl transition-all border border-brand-border/60 cursor-pointer flex items-center justify-center space-x-1.5"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                          </svg>
                          <span>Download Full 6-Page Edition</span>
                        </button>
                        <p className="text-[9px] text-center text-brand-muted-text leading-tight">
                          Digital replica conforms with auditing requirements of ABC and RNI regulations.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
