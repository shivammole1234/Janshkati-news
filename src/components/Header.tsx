import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sun, Bell, User, Newspaper, ChevronDown, Calendar, Menu, X, Landmark, Globe, Play } from 'lucide-react';
import { Language, UserProfile } from '../types';
import { TRANSLATIONS, CATEGORIES } from '../data';
import logoImg from '../assets/logo.jpg';

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onSearchOpen: () => void;
  onProfileOpen: () => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onSubscribeOpen: () => void;
  onEpaperOpen: () => void;
  userProfile: UserProfile;
}

interface WeatherDetail {
  city: Record<Language, string>;
  temp: number;
  condition: Record<Language, string>;
  alert: Record<Language, string> | null;
  latitude: number;
  longitude: number;
}

const CITIES_WEATHER: WeatherDetail[] = [
  {
    city: { english: "Mumbai", marathi: "मुंबई", hindi: "मुंबई" },
    temp: 28,
    condition: { english: "Rainy", marathi: "पाऊस", hindi: "बारिश" },
    alert: { english: "Rain Alert", marathi: "पावसाचा इशारा", hindi: "बारिश का अलर्ट" },
    latitude: 19.0760,
    longitude: 72.8777
  },
  {
    city: { english: "Pune", marathi: "पुणे", hindi: "पुणे" },
    temp: 24,
    condition: { english: "Pleasant", marathi: "ल्हाददायक", hindi: "सुहावना" },
    alert: null,
    latitude: 18.5204,
    longitude: 73.8567
  },
  {
    city: { english: "Nagpur", marathi: "नागपूर", hindi: "नागपुर" },
    temp: 32,
    condition: { english: "Sunny", marathi: "स्वच्छ सूर्यप्रकाश", hindi: "धूप" },
    alert: null,
    latitude: 21.1458,
    longitude: 79.0882
  },
  {
    city: { english: "Thane", marathi: "ठाणे", hindi: "ठाणे" },
    temp: 28,
    condition: { english: "Rainy", marathi: "पाऊस", hindi: "बारिश" },
    alert: { english: "Thunderstorm Warning", marathi: "वादळाचा इशारा", hindi: "आंधी की चेतावनी" },
    latitude: 19.2183,
    longitude: 72.9781
  },
  {
    city: { english: "Nashik", marathi: "नाशिक", hindi: "नाशिक" },
    temp: 25,
    condition: { english: "Cloudy", marathi: "ढगाळ", hindi: "बादल" },
    alert: null,
    latitude: 19.9975,
    longitude: 73.7898
  }
];

export default function Header({
  activeCategory,
  onCategoryChange,
  onSearchOpen,
  onProfileOpen,
  currentLanguage,
  onLanguageChange,
  onSubscribeOpen,
  onEpaperOpen,
  userProfile
}: HeaderProps) {
  const t = TRANSLATIONS[currentLanguage];
  const [currentTime, setCurrentTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const [weatherData, setWeatherData] = useState<WeatherDetail[]>(CITIES_WEATHER);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);

  // Fetch weather data for Maharashtra cities from Open-Meteo
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const promises = CITIES_WEATHER.map(c => 
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.latitude}&longitude=${c.longitude}&current_weather=true`)
            .then(r => r.json())
        );
        const results = await Promise.all(promises);
        
        const updated = weatherData.map((city, idx) => {
          const match = results[idx]?.current_weather;
          if (match) {
            const tempVal = Math.round(match.temperature);
            const code = match.weathercode;
            
            let condEn = city.condition.english;
            let condMr = city.condition.marathi;
            let condHi = city.condition.hindi;
            
            if (code === 0) {
              condEn = "Sunny"; condMr = "स्वच्छ सूर्यप्रकाश"; condHi = "धूप";
            } else if ([1, 2, 3].includes(code)) {
              condEn = "Partly Cloudy"; condMr = "अंशतः ढगाळ"; condHi = "आंशिक बादल";
            } else if ([45, 48].includes(code)) {
              condEn = "Foggy"; condMr = "धुके"; condHi = "कोहरा";
            } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
              condEn = "Rainy"; condMr = "पाऊस"; condHi = "बारिश";
            } else if ([95, 96, 99].includes(code)) {
              condEn = "Thunderstorm"; condMr = "वादळ"; condHi = "आंधी-तूफान";
            }
            
            return {
              ...city,
              temp: tempVal,
              condition: { english: condEn, marathi: condMr, hindi: condHi }
            };
          }
          return city;
        });
        setWeatherData(updated);
      } catch (err) {
        console.error("Error fetching live weather from Open-Meteo:", err);
      }
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 600000); // 10 mins
    return () => clearInterval(weatherInterval);
  }, []);

  // Cycle through the cities every 4 seconds
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setCurrentCityIndex((prev) => (prev + 1) % weatherData.length);
    }, 4000);
    return () => clearInterval(cycleInterval);
  }, [weatherData.length]);

  // Live Date & Time clock
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      
      const locale = currentLanguage === 'marathi' ? 'mr-IN' : currentLanguage === 'hindi' ? 'hi-IN' : 'en-US';
      setCurrentTime(date.toLocaleDateString(locale, options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [currentLanguage]);

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { id: Language; label: string }[] = [
    { id: 'english', label: 'English' },
    { id: 'marathi', label: 'मराठी (Marathi)' },
    { id: 'hindi', label: 'हिन्दी (Hindi)' }
  ];

  const activeLangLabel = languages.find(l => l.id === currentLanguage)?.label || 'English';

  return (
    <>
      {/* 1. Top Utility Bar (Hidden on compact mobile) */}
      <div className="hidden lg:block bg-brand-light border-b border-brand-border text-xs py-2 px-6 text-brand-secondary-text">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          {/* Left: DateTime & Location */}
          <div className="flex items-center space-x-4">
            <span className="flex items-center font-medium">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-brand-red" />
              {currentTime || 'Loading...'}
            </span>
            <span className="h-3 w-[1px] bg-brand-border"></span>
            <span className="flex items-center overflow-hidden h-5 min-w-[280px]">
              <Sun className="w-3.5 h-3.5 mr-1.5 text-amber-500 animate-pulse flex-shrink-0" />
              <div className="relative overflow-hidden h-5 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentCityIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="inline-flex items-center whitespace-nowrap text-brand-secondary-text text-xs"
                  >
                    <span>
                      {weatherData[currentCityIndex].city[currentLanguage]} • {weatherData[currentCityIndex].temp}°C • {weatherData[currentCityIndex].condition[currentLanguage]}
                    </span>
                    {weatherData[currentCityIndex].alert && (
                      <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded text-[9px] font-bold uppercase tracking-wider animate-pulse inline-block">
                        {weatherData[currentCityIndex].alert[currentLanguage]}
                      </span>
                    )}
                  </motion.span>
                </AnimatePresence>
              </div>
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-5">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                id="header-lang-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1 hover:text-brand-red font-medium transition-colors"
              >
                <Globe className="w-3.5 h-3.5 mr-1 text-brand-secondary-text" />
                <span>{activeLangLabel}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <AnimatePresence>
                {langDropdownOpen && (
                  <>
                    <div 
                      id="header-lang-overlay"
                      className="fixed inset-0 z-40" 
                      onClick={() => setLangDropdownOpen(false)} 
                    />
                    <motion.div 
                      id="header-lang-dropdown"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 bg-white border border-brand-border rounded-lg shadow-xl py-1 w-44 z-50 overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.id}
                          id={`lang-select-${lang.id}`}
                          onClick={() => {
                            onLanguageChange(lang.id);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-brand-light transition-colors ${
                            currentLanguage === lang.id ? 'text-brand-red font-semibold bg-red-50/50' : 'text-brand-charcoal'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <span className="h-3 w-[1px] bg-brand-border"></span>

            {/* E-Paper & Live TV */}
            <button 
              id="header-epaper-btn"
              onClick={onEpaperOpen}
              className="flex items-center hover:text-brand-red font-medium transition-colors"
            >
              <Newspaper className="w-3.5 h-3.5 mr-1" />
              {t.epaper}
            </button>

            <button 
              id="header-livetv-btn"
              onClick={() => onCategoryChange('maharashtra')} // Highlight live stories
              className="flex items-center hover:text-brand-red font-semibold text-brand-red animate-pulse"
            >
              <Play className="w-3 h-3 fill-brand-red mr-1" />
              LIVE TV
            </button>

            <span className="h-3 w-[1px] bg-brand-border"></span>

            {/* Subscribe */}
            <button
              id="header-subscribe-btn"
              onClick={onSubscribeOpen}
              className="bg-brand-red text-white font-semibold px-3 py-1 rounded hover:bg-red-800 transition-colors"
            >
              {t.subscribe}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Brand Header (Centered Logo & Search/Profile Trigger) */}
      <div className="bg-white border-b border-brand-border py-4 px-6">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          {/* Mobile menu trigger */}
          <button 
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1 text-brand-charcoal hover:text-brand-red"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Left spacer for desktop, logo center */}
          <div className="hidden lg:flex items-center space-x-3 w-[200px]">
            <button
              id="header-search-box-btn"
              onClick={onSearchOpen}
              className="flex items-center space-x-2 text-brand-muted-text hover:text-brand-charcoal border border-brand-border px-3 py-1.5 rounded-full w-full text-xs transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-brand-muted-text" />
              <span>{t.searchPlaceholder.slice(0, 16)}...</span>
            </button>
          </div>

          {/* Central Logo Design: Custom Premium Editorial Masthead */}
          <div 
            id="header-logo-container"
            onClick={() => onCategoryChange('home')} 
            className="cursor-pointer flex flex-col items-center select-none w-full max-w-[280px] md:max-w-[340px]"
          >
            {/* Tagline above the logo (Left aligned with the masthead) */}
            <div className="w-full flex justify-start pl-1 mb-0.5">
              <span className="text-[9px] md:text-[11px] font-semibold text-brand-charcoal tracking-wide uppercase leading-none">
                {currentLanguage === 'marathi' 
                  ? 'आपला आवाज आपली शक्ती' 
                  : currentLanguage === 'hindi' 
                    ? 'आपका आवाज़ आपकी शक्ति' 
                    : 'Your Voice, Your Strength'}
              </span>
            </div>

            {/* Main logo wordmark with continuous red top line */}
            <div className="relative w-full flex flex-col items-center">
              {/* Red top bar representing the traditional shirorekha */}
              <div className="h-[3px] md:h-[5px] bg-brand-red w-full rounded-sm z-10" />
              
              <div className="flex items-center justify-center space-x-2 pt-1">
                <img 
                  src={logoImg} 
                  alt="Janshakti Logo" 
                  className="w-7 h-7 md:w-9 md:h-9 object-cover rounded-full border border-brand-red shadow-sm shrink-0"
                  referrerPolicy="no-referrer"
                />
                {currentLanguage === 'english' ? (
                  <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-brand-red tracking-tight leading-none">
                    Janshakti
                  </span>
                ) : (
                  <span className="text-3xl md:text-4xl lg:text-5xl font-devanagari font-black text-brand-red tracking-wider leading-none">
                    {currentLanguage === 'marathi' ? 'जनशक्ती' : 'जनशक्ति'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Actions: Subscribe / Profile */}
          <div className="flex items-center justify-end space-x-4 w-[200px]">
            {/* Search icon for mobile */}
            <button 
              id="mobile-search-btn"
              onClick={onSearchOpen}
              className="lg:hidden p-1 text-brand-charcoal hover:text-brand-red"
            >
              <Search className="w-5.5 h-5.5" />
            </button>

            {/* Profile trigger */}
            <button
              id="header-profile-btn"
              onClick={onProfileOpen}
              className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-brand-light border border-brand-border transition-colors"
            >
              {userProfile.avatar ? (
                <img 
                  src={userProfile.avatar} 
                  alt={userProfile.name} 
                  className="w-6 h-6 rounded-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-4 h-4 text-brand-charcoal" />
              )}
              <span className="hidden md:inline text-xs font-semibold text-brand-charcoal px-1 max-w-[100px] truncate">
                {userProfile.name.split(' ')[0]}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Category Navigation Link Bar (Sticky while scrolling) */}
      <div className={`bg-white border-b border-brand-border z-30 transition-all ${
        scrolled ? 'sticky top-0 shadow-md py-2 md:py-3' : 'py-3'
      }`}>
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Horizontal Nav Bar Scrollable */}
            <nav className="flex items-center space-x-1 overflow-x-auto no-scrollbar scroll-smooth w-full py-1">
              <button
                id="nav-cat-home"
                onClick={() => onCategoryChange('home')}
                className={`relative px-3.5 py-1.5 text-sm font-semibold tracking-wide uppercase transition-colors whitespace-nowrap cursor-pointer rounded-md ${
                  activeCategory === 'home' ? 'text-brand-red bg-red-50/50' : 'text-brand-charcoal hover:text-brand-red'
                }`}
              >
                {t.home}
                {activeCategory === 'home' && (
                  <motion.div 
                    layoutId="activeUnderline" 
                    className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-brand-red" 
                  />
                )}
              </button>

              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                const label = cat.label[currentLanguage];
                return (
                  <button
                    key={cat.id}
                    id={`nav-cat-${cat.id}`}
                    onClick={() => onCategoryChange(cat.id)}
                    className={`relative px-3.5 py-1.5 text-sm font-semibold tracking-wide uppercase transition-colors whitespace-nowrap cursor-pointer rounded-md ${
                      isActive ? 'text-brand-red bg-red-50/50' : 'text-brand-charcoal hover:text-brand-red'
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.div 
                        layoutId="activeUnderline" 
                        className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-brand-red" 
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* 4. Mobile Sliding Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />

            {/* Sidebar drawer */}
            <motion.div
              id="mobile-drawer-content"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-white z-50 lg:hidden shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-brand-border flex items-center justify-between">
                <div className="flex flex-col select-none max-w-[150px]">
                  <span className="text-[8px] font-bold text-brand-charcoal uppercase leading-none mb-0.5">
                    {currentLanguage === 'marathi' ? 'आपला आवाज आपली शक्ती' : 'Your Voice'}
                  </span>
                  <div className="h-[2px] bg-brand-red w-full" />
                  <span className="text-lg md:text-xl font-bold font-devanagari text-brand-red pt-0.5 leading-none">
                    {currentLanguage === 'english' ? 'Janshakti' : currentLanguage === 'marathi' ? 'जनशक्ती' : 'जनशक्ति'}
                  </span>
                </div>
                <button 
                  id="mobile-drawer-close"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-brand-light text-brand-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Categories Scroll */}
              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {/* Languages selectors inside Mobile Drawer */}
                <div className="mb-4 pb-4 border-b border-brand-border px-3">
                  <div className="text-xs font-bold text-brand-muted-text uppercase mb-2">Select Language</div>
                  <div className="grid grid-cols-3 gap-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.id}
                        id={`mobile-lang-select-${lang.id}`}
                        onClick={() => onLanguageChange(lang.id)}
                        className={`text-center py-1.5 rounded text-xs font-semibold border ${
                          currentLanguage === lang.id 
                            ? 'bg-brand-red text-white border-brand-red' 
                            : 'bg-white text-brand-secondary-text border-brand-border hover:bg-brand-light'
                        }`}
                      >
                        {lang.id === 'english' ? 'English' : lang.id === 'marathi' ? 'मराठी' : 'हिन्दी'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs font-bold text-brand-muted-text uppercase mb-2 px-3">News Sections</div>
                
                <button
                  id="mobile-nav-home"
                  onClick={() => {
                    onCategoryChange('home');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center ${
                    activeCategory === 'home' ? 'bg-red-50 text-brand-red' : 'text-brand-charcoal hover:bg-brand-light'
                  }`}
                >
                  <Landmark className="w-4 h-4 mr-3 text-brand-muted-text" />
                  {t.home}
                </button>

                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      id={`mobile-nav-${cat.id}`}
                      onClick={() => {
                        onCategoryChange(cat.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center ${
                        isActive ? 'bg-red-50 text-brand-red' : 'text-brand-charcoal hover:bg-brand-light'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-brand-red mr-4 opacity-50"></span>
                      {cat.label[currentLanguage]}
                    </button>
                  );
                })}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-5 border-t border-brand-border bg-brand-light space-y-3">
                <button
                  id="mobile-drawer-epaper"
                  onClick={() => {
                    onEpaperOpen();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 border border-brand-border text-brand-charcoal rounded-lg font-semibold text-sm flex items-center justify-center bg-white hover:bg-brand-light transition-colors"
                >
                  <Newspaper className="w-4 h-4 mr-2" />
                  {t.epaper}
                </button>
                <button
                  id="mobile-drawer-subscribe"
                  onClick={() => {
                    onSubscribeOpen();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-brand-red text-white rounded-lg font-semibold text-sm flex items-center justify-center hover:bg-red-800 transition-colors"
                >
                  {t.subscribe}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
