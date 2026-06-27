import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Bookmark, Heart, History, Settings, Bell, ChevronRight, Check } from 'lucide-react';
import { Language, UserProfile, Article } from '../types';
import { TRANSLATIONS, CATEGORIES } from '../data';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onArticleClick: (articleId: string) => void;
  articles: Article[];
}

export default function UserProfileModal({
  isOpen,
  onClose,
  currentLanguage,
  userProfile,
  onSaveProfile,
  onArticleClick,
  articles
}: UserProfileModalProps) {
  const t = TRANSLATIONS[currentLanguage];
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history' | 'likes' | 'preferences'>('bookmarks');
  
  // Local states to handle profile edits
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [notifications, setNotifications] = useState(userProfile.notifications);
  const [followedCategories, setFollowedCategories] = useState(userProfile.followedCategories);
  const [isSavedMessage, setIsSavedMessage] = useState(false);

  if (!isOpen) return null;

  // Bookmarks details helper
  const bookmarkArticles = articles.filter(a => userProfile.bookmarks.includes(a.id));
  const historyArticles = articles.filter(a => userProfile.history.includes(a.id));
  const likedArticles = articles.filter(a => userProfile.likedArticles.includes(a.id));

  // Handle saving of settings
  const handleSaveSettings = () => {
    onSaveProfile({
      ...userProfile,
      name,
      email,
      notifications,
      followedCategories
    });
    setIsSavedMessage(true);
    setTimeout(() => setIsSavedMessage(false), 2000);
  };

  const toggleCategoryFollow = (catId: string) => {
    if (followedCategories.includes(catId)) {
      setFollowedCategories(followedCategories.filter(c => c !== catId));
    } else {
      setFollowedCategories([...followedCategories, catId]);
    }
  };

  return (
    <AnimatePresence>
      <div id="profile-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/60 backdrop-blur-sm">
        {/* Backdrop close click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl border border-brand-border w-full max-w-[850px] h-[650px] max-h-[90vh] flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-brand-border flex items-center justify-between bg-brand-light">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-brand-red text-white rounded-xl">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-black text-xl text-brand-charcoal">{t.profileTitle}</h2>
                <p className="text-[10px] text-brand-muted-text font-bold uppercase tracking-wider">Premium Access Active</p>
              </div>
            </div>
            <button
              id="profile-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white text-brand-charcoal shadow-sm border border-brand-border/40"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Grid Layout Body */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-48 md:w-60 bg-brand-light border-r border-brand-border flex flex-col p-4 space-y-1.5">
              <button
                id="tab-btn-bookmarks"
                onClick={() => setActiveTab('bookmarks')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === 'bookmarks' 
                    ? 'bg-brand-red text-white shadow-md' 
                    : 'text-brand-secondary-text hover:bg-white border border-transparent hover:border-brand-border'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Bookmark className="w-4 h-4" />
                  <span>{t.savedArticles}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === 'bookmarks' ? 'bg-white/20 text-white' : 'bg-brand-border text-brand-secondary-text'
                }`}>
                  {bookmarkArticles.length}
                </span>
              </button>

              <button
                id="tab-btn-history"
                onClick={() => setActiveTab('history')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === 'history' 
                    ? 'bg-brand-red text-white shadow-md' 
                    : 'text-brand-secondary-text hover:bg-white border border-transparent hover:border-brand-border'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <History className="w-4 h-4" />
                  <span>{t.readHistory}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === 'history' ? 'bg-white/20 text-white' : 'bg-brand-border text-brand-secondary-text'
                }`}>
                  {historyArticles.length}
                </span>
              </button>

              <button
                id="tab-btn-likes"
                onClick={() => setActiveTab('likes')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === 'likes' 
                    ? 'bg-brand-red text-white shadow-md' 
                    : 'text-brand-secondary-text hover:bg-white border border-transparent hover:border-brand-border'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>{t.likedArticles}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === 'likes' ? 'bg-white/20 text-white' : 'bg-brand-border text-brand-secondary-text'
                }`}>
                  {likedArticles.length}
                </span>
              </button>

              <button
                id="tab-btn-preferences"
                onClick={() => setActiveTab('preferences')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                  activeTab === 'preferences' 
                    ? 'bg-brand-red text-white shadow-md' 
                    : 'text-brand-secondary-text hover:bg-white border border-transparent hover:border-brand-border'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Preferences</span>
              </button>
            </div>

            {/* Tab content view scroll */}
            <div className="flex-1 p-6 overflow-y-auto bg-white">
              <AnimatePresence mode="wait">
                {/* 1. Bookmarks list */}
                {activeTab === 'bookmarks' && (
                  <motion.div
                    key="bookmarks"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <h3 className="text-sm font-black text-brand-charcoal uppercase tracking-widest pb-2 border-b border-brand-border">
                      {t.savedArticles}
                    </h3>
                    
                    {bookmarkArticles.length === 0 ? (
                      <div className="py-12 text-center text-brand-secondary-text space-y-2">
                        <Bookmark className="w-10 h-10 mx-auto text-brand-muted-text opacity-40" />
                        <p className="font-serif italic">No saved articles yet.</p>
                        <p className="text-[10px]">Click the bookmark icon on articles to save them here for offline access.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {bookmarkArticles.map(art => (
                          <div
                            key={art.id}
                            id={`profile-bookmark-${art.id}`}
                            onClick={() => {
                              onArticleClick(art.id);
                              onClose();
                            }}
                            className="p-3 border border-brand-border hover:border-brand-red rounded-xl hover-lift cursor-pointer flex space-x-3 group"
                          >
                            <div className="w-16 h-16 bg-brand-light rounded-lg overflow-hidden flex-shrink-0">
                              <img src={art.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal group-hover:text-brand-red transition-colors line-clamp-2">
                                {art.title[currentLanguage]}
                              </h4>
                              <span className="text-[9px] font-bold text-brand-muted-text uppercase">
                                {CATEGORIES.find(c => c.id === art.category)?.label[currentLanguage] || art.category}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 2. Reading History list */}
                {activeTab === 'history' && (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <h3 className="text-sm font-black text-brand-charcoal uppercase tracking-widest pb-2 border-b border-brand-border">
                      {t.readHistory}
                    </h3>

                    {historyArticles.length === 0 ? (
                      <div className="py-12 text-center text-brand-secondary-text space-y-2">
                        <History className="w-10 h-10 mx-auto text-brand-muted-text opacity-40" />
                        <p className="font-serif italic">Your reading history is empty.</p>
                        <p className="text-[10px]">Articles you read will automatically sync to your cloud history here.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {historyArticles.map(art => (
                          <div
                            key={art.id}
                            id={`profile-history-${art.id}`}
                            onClick={() => {
                              onArticleClick(art.id);
                              onClose();
                            }}
                            className="p-3 border border-brand-border hover:border-brand-red rounded-xl hover-lift cursor-pointer flex space-x-3 group"
                          >
                            <div className="w-16 h-16 bg-brand-light rounded-lg overflow-hidden flex-shrink-0">
                              <img src={art.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal group-hover:text-brand-red transition-colors line-clamp-2">
                                {art.title[currentLanguage]}
                              </h4>
                              <span className="text-[9px] font-bold text-brand-muted-text uppercase">
                                {CATEGORIES.find(c => c.id === art.category)?.label[currentLanguage] || art.category}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 3. Liked articles list */}
                {activeTab === 'likes' && (
                  <motion.div
                    key="likes"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <h3 className="text-sm font-black text-brand-charcoal uppercase tracking-widest pb-2 border-b border-brand-border">
                      {t.likedArticles}
                    </h3>

                    {likedArticles.length === 0 ? (
                      <div className="py-12 text-center text-brand-secondary-text space-y-2">
                        <Heart className="w-10 h-10 mx-auto text-brand-muted-text opacity-40" />
                        <p className="font-serif italic">No liked articles yet.</p>
                        <p className="text-[10px]">Show appreciation for top journalism by liking articles.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {likedArticles.map(art => (
                          <div
                            key={art.id}
                            id={`profile-liked-${art.id}`}
                            onClick={() => {
                              onArticleClick(art.id);
                              onClose();
                            }}
                            className="p-3 border border-brand-border hover:border-brand-red rounded-xl hover-lift cursor-pointer flex space-x-3 group"
                          >
                            <div className="w-16 h-16 bg-brand-light rounded-lg overflow-hidden flex-shrink-0">
                              <img src={art.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal group-hover:text-brand-red transition-colors line-clamp-2">
                                {art.title[currentLanguage]}
                              </h4>
                              <span className="text-[9px] font-bold text-brand-muted-text uppercase">
                                {CATEGORIES.find(c => c.id === art.category)?.label[currentLanguage] || art.category}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 4. Settings Preferences Form */}
                {activeTab === 'preferences' && (
                  <motion.div
                    key="preferences"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="pb-2 border-b border-brand-border flex justify-between items-center">
                      <h3 className="text-sm font-black text-brand-charcoal uppercase tracking-widest">
                        Reader Customisation
                      </h3>
                      <AnimatePresence>
                        {isSavedMessage && (
                          <motion.span 
                            id="preferences-saved-toast"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-green-600 font-bold flex items-center space-x-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Saved Successfully!</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Profile Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary-text">Full Name</label>
                        <input
                          type="text"
                          id="pref-name-input"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full text-xs font-semibold p-2.5 bg-brand-light border border-brand-border rounded-xl focus:border-brand-red focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary-text">Email Address</label>
                        <input
                          type="email"
                          id="pref-email-input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full text-xs font-semibold p-2.5 bg-brand-light border border-brand-border rounded-xl focus:border-brand-red focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Followed Category Pills */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary-text flex items-center">
                        {t.followedCats}
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {CATEGORIES.map((cat) => {
                          const isFollowed = followedCategories.includes(cat.id);
                          return (
                            <button
                              key={cat.id}
                              id={`pref-cat-toggle-${cat.id}`}
                              onClick={() => toggleCategoryFollow(cat.id)}
                              className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                                isFollowed 
                                  ? 'bg-brand-red border-brand-red text-white' 
                                  : 'bg-white border-brand-border text-brand-secondary-text hover:border-brand-red'
                              }`}
                            >
                              {cat.label[currentLanguage]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Notification Toggles */}
                    <div className="space-y-3 pt-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary-text flex items-center">
                        <Bell className="w-3.5 h-3.5 mr-1.5 text-brand-red" />
                        {t.notifSettings}
                      </label>

                      <div className="space-y-2">
                        <label className="flex items-center justify-between p-3 bg-brand-light rounded-xl cursor-pointer hover:bg-red-50/20 transition-colors border border-brand-border/40">
                          <div className="text-xs">
                            <div className="font-bold text-brand-charcoal">{t.notifBreaking}</div>
                            <div className="text-[10px] text-brand-muted-text">Urgent pushes during breaking world news updates.</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notifications.breakingNews}
                            onChange={(e) => setNotifications({ ...notifications, breakingNews: e.target.checked })}
                            className="accent-brand-red w-4 h-4 cursor-pointer"
                          />
                        </label>

                        <label className="flex items-center justify-between p-3 bg-brand-light rounded-xl cursor-pointer hover:bg-red-50/20 transition-colors border border-brand-border/40">
                          <div className="text-xs">
                            <div className="font-bold text-brand-charcoal">{t.notifDaily}</div>
                            <div className="text-[10px] text-brand-muted-text">Everyday 7 AM summary of Maharashtra & India.</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notifications.dailyNewsletter}
                            onChange={(e) => setNotifications({ ...notifications, dailyNewsletter: e.target.checked })}
                            className="accent-brand-red w-4 h-4 cursor-pointer"
                          />
                        </label>

                        <label className="flex items-center justify-between p-3 bg-brand-light rounded-xl cursor-pointer hover:bg-red-50/20 transition-colors border border-brand-border/40">
                          <div className="text-xs">
                            <div className="font-bold text-brand-charcoal">{t.notifWeekly}</div>
                            <div className="text-[10px] text-brand-muted-text">Comprehensive weekend deep-dive reports.</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notifications.weeklyRoundup}
                            onChange={(e) => setNotifications({ ...notifications, weeklyRoundup: e.target.checked })}
                            className="accent-brand-red w-4 h-4 cursor-pointer"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Action Save Button */}
                    <button
                      id="pref-save-btn"
                      onClick={handleSaveSettings}
                      className="w-full py-2.5 bg-brand-charcoal hover:bg-brand-red text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow"
                    >
                      {t.saveSettings}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
