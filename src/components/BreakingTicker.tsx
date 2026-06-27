import React from 'react';
import { Volume2, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { TICKER_HEADLINES, TRANSLATIONS } from '../data';

interface BreakingTickerProps {
  currentLanguage: Language;
  onArticleClick: (articleId: string) => void;
}

export default function BreakingTicker({ currentLanguage, onArticleClick }: BreakingTickerProps) {
  const t = TRANSLATIONS[currentLanguage];
  const headlines = TICKER_HEADLINES[currentLanguage] || [];

  if (headlines.length === 0) return null;

  return (
    <div className="bg-brand-charcoal text-white py-2.5 px-4 md:px-6 flex items-center overflow-hidden border-b border-brand-red/30 select-none">
      {/* Ticker badge */}
      <div className="flex items-center space-x-1.5 bg-brand-red text-white text-[10px] md:text-xs font-black uppercase tracking-wider px-3 py-1 rounded shadow-md z-10 flex-shrink-0 animate-pulse mr-4">
        <Volume2 className="w-3.5 h-3.5" />
        <span>{t.breaking}</span>
      </div>

      {/* Marquee Scroller Wrapper */}
      <div className="flex-1 overflow-hidden relative py-0.5">
        <div className="marquee-container w-full">
          <div className="marquee-content animate-marquee flex items-center space-x-12 whitespace-nowrap cursor-pointer">
            {headlines.map((headline, idx) => (
              <button
                key={`${headline.articleId}-${idx}`}
                id={`ticker-item-${idx}`}
                onClick={() => onArticleClick(headline.articleId)}
                className="flex items-center space-x-2 text-xs md:text-sm font-medium text-gray-100 hover:text-brand-red transition-colors focus:outline-none focus:text-brand-red"
              >
                <span>•</span>
                <span className="underline-offset-4 hover:underline">{headline.text}</span>
                <ChevronRight className="w-3.5 h-3.5 text-brand-red inline-block" />
              </button>
            ))}
            {/* Duplicate for seamless infinite scrolling loop */}
            {headlines.map((headline, idx) => (
              <button
                key={`${headline.articleId}-dup-${idx}`}
                id={`ticker-item-dup-${idx}`}
                onClick={() => onArticleClick(headline.articleId)}
                className="flex items-center space-x-2 text-xs md:text-sm font-medium text-gray-100 hover:text-brand-red transition-colors focus:outline-none focus:text-brand-red"
              >
                <span>•</span>
                <span className="underline-offset-4 hover:underline">{headline.text}</span>
                <ChevronRight className="w-3.5 h-3.5 text-brand-red inline-block" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
