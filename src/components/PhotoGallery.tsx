import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, X, ChevronLeft, ChevronRight, Eye, Grid, Maximize2 } from 'lucide-react';
import { Language, Article } from '../types';
import { TRANSLATIONS } from '../data';

interface PhotoGalleryProps {
  currentLanguage: Language;
  articles: Article[];
  onArticleClick: (articleId: string) => void;
}

export default function PhotoGallery({ currentLanguage, articles, onArticleClick }: PhotoGalleryProps) {
  const t = TRANSLATIONS[currentLanguage];
  const galleryArticles = articles.filter(a => a.imagesGallery !== undefined);

  const [activeArticleId, setActiveArticleId] = useState<string | null>(
    galleryArticles.length > 0 ? galleryArticles[0].id : null
  );

  const activeArt = galleryArticles.find(g => g.id === activeArticleId) || galleryArticles[0];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for fullscreen lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev === null ? null : (prev + 1) % activeArt.imagesGallery!.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => (prev === null ? null : (prev === 0 ? activeArt.imagesGallery!.length - 1 : prev - 1)));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, activeArt]);

  if (galleryArticles.length === 0) return null;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border space-y-6 shadow-sm select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-border pb-4 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-brand-charcoal text-white rounded-xl">
            <Image className="w-5 h-5 text-brand-red" />
          </div>
          <div>
            <h2 className="font-serif font-black text-xl md:text-2xl text-brand-charcoal tracking-tight">
              {t.photosTitle}
            </h2>
            <p className="text-[10px] text-brand-muted-text font-bold uppercase tracking-widest">Visual Journalism</p>
          </div>
        </div>

        {/* Tab switcher for multiple photo essays */}
        {galleryArticles.length > 1 && (
          <div className="flex bg-brand-light p-1 rounded-xl border border-brand-border">
            {galleryArticles.map((essay) => (
              <button
                key={essay.id}
                id={`essay-tab-${essay.id}`}
                onClick={() => {
                  setActiveArticleId(essay.id);
                  setLightboxIndex(null);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  essay.id === activeArticleId
                    ? 'bg-white text-brand-red shadow-sm'
                    : 'text-brand-secondary-text hover:text-brand-charcoal'
                }`}
              >
                {essay.title[currentLanguage].slice(0, 15)}...
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid Layout: Masonry Photo Album */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Essay description details */}
        <div className="md:col-span-1 space-y-4 flex flex-col justify-between py-2">
          <div className="space-y-3">
            <span className="inline-block text-[9px] font-black uppercase tracking-wider text-brand-red bg-red-50 border border-brand-red/20 px-2.5 py-1 rounded-full">
              Photo Story Series
            </span>
            <h3 
              onClick={() => onArticleClick(activeArt.id)}
              className="font-serif font-black text-xl text-brand-charcoal hover:text-brand-red transition-colors leading-snug cursor-pointer"
            >
              {activeArt.title[currentLanguage]}
            </h3>
            <p className="text-xs text-brand-secondary-text leading-relaxed font-sans">
              {activeArt.summary[currentLanguage]}
            </p>
          </div>

          <div className="pt-4 border-t border-brand-border space-y-2">
            <div className="text-[10px] text-brand-muted-text">
              PHOTOGRAPHY BY <span className="font-bold text-brand-charcoal">{activeArt.author.name}</span>
            </div>
            <button
              id="gallery-read-story"
              onClick={() => onArticleClick(activeArt.id)}
              className="py-2.5 px-4 bg-brand-charcoal hover:bg-brand-red text-white text-xs font-bold rounded-xl transition-all w-full flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>{t.readMore}</span>
            </button>
          </div>
        </div>

        {/* Right Columns: Interactive masonry layout grids */}
        <div className="md:col-span-2 grid grid-cols-2 gap-3.5">
          {activeArt.imagesGallery?.map((img, idx) => {
            // Apply different heights to make it look like masonry
            const isTall = idx % 3 === 0;
            return (
              <div
                key={idx}
                id={`gallery-thumb-${idx}`}
                onClick={() => setLightboxIndex(idx)}
                className={`relative rounded-2xl overflow-hidden border border-brand-border shadow-sm group cursor-pointer ${
                  isTall ? 'row-span-1 h-44 sm:h-56' : 'h-44'
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <div className="p-2.5 bg-white text-brand-charcoal rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 className="w-4 h-4 text-brand-red" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 bg-brand-charcoal/70 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Fullscreen Lightbox Overlay Slider */}
      <AnimatePresence>
        {lightboxIndex !== null && activeArt.imagesGallery && (
          <motion.div
            id="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-6"
          >
            {/* Header: counter + close */}
            <div className="flex justify-between items-center text-white">
              <span className="text-sm font-semibold tracking-widest font-mono">
                IMAGE {lightboxIndex + 1} / {activeArt.imagesGallery.length}
              </span>
              <button
                id="lightbox-close-btn"
                onClick={() => setLightboxIndex(null)}
                className="p-2 hover:bg-white/10 rounded-full text-white hover:text-brand-red transition-all cursor-pointer"
                title="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Display: Big Image + Prev/Next Controls */}
            <div className="flex-1 flex items-center justify-between relative max-w-[1000px] mx-auto w-full">
              {/* Prev Button */}
              <button
                id="lightbox-prev-btn"
                onClick={() => setLightboxIndex(prev => (prev === null ? null : (prev === 0 ? activeArt.imagesGallery!.length - 1 : prev - 1)))}
                className="p-3 bg-white/10 hover:bg-white/20 hover:text-brand-red rounded-full text-white transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Central sliding image */}
              <div className="relative aspect-[4/3] max-h-[70vh] max-w-[85vw] mx-auto overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black">
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={activeArt.imagesGallery[lightboxIndex]}
                  alt=""
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Next Button */}
              <button
                id="lightbox-next-btn"
                onClick={() => setLightboxIndex(prev => (prev === null ? null : (prev + 1) % activeArt.imagesGallery!.length))}
                className="p-3 bg-white/10 hover:bg-white/20 hover:text-brand-red rounded-full text-white transition-all z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Footer details */}
            <div className="text-center text-white space-y-1">
              <p className="font-serif italic text-sm text-gray-300">
                {activeArt.title[currentLanguage]}
              </p>
              <p className="text-[10px] text-gray-500 uppercase font-black">
                Photography by {activeArt.author.name} • Keyboard Nav Enabled (Esc, ←, →)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
