import React, { useState } from 'react';
import { Play, Tv, Share2, Heart, Volume2, Maximize2 } from 'lucide-react';
import { Language, Article } from '../types';
import { TRANSLATIONS } from '../data';

interface VideoSectionProps {
  currentLanguage: Language;
  articles: Article[];
  onArticleClick: (articleId: string) => void;
}

export default function VideoSection({ currentLanguage, articles, onArticleClick }: VideoSectionProps) {
  const t = TRANSLATIONS[currentLanguage];
  const videoArticles = articles.filter(a => a.videoUrl !== undefined);

  const [activeVideoId, setActiveVideoId] = useState<string | null>(
    videoArticles.length > 0 ? videoArticles[0].id : null
  );

  const activeVideo = videoArticles.find(v => v.id === activeVideoId) || videoArticles[0];

  if (videoArticles.length === 0) return null;

  return (
    <div className="bg-brand-charcoal text-white p-6 sm:p-8 rounded-3xl border border-brand-red/20 space-y-6 shadow-xl relative overflow-hidden select-none">
      <div className="absolute top-0 right-0 opacity-5 font-serif font-black text-9xl">TV</div>
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-brand-red text-white rounded-xl shadow">
            <Tv className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="font-serif font-black text-xl md:text-2xl tracking-tight">
              {t.videosTitle}
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ground Zero Bulletins</p>
          </div>
        </div>
      </div>

      {/* Grid Layout: Featured Large Player + Side Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Large Player Theater */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black group">
            <video
              src={activeVideo.videoUrl}
              controls
              poster={activeVideo.image}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-brand-red text-white text-[9px] font-black uppercase px-2.5 py-1 rounded shadow-md flex items-center space-x-1">
              <Volume2 className="w-3 h-3 fill-current" />
              <span>STEREOPHONIC BROADCAST</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] bg-white/10 text-brand-red font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
              {activeVideo.category}
            </span>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-white leading-snug hover:text-brand-red transition-colors cursor-pointer" onClick={() => onArticleClick(activeVideo.id)}>
              {activeVideo.title[currentLanguage]}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 font-sans">
              {activeVideo.summary[currentLanguage]}
            </p>
          </div>
        </div>

        {/* Side Listings Playlists */}
        <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
          {videoArticles.map((vid) => {
            const isPlaying = vid.id === activeVideoId;
            return (
              <div
                key={vid.id}
                id={`video-sidebar-${vid.id}`}
                onClick={() => setActiveVideoId(vid.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 group hover:bg-white/5 ${
                  isPlaying 
                    ? 'bg-white/10 border-brand-red shadow' 
                    : 'bg-white/5 border-white/5'
                }`}
              >
                {/* Thumbnail */}
                <div className="w-24 h-16 sm:w-28 sm:h-20 bg-brand-light rounded-xl overflow-hidden flex-shrink-0 relative border border-white/10">
                  <img
                    src={vid.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {/* Play overlay overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-brand-charcoal shadow">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <h4 className={`font-serif font-bold text-xs leading-snug line-clamp-2 transition-colors ${
                    isPlaying ? 'text-brand-red' : 'text-white group-hover:text-brand-red'
                  }`}>
                    {vid.title[currentLanguage]}
                  </h4>
                  <span className="text-[9px] font-bold text-gray-400 uppercase">
                    Duration: {vid.readTime} mins
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
