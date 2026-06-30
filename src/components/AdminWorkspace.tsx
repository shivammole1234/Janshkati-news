import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Plus, Edit2, Trash2, Check, BarChart2, Radio, Globe, Layers, Eye, 
  MousePointer, Info, Code, FileText, Sparkles, Sliders, Upload, Film, 
  Image as ImageIcon, Loader2, ArrowLeft, RefreshCw, Layers3, CheckCircle, Tag, MapPin
} from 'lucide-react';
import { Language, Article, Ad, AdPlacementType } from '../types';
import { CATEGORIES } from '../data';
import { uploadFileToFirebase } from '../utils/firebase';
import { 
  addArticleToFirestore, 
  getArticlesFromFirestore, 
  deleteArticleFromFirestore,
  addReelToFirestore,
  getReelsFromFirestore,
  deleteReelFromFirestore,
  FirestoreReel
} from '../utils/firebaseSync';
import { getLocalAds, saveLocalAds } from './AdPlacement';

// Maharashtra local news cities
const MAHARASHTRA_CITIES = [
  { id: 'mumbai', label: { english: 'Mumbai', marathi: 'मुंबई', hindi: 'मुंबई' } },
  { id: 'pune', label: { english: 'Pune', marathi: 'पुणे', hindi: 'पुणे' } },
  { id: 'jalgaon', label: { english: 'Jalgaon', marathi: 'जळगाव', hindi: 'जलगांव' } },
  { id: 'dhule', label: { english: 'Dhule', marathi: 'धुळे', hindi: 'धुले' } },
  { id: 'bhusawal', label: { english: 'Bhusawal', marathi: 'भुसावळ', hindi: 'भुसावल' } },
  { id: 'nashik', label: { english: 'Nashik', marathi: 'नाशिक', hindi: 'नाशिक' } },
  { id: 'nagpur', label: { english: 'Nagpur', marathi: 'नागपूर', hindi: 'नागपूर' } },
  { id: 'akola', label: { english: 'Akola', marathi: 'अकोला', hindi: 'अकोला' } },
  { id: 'satara', label: { english: 'Satara', marathi: 'सातारा', hindi: 'सातारा' } },
  { id: 'amravati', label: { english: 'Amravati', marathi: 'अमरावती', hindi: 'अमरावती' } },
];

interface AdminWorkspaceProps {
  currentLanguage: Language;
  onClose: () => void;
  onRefreshArticles: () => void;
}

export default function AdminWorkspace({ currentLanguage, onClose, onRefreshArticles }: AdminWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<'articles' | 'reels' | 'manage' | 'campaigns'>('articles');
  
  // Universal loader
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Lists state
  const [dbArticles, setDbArticles] = useState<Article[]>([]);
  const [dbReels, setDbReels] = useState<any[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);

  // Article Form State
  const [artLangTabs, setArtLangTabs] = useState<Language>('english');
  const [artTitle, setArtTitle] = useState<Record<Language, string>>({ english: '', marathi: '', hindi: '' });
  const [artSummary, setArtSummary] = useState<Record<Language, string>>({ english: '', marathi: '', hindi: '' });
  const [artContentRaw, setArtContentRaw] = useState<Record<Language, string>>({ english: '', marathi: '', hindi: '' });
  const [artCategory, setArtCategory] = useState<string>('politics');
  const [artCity, setArtCity] = useState<string>('');
  const [artImage, setArtImage] = useState<string>('');
  const [artAuthorName, setArtAuthorName] = useState<string>('Janshakti Reporter');
  const [artAuthorAvatar, setArtAuthorAvatar] = useState<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80');
  const [artReadTime, setArtReadTime] = useState<number>(3);
  const [artTagsRaw, setArtTagsRaw] = useState<string>('Breaking, News');
  const [artIsFeatured, setArtIsFeatured] = useState<boolean>(false);
  const [artIsTrending, setArtIsTrending] = useState<boolean>(false);
  const [artIsLive, setArtIsLive] = useState<boolean>(false);

  // Article media upload state
  const [artUploadProgress, setArtUploadProgress] = useState<number>(-1);

  // Reel Form State
  const [reelLangTabs, setReelLangTabs] = useState<Language>('english');
  const [reelTitle, setReelTitle] = useState<Record<Language, string>>({ english: '', marathi: '', hindi: '' });
  const [reelDesc, setReelDesc] = useState<Record<Language, string>>({ english: '', marathi: '', hindi: '' });
  const [reelVideoUrl, setReelVideoUrl] = useState<string>('');
  const [reelReporterName, setReelReporterName] = useState<string>('Janshakti Bureau');
  const [reelCity, setReelCity] = useState<string>('mumbai');
  const [reelTag, setReelTag] = useState<string>('breaking');

  // Reel media upload state
  const [reelUploadProgress, setReelUploadProgress] = useState<number>(-1);

  // Ad Form State
  const [adTitle, setAdTitle] = useState('');
  const [adType, setAdType] = useState<'direct' | 'adsense'>('direct');
  const [adPlacement, setAdPlacement] = useState<'header' | 'sidebar' | 'in-feed' | 'footer'>('header');
  const [adImageUrl, setAdImageUrl] = useState('');
  const [adTargetUrl, setAdTargetUrl] = useState('');
  const [adCustomHtml, setAdCustomHtml] = useState('');
  const [adLangTarget, setAdLangTarget] = useState<'all' | Language>('all');
  const [adCategoryTarget, setAdCategoryTarget] = useState('all');
  const [adUploadProgress, setAdUploadProgress] = useState(-1);

  // Load lists
  const loadWorkspaceData = async () => {
    setIsLoading(true);
    try {
      const artList = await getArticlesFromFirestore();
      setDbArticles(artList);

      const reelList = await getReelsFromFirestore();
      setDbReels(reelList);

      const adList = getLocalAds();
      setAds(adList);
    } catch (e) {
      console.error("Error loading workspace data", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWorkspaceData();
  }, []);

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // Article image file upload handler
  const handleArtImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setArtUploadProgress(0);
    try {
      const url = await uploadFileToFirebase(file, 'articles', (progress) => {
        setArtUploadProgress(progress);
      });
      setArtImage(url);
      triggerSuccess("Article image uploaded successfully to Cloud Storage!");
    } catch (err) {
      console.error(err);
    } finally {
      setArtUploadProgress(-1);
    }
  };

  // Reel video file upload handler
  const handleReelVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setReelUploadProgress(0);
    try {
      const url = await uploadFileToFirebase(file, 'reels', (progress) => {
        setReelUploadProgress(progress);
      });
      setReelVideoUrl(url);
      triggerSuccess("Reel video uploaded successfully to Cloud Storage!");
    } catch (err) {
      console.error(err);
    } finally {
      setReelUploadProgress(-1);
    }
  };

  // Ad image file upload handler
  const handleAdImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAdUploadProgress(0);
    try {
      const url = await uploadFileToFirebase(file, 'ads', (progress) => {
        setAdUploadProgress(progress);
      });
      setAdImageUrl(url);
      triggerSuccess("Ad image uploaded successfully to Cloud Storage!");
    } catch (err) {
      console.error(err);
    } finally {
      setAdUploadProgress(-1);
    }
  };

  // Handle Save Article
  const handlePostArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle.english.trim() && !artTitle.marathi.trim() && !artTitle.hindi.trim()) {
      alert("Please fill in the article title in at least one language!");
      return;
    }

    setIsLoading(true);
    try {
      // Split raw content by newline to create paragraph arrays
      const contentRecords: Record<Language, string[]> = {
        english: artContentRaw.english.split('\n').filter(p => p.trim() !== ''),
        marathi: artContentRaw.marathi.split('\n').filter(p => p.trim() !== ''),
        hindi: artContentRaw.hindi.split('\n').filter(p => p.trim() !== ''),
      };

      // Ensure fallback languages are populated if empty
      const finalTitle = { ...artTitle };
      const finalSummary = { ...artSummary };
      const finalContent = { ...contentRecords };

      const languages: Language[] = ['english', 'marathi', 'hindi'];
      languages.forEach(l => {
        if (!finalTitle[l]) finalTitle[l] = finalTitle.english || finalTitle.marathi || finalTitle.hindi;
        if (!finalSummary[l]) finalSummary[l] = finalSummary.english || finalSummary.marathi || finalSummary.hindi;
        if (finalContent[l].length === 0) finalContent[l] = finalContent.english.length > 0 ? finalContent.english : finalContent.marathi.length > 0 ? finalContent.marathi : finalContent.hindi;
      });

      const tagsList = artTagsRaw.split(',').map(t => t.trim()).filter(t => t !== '');

      const newArticle: Omit<Article, 'id'> = {
        title: finalTitle,
        summary: finalSummary,
        content: finalContent,
        category: artCategory,
        city: artCategory === 'maharashtra' ? (artCity || 'mumbai') : undefined,
        image: artImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&h=630&q=80',
        author: {
          name: artAuthorName,
          avatar: artAuthorAvatar,
          role: 'Chief Editor'
        },
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        readTime: Number(artReadTime),
        views: 0,
        likes: 0,
        commentsCount: 0,
        tags: tagsList,
        isFeatured: artIsFeatured,
        isTrending: artIsTrending,
        isLive: artIsLive
      };

      await addArticleToFirestore(newArticle);
      triggerSuccess("News Article posted successfully in all languages!");
      
      // Reset Form
      setArtTitle({ english: '', marathi: '', hindi: '' });
      setArtSummary({ english: '', marathi: '', hindi: '' });
      setArtContentRaw({ english: '', marathi: '', hindi: '' });
      setArtImage('');
      setArtCity('');
      setArtIsFeatured(false);
      setArtIsTrending(false);
      setArtIsLive(false);

      // Reload
      await loadWorkspaceData();
      onRefreshArticles();
      setActiveTab('manage');
    } catch (err) {
      console.error(err);
      alert("Failed to save article");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Save Reel (Short Video)
  const handlePostReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reelTitle.english.trim() && !reelTitle.marathi.trim() && !reelTitle.hindi.trim()) {
      alert("Please fill in the reel title in at least one language!");
      return;
    }
    if (!reelVideoUrl) {
      alert("Please upload a reel video first!");
      return;
    }

    setIsLoading(true);
    try {
      const finalTitle = { ...reelTitle };
      const finalDesc = { ...reelDesc };

      const languages: Language[] = ['english', 'marathi', 'hindi'];
      languages.forEach(l => {
        if (!finalTitle[l]) finalTitle[l] = finalTitle.english || finalTitle.marathi || finalTitle.hindi;
        if (!finalDesc[l]) finalDesc[l] = finalDesc.english || finalDesc.marathi || finalDesc.hindi;
      });

      // City maps
      const activeCityObj = MAHARASHTRA_CITIES.find(c => c.id === reelCity) || MAHARASHTRA_CITIES[0];
      const cityField = {
        english: activeCityObj.label.english,
        marathi: activeCityObj.label.marathi,
        hindi: activeCityObj.label.hindi
      };

      // Tags maps
      const tagLabelField = {
        english: reelTag.toUpperCase(),
        marathi: reelTag === 'breaking' ? 'ब्रेकिंग' : reelTag === 'viral' ? 'व्हायरल' : 'ट्रेंडिंग',
        hindi: reelTag === 'breaking' ? 'ब्रेकिंग' : reelTag === 'viral' ? 'वायरल' : 'ट्रेंडिंग'
      };

      const newReel: Omit<FirestoreReel, 'id' | 'timestamp'> = {
        title: finalTitle,
        description: finalDesc,
        videoUrl: reelVideoUrl,
        views: '1.5K',
        likes: 0,
        commentsCount: 0,
        reporter: {
          name: reelReporterName,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
          role: 'Correspondent'
        },
        city: cityField,
        tag: tagLabelField
      };

      await addReelToFirestore(newReel);
      triggerSuccess("Short Reel Video posted successfully in all languages!");

      // Reset
      setReelTitle({ english: '', marathi: '', hindi: '' });
      setReelDesc({ english: '', marathi: '', hindi: '' });
      setReelVideoUrl('');

      // Reload
      await loadWorkspaceData();
      setActiveTab('manage');
    } catch (err) {
      console.error(err);
      alert("Failed to post reel");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Save Campaign Ad
  const handleSaveAdCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adTitle.trim()) return;

    const adsList = getLocalAds();
    const newAd: Ad = {
      id: `ad-${Date.now()}`,
      title: adTitle,
      adType,
      type: 'banner',
      imageUrl: adType === 'direct' ? adImageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=400&q=80' : undefined,
      targetUrl: adType === 'direct' ? adTargetUrl || '#' : undefined,
      customHtml: adType === 'adsense' ? adCustomHtml || `<div style="background:#111; color:#fff; padding:15px; border-radius:8px; text-align:center;"><h4>Simulated Google AdSense Card</h4><p style="font-size:11px;">Client ID: ca-pub-xxxxxxxxxx</p></div>` : undefined,
      isActive: true,
      views: 0,
      clicks: 0,
      language: adLangTarget,
      category: adCategoryTarget,
      startDate: new Date().toISOString().split('T')[0]
    };

    adsList.unshift(newAd);
    saveLocalAds(adsList);
    triggerSuccess("Ad campaign created successfully!");

    // Reset Form
    setAdTitle('');
    setAdImageUrl('');
    setAdTargetUrl('');
    setAdCustomHtml('');
    setAdLangTarget('all');
    setAdCategoryTarget('all');
    setAdType('direct');

    loadWorkspaceData();
  };

  // Toggle active
  const handleToggleAdActive = (id: string) => {
    const list = getLocalAds();
    const updated = list.map(a => {
      if (a.id === id) {
        return { ...a, isActive: !a.isActive };
      }
      return a;
    });
    saveLocalAds(updated);
    loadWorkspaceData();
  };

  // Delete actions
  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    setIsLoading(true);
    try {
      await deleteArticleFromFirestore(id);
      triggerSuccess("News Article deleted successfully!");
      await loadWorkspaceData();
      onRefreshArticles();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReel = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reel?")) return;
    setIsLoading(true);
    try {
      await deleteReelFromFirestore(id);
      triggerSuccess("Short Reel deleted successfully!");
      await loadWorkspaceData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAd = (id: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;
    const list = getLocalAds();
    const filtered = list.filter(a => a.id !== id);
    saveLocalAds(filtered);
    loadWorkspaceData();
    triggerSuccess("Ad campaign deleted.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* 1. Header Admin Panel Workspace */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-brand-red text-white font-black rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-brand-red/30 tracking-tight animate-pulse">
            JS
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
              JANSHAKTI AD-CENTER & WORKSPACE
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                LIVE CLOUD CORE
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Global Multi-Lingual News Engine & Cloud Asset Manager</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-850 text-slate-300 hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 border border-slate-700/60 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portal
        </button>
      </header>

      {/* 2. Success overlay banner */}
      <AnimatePresence>
        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-emerald-500 text-slate-950 px-6 py-3 font-bold text-sm text-center shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 3. Left Navigation Menu Sidebar Panel */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2 shadow-xl">
            <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase px-3 pb-1">
              Actions Workspace
            </p>
            <button
              onClick={() => setActiveTab('articles')}
              className={`w-full text-left px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all ${
                activeTab === 'articles' 
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20 font-black' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              Post News Article
            </button>
            <button
              onClick={() => setActiveTab('reels')}
              className={`w-full text-left px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all ${
                activeTab === 'reels' 
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20 font-black' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Film className="w-4 h-4" />
              Post Short Reel
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`w-full text-left px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all ${
                activeTab === 'manage' 
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20 font-black' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Layers3 className="w-4 h-4" />
              Manage Content ({dbArticles.length + dbReels.length})
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`w-full text-left px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all ${
                activeTab === 'campaigns' 
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20 font-black' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-4 h-4" />
              Ad Campaigns & Adsense
            </button>
          </div>

          {/* Quick System Statistics Widget */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-2.5 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-brand-red" />
              System Dashboard
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">News Articles</span>
                <span className="text-xl font-black text-white mt-1 block">{dbArticles.length}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Short Reels</span>
                <span className="text-xl font-black text-white mt-1 block">{dbReels.length}</span>
              </div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">AdSense Assets</span>
                <span className="text-sm font-bold text-white mt-1 block">{ads.length} active ads</span>
              </div>
              <RefreshCw 
                onClick={loadWorkspaceData} 
                className="w-4 h-4 text-brand-red cursor-pointer hover:rotate-180 duration-500" 
              />
            </div>
          </div>
        </aside>

        {/* 4. Right Main Dynamic Workspace Form Area */}
        <main className="lg:col-span-9">
          {isLoading && dbArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
              <Loader2 className="w-10 h-10 text-brand-red animate-spin mb-4" />
              <p className="text-sm text-slate-400 font-bold">Synchronizing with Cloud Firestore database...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {/* TAB 1: POST NEWS ARTICLE FORM */}
              {activeTab === 'articles' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                    <div>
                      <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                        <FileText className="w-5 h-5 text-brand-red" />
                        Post Dynamic News Article
                      </h2>
                      <p className="text-xs text-slate-400 font-medium">Create and publish instantly across English, Marathi, & Hindi translations.</p>
                    </div>

                    {/* Multi-language inputs tabs */}
                    <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex gap-1 self-start sm:self-center">
                      {(['english', 'marathi', 'hindi'] as Language[]).map(l => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setArtLangTabs(l)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                            artLangTabs === l 
                              ? 'bg-brand-red text-white' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handlePostArticle} className="space-y-6">
                    {/* Translateable Fields Group Box */}
                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-black text-brand-red uppercase tracking-widest pb-1 border-b border-slate-800/85">
                        <Globe className="w-4 h-4" />
                        Language Translation Inputs: <span className="text-white bg-slate-800 px-2 py-0.5 rounded ml-1">{artLangTabs.toUpperCase()}</span>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">News Title ({artLangTabs})</label>
                        <input
                          type="text"
                          value={artTitle[artLangTabs]}
                          onChange={(e) => setArtTitle(prev => ({ ...prev, [artLangTabs]: e.target.value }))}
                          placeholder={`Enter title in ${artLangTabs}...`}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-100 placeholder-slate-600 focus:border-brand-red focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Summary / Highlight Text ({artLangTabs})</label>
                        <textarea
                          rows={2}
                          value={artSummary[artLangTabs]}
                          onChange={(e) => setArtSummary(prev => ({ ...prev, [artLangTabs]: e.target.value }))}
                          placeholder={`Enter short introductory summary in ${artLangTabs}...`}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-100 placeholder-slate-600 focus:border-brand-red focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Main Content Paragraphs ({artLangTabs})</label>
                        <p className="text-[10px] text-slate-500 font-bold -mt-1.5">Press Enter to separate paragraphs. Paragraphs are fully preserved and responsive.</p>
                        <textarea
                          rows={8}
                          value={artContentRaw[artLangTabs]}
                          onChange={(e) => setArtContentRaw(prev => ({ ...prev, [artLangTabs]: e.target.value }))}
                          placeholder={`Enter article body text here. Separate paragraphs with newlines...`}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-100 placeholder-slate-600 focus:border-brand-red focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Metadata Settings Grid (Buttons) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left: Metadata selections */}
                      <div className="space-y-5">
                        {/* Selector for Category */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Select Category</label>
                          <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(c => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => {
                                  setArtCategory(c.id);
                                  if (c.id !== 'maharashtra') setArtCity('');
                                }}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all ${
                                  artCategory === c.id 
                                    ? 'bg-slate-100 text-slate-950 border-white' 
                                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                                }`}
                              >
                                {c.label.english}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Selector for City (Maharashtra only) */}
                        {artCategory === 'maharashtra' && (
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-brand-red" />
                              Select Maharashtra City
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {MAHARASHTRA_CITIES.map(city => (
                                <button
                                  key={city.id}
                                  type="button"
                                  onClick={() => setArtCity(city.id)}
                                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all ${
                                    artCity === city.id 
                                      ? 'bg-brand-red text-white border-brand-red' 
                                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                                  }`}
                                >
                                  {city.label.english}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Flag Indicators */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Article Highlights</label>
                          <div className="flex flex-wrap gap-3">
                            <label className="flex items-center space-x-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 cursor-pointer hover:bg-slate-900">
                              <input 
                                type="checkbox" 
                                checked={artIsFeatured} 
                                onChange={(e) => setArtIsFeatured(e.target.checked)}
                                className="accent-brand-red w-4 h-4 rounded" 
                              />
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">Featured Cover</span>
                            </label>

                            <label className="flex items-center space-x-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 cursor-pointer hover:bg-slate-900">
                              <input 
                                type="checkbox" 
                                checked={artIsTrending} 
                                onChange={(e) => setArtIsTrending(e.target.checked)}
                                className="accent-brand-red w-4 h-4 rounded" 
                              />
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">Trending list</span>
                            </label>

                            <label className="flex items-center space-x-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 cursor-pointer hover:bg-slate-900">
                              <input 
                                type="checkbox" 
                                checked={artIsLive} 
                                onChange={(e) => setArtIsLive(e.target.checked)}
                                className="accent-brand-red w-4 h-4 rounded" 
                              />
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">Live Coverage</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Right: Asset Uploads */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Cover Media Image URL</label>
                          <input
                            type="text"
                            value={artImage}
                            onChange={(e) => setArtImage(e.target.value)}
                            placeholder="Direct image link (Unsplash, Firebase, etc.)"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-100 placeholder-slate-600 focus:border-brand-red focus:outline-none"
                          />
                        </div>

                        {/* Interactive drag/click image upload container to R2/Firebase */}
                        <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950 hover:bg-slate-900 transition-all">
                          <input 
                            type="file" 
                            id="article-image-upload" 
                            accept="image/*"
                            onChange={handleArtImageUpload}
                            className="hidden" 
                          />
                          <label htmlFor="article-image-upload" className="cursor-pointer block space-y-2">
                            <Upload className="w-8 h-8 mx-auto text-slate-400" />
                            <div className="text-xs font-bold text-slate-200">Upload Cover Image to Firebase Storage</div>
                            <div className="text-[10px] text-slate-500 font-bold">JPG, PNG, WEBP, or GIF formats</div>
                          </label>

                          {artUploadProgress >= 0 && (
                            <div className="mt-4 space-y-1">
                              <div className="w-full bg-slate-850 rounded-full h-2">
                                <div className="bg-brand-red h-2 rounded-full transition-all duration-300" style={{ width: `${artUploadProgress}%` }} />
                              </div>
                              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{artUploadProgress}% UPLOADED</div>
                            </div>
                          )}

                          {artImage && (
                            <div className="mt-4 relative aspect-[16/9] rounded-xl overflow-hidden border border-slate-800">
                              <img src={artImage} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                              <button 
                                type="button" 
                                onClick={() => setArtImage('')}
                                className="absolute top-2 right-2 p-1.5 bg-slate-950/80 hover:bg-brand-red text-white rounded-lg transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Extra Settings row */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Read Time (mins)</label>
                            <input
                              type="number"
                              min={1}
                              max={20}
                              value={artReadTime}
                              onChange={(e) => setArtReadTime(Number(e.target.value))}
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs font-bold text-white focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Reporter Author</label>
                            <input
                              type="text"
                              value={artAuthorName}
                              onChange={(e) => setArtAuthorName(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs font-bold text-white focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-brand-red hover:bg-brand-red/90 text-white rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-brand-red/20 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            COMMITTING TO DATABASE CLOUD...
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            PUBLISH NEWS ARTICLE LIVE
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* TAB 2: POST REEL FORM */}
              {activeTab === 'reels' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                    <div>
                      <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                        <Film className="w-5 h-5 text-brand-red" />
                        Post Short Reel / Video News
                      </h2>
                      <p className="text-xs text-slate-400 font-medium">Publish vertical short videos to stream instantly on mobile and desktop devices.</p>
                    </div>

                    <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex gap-1 self-start sm:self-center">
                      {(['english', 'marathi', 'hindi'] as Language[]).map(l => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setReelLangTabs(l)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                            reelLangTabs === l 
                              ? 'bg-brand-red text-white' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handlePostReel} className="space-y-6">
                    {/* Translateable Input Container */}
                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-black text-brand-red uppercase tracking-widest pb-1 border-b border-slate-800/85">
                        <Globe className="w-4 h-4" />
                        Reel Translation Data: <span className="text-white bg-slate-800 px-2 py-0.5 rounded ml-1">{reelLangTabs.toUpperCase()}</span>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Reel Caption Title ({reelLangTabs})</label>
                        <input
                          type="text"
                          value={reelTitle[reelLangTabs]}
                          onChange={(e) => setReelTitle(prev => ({ ...prev, [reelLangTabs]: e.target.value }))}
                          placeholder="Headline caption for the short video..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-100 placeholder-slate-600 focus:border-brand-red focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Reel Brief Description ({reelLangTabs})</label>
                        <textarea
                          rows={3}
                          value={reelDesc[reelLangTabs]}
                          onChange={(e) => setReelDesc(prev => ({ ...prev, [reelLangTabs]: e.target.value }))}
                          placeholder="Write a brief explanation or summary description..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-100 placeholder-slate-600 focus:border-brand-red focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left: Metadata configurations */}
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-brand-red" />
                            Select Local City Target
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {MAHARASHTRA_CITIES.map(c => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => setReelCity(c.id)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all ${
                                  reelCity === c.id 
                                    ? 'bg-slate-100 text-slate-950 border-white' 
                                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                                }`}
                              >
                                {c.label.english}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                            <Tag className="w-3.5 h-3.5 text-brand-red" />
                            Select Topic Category Tag
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {['breaking', 'viral', 'trending', 'politics', 'lifestyle'].map(tag => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => setReelTag(tag)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all ${
                                  reelTag === tag 
                                    ? 'bg-brand-red text-white border-brand-red' 
                                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                                }`}
                              >
                                {tag.toUpperCase()}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Reporter Correspondent Name</label>
                          <input
                            type="text"
                            value={reelReporterName}
                            onChange={(e) => setReelReporterName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Right: Reel asset upload */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Direct Video URL</label>
                          <input
                            type="text"
                            value={reelVideoUrl}
                            onChange={(e) => setReelVideoUrl(e.target.value)}
                            placeholder="Direct MP4 video link or upload below"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-100 placeholder-slate-600 focus:border-brand-red focus:outline-none"
                          />
                        </div>

                        <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950 hover:bg-slate-900 transition-all">
                          <input 
                            type="file" 
                            id="reel-video-upload" 
                            accept="video/*"
                            onChange={handleReelVideoUpload}
                            className="hidden" 
                          />
                          <label htmlFor="reel-video-upload" className="cursor-pointer block space-y-2">
                            <Upload className="w-8 h-8 mx-auto text-slate-400" />
                            <div className="text-xs font-bold text-slate-200">Upload Reel Video to Firebase Storage</div>
                            <div className="text-[10px] text-slate-500 font-bold">Standard MP4 vertical video formats</div>
                          </label>

                          {reelUploadProgress >= 0 && (
                            <div className="mt-4 space-y-1">
                              <div className="w-full bg-slate-850 rounded-full h-2">
                                <div className="bg-brand-red h-2 rounded-full transition-all duration-300" style={{ width: `${reelUploadProgress}%` }} />
                              </div>
                              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{reelUploadProgress}% UPLOADED</div>
                            </div>
                          )}

                          {reelVideoUrl && (
                            <div className="mt-4 relative aspect-[9/16] max-w-[120px] mx-auto rounded-xl overflow-hidden border border-slate-800">
                              <video src={reelVideoUrl} className="w-full h-full object-cover" muted controls />
                              <button 
                                type="button" 
                                onClick={() => setReelVideoUrl('')}
                                className="absolute top-2 right-2 p-1 bg-slate-950/80 hover:bg-brand-red text-white rounded-lg"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-brand-red hover:bg-brand-red/90 text-white rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-brand-red/20 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            COMMITTING VIDEO TO DATABASE CLOUD...
                          </>
                        ) : (
                          <>
                            <Film className="w-4 h-4" />
                            PUBLISH REEL / SHORT NEWS LIVE
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* TAB 3: MANAGE CONTENT LIST */}
              {activeTab === 'manage' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  {/* News Articles List */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                    <h3 className="text-md font-black uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
                      <span>Cloud Articles ({dbArticles.length})</span>
                      <span className="text-xs text-slate-400 capitalize font-medium normal-case">Custom news posted via Firebase</span>
                    </h3>

                    {dbArticles.length === 0 ? (
                      <div className="text-center py-12 text-slate-500 font-bold text-xs bg-slate-950 rounded-2xl border border-slate-850">
                        No articles found in your cloud database yet. Publish some using the form!
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {dbArticles.map((art) => (
                          <div 
                            key={art.id} 
                            className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              <img 
                                src={art.image} 
                                alt="" 
                                className="w-16 h-10 object-cover rounded-xl border border-slate-800" 
                                referrerPolicy="no-referrer"
                              />
                              <div className="min-w-0">
                                <h4 className="text-xs font-black text-slate-200 truncate">{art.title[currentLanguage] || art.title.english}</h4>
                                <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-wider">
                                  <span>{art.category}</span>
                                  {art.city && <span>• {art.city}</span>}
                                  <span>• {art.date}</span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => handleDeleteArticle(art.id)}
                              className="p-2.5 bg-slate-900 hover:bg-brand-red text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer"
                              title="Delete News Article"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Reels List */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                    <h3 className="text-md font-black uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
                      <span>Cloud Short Reels ({dbReels.length})</span>
                      <span className="text-xs text-slate-400 capitalize font-medium normal-case">Custom video reels posted via Firebase</span>
                    </h3>

                    {dbReels.length === 0 ? (
                      <div className="text-center py-12 text-slate-500 font-bold text-xs bg-slate-950 rounded-2xl border border-slate-850">
                        No custom reels found in your cloud database yet. Upload a short video using the form!
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {dbReels.map((reel) => (
                          <div 
                            key={reel.id} 
                            className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              <video 
                                src={reel.videoUrl} 
                                className="w-10 h-16 object-cover rounded-xl border border-slate-800 bg-black" 
                                muted 
                              />
                              <div className="min-w-0">
                                <h4 className="text-xs font-black text-slate-200 truncate">{reel.title[currentLanguage] || reel.title.english}</h4>
                                <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-wider">
                                  <span>{reel.city?.english || 'Maharashtra'}</span>
                                  <span>• {reel.tag?.english || 'Reel'}</span>
                                  <span>• {reel.views} Views</span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => handleDeleteReel(reel.id)}
                              className="p-2.5 bg-slate-900 hover:bg-brand-red text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer"
                              title="Delete Reel"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB 4: AD CAMPAIGNS & ADSENSE */}
              {activeTab === 'campaigns' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  {/* Create campaign form */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                    <h2 className="text-lg font-black tracking-tight border-b border-slate-800 pb-3 mb-5 flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-brand-red" />
                      Publish Ad Campaign / AdSense Block
                    </h2>

                    <form onSubmit={handleSaveAdCampaign} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Campaign Title</label>
                            <input
                              type="text"
                              value={adTitle}
                              onChange={(e) => setAdTitle(e.target.value)}
                              placeholder="E.g., Summer Special Deal 2026"
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:outline-none"
                              required
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Ad Type</label>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setAdType('direct')}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all border ${
                                  adType === 'direct' 
                                    ? 'bg-slate-100 text-slate-950 border-white' 
                                    : 'bg-slate-950 text-slate-400 border-slate-850 hover:border-slate-800'
                                }`}
                              >
                                Direct Asset Link
                              </button>
                              <button
                                type="button"
                                onClick={() => setAdType('adsense')}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all border ${
                                  adType === 'adsense' 
                                    ? 'bg-slate-100 text-slate-950 border-white' 
                                    : 'bg-slate-950 text-slate-400 border-slate-850 hover:border-slate-800'
                                }`}
                              >
                                Google AdSense HTML
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Placement Site Location</label>
                            <div className="flex flex-wrap gap-2">
                              {(['header', 'sidebar', 'in-feed', 'footer'] as AdPlacementType[]).map(place => (
                                <button
                                  key={place}
                                  type="button"
                                  onClick={() => setAdPlacement(place)}
                                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all border ${
                                    adPlacement === place 
                                      ? 'bg-brand-red text-white border-brand-red shadow shadow-brand-red/10' 
                                      : 'bg-slate-950 text-slate-400 border-slate-850 hover:border-slate-800'
                                  }`}
                                >
                                  {place}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {adType === 'direct' ? (
                            <>
                              <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Direct Banner Image URL</label>
                                <input
                                  type="text"
                                  value={adImageUrl}
                                  onChange={(e) => setAdImageUrl(e.target.value)}
                                  placeholder="Direct banner photo link"
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:outline-none"
                                />
                              </div>

                              {/* Interactive asset uploader */}
                              <div className="border border-dashed border-slate-800 rounded-xl p-4 text-center bg-slate-950">
                                <input 
                                  type="file" 
                                  id="ad-image-upload" 
                                  accept="image/*"
                                  onChange={handleAdImageUpload}
                                  className="hidden" 
                                />
                                <label htmlFor="ad-image-upload" className="cursor-pointer block space-y-1.5">
                                  <Upload className="w-5 h-5 mx-auto text-slate-400" />
                                  <div className="text-[11px] font-bold text-slate-300">Upload Ad Banner to Cloud Storage</div>
                                </label>
                                {adUploadProgress >= 0 && (
                                  <div className="w-full bg-slate-850 h-1.5 rounded-full mt-2 overflow-hidden">
                                    <div className="bg-brand-red h-1.5 rounded-full" style={{ width: `${adUploadProgress}%` }} />
                                  </div>
                                )}
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Click Destination Landing URL</label>
                                <input
                                  type="text"
                                  value={adTargetUrl}
                                  onChange={(e) => setAdTargetUrl(e.target.value)}
                                  placeholder="E.g., https://sponsor-offer-site.com"
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:outline-none"
                                />
                              </div>
                            </>
                          ) : (
                            <div className="space-y-1">
                              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Google AdSense Embed script/HTML</label>
                              <textarea
                                rows={5}
                                value={adCustomHtml}
                                onChange={(e) => setAdCustomHtml(e.target.value)}
                                placeholder="Paste standard <script async src='...adsbygoogle.js'></script> code here..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-emerald-400 placeholder-slate-650 focus:outline-none"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-850">
                        <button
                          type="submit"
                          className="w-full py-3 bg-brand-red hover:bg-brand-red/90 text-white rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow"
                        >
                          PUBLISH AD CAMPAIGN
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Active Campaigns List Table */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                    <h3 className="text-md font-black uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-3 mb-4">
                      Active Ad Campaigns & Banners ({ads.length})
                    </h3>

                    {ads.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 font-bold text-xs bg-slate-950 rounded-2xl border border-slate-850">
                        No custom ad campaigns running. Launch one using the form above!
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ads.map(ad => (
                          <div key={ad.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-850 flex items-center justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-black text-slate-200 truncate">{ad.title}</h4>
                                <span className={`w-2 h-2 rounded-full ${ad.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-650'}`} />
                              </div>
                              <div className="flex items-center gap-3 text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
                                <span>{ad.adType}</span>
                                <span>• {ad.views} Views</span>
                                <span>• {ad.clicks} Clicks</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleToggleAdActive(ad.id)}
                                className={`px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all border ${
                                  ad.isActive 
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' 
                                    : 'bg-slate-850 text-slate-400 border-slate-800 hover:bg-slate-800'
                                }`}
                              >
                                {ad.isActive ? 'ACTIVE' : 'PAUSED'}
                              </button>
                              
                              <button
                                onClick={() => handleDeleteAd(ad.id)}
                                className="p-2 bg-slate-900 hover:bg-brand-red text-slate-400 hover:text-white rounded-xl transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </main>
      </div>
    </div>
  );
}
