import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, Volume2, VolumeX, Heart, MessageSquare, 
  Share2, ChevronUp, ChevronDown, Check, X, Send, 
  Sparkles, Radio, Users, Bookmark, ExternalLink, Flame, Star
} from 'lucide-react';
import { Language } from '../types';
import { getReelsFromFirestore } from '../utils/firebaseSync';

interface ShortVideo {
  id: string;
  title: {
    english: string;
    marathi: string;
    hindi: string;
  };
  description: {
    english: string;
    marathi: string;
    hindi: string;
  };
  videoUrl: string;
  views: string;
  likes: number;
  commentsCount: number;
  reporter: {
    name: string;
    avatar: string;
    role: string;
  };
  city: {
    english: string;
    marathi: string;
    hindi: string;
  };
  tag: {
    english: string;
    marathi: string;
    hindi: string;
  };
}

const SHORTS_DATA: ShortVideo[] = [
  {
    id: 'short-1',
    title: {
      english: 'Pune Metro Line 3 Test Run Successful!',
      marathi: 'पुणे मेट्रो मार्ग ३ ची चाचणी यशस्वी!',
      hindi: 'पुणे मेट्रो लाइन 3 का परीक्षण सफल!'
    },
    description: {
      english: 'Direct from Hinjewadi Phase 3. The high-speed trial run of the new premium coaches completed successfully today.',
      marathi: 'हिंजवडी फेज ३ मधून थेट. नवीन प्रीमियम डब्यांची वेगवान चाचणी आज यशस्वीरित्या पूर्ण झाली.',
      hindi: 'हिंजवड़ी फेज 3 से सीधे। नए प्रीमियम कोचों का हाई-स्पीड ट्रायल रन आज सफलतापूर्वक पूरा हुआ।'
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-train-moving-on-railway-tracks-42790-large.mp4',
    views: '124K',
    likes: 8432,
    commentsCount: 312,
    reporter: {
      name: 'Anjali Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
      role: 'Pune Bureau Chief'
    },
    city: {
      english: 'Pune',
      marathi: 'पुणे',
      hindi: 'पुणे'
    },
    tag: {
      english: 'Development',
      marathi: 'विकास',
      hindi: 'विकास'
    }
  },
  {
    id: 'short-2',
    title: {
      english: 'BSE Sensex Crosses Historic 80,000 Mark!',
      marathi: 'BSE सेन्सेक्सने ओलांडला ऐतिहासिक ८०,००० चा टप्पा!',
      hindi: 'BSE सेंसेक्स ने पार किया ऐतिहासिक 80,000 का आंकड़ा!'
    },
    description: {
      english: 'Market cheer at Dalal Street. Investors wealth surges by ₹4 Lakh Crore in a single trading session.',
      marathi: 'दलाल स्ट्रीटवर आनंदोत्सव. एकाच सत्रात गुंतवणूकदारांची संपत्ती ४ लाख कोटी रुपयांनी वाढली.',
      hindi: 'दलाल स्ट्रीट पर उत्सव। एक ही ट्रेडिंग सत्र में निवेशकों की संपत्ति ₹4 लाख करोड़ बढ़ी।'
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-spinning-gold-coins-on-dark-background-48530-large.mp4',
    views: '240K',
    likes: 12450,
    commentsCount: 567,
    reporter: {
      name: 'Rajesh Sharma',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80',
      role: 'Finance Editor'
    },
    city: {
      english: 'Mumbai',
      marathi: 'मुंबई',
      hindi: 'मुंबई'
    },
    tag: {
      english: 'Markets',
      marathi: 'बाजार',
      hindi: 'बाजार'
    }
  },
  {
    id: 'short-3',
    title: {
      english: 'Western Ghats Waterfalls in Full Glory!',
      marathi: 'पश्चिम घाटातील धबधबे ओसंडून वाहत आहेत!',
      hindi: 'पश्चिमी घाट के झरने अपने पूरे शबाब पर!'
    },
    description: {
      english: 'Beautiful aerial visuals of Tamhini Ghat. Tourists flock to enjoy the misty morning weather.',
      marathi: 'ताम्हिणी घाटाची विहंगम दृश्ये. धुक्याची चादर आणि निसर्गाचा आनंद घेण्यासाठी पर्यटकांची गर्दी.',
      hindi: 'ताम्हिणी घाट के सुंदर दृश्य। धुंधले मौसम और प्राकृतिक सुंदरता का आनंद लेने के लिए पर्यटकों की भीड़।'
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    views: '412K',
    likes: 19400,
    commentsCount: 890,
    reporter: {
      name: 'Vikram Salunkhe',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
      role: 'Travel Bureau'
    },
    city: {
      english: 'Lonavala',
      marathi: 'लोणावळा',
      hindi: 'लोनावला'
    },
    tag: {
      english: 'Monsoon Tourism',
      marathi: 'पर्यटन',
      hindi: 'पर्यटन'
    }
  },
  {
    id: 'short-4',
    title: {
      english: 'Ganesh Festival Preparations Begin in Lalbaug',
      marathi: 'लालबागमध्ये गणेशोत्सवाच्या पूर्वतयारीला वेग',
      hindi: 'लालबाग में गणेशोत्सव की तैयारियां जोरों पर'
    },
    description: {
      english: 'Sculptors put finishing touches to premium Ganpati idols. Massive safety arrangements initiated.',
      marathi: 'मूर्तिकारांकडून गणेशमूर्तींना अंतिम रूप देण्याचे काम सुरू. कडेकोट सुरक्षा व्यवस्था सज्ज.',
      hindi: 'मूर्तिकारों द्वारा गणेश प्रतिमाओं को अंतिम रूप दिया जा रहा है। कड़े सुरक्षा इंतजाम शुरू।'
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-in-a-coffee-shop-40156-large.mp4',
    views: '325K',
    likes: 15120,
    commentsCount: 652,
    reporter: {
      name: 'Prasad Sawant',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80',
      role: 'Cultural Correspondent'
    },
    city: {
      english: 'Mumbai',
      marathi: 'मुंबई',
      hindi: 'मुंबई'
    },
    tag: {
      english: 'Festival',
      marathi: 'उत्सव',
      hindi: 'उत्सव'
    }
  }
];

interface ShortsSectionProps {
  currentLanguage: Language;
}

export default function ShortsSection({ currentLanguage }: ShortsSectionProps) {
  const [reels, setReels] = useState<ShortVideo[]>([]);
  const [selectedShort, setSelectedShort] = useState<ShortVideo | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  // Load custom reels from Firebase & merge with mock
  const fetchAndSyncReels = async () => {
    try {
      const dbReels = await getReelsFromFirestore();
      if (dbReels && dbReels.length > 0) {
        const mappedDbReels: ShortVideo[] = dbReels.map(r => ({
          id: r.id || `reel-${Date.now()}`,
          title: r.title,
          description: r.description,
          videoUrl: r.videoUrl,
          views: r.views || '5.4K',
          likes: r.likes || 140,
          commentsCount: r.commentsCount || 8,
          reporter: r.reporter || { name: 'Janshakti Reporter', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80', role: 'Correspondent' },
          city: r.city,
          tag: r.tag
        }));
        const dbIds = new Set(mappedDbReels.map(r => r.id));
        const filteredMock = SHORTS_DATA.filter(m => !dbIds.has(m.id));
        const merged = [...mappedDbReels, ...filteredMock];
        setReels(merged);
      } else {
        setReels(SHORTS_DATA);
      }
    } catch (e) {
      console.warn("Could not fetch reels from Firestore:", e);
      setReels(SHORTS_DATA);
    }
  };

  useEffect(() => {
    fetchAndSyncReels();
  }, []);

  // Likes & Interactions Local persistence
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likeCountMap, setLikeCountMap] = useState<Record<string, number>>({});
  
  // Interactive Reel Scoring/Rating state
  const [scoresMap, setScoresMap] = useState<Record<string, { average: number; count: number }>>(() => {
    const saved = localStorage.getItem('janshakti_reels_scores');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      'short-1': { average: 4.8, count: 124 },
      'short-2': { average: 4.9, count: 240 },
      'short-3': { average: 4.7, count: 412 },
      'short-4': { average: 4.6, count: 325 }
    };
  });

  const [userRatingMap, setUserRatingMap] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('janshakti_reels_user_ratings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {};
  });

  const [ratingSuccessMsg, setRatingSuccessMsg] = useState(false);

  // Comments Section local state
  const [showComments, setShowComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentsMap, setCommentsMap] = useState<Record<string, Array<{ id: string; author: string; text: string; date: string }>>>({});

  // Share Dialog state
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize likes/comments from template and state
  useEffect(() => {
    if (reels.length === 0) return;
    
    const initialLikes: Record<string, number> = {};
    reels.forEach(s => {
      initialLikes[s.id] = s.likes;
    });
    setLikeCountMap(prev => ({ ...initialLikes, ...prev }));

    const initialComments: Record<string, any[]> = {};
    reels.forEach(s => {
      initialComments[s.id] = [
        {
          id: 'c1',
          author: currentLanguage === 'marathi' ? 'अमित पाटील' : currentLanguage === 'hindi' ? 'अमित वर्मा' : 'Amit Patil',
          text: currentLanguage === 'marathi' ? 'अप्रतिम माहिती! खूप छान पत्रकारिता.' : currentLanguage === 'hindi' ? 'शानदार खबर! बहुत बढ़िया पत्रकारिता।' : 'Excellent reporting and great video updates!',
          date: '2m ago'
        },
        {
          id: 'c2',
          author: currentLanguage === 'marathi' ? 'प्रिया कुलकर्णी' : currentLanguage === 'hindi' ? 'प्रिया शर्मा' : 'Priya Sharma',
          text: currentLanguage === 'marathi' ? 'खूप गर्दी असते तिथे, प्रशासनाने काळजी घेतली पाहिजे.' : currentLanguage === 'hindi' ? 'वहां बहुत भीड़ होती है, प्रशासन को ध्यान देना चाहिए।' : 'Good to see progress happening so fast.',
          date: '5m ago'
        }
      ];
    });
    setCommentsMap(prev => ({ ...initialComments, ...prev }));
  }, [reels, currentLanguage]);

  // Video playback management when modal selected short changes
  useEffect(() => {
    if (selectedShort && videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Auto-play blocked by browser policy", err);
          setIsPlaying(false);
        });
      }
    }
  }, [selectedShort, activeIdx]);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const alreadyLiked = likedMap[id];
    setLikedMap(prev => ({ ...prev, [id]: !alreadyLiked }));
    setLikeCountMap(prev => ({
      ...prev,
      [id]: alreadyLiked ? prev[id] - 1 : prev[id] + 1
    }));
  };

  const handlePostComment = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      author: 'You (Reader)',
      text: newCommentText.trim(),
      date: 'Just now'
    };

    setCommentsMap(prev => ({
      ...prev,
      [id]: [newComment, ...(prev[id] || [])]
    }));
    setNewCommentText('');
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShare(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNextReel = () => {
    if (activeIdx < reels.length - 1) {
      setActiveIdx(prev => prev + 1);
      setSelectedShort(reels[activeIdx + 1]);
    }
  };

  const handlePrevReel = () => {
    if (activeIdx > 0) {
      setActiveIdx(prev => prev - 1);
      setSelectedShort(reels[activeIdx - 1]);
    }
  };

  const handleRateReel = (id: string, rating: number) => {
    const currentScore = scoresMap[id] || { average: 4.5, count: 50 };
    const hasRatedBefore = userRatingMap[id] !== undefined;
    
    let newCount = currentScore.count;
    let newSum = currentScore.average * currentScore.count;

    if (hasRatedBefore) {
      const previousRating = userRatingMap[id];
      newSum = newSum - previousRating + rating;
    } else {
      newCount += 1;
      newSum += rating;
    }

    const newAverage = parseFloat((newSum / newCount).toFixed(1));
    const updatedScores = {
      ...scoresMap,
      [id]: { average: newAverage, count: newCount }
    };
    const updatedUserRatings = {
      ...userRatingMap,
      [id]: rating
    };

    setScoresMap(updatedScores);
    setUserRatingMap(updatedUserRatings);
    localStorage.setItem('janshakti_reels_scores', JSON.stringify(updatedScores));
    localStorage.setItem('janshakti_reels_user_ratings', JSON.stringify(updatedUserRatings));
    
    setRatingSuccessMsg(true);
    setTimeout(() => setRatingSuccessMsg(false), 2500);
  };

  // Keyboard, Mouse-wheel and Touch gesture scroll controllers for Instagram-like vertical reels scrolling
  useEffect(() => {
    if (!selectedShort) return;

    // 1. Keyboard event listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNextReel();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevReel();
      }
    };

    // 2. Mouse Wheel event listener (with throttle)
    let lastScrollTime = 0;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime < 1000) return;

      if (e.deltaY > 30) {
        handleNextReel();
        lastScrollTime = now;
      } else if (e.deltaY < -30) {
        handlePrevReel();
        lastScrollTime = now;
      }
    };

    // 3. Touch Gesture Swiping
    let touchStartY = 0;
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY - touchEndY;
      const deltaX = touchStartX - touchEndX;

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 60) {
        if (deltaY > 0) {
          handleNextReel();
        } else {
          handlePrevReel();
        }
      }
      touchStartY = 0;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [selectedShort, activeIdx]);

  // UI Localized labels
  const uiLabels = {
    english: {
      sectionTitle: 'Janshakti Reels',
      sectionSubtitle: 'Quick video bulletins from Maharashtra',
      views: 'views',
      follow: 'Follow',
      following: 'Following',
      comments: 'Comments',
      post: 'Post',
      shareTitle: 'Share this Reel',
      copy: 'Copy Link',
      copied: 'Copied!',
      back: 'Close Player',
      scoreLabel: 'Reel Score',
      userScorePrompt: 'Rate this Reel:',
      rateSuccess: 'Reel scored successfully!'
    },
    marathi: {
      sectionTitle: 'जनशक्ती रील्स',
      sectionSubtitle: 'महाराष्ट्रातील वेगवान व्हिडिओ बुलेटिन',
      views: 'views',
      follow: 'फॉलो करा',
      following: 'फॉलो केले',
      comments: 'प्रतिक्रिया',
      post: 'पोस्ट करा',
      shareTitle: 'रील शेअर करा',
      copy: 'लिंक कॉपी करा',
      copied: 'कॉपी केली!',
      back: 'प्लेअर बंद करा',
      scoreLabel: 'रील स्कोअर',
      userScorePrompt: 'या रीलला गुण द्या:',
      rateSuccess: 'यशस्वीरित्या गुण दिले!'
    },
    hindi: {
      sectionTitle: 'जनशक्ति रील्स',
      sectionSubtitle: 'महाराष्ट्र के त्वरित वीडियो बुलेटिन',
      views: 'views',
      follow: 'फॉलो करें',
      following: 'फॉलो किया',
      comments: 'टिप्पणियां',
      post: 'पोस्ट करें',
      shareTitle: 'रील साझा करें',
      copy: 'लिंक कॉपी करें',
      copied: 'कॉपी की गई!',
      back: 'प्लेयर बंद करें',
      scoreLabel: 'रील स्कोर',
      userScorePrompt: 'इस रील को स्कोर दें:',
      rateSuccess: 'सफलतापूर्वक स्कोर दिया गया!'
    }
  }[currentLanguage];

  return (
    <div className="space-y-6 select-none">
      {/* Title block resembling LokSatta Reels style */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-4 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-brand-red text-white rounded-2xl shadow-lg shadow-brand-red/10">
            <Radio className="w-5.5 h-5.5 animate-pulse" />
          </div>
          <div>
            <h2 className="font-serif font-black text-xl md:text-2xl tracking-tight text-brand-charcoal flex items-center gap-2">
              {uiLabels.sectionTitle}
              <span className="text-[10px] font-sans font-black bg-brand-red text-white px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-3 h-3 fill-current" />
                Live
              </span>
            </h2>
            <p className="text-xs text-brand-muted-text font-bold uppercase tracking-wider mt-0.5">
              {uiLabels.sectionSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel List layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {reels.map((short, idx) => {
          const isLiked = likedMap[short.id];
          const likesCount = likeCountMap[short.id] || short.likes;

          return (
            <motion.div
              key={short.id}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer bg-brand-charcoal border border-slate-100 shadow-md group"
              onClick={() => {
                setSelectedShort(short);
                setActiveIdx(idx);
              }}
            >
              {/* Simulated static preview/background running auto-loop of the short video silently */}
              <video 
                src={short.videoUrl} 
                className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-95 transition-all duration-500"
                muted
                loop
                playsInline
                autoPlay
              />

              {/* Top Accent Badges */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                <span className="text-[9px] font-extrabold uppercase tracking-wider bg-brand-red text-white px-2.5 py-0.5 rounded-full shadow-md self-start flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 fill-current" />
                  {short.tag[currentLanguage]}
                </span>
                <span className="text-[8px] font-bold uppercase bg-brand-charcoal/80 text-white px-2 py-0.5 rounded-full shadow backdrop-blur-sm self-start">
                  {short.city[currentLanguage]}
                </span>
              </div>

              {/* Views indicator overlay bottom-right */}
              <div className="absolute top-3 right-3 z-10 text-[9px] bg-brand-charcoal/70 text-slate-100 px-2 py-0.5 rounded-full font-bold backdrop-blur-sm shadow flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{short.views}</span>
              </div>

              {/* Bottom information text overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent p-4 flex flex-col justify-end text-white space-y-1.5">
                {/* Reporter attribution in card */}
                <div className="flex items-center space-x-1.5 opacity-90">
                  <img src={short.reporter.avatar} alt="" className="w-5 h-5 rounded-full object-cover border border-white/20" referrerPolicy="no-referrer" />
                  <span className="text-[10px] font-bold tracking-tight text-white/95">{short.reporter.name}</span>
                </div>

                <h3 className="font-serif font-bold text-xs sm:text-sm leading-snug line-clamp-2 text-white group-hover:text-brand-red transition-colors">
                  {short.title[currentLanguage]}
                </h3>

                {/* Micro metrics bar inside card preview */}
                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-300 font-bold border-t border-white/10 mt-1">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center gap-1">
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'text-brand-red fill-current' : ''}`} />
                      {likesCount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {short.commentsCount}
                    </span>
                  </div>
                  <span className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3 h-3 fill-current" />
                    {(scoresMap[short.id]?.average || 4.7).toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Play Accent hover button */}
              <div className="absolute inset-0 flex items-center justify-center bg-brand-charcoal/15 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="p-3.5 bg-brand-red text-white rounded-full shadow-lg scale-90 group-hover:scale-100 transition-all duration-300">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full-Screen Immersive Reels Player Overlay */}
      <AnimatePresence>
        {selectedShort && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-0 md:p-4 select-none"
          >
            {/* Backdrop cancel */}
            <div className="absolute inset-0" onClick={() => setSelectedShort(null)} />

            {/* Close Button Top Left for desktop */}
            <button
              onClick={() => setSelectedShort(null)}
              className="absolute top-4 left-4 z-50 p-2.5 bg-white/15 hover:bg-white/25 rounded-full text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            >
              <X className="w-5 h-5" />
              <span>{uiLabels.back}</span>
            </button>

            {/* Immersive Center Player Card */}
            <div className="relative w-full md:w-[420px] h-full md:h-[88vh] bg-brand-charcoal rounded-none md:rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 border border-white/5">
              {/* Vertical Video Element */}
              <div 
                className="relative flex-1 bg-black flex items-center justify-center cursor-pointer"
                onClick={handleTogglePlay}
              >
                <video
                  ref={videoRef}
                  src={selectedShort.videoUrl}
                  loop
                  playsInline
                  autoPlay
                  muted={isMuted}
                  className="w-full h-full object-cover"
                />

                {/* Play/Pause state screen flash */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute p-4.5 bg-black/60 rounded-full text-white"
                    >
                      <Pause className="w-8 h-8 fill-current" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Rating Success Sparkle Notification */}
                <AnimatePresence>
                  {ratingSuccessMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: -20, x: "-50%" }}
                      className="absolute top-16 left-1/2 bg-amber-500 text-brand-charcoal text-xs font-black px-4 py-2 rounded-full shadow-lg z-30 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 fill-current text-white" />
                      <span>{uiLabels.rateSuccess}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Audio Mute Trigger Top-Right */}
                <button
                  onClick={handleToggleMute}
                  className="absolute top-4 right-4 z-20 p-2.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all backdrop-blur-sm"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                {/* Scrolling navigation pointers on right side */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handlePrevReel(); }}
                    disabled={activeIdx === 0}
                    className={`p-2 bg-black/40 text-white rounded-full backdrop-blur-sm ${
                      activeIdx === 0 ? 'opacity-35 cursor-not-allowed' : 'hover:bg-brand-red'
                    }`}
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleNextReel(); }}
                    disabled={activeIdx === reels.length - 1}
                    className={`p-2 bg-black/40 text-white rounded-full backdrop-blur-sm ${
                      activeIdx === reels.length - 1 ? 'opacity-35 cursor-not-allowed' : 'hover:bg-brand-red'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>

                {/* Right Floating Interactions Panel */}
                <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 z-20">
                  {/* Reporter Avatar */}
                  <div className="flex flex-col items-center">
                    <img 
                      src={selectedShort.reporter.avatar} 
                      alt="" 
                      className="w-11 h-11 rounded-full object-cover border-2 border-brand-red shadow-lg" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="w-5 h-5 bg-brand-red text-white text-[11px] font-black rounded-full flex items-center justify-center -mt-2 shadow-md">
                      +
                    </div>
                  </div>

                  {/* Like Reel */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={(e) => handleLike(e, selectedShort.id)}
                      className={`p-3 bg-black/40 hover:bg-black/60 rounded-full shadow-lg backdrop-blur-sm text-white transition-all ${
                        likedMap[selectedShort.id] ? 'text-brand-red scale-110' : ''
                      }`}
                    >
                      <Heart className={`w-5.5 h-5.5 ${likedMap[selectedShort.id] ? 'fill-current' : ''}`} />
                    </button>
                    <span className="text-[11px] font-bold text-white mt-1.5 shadow-sm">
                      {(likeCountMap[selectedShort.id] || selectedShort.likes).toLocaleString()}
                    </span>
                  </div>

                  {/* Comment trigger */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
                      className="p-3 bg-black/40 hover:bg-black/60 text-white rounded-full shadow-lg backdrop-blur-sm transition-all"
                    >
                      <MessageSquare className="w-5.5 h-5.5" />
                    </button>
                    <span className="text-[11px] font-bold text-white mt-1.5">
                      {selectedShort.commentsCount}
                    </span>
                  </div>

                  {/* Reel Scoring System */}
                  <div className="flex flex-col items-center">
                    <div className="relative group/rate flex flex-col items-center">
                      <button
                        className={`p-3 bg-black/40 hover:bg-black/60 rounded-full shadow-lg backdrop-blur-sm text-white transition-all ${
                          userRatingMap[selectedShort.id] ? 'text-amber-400' : ''
                        }`}
                      >
                        <Star className={`w-5.5 h-5.5 ${userRatingMap[selectedShort.id] ? 'fill-current' : ''}`} />
                      </button>
                      <span className="text-[10px] font-black text-amber-400 mt-1 shadow-sm">
                        {(scoresMap[selectedShort.id]?.average || 4.7).toFixed(1)}★
                      </span>
                      {/* Hover/Tap Rating Panel */}
                      <div className="absolute right-14 bottom-0 bg-brand-charcoal border border-white/10 rounded-2xl p-3 shadow-2xl z-30 hidden group-hover/rate:flex hover:flex flex-col gap-1.5 w-44 backdrop-blur-lg pointer-events-auto">
                        <p className="text-[10px] font-bold text-slate-300 text-center">{uiLabels.userScorePrompt}</p>
                        <div className="flex items-center justify-center gap-1">
                          {[1, 2, 3, 4, 5].map((stars) => {
                            const isStarred = (userRatingMap[selectedShort.id] || 0) >= stars;
                            return (
                              <button
                                key={stars}
                                onClick={(e) => { e.stopPropagation(); handleRateReel(selectedShort.id, stars); }}
                                className="p-0.5 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                              >
                                <Star className={`w-5 h-5 ${isStarred ? 'fill-current' : ''}`} />
                              </button>
                            );
                          })}
                        </div>
                        <p className="text-[8px] text-slate-400 text-center">
                          {scoresMap[selectedShort.id]?.count || 100} ratings total
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Share trigger */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleShare}
                      className="p-3 bg-black/40 hover:bg-black/60 text-white rounded-full shadow-lg backdrop-blur-sm transition-all"
                    >
                      <Share2 className="w-5.5 h-5.5" />
                    </button>
                    <span className="text-[11px] font-bold text-white mt-1.5">
                      Share
                    </span>
                  </div>
                </div>

                {/* Bottom Overlaid Information panel */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-5 text-white flex flex-col justify-end space-y-2 pointer-events-none z-10">
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <span className="bg-brand-red text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                      {selectedShort.tag[currentLanguage]}
                    </span>
                    <span className="bg-brand-charcoal text-slate-200 text-[8px] font-bold uppercase px-2 py-0.5 rounded shadow border border-white/10">
                      {selectedShort.city[currentLanguage]}
                    </span>
                    <span className="text-[10px] text-slate-300 font-bold">{selectedShort.views} {uiLabels.views}</span>
                  </div>

                  <h3 className="font-serif font-black text-sm md:text-base leading-snug text-white pointer-events-auto">
                    {selectedShort.title[currentLanguage]}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3 pb-2 border-b border-white/10 pointer-events-auto">
                    {selectedShort.description[currentLanguage]}
                  </p>

                  <div className="flex items-center justify-between pt-1 pointer-events-auto">
                    <div className="flex items-center space-x-2">
                      <div>
                        <h5 className="font-bold text-xs text-white/95">{selectedShort.reporter.name}</h5>
                        <p className="text-[9px] text-slate-400">{selectedShort.reporter.role}</p>
                      </div>
                    </div>
                    <button 
                      className="px-3.5 py-1.5 bg-brand-red hover:bg-brand-red/95 text-white font-extrabold text-[10px] rounded-xl shadow-md uppercase tracking-wider"
                    >
                      {uiLabels.follow}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Slide-up Panel for Comments */}
            <AnimatePresence>
              {showComments && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 220 }}
                  className="absolute bottom-0 inset-x-0 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 w-full md:w-[420px] h-[55vh] bg-white rounded-t-3xl shadow-2xl z-40 flex flex-col overflow-hidden text-slate-800"
                >
                  <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-brand-red" />
                      {uiLabels.comments} ({commentsMap[selectedShort.id]?.length || 0})
                    </h4>
                    <button 
                      onClick={() => setShowComments(false)}
                      className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Comments lists */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {(commentsMap[selectedShort.id] || []).map((comm) => (
                      <div key={comm.id} className="flex gap-3 text-xs">
                        <div className="w-8 h-8 rounded-full bg-brand-red/10 text-brand-red font-black flex items-center justify-center shrink-0">
                          {comm.author.charAt(0).toUpperCase()}
                        </div>
                        <div className="space-y-1 flex-1 min-w-0 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-800">{comm.author}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{comm.date}</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">{comm.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input form */}
                  <form 
                    onSubmit={(e) => handlePostComment(e, selectedShort.id)}
                    className="p-4 border-t border-slate-100 bg-white flex gap-2"
                  >
                    <input
                      type="text"
                      placeholder={uiLabels.comments}
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-red text-xs transition-all"
                    />
                    <button
                      type="submit"
                      className="p-2 bg-brand-red text-white hover:bg-brand-red/95 rounded-xl shadow transition-all"
                    >
                      <Send className="w-4.5 h-4.5" />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Share modal */}
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
                      <h4 className="font-serif font-black text-base text-brand-charcoal">{uiLabels.shareTitle}</h4>
                      <button onClick={() => setShowShare(false)} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-slate-500 mb-5 font-sans leading-relaxed">
                      Share this rapid video bulletin on social media networks, messaging platforms, or copy the source url directly:
                    </p>

                    {/* Quick share action links grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {/* WhatsApp Share */}
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(selectedShort.title[currentLanguage] + " - Watch on Janshakti Reels: " + window.location.href)}`}
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
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedShort.title[currentLanguage] + " #JanshaktiReels")}&url=${encodeURIComponent(window.location.href)}`}
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
                        className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 rounded-2xl flex items-center justify-between transition-all"
                      >
                        <span className="flex items-center gap-2.5">
                          <Bookmark className="w-4 h-4 text-slate-500" />
                          {uiLabels.copy}
                        </span>
                        {copied ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
                            <Check className="w-3.5 h-3.5" />
                            {uiLabels.copied}
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
                        <span>Instagram Stories & Reels Helper</span>
                      </h5>
                      <p className="text-[11px] text-slate-400 mb-4 font-sans leading-relaxed">
                        Instagram doesn't permit direct link sharing on the web. Take a screenshot of the card below or hold on it to save, then upload to Instagram with our pre-loaded tags!
                      </p>

                      {/* Immersive Mobile Instagram mockup card */}
                      <div className="relative aspect-[9/16] bg-brand-charcoal text-white rounded-2xl p-4 overflow-hidden border border-slate-800 shadow-inner flex flex-col justify-between max-w-[210px] mx-auto scale-95 origin-top">
                        {/* Top Accent bar */}
                        <div className="flex justify-between items-center text-[8px] opacity-85">
                          <span className="font-serif font-black tracking-widest text-brand-red uppercase">Janshakti</span>
                          <span className="bg-brand-red/90 text-[7px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold flex items-center gap-0.5">
                            <Flame className="w-2 h-2 fill-current" />
                            Reels
                          </span>
                        </div>

                        {/* Video thumbnail simulation background */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/25 -z-10">
                          <video 
                            src={selectedShort.videoUrl} 
                            className="w-full h-full object-cover opacity-40 brightness-75"
                            muted
                            loop
                            playsInline
                            autoPlay
                          />
                        </div>

                        {/* Middle floating graphics */}
                        <div className="my-auto flex flex-col items-center justify-center gap-1 text-center py-2 bg-black/30 rounded-xl border border-white/5 backdrop-blur-xs">
                          <div className="p-2 bg-brand-red text-white rounded-full">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                          <span className="text-[7px] tracking-wider uppercase font-extrabold text-slate-300">Tap to Watch full Reel</span>
                        </div>

                        {/* Bottom text block */}
                        <div className="space-y-1 bg-gradient-to-t from-black to-transparent pt-4">
                          <span className="text-[7px] font-extrabold uppercase bg-brand-red text-white px-1.5 py-0.5 rounded">
                            {selectedShort.tag[currentLanguage]}
                          </span>
                          <h6 className="font-serif font-bold text-[9px] leading-tight line-clamp-2">
                            {selectedShort.title[currentLanguage]}
                          </h6>
                          <div className="flex items-center justify-between text-[7px] pt-1 text-slate-400 border-t border-white/5">
                            <span>@{selectedShort.reporter.name}</span>
                            <span className="text-amber-400">{(scoresMap[selectedShort.id]?.average || 4.7).toFixed(1)}★</span>
                          </div>
                        </div>
                      </div>

                      {/* Auto Copy instagram tags button */}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`#JanshaktiReels #MaharashtraNews #${selectedShort.city[currentLanguage]} #${selectedShort.tag[currentLanguage]}`);
                          alert("Instagram tags copied to clipboard! Paste them when publishing your story.");
                        }}
                        className="w-full mt-3 py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all text-[11px]"
                      >
                        <Check className="w-4 h-4 text-indigo-600" />
                        <span>Copy Instagram Tags & Hashtags</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
