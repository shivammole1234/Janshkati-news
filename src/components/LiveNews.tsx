import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, RefreshCw, Pin, Clock, CalendarRange, ArrowRight, Check } from 'lucide-react';
import { Language, Article, LiveUpdate } from '../types';
import { TRANSLATIONS } from '../data';

interface LiveNewsProps {
  currentLanguage: Language;
  articles: Article[];
  onArticleClick: (articleId: string) => void;
}

export default function LiveNews({ currentLanguage, articles, onArticleClick }: LiveNewsProps) {
  const t = TRANSLATIONS[currentLanguage];
  const liveArticle = articles.find(a => a.isLive === true) || articles[1];

  const [updates, setUpdates] = useState<LiveUpdate[]>(liveArticle.liveUpdates || []);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [refreshing, setRefreshing] = useState(false);

  // Auto-refresh countdown simulated
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          handleRefresh();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Simulate adding a minor new update on refresh to make it look active!
      const newUpdateId = `sim-upd-${Date.now()}`;
      const newUpdate: LiveUpdate = {
        id: newUpdateId,
        time: new Date().toLocaleTimeString(currentLanguage === 'marathi' ? 'mr-IN' : 'en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        title: {
          english: "ALERT: Traffic advisory updated for marine drive",
          marathi: "महत्त्वाची सूचना: मरीन ड्राइव्ह परिसरातील वाहतुकीबाबत नवीन नियमावली जाहीर",
          hindi: "अलर्ट: मरीन ड्राइव्ह क्षेत्र के लिए नई यातायात एडवाइजरी जारी"
        },
        content: {
          english: "Police personnel have established temporary barricades around central junctions to coordinate water dispersal. Heavy vehicles are advised to take alternative routes.",
          marathi: "साचलेल्या पाण्याचा निचरा करण्यासाठी पोलिसांनी अनेक रस्त्यांवर बॅरिकेड्स लावले आहेत. जड वाहनांना पर्यायी मार्गाने प्रवास करण्याची सूचना.",
          hindi: "जल निकासी सुनिश्चित करने के लिए पुलिस ने मुख्य चौराहों पर बैरिकेड्स लगाए हैं। भारी वाहनों को वैकल्पिक मार्ग लेने की सलाह।"
        }
      };

      // Add to start if not already added
      setUpdates((prev) => {
        if (prev.some(u => u.title.english === newUpdate.title.english)) return prev;
        return [newUpdate, ...prev];
      });
      setRefreshing(false);
      setSecondsLeft(30);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border space-y-6 shadow-sm select-none">
      {/* Widget Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-border gap-4">
        <div className="flex items-center space-x-3">
          {/* Flashing RED LIVE beacon */}
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-4 w-4 rounded-full bg-red-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-red" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-serif font-black text-xl md:text-2xl text-brand-charcoal">
                Janshakti {t.live}
              </h2>
              <span className="bg-brand-red text-white text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest animate-pulse">
                UPDATES
              </span>
            </div>
            <p className="text-[10px] text-brand-muted-text font-bold uppercase tracking-wider">Monitored 24/7 By Central Editors</p>
          </div>
        </div>

        {/* Auto refresh countdown */}
        <div className="flex items-center space-x-3 text-xs">
          <span className="text-[10px] font-bold text-brand-muted-text uppercase flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-brand-red" />
            Auto-refreshing in <span className="font-mono font-black text-brand-red ml-1">{secondsLeft}s</span>
          </span>
          <button
            id="live-refresh-btn"
            onClick={handleRefresh}
            className="p-2 border border-brand-border hover:border-brand-red hover:text-brand-red rounded-xl bg-white shadow-sm transition-all"
            title="Force Refresh Live Updates"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Embedded Live Article Brief Link */}
      <div 
        onClick={() => onArticleClick(liveArticle.id)}
        className="p-4 bg-brand-light rounded-2xl border border-brand-border/60 hover:border-brand-red transition-all cursor-pointer flex items-center justify-between group"
      >
        <div className="space-y-1 pr-4">
          <span className="text-[9px] bg-red-100 text-brand-red font-black px-2 py-0.5 rounded uppercase">MAIN STREAM COVERAGE</span>
          <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal group-hover:text-brand-red transition-all leading-snug line-clamp-1">
            {liveArticle.title[currentLanguage]}
          </h4>
        </div>
        <div className="p-1.5 bg-white border border-brand-border rounded-full text-brand-charcoal group-hover:bg-brand-red group-hover:text-white transition-all shadow-sm">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Chronological Vertical Timeline Grid */}
      <div className="relative pl-6 border-l-2 border-brand-border/60 space-y-6">
        <AnimatePresence mode="popLayout">
          {updates.map((upd, idx) => {
            const isPinned = upd.isPinned;
            return (
              <motion.div
                key={upd.id}
                id={`live-update-card-${upd.id}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* Bullet point nodes */}
                <div className={`absolute -left-10 top-1.5 w-8 h-8 rounded-full border-2 bg-white flex items-center justify-center text-xs font-bold ${
                  isPinned 
                    ? 'border-brand-red text-brand-red shadow-md shadow-red-100' 
                    : 'border-brand-border text-brand-secondary-text'
                }`}>
                  {isPinned ? <Pin className="w-3.5 h-3.5 fill-current" /> : upd.time.slice(0, 2)}
                </div>

                <div className="space-y-1 bg-brand-light/40 hover:bg-brand-light/80 p-4 rounded-2xl border border-brand-border/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-brand-red uppercase font-mono tracking-widest flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {upd.time}
                    </span>
                    {isPinned && (
                      <span className="text-[8px] bg-brand-red text-white font-extrabold px-1.5 py-0.5 rounded">
                        PINNED
                      </span>
                    )}
                  </div>
                  
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal leading-snug">
                    {upd.title[currentLanguage]}
                  </h4>
                  <p className="text-brand-secondary-text text-xs leading-relaxed font-sans">
                    {upd.content[currentLanguage]}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
