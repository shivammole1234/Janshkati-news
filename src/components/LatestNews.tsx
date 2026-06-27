import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Heart, Share2, Eye, Clock, MessageSquare, ChevronDown } from 'lucide-react';
import { Language, Article } from '../types';
import { TRANSLATIONS, CATEGORIES } from '../data';

interface LatestNewsProps {
  currentLanguage: Language;
  articles: Article[];
  onArticleClick: (articleId: string) => void;
  onBookmarkToggle: (articleId: string) => void;
  bookmarkedIds: string[];
  onLikeToggle: (articleId: string) => void;
  likedIds: string[];
  onShareClick: (articleId: string) => void;
}

export default function LatestNews({
  currentLanguage,
  articles,
  onArticleClick,
  onBookmarkToggle,
  bookmarkedIds,
  onLikeToggle,
  likedIds,
  onShareClick
}: LatestNewsProps) {
  const t = TRANSLATIONS[currentLanguage];
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Simulated infinite scroll load more
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(articles.length, prev + 4));
      setIsLoadingMore(false);
    }, 1200);
  };

  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-brand-border pb-3">
        <h2 className="font-serif font-black text-xl md:text-2xl text-brand-charcoal flex items-center">
          <span className="w-3.5 h-6 bg-brand-red rounded-sm mr-2.5 inline-block" />
          {t.latest}
        </h2>
      </div>

      {/* Articles Feed */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {visibleArticles.map((art) => {
            const isBookmarked = bookmarkedIds.includes(art.id);
            const isLiked = likedIds.includes(art.id);
            const categoryLabel = CATEGORIES.find(c => c.id === art.category)?.label[currentLanguage] || art.category;

            return (
              <motion.article
                key={art.id}
                id={`latest-feed-article-${art.id}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-brand-border hover:border-brand-red p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow hover-lift group flex flex-col md:flex-row gap-5 cursor-pointer"
                onClick={() => onArticleClick(art.id)}
              >
                {/* 1. Article image thumbnail with hover zoom */}
                <div className="w-full md:w-60 lg:w-72 h-44 sm:h-52 md:h-44 bg-brand-light rounded-xl overflow-hidden flex-shrink-0 border border-brand-border relative">
                  <img
                    src={art.image}
                    alt={art.title[currentLanguage]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {art.isLive && (
                    <div className="absolute top-3 left-3 bg-brand-red text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow flex items-center space-x-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white mr-1"></span>
                      <span>{t.live}</span>
                    </div>
                  )}
                </div>

                {/* 2. Content Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    {/* Meta category row */}
                    <div className="flex items-center justify-between text-[10px] font-bold text-brand-muted-text uppercase tracking-wider">
                      <span className="text-brand-red font-black">{categoryLabel}</span>
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          {art.readTime} {t.minsRead}
                        </span>
                      </div>
                    </div>

                    {/* Headline */}
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-charcoal leading-snug group-hover:text-brand-red transition-colors line-clamp-2">
                      {art.title[currentLanguage]}
                    </h3>

                    {/* Summary */}
                    <p className="text-brand-secondary-text text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {art.summary[currentLanguage]}
                    </p>
                  </div>

                  {/* 3. Footer controls / Author */}
                  <div className="flex items-center justify-between pt-2 border-t border-brand-border text-xs">
                    {/* Author credit */}
                    <div className="flex items-center space-x-2">
                      <img
                        src={art.author.avatar}
                        alt=""
                        className="w-6 h-6 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="font-bold text-brand-charcoal truncate max-w-[120px]">
                        {art.author.name}
                      </span>
                    </div>

                    {/* Interactivity Buttons */}
                    <div className="flex items-center space-x-1 sm:space-x-2" onClick={(e) => e.stopPropagation()}>
                      {/* Likes count */}
                      <button
                        id={`feed-like-btn-${art.id}`}
                        onClick={() => onLikeToggle(art.id)}
                        className={`p-1.5 rounded-full hover:bg-brand-light transition-colors ${
                          isLiked ? 'text-brand-red' : 'text-brand-muted-text'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      </button>

                      {/* Comments count */}
                      <span className="text-[10px] text-brand-muted-text flex items-center mr-1">
                        <MessageSquare className="w-3.5 h-3.5 mr-1 text-brand-muted-text" />
                        {art.commentsCount}
                      </span>

                      {/* Share trigger */}
                      <button
                        id={`feed-share-btn-${art.id}`}
                        onClick={() => onShareClick(art.id)}
                        className="p-1.5 rounded-full hover:bg-brand-light text-brand-muted-text hover:text-brand-charcoal transition-colors"
                        title={t.share}
                      >
                        <Share2 className="w-4 h-4" />
                      </button>

                      {/* Bookmark toggle */}
                      <button
                        id={`feed-bookmark-btn-${art.id}`}
                        onClick={() => onBookmarkToggle(art.id)}
                        className={`p-1.5 rounded-full hover:bg-brand-light transition-colors ${
                          isBookmarked ? 'text-brand-red' : 'text-brand-muted-text'
                        }`}
                        title={t.bookmark}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>

        {/* Shimmer loading skeleton */}
        {isLoadingMore && (
          <div className="space-y-4">
            {[1, 2].map((num) => (
              <div key={num} className="p-5 border border-brand-border rounded-2xl flex flex-col md:flex-row gap-5 bg-white">
                <div className="w-full md:w-60 lg:w-72 h-44 shimmer rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-3.5 py-1">
                  <div className="h-3 shimmer rounded-full w-24" />
                  <div className="h-5 shimmer rounded-lg w-5/6" />
                  <div className="h-4 shimmer rounded-lg w-full" />
                  <div className="h-8 shimmer rounded-xl w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Trigger */}
        {visibleCount < articles.length ? (
          <button
            id="latest-load-more-btn"
            disabled={isLoadingMore}
            onClick={handleLoadMore}
            className="w-full py-3.5 bg-brand-light hover:bg-brand-red hover:text-white border border-brand-border hover:border-brand-red text-brand-charcoal rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <span>{t.loadMore}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        ) : (
          <div className="p-6 text-center text-xs text-brand-muted-text border border-dashed border-brand-border rounded-xl">
            {t.noMoreStories}
          </div>
        )}
      </div>
    </div>
  );
}
