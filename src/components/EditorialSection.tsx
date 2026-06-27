import React from 'react';
import { Quote, BookOpen, UserCheck, ArrowRight } from 'lucide-react';
import { Language, Article, Author } from '../types';
import { TRANSLATIONS, COLUMNISTS } from '../data';

interface EditorialSectionProps {
  currentLanguage: Language;
  articles: Article[];
  onArticleClick: (articleId: string) => void;
}

export default function EditorialSection({ currentLanguage, articles, onArticleClick }: EditorialSectionProps) {
  const t = TRANSLATIONS[currentLanguage];
  const opinionArticles = articles.filter(a => a.columnist === true || a.category === 'opinion');

  return (
    <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-3xl border border-[#ECEBE6] space-y-6 select-none relative overflow-hidden">
      <div className="absolute right-0 top-0 opacity-10 font-serif font-black text-9xl text-[#DCDCD2]">“</div>
      
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-[#EBEAE3] pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-brand-red text-white rounded-xl">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-serif font-black text-xl md:text-2xl text-brand-charcoal tracking-tight">
              {t.editorialTitle}
            </h2>
            <p className="text-[10px] text-brand-secondary-text font-bold uppercase tracking-widest">Thought Leadership & Columns</p>
          </div>
        </div>
      </div>

      {/* Grid: Left Column (Articles list) + Right Column (Columnist Profiles) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editorial Articles Directory */}
        <div className="lg:col-span-2 space-y-4">
          {opinionArticles.map((art) => (
            <div
              key={art.id}
              id={`editorial-article-${art.id}`}
              onClick={() => onArticleClick(art.id)}
              className="p-5 bg-white border border-[#EBEAE3] rounded-2xl hover:border-brand-red transition-all cursor-pointer flex flex-col md:flex-row gap-4 group hover-lift shadow-sm"
            >
              {/* Monogram or category badge */}
              <div className="flex-1 min-w-0 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black text-brand-red uppercase tracking-wider">
                      {art.columnName ? art.columnName[currentLanguage] : "EDITORIAL"}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] text-brand-muted-text font-bold uppercase">Opinion Column</span>
                  </div>
                  
                  <h3 className="font-serif font-bold text-base sm:text-lg text-brand-charcoal group-hover:text-brand-red transition-all leading-snug">
                    {art.title[currentLanguage]}
                  </h3>
                  
                  <p className="text-brand-secondary-text text-xs leading-relaxed line-clamp-2">
                    {art.summary[currentLanguage]}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-brand-border text-xs">
                  <div className="flex items-center space-x-2">
                    <img
                      src={art.author.avatar}
                      alt=""
                      className="w-6 h-6 rounded-full object-cover border border-brand-border"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-bold text-brand-charcoal">{art.author.name}</span>
                  </div>
                  <span className="text-[10px] text-brand-muted-text font-semibold">{art.readTime} mins read</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Columnist Profiles Roster Card */}
        <div className="space-y-4 bg-white/60 p-5 rounded-2xl border border-[#EBEAE3]">
          <h3 className="text-xs font-black uppercase tracking-wider text-brand-charcoal flex items-center mb-1">
            <UserCheck className="w-4 h-4 mr-1.5 text-brand-red" />
            Our Columnists
          </h3>
          
          <div className="space-y-4 divide-y divide-[#EBEAE3]">
            {COLUMNISTS.map((col, idx) => (
              <div key={col.name} className={`flex items-start space-x-3 ${idx > 0 ? 'pt-4' : ''}`}>
                <img
                  src={col.avatar}
                  alt={col.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1 min-w-0">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal leading-none">{col.name}</h4>
                  <p className="text-[10px] text-brand-red font-bold uppercase">{col.role}</p>
                  <p className="text-[10px] text-brand-secondary-text leading-normal line-clamp-2 font-sans">{col.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
