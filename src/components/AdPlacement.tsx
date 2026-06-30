import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Info, Sparkles } from 'lucide-react';
import { Language, Ad, AdPlacementType } from '../types';

interface AdPlacementProps {
  placement: AdPlacementType;
  currentLanguage: Language;
  currentCategory?: string;
  className?: string;
}

export const INITIAL_ADS: Ad[] = [];

export function getLocalAds(): Ad[] {
  const saved = localStorage.getItem('janshakti_ads');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Filter out original dummy ads if they exist in localStorage to keep user view pristine
      const filtered = parsed.filter((ad: any) => !['ad-1', 'ad-2', 'ad-3', 'ad-4', 'ad-5'].includes(ad.id));
      if (filtered.length !== parsed.length) {
        localStorage.setItem('janshakti_ads', JSON.stringify(filtered));
        return filtered;
      }
      return parsed;
    } catch (e) {
      console.error("Failed to parse ads from localStorage", e);
    }
  }
  // Initialize and save empty list
  localStorage.setItem('janshakti_ads', JSON.stringify(INITIAL_ADS));
  return INITIAL_ADS;
}

export function saveLocalAds(ads: Ad[]) {
  localStorage.setItem('janshakti_ads', JSON.stringify(ads));
}

export default function AdPlacement({
  placement,
  currentLanguage,
  currentCategory = 'all',
  className = ''
}: AdPlacementProps) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [activeAd, setActiveAd] = useState<Ad | null>(null);

  useEffect(() => {
    // Reload ads from localStorage on mount or change
    const loadedAds = getLocalAds();
    setAds(loadedAds);

    // Filter ads matching current placement, language, category
    const matched = loadedAds.filter(ad => {
      if (!ad.isActive) return false;

      // Type matching
      if (placement === 'header' || placement === 'in-feed') {
        if (ad.type !== 'banner') return false;
      } else if (placement === 'sidebar') {
        if (ad.type !== 'square') return false;
      } else if (placement === 'article-detail') {
        // Can display both banners or squares depending on layout, default to matching type
      }

      // Language targeting
      if (ad.language !== 'all' && ad.language !== currentLanguage) return false;

      // Category targeting
      if (ad.category !== 'all' && currentCategory !== 'all' && ad.category !== currentCategory) return false;

      return true;
    });

    if (matched.length > 0) {
      // Pick a random matching ad to rotate them beautifully
      const selected = matched[Math.floor(Math.random() * matched.length)];
      setActiveAd(selected);

      // Track Impression/View
      const updatedAds = loadedAds.map(a => {
        if (a.id === selected.id) {
          return { ...a, views: a.views + 1 };
        }
        return a;
      });
      saveLocalAds(updatedAds);
    } else {
      setActiveAd(null);
    }
  }, [placement, currentLanguage, currentCategory]);

  const handleAdClick = () => {
    if (!activeAd) return;
    const loadedAds = getLocalAds();
    const updatedAds = loadedAds.map(a => {
      if (a.id === activeAd.id) {
        return { ...a, clicks: a.clicks + 1 };
      }
      return a;
    });
    saveLocalAds(updatedAds);

    // If targetUrl, redirect
    if (activeAd.targetUrl) {
      if (activeAd.targetUrl.startsWith('#')) {
        // internal link
        const element = document.getElementById(activeAd.targetUrl.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.open(activeAd.targetUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  if (!activeAd) {
    return null;
  }

  const isBanner = activeAd.type === 'banner';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md ${className}`}
    >
      {/* Label Overlay for Ad choices / AdSense transparency */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 bg-brand-charcoal/70 text-[9px] font-bold tracking-wider text-white px-2 py-0.5 rounded-full select-none backdrop-blur-sm">
        <span>{activeAd.adType === 'adsense' ? 'AdByGoogle' : 'AD'}</span>
        <Info className="w-3 h-3 text-slate-300 cursor-help" />
      </div>

      {activeAd.adType === 'adsense' && activeAd.customHtml ? (
        // Render Google AdSense dynamic scripts/layouts inside an iframe wrapper or safe innerHTML
        <div 
          className="w-full h-full overflow-hidden"
          dangerouslySetInnerHTML={{ __html: activeAd.customHtml }}
        />
      ) : (
        // Direct displaying ad with full impression & click-through tracking
        <div 
          onClick={handleAdClick}
          className="cursor-pointer relative w-full h-full block overflow-hidden"
        >
          {activeAd.imageUrl ? (
            <img 
              src={activeAd.imageUrl} 
              alt={activeAd.title}
              className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] ${
                isBanner ? 'h-[100px] md:h-[130px]' : 'h-[250px]'
              }`}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex flex-col justify-center items-center p-6 bg-slate-50 text-center min-h-[120px]">
              <h5 className="font-bold text-slate-700 text-sm">{activeAd.title}</h5>
              <p className="text-xs text-slate-500 mt-1">Visit sponsor page to learn more.</p>
              <ExternalLink className="w-4 h-4 text-brand-red mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
          {/* Accent hover cover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
        </div>
      )}
    </motion.div>
  );
}
