import React, { useState } from 'react';
import { 
  TrendingUp, Activity, BarChart4, Mail, CloudSun, MapPin, 
  ChevronRight, ArrowUpRight, ArrowDownRight, CheckCircle2 
} from 'lucide-react';
import { Language, Article, MarketIndex } from '../types';
import { TRANSLATIONS, CURRENT_POLL, MARKET_INDICES, CATEGORIES } from '../data';

interface SidebarProps {
  currentLanguage: Language;
  trendingArticles: Article[];
  onArticleClick: (articleId: string) => void;
  onSubscribeNewsletter: (email: string) => void;
}

export default function Sidebar({
  currentLanguage,
  trendingArticles,
  onArticleClick,
  onSubscribeNewsletter
}: SidebarProps) {
  const t = TRANSLATIONS[currentLanguage];
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSubscribed, setNewsSubscribed] = useState(false);
  
  // Poll States
  const [votedOption, setVotedOption] = useState<string | null>(null);
  const [pollVotes, setPollVotes] = useState<Record<string, number>>(
    CURRENT_POLL.options.reduce((acc, opt) => ({ ...acc, [opt.id]: opt.votes }), {} as Record<string, number>)
  );

  const handleVote = (optionId: string) => {
    if (votedOption) return; // Only allow one vote
    setVotedOption(optionId);
    setPollVotes((prev: Record<string, number>) => ({
      ...prev,
      [optionId]: (prev[optionId] || 0) + 1
    }));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    onSubscribeNewsletter(newsEmail.trim());
    setNewsSubscribed(true);
    setNewsEmail('');
    setTimeout(() => setNewsSubscribed(false), 5000);
  };

  const totalPollVotes = (Object.values(pollVotes) as number[]).reduce((sum, v) => sum + v, 0);

  return (
    <aside id="news-sidebar-panel" className="space-y-6 lg:sticky lg:top-24">
      {/* 1. Weather Mini Widget */}
      <div className="bg-brand-light p-4 rounded-2xl border border-brand-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-50 rounded-xl text-amber-500">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-brand-muted-text font-black uppercase tracking-wider">HURRICANE ALERT</div>
            <div className="text-xs font-bold text-brand-charcoal flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-brand-red" />
              Mumbai Metropolitan Area
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-serif font-black text-brand-charcoal">28°C</span>
          <div className="text-[9px] font-bold text-brand-red uppercase">Scatter Storms</div>
        </div>
      </div>

      {/* 2. Stock & Commodity Market Watch */}
      <div className="bg-white p-5 rounded-2xl border border-brand-border space-y-4 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-widest text-brand-charcoal flex items-center border-b border-brand-border pb-2">
          <Activity className="w-4 h-4 mr-2 text-brand-red" />
          {t.marketTitle}
        </h3>
        <div className="grid grid-cols-2 gap-3.5">
          {MARKET_INDICES.map((index) => (
            <div key={index.symbol} className="bg-brand-light p-3 rounded-xl border border-brand-border/40 space-y-1">
              <div className="text-[10px] font-black text-brand-muted-text uppercase tracking-wider">{index.name}</div>
              <div className="text-sm font-serif font-extrabold text-brand-charcoal">{index.value}</div>
              <div className={`text-[10px] font-bold flex items-center ${
                index.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {index.isPositive ? (
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                )}
                <span>{index.changePercent} ({index.change})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Trending Articles List */}
      <div className="bg-white p-5 rounded-2xl border border-brand-border space-y-4 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-widest text-brand-charcoal flex items-center border-b border-brand-border pb-2">
          <TrendingUp className="w-4 h-4 mr-2 text-brand-red" />
          {t.trending}
        </h3>
        
        <div className="space-y-4">
          {trendingArticles.map((art, index) => (
            <div
              key={art.id}
              id={`sidebar-trending-${art.id}`}
              onClick={() => onArticleClick(art.id)}
              className="flex items-start space-x-3 group cursor-pointer"
            >
              <span className="font-serif font-black text-2xl md:text-3xl text-red-100 group-hover:text-brand-red transition-colors leading-none">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="space-y-1 min-w-0">
                <span className="text-[9px] font-black tracking-wider text-brand-red uppercase">
                  {CATEGORIES.find(c => c.id === art.category)?.label[currentLanguage] || art.category}
                </span>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal leading-snug group-hover:text-brand-red transition-colors line-clamp-2">
                  {art.title[currentLanguage]}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Editorial Interactive Opinion Poll */}
      <div className="bg-white p-5 rounded-2xl border border-brand-border space-y-4 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-widest text-brand-charcoal flex items-center border-b border-brand-border pb-2">
          <BarChart4 className="w-4 h-4 mr-2 text-brand-red" />
          {t.pollTitle}
        </h3>
        <div className="space-y-3">
          <p className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal leading-snug">
            {CURRENT_POLL.question[currentLanguage]}
          </p>

          <div className="space-y-2 pt-1">
            {CURRENT_POLL.options.map((opt) => {
              const votesCount = (pollVotes as Record<string, number>)[opt.id] ?? opt.votes;
              const percentage = totalPollVotes > 0 ? Math.round((votesCount / totalPollVotes) * 100) : 0;
              const isUserVoted = votedOption === opt.id;

              return (
                <button
                  key={opt.id}
                  id={`poll-vote-${opt.id}`}
                  disabled={votedOption !== null}
                  onClick={() => handleVote(opt.id)}
                  className={`w-full text-left relative overflow-hidden rounded-xl border p-3 transition-all ${
                    votedOption 
                      ? isUserVoted 
                        ? 'border-brand-red bg-red-50/20' 
                        : 'border-brand-border bg-brand-light/40'
                      : 'border-brand-border hover:border-brand-red bg-white hover:bg-brand-light/30'
                  }`}
                >
                  {/* Sliding percentage bar for votes visualizer */}
                  {votedOption && (
                    <div 
                      className={`absolute left-0 top-0 bottom-0 ${
                        isUserVoted ? 'bg-red-100/60' : 'bg-gray-100'
                      } transition-all duration-1000`}
                      style={{ width: `${percentage}%`, zIndex: 0 }}
                    />
                  )}

                  <div className="relative flex justify-between items-center text-xs font-semibold text-brand-charcoal z-10">
                    <span className="max-w-[80%] pr-2">{opt.text[currentLanguage]}</span>
                    {votedOption && (
                      <span className="font-mono font-black text-brand-red">{percentage}%</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {votedOption && (
            <div className="text-center text-[10px] font-bold text-brand-muted-text uppercase pt-1">
              {t.pollVoted} • {totalPollVotes.toLocaleString()} {t.pollTotal}
            </div>
          )}
        </div>
      </div>

      {/* 5. Custom Simulated High-Contrast Advertisement Space */}
      <div className="bg-brand-charcoal text-white p-5 rounded-2xl border-l-4 border-brand-red space-y-3 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 font-serif font-black text-6xl select-none translate-x-6 translate-y-6">J</div>
        <span className="inline-block bg-white/20 text-[8px] font-black tracking-widest px-2 py-0.5 rounded text-white uppercase">ADVERTISEMENT</span>
        <div className="space-y-1">
          <h4 className="font-serif font-black text-sm tracking-tight">Access Premium Insights with Janshakti Plus</h4>
          <p className="text-[10px] text-gray-300">Unlock detailed policy deep-dives, Marathi column archives and ad-free viewing.</p>
        </div>
        <button
          id="ad-premium-btn"
          className="w-full py-1.5 bg-brand-red hover:bg-white hover:text-brand-charcoal text-white text-[10px] font-extrabold uppercase tracking-widest rounded transition-all cursor-pointer shadow-md"
        >
          Subscribe Today
        </button>
      </div>

      {/* 6. Newsletter Registration Box */}
      <div className="bg-brand-light p-5 rounded-2xl border border-brand-border space-y-4">
        <div className="p-2.5 bg-red-100/50 rounded-xl text-brand-red w-10 h-10 flex items-center justify-center">
          <Mail className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="font-serif font-black text-sm text-brand-charcoal leading-snug">
            {t.newsletterTitle}
          </h3>
          <p className="text-xs text-brand-secondary-text leading-relaxed">
            {t.newsletterSubtitle}
          </p>
        </div>

        {newsSubscribed ? (
          <div className="p-3 bg-green-50 text-green-700 rounded-xl border border-green-200 flex items-center space-x-2 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Successfully registered email. Enjoy daily curation!</span>
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="space-y-2">
            <input
              type="email"
              id="newsletter-email-input"
              required
              placeholder={t.placeholderEmail}
              value={newsEmail}
              onChange={(e) => setNewsEmail(e.target.value)}
              className="w-full p-2.5 bg-white border border-brand-border text-xs font-semibold rounded-xl focus:border-brand-red focus:outline-none bg-white font-sans"
            />
            <button
              type="submit"
              id="newsletter-submit-btn"
              className="w-full py-2 bg-brand-charcoal hover:bg-brand-red text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>{t.subscribeBtn}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
