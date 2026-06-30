import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Bookmark, Share2, Heart, MessageSquare, Printer, ZoomIn, ZoomOut,
  ChevronLeft, ChevronRight, Play, CheckCircle2, ThumbsUp, Heart as HeartIcon, 
  Sparkles, RotateCcw, AlertTriangle, Send, Share, Copy, Check, ExternalLink
} from 'lucide-react';
import { Language, Article, Comment } from '../types';
import { TRANSLATIONS, CATEGORIES, MOCK_ARTICLES, MOCK_COMMENTS } from '../data';
import { safeCopyText } from '../App';

interface ArticleModalProps {
  articleId: string | null;
  onClose: () => void;
  currentLanguage: Language;
  onBookmarkToggle: (id: string) => void;
  isBookmarked: boolean;
  onLikeToggle: (id: string) => void;
  isLiked: boolean;
  onArticleClick: (id: string) => void;
}

export default function ArticleModal({
  articleId,
  onClose,
  currentLanguage,
  onBookmarkToggle,
  isBookmarked,
  onLikeToggle,
  isLiked,
  onArticleClick
}: ArticleModalProps) {
  const t = TRANSLATIONS[currentLanguage];
  const modalRef = useRef<HTMLDivElement>(null);

  // Active article state
  const article = MOCK_ARTICLES.find(a => a.id === articleId) || MOCK_ARTICLES[0];

  // Reading settings
  const [fontSize, setFontSize] = useState<number>(18); // default size in px
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  
  // Comments and feedback state
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSort, setCommentSort] = useState<'latest' | 'popular'>('popular');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Reaction counters
  const [reactions, setReactions] = useState({
    thumbs: 242,
    heart: 189,
    mindblown: 92,
    clap: 120
  });
  const [userReaction, setUserReaction] = useState<string | null>(null);

  // Handle Reading Progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!modalRef.current) return;
      const element = modalRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight > 0) {
        const progress = (element.scrollTop / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    const element = modalRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, [articleId]);

  // Autofocus/Reset state on article swap
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
    setScrollProgress(0);
    setCopied(false);
  }, [articleId]);

  if (!articleId) return null;

  // Find index for next/previous articles
  const currentIndex = MOCK_ARTICLES.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? MOCK_ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < MOCK_ARTICLES.length - 1 ? MOCK_ARTICLES[currentIndex + 1] : null;

  // Filter out the current article to find related stories
  const relatedArticles = MOCK_ARTICLES.filter(a => a.id !== article.id && a.category === article.category).slice(0, 2);

  // Handle clipboard copy
  const handleCopyLink = () => {
    safeCopyText(window.location.href, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Handle triggers
  const handlePrint = () => {
    window.print();
  };

  // Reactions click
  const handleReact = (type: 'thumbs' | 'heart' | 'mindblown' | 'clap') => {
    if (userReaction === type) {
      setReactions(prev => ({ ...prev, [type]: prev[type] - 1 }));
      setUserReaction(null);
    } else {
      if (userReaction) {
        // remove old reaction first
        setReactions(prev => ({ ...prev, [userReaction]: prev[userReaction] - 1 }));
      }
      setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
      setUserReaction(type);
    }
  };

  // Submit comment
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: "Guest Reader",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      text: newCommentText.trim(),
      date: "Just now",
      likes: 0,
      replies: []
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  return (
    <div id="article-reader-container" className="fixed inset-0 z-50 flex justify-end bg-brand-charcoal/80 overflow-hidden">
      {/* 1. Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 2. Main Reader Drawer Panel (Slide-in) */}
      <motion.div
        ref={modalRef}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
        className="relative w-full lg:w-[850px] xl:w-[950px] bg-white h-full shadow-2xl flex flex-col overflow-y-auto print:bg-white print:shadow-none print:w-full"
      >
        {/* Progress Bar (Sticky Top) */}
        <div className="sticky top-0 left-0 right-0 h-1.5 bg-brand-light z-50 print:hidden">
          <div 
            className="h-full bg-brand-red transition-all duration-75" 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Sticky Utility Actions Bar */}
        <div className="sticky top-1.5 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-brand-border px-6 py-3 flex items-center justify-between z-40 print:hidden">
          <div className="flex items-center space-x-2">
            <button
              id="reader-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-brand-light text-brand-charcoal hover:text-brand-red transition-colors cursor-pointer"
              title="Close Reader"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs text-brand-muted-text font-semibold hidden sm:inline uppercase tracking-widest">
              {CATEGORIES.find(c => c.id === article.category)?.label[currentLanguage] || article.category}
            </span>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Font Control */}
            <div className="flex items-center bg-brand-light border border-brand-border rounded-lg p-0.5">
              <button
                id="font-zoom-out"
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className="p-1 hover:bg-white rounded text-brand-charcoal transition-all"
                title="Decrease Text Size"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-bold px-2 text-brand-secondary-text">
                {fontSize}px
              </span>
              <button
                id="font-zoom-in"
                onClick={() => setFontSize(Math.min(26, fontSize + 2))}
                className="p-1 hover:bg-white rounded text-brand-charcoal transition-all"
                title="Increase Text Size"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="w-[1px] h-4 bg-brand-border hidden sm:block"></span>

            {/* Like */}
            <button
              id="reader-like-btn"
              onClick={() => onLikeToggle(article.id)}
              className={`p-1.5 rounded-full border transition-all ${
                isLiked 
                  ? 'bg-red-50 border-brand-red text-brand-red' 
                  : 'border-brand-border hover:bg-brand-light text-brand-secondary-text'
              }`}
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>

            {/* Bookmark */}
            <button
              id="reader-bookmark-btn"
              onClick={() => onBookmarkToggle(article.id)}
              className={`p-1.5 rounded-full border transition-all ${
                isBookmarked 
                  ? 'bg-red-50 border-brand-red text-brand-red' 
                  : 'border-brand-border hover:bg-brand-light text-brand-secondary-text'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Share link copy */}
            <button
              id="reader-share-btn"
              onClick={() => setShowShare(true)}
              className="p-1.5 rounded-full border border-brand-border hover:bg-brand-light text-brand-secondary-text hover:text-brand-red transition-all cursor-pointer"
              title="Share Article"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Print */}
            <button
              id="reader-print-btn"
              onClick={handlePrint}
              className="p-1.5 rounded-full border border-brand-border hover:bg-brand-light text-brand-secondary-text transition-all hidden sm:block"
              title="Print Article"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. Main Content Container */}
        <div className="flex-1 p-6 sm:p-10 max-w-[760px] mx-auto w-full space-y-6">
          {/* Header Metadata */}
          <div className="space-y-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-brand-red">
              {CATEGORIES.find(c => c.id === article.category)?.label[currentLanguage] || article.category}
            </span>

            <h1 className="font-serif font-black text-2xl sm:text-3.5xl md:text-4xl text-brand-charcoal leading-tight tracking-tight">
              {article.title[currentLanguage]}
            </h1>

            <p className="font-serif text-lg md:text-xl text-brand-secondary-text leading-relaxed border-l-4 border-brand-red pl-4 italic">
              {article.summary[currentLanguage]}
            </p>

            {/* Author / Date Info Card */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-brand-border">
              <div className="flex items-center space-x-3">
                <img 
                  src={article.author.avatar} 
                  alt={article.author.name} 
                  className="w-10 h-10 rounded-full object-cover border border-brand-border" 
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs">
                  <div className="font-bold text-brand-charcoal">{t.author} {article.author.name}</div>
                  <div className="text-brand-muted-text">{article.date}</div>
                </div>
              </div>

              <div className="text-right text-[11px] text-brand-muted-text space-y-0.5">
                <div>Views: <span className="font-semibold text-brand-charcoal">{(article.views + (isLiked ? 1 : 0)).toLocaleString()}</span></div>
                <div>{t.minsRead}: <span className="font-semibold text-brand-charcoal">{article.readTime} min</span></div>
                {article.updatedDate && (
                  <div className="text-[10px] italic">Updated: {article.updatedDate}</div>
                )}
              </div>
            </div>
          </div>

          {/* Large Hero Media Image (or Video) */}
          <div className="relative rounded-2xl overflow-hidden border border-brand-border shadow-md">
            {article.videoUrl ? (
              <div className="relative aspect-video bg-black flex items-center justify-center">
                {/* Simulated custom video player using native video element for actual playbacks */}
                <video 
                  src={article.videoUrl} 
                  controls 
                  className="w-full h-full object-cover"
                  poster={article.image}
                />
                <div className="absolute top-4 left-4 bg-brand-red text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-md flex items-center space-x-1">
                  <Play className="w-3 h-3 fill-current" />
                  <span>VIDEO BRIEF</span>
                </div>
              </div>
            ) : article.imagesGallery ? (
              <div className="relative">
                <div className="aspect-video">
                  <img
                    src={article.imagesGallery[activePhotoIndex]}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Image gallery navigation controls */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center justify-between text-white">
                  <span className="text-xs font-semibold">Image {activePhotoIndex + 1} of {article.imagesGallery.length}</span>
                  <div className="flex space-x-1">
                    <button
                      id="gallery-prev-btn"
                      onClick={() => setActivePhotoIndex(prev => (prev === 0 ? article.imagesGallery!.length - 1 : prev - 1))}
                      className="p-1 bg-white/20 hover:bg-white/40 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      id="gallery-next-btn"
                      onClick={() => setActivePhotoIndex(prev => (prev === article.imagesGallery!.length - 1 ? 0 : prev + 1))}
                      className="p-1 bg-white/20 hover:bg-white/40 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-[16/10]">
                <img
                  src={article.image}
                  alt={article.title[currentLanguage]}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>

          {/* Copyable Inline URL toast alert */}
          <AnimatePresence>
            {copied && (
              <motion.div 
                id="clipboard-toast"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-green-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-center space-x-2 mx-auto max-w-[280px]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.copiedLink}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dynamic Editorial Content Body with Accessibility font size controls */}
          <article 
            id="reader-body-article"
            className="font-serif leading-relaxed text-brand-charcoal space-y-6 print:text-black"
            style={{ fontSize: `${fontSize}px` }}
          >
            {article.content[currentLanguage]?.map((paragraph, idx) => (
              <p key={idx} className="first-letter:font-bold first-letter:text-brand-red">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Article Footer Tags */}
          <div className="pt-6 border-t border-brand-border flex flex-wrap gap-1.5 print:hidden">
            {article.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-brand-light border border-brand-border text-brand-secondary-text hover:text-brand-red hover:border-brand-red transition-all cursor-pointer px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Interactive Emoji & Micro Reactions Section */}
          <div className="bg-brand-light p-6 rounded-2xl border border-brand-border space-y-4 print:hidden">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-charcoal">Reader Reactions</h4>
            <div className="grid grid-cols-4 gap-2.5">
              <button
                id="react-thumbs"
                onClick={() => handleReact('thumbs')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                  userReaction === 'thumbs' 
                    ? 'bg-red-50 border-brand-red text-brand-red' 
                    : 'bg-white border-brand-border hover:border-brand-red text-brand-secondary-text'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Like ({reactions.thumbs})</span>
              </button>

              <button
                id="react-heart"
                onClick={() => handleReact('heart')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                  userReaction === 'heart' 
                    ? 'bg-red-50 border-brand-red text-brand-red' 
                    : 'bg-white border-brand-border hover:border-brand-red text-brand-secondary-text'
                }`}
              >
                <HeartIcon className="w-4 h-4" />
                <span>Love ({reactions.heart})</span>
              </button>

              <button
                id="react-mindblown"
                onClick={() => handleReact('mindblown')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                  userReaction === 'mindblown' 
                    ? 'bg-red-50 border-brand-red text-brand-red' 
                    : 'bg-white border-brand-border hover:border-brand-red text-brand-secondary-text'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Insightful ({reactions.mindblown})</span>
              </button>

              <button
                id="react-clap"
                onClick={() => handleReact('clap')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                  userReaction === 'clap' 
                    ? 'bg-red-50 border-brand-red text-brand-red' 
                    : 'bg-white border-brand-border hover:border-brand-red text-brand-secondary-text'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clap ({reactions.clap})</span>
              </button>
            </div>
          </div>

          {/* Nested Comments & Replies Section */}
          <div className="space-y-6 pt-6 border-t border-brand-border print:hidden">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-black text-xl text-brand-charcoal flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-brand-red" />
                {t.comments} ({comments.length + 1})
              </h3>

              <div className="flex items-center space-x-1.5 text-xs text-brand-muted-text">
                <span>{t.sortBy}:</span>
                <select
                  value={commentSort}
                  onChange={(e) => setCommentSort(e.target.value as 'latest' | 'popular')}
                  className="border border-brand-border bg-white rounded px-2 py-1 font-semibold text-brand-charcoal focus:outline-none"
                >
                  <option value="popular">{t.popular}</option>
                  <option value="latest">{t.latest}</option>
                </select>
              </div>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-brand-red text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                G
              </div>
              <div className="flex-1 space-y-2">
                <textarea
                  id="comment-text-area"
                  rows={2}
                  placeholder={t.writeComment}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full border border-brand-border p-3 rounded-xl text-sm focus:border-brand-red focus:outline-none bg-white font-sans shadow-inner"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    id="submit-comment-btn"
                    className="px-4 py-1.5 bg-brand-charcoal hover:bg-brand-red text-white text-xs font-bold rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>{t.submitComment}</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-4">
              {comments.map((comm) => (
                <div key={comm.id} className="p-4 border border-brand-border rounded-xl space-y-2 text-sm bg-brand-light/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={comm.avatar} 
                        alt="" 
                        className="w-7 h-7 rounded-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                      <span className="font-bold text-brand-charcoal text-xs">{comm.author}</span>
                      {comm.isVerified && (
                        <span className="text-[10px] bg-brand-red text-white font-extrabold flex items-center px-1.5 py-0.5 rounded-full space-x-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>{t.verifiedReader}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-brand-muted-text">{comm.date}</span>
                  </div>
                  <p className="text-brand-secondary-text text-xs leading-relaxed font-sans">{comm.text}</p>
                  
                  {/* Action row (Like, Reply triggers) */}
                  <div className="flex items-center space-x-4 pt-1 text-[11px] font-bold text-brand-muted-text">
                    <button className="hover:text-brand-red flex items-center space-x-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>Like ({comm.likes})</span>
                    </button>
                  </div>

                  {/* Replies nesting */}
                  {comm.replies && comm.replies.length > 0 && (
                    <div className="ml-6 pl-4 border-l-2 border-brand-border mt-3 space-y-3">
                      {comm.replies.map((rep) => (
                        <div key={rep.id} className="space-y-1 bg-white p-3 rounded-lg border border-brand-border/60">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <img 
                                src={rep.avatar} 
                                alt="" 
                                className="w-5.5 h-5.5 rounded-full object-cover" 
                                referrerPolicy="no-referrer"
                              />
                              <span className="font-bold text-brand-charcoal text-[11px]">{rep.author}</span>
                            </div>
                            <span className="text-[9px] text-brand-muted-text">{rep.date}</span>
                          </div>
                          <p className="text-brand-secondary-text text-xs leading-relaxed font-sans">{rep.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recommended / Related Stories */}
          {relatedArticles.length > 0 && (
            <div className="pt-8 border-t border-brand-border space-y-4 print:hidden">
              <h3 className="font-serif font-black text-lg text-brand-charcoal uppercase tracking-wider">
                {t.relatedNews}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((art) => (
                  <div
                    key={art.id}
                    id={`related-story-card-${art.id}`}
                    onClick={() => onArticleClick(art.id)}
                    className="p-3 border border-brand-border rounded-xl hover:border-brand-red transition-all cursor-pointer flex space-x-3 group bg-white hover-lift"
                  >
                    <div className="w-16 h-16 bg-brand-light rounded-lg overflow-hidden flex-shrink-0 border border-brand-border">
                      <img 
                        src={art.image} 
                        alt="" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal leading-snug group-hover:text-brand-red transition-colors line-clamp-2">
                        {art.title[currentLanguage]}
                      </h4>
                      <span className="text-[10px] font-bold text-brand-muted-text uppercase">
                        {CATEGORIES.find(c => c.id === art.category)?.label[currentLanguage] || art.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next/Previous Editorial Navigation Footers */}
          <div className="pt-8 border-t border-brand-border flex flex-wrap sm:flex-nowrap justify-between gap-4 print:hidden">
            {prevArticle ? (
              <button
                id="reader-prev-article-btn"
                onClick={() => onArticleClick(prevArticle.id)}
                className="flex-1 text-left p-4 border border-brand-border hover:border-brand-red rounded-xl group transition-all hover-lift bg-white cursor-pointer"
              >
                <div className="text-[10px] font-black uppercase text-brand-muted-text flex items-center mb-1">
                  <ChevronLeft className="w-3.5 h-3.5 mr-1 text-brand-red" />
                  PREVIOUS ARTICLE
                </div>
                <div className="font-serif font-bold text-xs text-brand-charcoal line-clamp-1 group-hover:text-brand-red transition-colors">
                  {prevArticle.title[currentLanguage]}
                </div>
              </button>
            ) : <div className="flex-1" />}

            {nextArticle ? (
              <button
                id="reader-next-article-btn"
                onClick={() => onArticleClick(nextArticle.id)}
                className="flex-1 text-right p-4 border border-brand-border hover:border-brand-red rounded-xl group transition-all hover-lift bg-white cursor-pointer"
              >
                <div className="text-[10px] font-black uppercase text-brand-muted-text flex items-center justify-end mb-1">
                  NEXT ARTICLE
                  <ChevronRight className="w-3.5 h-3.5 ml-1 text-brand-red" />
                </div>
                <div className="font-serif font-bold text-xs text-brand-charcoal line-clamp-1 group-hover:text-brand-red transition-colors">
                  {nextArticle.title[currentLanguage]}
                </div>
              </button>
            ) : <div className="flex-1" />}
          </div>
        </div>
      </motion.div>

      {/* Comprehensive News Social Share Modal */}
      <AnimatePresence>
        {showShare && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setShowShare(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-3xl p-6 w-full max-w-md border border-slate-100 shadow-2xl z-10 text-slate-800 text-xs overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-serif font-black text-base text-brand-charcoal">
                  {currentLanguage === 'marathi' ? 'बातमी शेअर करा' : currentLanguage === 'hindi' ? 'समाचार साझा करें' : 'Share News Article'}
                </h4>
                <button onClick={() => setShowShare(false)} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-slate-500 mb-5 font-sans leading-relaxed">
                {currentLanguage === 'marathi' 
                  ? 'ही महत्त्वाची बातमी तुमच्या मित्रांसह सोशल मीडियावर किंवा थेट व्हॉट्सॲपवर शेअर करा:' 
                  : currentLanguage === 'hindi' 
                    ? 'इस महत्वपूर्ण समाचार को अपने मित्रों के साथ सोशल मीडिया या सीधे व्हाट्सएप पर साझा करें:' 
                    : 'Share this premium editorial story with friends across social networks, messaging platforms, or copy the direct source URL:'}
              </p>

              {/* Quick share action links grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {/* WhatsApp Share */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title[currentLanguage] + " - Read on Janshakti News Portal: " + window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold border border-[#25D366]/20 rounded-2xl flex items-center gap-2.5 transition-all text-left justify-center cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.298 1.448 5.348 1.449 5.27.002 9.554-4.282 9.556-9.561.001-2.556-.991-4.959-2.793-6.762-1.801-1.801-4.197-2.791-6.751-2.792-5.27 0-9.555 4.284-9.558 9.563-.002 2.03.534 3.407 1.448 5.319L2.622 21.37l4.025-1.056z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>

                {/* Facebook Share */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] font-bold border border-[#1877F2]/20 rounded-2xl flex items-center gap-2.5 transition-all text-left justify-center cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>

                {/* Twitter / X Share */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title[currentLanguage] + " #JanshaktiNews")}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-200 rounded-2xl flex items-center gap-2.5 transition-all text-left justify-center cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>Twitter / X</span>
                </a>

                {/* LinkedIn Share */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] font-bold border border-[#0A66C2]/20 rounded-2xl flex items-center gap-2.5 transition-all text-left justify-center cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>

              {/* Copy Link Row */}
              <div className="mb-6">
                <button
                  onClick={handleCopyLink}
                  className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 rounded-2xl flex items-center justify-between transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Bookmark className="w-4 h-4 text-slate-500" />
                    {currentLanguage === 'marathi' ? 'लिंक कॉपी करा' : currentLanguage === 'hindi' ? 'लिंक कॉपी करें' : 'Copy Link'}
                  </span>
                  {copied ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
                      <Check className="w-3.5 h-3.5" />
                      {currentLanguage === 'marathi' ? 'कॉपी केली!' : currentLanguage === 'hindi' ? 'कॉपी की गई!' : 'Copied!'}
                    </span>
                  ) : (
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>

              {/* Beautiful Instagram Stories visual template helper */}
              <div className="border-t border-slate-100 pt-5">
                <h5 className="font-bold text-xs text-brand-charcoal mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="p-1 bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-500 text-white rounded-lg flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051c-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </span>
                  <span>Instagram Stories Share Helper</span>
                </h5>
                <p className="text-[11px] text-slate-400 mb-4 font-sans leading-relaxed">
                  Take a screenshot of the card below or hold on it to save, then upload to Instagram with our hashtags!
                </p>

                {/* Immersive Mobile Instagram mockup card */}
                <div className="relative aspect-[9/16] bg-brand-charcoal text-white rounded-2xl p-4 overflow-hidden border border-slate-800 shadow-inner flex flex-col justify-between max-w-[210px] mx-auto scale-95 origin-top">
                  {/* Top Accent bar */}
                  <div className="flex justify-between items-center text-[8px] opacity-85">
                    <span className="font-serif font-black tracking-widest text-brand-red uppercase">Janshakti</span>
                    <span className="bg-brand-red/90 text-[7px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold flex items-center gap-0.5">
                      {currentLanguage === 'marathi' ? 'ब्रेकिंग न्यूज' : currentLanguage === 'hindi' ? 'ब्रेकिंग न्यूज' : 'Breaking'}
                    </span>
                  </div>

                  {/* Video thumbnail simulation background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/35 -z-10">
                    <img 
                      src={article.image} 
                      className="w-full h-full object-cover opacity-60 brightness-75"
                    />
                  </div>

                  {/* Middle decoration logo */}
                  <div className="my-auto flex flex-col items-center justify-center gap-1 text-center py-2 bg-brand-charcoal/40 rounded-xl border border-white/5 backdrop-blur-xs">
                    <span className="text-[8px] tracking-wider uppercase font-black text-brand-red">Janshakti News</span>
                    <span className="text-[6px] text-slate-300">Tap link in bio to read full article</span>
                  </div>

                  {/* Bottom text block */}
                  <div className="space-y-1 bg-gradient-to-t from-black to-transparent pt-4 text-left">
                    <span className="text-[7px] font-extrabold uppercase bg-brand-red text-white px-1.5 py-0.5 rounded">
                      {CATEGORIES.find(c => c.id === article.category)?.label[currentLanguage] || article.category}
                    </span>
                    <h6 className="font-serif font-bold text-[9px] leading-tight line-clamp-3">
                      {article.title[currentLanguage]}
                    </h6>
                    <div className="flex items-center justify-between text-[6px] pt-1 text-slate-400 border-t border-white/5">
                      <span>{article.author.name}</span>
                      <span>{article.readTime} mins read</span>
                    </div>
                  </div>
                </div>

                {/* Auto Copy instagram tags button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`#JanshaktiNews #MaharashtraNews #${CATEGORIES.find(c => c.id === article.category)?.label[currentLanguage] || article.category}`);
                    alert("Instagram hashtags copied to clipboard! Paste them when publishing your story.");
                  }}
                  className="w-full mt-3 py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all text-[11px] cursor-pointer"
                >
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Copy Instagram Tags & Hashtags</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
