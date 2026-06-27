import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Download, Printer, ZoomIn, ZoomOut, Maximize2, Minimize2, 
  ChevronLeft, ChevronRight, Sparkles, Newspaper, Shield, Heart, HelpCircle
} from 'lucide-react';
import { EPAPER_PAGES, EPaperPage, EPaperArticle } from '../epaperData';

interface EPaperPDFViewProps {
  pageNumber: number;
  setPageNumber: (page: number) => void;
  language: 'marathi' | 'english' | 'hindi';
  translateMode: boolean;
  setTranslateMode: (mode: boolean) => void;
  onArticleClick: (articleId: string) => void;
  onDownloadPage: () => void;
  onDownloadFull: () => void;
  triggerToast: (msg: string) => void;
}

export default function EPaperPDFView({
  pageNumber,
  setPageNumber,
  language,
  translateMode,
  setTranslateMode,
  onArticleClick,
  onDownloadPage,
  onDownloadFull,
  triggerToast
}: EPaperPDFViewProps) {
  const [zoom, setZoom] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentPage = EPAPER_PAGES.find(p => p.pageNumber === pageNumber) || EPAPER_PAGES[0];

  const handleZoomIn = () => {
    if (zoom < 1.4) setZoom(prev => Math.min(prev + 0.1, 1.4));
  };

  const handleZoomOut = () => {
    if (zoom > 0.7) setZoom(prev => Math.max(prev - 0.1, 0.7));
  };

  const handlePrint = () => {
    window.print();
    triggerToast("Opening system print dialog...");
  };

  // Helper to find article by ID
  const getArticle = (id: string): EPaperArticle => {
    return currentPage.articles.find(a => a.id === id) || {
      id,
      title: { marathi: "", english: "", hindi: "" },
      content: { marathi: [], english: [], hindi: [] }
    };
  };

  return (
    <div className={`flex-1 border border-brand-border rounded-2xl shadow-xl overflow-hidden relative flex flex-col bg-[#525659] min-h-[550px] ${isFullscreen ? 'fixed inset-4 z-50 bg-[#323639]' : ''}`}>
      {/* 1. Chrome PDF Viewer Style Top Bar */}
      <div className="h-12 bg-[#323639] border-b border-[#202224] px-4 flex items-center justify-between text-white select-none shrink-0">
        {/* Left Side: PDF File Name */}
        <div className="flex items-center space-x-2.5 max-w-[200px] sm:max-w-xs md:max-w-md overflow-hidden">
          <Newspaper className="w-4 h-4 text-brand-red shrink-0" />
          <span className="text-xs font-semibold truncate text-gray-200 tracking-wide font-mono">
            Janshakti_Epaper_26_06_2026_P{pageNumber}_{language === 'marathi' ? 'Marathi' : 'English'}.pdf
          </span>
        </div>

        {/* Center Side: PDF Controls */}
        <div className="flex items-center space-x-3 bg-[#202224]/50 px-3 py-1 rounded-lg border border-[#444]/40">
          {/* Page Selector */}
          <div className="flex items-center space-x-1.5 border-r border-[#444] pr-3">
            <button 
              onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
              disabled={pageNumber === 1}
              className="p-1 hover:bg-[#3d4043] rounded disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono font-bold tracking-tight">
              {pageNumber} / {EPAPER_PAGES.length}
            </span>
            <button 
              onClick={() => setPageNumber(Math.min(EPAPER_PAGES.length, pageNumber + 1))}
              disabled={pageNumber === EPAPER_PAGES.length}
              className="p-1 hover:bg-[#3d4043] rounded disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom Level */}
          <div className="flex items-center space-x-2 border-r border-[#444] pr-3">
            <button 
              onClick={handleZoomOut}
              className="p-1 hover:bg-[#3d4043] rounded cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono font-bold w-10 text-center select-none text-gray-200">
              {Math.round(zoom * 100)}%
            </span>
            <button 
              onClick={handleZoomIn}
              className="p-1 hover:bg-[#3d4043] rounded cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 hover:bg-[#3d4043] rounded cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Viewer"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-brand-red" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Right Side: Download & Print Buttons */}
        <div className="flex items-center space-x-1.5">
          <button 
            onClick={handlePrint}
            className="p-1.5 hover:bg-[#3d4043] rounded cursor-pointer text-gray-200 hover:text-white"
            title="Print Page"
          >
            <Printer className="w-4 h-4" />
          </button>
          <button 
            onClick={onDownloadPage}
            className="p-1.5 hover:bg-[#3d4043] rounded cursor-pointer text-gray-200 hover:text-white"
            title="Download Page PDF"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Scrollable PDF Canvas */}
      <div className="flex-1 overflow-auto p-4 md:p-6 flex justify-center items-start scrollbar-thin select-text">
        <div 
          className="bg-[#FDFCF7] text-brand-charcoal border-2 border-[#D1D1D1] shadow-2xl origin-top transition-transform duration-200 flex flex-col justify-between"
          style={{ 
            width: '610px', 
            minHeight: '860px',
            transform: `scale(${zoom})`,
            marginBottom: `${(zoom - 1) * 860}px` 
          }}
        >
          {/* Main Printable Area */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            {/* Header: Traditional Newspaper Masthead with double lines */}
            <div className="border-b-4 border-double border-brand-charcoal pb-3 mb-4 select-none">
              <div className="flex flex-col items-center text-center">
                <span className="text-[9px] font-extrabold text-brand-charcoal tracking-widest uppercase">
                  {language === 'marathi' ? 'आपला आवाज आपली शक्ती' : 'Your Voice, Your Strength'}
                </span>
                
                {/* Brand title */}
                <div className="w-full flex items-center justify-center my-1.5">
                  <div className="h-[2px] bg-brand-red flex-1" />
                  {language === 'marathi' ? (
                    <span className="text-4xl font-devanagari font-black text-brand-red px-6 leading-none tracking-wider font-serif">
                      जनशक्ती
                    </span>
                  ) : (
                    <span className="text-4xl font-serif font-black text-brand-red px-6 leading-none tracking-tight">
                      Janshakti
                    </span>
                  )}
                  <div className="h-[2px] bg-brand-red flex-1" />
                </div>

                {/* Sub-header line: date, edition, page number, price */}
                <div className="w-full border-t border-brand-charcoal/35 pt-1.5 flex items-center justify-between text-[9px] font-black text-brand-secondary-text">
                  <span>जळगाव, नाशिक, धुळे, नंदुरबार आवृत्ती</span>
                  <span className="text-brand-red">PAGE {pageNumber}: {currentPage.title[language]}</span>
                  <span>शुक्रवार, २६ जून २०२६ • ₹२ • पाने ६</span>
                </div>
              </div>
            </div>

            {/* PAGE SPECIFIC BROADSHEET PRINT LAYOUTS */}
            {pageNumber === 1 && (
              <div className="flex-1 grid grid-cols-12 gap-4">
                {/* Column 1: Short News Sidebar (Width: col-span-3, 25%) */}
                <div className="col-span-3 border-r border-brand-charcoal/20 pr-3 flex flex-col space-y-4">
                  <div className="bg-brand-red text-white text-[9px] font-black py-0.5 px-2 text-center uppercase tracking-widest rounded-sm mb-1.5 shadow-sm">
                    {language === 'marathi' ? 'शॉर्ट न्यूज' : 'Short News'}
                  </div>

                  {/* Keval Agrawal murder */}
                  <div 
                    onClick={() => onArticleClick('p1-short-1')}
                    className="group cursor-pointer hover:bg-brand-red/5 p-1.5 rounded transition-all"
                  >
                    <h5 className="font-serif font-bold text-[10px] text-brand-charcoal leading-tight border-b border-brand-border/40 pb-1 group-hover:text-brand-red transition-all">
                      {language === 'marathi' ? 'केतन अग्रवाल हत्या प्रकरण' : 'Ketan Agrawal Murder Case'}
                    </h5>
                    <p className="text-[8.5px] text-brand-secondary-text leading-relaxed font-serif mt-1 line-clamp-4">
                      {language === 'marathi' 
                        ? 'पुणे : केतन अग्रवाल हत्येतील मुख्य आरोपी सिया गोयलबाबत एक धक्कादायक माहिती समोर येत आहे. पोलीस तपासात तिने हत्येची कबुली दिली असून...' 
                        : 'Pune: Shocking details emerge about primary suspect Siya Goyal in Ketan Agrawal murder. Police interrogation reveals confession...'}
                    </p>
                  </div>

                  {/* Kolihaveri murder */}
                  <div 
                    onClick={() => onArticleClick('p1-short-2')}
                    className="group cursor-pointer hover:bg-brand-red/5 p-1.5 rounded transition-all"
                  >
                    <h5 className="font-serif font-bold text-[10px] text-brand-charcoal leading-tight border-b border-brand-border/40 pb-1 group-hover:text-brand-red transition-all">
                      {language === 'marathi' ? 'कोळण्हावी गावातील तरुणाचा खून' : 'Youth Murdered in Kolihavri'}
                    </h5>
                    <p className="text-[8.5px] text-brand-secondary-text leading-relaxed font-serif mt-1 line-clamp-4">
                      {language === 'marathi' 
                        ? 'यावल : तालुक्यातील कोळण्हावी रस्त्यादरम्यान तरुणाचा मृतदेह संशयास्पद स्थितीत आढळला. तपासात खून उघडकीस आला असून पोलिसांनी दोघांना ताब्यात घेतले...' 
                        : 'Yaval: Suspicious death of a youth on Kolihavri road has been confirmed as a homicide. Police have detained two main suspects for query...'}
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-center border-t border-brand-border/30 pt-3">
                    <div className="text-[8px] font-mono text-brand-muted-text uppercase tracking-widest text-center rotate-180 write-vertical">
                      Janshakti Daily Press
                    </div>
                  </div>
                </div>

                {/* Column 2 & 3: Main Newspaper Center Layout (Width: col-span-9, 75%) */}
                <div className="col-span-9 flex flex-col justify-between space-y-4">
                  {/* Top: Two Side-By-Side Big Stories */}
                  <div className="grid grid-cols-12 gap-3 pb-3 border-b border-brand-charcoal/20">
                    {/* Left: Shinde-Thackeray Lead Story (col-span-7) */}
                    <div 
                      onClick={() => onArticleClick('p1-a1')}
                      className="col-span-7 pr-2.5 border-r border-brand-charcoal/10 flex flex-col justify-between cursor-pointer group"
                    >
                      <div className="space-y-1.5">
                        <span className="bg-brand-red/10 text-brand-red border border-brand-red/20 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                          {language === 'marathi' ? 'विशेष राजकीय वृत्त' : 'Political Exclusive'}
                        </span>
                        <h3 className="font-serif font-black text-sm text-brand-charcoal leading-snug group-hover:text-brand-red transition-colors">
                          {getArticle('p1-a1').title[language]}
                        </h3>
                        <p className="text-[8px] text-brand-secondary-text italic font-bold">
                          {getArticle('p1-a1').author?.[language]}
                        </p>
                        
                        {/* Shinde portrait visual representation in paper */}
                        <div className="my-2 bg-[#F1ECE4] p-1 border border-brand-border/50 rounded shadow-sm relative overflow-hidden">
                          <div className="aspect-[16/9] w-full bg-[#E5DCCB] flex flex-col items-center justify-center p-2 text-center">
                            <span className="text-[8px] font-bold text-brand-charcoal/70 uppercase">EPaper Photo Wire</span>
                            <span className="text-[7px] font-serif italic text-brand-secondary-text mt-0.5">
                              {language === 'marathi' ? 'एकनाथ शिंदे व बंडखोर आमदार यांची बैठक' : 'Eknath Shinde meeting in Mumbai'}
                            </span>
                          </div>
                        </div>

                        <p className="text-[9px] text-brand-charcoal leading-relaxed font-serif text-justify first-letter:text-xl first-letter:font-black first-letter:text-brand-red first-letter:float-left first-letter:mr-1">
                          {getArticle('p1-a1').content[language][0]}
                        </p>
                        <p className="text-[9px] text-brand-charcoal leading-relaxed font-serif text-justify">
                          {getArticle('p1-a1').content[language][1]}
                        </p>
                      </div>
                    </div>

                    {/* Right: Sanjay Dina Patil Abuses journalists (col-span-5) */}
                    <div 
                      onClick={() => onArticleClick('p1-a2')}
                      className="col-span-5 flex flex-col justify-between cursor-pointer group"
                    >
                      <div className="space-y-1.5">
                        <span className="bg-amber-100 text-amber-800 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                          {language === 'marathi' ? 'मुंबई वृत्त' : 'Mumbai Wire'}
                        </span>
                        <h4 className="font-serif font-extrabold text-[11px] text-brand-charcoal leading-tight group-hover:text-brand-red transition-colors">
                          {getArticle('p1-a2').title[language]}
                        </h4>
                        
                        {/* Devendra Fadnavis reference portrait */}
                        <div className="my-1.5 border border-brand-border/40 p-0.5 bg-white shadow-sm">
                          <div className="aspect-[4/3] bg-gray-100 flex flex-col items-center justify-center p-1">
                            <span className="text-[6.5px] font-bold text-brand-muted-text">Devendra Fadnavis</span>
                            <span className="text-[5.5px] text-brand-secondary-text text-center font-serif leading-none mt-0.5">
                              {language === 'marathi' ? 'प्रतिक्रिया व्यक्त करताना' : 'Responding to journalists'}
                            </span>
                          </div>
                        </div>

                        <p className="text-[8.5px] text-brand-charcoal leading-relaxed font-serif text-justify">
                          {getArticle('p1-a2').content[language][0]}
                        </p>
                        <p className="text-[8.5px] text-brand-secondary-text leading-relaxed font-serif text-justify">
                          {getArticle('p1-a2').content[language][1]}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Left (Yaval truck story) and Right (COMPLIMENTARY AD PANEL) */}
                  <div className="grid grid-cols-12 gap-3 items-stretch">
                    {/* Yaval Truck romance (col-span-7) */}
                    <div 
                      onClick={() => onArticleClick('p1-a4')}
                      className="col-span-7 flex flex-col justify-between cursor-pointer group border-r border-brand-charcoal/10 pr-2.5"
                    >
                      <div className="space-y-1.5">
                        <span className="bg-brand-red text-white text-[7.5px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-widest">
                          {language === 'marathi' ? 'नाकाबंदी कारवाई' : 'Police Blockade'}
                        </span>
                        <h4 className="font-serif font-extrabold text-[11px] text-brand-charcoal leading-tight group-hover:text-brand-red transition-colors">
                          {language === 'marathi' 
                            ? 'यावलला नाकाबंदीत ट्रकमध्ये सापडले अल्पवयीन युगल : मुलगी पालकांच्या ताब्यात' 
                            : 'Minor Couple Discovered in Truck During Yaval Blockade'}
                        </h4>
                        <p className="text-[8.5px] text-brand-charcoal leading-relaxed font-serif text-justify line-clamp-5">
                          {language === 'marathi'
                            ? 'यावल : पोलीस निरीक्षक रंगनाथ धारबळे यांच्या मार्गदर्शनाखाली नाकाबंदी करत असताना पोलिसांनी भरधाव येणाऱ्या एका संशयास्पद ट्रकला थांबवले. तपासणी दरम्यान ट्रकमध्ये एक १७ वर्षांचा मुलगा आणि एक १४ वर्षांची अल्पवयीन मुलगी आढळून आली. चौकशी अंती हे दोघे प्रेमीयुगल असल्याचे उघड झाले...'
                            : 'Yaval: Under the supervision of Police Inspector Ranganath Dharbale, a speeding suspicious truck was flagged down. During checking, a 17-year-old boy and 14-year-old girl were discovered hidden in the cabin. Realizing they were minors, police contacted parents...'}
                        </p>
                      </div>
                    </div>

                    {/* AD PANEL: Authentic print ad "मानाचा मुजरा" celebrating Chhatrapati Shahu Maharaj (col-span-5) */}
                    <div className="col-span-5 bg-gradient-to-br from-[#FFF9EE] via-[#FFF3D6] to-[#FFEBAE] border-2 border-[#D4AF37] rounded p-2.5 shadow-md flex flex-col justify-between relative overflow-hidden select-none">
                      {/* Gold decorative borders */}
                      <div className="absolute inset-1 border border-[#D4AF37]/40 pointer-events-none rounded" />
                      
                      <div className="text-center relative">
                        <span className="text-[7px] text-[#A67C00] font-black tracking-widest uppercase block mb-1">
                          {language === 'marathi' ? '॥ सामाजिक न्याय दिन ॥' : '|| SOCIAL JUSTICE DAY ||'}
                        </span>
                        
                        <h5 className="font-serif text-[11px] font-black text-brand-charcoal leading-none tracking-tight">
                          {language === 'marathi' ? 'Chh. शाहू महाराज जयंती' : 'Chh. Shahu Maharaj Jayanti'}
                        </h5>
                        
                        <span className="text-[9px] font-serif font-bold text-brand-red block my-0.5">
                          {language === 'marathi' ? 'लोकराजाला मानाचा मुजरा' : 'Salute to the King of People'}
                        </span>
                      </div>

                      {/* Political leader vector representations */}
                      <div className="grid grid-cols-4 gap-1 my-1">
                        {['Modi', 'Shinde', 'Fadnavis', 'Ajit Pawar'].map((name, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className="w-5 h-5 rounded-full bg-[#E5D4A2] border border-[#D4AF37]/60 flex items-center justify-center text-[5px] font-bold text-brand-charcoal">
                              {name[0]}
                            </div>
                            <span className="text-[5px] scale-90 text-brand-muted-text font-semibold">{name}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-center text-[5.5px] text-brand-secondary-text font-serif italic border-t border-[#D4AF37]/30 pt-1">
                        {language === 'marathi' ? 'महाराष्ट्र शासन, सामाजिक न्याय विभाग' : 'Govt of Maharashtra Department of Social Justice'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {pageNumber === 2 && (
              <div className="flex-1 flex flex-col justify-between">
                <div className="border-b border-brand-charcoal/20 pb-1 mb-3">
                  <span className="text-brand-red font-serif font-extrabold text-xs tracking-wider">
                    {language === 'marathi' ? 'जीवनशक्ती • आरोग्य व जीवनशैली विशेषांक' : 'JeevanShakti • Health & Wellness Special'}
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-4 flex-1">
                  {/* Left Main column (col-span-8) - Society without love article */}
                  <div 
                    onClick={() => onArticleClick('p2-a1')}
                    className="col-span-8 border-r border-brand-charcoal/10 pr-3 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="bg-pink-50 text-pink-700 border border-pink-200 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                        {language === 'marathi' ? 'मानसोपचार व समाज' : 'Psychology & Society'}
                      </span>
                      <h3 className="font-serif font-black text-sm md:text-base text-brand-charcoal leading-snug group-hover:text-brand-red transition-colors">
                        {getArticle('p2-a1').title[language]}
                      </h3>
                      
                      {/* Heart Vector icon illustration */}
                      <div className="my-2 py-3 bg-[#FCF8F5] border border-pink-100 rounded flex justify-center">
                        <Heart className="w-8 h-8 text-brand-red animate-pulse" />
                      </div>

                      <p className="text-[9px] text-brand-charcoal leading-relaxed font-serif text-justify first-letter:text-xl first-letter:font-black first-letter:text-brand-red first-letter:float-left first-letter:mr-1">
                        {getArticle('p2-a1').content[language][0]}
                      </p>
                      <p className="text-[9px] text-brand-charcoal leading-relaxed font-serif text-justify">
                        {getArticle('p2-a1').content[language][1]}
                      </p>
                    </div>
                  </div>

                  {/* Right Column (col-span-4) - Sickle cell & dental veneers */}
                  <div className="col-span-4 space-y-4 flex flex-col justify-between">
                    {/* Sickle cell test */}
                    <div 
                      onClick={() => onArticleClick('p2-a2')}
                      className="cursor-pointer group space-y-1.5"
                    >
                      <span className="bg-[#be1818]/10 text-brand-red text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                        {language === 'marathi' ? 'आरोग्य सतर्कता' : 'Health Alert'}
                      </span>
                      <h4 className="font-serif font-bold text-[10.5px] text-brand-charcoal leading-tight group-hover:text-brand-red transition-colors">
                        {getArticle('p2-a2').title[language]}
                      </h4>
                      <p className="text-[8px] text-brand-secondary-text leading-relaxed font-serif text-justify line-clamp-4">
                        {getArticle('p2-a2').content[language][0]}
                      </p>
                    </div>

                    <div className="border-t border-brand-charcoal/10 my-2 pt-2" />

                    {/* Dental veneers */}
                    <div 
                      onClick={() => onArticleClick('p2-a3')}
                      className="cursor-pointer group space-y-1.5"
                    >
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                        {language === 'marathi' ? 'दंत सौंदर्यशास्त्र' : 'Cosmetic Dentistry'}
                      </span>
                      <h4 className="font-serif font-bold text-[10.5px] text-brand-charcoal leading-tight group-hover:text-brand-red transition-colors">
                        {getArticle('p2-a3').title[language]}
                      </h4>
                      <p className="text-[8px] text-brand-secondary-text leading-relaxed font-serif text-justify line-clamp-4">
                        {getArticle('p2-a3').content[language][0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {pageNumber === 3 && (
              <div className="flex-1 flex flex-col justify-between">
                <div className="border-b border-brand-charcoal/20 pb-1 mb-3 flex items-center justify-between">
                  <span className="text-brand-red font-serif font-extrabold text-xs tracking-wider">
                    {language === 'marathi' ? 'जळगाव जिल्हा वृत्त आणि घडामोडी' : 'Jalgaon District News & Operations'}
                  </span>
                  <span className="text-[8px] text-brand-muted-text font-bold">Region Broad</span>
                </div>

                <div className="grid grid-cols-12 gap-3.5 flex-1">
                  {/* Local Clash (col-span-4) */}
                  <div 
                    onClick={() => onArticleClick('p3-a1')}
                    className="col-span-4 border-r border-brand-charcoal/10 pr-2 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <span className="text-brand-red text-[7.5px] font-black uppercase tracking-wider block">
                        {language === 'marathi' ? 'गुन्हेगारी वृत्त' : 'Crime Desk'}
                      </span>
                      <h4 className="font-serif font-extrabold text-[10.5px] text-brand-charcoal leading-tight group-hover:text-brand-red transition-colors">
                        {getArticle('p3-a1').title[language]}
                      </h4>
                      <p className="text-[8.5px] text-brand-charcoal leading-relaxed font-serif text-justify">
                        {getArticle('p3-a1').content[language][0]}
                      </p>
                    </div>
                  </div>

                  {/* Lenders harrassment (col-span-4) */}
                  <div 
                    onClick={() => onArticleClick('p3-a2')}
                    className="col-span-4 border-r border-brand-charcoal/10 px-2 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[#be1818] text-[7.5px] font-black uppercase tracking-wider block">
                        {language === 'marathi' ? 'चोपडा घडामोडी' : 'Chopda Alert'}
                      </span>
                      <h4 className="font-serif font-extrabold text-[10.5px] text-brand-charcoal leading-tight group-hover:text-brand-red transition-colors">
                        {getArticle('p3-a2').title[language]}
                      </h4>
                      <p className="text-[8.5px] text-brand-charcoal leading-relaxed font-serif text-justify line-clamp-6">
                        {getArticle('p3-a2').content[language][0]}
                      </p>
                    </div>
                  </div>

                  {/* Hospital / Firefighters (col-span-4) */}
                  <div className="col-span-4 pl-2 flex flex-col justify-between space-y-3">
                    <div 
                      onClick={() => onArticleClick('p3-a3')}
                      className="cursor-pointer group space-y-1.5"
                    >
                      <span className="text-emerald-700 text-[7.5px] font-black uppercase tracking-wider block">
                        {language === 'marathi' ? 'अमळनेर आरोग्य' : 'Amalner Medical'}
                      </span>
                      <h4 className="font-serif font-bold text-[10px] text-brand-charcoal leading-tight group-hover:text-brand-red transition-colors">
                        {getArticle('p3-a3').title[language]}
                      </h4>
                      <p className="text-[8.5px] text-brand-secondary-text leading-relaxed font-serif line-clamp-3">
                        {getArticle('p3-a3').content[language][0]}
                      </p>
                    </div>

                    <div className="border-t border-brand-charcoal/10 pt-2" />

                    <div 
                      onClick={() => onArticleClick('p3-a4')}
                      className="cursor-pointer group space-y-1.5"
                    >
                      <span className="text-blue-700 text-[7.5px] font-black uppercase tracking-wider block">
                        {language === 'marathi' ? 'शौर्य अभियान' : 'Heroic Rescue'}
                      </span>
                      <h4 className="font-serif font-bold text-[10px] text-brand-charcoal leading-tight group-hover:text-brand-red transition-colors">
                        {getArticle('p3-a4').title[language]}
                      </h4>
                      <p className="text-[8.5px] text-brand-secondary-text leading-relaxed font-serif line-clamp-3">
                        {getArticle('p3-a4').content[language][0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {pageNumber === 4 && (
              <div className="flex-1 flex flex-col justify-between">
                <div className="border-b border-brand-charcoal/20 pb-1 mb-3">
                  <span className="text-brand-red font-serif font-extrabold text-xs tracking-wider">
                    {language === 'marathi' ? 'दृष्टिकोन • संपादकीय आणि वैचारिक विश्लेषण' : 'Drushtikon • Editorial & Opinion Analysis'}
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-4 flex-1">
                  {/* Editorial: Water Culture (col-span-6) */}
                  <div 
                    onClick={() => onArticleClick('p4-a1')}
                    className="col-span-6 border-r border-brand-charcoal/10 pr-3 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="bg-brand-charcoal text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-wide rounded-sm">
                        {language === 'marathi' ? 'मुख्य संपादकीय' : 'Lead Editorial'}
                      </span>
                      <h3 className="font-serif font-black text-sm text-brand-charcoal leading-snug group-hover:text-brand-red transition-colors">
                        {getArticle('p4-a1').title[language]}
                      </h3>
                      <p className="text-[8.5px] text-brand-charcoal leading-relaxed font-serif text-justify first-letter:text-xl first-letter:font-black first-letter:text-brand-red first-letter:float-left first-letter:mr-1">
                        {getArticle('p4-a1').content[language][0]}
                      </p>
                      <p className="text-[8.5px] text-brand-charcoal leading-relaxed font-serif text-justify">
                        {getArticle('p4-a1').content[language][1]}
                      </p>
                    </div>
                  </div>

                  {/* Electricity column (col-span-6) */}
                  <div 
                    onClick={() => onArticleClick('p4-a2')}
                    className="col-span-6 pl-2 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="bg-amber-100 text-amber-800 text-[8px] font-black px-2 py-0.5 uppercase tracking-wide rounded-sm">
                        {language === 'marathi' ? 'ग्राहक प्रबोधन' : 'Consumer Awareness'}
                      </span>
                      <h3 className="font-serif font-black text-sm text-brand-charcoal leading-snug group-hover:text-brand-red transition-colors">
                        {getArticle('p4-a2').title[language]}
                      </h3>
                      <p className="text-[8.5px] text-brand-charcoal leading-relaxed font-serif text-justify line-clamp-6">
                        {getArticle('p4-a2').content[language][0]}
                      </p>
                      <p className="text-[8.5px] text-brand-secondary-text leading-relaxed font-serif text-justify line-clamp-3">
                        {getArticle('p4-a2').content[language][1]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {pageNumber === 5 && (
              <div className="flex-1 flex flex-col justify-between">
                <div className="border-b border-brand-charcoal/20 pb-1 mb-3">
                  <span className="text-brand-red font-serif font-extrabold text-xs tracking-wider">
                    {language === 'marathi' ? 'अर्थशक्ती • व्यापार, अर्थकारण आणि कृषी उद्योग' : 'Arthashakti • Business, Finance & Agriculture'}
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-4 flex-1">
                  {/* GDP fall (col-span-7) */}
                  <div 
                    onClick={() => onArticleClick('p5-a1')}
                    className="col-span-7 border-r border-brand-charcoal/10 pr-3 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="bg-brand-red text-white text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase">
                        {language === 'marathi' ? 'राष्ट्रीय अर्थकारण' : 'National Economy'}
                      </span>
                      <h3 className="font-serif font-black text-xs md:text-sm text-brand-charcoal leading-snug group-hover:text-brand-red transition-colors">
                        {getArticle('p5-a1').title[language]}
                      </h3>
                      <p className="text-[8.5px] text-brand-charcoal leading-relaxed font-serif text-justify line-clamp-6">
                        {getArticle('p5-a1').content[language][0]}
                      </p>
                    </div>
                  </div>

                  {/* Business shorts (col-span-5) */}
                  <div className="col-span-5 space-y-3.5 flex flex-col justify-between">
                    <div 
                      onClick={() => onArticleClick('p5-a2')}
                      className="cursor-pointer group space-y-1"
                    >
                      <span className="text-brand-red text-[7.5px] font-black uppercase tracking-wider block">
                        {language === 'marathi' ? 'इंधन उद्योग' : 'Fuel Industry'}
                      </span>
                      <h4 className="font-serif font-bold text-[10px] text-brand-charcoal leading-tight group-hover:text-brand-red transition-colors">
                        {getArticle('p5-a2').title[language]}
                      </h4>
                      <p className="text-[8px] text-brand-secondary-text leading-relaxed font-serif line-clamp-3">
                        {getArticle('p5-a2').content[language][0]}
                      </p>
                    </div>

                    <div className="border-t border-brand-charcoal/10 pt-2" />

                    <div 
                      onClick={() => onArticleClick('p5-a3')}
                      className="cursor-pointer group space-y-1"
                    >
                      <span className="text-brand-red text-[7.5px] font-black uppercase tracking-wider block">
                        {language === 'marathi' ? 'डिजिटल व्यवहार' : 'Digital Payments'}
                      </span>
                      <h4 className="font-serif font-bold text-[10px] text-brand-charcoal leading-tight group-hover:text-brand-red transition-colors">
                        {getArticle('p5-a3').title[language]}
                      </h4>
                      <p className="text-[8px] text-brand-secondary-text leading-relaxed font-serif line-clamp-3">
                        {getArticle('p5-a3').content[language][0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {pageNumber === 6 && (
              <div className="flex-1 flex flex-col justify-between">
                <div className="border-b border-brand-charcoal/20 pb-1 mb-3">
                  <span className="text-brand-red font-serif font-extrabold text-xs tracking-wider">
                    {language === 'marathi' ? 'विशेष वृत्तांत आणि राज्यस्तरीय घडामोडी' : 'Special Feature & State-Level Reports'}
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-4 flex-1">
                  {/* Marathi Language development (col-span-6) */}
                  <div 
                    onClick={() => onArticleClick('p6-a1')}
                    className="col-span-6 border-r border-brand-charcoal/10 pr-3 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="bg-brand-red text-white text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase">
                        {language === 'marathi' ? 'भाषा आणि संस्कृती' : 'Language & Culture'}
                      </span>
                      <h3 className="font-serif font-black text-sm text-brand-charcoal leading-snug group-hover:text-brand-red transition-colors">
                        {getArticle('p6-a1').title[language]}
                      </h3>
                      <p className="text-[8.5px] text-brand-charcoal leading-relaxed font-serif text-justify">
                        {getArticle('p6-a1').content[language][0]}
                      </p>
                    </div>
                  </div>

                  {/* Freight train baby found (col-span-6) */}
                  <div 
                    onClick={() => onArticleClick('p6-a2')}
                    className="col-span-6 pl-2 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase">
                        {language === 'marathi' ? 'मानवीय संवेदना' : 'Human Interest'}
                      </span>
                      <h3 className="font-serif font-black text-sm text-brand-charcoal leading-snug group-hover:text-brand-red transition-colors">
                        {getArticle('p6-a2').title[language]}
                      </h3>
                      <p className="text-[8.5px] text-brand-charcoal leading-relaxed font-serif text-justify line-clamp-6">
                        {getArticle('p6-a2').content[language][0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Print Footer: Standard print media metadata */}
            <div className="mt-4 pt-2.5 border-t border-brand-charcoal/40 flex items-center justify-between text-[8px] text-brand-muted-text font-black select-none">
              <span>epaper.janashakti.in</span>
              <span className="uppercase">COMPLIMENTARY PREMIUM DIGITAL REPLICA SHEET</span>
              <span>JANSHAKTI GROUP © 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
