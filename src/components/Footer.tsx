import React from 'react';
import { 
  Newspaper, Mail, Phone, MapPin, Twitter, Facebook, 
  Linkedin, Instagram, ArrowUp, ExternalLink 
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, CATEGORIES } from '../data';

interface FooterProps {
  currentLanguage: Language;
  onCategoryChange: (category: string) => void;
  onSubscribeOpen: () => void;
  onEpaperOpen: () => void;
}

export default function Footer({
  currentLanguage,
  onCategoryChange,
  onSubscribeOpen,
  onEpaperOpen
}: FooterProps) {
  const t = TRANSLATIONS[currentLanguage];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="janshakti-editorial-footer" className="bg-brand-charcoal text-white pt-12 pb-6 px-6 sm:px-8 border-t-4 border-brand-red select-none relative overflow-hidden">
      {/* Absolute faint background brand watermark */}
      <div className="absolute right-0 bottom-0 opacity-5 font-serif font-black text-[250px] leading-none select-none translate-x-12 translate-y-20">
        {currentLanguage === 'english' ? 'J' : 'ज'}
      </div>

      <div className="max-w-[1280px] mx-auto space-y-12 relative z-10">
        {/* Top Section: Logo wordmark + newsletter reminder + top scroller */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-white/10 gap-6">
          <div className="flex flex-col select-none cursor-pointer max-w-[200px]" onClick={handleScrollTop}>
            <span className="text-[8px] md:text-[10px] font-bold text-gray-400 tracking-wider uppercase leading-none mb-0.5">
              {currentLanguage === 'marathi' ? 'आपला आवाज आपली शक्ती' : 'Your Voice, Your Strength'}
            </span>
            <div className="h-[2px] bg-brand-red w-full rounded-sm" />
            {currentLanguage === 'english' ? (
              <span className="text-xl md:text-2xl font-serif font-black text-white tracking-tight pt-1 leading-none">
                Janshakti
              </span>
            ) : (
              <span className="text-xl md:text-2xl font-devanagari font-black text-white tracking-wider pt-1 leading-none">
                {currentLanguage === 'marathi' ? 'जनशक्ती' : 'जनशक्ति'}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="footer-back-to-top"
              onClick={handleScrollTop}
              className="p-3 rounded-xl border border-white/15 hover:border-brand-red bg-white/5 hover:bg-brand-red transition-all flex items-center space-x-2 text-xs font-bold cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Grid: Navigation indices */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Section Indices Col 1 */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-red">News Categories</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    id={`footer-cat-${cat.id}`}
                    onClick={() => onCategoryChange(cat.id)}
                    className="hover:text-brand-red transition-colors text-left"
                  >
                    {cat.label[currentLanguage]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Section Indices Col 2 */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-red">More Sections</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              {CATEGORIES.slice(6).map((cat) => (
                <li key={cat.id}>
                  <button
                    id={`footer-cat-${cat.id}`}
                    onClick={() => onCategoryChange(cat.id)}
                    className="hover:text-brand-red transition-colors text-left"
                  >
                    {cat.label[currentLanguage]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate Indices Col 3 */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-red">Corporate Info</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><a href="#about" className="hover:text-brand-red transition-colors flex items-center">About Us <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-40" /></a></li>
              <li><a href="#careers" className="hover:text-brand-red transition-colors flex items-center">Careers <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-40" /></a></li>
              <li><a href="#advertise" className="hover:text-brand-red transition-colors flex items-center">Advertise with Us <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-40" /></a></li>
              <li><a href="#epaper" onClick={onEpaperOpen} className="hover:text-brand-red transition-colors flex items-center">{t.epaper} <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-40" /></a></li>
              <li><a href="#subscribe" onClick={onSubscribeOpen} className="hover:text-brand-red transition-colors flex items-center">{t.subscribe} <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-40" /></a></li>
            </ul>
          </div>

          {/* Contact Details Col 4 */}
          <div className="space-y-4 md:col-span-2">
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-red">Editorial Headquarters</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>Janshakti Bhavan, Nariman Point, Mumbai, Maharashtra, 400021</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-brand-red flex-shrink-0" />
                  <span>+91-22-6800-4200 (Editorial desk)</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-brand-red flex-shrink-0" />
                  <span>editorial@janshakti.com</span>
                </li>
              </ul>
            </div>

            {/* Social Sharing Icons */}
            <div className="space-y-2 pt-2">
              <h5 className="text-[9px] font-bold uppercase tracking-wider text-gray-500">Connect with us</h5>
              <div className="flex space-x-3">
                <a href="#twitter" className="p-2 bg-white/5 hover:bg-brand-red text-gray-300 hover:text-white rounded-lg transition-all" title="Follow Janshakti on Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#facebook" className="p-2 bg-white/5 hover:bg-brand-red text-gray-300 hover:text-white rounded-lg transition-all" title="Follow Janshakti on Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#instagram" className="p-2 bg-white/5 hover:bg-brand-red text-gray-300 hover:text-white rounded-lg transition-all" title="Follow Janshakti on Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#linkedin" className="p-2 bg-white/5 hover:bg-brand-red text-gray-300 hover:text-white rounded-lg transition-all" title="Follow Janshakti on LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright / legal section */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] text-gray-500 gap-4">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} Janshakti Media Network Private Limited. All rights reserved.</p>
            <p className="text-gray-600 font-sans">Developed in accordance with the Digital Media Ethics Code of India.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#privacy" className="hover:text-brand-red transition-all">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-brand-red transition-all">Terms of Service</a>
            <span>•</span>
            <a href="#ombudsman" className="hover:text-brand-red transition-all">Grievance Redressal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
