import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Edit2, Trash2, Check, BarChart2, Radio, Globe, Layers, Eye, MousePointer, Info, Code, FileText, Sparkles, Sliders } from 'lucide-react';
import { Language, Ad, AdPlacementType } from '../types';
import { CATEGORIES } from '../data';
import { getLocalAds, saveLocalAds } from './AdPlacement';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onAdsUpdated?: () => void;
}

export default function AdminPanelModal({
  isOpen,
  onClose,
  currentLanguage,
  onAdsUpdated
}: AdminPanelModalProps) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [activeTab, setActiveTab] = useState<'campaigns' | 'create' | 'adsense' | 'analytics'>('campaigns');
  
  // Analytics State
  const [totalViews, setTotalViews] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  // Form State
  const [title, setTitle] = useState('');
  const [adType, setAdType] = useState<'direct' | 'adsense'>('direct');
  const [type, setType] = useState<'banner' | 'square'>('banner');
  const [imageUrl, setImageUrl] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [customHtml, setCustomHtml] = useState('');
  const [langTarget, setLangTarget] = useState<'all' | Language>('all');
  const [categoryTarget, setCategoryTarget] = useState('all');
  const [editingAdId, setEditingAdId] = useState<string | null>(null);

  // Load Ads
  const loadAds = () => {
    const list = getLocalAds();
    setAds(list);
    
    // Compute total metrics
    let views = 0;
    let clicks = 0;
    list.forEach(a => {
      views += a.views;
      clicks += a.clicks;
    });
    setTotalViews(views);
    setTotalClicks(clicks);
  };

  useEffect(() => {
    if (isOpen) {
      loadAds();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Create / Edit Ad
  const handleSaveAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const adsList = getLocalAds();

    if (editingAdId) {
      // Edit
      const updated = adsList.map(ad => {
        if (ad.id === editingAdId) {
          return {
            ...ad,
            title,
            adType,
            type: adType === 'adsense' ? 'banner' : type, // AdSense placeholders are typically banner or in-feed banner style here
            imageUrl: adType === 'direct' ? imageUrl : undefined,
            targetUrl: adType === 'direct' ? targetUrl : undefined,
            customHtml: adType === 'adsense' ? customHtml : undefined,
            language: langTarget,
            category: categoryTarget,
          };
        }
        return ad;
      });
      saveLocalAds(updated);
      setEditingAdId(null);
    } else {
      // Create
      const newAd: Ad = {
        id: `ad-${Date.now()}`,
        title,
        adType,
        type: adType === 'adsense' ? 'banner' : type,
        imageUrl: adType === 'direct' ? imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=400&q=80' : undefined,
        targetUrl: adType === 'direct' ? targetUrl || '#' : undefined,
        customHtml: adType === 'adsense' ? customHtml || `<div style="background:#111; color:#fff; padding:15px; border-radius:8px; text-align:center;"><h4>Simulated Google AdSense Card</h4><p style="font-size:11px;">Client ID: ca-pub-xxxxxxxxxx</p></div>` : undefined,
        isActive: true,
        views: 0,
        clicks: 0,
        language: langTarget,
        category: categoryTarget,
        startDate: new Date().toISOString().split('T')[0]
      };
      adsList.unshift(newAd);
      saveLocalAds(adsList);
    }

    // Reset Form
    setTitle('');
    setImageUrl('');
    setTargetUrl('');
    setCustomHtml('');
    setLangTarget('all');
    setCategoryTarget('all');
    setAdType('direct');
    setEditingAdId(null);
    
    // Reload
    loadAds();
    setActiveTab('campaigns');
    if (onAdsUpdated) onAdsUpdated();
  };

  // Toggle active
  const handleToggleActive = (id: string) => {
    const list = getLocalAds();
    const updated = list.map(a => {
      if (a.id === id) {
        return { ...a, isActive: !a.isActive };
      }
      return a;
    });
    saveLocalAds(updated);
    loadAds();
    if (onAdsUpdated) onAdsUpdated();
  };

  // Delete Ad
  const handleDeleteAd = (id: string) => {
    const list = getLocalAds();
    const filtered = list.filter(a => a.id !== id);
    saveLocalAds(filtered);
    loadAds();
    if (onAdsUpdated) onAdsUpdated();
  };

  // Edit action
  const handleStartEdit = (ad: Ad) => {
    setEditingAdId(ad.id);
    setTitle(ad.title);
    setAdType(ad.adType);
    setType(ad.type as 'banner' | 'square');
    setImageUrl(ad.imageUrl || '');
    setTargetUrl(ad.targetUrl || '');
    setCustomHtml(ad.customHtml || '');
    setLangTarget(ad.language);
    setCategoryTarget(ad.category);
    setActiveTab('create');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/60 backdrop-blur-sm select-none">
      <div className="absolute inset-0" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden z-10"
      >
        {/* Header Block */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-red/10 text-brand-red rounded-2xl">
              <Sliders className="w-5.5 h-5.5" />
            </div>
            <div>
              <h3 className="font-serif font-black text-brand-charcoal text-lg md:text-xl flex items-center gap-1.5">
                Janshakti Advertisement Desk 
                <span className="text-[10px] font-sans font-extrabold uppercase px-2 py-0.5 bg-brand-red text-white rounded-full">Admin Panel</span>
              </h3>
              <p className="text-xs text-slate-500">Monitor native campaigns, direct advertisers, and Google AdSense parameters.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition-all"
          >
            <X className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* Inner Admin Dashboard Navigation Tabs */}
        <div className="flex border-b border-slate-100 bg-white px-6 py-2.5 overflow-x-auto gap-1">
          <button
            onClick={() => { setActiveTab('campaigns'); setEditingAdId(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === 'campaigns' ? 'bg-brand-red text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            Active Campaigns ({ads.length})
          </button>
          
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === 'create' ? 'bg-brand-red text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Plus className="w-4 h-4" />
            {editingAdId ? 'Edit Campaign' : 'Post New Ad'}
          </button>

          <button
            onClick={() => setActiveTab('adsense')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === 'adsense' ? 'bg-brand-red text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Code className="w-4 h-4" />
            Google AdSense Integration
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === 'analytics' ? 'bg-brand-red text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            Ad Analytics
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          <AnimatePresence mode="wait">
            {activeTab === 'campaigns' && (
              <motion.div
                key="campaigns-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Stats Summary strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Total Ad Views</p>
                      <h4 className="text-xl font-bold text-slate-800 mt-1">{totalViews.toLocaleString()}</h4>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Total Click-Throughs</p>
                      <h4 className="text-xl font-bold text-slate-800 mt-1">{totalClicks.toLocaleString()}</h4>
                    </div>
                    <div className="p-3 bg-red-50 text-brand-red rounded-xl">
                      <MousePointer className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Average Click-Through Rate (CTR)</p>
                      <h4 className="text-xl font-bold text-slate-800 mt-1">
                        {totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : '0.00'}%
                      </h4>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl">
                      <BarChart2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Ads List Table */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                    <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Active Ad Campaigns</h4>
                    <span className="text-[11px] font-medium text-slate-500">Rotate organically across language/category feeds</span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {ads.length === 0 ? (
                      <div className="p-12 text-center text-slate-400 text-xs">
                        No advertisements posted yet. Create your first campaign above!
                      </div>
                    ) : (
                      ads.map(ad => {
                        const ctr = ad.views > 0 ? ((ad.clicks / ad.views) * 100).toFixed(2) : '0.00';
                        return (
                          <div key={ad.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-start gap-4">
                              {/* Thumbnail preview */}
                              {ad.imageUrl ? (
                                <img 
                                  src={ad.imageUrl} 
                                  alt={ad.title} 
                                  className="w-14 h-14 object-cover rounded-xl border border-slate-100 shrink-0" 
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="w-14 h-14 bg-brand-charcoal text-brand-red rounded-xl shrink-0 flex items-center justify-center font-bold text-xs">
                                  HTML
                                </div>
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className="font-bold text-sm text-slate-800">{ad.title}</h5>
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                                    ad.adType === 'adsense' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {ad.adType === 'adsense' ? 'Google AdSense' : 'Direct Campaign'}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                                    ad.type === 'banner' ? 'bg-indigo-100 text-indigo-800' : 'bg-purple-100 text-purple-800'
                                  }`}>
                                    {ad.type}
                                  </span>
                                </div>
                                
                                {/* Targeting description */}
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-slate-500">
                                  <span className="flex items-center gap-1">
                                    <Globe className="w-3.5 h-3.5" />
                                    Lang: <strong className="text-slate-700 capitalize">{ad.language}</strong>
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Layers className="w-3.5 h-3.5" />
                                    Category: <strong className="text-slate-700 uppercase">{
                                      ad.category === 'all' ? 'All Feeds' : CATEGORIES.find(c => c.id === ad.category)?.label.english || ad.category
                                    }</strong>
                                  </span>
                                  <span>Start: <strong className="text-slate-700">{ad.startDate}</strong></span>
                                </div>
                              </div>
                            </div>

                            {/* Metrics & Operations */}
                            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                              {/* Display metrics */}
                              <div className="grid grid-cols-3 gap-4 text-center md:text-right text-xs">
                                <div>
                                  <span className="block text-slate-400 font-semibold text-[10px]">VIEWS</span>
                                  <span className="font-bold text-slate-800">{ad.views}</span>
                                </div>
                                <div>
                                  <span className="block text-slate-400 font-semibold text-[10px]">CLICKS</span>
                                  <span className="font-bold text-slate-800">{ad.clicks}</span>
                                </div>
                                <div>
                                  <span className="block text-slate-400 font-semibold text-[10px]">CTR</span>
                                  <span className="font-bold text-brand-red">{ctr}%</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {/* Toggle status */}
                                <button
                                  onClick={() => handleToggleActive(ad.id)}
                                  className={`p-2 rounded-xl transition-all border ${
                                    ad.isActive 
                                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
                                      : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
                                  }`}
                                  title={ad.isActive ? 'Deactivate Campaign' : 'Activate Campaign'}
                                >
                                  <Check className="w-4 h-4 font-bold" />
                                </button>

                                {/* Edit Campaign */}
                                <button
                                  onClick={() => handleStartEdit(ad)}
                                  className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl transition-all"
                                  title="Edit Campaign Settings"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>

                                {/* Delete Campaign */}
                                <button
                                  onClick={() => handleDeleteAd(ad.id)}
                                  className="p-2 bg-red-50 hover:bg-red-100 text-brand-red border border-red-100 rounded-xl transition-all"
                                  title="Delete Campaign"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'create' && (
              <motion.div
                key="create-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm max-w-2xl mx-auto"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-brand-red" />
                  <h4 className="font-serif font-black text-slate-800 text-base">
                    {editingAdId ? 'Modify Active Advertisement' : 'Post an Advert Campaign'}
                  </h4>
                </div>

                <form onSubmit={handleSaveAd} className="space-y-4 text-xs text-slate-600">
                  {/* Title */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Campaign Title / Advertiser Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Tata Motors eVision Maharashtra Launch"
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-red transition-all"
                    />
                  </div>

                  {/* Ad Flow Selector */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">Delivery Pipeline</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setAdType('direct')}
                          className={`flex-1 py-2 rounded-xl border text-center font-bold transition-all ${
                            adType === 'direct' 
                              ? 'bg-brand-red/10 border-brand-red text-brand-red' 
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          Direct Advertiser
                        </button>
                        <button
                          type="button"
                          onClick={() => { setAdType('adsense'); setType('banner'); }}
                          className={`flex-1 py-2 rounded-xl border text-center font-bold transition-all ${
                            adType === 'adsense' 
                              ? 'bg-brand-red/10 border-brand-red text-brand-red' 
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          Google AdSense Code
                        </button>
                      </div>
                    </div>

                    {/* Banner Layout dimensions */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">Banner Layout Shape</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={adType === 'adsense'}
                          onClick={() => setType('banner')}
                          className={`flex-1 py-2 rounded-xl border text-center font-bold transition-all ${
                            adType === 'adsense' ? 'opacity-50 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400' :
                            type === 'banner' 
                              ? 'bg-brand-red/10 border-brand-red text-brand-red' 
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          Leaderboard Banner (728x90)
                        </button>
                        <button
                          type="button"
                          disabled={adType === 'adsense'}
                          onClick={() => setType('square')}
                          className={`flex-1 py-2 rounded-xl border text-center font-bold transition-all ${
                            adType === 'adsense' ? 'opacity-50 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400' :
                            type === 'square' 
                              ? 'bg-brand-red/10 border-brand-red text-brand-red' 
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          Medium Rectangle (300x250)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Direct Advertiser input fields */}
                  {adType === 'direct' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Ad Image URL</label>
                        <input 
                          type="url" 
                          placeholder="https://images.unsplash.com/photo-..."
                          value={imageUrl} 
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-red transition-all"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Click-Through Target URL</label>
                        <input 
                          type="text" 
                          placeholder="e.g. https://www.sponsor-site.com or #subscribe"
                          value={targetUrl} 
                          onChange={(e) => setTargetUrl(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-red transition-all"
                        />
                      </div>
                    </div>
                  ) : (
                    // AdSense Dynamic Script Area
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Google AdSense HTML Placeholder / Responsive code block</label>
                      <textarea
                        rows={4}
                        placeholder={`<!-- Google AdSense Code -->\n<ins class="adsbygoogle"\n     style="display:block"\n     data-ad-client="ca-pub-xxxxxxxxxx"\n     data-ad-slot="xxxxxxxxxx"\n     data-ad-format="auto"\n     data-full-width-responsive="true"></ins>`}
                        value={customHtml}
                        onChange={(e) => setCustomHtml(e.target.value)}
                        className="w-full font-mono text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-red transition-all"
                      />
                    </div>
                  )}

                  {/* Targeting parameters */}
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Language Demographics targeting</label>
                      <select 
                        value={langTarget} 
                        onChange={(e) => setLangTarget(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-red transition-all"
                      >
                        <option value="all">Global (All Languages)</option>
                        <option value="english">English Readers</option>
                        <option value="marathi">Marathi (मराठी) Readers</option>
                        <option value="hindi">Hindi (हिंदी) Readers</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category & Feed targeting</label>
                      <select 
                        value={categoryTarget} 
                        onChange={(e) => setCategoryTarget(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-red transition-all"
                      >
                        <option value="all">Run-of-Site (All Feeds)</option>
                        {CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.label.english}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                    <button
                      type="button"
                      onClick={() => { setActiveTab('campaigns'); setEditingAdId(null); }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-brand-red text-white hover:bg-brand-red/95 rounded-xl shadow-lg shadow-brand-red/20 transition-all font-bold"
                    >
                      {editingAdId ? 'Save Modifications' : 'Launch Ad Campaign'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'adsense' && (
              <motion.div
                key="adsense-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Visual explainer Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                  <div className="p-4 bg-yellow-50 text-yellow-600 rounded-2xl shrink-0">
                    <Code className="w-10 h-10" />
                  </div>
                  <div className="text-xs">
                    <h4 className="font-serif font-black text-slate-800 text-base mb-1">Google AdSense Integration Guide</h4>
                    <p className="text-slate-500 leading-relaxed max-w-xl">
                      Google AdSense delivers responsive visual ads targeted to each page's content. To verify or load real ads in this React system, Google script tags are declared in <strong>index.html</strong>, while specific ad containers trigger script compilation once rendered.
                    </p>
                  </div>
                </div>

                {/* Integration Details card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* HTML Script container */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4.5 h-4.5 text-slate-600" />
                      <h5 className="font-bold text-slate-800 text-sm">Step 1: Include AdSense Core Library</h5>
                    </div>
                    <p className="text-xs text-slate-500">Insert this global script tag inside the <code>&lt;head&gt;</code> of <code>index.html</code> so the browser prepares Google's ad engine:</p>
                    <pre className="bg-slate-900 text-yellow-300 font-mono text-[10.5px] p-4 rounded-xl overflow-x-auto">
{`<script 
  async 
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" 
  crossorigin="anonymous">
</script>`}
                    </pre>
                  </div>

                  {/* React component implementation */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-2">
                      <Info className="w-4.5 h-4.5 text-slate-600" />
                      <h5 className="font-bold text-slate-800 text-sm">Step 2: Initialize Responsive Ad Units</h5>
                    </div>
                    <p className="text-xs text-slate-500">When components mount, trigger AdSense push cycles to draw the ad on the page. In React, this is handled dynamically:</p>
                    <pre className="bg-slate-900 text-slate-100 font-mono text-[10.5px] p-4 rounded-xl overflow-x-auto">
{`useEffect(() => {
  try {
    // Notify Google script of a new ad container
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (err) {
    console.error("AdSense build error:", err);
  }
}, []);`}
                    </pre>
                  </div>
                </div>

                {/* Settings simulation tools */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Radio className="w-4.5 h-4.5 text-brand-red animate-pulse" />
                    <h5 className="font-bold text-slate-800 text-sm">Interactive Google Crawler Simulator</h5>
                  </div>
                  <div className="text-xs text-slate-500 space-y-3 leading-relaxed">
                    <p>
                      When a page displays a Google ad unit, Google's media crawler crawls the newspaper portal to scan headers, text, and categories to match appropriate sponsors.
                    </p>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 font-mono text-emerald-600 font-bold mb-2 text-[11px]">
                        <span>● GOOGLE_BOT CRAWLER ACTIVE</span>
                        <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[8px]">STABLE</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        <div className="bg-white p-3 rounded-lg border border-slate-100">
                          <span className="block text-slate-400 text-[10px]">CURRENT URL</span>
                          <strong className="text-slate-800 text-[11px]">/feed/{currentLanguage}</strong>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-100">
                          <span className="block text-slate-400 text-[10px]">BOT IP ADDRESS</span>
                          <strong className="text-slate-800 text-[11px]">66.249.66.1</strong>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-100">
                          <span className="block text-slate-400 text-[10px]">CRAWL COGNIZANCE</span>
                          <strong className="text-slate-800 text-[11px]">Marathi News Core</strong>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-100">
                          <span className="block text-slate-400 text-[10px]">MATCHED RELEVANCY</span>
                          <strong className="text-slate-800 text-[11px]">High (Automotive/Fin)</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                key="analytics-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Analytics Graphs / charts */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-serif font-black text-slate-800 text-base mb-4">Performance Relevancy Distribution</h4>
                  <div className="space-y-4 text-xs">
                    {ads.map(ad => {
                      const totalViewsSum = totalViews || 1;
                      const viewPercentage = Math.round((ad.views / totalViewsSum) * 100);
                      const ctrValue = ad.views > 0 ? ((ad.clicks / ad.views) * 100).toFixed(2) : '0.00';
                      
                      return (
                        <div key={ad.id} className="space-y-1.5">
                          <div className="flex justify-between items-center text-slate-700">
                            <span className="font-bold flex items-center gap-1.5">
                              {ad.title} 
                              <span className="text-[10px] font-normal text-slate-400 capitalize">({ad.type})</span>
                            </span>
                            <span className="font-mono text-slate-500 font-bold">{ad.views} Views • {ad.clicks} Clicks • CTR: {ctrValue}%</span>
                          </div>
                          {/* visual horizontal bar */}
                          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                            <div 
                              style={{ width: `${Math.max(viewPercentage, 3)}%` }} 
                              className="bg-brand-red rounded-full transition-all duration-1000"
                              title={`${viewPercentage}% of total impressions`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-xs">
                  <h5 className="font-bold text-slate-800 text-sm mb-2.5">Ad Revenue Optimizations</h5>
                  <ul className="space-y-2 text-slate-500 list-disc list-inside">
                    <li>Advertise Marathi publications on the <strong>marathi</strong> language feed to increase Click-Through Rates (CTR) by an estimated <strong className="text-emerald-600">32%</strong>.</li>
                    <li>Utilize Google AdSense responsive units in the <strong>in-feed</strong> placement to guarantee matching high-paying real estate banners for city readers.</li>
                    <li>Ensure direct advertiser links point to secure landing pages (<code>https://</code>) to avoid browser redirection blocks inside parent frames.</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
