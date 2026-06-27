import { Article, MarketIndex, Poll, Comment, Language, Author } from './types';
import { ADDITIONAL_ARTICLES } from './additionalArticles';

// Translation helpers for UI Elements
export const TRANSLATIONS = {
  english: {
    websiteName: "Janshakti",
    tagline: "Latest News, Breaking News, Politics, Business, Sports & More",
    breaking: "BREAKING NEWS",
    trending: "TRENDING",
    mostRead: "MOST READ",
    editorsPick: "EDITOR'S PICK",
    live: "LIVE",
    epaper: "E-Paper",
    subscribe: "Subscribe",
    login: "Sign In",
    searchPlaceholder: "Search Janshakti (Press '/' or 'Ctrl+K')",
    searchRecent: "Recent Searches",
    searchTrending: "Trending Now",
    searchNoResults: "No articles found matching your query.",
    bookmark: "Bookmark",
    share: "Share",
    comments: "Comments",
    readMore: "Read Full Article",
    continueReading: "Continue Reading",
    timeAgo: "ago",
    minsRead: "min read",
    author: "By",
    published: "Published",
    updated: "Updated",
    relatedNews: "Related Stories",
    loadMore: "Load More Stories",
    noMoreStories: "You have reached the end of the news feed.",
    newsletterTitle: "Get Daily Newsletters",
    newsletterSubtitle: "Subscribe to Janshakti’s hand-picked daily stories directly to your inbox.",
    subscribeBtn: "Subscribe",
    placeholderEmail: "Enter your email address",
    epaperAccess: "Access Digital Replica of Newspaper",
    logout: "Sign Out",
    profileTitle: "Reader Dashboard",
    savedArticles: "Saved Articles",
    readHistory: "Reading History",
    likedArticles: "Liked Articles",
    followedCats: "My Topics",
    notifSettings: "Notification Settings",
    notifBreaking: "Breaking News Notifications",
    notifDaily: "Daily Morning Digest",
    notifWeekly: "Weekly Deep-Dives",
    saveSettings: "Save Settings",
    pollTitle: "Janshakti Opinion Poll",
    pollVoted: "Thank you for voting!",
    pollTotal: "total votes",
    marketTitle: "Market Watch",
    weatherTitle: "Weather Update",
    photosTitle: "Photo Stories",
    videosTitle: "Video Hub",
    editorialTitle: "Opinion & Editorials",
    writeComment: "Share your perspective...",
    submitComment: "Post Comment",
    replies: "Replies",
    verifiedReader: "Verified Reader",
    sortBy: "Sort by",
    latest: "Latest",
    popular: "Popular",
    copiedLink: "Link copied to clipboard!",
    liveTimeline: "Live Coverage Timeline",
    autoRefresh: "Auto-refreshing in 30s",
    allCategories: "All Sections",
    viewAll: "View All",
    fontSize: "Font Size",
    home: "Home",
  },
  marathi: {
    websiteName: "जनशक्ती",
    tagline: "ताजी बातमी, राजकीय, महाराष्ट्र, व्यापार, क्रीडा आणि बरेच काही",
    breaking: "ब्रेकिंग न्यूज",
    trending: "ट्रेंडिंग",
    mostRead: "सर्वात जास्त वाचलेले",
    editorsPick: "संपादकीय पसंती",
    live: "थेट",
    epaper: "ई-पेपर",
    subscribe: "सदस्यता घ्या",
    login: "लॉगिन",
    searchPlaceholder: "जनशक्तीवर शोधा ('/' किंवा 'Ctrl+K' दाबा)",
    searchRecent: "अलीकडील शोध",
    searchTrending: "आता काय ट्रेंडिंग आहे",
    searchNoResults: "तुमच्या शोधाशी जुळणारे लेख सापडले नाहीत.",
    bookmark: "बुकमार्क",
    share: "शेअर",
    comments: "प्रतिक्रिया",
    readMore: "पूर्ण वृत्त वाचा",
    continueReading: "पुढे वाचा",
    timeAgo: "पूर्वी",
    minsRead: "मिनिटे वाचन",
    author: "लेखक",
    published: "प्रकाशित",
    updated: "अपडेट केले",
    relatedNews: "संबंधित बातम्या",
    loadMore: "अधिक बातम्या लोड करा",
    noMoreStories: "तुम्ही सर्व बातम्या वाचल्या आहेत.",
    newsletterTitle: "दैनिक वृत्तपत्र मिळवा",
    newsletterSubtitle: "जनशक्तीच्या निवडक महत्त्वाच्या बातम्या थेट तुमच्या ईमेलवर मिळवा.",
    subscribeBtn: "सदस्य व्हा",
    placeholderEmail: "तुमचा ईमेल पत्ता प्रविष्ट करा",
    epaperAccess: "वृत्तपत्राची डिजिटल आवृत्ती मिळवा",
    logout: "लॉगआउट",
    profileTitle: "वाचक डॅशबोर्ड",
    savedArticles: "जतन केलेले लेख",
    readHistory: "वाचनाचा इतिहास",
    likedArticles: "आवडलेले लेख",
    followedCats: "माझे आवडीचे विषय",
    notifSettings: "सूचना सेटिंग्ज",
    notifBreaking: "ब्रेकिंग न्यूजच्या सूचना",
    notifDaily: "दैनिक सकाळचा गोषवारा",
    notifWeekly: "साप्ताहिक सखोल विश्लेषण",
    saveSettings: "सेटिंग्ज जतन करा",
    pollTitle: "जनशक्ती जनमत चाचणी",
    pollVoted: "मतदान केल्याबद्दल धन्यवाद!",
    pollTotal: "एकूण मते",
    marketTitle: "बाजार निर्देशांक",
    weatherTitle: "हवामान अंदाज",
    photosTitle: "छायाचित्र दालन",
    videosTitle: "व्हिडिओ हब",
    editorialTitle: "मत आणि संपादकीय",
    writeComment: "तुमचे मत व्यक्त करा...",
    submitComment: "प्रतिक्रिया पाठवा",
    replies: "उत्तरे",
    verifiedReader: "सत्यापित वाचक",
    sortBy: "क्रमवारी",
    latest: "ताजे",
    popular: "लोकप्रिय",
    copiedLink: "लिंक क्लिपबोर्डवर कॉपी केली!",
    liveTimeline: "थेट कव्हरेज कालक्रम",
    autoRefresh: "३० सेकंदात स्वयं-रिफ्रेश",
    allCategories: "सर्व विभाग",
    viewAll: "सर्व पहा",
    fontSize: "अक्षराचा आकार",
    home: "मुख्यपृष्ठ",
  },
  hindi: {
    websiteName: "जनशक्ति",
    tagline: "ताज़ा समाचार, ब्रेकिंग न्यूज़, राजनीति, व्यापार, खेल और बहुत कुछ",
    breaking: "ब्रेकिंग न्यूज़",
    trending: "ट्रेंडिंग",
    mostRead: "सबसे ज़्यादा पढ़े गए",
    editorsPick: "संपादकीय पसंद",
    live: "लाइव",
    epaper: "ई-पेपर",
    subscribe: "सदस्यता लें",
    login: "लॉग इन",
    searchPlaceholder: "जनशक्ति पर खोजें ('/' या 'Ctrl+K' दबाएं)",
    searchRecent: "हालिया खोज",
    searchTrending: "अभी ट्रेंडिंग में",
    searchNoResults: "आपके खोज से मेल खाते लेख नहीं मिले।",
    bookmark: "बुकमार्क",
    share: "शेयर करें",
    comments: "टिप्पणियाँ",
    readMore: "पूरा लेख पढ़ें",
    continueReading: "पढ़ना जारी रखें",
    timeAgo: "पहले",
    minsRead: "मिनट पठन",
    author: "लेखक",
    published: "प्रकाशित",
    updated: "अपडेट किया गया",
    relatedNews: "संबंधित खबरें",
    loadMore: "और खबरें लोड करें",
    noMoreStories: "आप समाचार फ़ीड के अंत तक पहुँच चुके हैं।",
    newsletterTitle: "दैनिक समाचार पत्र प्राप्त करें",
    newsletterSubtitle: "जनशक्ति के चुनिंदा महत्वपूर्ण समाचार सीधे अपने इनबॉक्स में पाएं।",
    subscribeBtn: "सदस्य बनें",
    placeholderEmail: "अपना ईमेल पता दर्ज करें",
    epaperAccess: "अखबार का डिजिटल संस्करण प्राप्त करें",
    logout: "लॉगआउट",
    profileTitle: "पाठक डैशबोर्ड",
    savedArticles: "सुरक्षित लेख",
    readHistory: "पठन इतिहास",
    likedArticles: "पसंद किए गए लेख",
    followedCats: "मेरे पसंदीदा विषय",
    notifSettings: "अधिसूचना सेटिंग्स",
    notifBreaking: "ब्रेकिंग न्यूज़ की सूचनाएं",
    notifDaily: "दैनिक सुबह का सारांश",
    notifWeekly: "साप्ताहिक गहन विश्लेषण",
    saveSettings: "सेटिंग्स सहेजें",
    pollTitle: "जनशक्ति जनमत सर्वेक्षण",
    pollVoted: "मतदान के लिए धन्यवाद!",
    pollTotal: "कुल मत",
    marketTitle: "बाज़ार सूचकांक",
    weatherTitle: "मौसम अपडेट",
    photosTitle: "फोटो गैलरी",
    videosTitle: "वीडियो हब",
    editorialTitle: "विचार और संपादकीय",
    writeComment: "अपनी राय साझा करें...",
    submitComment: "टिप्पणी भेजें",
    replies: "उत्तर",
    verifiedReader: "सत्यापित पाठक",
    sortBy: "क्रमबद्ध करें",
    latest: "नवीनतम",
    popular: "लोकप्रिय",
    copiedLink: "लिंक क्लिपबोर्ड पर कॉपी किया गया!",
    liveTimeline: "लाइव कवरेज घटनाक्रम",
    autoRefresh: "30 सेकंड में स्वतः रिफ्रेश",
    allCategories: "सभी अनुभाग",
    viewAll: "सभी देखें",
    fontSize: "फ़ॉन्ट आकार",
    home: "मुख्य पृष्ठ",
  }
};

export const CATEGORIES = [
  { id: 'politics', label: { english: 'Politics', marathi: 'राजकारण', hindi: 'राजनीति' } },
  { id: 'maharashtra', label: { english: 'Maharashtra', marathi: 'महाराष्ट्र', hindi: 'महाराष्ट्र' } },
  { id: 'india', label: { english: 'India', marathi: 'भारत', hindi: 'भारत' } },
  { id: 'world', label: { english: 'World', marathi: 'परराष्ट्र', hindi: 'विदेश' } },
  { id: 'business', label: { english: 'Business', marathi: 'अर्थविश्व', hindi: 'व्यापार' } },
  { id: 'technology', label: { english: 'Technology', marathi: 'तंत्रज्ञान', hindi: 'तकनीकी' } },
  { id: 'sports', label: { english: 'Sports', marathi: 'क्रीडा', hindi: 'खेल' } },
  { id: 'entertainment', label: { english: 'Entertainment', marathi: 'मनोरंजन', hindi: 'मनोरंजन' } },
  { id: 'lifestyle', label: { english: 'Lifestyle', marathi: 'जीवनशैली', hindi: 'जीवनशैली' } },
  { id: 'education', label: { english: 'Education', marathi: 'शिक्षण', hindi: 'शिक्षा' } },
  { id: 'health', label: { english: 'Health', marathi: 'आरोग्य', hindi: 'स्वास्थ्य' } },
  { id: 'science', label: { english: 'Science', marathi: 'विज्ञान', hindi: 'विज्ञान' } },
  { id: 'opinion', label: { english: 'Opinion', marathi: 'मत-विश्लेषण', hindi: 'विचार' } }
];

export const TICKER_HEADLINES: Record<Language, { text: string; articleId: string }[]> = {
  english: [
    { text: "Breaking: Maharashtra Cabinet approves massive urban infrastructure expansion package worth ₹45,000 crores.", articleId: "maha-infra-pack" },
    { text: "Monsoon Update: IMD issues Orange Alert for Mumbai, Thane and Konkan coast for the next 48 hours.", articleId: "monsoon-orange-alert" },
    { text: "Markets: BSE Sensex scales record high of 84,200 points; Nifty crosses major 25,600 milestone.", articleId: "market-record-sensex" },
    { text: "Tech: ISRO successfully launches next-generation weather satellite INSAT-4DS from Sriharikota.", articleId: "isro-insat-launch" }
  ],
  marathi: [
    { text: "ब्रेकिंग: महाराष्ट्र मंत्रिमंडळाची मुंबई व ठाणे नागरी पायाभूत सुविधांसाठी ₹४५,००० कोटींच्या पॅकेजला मंजुरी.", articleId: "maha-infra-pack" },
    { text: "मान्सून अलर्ट: हवामान खात्याकडून मुंबई, ठाणे आणि कोकण किनारपट्टीसाठी पुढील ४८ तासांकरिता ऑरेंज अलर्ट जाहीर.", articleId: "monsoon-orange-alert" },
    { text: "शेअर बाजार: सेन्सेक्सने ८४,२०० अंकांचा ऐतिहासिक टप्पा ओलांडला; निफ्टी २५,६०० च्या पार.", articleId: "market-record-sensex" },
    { text: "तंत्रज्ञान: इस्रोने श्रीहरीकोटा येथून अत्याधुनिक हवामान उपग्रह INSAT-4DS चे यशस्वी प्रक्षेपण केले.", articleId: "isro-insat-launch" }
  ],
  hindi: [
    { text: "ब्रेकिंग: महाराष्ट्र कैबिनेट ने शहरी बुनियादी ढांचे के विकास के लिए ₹45,000 करोड़ के मेगा पैकेज को मंजूरी दी।", articleId: "maha-infra-pack" },
    { text: "मानसून अपडेट: मौसम विभाग ने मुंबई, ठाणे और कोंकण तट के लिए अगले 48 घंटों के लिए ऑरेंज अलर्ट जारी किया।", articleId: "monsoon-orange-alert" },
    { text: "शेअर बाजार: सेंसेक्स ने 84,200 अंकों का नया ऐतिहासिक रिकॉर्ड छुआ; निफ्टी 25,600 के स्तर के पार।", articleId: "market-record-sensex" },
    { text: "तकनीकी: इसरो ने श्रीहरिकोटा से अगली पीढ़ी के मौसम उपग्रह INSAT-4DS का सफलतापूर्वक प्रक्षेपण किया।", articleId: "isro-insat-launch" }
  ]
};

export const MARKET_INDICES: MarketIndex[] = [
  { symbol: "^BSESN", name: "SENSEX", value: "84,210.15", change: "+412.35", changePercent: "+0.49%", isPositive: true },
  { symbol: "^NSEI", name: "NIFTY 50", value: "25,618.80", change: "+129.10", changePercent: "+0.51%", isPositive: true },
  { symbol: "INR=X", name: "USD/INR", value: "83.42", change: "-0.08", changePercent: "-0.10%", isPositive: false },
  { symbol: "GOLD", name: "GOLD (10g)", value: "₹72,450", change: "+340", changePercent: "+0.47%", isPositive: true }
];

export const CURRENT_POLL: Poll = {
  id: "poll-2026-06",
  question: {
    english: "Do you believe the new public infrastructure projects will successfully resolve Mumbai's seasonal transport bottlenecks?",
    marathi: "नवीन सार्वजनिक पायाभूत सुविधा प्रकल्पांमुळे मुंबईतील पावसाळी वाहतूक कोंडी कायमची सुटेल असे तुम्हाला वाटते का?",
    hindi: "क्या आपको विश्वास है कि नई सार्वजनिक बुनियादी ढांचा परियोजनाएं मुंबई की मौसमी यातायात समस्याओं का समाधान करेंगी?"
  },
  options: [
    {
      id: "opt-yes",
      text: { english: "Yes, fully confident", marathi: "होय, पूर्ण विश्वास आहे", hindi: "हाँ, पूर्ण विश्वास है" },
      votes: 14502
    },
    {
      id: "opt-partially",
      text: { english: "Partially, but needs better execution", marathi: "काही अंशी, पण अंमलबजावणी महत्त्वाची", hindi: "आंशिक रूप से, पर बेहतर क्रियान्वयन आवश्यक" },
      votes: 21890
    },
    {
      id: "opt-no",
      text: { english: "No, structural changes are too slow", marathi: "नाही, बदल अत्यंत संथ आहेत", hindi: "नहीं, ढांचागत बदलाव बहुत धीमे हैं" },
      votes: 7211
    }
  ]
};

// Columnists data for opinion section
export const COLUMNISTS: Author[] = [
  {
    name: "Dr. Arundhati Kelkar",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    role: "Senior Political Economist",
    bio: "Analysing federal policies and public finance in India for over 25 years. Alumna of Delhi School of Economics."
  },
  {
    name: "Milind Deshmukh",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    role: "Veteran Journalist & Editor",
    bio: "Reporting from the corridors of Mantralaya and Parliament, focusing on agricultural reforms and grassroots politics."
  },
  {
    name: "Sanjay Jha",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    role: "Foreign Policy Specialist",
    bio: "Ex-diplomat with expertise in Indo-Pacific relations, trade agreements, and global geopolitical shifts."
  }
];

const STATIC_MOCK_ARTICLES: Article[] = [
  {
    id: "maha-infra-pack",
    category: "maharashtra",
    city: "mumbai",
    isFeatured: true,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=1200&q=80", // Mumbai Sea Link
    author: {
      name: "Milind Deshmukh",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    },
    date: "June 27, 2026",
    updatedDate: "June 27, 2026, 02:45 PM IST",
    readTime: 6,
    views: 45020,
    likes: 3120,
    commentsCount: 242,
    tags: ["Mumbai Infrastructure", "Maharashtra Government", "Urban Transport", "Mantralaya", "Coastal Road"],
    title: {
      english: "Maharashtra Cabinet Approves Landmark ₹45,000 Crore Infrastructure Package for Mumbai & Thane MMR Region",
      marathi: "मुंबई व ठाणे महानगर क्षेत्रासाठी महाराष्ट्र मंत्रिमंडळाकडून ₹४५,००० कोटींच्या ऐतिहासिक पायाभूत सुविधा पॅकेजला मंजुरी",
      hindi: "महाराष्ट्र कैबिनेट ने मुंबई और ठाणे महानगर क्षेत्र के लिए ₹45,000 करोड़ के ऐतिहासिक बुनियादी ढांचा पैकेज को दी मंजूरी"
    },
    summary: {
      english: "The comprehensive package aims to speed up pending metro phases, build twin-tube subterranean road tunnels connecting prime hubs, and lay major drainage links before heavy monsoons.",
      marathi: "या सर्वसमावेशक पॅकेजचे उद्दिष्ट प्रलंबित मेट्रो टप्प्यांना वेग देणे, प्रमुख केंद्रांना जोडणारे भुयारी दुहेरी बोगदे बांधणे आणि पावसाळ्यापूर्वी मुख्य ड्रेनेज वाहिन्या विकसित करणे हे आहे.",
      hindi: "इस व्यापक पैकेज का उद्देश्य लंबित मेट्रो चरणों में तेजी लाना, प्रमुख केंद्रों को जोड़ने वाली भूमिगत सुरंगों का निर्माण करना और भारी मानसून से पहले ड्रेनेज नेटवर्क का विकास करना है।"
    },
    content: {
      english: [
        "In a major cabinet briefing held at Mantralaya in Mumbai today, the Maharashtra Government announced the approval of a landmark capital allocation package totaling ₹45,000 crores. This funding is dedicated exclusively to the Mumbai Metropolitan Region (MMR) and its rapid infrastructural transformation.",
        "Chief among the approved projects is the fast-tracking of Metro Line 4 and Metro Line 11, which will improve trans-city commutes between the eastern suburbs and South Mumbai. Additionally, detailed feasibility reports have been approved for a subterranean twin-tube road tunnel system intended to cut travel time from Thane to Borivali down to just 15 minutes, bypassing the congested Ghodbunder Road bottlenecks.",
        "Deputy Chief Minister, who also handles the Finance portfolio, stated that the state will raise funds through a mix of low-interest bilateral soft loans and sovereign green infrastructure bonds. 'This is the largest single-day financial commitment towards public transportation and transit-oriented development in Maharashtra’s history,' the minister added.",
        "Environmental groups have raised initial queries regarding forest clearances near Sanjay Gandhi National Park, but government officials assured that the tunnels will run completely underground without disrupting natural forest canopies or tribal habitations in the green lungs of Mumbai."
      ],
      marathi: [
        "मुंबईतील मंत्रालयात आज झालेल्या मंत्रिमंडळाच्या बैठकीत महाराष्ट्र सरकारने मुंबई महानगर क्षेत्राच्या (MMR) पायाभूत सुविधांमध्ये आमूलाग्र बदल घडवून आणण्यासाठी तब्बल ₹४५,००० कोटींच्या ऐतिहासिक विकास आराखड्याला मंजुरी दिली.",
        "या पॅकेजअंतर्गत मेट्रो मार्ग ४ आणि मेट्रो मार्ग ११ च्या प्रलंबित कामांना गती देण्यात येणार आहे, ज्यामुळे पूर्व उपनगरे आणि दक्षिण मुंबई दरम्यानचा प्रवास अत्यंत वेगवान होईल. याशिवाय, ठाणे ते बोरिवली दरम्यानचा प्रवास केवळ १५ मिनिटांत पूर्ण करण्यासाठी संजय गांधी राष्ट्रीय उद्यानाखालून जाणाऱ्या दुहेरी भुयारी बोगद्याच्या कामाला विशेष मान्यता देण्यात आली आहे.",
        "अर्थ खात्याची धुरा सांभाळणाऱ्या उपमुख्यमंत्र्यांनी सांगितले की, राज्य सरकार यासाठी कमी व्याजाचे द्विपक्षीय कर्ज आणि हरित पायाभूत सुविधा बंधपत्रांच्या (Green Bonds) माध्यमातून निधी उभारणार आहे. 'महाराष्ट्राच्या इतिहासातील मुंबईच्या शाश्वत विकासासाठीचा हा आतापर्यंतचा सर्वात मोठा निधी आहे,' असे त्यांनी नमूद केले.",
        "पर्यावरणप्रेमींनी संजय गांधी राष्ट्रीय उद्यानाच्या हद्दीत बोगद्यांमुळे होणाऱ्या परिणामांवर प्रश्नचिन्ह उपस्थित केले असले, तरी भुयारी मार्ग जमिनीच्या खाली खोलवर असल्याने वरील जंगलाला किंवा वन्यजीवांना कोणताही धक्का लागणार नाही, अशी ग्वाही प्रशासनाकडून देण्यात आली आहे."
      ],
      hindi: [
        "मुंबई स्थित मंत्रालय में आज आयोजित कैबिनेट बैठक में महाराष्ट्र सरकार ने मुंबई महानगर क्षेत्र (MMR) के बुनियादी ढांचे के विकास को नई ऊंचाई देने के लिए ₹45,000 करोड़ के ऐतिहासिक पैकेज को मंजूरी दे दी है।",
        "इस पैकेज के मुख्य आकर्षणों में मेट्रो लाइन 4 और मेट्रो लाइन 11 का तीव्र विस्तार शामिल है, जो पूर्वी उपनगरों को सीधे दक्षिण मुंबई से जोड़ेगा। इसके अलावा, ठाणे से बोरीवली के सफर को मात्र 15 मिनट में पूरा करने वाली जुड़वां भूमिगत सुरंग प्रणाली के निर्माण के व्यवहार्यता प्रस्ताव को आधिकारिक स्वीकृति दे दी गई है।",
        "वित्त मंत्रालय का प्रभार संभाल रहे उपमुख्यमंत्री ने बताया कि इसके लिए कम ब्याज दरों पर अंतर्राष्ट्रीय संस्थाओं से ऋण और सॉवरेन ग्रीन बॉन्ड जारी किए जाएंगे। उन्होंने कहा, 'यह राज्य के इतिहास में सार्वजनिक परिवहन के बुनियादी ढांचे के लिए एक दिन में दी गई सबसे बड़ी राशि है।'",
        "संजय गांधी राष्ट्रीय उद्यान के पास वन मंजूरी को लेकर पर्यावरण संगठनों ने कुछ चिंताएं जताई हैं, लेकिन अधिकारियों ने स्पष्ट किया कि पूरी सुरंग गहराई में होगी जिससे जंगल और वन्यजीव पूरी तरह सुरक्षित रहेंगे।"
      ]
    }
  },
  {
    id: "monsoon-orange-alert",
    category: "maharashtra",
    city: "mumbai",
    isTrending: true,
    isLive: true,
    image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80", // Monsoon Rain
    author: {
      name: "Janshakti News Desk",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    date: "June 27, 2026",
    updatedDate: "June 27, 2026, 01:10 PM IST",
    readTime: 4,
    views: 65100,
    likes: 1240,
    commentsCount: 94,
    tags: ["Mumbai Monsoon", "IMD Weather Alert", "High Tide", "BMC", "Local Trains"],
    title: {
      english: "LIVE Updates: IMD Issues Orange Alert for Mumbai; Heavy Downpour Disrupts Low-Lying Traffic; Local Trains Delayed",
      marathi: "थेट अपडेट्स: हवामान खात्याकडून मुंबईला 'ऑरेंज अलर्ट'; सखल भागात पाणी साचल्याने वाहतूक संथ, लोकल रेल्वे उशिराने",
      hindi: "लाइव अपडेट: मुंबई में भारी बारिश का 'ऑरेंज अलर्ट' जारी; निचले इलाकों में भरा पानी, लोकल ट्रेनें देरी से चल रहीं"
    },
    summary: {
      english: "An active low-pressure system in the Arabian Sea has triggered heavy convective clouds over Coastal Maharashtra. Citizens are advised to plan non-essential travel carefully.",
      marathi: "अरबी समुद्रात निर्माण झालेल्या कमी दाबाच्या पट्ट्यामुळे कोकण किनारपट्टीवर ढगांची दाटी झाली आहे. गरज नसताना प्रवासाला जाणे टाळण्याचे प्रशासनाचे आवाहन.",
      hindi: "अरब सागर में सक्रिय कम दबाव के क्षेत्र के कारण तटीय महाराष्ट्र में घने बादल छाए हैं। प्रशासन ने नागरिकों को गैर-जरूरी यात्रा से बचने की सलाह दी है।"
    },
    content: {
      english: [
        "The India Meteorological Department (IMD) upgraded its weather warnings for Mumbai, Thane, Palghar, and Raigad districts from Yellow to Orange Alert, indicating heavy to very heavy rainfall of up to 150-200mm over the next 24 hours.",
        "Already, low-lying residential hotspots such as Hindmata, King's Circle, and Andheri Subway are experiencing severe waterlogging up to knee height. The Brihanmumbai Municipal Corporation (BMC) has deployed high-capacity water pump units, but persistent high tide waves are slowing down natural rainwater discharge into the sea.",
        "Central and Western suburban railway lines, the lifeline of millions of Mumbaikars, are reporting operational delays of 15 to 20 minutes due to restricted visibility and minor water levels over the tracks near Kurla and Sion stations. Public bus services have been rerouted across 14 major nodes.",
        "The Chief Minister has reviewed the disaster preparedness levels personally and urged BMC personnel to remain vigilant. Disaster response squads (NDRF) are placed on high standby along the coastlines of Worli, Dadar, and Versova."
      ],
      marathi: [
        "भारतीय हवामान विभागाने (IMD) मुंबई, ठाणे, पालघर आणि रायगड जिल्ह्यांसाठी हवामानाचा इशारा बदलत पिवळ्यावरून थेट 'ऑरेंज अलर्ट' घोषित केला आहे. पुढील २४ तासांत १५० ते २०० मिमी मुसळधार ते अतिमुसळधार पावसाची शक्यता वर्तवण्यात आली आहे.",
        "मुंबईतील हिंदमाता, किंग्ज सर्कल, सायन आणि अंधेरी सबवे या सखल भागात आधीच गुडघाभर पाणी साचले आहे. बृहन्मुंबई महानगरपालिकेने (BMC) पाण्याचा निचरा करण्यासाठी हाय-कॅपॅसिटी पंप तैनात केले आहेत, मात्र समुद्रातील भरतीमुळे पाणी बाहेर वाहून जाण्यात अडथळा येत आहे.",
        "मुंबईकरांची जीवनवाहिनी मानली जाणारी मध्य आणि पश्चिम उपनगरीय रेल्वे सेवा १५ ते २० मिनिटे उशिराने धावत आहे. कुर्ला आणि सायन स्थानकांदरम्यान रुळांवर पाणी साचल्याने वेगमर्यादा लागू करण्यात आली आहे. बेस्टच्या अनेक बसेसचे मार्ग बदलण्यात आले आहेत.",
        "मुख्यमंत्र्यांनी आपत्ती व्यवस्थापन विभागाची तातडीची बैठक घेऊन संपूर्ण परिस्थितीचा आढावा घेतला. वर्ळी, दादर आणि वर्सोवा चौपाटीवर कोणालाही न जाण्याचा इशारा देण्यात आला असून एनडीआरएफच्या तुकड्या हाय अलर्टवर ठेवण्यात आल्या आहेत."
      ],
      hindi: [
        "भारतीय मौसम विज्ञान विभाग (IMD) ने मुंबई, ठाणे, पालघर और रायगढ़ जिलों के लिए येलो अलर्ट को बढ़ाकर 'ऑरेंज अलर्ट' कर दिया है। अगले 24 घंटों के दौरान 150 से 200 मिमी तक भारी बारिश की चेतावनी दी गई है।",
        "मुंबई के हिंदमाता, किंग्स सर्कल और अंधेरी सबवे जैसे निचले इलाकों में घुटनों तक पानी भर गया है। बृहन्मुंबई नगर निगम (BMC) ने जल निकासी के लिए हाई-पावर पंप तैनात किए हैं, हालांकि समुद्र में ऊंची लहरों (हाई टाइड) के कारण पानी की निकासी धीमी गति से हो रही है।",
        "मध्य और पश्चिम रेलवे की लोकल ट्रेन सेवाएं 15 से 20 मिनट की देरी से चल रही हैं। सायन और कुर्ला स्टेशनों के बीच पटरियों पर पानी होने के कारण ट्रेनें धीमी गति से चलाई जा रही हैं। यातायात सुचारू करने के लिए 14 बस रूट डायवर्ट किए गए हैं।",
        "मुख्यमंत्री ने स्वयं राज्य के आपदा प्रबंधन विभाग के साथ समीक्षा बैठक की और अधिकारियों को मुस्तैद रहने का निर्देश दिया। वर्ली, दादर और वर्सोवा चौपाटी पर पुलिस सुरक्षा बढ़ा दी गई है और एनडीआरएफ को सतर्क कर दिया गया है।"
      ]
    },
    liveUpdates: [
      {
        id: "upd-4",
        time: "01:30 PM",
        title: {
          english: "High Tide alert issued for 3:45 PM",
          marathi: "दुपारी ३:४५ वाजता समुद्रात मोठी भरती; धोक्याचा इशारा",
          hindi: "दोपहर 3:45 बजे हाई टाइड का अलर्ट जारी"
        },
        content: {
          english: "BMC confirms high tide waves reaching up to 4.62 meters will hit Mumbai coastline. Citizens urged to stay away from promenades.",
          marathi: "दुपारी ३:४५ वाजता समुद्रात ४.६२ मीटर उंचीच्या लाटा उसळणार असून नागरिकांनी चौपाटीवर फिरणे पूर्णपणे टाळावे.",
          hindi: "बीएमसी ने दोपहर 3:45 बजे समुद्र में 4.62 मीटर ऊंची लहरें उठने की चेतावनी दी है। तटीय क्षेत्रों में जाने से बचें।"
        },
        isPinned: true
      },
      {
        id: "upd-3",
        time: "12:50 PM",
        title: {
          english: "BMC schools to operate normal, but updates being monitored",
          marathi: "शाळांच्या सुट्ट्यांबाबत पालिका स्तरावर निर्णय लवकरच",
          hindi: "स्कूलों की छुट्टियों पर जल्द लिया जा सकता है फैसला"
        },
        content: {
          english: "While schools opened normally today, principal coordinates are advised to let students depart early if precipitation increases in the afternoon.",
          marathi: "सकाळच्या सत्रात शाळा सुरळीत सुरू राहिल्या, परंतु दुपारनंतर पाऊस वाढल्यास पालकांना मुलांना घरी नेण्याची सवलत देण्यात आली आहे.",
          hindi: "सुबह की पाली के स्कूल सामान्य रहे, लेकिन दोपहर के बाद भारी बारिश की स्थिति में बच्चों को सुरक्षित घर पहुंचाने की तैयारी रखने को कहा गया है।"
        }
      },
      {
        id: "upd-2",
        time: "11:15 AM",
        title: {
          english: "Western Railway updates: All lines running",
          marathi: "पश्चिम रेल्वे मार्ग: सर्व गाड्या संथ गतीने धावत आहेत",
          hindi: "पश्चिम रेलवे: सभी ट्रैक पर ट्रेनें धीमी गति से चालू"
        },
        content: {
          english: "No suspension of services, but speed restrictions imposed near marine lines and Mahim curves due to gusty winds.",
          marathi: "गाड्या रद्द झालेल्या नाहीत, परंतु मरिन लाईन्स आणि माहीम परिसरातील वळणांवर जोरदार वाऱ्यामुळे वेग मर्यादित ठेवण्यात आला आहे.",
          hindi: "कोई ट्रेन निरस्त नहीं की गई है, हालांकि तटीय हवाओं के कारण मरीन लाइन्स और माहिम के पास ट्रेनें कम गति पर चलाई जा रही हैं।"
        }
      }
    ]
  },
  {
    id: "politics-national-bill",
    category: "politics",
    isFeatured: false,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80", // Parliament/Government Building
    author: {
      name: "Dr. Arundhati Kelkar",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    date: "June 26, 2026",
    readTime: 5,
    views: 32000,
    likes: 1850,
    commentsCount: 156,
    tags: ["Parliament Session", "National Bill", "Policy Reform", "Opposition Protest"],
    title: {
      english: "New Digital Commerce Bill Tabled in Lok Sabha; Aims to Curb Anti-Competitive Giant Practices",
      marathi: "नवीन डिजिटल व्यापार विधेयक लोकसभेत सादर; बड्या टेक कंपन्यांच्या मक्तेदारीला लगाम घालण्याचे उद्दिष्ट",
      hindi: "नया डिजिटल वाणिज्य विधेयक लोकसभा में पेश; बड़ी टेक कंपनियों के एकाधिकार को रोकने का लक्ष्य"
    },
    summary: {
      english: "The proposed law introduces strict penalties for self-referencing search engines and guarantees localized user data protection under national boundaries.",
      marathi: "प्रस्तावित कायद्यात स्व-संदर्भित शोध इंजिनांसाठी कडक दंडाची तरतूद आहे आणि देशाच्या सीमांतर्गत युझरच्या स्थानिक डेटा संरक्षणाची हमी देण्यात आली आहे.",
      hindi: "प्रस्तावित कानून में खुद को बढ़ावा देने वाले सर्च इंजनों पर सख्त जुर्माने और राष्ट्रीय सीमाओं के भीतर स्थानीय यूजर डेटा सुरक्षा की गारंटी का प्रावधान है।"
    },
    content: {
      english: [
        "The Union Minister of Commerce and Consumer Affairs tabled the controversial and highly anticipated Digital Commerce Bill of 2026 in the Lower House today. This bill is set to radically overhaul the domestic regulatory framework for multi-national technology aggregators and domestic e-commerce conglomerates alike.",
        "If passed, the new legislation will prevent platforms with market dominance from listing their private label products above independent third-party merchants on their search interfaces.",
        "While digital advocacy groups have hailed the protection clauses as a victory for small Indian retailers and startups, representatives of global technology associations have issued a joint statement raising concerns about arbitrary compliance structures and a possible chilling effect on overseas capital investment.",
        "Debates in the Parliament are expected to stretch into the next week, with opposition benches demanding that the bill be referred to a Joint Parliamentary Committee for exhaustive feedback from all digital platform stakeholders."
      ],
      marathi: [
        "केंद्रीय वाणिज्य आणि ग्राहक व्यवहार मंत्र्यांनी आज संसदेत बहुप्रतिक्षित 'डिजिटल व्यापार विधेयक २०२६' सादर केले. हे विधेयक बहुराष्ट्रीय टेक कंपन्या आणि देशांतर्गत ई-कॉमर्स प्लॅटफॉर्म्ससाठीच्या जुन्या नियमांमध्ये मोठे बदल करणार आहे.",
        "नव्या नियमांनुसार, बाजारावर वर्चस्व गाजविणाऱ्या प्लॅटफॉर्म्सना त्यांच्या सर्च रिझल्ट्समध्ये स्वतःच्या ब्रँड्सचे प्रॉडक्ट्स अग्रक्रमाने दाखवण्यास बंदी घातली जाईल. यामुळे लहान किरकोळ विक्रेत्यांना समान संधी मिळेल.",
        "भारतीय स्टार्टअप्स आणि व्यापारी संघटनांनी या विधेयकाचे ऐतिहासिक पाऊल म्हणून स्वागत केले आहे, तर जागतिक तंत्रज्ञान कंपन्यांच्या संघटनांनी मात्र या जाचक अटींमुळे भारतातील थेट परकीय गुंतवणुकीवर नकारात्मक परिणाम होण्याची भीती व्यक्त केली आहे.",
        "संसदेत या विधेयकावर पुढील आठवड्यात जोरदार चर्चा होण्याची शक्यता आहे. विरोधी पक्षांनी हे विधेयक अधिक अभ्यासासाठी संयुक्त संसदीय समितीकडे (JPC) पाठवण्याची मागणी केली आहे."
      ],
      hindi: [
        "केंद्रीय वाणिज्य और उपभोक्ता मामलों के मंत्री ने आज निचले सदन में बहुप्रतीक्षित और दूरगामी 'डिजिटल वाणिज्य विधेयक 2026' पेश किया। यह विधेयक बहुराष्ट्रीय टेक दिग्गजों और घरेलू ई-कॉमर्स कंपनियों के लिए नियामक ढांचे को पूरी तरह से बदल देगा।",
        "यदि यह विधेयक पारित हो जाता है, तो बाजार में एकाधिकार रखने वाले प्लेटफॉर्म्स को अपने प्लेटफॉर्म पर स्वतंत्र व्यापारियों की तुलना में अपने स्वयं के निजी उत्पादों को प्राथमिकता देने की अनुमति नहीं होगी।",
        "भारतीय स्टार्टअप्स और छोटे व्यापारियों ने इसे एक ऐतिहासिक जीत बताया है, जबकि वैश्विक तकनीकी संघों ने एक संयुक्त बयान जारी कर कड़ी अनुपालन शर्तों और विदेशी पूंजी निवेश पर इसके संभावित प्रतिकूल प्रभाव को लेकर चिंता जताई है।",
        "संसद में इस विधेयक पर चर्चा अगले सप्ताह भी जारी रहने की उम्मीद है, वहीं विपक्षी दल इसे संयुक्त संसदीय समिति (जेपीसी) के पास भेजने की मांग कर रहे हैं।"
      ]
    }
  },
  {
    id: "india-green-hydrogen",
    category: "india",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80", // Solar Panels / Clean Tech
    author: {
      name: "Sanjay Jha",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    },
    date: "June 25, 2026",
    readTime: 5,
    views: 18900,
    likes: 920,
    commentsCount: 42,
    tags: ["Green Energy", "Hydrogen Mission", "Sustainability", "Indian Economy"],
    title: {
      english: "India Set to Commission South Asia's Largest Green Hydrogen Plant in Gujarat by October",
      marathi: "गुजरातमध्ये ऑक्टोबरपर्यंत दक्षिण आशियातील सर्वात मोठा 'ग्रीन हायड्रोजन' प्रकल्प कार्यान्वित होणार",
      hindi: "भारत अक्टूबर तक गुजरात में दक्षिण एशिया का सबसे बड़ा 'ग्रीन हाइड्रोजन' संयंत्र शुरू करने के लिए तैयार"
    },
    summary: {
      english: "The mega-facility, backed by a public-private consortium, will produce 50,000 tonnes of zero-emission fuel annually, reducing reliance on natural gas imports.",
      marathi: "सार्वजनिक-खाजगी भागीदारीतून उभारण्यात येणारा हा प्रकल्प दरवर्षी ५०,००० टन शून्य-उत्सर्जन इंधनाची निर्मिती करेल, ज्यामुळे नैसर्गिक वायूच्या आयातीवरील अवलंबित्व कमी होईल.",
      hindi: "सार्वजनिक-निजी साझेदारी से बनने वाला यह विशाल संयंत्र प्रति वर्ष 50,000 टन शून्य-उत्सर्जन ईंधन का उत्पादन करेगा, जिससे प्राकृतिक गैस आयात पर निर्भरता कम होगी।"
    },
    content: {
      english: [
        "In a substantial stride toward achieving national net-zero carbon goals, the Ministry of New and Renewable Energy confirmed that construction on the massive hydrogen facility in Gujarat is entering its final verification phase.",
        "The plant is designed to run entirely on green electricity supplied by adjacent offshore wind and solar farms. It will house cutting-edge gigawatt-scale polymer electrolyte membrane electrolyzers.",
        "Industry experts suggest this project will position India as a viable hub for export-quality green ammonia and hydrogen fuels to European and East Asian markets by 2028."
      ],
      marathi: [
        "देशाचे कार्बन-मुक्तीचे ध्येय गाठण्याच्या दिशेने एक मोठे पाऊल टाकत, केंद्रीय नवीन आणि नवीकरणीय ऊर्जा मंत्रालयाने स्पष्ट केले की गुजरातमधील भव्य हायड्रोजन प्रकल्पाचे काम अंतिम टप्प्यात आले आहे.",
        "हा प्रकल्प शेजारील ऑफशोअर पवन ऊर्जा आणि सौर ऊर्जा प्रकल्पांमधून मिळणाऱ्या शुद्ध विजेवर पूर्णपणे चालवला जाईल, ज्यामुळे पर्यावरणपूरक शून्य-उत्सर्जन इंधन तयार होईल.",
        "तज्ज्ञांच्या मते, हा प्रकल्प भारताला २०२८ पर्यंत युरोपियन आणि पूर्व आशियाई देशांमध्ये उच्च दर्जाचे हरित अमोनिया आणि हायड्रोजन निर्यातीचे मुख्य केंद्र बनवू शकतो."
      ],
      hindi: [
        "देश को कार्बन-मुक्त बनाने के लक्ष्य की दिशा में एक बड़ा कदम उठाते हुए, नवीन और नवीकरणीय ऊर्जा मंत्रालय ने पुष्टि की है कि गुजरात में विशाल हाइड्रोजन संयंत्र का निर्माण कार्य अंतिम चरण में प्रवेश कर चुका है।",
        "यह संयंत्र पूरी तरह से पास के पवन और सौर ऊर्जा पार्कों से मिलने वाली बिजली से संचालित होगा और इसमें गीगावाट-स्तर के आधुनिक इलेक्ट्रोलाइजर का उपयोग किया जाएगा।",
        "उद्योग विशेषज्ञों का मानना है कि यह परियोजना भारत को 2028 तक यूरोपीय और पूर्वी एशियाई देशों में निर्यात-गुणवत्ता वाले ग्रीन अमोनिया और हाइड्रोजन के एक वैश्विक हब के रूप में स्थापित करेगी।"
      ]
    }
  },
  {
    id: "business-gst-collection",
    category: "business",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80", // Financial Charts
    author: {
      name: "Dr. Arundhati Kelkar",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    date: "June 24, 2026",
    readTime: 4,
    views: 29800,
    likes: 1100,
    commentsCount: 88,
    tags: ["GST Collection", "Indian Markets", "Economy Growth", "Finance Ministry"],
    title: {
      english: "GST Collections Hit Record High of ₹1.98 Lakh Crore, Signalling Robust Domestic Consumption",
      marathi: "जीएसटी (GST) महसुलाने गाठला ₹१.९८ लाख कोटींचा ऐतिहासिक टप्पा; देशांतर्गत मागणीत मोठी वाढ",
      hindi: "जीएसटी संग्रह ₹1.98 लाख करोड़ के रिकॉर्ड स्तर पर पहुंचा; घरेलू खपत में भारी उछाल के संकेत"
    },
    summary: {
      english: "Robust economic activity and tighter compliance frameworks have propelled indirect tax receipts by 12.5% year-on-year, providing substantial fiscal breathing room.",
      marathi: "औद्योगिक प्रगती आणि कर चुकवेगिरी रोखण्यासाठी केलेल्या कडक नियमांमुळे जीएसटी संकलनात वार्षिक साडेबारा टक्के वाढ झाली आहे.",
      hindi: "सक्रिय आर्थिक गतिविधियों और बेहतर अनुपालन के कारण जीएसटी कर संग्रह में सालाना 12.5% की वृद्धि दर्ज की गई है, जिससे राजकोष को बड़ी राहत मिली है।"
    },
    content: {
      english: [
        "Government coffers recorded their strongest-ever monthly inflow from the Goods and Services Tax (GST), falling just short of the landmark ₹2 lakh crore monthly milestone.",
        "The steady rise in collection indicates resilient rural demand and sustained urban spending on consumer durables, automobiles, and luxury services.",
        "Economists believe this surge will allow the central and state governments to stick to their fiscal deficit reduction targets while maintaining public infrastructure capital expenditure."
      ],
      marathi: [
        "वस्तू व सेवा कर (GST) संकलनाने या महिन्यात नवा विक्रम प्रस्थापित केला असून, एकूण कर संकलन ₹१.९८ लाख कोटींवर पोहोचले आहे, जे २ लाख कोटींच्या अगदी जवळ आहे.",
        "ग्रामीण भागात सुधारलेली मागणी आणि शहरी भागात ग्राहकांकडून विविध वस्तू, वाहने आणि चैनीच्या सेवांवर होणारा खर्च यामुळे हे कर संकलन वाढले आहे.",
        "या महसुली वाढीमुळे सरकारला वित्तीय तूट नियंत्रित ठेवण्यासोबतच पायाभूत सुविधांवरील सार्वजनिक खर्च सुरू ठेवण्यास मोठी मदत होणार आहे, असे मत अर्थतज्ज्ञांनी व्यक्त केले."
      ],
      hindi: [
        "वस्तु एवं सेवा कर (जीएसटी) संग्रह में इस महीने शानदार वृद्धि देखी गई और कुल संग्रह ₹1.98 लाख करोड़ की रिकॉर्ड ऊंचाई पर पहुंच गया, जो ₹2 लाख करोड़ के स्तर से थोड़ा ही दूर है।",
        "संग्रह में निरंतर वृद्धि ग्रामीण क्षेत्रों में मांग में सुधार और उपभोक्ता वस्तुओं, ऑटोमोबाइल और सेवाओं पर शहरी उपभोक्ताओं के निरंतर खर्च को दर्शाती है।",
        "अर्थशास्त्रियों का मानना है कि इस राजस्व वृद्धि से केंद्र और राज्य सरकारों को बुनियादी ढांचागत व्यय बनाए रखने के साथ-साथ वित्तीय घाटे के लक्ष्यों को हासिल करने में बड़ी मदद मिलेगी।"
      ]
    }
  },
  {
    id: "tech-generative-india",
    category: "technology",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", // AI Circuit Board
    author: {
      name: "Janshakti Tech Desk",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
    },
    date: "June 23, 2026",
    readTime: 5,
    views: 41200,
    likes: 2450,
    commentsCount: 130,
    tags: ["Artificial Intelligence", "Indian Tech", "SaaS Startup", "Language Models"],
    title: {
      english: "IndiLLM: Indian AI Consortium Unveils Multilingual AI Model Supporting 22 Official Languages",
      marathi: "इंडी-एलएलएम (IndiLLM): २२ अधिकृत भाषांना सपोर्ट करणाऱ्या भारताच्या स्वतःच्या एआय (AI) मॉडेलचे अनावरण",
      hindi: "IndiLLM: भारतीय एआई कंसोर्टियम ने 22 आधिकारिक भाषाओं को सपोर्ट करने वाले नए एआई मॉडल का किया अनावरण"
    },
    summary: {
      english: "Trained entirely on sovereign Indian supercomputing networks, the model aims to democratize localized digital governance and financial inclusion across rural sectors.",
      marathi: "भारताच्या स्वतःच्या सुपरकंप्युटिंग नेटवर्कवर प्रशिक्षित केलेले हे एआय मॉडेल ग्रामीण भागात डिजिटल प्रशासन आणि बँकिंग सेवा सुलभ करणार आहे.",
      hindi: "भारतीय सुपरकंप्यूटिंग नेटवर्क पर पूरी तरह से प्रशिक्षित यह मॉडल ग्रामीण क्षेत्रों में डिजिटल शासन और वित्तीय समावेशन को लोकतांत्रिक बनाने का लक्ष्य रखता है।"
    },
    content: {
      english: [
        "A coalition of premier Indian institutes (IITs) alongside a cluster of key SaaS startups today released 'IndiLLM', a state-of-the-art foundational large language model.",
        "Unlike commercial models trained mostly on English corpora, IndiLLM understands cultural nuances, regional dialects, and complex scripts of all 22 scheduled regional languages including Marathi, Hindi, Tamil, and Bengali.",
        "The model is being released under an open-source license for public development, allowing developers to build localized agrarian apps and voice-activated medical consulting programs."
      ],
      marathi: [
        "भारतीय तंत्रज्ञान संस्था (IIT) आणि अग्रगण्य तंत्रज्ञान स्टार्ट-अप्सच्या संयुक्त पुढाकाराने आज 'IndiLLM' या अत्याधुनिक भारतीय कृत्रिम बुद्धिमत्ता (AI) मॉडेलचे अधिकृत प्रकाशन करण्यात आले.",
        "केवळ इंग्रजीवर आधारित जागतिक मॉडेल्सच्या तुलनेत, IndiLLM हे भारतातील २२ प्रादेशिक भाषांमधील सांस्कृतिक बारकावे, बोलीभाषा आणि क्लिष्ट व्याकरण अचूकपणे समजून घेऊ शकते.",
        "हे मॉडेल डेव्हलपर्ससाठी मोफत आणि ओपन-सोर्स स्वरूपात उपलब्ध करून देण्यात आले आहे, जेणेकरून शेतकऱ्यांसाठीचे ॲप्स आणि प्रादेशिक भाषांमधील टेलिमेडिसिन सेवा विकसित करणे सोपे होईल."
      ],
      hindi: [
        "भारतीय प्रौद्योगिकी संस्थानों (आईआईटी) और प्रमुख प्रौद्योगिकी स्टार्टअप्स के एक संघ ने आज भारत के अपने स्वदेशी भाषाई मॉडल 'IndiLLM' का अनावरण किया है।",
        "वैश्विक अंग्रेजी-केंद्रित मॉडेलों के विपरीत, IndiLLM को भारत की सांस्कृतिक विविधताओं और संविधान की 8वीं अनुसूची में शामिल सभी 22 आधिकारिक भाषाओं (मराठी, हिंदी, तमिल, बंगाली आदि) के लिए विशेष रूप से ट्यून किया गया है।",
        "इस मॉडल को सार्वजनिक विकास के लिए ओपन-सोर्स लाइसेंस के तहत जारी किया गया है, जिससे ग्रामीण कृषि ऐप्स और स्थानीय भाषा-सक्षम स्वास्थ्य परामर्श सॉफ्टवेयर विकसित किए जा सकेंगे।"
      ]
    }
  },
  {
    id: "sports-t20-world",
    category: "sports",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80", // Cricket Stadium/Stadium Lights
    author: {
      name: "Janshakti Sports Desk",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80"
    },
    date: "June 27, 2026",
    readTime: 4,
    views: 54000,
    likes: 4210,
    commentsCount: 310,
    tags: ["Indian Cricket Team", "World Cup", "Cricket News", "Match Report"],
    title: {
      english: "India Clinches Semi-Final Berth with Thrilling Last-Over Victory Against Australia",
      marathi: "रोमांचक सामन्यात ऑस्ट्रेलियाचा अखेरच्या षटकात पराभव; भारताची उपांत्य फेरीत दिमाखात एन्ट्री",
      hindi: "अंतिम ओवर के रोमांचक मुकाबले में ऑस्ट्रेलिया को हराया; भारत सेमीफाइनल में पहुंचा"
    },
    summary: {
      english: "An extraordinary bowling spell in the death overs and a brilliant unbeaten half-century guided India to victory in a high-octane Super 8 match.",
      marathi: "अंतिम षटकातील उत्कृष्ट गोलंदाजी आणि फलंदाजाच्या नाबाद अर्धशतकी खेळीच्या जोरावर भारताने थरारक सामन्यात दणदणीत विजय मिळवला.",
      hindi: "डेथ ओवरों में शानदार गेंदबाजी और बेहतरीन नाबाद अर्धशतक की बदौलत भारत ने सुपर 8 के एक बेहद रोमांचक मैच में जीत दर्ज की।"
    },
    content: {
      english: [
        "In what will be remembered as an absolute classic, India defeated Australia by 12 runs to seal their ticket to the semi-finals of the international tournament.",
        "Chasing a target of 188 on a sticky pitch, Australia needed 15 runs in the final over. India's star death bowler executed three consecutive perfect yorkers, rattling the wickets and sealing the historic match.",
        "The skipper praised the team's resilience under immense pressure. 'We never lost belief, and our bowlers executed the plans perfectly during crunch moments,' he told the post-match conference."
      ],
      marathi: [
        "क्रीडा जगतात दीर्घकाळ लक्षात राहील अशा एका थरारक सामन्यात भारताने ऑस्ट्रेलियाचा १२ धावांनी पराभव करून थेट उपांत्य फेरीत धडक मारली आहे.",
        "१८८ धावांच्या लक्ष्याचा पाठलाग करताना ऑस्ट्रेलियाला शेवटच्या षटकात १५ धावांची गरज होती. भारताच्या स्टार वेगवान गोलंदाजाने सलग तीन उत्कृष्ट यॉर्कर टाकून ऑस्ट्रेलियाला बाद केले आणि सामना भारताच्या झोळीत टाकला.",
        "कर्णधाराने सामन्यातील खेळाडूंच्या जिद्दीचे कौतुक केले. 'आम्ही शेवटपर्यंत विश्वास गमावला नाही आणि दबावाच्या क्षणी गोलंदाजांनी योजनांची अचूक अंमलबजावणी केली,' असे त्याने पत्रकार परिषदेत सांगितले."
      ],
      hindi: [
        "एक ऐतिहासिक और रोमांचक मुकाबले में भारत ने ऑस्ट्रेलिया को 12 रनों से हराकर टूर्नामेंट के सेमीफाइनल का टिकट पक्का कर लिया है।",
        "एक कठिन पिच पर 188 रनों के लक्ष्य का पीछा करते हुए ऑस्ट्रेलिया को आखिरी ओवर में 15 रनों की जरूरत थी। भारत के स्टार डेथ ओवर स्पेशलिस्ट गेंदबाज ने लगातार तीन सटीक यॉर्कर फेंककर मैच भारत के नाम कर दिया।",
        "कप्तान ने मैच के बाद टीम के जुझारूपन की सराहना की और कहा, 'दबाव के क्षणों में भी हमें खुद पर भरोसा था और गेंदबाजों ने रणनीति को मैदान पर बखूबी उतारा।'"
      ]
    }
  },
  {
    id: "opinion-milind-rural",
    category: "opinion",
    columnist: true,
    columnName: { english: "Grassroots Grid", marathi: "गावगाडा", hindi: "ग्रामीण ग्रिड" },
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", // Indian Agrarian Landscape
    author: {
      name: "Milind Deshmukh",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
      role: "Veteran Journalist & Editor"
    },
    date: "June 26, 2026",
    readTime: 6,
    views: 12500,
    likes: 840,
    commentsCount: 65,
    tags: ["Rural Economy", "Agrarian Policy", "Maharashtra Agriculture", "Water Conservation"],
    title: {
      english: "The Rural Paradox: Balancing Gigantic Infra Dreams with Ground Agrarian Reality in Maharashtra",
      marathi: "गाव आणि मेट्रोचा ताळमेळ: पायाभूत सुविधांची स्वप्ने आणि महाराष्ट्रातील शेतीचे वास्तव",
      hindi: "ग्रामीण विरोधाभास: बुनियादी ढांचागत सपनों और महाराष्ट्र की जमीनी कृषि हकीकत में संतुलन"
    },
    summary: {
      english: "While urban Maharashtra welcomes rapid transit and concrete bypasses, rural agricultural sectors require urgent micro-irrigation and storage cold networks.",
      marathi: "महाराष्ट्रातील शहरे वेगवान मेट्रोने जोडली जात असतानाच, ग्रामीण भागातील बळीराजाला सूक्ष्म-सिंचन आणि कृषी साठवणूक शीतगृहांची तातडीने गरज आहे.",
      hindi: "जहां एक ओर शहरी महाराष्ट्र आधुनिक मेट्रो से जुड़ रहा है, वहीं ग्रामीण कृषि क्षेत्रों को सूक्ष्म-सिंचाई और शीतगृह भंडारण नेटवर्क की तत्काल आवश्यकता है।"
    },
    content: {
      english: [
        "In our rush to erect shining highways, the silent agrarian distress often gets pushed to the back pages. This column explores how agricultural pricing and storage shortages continue to affect farmers despite overall fiscal growth.",
        "Monsoon shifts require decentralized check-dams and micro-irrigation networks rather than merely massive dam channels that often bypass small farms.",
        "For Maharashtra to truly emerge as a balanced state, its capital expenditure must bridge the sharp contrast between the shining high-rises of Mumbai and the dry fields of Vidarbha and Marathwada."
      ],
      marathi: [
        "नवे महामार्ग आणि चकाचक उड्डाणपूल बांधण्याच्या घाईत, शेती आणि ग्रामीण भागातील प्रश्न अनेकदा दुर्लक्षित राहतात. हा लेख एकूण आर्थिक विकासाच्या पार्श्वभूमीवर शेतकऱ्यांच्या साठवणूक आणि हमीभावाच्या समस्यांवर प्रकाश टाकतो.",
        "हवामानातील बदलांना तोंड देण्यासाठी मोठ्या धरणांपेक्षा गावोगावी शेततळी आणि विकेंद्रित सूक्ष्म-सिंचन प्रणाली उभारणे अत्यंत गरजेचे आहे.",
        "महाराष्ट्राचा समतोल विकास साधायचा असेल, तर मुंबईतील उत्तुंग इमारती आणि विदर्भ-मराठवाड्यातील कोरडे कोरडवाहू शेत यांमधील दरी मिटवणारे आर्थिक नियोजन करायला हवे."
      ],
      hindi: [
        "चमचमाते राजमार्गों और बड़े शहरों के निर्माण के शोर में अक्सर ग्रामीण क्षेत्रों और किसानों की समस्याएं पीछे छूट जाती हैं। यह लेख राज्य के कुल आर्थिक विकास के बीच कृषि उपज के भंडारण और मूल्य निर्धारण से जुड़ी समस्याओं पर रोशनी डालता है।",
        "जलवायु परिवर्तन से निपटने के लिए विशालकाय बांधों के बजाय विकेंद्रीकृत सूक्ष्म-सिंचाई प्रणालियों और स्थानीय स्तर पर कृषि तालाबों के निर्माण पर जोर दिया जाना चाहिए।",
        "यदि हम महाराष्ट्र का संतुलित विकास चाहते हैं, तो हमारे नीतिगत खर्चों को मुंबई के गगनचुंबी भवनों और विदर्भ तथा मराठवाड़ा के सूखे खेतों के बीच के अंतर को कम करना होगा।"
      ]
    }
  },
  {
    id: "world-summit",
    category: "world",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", // Globe from space
    author: {
      name: "Sanjay Jha",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    },
    date: "June 24, 2026",
    readTime: 5,
    views: 14200,
    likes: 560,
    commentsCount: 22,
    tags: ["Climate Summit", "Global Policy", "United Nations", "Renewable Energy"],
    title: {
      english: "Global Climate Summit in Geneva Adopts Strict Green Trade Tariffs Frame for 2030",
      marathi: "जिनेव्हा जागतिक हवामान परिषदेत २०३० पर्यंत हरित व्यापार शुल्क लागू करण्याचा ठराव मंजूर",
      hindi: "जिनेवा वैश्विक जलवायु शिखर सम्मेलन में 2030 तक कड़े हरित व्यापार शुल्क ढांचे को मिली मंजूरी"
    },
    summary: {
      english: "Over 140 countries agreed to impose carbon borders adjustment tariffs on high-emission raw steel, concrete, and energy imports starting next decade.",
      marathi: "पुढील दशकापासून कार्बन उत्सर्जन करणाऱ्या पोलाद, सिमेंट आणि कच्च्या मालाच्या आयातीवर विशेष कर लावण्यावर १४० हून अधिक देशांचे एकमत.",
      hindi: "अगले दशक से अधिक कार्बन उत्सर्जन करने वाले इस्पात, सीमेंट और ऊर्जा आयात पर कार्बन टैक्स लगाने को लेकर 140 से अधिक देश सहमत हुए।"
    },
    content: {
      english: [
        "In a historic international treaty concluded in Geneva, delegation leads voted on the final clauses of the clean trade rules.",
        "The agreement marks the first time that carbon taxes are being codified into direct trade boundaries, causing some initial friction with emerging manufacturing countries.",
        "Developing nations won some concessions on transition grants, securing a separate financial mechanism of $120 billion to upgrade older industrial facilities."
      ],
      marathi: [
        "जिनेव्हा येथे झालेल्या एका ऐतिहासिक आंतरराष्ट्रीय परिषदेत, अनेक देशांच्या प्रतिनिधींनी पर्यावरणपूरक व्यापाराच्या नवीन नियमांना मंजुरी दिली आहे.",
        "या करारामुळे पहिल्यांदाच जागतिक आयात-निर्यातीवर कार्बन उत्सर्जनाच्या आधारे थेट कर आकारला जाणार आहे. यामुळे अनेक विकसनशील देशांसोबत काही मतभेद निर्माण झाले आहेत.",
        "तथापि, विकसनशील देशांना जुन्या कारखान्यांचे आधुनिकीकरण करण्यासाठी १२० अब्ज डॉलर्सचा स्वतंत्र जागतिक निधी मंजूर करून काही दिलासा देण्यात आला आहे."
      ],
      hindi: [
        "जिनेवा में आयोजित एक ऐतिहासिक अंतर्राष्ट्रीय शिखर सम्मेलन में, वैश्विक प्रतिनिधियों ने पर्यावरण-अनुकूल व्यापार नियमों पर अंतिम सहमति व्यक्त की है।",
        "इस समझौते के तहत पहली बार कार्बन उत्सर्जन की मात्रा के आधार पर आयात-निर्यात शुल्क तय किया जाएगा, जिससे औद्योगिक देशों के बीच शुरुआती बहस छिड़ गई है।",
        "हालांकि, विकासशील देशों को अपनी पुरानी औद्योगिक इकाइयों को आधुनिक बनाने के लिए 120 अरब डॉलर का वैश्विक सहायता कोष आवंटित कर बड़ी राहत दी गई है।"
      ]
    }
  },
  {
    id: "video-vande-bharat",
    category: "maharashtra",
    city: "pune",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-train-moving-on-railway-tracks-42790-large.mp4",
    image: "https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=800&q=80", // Fast Train
    author: {
      name: "Janshakti Video Desk",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "June 27, 2026",
    readTime: 3, // Duration in minutes/seconds representation
    views: 84000,
    likes: 5400,
    commentsCount: 198,
    tags: ["Vande Bharat", "Indian Railways", "High Speed Train", "Mumbai-Pune"],
    title: {
      english: "Inside Look: Maharashtra’s New Sleeper Vande Bharat Train Clocking 160 Kmph on Trial Runs",
      marathi: "नवा थरार: महाराष्ट्रातील नवीन वंदे भारत स्लीपर ट्रेनची ताशी १६० किमी वेगाने यशस्वी चाचणी",
      hindi: "अंदर का नजारा: महाराष्ट्र की नई वंदे भारत स्लीपर ट्रेन ने ट्रायल रन में छुई 160 किमी प्रति घंटे की रफ्तार"
    },
    summary: {
      english: "Watch our exclusive footage of the state-of-the-art sleeper coach train being tested along the rugged Western Ghats ghat section with automated anti-derailment guards.",
      marathi: "पश्चिम घाटातील आव्हानात्मक वळणावर घेतलेल्या अत्याधुनिक वंदे भारत स्लीपर ट्रेनच्या चाचणीचे विशेष व्हिडिओ फुटेज पहा.",
      hindi: "पश्चिमी घाट के चुनौतीपूर्ण मोड़ों पर नई अत्याधुनिक वंदे भारत स्लीपर ट्रेन के ट्रायल रन का हमारा विशेष वीडियो कवरेज देखें।"
    },
    content: {
      english: [
        "Watch this exclusive video detailing the structural and passenger comfort upgrades in India's next-generation sleeper express train.",
        "The train features fully premium vacuum bio-toilets, touch-activated automatic cabin sliders, and dynamic thermal sensors that adjust temperature based on occupant load.",
        "The routes will connect Mumbai to key pilgrimage and business capitals like Nagpur, Nanded, and Kolhapur, cutting over 4 hours off typical journeys."
      ],
      marathi: [
        "भारताच्या पुढील पिढीतील स्लीपर एक्स्प्रेस ट्रेनमधील प्रवाशांच्या सुखसोयी आणि डिझाइनमधील बदलांची विशेष माहिती देणारा हा व्हिडिओ पहा.",
        "या ट्रेनमध्ये आधुनिक व्हॅक्यूम बायो-टॉयलेट्स, ऑटोमॅटिक स्लाइडिंग दरवाजे आणि प्रवाशांच्या संख्येनुसार तापमान बदलणारे थर्मल सेन्सर्स बसवण्यात आले आहेत.",
        "हा रेल्वे मार्ग मुंबईला नागपूर, नांदेड आणि कोल्हापूर या प्रमुख शहरांशी जोडेल, ज्यामुळे प्रवासाचा वेळ ४ तासांनी कमी होईल."
      ],
      hindi: [
        "भारत की अगली पीढ़ी की प्रीमियम स्लीपर एक्सप्रेस ट्रेन की आधुनिक सुविधाओं और डिजाइन को करीब से देखने के लिए हमारा यह विशेष वीडियो देखें।",
        "इस ट्रेन में वैक्यूम बायो-टॉयलेट, ऑटोमैटिक स्लाइडिंग दरवाजे और यात्रियों की संख्या के हिसाब से तापमान नियंत्रित करने वाले स्मार्ट सेन्सर्स लगाए गए हैं।",
        "यह ट्रेन सेवा मुंबई को नागपुर, नांदेड़ और कोल्हापुर जैसे प्रमुख शहरों से जोड़ेगी, जिससे यात्रा के समय में 4 घंटे से अधिक की कमी आएगी।"
      ]
    }
  },
  {
    id: "gallery-mumbai-monsoon",
    category: "lifestyle",
    imagesGallery: [
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80", // Rain street
      "https://images.unsplash.com/photo-1508697014387-db70afd36b6a?auto=format&fit=crop&w=800&q=80", // Gateway of India Rain
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80", // Green hills
      "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?auto=format&fit=crop&w=800&q=80"  // Tea cup in rain
    ],
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Janshakti Photo Team",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "June 27, 2026",
    readTime: 4,
    views: 31000,
    likes: 1980,
    commentsCount: 30,
    tags: ["Mumbai Rain Photos", "Monsoon Visuals", "Western Ghats", "Travel Maharashtra"],
    title: {
      english: "Photo Story: The Visual Poetry of Mumbai and Lonavala Hills Glistening Under First Monsoons",
      marathi: "छायाचित्र दालन: पहिल्या पावसाच्या वर्षावात न्हाऊन निघालेली मुंबई आणि लोणावळ्याची निसर्गरम्य दृश्ये",
      hindi: "फोटो गैलरी: पहली मानसूनी बारिश में भीगी मुंबई और लोनावला की खूबसूरत वादियों का अद्भुत नज़ारा"
    },
    summary: {
      english: "An aesthetic collection capturing the joy of first showers, bustling marine lines tea vendors, and the mist-laden peaks of the Western Ghats.",
      marathi: "पहिल्या पावसाचा आनंद, मरीन लाईन्सवरील चहाच्या टपऱ्या आणि धुक्यात हरवलेले सह्याद्रीचे कडे टिपणारा एक सुंदर संग्रह.",
      hindi: "पहली फुहारों की खुशी, मरीन लाइन्स पर चाय का लुत्फ उठाते लोग और कोहरे की चादर में लिपटे पश्चिमी घाट की सुंदर तस्वीरें।"
    },
    content: {
      english: [
        "Our photojournalists bring you a spectacular series of snapshots celebrating life as the sky opens over Coastal Maharashtra.",
        "From tea steam rising in local stalls to the massive green waterfalls cascading down Lonavala's Tiger Point, explore the sights of the season.",
        "Click on any image to view in full immersive details and read the stories behind each snapshot."
      ],
      marathi: [
        "कोकण किनारपट्टीवर पाऊस बरसू लागल्यानंतरचे जनजीवन टिपणारा हा एक अप्रतिम फोटो संग्रह आमच्या प्रतिनिधींनी खास तुमच्यासाठी आणला आहे.",
        "टपरीवरील गरम वाफाळणारा चहा, पावसाळी गेटवे ऑफ इंडिया ते लोणावळ्यातील धबधबे अशा विहंगम दृश्यांचा आनंद घ्या.",
        "कोणत्याही फोटोवर क्लिक करून तो फुल-स्क्रीन मोडमध्ये पहा आणि त्यामागील रंजक माहिती वाचा."
      ],
      hindi: [
        "तटीय महाराष्ट्र में बारिश शुरू होने के बाद आम जनजीवन की खूबसूरती को दर्शाती हमारे फोटो पत्रकारों की यह विशेष सीरीज देखें।",
        "मरीन लाइन्स पर चाय की टपरी से उठती भाप से लेकर लोनावला के खूबसूरत झरनों तक, इस सुहाने मौसम की तस्वीरें मन मोह लेंगी।",
        "किसी भी तस्वीर पर क्लिक करके उसे फुल-स्क्रीन मोड में देखें और उसके पीछे की कहानी जानें।"
      ]
    }
  },
  {
    id: "pune-ring-road",
    category: "maharashtra",
    city: "pune",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Sanjay Joshi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
    },
    date: "June 27, 2026",
    readTime: 4,
    views: 18200,
    likes: 920,
    commentsCount: 45,
    tags: ["Pune Infrastructure", "Ring Road", "PMRDA", "Land Acquisition"],
    title: {
      english: "Pune Ring Road Project Fast-Tracked; Land Acquisition Complete in 12 Key Villages",
      marathi: "पुणे रिंग रोड प्रकल्पाला वेग; १२ महत्त्वाच्या गावांमधील भूसंपादन प्रक्रिया पूर्ण",
      hindi: "पुणे रिंग रोड परियोजना में आई तेजी; 12 मुख्य गांवों में भूमि अधिग्रहण का काम पूरा"
    },
    summary: {
      english: "The outer ring road project aimed at decongesting Pune's urban traffic has reached a major milestone with successful land registration and compensation payouts.",
      marathi: "पुण्यातील वाहतूक कोंडी फोडण्यासाठी आखण्यात आलेल्या रिंग रोड प्रकल्पाच्या भूसंपादनाचा आणि मोबदला वाटपाचा पहिला टप्पा यशस्वीरित्या पूर्ण झाला आहे.",
      hindi: "पुणे शहर में ट्रैफिक जाम से मुक्ति दिलाने वाली बाहरी रिंग रोड परियोजना ने भूमि अधिग्रहण और मुआवजा वितरण का पहला चरण पूरा कर लिया है।"
    },
    content: {
      english: [
        "In a major development for Pune's transit planning, the Maharashtra State Road Development Corporation (MSRDC) announced that land acquisition for the eastern and western phases of the Pune Ring Road has crossed the 90% mark across 12 crucial villages.",
        "District authorities have distributed over ₹1,200 crores in direct compensation to affected landowners. The Ring Road will be a 128-km long circular highway designed for speeds of up to 120 kmph, which will bypass all heavy vehicles currently passing through the core city lanes.",
        "Work on the ground is expected to commence by October 2026, with the state targeting completion before the end of 2029."
      ],
      marathi: [
        "पुण्याच्या वाहतूक नियोजनात एक मोठी प्रगती झाली आहे. महाराष्ट्र राज्य रस्ते विकास महामंडळाने (MSRDC) जाहीर केले आहे की, पुणे रिंग रोडच्या पूर्व आणि पश्चिम टप्प्यातील भूसंपादनाने १२ महत्त्वाच्या गावांमध्ये ९०% चा टप्पा ओलांडला आहे.",
        "जिल्हा प्रशासनाने बाधित जमीनमालकांना थेट बँक खात्यात ₹१,२०० कोटींहून अधिक नुकसान भरपाई वाटप केली आहे. हा रिंग रोड १२८ किलोमीटर लांबीचा वर्तुळाकार महामार्ग असेल, ज्यामुळे पुण्यात येणारी अवजड वाहतूक शहराबाहेरूनच वळवली जाईल.",
        "या महामार्गाचे प्रत्यक्ष काम ऑक्टोबर २०२६ पासून सुरू होणार असून २०२९ अखेरपर्यंत हा प्रकल्प पूर्ण करण्याचे उद्दिष्ट ठेवण्यात आले आहे."
      ],
      hindi: [
        "पुणे के यातायात नियोजन के लिए एक बड़ी खबर है। महाराष्ट्र राज्य सड़क विकास निगम (MSRDC) ने घोषणा की है कि पुणे रिंग रोड के पूर्वी और पश्चिमी चरणों के लिए 12 महत्वपूर्ण गांवों में भूमि अधिग्रहण का काम 90% पूरा हो चुका है।",
        "जिला प्रशासन ने प्रभावित भूस्वामियों को सीधे बैंक खातों में ₹1,200 करोड़ से अधिक का मुआवजा वितरित किया है। यह रिंग रोड 128 किलोमीटर लंबा एक सर्कुलर एक्सप्रेसवे होगा जो शहर के भीतर भारी वाहनों के प्रवेश को रोकेगा।",
        "इस एक्सप्रेसवे का जमीनी काम अक्टूबर 2026 से शुरू होने की उम्मीद है, और सरकार ने इसे 2029 के अंत तक पूरा करने का लक्ष्य रखा है।"
      ]
    }
  },
  {
    id: "jalgaon-banana-record",
    category: "maharashtra",
    city: "jalgaon",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Ramesh Patil",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
    },
    date: "June 27, 2026",
    readTime: 5,
    views: 22400,
    likes: 1350,
    commentsCount: 68,
    tags: ["Jalgaon Bananas", "GI Tag", "Agricultural Exports", "Khandesh Farming"],
    title: {
      english: "Jalgaon Banana Export Market Touches Record ₹500 Crore Business This Season",
      marathi: "जळगावच्या केळी निर्यातीने गाठला ₹५०० कोटींचा ऐतिहासिक टप्पा; जगभरात जळगावच्या केळीची हवा",
      hindi: "जलगांव के केला निर्यात बाजार ने इस सीजन में छुआ ₹500 करोड़ का रिकॉर्ड व्यापार"
    },
    summary: {
      english: "Jalgaon's famous GI-tagged bananas have recorded unprecedented demand in Gulf countries and European markets, boosting local farmers' incomes.",
      marathi: "जळगावच्या प्रसिद्ध जीआय-टॅग (भौगोलिक मानांकन) असलेल्या केळीला आखाती देश आणि युरोपियन बाजारात मोठी मागणी मिळाली आहे, ज्यामुळे शेतकऱ्यांच्या उत्पन्नात मोठी वाढ झाली आहे.",
      hindi: "जलगांव के प्रसिद्ध जीआई-टैग प्राप्त केले की खाड़ी देशों और यूरोपीय बाजारों में अभूतपूर्व मांग दर्ज की गई है, जिससे स्थानीय किसानों की आय में भारी उछाल आया है।"
    },
    content: {
      english: [
        "Jalgaon district, popularly known as the Banana City of India, has established a new milestone in agricultural trade. According to the Agricultural and Processed Food Products Export Development Authority (APEDA), banana exports from the region reached ₹500 crores in the current fiscal year.",
        "Over 8,000 metric tonnes of premium bananas were shipped directly from Jalgaon to Dubai, Saudi Arabia, Oman, and several European ports. Enhanced cold storage supply chains and modern packaging centers built in Raver and Yawal talukas have dramatically reduced post-harvest losses.",
        "Local farmer collectives expressed immense joy, noting that direct export contracts helped them fetch up to 40% higher rates compared to regional wholesale mandis."
      ],
      marathi: [
        "भारताची 'केळीची राजधानी' म्हणून ओळखल्या जाणाऱ्या जळगाव जिल्ह्याने कृषी व्यापारात एक नवा विक्रम प्रस्थापित केला आहे. या चालू आर्थिक वर्षात जळगावच्या केळी निर्यातीने ₹५०० कोटींचा टप्पा ओलांडल्याचे कृषी विभागाने सांगितले.",
        "जवळपास ८,००० मेट्रिक टन केळी थेट जळगाव जिल्ह्यातून दुबई, सौदी अरेबिया, ओमान आणि युरोपियन बंदरांवर निर्यात करण्यात आली. रावेर आणि यावल तालुक्यात उभारण्यात आलेल्या आधुनिक शीतगृहांमुळे (Cold Storage) केळीचे नुकसान मोठ्या प्रमाणावर टळले आहे.",
        "स्थानिक शेतकरी उत्पादक कंपन्यांनी आनंद व्यक्त केला असून, थेट निर्यात करारांमुळे त्यांना स्थानिक बाजारापेक्षा ४०% अधिक दर मिळत असल्याचे त्यांनी सांगितले."
      ],
      hindi: [
        "भारत की 'बनाना सिटी' के रूप में जाने जाने वाले जलगांव जिले ने कृषि व्यापार में एक नया कीर्तिमान स्थापित किया है। चालू वित्त वर्ष में जलगांव से केले का निर्यात ₹500 करोड़ के रिकॉर्ड स्तर पर पहुंच गया है।",
        "लगभग 8,000 मीट्रिक टन प्रीमियम केला सीधे जलगांव से दुबई, सऊदी अरब, ओमान और यूरोपीय देशों को भेजा गया। रावेर और यावल तालुका में स्थापित अत्याधुनिक कोल्ड स्टोरेज सुविधाओं ने फसल कटाई के बाद होने वाले नुकसान को काफी कम कर दिया है।",
        "स्थानीय किसानों ने खुशी व्यक्त करते हुए कहा कि निर्यातकों के साथ सीधे अनुबंध के कारण उन्हें स्थानीय मंडियों की तुलना में 40% तक अधिक दाम मिल रहे हैं।"
      ]
    }
  },
  {
    id: "dhule-solar-project",
    category: "maharashtra",
    city: "dhule",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Prakash Shinde",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
    },
    date: "June 26, 2026",
    readTime: 3,
    views: 14500,
    likes: 670,
    commentsCount: 32,
    tags: ["Dhule Green Energy", "Solar Power", "MahaGenco", "Clean Tech"],
    title: {
      english: "Dhule to Become Maharashtra's Green Energy Hub with New 250MW Solar Project",
      marathi: "धुळे जिल्हा बनणार राज्याचा हरित ऊर्जा हब; २५० मेगावॉट सौर ऊर्जा प्रकल्पाला शासनाची मंजुरी",
      hindi: "धुले जिला बनेगा महाराष्ट्र का ग्रीन एनर्जी हब; 250MW सौर ऊर्जा परियोजना को मिली मंजूरी"
    },
    summary: {
      english: "The state cabinet has sanctioned a massive solar park in Dhule district to boost renewable energy generation and supply clean electricity to rural areas.",
      marathi: "धुळे जिल्ह्यात २५० मेगावॉट क्षमतेच्या भव्य सौर ऊर्जा पार्कच्या उभारणीसाठी राज्य मंत्रिमंडळाने मंजुरी दिली असून, यामुळे उत्तर महाराष्ट्राला स्वच्छ वीज मिळणार आहे.",
      hindi: "राज्य सरकार ने नवीकरणीय ऊर्जा उत्पादन को बढ़ावा देने के लिए धुले जिले में 250 मेगावाट की सौर ऊर्जा परियोजना को मंजूरी दी है।"
    },
    content: {
      english: [
        "In alignment with India's carbon-neutral mission, Dhule is set to host one of Maharashtra's largest state-owned solar power installations. The 250-megawatt capacity project will be constructed by MahaGenco over 600 hectares of arid land.",
        "Energy Minister stated that the project will generate low-cost clean electricity, which will be prioritised for daylight agricultural irrigation pumping across Dhule, Sakri, and Sindkheda regions.",
        "The project is expected to create over 1,200 local construction jobs and attract investments worth ₹1,100 crores in clean-tech infrastructure."
      ],
      marathi: [
        "भारताच्या कार्बन-मुक्त अभियानाशी सुसंगत, धुळे जिल्ह्यात महाराष्ट्रातील सर्वात मोठ्या शासकीय सौर ऊर्जा प्रकल्गाचे काम सुरू होत आहे. ६०० हेक्टर कोरडवाहू जमिनीवर महाजेनकोकडून २५० मेगावॉट क्षमतेचा हा सौर ऊर्जा प्रकल्प उभारला जाणार आहे.",
        "उर्जामंत्र्यांनी माहिती दिली की, या सौर प्रकल्पामुळे अतिशय स्वस्त दरात वीज उपलब्ध होईल, ज्याचा थेट फायदा धुळे, साक्री आणि शिंदखेडा परिसरातील शेतकऱ्यांना दिवसा सिंचनासाठी वीज मिळण्यात होईल.",
        "या प्रकल्पामुळे धुळे परिसरात सुमारे १,२०० लोकांना प्रत्यक्ष रोजगार मिळेल आणि उत्तर महाराष्ट्रात हरित ऊर्जेचे मोठे जाळे तयार होईल."
      ],
      hindi: [
        "भारत के कार्बन-मुक्त मिशन के अनुरूप, धुले जिला महाराष्ट्र की सबसे बड़ी सरकारी सौर ऊर्जा परियोजनाओं में से एक की मेजबानी करने के लिए तैयार है। महाजेनको द्वारा 600 हेक्टेयर बंजर भूमि पर 250 मेगावाट का सौर पार्क विकसित किया जाएगा।",
        "ऊर्जा मंत्री ने बताया कि इस परियोजना से सस्ती और स्वच्छ बिजली मिलेगी, जिसे धुले, साक्री और शिवखेड़ा क्षेत्रों में किसानों को दिन के समय सिंचाई के लिए प्राथमिकता के आधार पर दिया जाएगा।",
        "इस परियोजना से लगभग 1,200 स्थानीय लोगों को रोजगार मिलने और क्षेत्र में हरित ऊर्जा बुनियादी ढांचे में ₹1,100 करोड़ का निवेश आने की उम्मीद है।"
      ]
    }
  },
  {
    id: "bhusawal-railway-makeover",
    category: "maharashtra",
    city: "bhusawal",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Vinod Chawla",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80"
    },
    date: "June 25, 2026",
    readTime: 4,
    views: 19800,
    likes: 890,
    commentsCount: 54,
    tags: ["Bhusawal Junction", "Amrit Bharat Stations", "Indian Railways", "Central Railway"],
    title: {
      english: "Bhusawal Railway Junction to Undergo ₹280 Crore World-Class Amrit Bharat Station Makeover",
      marathi: "भुसावळ रेल्वे जंक्शनचा कायापालट; 'अमृत भारत' योजनेअंतर्गत ₹२८० कोटींचा मास्टर प्लॅन मंजूर",
      hindi: "भुसावल रेलवे जंक्शन का होगा कायाकल्प; 'अमृत भारत' योजना के तहत ₹280 करोड़ के विकास प्रस्ताव को मंजूरी"
    },
    summary: {
      english: "Bhusawal Junction, one of the busiest railway hubs in Central Railway, is set for a major upgrade with airport-like lounges and advanced facilities.",
      marathi: "मध्य रेल्वेचे अत्यंत महत्त्वाचे आणि व्यस्त रेल्वे केंद्र असलेल्या भुसावळ जंक्शनचा अमृत भारत स्टेशन योजनेंतर्गत विमानतळासारखा भव्य कायापालट केला जाणार आहे.",
      hindi: "मध्य रेलवे के सबसे व्यस्त रेल केंद्रों में से एक, भुसावल जंक्शन को अमृत भारत स्टेशन योजना के तहत हवाई अड्डे जैसी सुविधाओं के साथ उन्नत किया जाएगा।"
    },
    content: {
      english: [
        "The Ministry of Railways has sanctioned ₹280 crores for the holistic redevelopment of Bhusawal Railway Station. This upgrade plans to establish a modern multi-modal transit hub combining bus terminals, taxi bays, and train platforms seamlessly.",
        "Key features of the redesign include a massive 36-meter wide roof plaza spanning above all platforms, containing modern air-conditioned lounges, children's play zones, and food courts featuring local Khandeshi cuisine.",
        "The station will also feature fully handicap-friendly ramps, escalators on all platforms, and energy-efficient solar roofs, aiming to handle over 1.5 lakh daily passengers smoothly."
      ],
      marathi: [
        "रेल्वे मंत्रालयाने भुसावळ रेल्वे स्थानकाच्या सर्वांगीण पुनर्विकासासाठी ₹२८० कोटींची भरीव तरतूद मंजूर केली आहे. या अंतर्गत बस सेवा, टॅक्सी सेवा आणि रेल्वे प्लॅटफॉर्म्स यांना जोडणारा एक आधुनिक ट्रान्झिट हब तयार केला जाईल.",
        "या विकास आराखड्याचे मुख्य आकर्षण म्हणजे सर्व प्लॅटफॉर्म्सच्या वर ३६ मीटर रुंद रुफ प्लाझा (Roof Plaza) बांधला जाणार आहे, ज्यात वातानुकूलित वेटिंग लाउंज, मुलांसाठी खेळण्याची जागा आणि खान्देशी खाद्यपदार्थांचे फूड कोर्ट असतील.",
        "स्थानकावर पूर्णपणे अपंग-स्नेही रॅम्प, सर्व प्लॅटफॉर्मवर सरकते जिने (Escalators) आणि सौर ऊर्जेची छते बसवण्यात येणार असून, दररोज १.५ लाख प्रवाशांचा प्रवास यामुळे सुकर होईल."
      ],
      hindi: [
        "रेल मंत्रालय ने भुसावल रेलवे स्टेशन के पुनर्विकास के लिए ₹280 करोड़ की मंजूरी दी है। इस योजना के तहत बस टर्मिनल, टैक्सी स्टैंड और रेलवे प्लेटफॉर्म को एकीकृत कर एक आधुनिक मल्टी-मॉडल हब बनाया जाएगा।",
        "इस नए डिजाइन में सभी प्लेटफॉर्मों के ऊपर 36 मीटर चौड़ा एक विशाल रूफ प्लाजा शामिल होगा, जिसमें वातानुकूलित लाउंज, बच्चों के खेलने का क्षेत्र और स्थानीय खान्देशी व्यंजनों के फूड कोर्ट होंगे।",
        "स्टेशन पर दिव्यांगों के लिए विशेष रैंप, एस्केलेटर और सौर ऊर्जा की छतें भी लगाई जाएंगी, जिससे दैनिक 1.5 लाख यात्रियों को सुविधा होगी।"
      ]
    }
  },
  {
    id: "nashik-grapes-eu",
    category: "maharashtra",
    city: "nashik",
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Sharad Deshmukh",
      avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=100&q=80"
    },
    date: "June 27, 2026",
    readTime: 4,
    views: 16900,
    likes: 810,
    commentsCount: 39,
    tags: ["Nashik Grapes", "GI Tag", "European Union", "Agricultural Export"],
    title: {
      english: "Nashik Grape Growers secure GI Tag Upgrades; Direct Export to European Union Commences",
      marathi: "नाशिकच्या द्राक्ष बागायतदारांसाठी मोठी बातमी; युरोपियन युनियनमध्ये थेट द्राक्ष निर्यातीला सुरुवात",
      hindi: "नाशिक के अंगूर उत्पादकों के लिए बड़ी खुशखबरी; यूरोपीय संघ में सीधा निर्यात हुआ शुरू"
    },
    summary: {
      english: "Advanced residue-free farming techniques implemented by Nashik's farmers have cleared strict European Union food safety norms, leading to a surge in grape exports.",
      marathi: "नाशिकच्या शेतकऱ्यांनी राबवलेल्या प्रगत जैविक शेती तंत्रज्ञानामुळे युरोपियन युनियनचे कडक निकष पूर्ण झाले असून, नाशिकच्या द्राक्षांची पहिली खेप युरोपमध्ये रवाना झाली आहे.",
      hindi: "नाशिक के किसानों द्वारा अपनाई गई जैविक खेती तकनीकों ने यूरोपीय संघ के कड़े सुरक्षा मानकों को पूरा कर लिया है, जिससे निर्यात में भारी वृद्धि हुई है।"
    },
    content: {
      english: [
        "Nashik, the wine capital of India, has recorded a spectacular start to its summer grape export campaign. Over 1,500 shipping containers of premium seedless grapes have sailed directly to major European markets, including Germany, Netherlands, and France.",
        "Farmers have successfully utilized advanced organic biological pest control, reducing chemical residues to absolute zero. This has enabled Nashik grapes to bypass previously strict customs checks in Europe, earning premium rates of up to ₹180 per kg.",
        "The Grape Growers Association of Maharashtra expressed that this breakthrough will significantly stabilize local prices and inspire young farmers to adopt clean farming methods."
      ],
      marathi: [
        "भारताची 'द्राक्षांची राजधानी' म्हणून ओळखल्या जाणाऱ्या नाशिकच्या द्राक्ष बागायतदारांनी जागतिक बाजारात मोठी झेप घेतली आहे. जर्मनी, नेदरलँड्स आणि फ्रान्ससह युरोपियन देशांमध्ये नाशिकच्या प्रीमियम बिनबियांच्या (Seedless) द्राक्षांचे जवळपास १,५०० हून अधिक कंटेनर्स रवाना झाले आहेत.",
        "नाशिकच्या शेतकऱ्यांनी रासायनिक खतांऐवजी जैविक कीड नियंत्रण पद्धतीचा अवलंब करून युरोपियन युनियनचे कडक निकष पूर्ण केले. यामुळे युरोपातील कडक तपासणीतून नाशिकची द्राक्षे सहज उत्तीर्ण झाली असून शेतकऱ्यांना प्रति किलो ₹१८० पर्यंतचा उच्चांकी दर मिळत आहे.",
        "महाराष्ट्र राज्य द्राक्ष बागायतदार संघाने सांगितले की, या यशामुळे देशांतर्गत बाजारातील दरही स्थिरावतील आणि इतर शेतकऱ्यांनाही सेंद्रिय शेतीची प्रेरणा मिळेल."
      ],
      hindi: [
        "भारत की 'अंगूर राजधानी' नाशिक के किसानों ने वैश्विक बाजार में एक बड़ी उपलब्धि हासिल की है। जर्मनी, नीदरलैंड और फ्रांस सहित यूरोपीय बाजारों में नाशिक के प्रीमियम अंगूर के 1,500 से अधिक कंटेनर सीधे भेजे गए हैं।",
        "किसानों ने जैविक कीटनाशकों का सफलतापूर्वक उपयोग किया, जिससे रासायनिक अवशेष शून्य हो गए और नाशिक के अंगूर ने यूरोपीय संघ के सुरक्षा परीक्षणों को पास कर लिया। निर्यातकों को प्रति किलो ₹180 तक के बेहतरीन दाम मिल रहे हैं।",
        "द्राक्ष उत्पादक संघ ने कहा कि इस सफलता से स्थानीय स्तर पर भी अंगूर के दाम स्थिर रहेंगे और युवा किसानों को जैविक खेती के प्रति उत्साह मिलेगा।"
      ]
    }
  },
  {
    id: "nagpur-metro-phase2",
    category: "maharashtra",
    city: "nagpur",
    image: "https://images.unsplash.com/photo-1463780324318-d1a8ddc05a11?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Siddharth Ramteke",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
    },
    date: "June 26, 2026",
    readTime: 4,
    views: 21000,
    likes: 1100,
    commentsCount: 62,
    tags: ["Nagpur Metro", "Metro Phase 2", "Urban Transport", "Vidarbha Development"],
    title: {
      english: "Nagpur Metro Phase 2 Expansion gets Safety Clearances; Commercial Operations from Next Month",
      marathi: "नागपूरकरांसाठी खुशखबर: मेट्रोच्या फेज २ ला सुरक्षा प्रमाणपत्र मंजूर; पुढील महिन्यापासून धावणार गाडी",
      hindi: "नागपुर वासियों के लिए बड़ी खबर: नागपुर मेट्रो फेज 2 को मिली सुरक्षा मंजूरी; अगले महीने से शुरू होंगी सेवाएं"
    },
    summary: {
      english: "The Commissioner of Metro Railway Safety has officially certified the new 18-km extended corridors, connecting industrial hubs Hingna and Kanhan.",
      marathi: "मेट्रो रेल्वे सुरक्षा आयुक्तांनी नागपूर मेट्रोच्या फेज २ अंतर्गत उभारण्यात आलेल्या १८ किलोमीटर लांबीच्या नवीन मार्गाला अधिकृत मंजुरी दिली असून यामुळे कामगारांचा प्रवास सुखकर होईल.",
      hindi: "मेट्रो रेल सुरक्षा आयुक्त ने नागपुर मेट्रो के फेज 2 के तहत नवनिर्मित 18 किलोमीटर लंबे ट्रैक को आधिकारिक तौर पर हरी झंडी दे दी है।"
    },
    content: {
      english: [
        "Nagpur Metro's Phase 2 expansion is set to change transit dynamics for lakhs of daily commuters in the Vidarbha capital. The safety commissioner conducted comprehensive speed and load trials on the Hingna and Kanhan routes and expressed complete satisfaction.",
        "The new tracks extend Nagpur's active metro network to 58 km, making it one of the fastest-growing rapid transit systems in central India. Smart ticketing cards and synchronized bus feeder services will also be introduced next month.",
        "Industrialists from MIHAN SEZ have welcomed the expansion, stating that direct connectivity will make commuting much safer and more efficient for technical workforces."
      ],
      marathi: [
        "नागपूर मेट्रोच्या फेज २ विस्तारामुळे विदर्भाच्या राजधानीतील लाखो प्रवाशांचा प्रवास सुखकर होणार आहे. रेल्वे सुरक्षा आयुक्तांनी हिंगणा आणि कामठी-कन्हान मार्गावर ताशी ९० किमी वेगाने धावण्याची यशस्वी चाचणी घेतली आणि सुरक्षेबद्दल समाधान व्यक्त केले.",
        "या नवीन टप्प्यामुळे नागपूर मेट्रोचे जाळे ५८ किलोमीटरपर्यंत विस्तारले आहे. पुढील महिन्यापासून सर्व नवीन मार्गांवर नियमित प्रवासी वाहतूक सुरू होणार असून प्रवाशांच्या सोयीसाठी फीडर बस सेवाही जोडली जाईल.",
        "मिहान (MIHAN SEZ) मधील उद्योजकांनी या विस्ताराचे स्वागत केले असून यामुळे कर्मचाऱ्यांना वेळेत आणि सुरक्षितपणे कामावर पोहोचणे शक्य होईल, असे सांगितले."
      ],
      hindi: [
        "नागपुर मेट्रो के फेज 2 विस्तार से शहर के लाखों यात्रियों का सफर बेहद आसान होने वाला है। मेट्रो सुरक्षा आयुक्त ने हिंगना और कामठी-कन्हा ट्रैक पर गति परीक्षण पूरा कर अंतिम मंजूरी प्रदान की है।",
        "इस विस्तार के साथ नागपुर का कुल सक्रिय मेट्रो नेटवर्क 58 किमी लंबा हो जाएगा, जिससे यह मध्य भारत का सबसे बड़ा मेट्रो ग्रिड बन जाएगा। अगले महीने से इस रूट पर नियमित ट्रेनें चलाई जाएंगी।",
        "मिहान सेज (MIHAN SEZ) के उद्योगपतियों ने इसका स्वागत किया है और कहा है कि इससे कार्यबल को समय पर और सुरक्षित यात्रा की सुविधा मिलेगी।"
      ]
    }
  },
  {
    id: "akola-cotton-surge",
    category: "maharashtra",
    city: "akola",
    image: "https://images.unsplash.com/photo-1594782078968-2b07656d7bb2?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Satish Deshmukh",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80"
    },
    date: "June 25, 2026",
    readTime: 3,
    views: 13200,
    likes: 540,
    commentsCount: 29,
    tags: ["Akola Cotton", "APMC Market", "White Gold", "Vidarbha Farmers"],
    title: {
      english: "Akola Cotton Market Witnesses Price Surge; Farmers Reap High Profits",
      marathi: "अकोला बाजारात पांढऱ्या सोन्याला झळाळी; कापसाला प्रति क्विंटल ₹८,२०० चा ऐतिहासिक दर",
      hindi: "अकोला कपास मंडी में आई रिकॉर्ड तेजी; कपास उत्पादक किसानों को मिला बंपर दाम"
    },
    summary: {
      english: "Akola, Vidarbha's largest cotton trading center, recorded high price demand due to premium staple quality and textile mill demands.",
      marathi: "विदर्भातील कापसाची मोठी बाजारपेठ असलेल्या अकोल्यामध्ये कापसाच्या दराने विक्रमी उसळी घेतली असून कापूस उत्पादक शेतकऱ्यांच्या चेहऱ्यावर समाधान पाहायला मिळत आहे.",
      hindi: "विदर्भ के सबसे बड़े कपास व्यापार केंद्र अकोला में स्थानीय कपड़ा मिलों की ओर से भारी मांग के चलते कपास की कीमतों में जबरदस्त उछाल देखा गया।"
    },
    content: {
      english: [
        "Cotton prices at the Akola Agricultural Produce Market Committee (APMC) have surged to ₹8,200 per quintal, bringing huge relief to farmers who held onto their harvest anticipating market recovery.",
        "Trading officers noted that low international supply from China and high demand from domestic spinning mills in Tamil Nadu have driven the prices up by 15% in just two weeks.",
        "Quality inspectors at Akola marked this year's Khandesh and Vidarbha staple cotton as grade-A, with minimal moisture levels, ensuring fast transactions without discounts."
      ],
      marathi: [
        "अकोला कृषी उत्पन्न बाजार समितीमध्ये (APMC) कापसाचे दर प्रति क्विंटल ₹८,२०० वर पोहोचले आहेत. बाजारातील तेजीचा अंदाज घेऊन साठवून ठेवलेला कापूस आता बाहेर काढणाऱ्या शेतकऱ्यांना मोठा आर्थिक नफा मिळत आहे.",
        "बाजार तज्ज्ञांच्या मते, जागतिक पातळीवर कापसाचा कमी पुरवठा आणि तामिळनाडूतील स्पिनिंग मिलकडून वाढलेली मोठी मागणी यामुळे कापसाचे दर अचानक वाढले आहेत.",
        "अकोला बाजार समितीमध्ये यावर्षी आलेल्या कापसाचा दर्जा सर्वोत्तम असून ओलावा कमी असल्याने व्यापाऱ्यांकडून कुठलीही कपात न करता वेगाने खरेदी सुरू आहे."
      ],
      hindi: [
        "अकोला कृषि उपज मंडी समिति (APMC) में कपास की कीमतें ₹8,200 प्रति क्विंटल तक पहुंच गई हैं, जिससे उन किसानों को बड़ी राहत मिली है जिन्होंने कीमतों में सुधार की उम्मीद में अपनी उपज संभाल कर रखी थी।",
        "व्यापार विश्लेषकों ने बताया कि चीन से कम वैश्विक आपूर्ति और दक्षिण भारत की कपड़ा मिलों से बढ़ी मांग के चलते कीमतों में दो सप्ताह में 15% तक की तेजी आई है।",
        "अकोला मंडी में कपास की गुणवत्ता को ग्रेड-ए घोषित किया गया है, जिसके चलते व्यापारियों द्वारा बिना किसी कटौती के तत्काल भुगतान किया जा रहा है।"
      ]
    }
  },
  {
    id: "satara-eco-tourism",
    category: "maharashtra",
    city: "satara",
    image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Prathamesh Chohan",
      avatar: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=100&q=80"
    },
    date: "June 26, 2026",
    readTime: 4,
    views: 17500,
    likes: 850,
    commentsCount: 41,
    tags: ["Kaas Plateau", "Satara Tourism", "UNESCO World Heritage", "Ajinkyatara Fort"],
    title: {
      english: "Satara's Kaas Plateau and Fort Restoration Project Allocated ₹45 Crore for Eco-Tourism",
      marathi: "साताऱ्याचे कास पठार आणि ऐतिहासिक किल्ल्यांच्या संवर्धनासाठी ₹४५ कोटींचा निधी मंजूर",
      hindi: "सातारा के कास पठार और ऐतिहासिक किलों के जीर्णोद्धार के लिए ₹45 करोड़ स्वीकृत"
    },
    summary: {
      english: "The Tourism Ministry has approved a dedicated conservation budget for Satara's UNESCO Natural World Heritage site and the surrounding historical forts.",
      marathi: "युनेस्कोच्या जागतिक वारसा यादीत समाविष्ट असलेल्या साताऱ्याच्या कास पठाराच्या आणि अजिंक्यतारा किल्ल्याच्या संवर्धनासाठी पर्यटन खात्याने ₹४५ कोटींच्या निधीला मंजुरी दिली आहे.",
      hindi: "पर्यटन मंत्रालय ने सातारा के प्रसिद्ध यूनेस्को प्राकृतिक विश्व धरोहर स्थल कास पठार और ऐतिहासिक अजिंक्यतारा किले के जीर्णोद्धार के लिए विशेष विकास कोष जारी किया है।"
    },
    content: {
      english: [
        "Satara district is gearing up to receive a massive face-lift for its top tourist destinations. The Maharashtra Tourism Development Board (MTDB) received sanction for a comprehensive ₹45 crore eco-tourism master plan.",
        "The funds will build automated electric vehicle charging loops at the base of Kaas Plateau, eco-friendly viewing galleries, and structured walkways to protect rare endemic flowers from tourist footfalls. Simultaneously, fort restoration specialists will repair the ancient basalt bastions of Ajinkyatara and Sajjangad forts.",
        "Local home-stay owners welcomed the move, anticipating a structured flow of international botanists and historical tourists, boosting the local economy."
      ],
      marathi: [
        "सातारा जिल्ह्याला पर्यटनाच्या नकाशावर आणखी समृद्ध करण्यासाठी शासनाने मोठी पावले उचलली आहेत. युनेस्कोच्या यादीत असणाऱ्या कास पठार आणि परिसरातील गडकिल्ल्यांच्या संवर्धनासाठी ₹४५ कोटींचा विशेष विकास आराखडा मंजूर झाला आहे.",
        "या निधीतून कास पठाराच्या पायथ्याशी इलेक्ट्रिक गाड्यांच्या वाहतुकीसाठी चार्जिंग स्टेशन्स उभारली जातील, तसेच दुर्मिळ फुलांचे नुकसान टाळण्यासाठी लाकडी वॉकिंग ट्रॅक बनवले जातील. त्याचबरोबर अजिंक्यतारा आणि सज्जनगड किल्ल्याच्या तटबंदीच्या दुरुस्तीचे काम केले जाईल.",
        "स्थानिक होम-स्टे चालकांनी या निर्णयाचे स्वागत केले असून यामुळे साताऱ्यातील स्थानिक अर्थव्यवस्थेला आणि पर्यटनाला मोठी गती मिळेल, असा विश्वास व्यक्त केला."
      ],
      hindi: [
        "सातारा जिले के प्रमुख पर्यटन स्थलों के विकास के लिए सरकार ने बड़ी घोषणा की है। महाराष्ट्र पर्यटन विकास निगम को सातारा के पर्यटन स्थलों के लिए ₹45 करोड़ का विशेष मास्टर प्लान सौंपा गया है।",
        "इस राशि से कास पठार के पास केवल पर्यावरण-अनुकूल वाहनों को चलाने के लिए चार्जिंग स्टेशन बनाए जाएंगे, और दुर्लभ फूलों को नुकसान से बचाने के लिए वॉकिंग ट्रैक बनाए जाएंगे। इसके साथ ही सज्जनगढ़ और अजिंक्यतारा किलों की प्राचीन दीवारों की मरम्मत की जाएगी।",
        "स्थानीय होटल व्यवसायियों ने इस कदम का स्वागत किया है और उम्मीद जताई है कि इससे देश-विदेश से आने वाले पर्यटकों की संख्या बढ़ेगी।"
      ]
    }
  },
  {
    id: "amravati-textile-park",
    category: "maharashtra",
    city: "amravati",
    image: "https://images.unsplash.com/photo-1524295981997-ec4f540702e5?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Sanjay Wankhede",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
    },
    date: "June 27, 2026",
    readTime: 4,
    views: 15400,
    likes: 720,
    commentsCount: 33,
    tags: ["Amravati Textile", "Nandgaon Peth MIDC", "Textile Hub", "Employment"],
    title: {
      english: "Amravati Textile Park Attracts Major International Fashion Brands; 5,000 Local Jobs Created",
      marathi: "अमरावतीच्या टेक्सटाईल पार्कमध्ये जागतिक ब्रँड्सची गुंतवणूक; ५,००० स्थानिक तरुणांना थेट रोजगार",
      hindi: "अमरावती टेक्सटाइल पार्क में वैश्विक फैशन ब्रांड्स का निवेश; 5,000 स्थानीय युवाओं को मिला रोजगार"
    },
    summary: {
      english: "Two leading global apparel manufacturers are setting up large-scale sewing units in Nandgaon Peth MIDC, transforming Amravati into an industrial powerhouse.",
      marathi: "अमरावतीच्या नांदगाव पेठ औद्योगिक वसाहतीतील टेक्सटाईल पार्कमध्ये दोन मोठ्या आंतरराष्ट्रीय कपडा कंपन्यांनी त्यांची युनिट्स सुरू करण्याचा निर्णय घेतला असून, यामुळे विदर्भात मोठी गुंतवणूक येत आहे.",
      hindi: "अमरावती के नांदगांव पेठ एमआईडीसी स्थित टेक्सटाइल पार्क में दो बड़े अंतरराष्ट्रीय फैशन ब्रांडों ने अपनी विनिर्माण इकाइयां स्थापित करने की घोषणा की है।"
    },
    content: {
      english: [
        "In a substantial boost to employment in the Vidarbha region, the Amravati Integrated Textile Park at Nandgaon Peth has secured long-term partnerships with two international fashion exporters.",
        "The joint investments totaling ₹650 crores will set up automated weaving, dyeing, and large-scale garment manufacturing hubs. Over 70% of the 5,000 direct vacancies have been reserved for skilled local female machine operators, promoting rural women empowerment.",
        "Local industrial associations commented that Amravati's proximity to the cotton-growing belt of Vidarbha makes it the ideal logistics hub, reducing shipping transit costs significantly."
      ],
      marathi: [
        "विदर्भातील रोजगार वाढीच्या दृष्टीने एक मोठी आणि सकारात्मक घडामोड घडली आहे. अमरावतीच्या नांदगाव पेठ येथील एकात्मिक टेक्सटाईल पार्कमध्ये दोन आंतरराष्ट्रीय कापड निर्यातदार कंपन्यांनी मोठी गुंतवणूक केली आहे.",
        "एकूण ₹६५० कोटींच्या या करारामुळे अद्ययावत विणकाम, रंगकाम आणि कपडे तयार करण्याचे भव्य कारखाने सुरू होतील. यातील ५,००0 थेट नोकऱ्यांपैकी ७०% नोकऱ्या स्थानिक महिला मशीन ऑपरेटर्ससाठी राखीव ठेवण्यात आल्या आहेत.",
        "स्थानिक उद्योग संघाने सांगितले की, अमरावती जिल्हा विदर्भातील कापूस पट्ट्याच्या जवळ असल्याने येथे कच्चा माल सहज उपलब्ध होतो, ज्यामुळे वाहतुकीचा खर्च मोठ्या प्रमाणावर वाचणार आहे."
      ],
      hindi: [
        "विदर्भ क्षेत्र में रोजगार के अवसरों को बढ़ावा देने के लिए, अमरावती के नांदगांव पेठ एमआईडीसी में स्थित टेक्सटाइल पार्क ने दो बड़े वैश्विक फैशन निर्यातकों के साथ साझेदारी की है।",
        "कुल ₹650 करोड़ के इस निवेश से आधुनिक धागा निर्माण, रंगाई और वस्त्र बनाने की विशाल इकाइयां स्थापित की जाएंगी। सृजित होने वाले 5,000 प्रत्यक्ष पदों में से 70% स्थानीय महिला ऑपरेटरों के लिए आरक्षित किए गए हैं।",
        "उद्योग संघों ने कहा कि कपास उत्पादक क्षेत्र के करीब होने के कारण अमरावती वस्त्र उद्योग के लिए आदर्श लॉजिस्टिक्स केंद्र के रूप में उभर रहा है।"
      ]
    }
  }
];

const CITY_DATA: Record<string, {
  en: string;
  mr: string;
  hi: string;
  districtEn: string;
  districtMr: string;
  districtHi: string;
}> = {
  mumbai: { en: "Mumbai", mr: "मुंबई", hi: "मुंबई", districtEn: "Mumbai Metropolitan Region", districtMr: "मुंबई महानगर क्षेत्र", districtHi: "मुंबई महानगर क्षेत्र" },
  pune: { en: "Pune", mr: "पुणे", hi: "पुणे", districtEn: "Pune District", districtMr: "पुणे जिल्हा", districtHi: "पुणे जिला" },
  jalgaon: { en: "Jalgaon", mr: "जळगाव", hi: "जलगांव", districtEn: "Khandesh region", districtMr: "खान्देश परिसर", districtHi: "खानदेश क्षेत्र" },
  dhule: { en: "Dhule", mr: "धुळे", hi: "धुले", districtEn: "Dhule District", districtMr: "धुळे जिल्हा", districtHi: "धुले जिला" },
  bhusawal: { en: "Bhusawal", mr: "भुसावळ", hi: "भुसावल", districtEn: "Bhusawal Junction area", districtMr: "भुसावळ परिसर", districtHi: "भुसावल क्षेत्र" },
  nashik: { en: "Nashik", mr: "नाशिक", hi: "नाशिक", districtEn: "Nashik Region", districtMr: "नाशिक परिसर", districtHi: "नाशिक क्षेत्र" },
  nagpur: { en: "Nagpur", mr: "नागपूर", hi: "नागपूर", districtEn: "Vidarbha heartland", districtMr: "विदर्भाचा मध्यभाग", districtHi: "विदर्भ क्षेत्र" },
  akola: { en: "Akola", mr: "अकोला", hi: "अकोला", districtEn: "Akola division", districtMr: "अकोला विभाग", districtHi: "अकोला संभाग" },
  satara: { en: "Satara", mr: "सातारा", hi: "सातारा", districtEn: "Western Maharashtra", districtMr: "पश्चिम महाराष्ट्र", districtHi: "पश्चिम महाराष्ट्र" },
  amravati: { en: "Amravati", mr: "अमरावती", hi: "अमरावती", districtEn: "Amravati Region", districtMr: "अमरावती विभाग", districtHi: "अमरावती संभाग" }
};

const TEMPLATES = [
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    tags: ["Tech Hub", "Employment", "Smart City"],
    title: {
      english: "Smart Tech Hub Projected to Create 15,000 High-Tech Jobs in {cityEn}",
      marathi: "{cityMr} स्मार्ट टेक हबमुळे १५,००० नवीन आयटी नोकऱ्यांची संधी",
      hindi: "{cityHi} स्मार्ट टेक हब से सृजित होंगे 15,000 तकनीकी रोजगार"
    },
    summary: {
      english: "A massive modern tech incubator is approved in {cityEn} under the smart-city mission, targeting next-gen software talent.",
      marathi: "स्मार्ट सिटी मोहिमेअंतर्गत {cityMr}मध्ये भव्य तंत्रज्ञान पार्क उभारण्यास मंजुरी देण्यात आली आहे.",
      hindi: "स्मार्ट सिटी मिशन के तहत {cityHi} में एक बड़े आधुनिक आईटी इनक्यूबेटर की स्थापना को मंजूरी दी गई है।"
    },
    content: {
      english: [
        "A state-of-the-art software technology park was sanctioned in {cityEn} today by the Maharashtra Department of Industries. The project spans 45 acres of eco-friendly infrastructure.",
        "Local officials highlighted that this hub will bring top tier multinational firms directly to {cityEn}, boosting local tech employment and reducing the migration of graduates to other metros.",
        "Construction is set to commence next month, with a targeted completion phase of 18 months."
      ],
      marathi: [
        "महाराष्ट्र शासनाच्या उद्योग विभागाने आज {cityMr}मध्ये अत्याधुनिक सॉफ्टवेअर तंत्रज्ञान पार्कच्या उभारणीला अधिकृत मंजुरी दिली. ४५ एकर क्षेत्रावर हे पर्यावरणपूरक पार्क विस्तारलेले असेल.",
        "{cityMr}मधील स्थानिक लोकप्रतिनिधींनी सांगितले की, यामुळे जागतिक स्तरावरील मोठ्या कंपन्या येथे येतील, ज्यामुळे स्थानिक तरुणांना त्यांच्याच शहरात मोठ्या नोकऱ्या मिळतील.",
        "या प्रकल्पाचे प्रत्यक्ष काम पुढील महिन्यापासून सुरू होणार असून १८ महिन्यांत पहिला टप्पा पूर्ण करण्याचे उद्दिष्ट आहे."
      ],
      hindi: [
        "महाराष्ट्र उद्योग विभाग ने आज {cityHi} में अत्याधुनिक सॉफ्टवेयर प्रौद्योगिकी पार्क के निर्माण को हरी झंडी दे दी है। यह पार्क 45 एकड़ की हरित भूमि पर फैला होगा।",
        "अधिकारियों ने कहा कि इस हब के बनने से दुनिया की शीर्ष बहुराष्ट्रीय कंपनियां सीधे {cityHi} में काम शुरू कर सकेंगी, जिससे युवाओं का बड़े शहरों की ओर पलायन रुकेगा।",
        "इस आईटी पार्क का निर्माण कार्य अगले महीने शुरू होगा और इसे 18 महीने की समयसीमा के भीतर पूरा कर लिया जाएगा।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
    tags: ["Agriculture", "Cold Storage", "Exports"],
    title: {
      english: "State-of-the-Art Cold Storage Facility Inaugurated near {cityEn}",
      marathi: "{cityMr}जवळ अत्याधुनिक शीतगृह प्रकल्पाचे लोकार्पण; शेतकऱ्यांना मोठा दिलासा",
      hindi: "{cityHi} के पास अत्याधुनिक कोल्ड स्टोरेज सुविधा का उद्घाटन; किसानों को बड़ी राहत"
    },
    summary: {
      english: "Designed to help farmers preserve fresh horticultural produce, the new cold chain facility in {cityEn} will boost export quality.",
      marathi: "{cityMr}मधील शेतकऱ्यांचे नुकसान टाळण्यासाठी आणि शेतीमालाला चांगला भाव मिळवून देण्यासाठी नवीन शीतगृह कार्यान्वित करण्यात आले आहे.",
      hindi: "किसानों की ताजी उपज को सुरक्षित रखने और निर्यात गुणवत्ता बढ़ाने के लिए {cityHi} में आधुनिक कोल्ड स्टोरेज शुरू किया गया है।"
    },
    content: {
      english: [
        "To empower local growers and prevent post-harvest damage, a high-tech multi-chamber cold storage unit has been opened on the outskirts of {cityEn}.",
        "Equipped with advanced atmosphere-controlled storage technology, the facility is capable of storing up to 10,000 metric tonnes of fresh perishables. It will help local farmers hold produce for better market prices.",
        "The project has been developed with public-private partnership (PPP) and is already fully operational."
      ],
      marathi: [
        "स्थानिक शेतकऱ्यांना सक्षम करण्यासाठी आणि पिकांचे नुकसान टाळण्यासाठी {cityMr}च्या हद्दीत हाय-टेक मल्टि-चेम्बर शीतगृह सुरू करण्यात आले आहे.",
        "१०,००० मेट्रिक टन साठवणूक क्षमता असलेल्या या प्रकल्पात प्रगत तापमान नियंत्रण तंत्रज्ञान वापरण्यात आले आहे. यामुळे येथील शेतकऱ्यांना त्यांचे उत्पादन दीर्घकाळ साठवता येईल.",
        "हा प्रकल्प सार्वजनिक-खाजगी भागीदारीतून (PPP) विकसित करण्यात आला असून आजपासून सुरू झाला आहे."
      ],
      hindi: [
        "स्थानीय किसानों को सशक्त बनाने और फसल कटाई के बाद के नुकसान को रोकने के लिए, {cityHi} के बाहरी इलाके में एक हाई-टेक कोल्ड स्टोरेज शुरू किया गया है।",
        "10,000 मीट्रिक टन की क्षमता वाला यह प्लांट अत्याधुनिक तापमान नियंत्रण तकनीक से लैस है। इससे किसानों को सही दाम मिलने तक फल-सब्जियां सुरक्षित रखने में मदद मिलेगी।",
        "यह परियोजना पीपीपी मॉडल के तहत विकसित की गई है और इसका संचालन आज से शुरू हो गया है।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    tags: ["Infrastructure", "Ring Road", "Transit"],
    title: {
      english: "{cityEn} Ring Road Bypass Expansion Gets Forest and Land Clearances",
      marathi: "{cityMr} रिंग रोड बायपास प्रकल्पाच्या भूसंपादनाला गती; वन विभागाची मंजुरी",
      hindi: "{cityHi} रिंग रोड बाईपास परियोजना को मिली वन और भूमि विभाग की मंजूरी"
    },
    summary: {
      english: "The multi-lane bypass designed to route heavy highway traffic outside {cityEn} has resolved long-pending clearance hurdles.",
      marathi: "{cityMr} शहराबाहेरून जाणारी वाहतूक सुरळीत करण्यासाठी प्रस्तावितリング रोडच्या कामातील सर्व प्रशासकीय अडथळे दूर झाले आहेत.",
      hindi: "{cityHi} शहर के बाहर भारी वाहनों के सुगम मार्ग के लिए प्रस्तावित रिंग रोड बाईपास के भूमि अधिग्रहण का काम तेजी से पूरा होगा।"
    },
    content: {
      english: [
        "In a major win for urban planners, the bypass ring road project of {cityEn} has secured all necessary central forest clearances today.",
        "The 45-km outer highway will prevent cargo trucks from entering city boundaries, significantly reducing peak hour bottlenecks and urban pollution inside the municipal limits.",
        "The construction is expected to be completed within 24 months, bringing relief to lakhs of daily commuters."
      ],
      marathi: [
        "नागरी नियोजन विभागासाठी एका मोठ्या यशात, {cityMr}च्या रिंग रोड प्रकल्पाला आज केंद्र सरकारच्या वन विभागाकडून सर्व परवानग्या मिळाल्या आहेत.",
        "४५ किलोमीटर लांबीचा हा रस्ता अवजड वाहनांना शहराबाहेरूनच वळवेल, ज्यामुळे शहरातील वाहतूक कोंडी आणि हवेचे प्रदूषण लक्षणीयरीत्या कमी होईल.",
        "पुढील २४ महिन्यांत हे काम पूर्ण होणार असून लाखो प्रवाशांना यामुळे दिलासा मिळणार आहे."
      ],
      hindi: [
        "शहरी विकास प्राधिकरण के लिए एक बड़ी राहत में, {cityHi} के रिंग रोड बाईपास परियोजना को वन विभाग से सभी आवश्यक मंजूरी मिल गई है।",
        "यह 45 किलोमीटर लंबा बाहरी बाईपास भारी मालवाहक वाहनों को शहर की सीमा के बाहर से निकालेगा, जिससे यातायात का दबाव और वायु प्रदूषण काफी कम होगा।",
        "निर्माण कार्य आगामी 24 महीनों में पूरा होने की संभावना है, जिससे लाखों दैनिक यात्रियों को लाभ होगा।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    tags: ["Solar Power", "Green Energy", "Climate"],
    title: {
      english: "{cityEn} to Host Giant 100MW Solar Park over Semi-Arid Land",
      marathi: "{cityMr} परिसरात १०० मेगावॉट क्षमतेच्या भव्य सौर ऊर्जा प्रकल्पाला मंजुरी",
      hindi: "{cityHi} क्षेत्र में स्थापित होगा 100 मेगावाट का विशाल सौर पार्क"
    },
    summary: {
      english: "Aiming to feed the local grid with green electricity, the state government has approved a massive solar array in {cityEn}.",
      marathi: "{cityMr} परिसरातील विस्तीर्ण कोरडवाहू जमिनीवर महावितरणच्या माध्यमातून हरित ऊर्जा निर्मिती केली जाईल.",
      hindi: "स्थानीय बिजली ग्रिड को स्वच्छ ऊर्जा प्रदान करने के उद्देश्य से, राज्य सरकार ने {cityHi} में विशाल सौर ऊर्जा परियोजना को मंजूरी दी है।"
    },
    content: {
      english: [
        "As part of Maharashtra's green energy expansion, a new 100-megawatt solar power installation will be set up in {cityEn} district over 250 hectares.",
        "MahaGenco will construct the clean power array, which will prioritize low-cost power supply for daytime agricultural water pump irrigation.",
        "The move is highly praised by farmer groups who have struggled with unstable nighttime electricity supply for years."
      ],
      marathi: [
        "महाराष्ट्राच्या हरित ऊर्जा विस्ताराचा एक भाग म्हणून, {cityMr} जिल्ह्यात २५० हेक्टर जमिनीवर नवीन १०० मेगावॉटचा सौर ऊर्जा प्रकल्प उभारला जाईल.",
        "महाजेनकोद्वारे हा सौर प्रकल्प उभारण्यात येणार असून, शेतकऱ्यांना शेती पंपांसाठी दिवसा वीज देण्याला यात प्राधान्य असेल.",
        "रात्रीच्या वेळी शेतीला वीज देण्याच्या समस्येमुळे हैराण झालेल्या शेतकरी संघटनांनी या निर्णयाचे स्वागत केले आहे."
      ],
      hindi: [
        "महाराष्ट्र के नवीकरणीय ऊर्जा मिशन के तहत, {cityHi} जिले में 250 हेक्टेयर क्षेत्र में एक नया 100 मेगावाट का सौर ऊर्जा पार्क स्थापित किया जाएगा।",
        "महाजेनको द्वारा विकसित की जाने वाली इस सौर परियोजना से मिलने वाली सस्ती बिजली को दिन के समय कृषि उपयोग के लिए प्राथमिकता दी जाएगी।",
        "इस कदम का किसान समूहों द्वारा स्वागत किया गया है, जो लंबे समय से रात की बिजली की समस्या से परेशान थे।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
    tags: ["Healthcare", "Super Specialty", "Medical"],
    title: {
      english: "New Multi-Specialty Government Hospital Wing Approved for {cityEn}",
      marathi: "{cityMr} शासकीय रुग्णालयात सुपर स्पेशालिटी कार्डियाक आणि ऑन्कोलॉजी विभाग मंजूर",
      hindi: "{cityHi} सरकारी अस्पताल में सुपर स्पेशलिटी कार्डियक और कैंसर विंग को मंजूरी"
    },
    summary: {
      english: "Residents of {cityEn} will no longer need to travel to metro cities for advanced cardiac and cancer treatments.",
      marathi: "{cityMr} आणि जवळील ग्रामीण रुग्णांना अत्याधुनिक उपचारांसाठी आता मुंबई किंवा पुण्याला जाण्याची गरज उरणार नाही.",
      hindi: "{cityHi} और आसपास के ग्रामीण इलाकों के मरीजों को अब गंभीर हृदय रोगों और कैंसर के इलाज के लिए बड़े शहरों में नहीं भटकना पड़ेगा।"
    },
    content: {
      english: [
        "The State Health Ministry has allocated ₹180 crores for upgrading the civil hospital of {cityEn} with an advanced 200-bed super-specialty treatment wing.",
        "The wing will house state-of-the-art MRI diagnostics, pediatric intensive care units, and professional oncology consultation facilities.",
        "Experienced medical professionals from premier institutions are expected to lead the departments starting next year."
      ],
      marathi: [
        "राज्य आरोग्य मंत्रालयाने {cityMr}च्या शासकीय रुग्णालयाच्या विस्तारासाठी ₹१८० कोटींचा निधी मंजूर केला असून, येथे २०० खाटांचे सुपर-स्पेशालिटी दालन उभारले जाईल.",
        "या नवीन विभागात अत्याधुनिक एमआरआय मशीन, लहान मुलांचा अतिदक्षता विभाग आणि कॅन्सर उपचारांसाठी स्वतंत्र व्यवस्था असेल.",
        "पुढील वर्षाच्या सुरुवातीला या विभागासाठी नामवंत डॉक्टरांची नियुक्ती करण्यात येणार आहे."
      ],
      hindi: [
        "राज्य स्वास्थ्य मंत्रालय ने {cityHi} के सिविल अस्पताल में 200 बिस्तरों वाले सुपर-स्पेशलिटी वार्ड के निर्माण के लिए ₹180 करोड़ की मंजूरी दी है।",
        "इस नए विंग में आधुनिक एमआरआई डायग्नोस्टिक्स, पीडियाट्रिक आईसीयू और उन्नत कैंसर केयर सुविधाएं उपलब्ध होंगी।",
        "देश के प्रमुख चिकित्सा संस्थानों के अनुभवी डॉक्टर अगले साल से यहाँ अपनी सेवाएं देना शुरू करेंगे।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=800&q=80",
    tags: ["Transit", "Public Transport", "Connectivity"],
    title: {
      english: "{cityEn} Transit Network Upgrade Approved under Smart-City Initiative",
      marathi: "{cityMr} नागरी वाहतूक सुधारणा आराखड्याला मंजुरी; नवे बस मार्ग सुरू होणार",
      hindi: "{cityHi} यातायात नेटवर्क में सुधार के विशेष प्रस्ताव को मिली मंजूरी"
    },
    summary: {
      english: "Under the Smart City initiative, {cityEn} is set to expand its public bus transport grid and build disabled-friendly passenger bays.",
      marathi: "{cityMr} शहरातील वाढती गर्दी आणि वाहतूक व्यवस्था सुधारण्यासाठी आधुनिक ट्रान्झिट टर्मिनल्स विकसित केले जातील.",
      hindi: "स्मार्ट सिटी पहल के तहत {cityHi} के सार्वजनिक बस परिवहन नेटवर्क का विस्तार किया जाएगा और नए बस स्टॉप बनाए जाएंगे।"
    },
    content: {
      english: [
        "To ease daily commuting within the municipal limits of {cityEn}, a comprehensive public transport upgrade was green-lit with an allocation of ₹85 crores.",
        "The plan includes 50 new low-floor buses, intelligent GPS tracking displays at all major bus stands, and dedicated smart lanes to bypass congestion.",
        "The transport board expects to double the active daily passenger capacity of the municipal fleet by November."
      ],
      marathi: [
        "{cityMr} महापालिका क्षेत्रातील दैनंदिन प्रवाशांचा प्रवास सोपा करण्यासाठी ₹८५ कोटींच्या सार्वजनिक वाहतूक सुधारणा प्रकल्पाला मान्यता देण्यात आली आहे.",
        "यामध्ये ५० नवीन लो-फ्लोर बसेस, सर्व प्रमुख बस स्थानकांवर रिअल-टाइम जीपीएस डिस्प्ले आणि वाहतूक नियंत्रण यंत्रणा बसवली जाईल.",
        "या उपक्रमामुळे नोव्हेंबरपर्यंत शहरातील प्रवाशांची वाहतूक क्षमता दुप्पट करण्याचे नियोजन आहे."
      ],
      hindi: [
        "{cityHi} नगर निगम क्षेत्र में दैनिक परिवहन को सुगम बनाने के लिए ₹85 करोड़ के पब्लिक ट्रांसपोर्ट अपग्रेड को मंजूरी दी गई है।",
        "इस योजना के तहत 50 नई लो-फ्लोर बसें चलाई जाएंगी और सभी प्रमुख बस स्टॉपों पर रियल-टाइम जीपीएस ट्रैकिंग डिस्प्ले लगाए जाएंगे।",
        "परिवहन विभाग को उम्मीद है कि इस पहल से नवंबर तक शहर की यात्री क्षमता दोगुनी हो जाएगी।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
    tags: ["Heritage", "Tourism", "Restoration"],
    title: {
      english: "Archaeologists to Restore Ancient Historical Monuments in {cityEn}",
      marathi: "{cityMr} परिसरातील ऐतिहासिक वास्तूंच्या संवर्धनासाठी पुरातत्व विभागाचा मास्टर प्लॅन",
      hindi: "{cityHi} के ऐतिहासिक स्मारकों के जीर्णोद्धार के लिए पुरातत्व विभाग तैयार"
    },
    summary: {
      english: "An extensive restoration drive has been launched to conserve the crumbling stone structures and heritage gates of {cityEn}.",
      marathi: "{cityMr}मधील पुरातन वास्तू आणि ऐतिहासिक तटबंदीचे मूळ सौंदर्य पुनर्संचयित करण्यासाठी विशेष निधी मंजूर करण्यात आला आहे.",
      hindi: "{cityHi} के प्राचीन स्मारकों और ऐतिहासिक द्वारों के मूल स्वरूप को सुरक्षित रखने के लिए एक विशेष संरक्षण अभियान शुरू किया गया है।"
    },
    content: {
      english: [
        "The Archaeological Survey of India (ASI) along with the Maharashtra Tourism Board has initiated a specialized restoration drive at multiple heritage sites in {cityEn}.",
        "Expert stone masons and conservationists will repair ancient basalt walls, historical water stepwells, and decorate ruined archways with non-invasive natural materials.",
        "This project will place {cityEn} firmly on the historical tourism circuit, providing local jobs and promoting heritage hotels."
      ],
      marathi: [
        "भारतीय पुरातत्व सर्वेक्षण (ASI) आणि महाराष्ट्र पर्यटन मंडळाने {cityMr}मधील अनेक ऐतिहासिक स्थळांवर विशेष संवर्धन मोहीम सुरू केली आहे.",
        "तज्ज्ञ कारागीर पुरातन तटबंदी, जुन्या बारवा (Stepwells) आणि कमानींचे संवर्धन करण्यासाठी नैसर्गिक साहित्याचा वापर करून काम करतील.",
        "या उपक्रमामुळे {cityMr}चे नाव जागतिक ऐतिहासिक पर्यटन नकाशावर येईल, ज्यामुळे स्थानिक रोजगारालाही चालना मिळेल."
      ],
      hindi: [
        "भारतीय पुरातत्व सर्वेक्षण (ASI) और महाराष्ट्र पर्यटन बोर्ड ने {cityHi} के विभिन्न ऐतिहासिक स्थलों पर एक विशेष जीर्णोद्धार अभियान शुरू किया है।",
        "विशेषज्ञ कारीगर प्राचीन बलुआ पत्थरों की दीवारों, ऐतिहासिक बावड़ियों और मेहराबों की मरम्मत के लिए प्राकृतिक और पर्यावरण-अनुकूल सामग्री का उपयोग करेंगे।",
        "इस परियोजना से {cityHi} ऐतिहासिक पर्यटन मानचित्र पर उभरेगा और स्थानीय स्तर पर रोजगार के नए अवसर मिलेंगे।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=800&q=80",
    tags: ["Water Supply", "Environment", "Conservation"],
    title: {
      english: "New Drinking Water Pipeline and Lake Clean-up Drive Launched in {cityEn}",
      marathi: "{cityMr} शहराला पाणी पुरवठा करणाऱ्या तलावाच्या पुनरुज्जीवनाचे काम सुरू",
      hindi: "{cityHi} शहर को पानी की कमी से बचाने के लिए जलाशय का कायाकल्प शुरू"
    },
    summary: {
      english: "To guarantee sustainable round-the-clock water supply, local authorities in {cityEn} are de-silting major city water bodies.",
      marathi: "{cityMr}करांची पाण्याची चिंता मिटणार; जलसाठ्यातील गाळ काढण्याच्या आणि नवीन जलवाहिन्या टाकण्याच्या कामाला प्रारंभ.",
      hindi: "{cityHi} शहर के प्रमुख जलाशयों की गाद निकालने और नई जलापूर्ति लाइनें बिछाने का काम तेजी से शुरू किया गया है।"
    },
    content: {
      english: [
        "Aiming to permanently resolve summer water cuts, the municipal corporation of {cityEn} launched a comprehensive de-silting and ecosystem restoration drive for the city's primary freshwater lakes.",
        "Additionally, a high-capacity water filtration plant will be connected to a new 22-km distribution pipeline, designed to reduce transit leakages to zero.",
        "Environment activists have welcomed the civic efforts, which also include biological treatment to clear invasive aquatic weeds."
      ],
      marathi: [
        "उन्हाळ्यातील पाणीटंचाईच्या समस्येवर कायमस्वरूपी तोडगा काढण्यासाठी, {cityMr} महानगरपालिकेने शहरातील मुख्य गोड्या पाण्याच्या तलावांमधील गाळ काढण्याची मोहीम सुरू केली आहे.",
        "याशिवाय, उपनगरांना स्वच्छ पाणी पुरवण्यासाठी एका नवीन फिल्टर प्लांटचे काम सुरू असून २२ किमी लांबीची जलवाहिनी टाकली जात आहे.",
        "पर्यावरण कार्यकर्त्यांनी या पाऊलाचे स्वागत केले असून यामुळे तलावातील जलचर सृष्टीचेही रक्षण होईल."
      ],
      hindi: [
        "गर्मी के मौसम में पानी की किल्लत को हमेशा के लिए समाप्त करने के लिए, {cityHi} नगर निगम ने शहर के मुख्य जलाशयों से गाद निकालने और उनके जीर्णोद्धार का काम शुरू किया है।",
        "इसके अलावा, एक नए हाई-कैपेसिटी वाटर फिल्टर प्लांट को 22 किलोमीटर लंबी नई वितरण पाइपलाइन से जोड़ा जाएगा, जिससे रिसाव पूरी तरह रुकेगा।",
        "पर्यावरण प्रेमियों ने नगर निगम के इस प्रयास का स्वागत किया है, जिससे जलाशयों का जलस्तर सुधरेगा।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    tags: ["Arts & Culture", "Literature Festival", "Tourism"],
    title: {
      english: "Three-Day Annual Literature and Art Festival Celebrations Begin in {cityEn}",
      marathi: "{cityMr}मध्ये तीन दिवसीय भव्य साहित्य आणि कला महोत्सवाचा शानदार प्रारंभ",
      hindi: "{cityHi} में तीन दिवसीय वार्षिक साहित्य एवं कला महोत्सव का भव्य शुभारंभ"
    },
    summary: {
      english: "With classical musical concerts, literary talk shows, and local art galleries, {cityEn} celebrates its cultural roots.",
      marathi: "{cityMr}च्या सांस्कृतिक वैभवाची साक्ष देणाऱ्या वार्षिक कला महोत्सवात नामवंत साहित्यिक आणि कलाकारांची उपस्थिती.",
      hindi: "{cityHi} की सांस्कृतिक विरासत को संजोने वाले वार्षिक साहित्य उत्सव में जाने-माने लेखकों और कलाकारों का जमावड़ा लगा।"
    },
    content: {
      english: [
        "The annual cultural carnival of {cityEn} was inaugurated today amidst spectacular folk dance performances and classical percussion recitals.",
        "Over 120 authors, playwrights, and artists from across Maharashtra have gathered to participate in panel discussions, poetry slams, and traditional handicraft sales.",
        "The event has drawn thousands of local students and cultural enthusiasts, reinforcing the region's rich intellectual legacy."
      ],
      marathi: [
        "{cityMr}चा वधप्रतिक्षित वार्षिक कला व साहित्य महोत्सव आज पारंपरिक लोकनृत्य आणि संगीत मैफिलीने उत्साहात सुरू झाला.",
        "महाराष्ट्रभरातून १२० हून अधिक साहित्यिक, कवी आणि कलाकार या महोत्सवातील विविध चर्चासत्रे आणि काव्यसंमेलनांमध्ये सहभागी झाले आहेत.",
        "स्थानिक नागरिक आणि हजारो विद्यार्थ्यांनी या प्रदर्शनांना भेट देऊन कलाकारांचा उत्साह वाढवला आहे."
      ],
      hindi: [
        "{cityHi} का बहुप्रतीक्षित वार्षिक कला और साहित्य उत्सव आज शानदार लोक नृत्यों और शास्त्रीय संगीत की प्रस्तुतियों के साथ शुरू हुआ।",
        "महाराष्ट्र के कोने-कोने से 120 से अधिक लेखक, रंगकर्मी और चित्रकार इस तीन दिवसीय उत्सव में संगोष्ठियों और कवी सम्मेलनों में हिस्सा लेने पहुंचे हैं।",
        "स्थानीय कला प्रेमियों और हजारों विद्यार्थियों ने पहले ही दिन कार्यक्रम में पहुंचकर उत्सव की शोभा बढ़ाई।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1488459718432-01055e67e1f5?auto=format&fit=crop&w=800&q=80",
    tags: ["Organic Farming", "Agriculture", "Millet Promotion"],
    title: {
      english: "Organic Farmers' Cooperative Expo Attracts Large Buyers to {cityEn}",
      marathi: "{cityMr}मध्ये सेंद्रिय शेती आणि तृणधान्य उत्पादक शेतकरी परिषदेला मोठा प्रतिसाद",
      hindi: "{cityHi} में जैविक खेती और बाजरा उत्पादक किसान सम्मेलन को मिला जबरदस्त प्रतिसाद"
    },
    summary: {
      english: "More than 150 local organic farmer collectives in {cityEn} display residue-free millets and fruits, securing high-value retail supply contracts.",
      marathi: "{cityMr} आणि खान्देश-विदर्भ परिसरातील सेंद्रिय शेती करणाऱ्या शेतकऱ्यांना थेट खरेदीदारांशी जोडणारा भव्य उपक्रम.",
      hindi: "{cityHi} के 150 से अधिक जैविक किसान समूहों ने अपनी बिना कीटनाशकों की जैविक फसलों का प्रदर्शन कर खुदरा कंपनियों से बड़े अनुबंध हासिल किए।"
    },
    content: {
      english: [
        "A premium agricultural exhibition focusing on organic millets, pulses, and endemic fruit varieties was organized by the Department of Agriculture in {cityEn}.",
        "Major national organic retail chains and premium export companies set up registration desks to sign direct farm-to-fork purchasing contracts with local farmer collectives.",
        "Farmers expressed that bypassing traditional commission agents allows them to retain up to 35% higher margins on high-quality organic grains."
      ],
      marathi: [
        "{cityMr}च्या कृषी विभागामार्फत सेंद्रिय बाजरी, ज्वारी आणि स्थानिक फळांच्या थेट विक्रीसाठी भव्य प्रदर्शनाचे आयोजन करण्यात आले आहे.",
        "देशातील आघाडीच्या रिटेल कंपन्यांनी थेट शेतकऱ्यांकडून मालाची खरेदी करण्यासाठी स्वतंत्र कक्ष स्थापन केले असून अनेक करार केले आहेत.",
        "मध्यस्थांशिवाय (दलाल) थेट बाजारात माल विकता आल्याने शेतकऱ्यांना त्यांच्या मालाला ३५% अधिक नफा मिळत आहे."
      ],
      hindi: [
        "{cityHi} के कृषि विभाग द्वारा आयोजित इस विशेष प्रदर्शनी में जैविक बाजरा, दालों और जैविक फलों की बिक्री के लिए किसानों को आमंत्रित किया गया।",
        "देश की बड़ी खुदरा श्रृंखलाओं और निर्यात कंपनियों ने सीधे खेतों से फसल खरीदने के लिए अनुबंधों पर हस्ताक्षर किए।",
        "किसानों ने कहा कि सीधे बाजार से जुड़ने से उन्हें बिचौलियों से मुक्ति मिली है और उनकी आय में 35% तक की वृद्धि दर्ज की जा रही है।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    tags: ["Education", "Skill Center", "Youth"],
    title: {
      english: "New Youth Skill Development and Vocational Institute Sanctioned in {cityEn}",
      marathi: "{cityMr}मध्ये नवीन शासकीय कौशल्य विकास आणि व्यवसाय प्रशिक्षण केंद्र मंजूर",
      hindi: "{cityHi} में नए सरकारी कौशल्य विकास और व्यवसाय प्रशिक्षण केंद्र को मिली हरी झंडी"
    },
    summary: {
      english: "To make local engineering and diploma graduates highly job-ready, the state-of-the-art center in {cityEn} will offer free advanced technical training.",
      marathi: "{cityMr}मधील गरजू तरुणांना आधुनिक रोबोटिक्स, सीएनसी आणि आयटी कौशल्यांचे मोफत प्रशिक्षण मिळणार आहे.",
      hindi: "{cityHi} के युवाओं को आधुनिक रोबोटिक्स, सीएनसी कोडिंग और कंप्यूटर प्रोग्रामिंग का निशुल्क व्यावसायिक प्रशिक्षण दिया जाएगा।"
    },
    content: {
      english: [
        "To address local industrial talent demands, a modern multi-disciplinary vocational training institute has been sanctioned in {cityEn} with a state budget of ₹42 crores.",
        "Partnering with leading manufacturing giants, the institute will offer hands-on certification in industrial automation, electric vehicle repairs, and cloud computing solutions.",
        "Graduates from rural backgrounds will receive free hostel facilities and fully sponsored placement assistance upon completion of their courses."
      ],
      marathi: [
        "स्थानिक औद्योगिक क्षेत्रातील कुशल मनुष्यबळाची गरज पूर्ण करण्यासाठी {cityMr}मध्ये ₹४२ कोटींच्या शासकीय व्यवसाय प्रशिक्षण केंद्राला मंजुरी मिळाली आहे.",
        "या केंद्रात नामांकित कंपन्यांच्या सहकार्याने औद्योगिक ऑटोमेशन, इलेक्ट्रिक व्हेईकल दुरुस्ती आणि क्लाउड कम्प्युटिंगचे कोर्सेस शिकवले जातील.",
        "ग्रामीण भागातील विद्यार्थ्यांना मोफत वसतिगृहाची सुविधा आणि प्रशिक्षण पूर्ण झाल्यावर नोकरीसाठी १००% मदत दिली जाईल."
      ],
      hindi: [
        "क्षेत्र के औद्योगिक घरानों की कुशल कार्यबल की मांग को पूरा करने के लिए, {cityHi} में ₹42 करोड़ की लागत से एक आधुनिक प्रशिक्षण केंद्र की स्थापना की जाएगी।",
        "इस संस्थान में देश की बड़ी ऑटोमोबाइल कंपनियों के सहयोग से इलेक्ट्रिक वाहनों की रिपेयरिंग और क्लाउड कंप्यूटिंग के व्यावहारिक कोर्स कराए जाएंगे।",
        "ग्रामीण पृष्ठभूमि के छात्रों को मुफ्त छात्रावास की सुविधा और कोर्स पूरा होने पर शत-प्रतिशत जॉब प्लेसमेंट सहायता दी जाएगी।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    tags: ["Women Empowerment", "Bachat Gat", "Microfinance"],
    title: {
      english: "Record Sales at Women's Bachat Gat and Micro-Enterprise Expo in {cityEn}",
      marathi: "{cityMr} महिला बचत गट प्रदर्शनात विक्रमी उलाढाल; गृहउद्योगांना बळ",
      hindi: "{cityHi} महिला स्वयं सहायता समूह प्रदर्शनी में दर्ज की गई रिकॉर्ड बिक्री"
    },
    summary: {
      english: "An overwhelming tourist crowd and local support lead to record-breaking sales of handcrafted spices and textiles in {cityEn}.",
      marathi: "{cityMr}मधील महिला बचत गटांनी उत्पादित केलेल्या सेंद्रिय मसाल्यांना आणि हस्तकला वस्तूंना ग्राहकांची मोठी पसंती.",
      hindi: "{cityHi} में आयोजित महिला बचत समूहों की प्रदर्शनी में जैविक मसालों और हाथ से बनी साड़ियों की बंपर बिक्री हुई।"
    },
    content: {
      english: [
        "The annual women-led micro-enterprise and self-help group exhibition in {cityEn} closed with record-breaking revenues of over ₹3.5 crores in just five days.",
        "Organized by the District Rural Development Agency, the expo featured over 200 stalls displaying traditional foods, herbal cosmetics, handwoven fabrics, and chemical-free home cleaning solutions.",
        "The district collector announced that micro-loans with low-interest subsidies would be quickly processed for high-performing self-help groups to scale their output."
      ],
      marathi: [
        "{cityMr}मध्ये आयोजित वार्षिक महिला बचत गट आणि गृहउद्योग प्रदर्शनाची ५ दिवसांत ₹३.५ कोटींहून अधिक विक्रमी उलाढाल झाली.",
        "जिल्हा ग्रामीण विकास यंत्रणेमार्फत आयोजित या प्रदर्शनात २०० हून अधिक महिला बचत गटांनी घरगुती मसाले, आयुर्वेदिक सौंदर्य प्रसाधने आणि हाताने विणलेले कपडे विक्रीसाठी ठेवले होते.",
        "जिल्हाधिकाऱ्यांनी उत्कृष्ट कामगिरी करणाऱ्या बचत गटांना त्यांचा व्यवसाय वाढवण्यासाठी कमी व्याजावर कर्ज मंजूर करण्याचे आश्वासन दिले."
      ],
      hindi: [
        "{cityHi} में आयोजित पांच दिवसीय जिला स्तरीय महिला स्वयं सहायता समूह प्रदर्शनी का समापन ₹3.5 करोड़ के रिकॉर्ड व्यापार के साथ हुआ।",
        "जिला ग्रामीण विकास एजेंसी के सहयोग से आयोजित इस मेले में 200 से अधिक स्टाल लगाए गए थे, जहाँ पारंपरिक व्यंजन और हस्तनिर्मित कपड़े खरीदारों के आकर्षण का केंद्र रहे।",
        "जिलाधिकारी ने बेहतरीन प्रदर्शन करने वाले समूहों को अपना कारोबार बढ़ाने के लिए रियायती दरों पर आसान ऋण देने की घोषणा की है।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    tags: ["Industrial Corridor", "MIDC", "Manufacturing"],
    title: {
      english: "{cityEn} MIDC Allocated Special Packaging and Logistics Park Status",
      marathi: "{cityMr} एमआयडीसीला केंद्र शासनाकडून विशेष लॉजिस्टिक हबचा दर्जा मंजूर",
      hindi: "{cityHi} MIDC को केंद्र सरकार से मिला विशेष लॉजिस्टिक पार्क का दर्जा"
    },
    summary: {
      english: "This strategic designation will unlock central capital grants for building ultra-modern packing centers and railway freight yards in {cityEn}.",
      marathi: "{cityMr} औद्योगिक परिसराच्या विकासाला नवी गती; थेट रेल्वे फ्रेट कॉरिडोरशी जोडण्याचा मार्ग मोकळा.",
      hindi: "{cityHi} औद्योगिक क्षेत्र के बुनियादी ढांचे को मजबूत करने के लिए विशेष रेल माल ढुलाई गलियारा विकसित किया जाएगा।"
    },
    content: {
      english: [
        "In a major industrial victory for Khandesh and central Maharashtra, the Ministry of Commerce has designated {cityEn} MIDC as a dedicated Packaging and Logistics Hub.",
        "The designation unlocks ₹220 crores in central development grants, which will be utilized to lay dedicated broad-gauge railway siding lines directly inside the industrial zones.",
        "Over 80 local manufacturing exporters have welcomed the announcement, predicting a 25% reduction in transportation and shipping costs to ports."
      ],
      marathi: [
        "मध्य महाराष्ट्र आणि खान्देशच्या औद्योगिक क्षेत्रासाठी एका मोठ्या यशात, वाणिज्य मंत्रालयाने {cityMr} एमआयडीसीला विशेष लॉजिस्टिक पार्क म्हणून घोषित केले आहे.",
        "यामुळे केंद्र सरकारकडून ₹२२० कोटींचा निधी मिळणार असून, औद्योगिक क्षेत्रात थेट रेल्वे मालवाहतूक रेषा (Railway Sidings) टाकण्यासाठी हा निधी वापरला जाईल.",
        "येथील ८० हून अधिक स्थानिक कारखानदारांनी या निर्णयाचे स्वागत केले असून बंदरांपर्यंत माल पाठवण्याचा खर्च २५ टक्क्यांनी कमी होईल, असा विश्वास व्यक्त केला."
      ],
      hindi: [
        "मध्य महाराष्ट्र और खानदेश के उद्योगों के लिए एक महत्वपूर्ण निर्णय में, केंद्रीय वाणिज्य मंत्रालय ने {cityHi} एमआईडीसी को विशेष लॉजिस्टिक पार्क का दर्जा दिया है।",
        "इस निर्णय से औद्योगिक बुनियादी ढांचे के लिए ₹220 करोड़ का केंद्रीय विकास अनुदान मिलेगा, जिसका उपयोग सीधे फैक्ट्रियों तक ब्रॉड-गेज रेल लाइन बिछाने में होगा।",
        "स्थानीय उद्यमियों का कहना है कि इस रेलवे कनेक्टिविटी से समुद्री बंदरगाहों तक माल भेजने का समय और परिवहन लागत 25% तक कम हो जाएगी।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80",
    tags: ["Cleanliness", "Waste Management", "Swachh Bharat"],
    title: {
      english: "{cityEn} Municipal Corporation Achieves Top Rank in Swachhta Survey",
      marathi: "{cityMr} मनपाने स्वच्छता अभियानात राज्यात पटकावला मानाचा क्रमांक",
      hindi: "{cityHi} नगर निगम ने स्वच्छता सर्वेक्षण में राज्य में हासिल किया शीर्ष स्थान"
    },
    summary: {
      english: "Innovative door-to-door dry waste classification and rapid smart composting models secure a prestigious cleanliness ranking for {cityEn}.",
      marathi: "{cityMr} शहर कचरामुक्त आणि सुंदर बनवण्यासाठी नागरिकांनी आणि प्रशासनाने केलेल्या एकत्रित प्रयत्नांना मोठे यश.",
      hindi: "{cityHi} शहर को पूरी तरह कचरा मुक्त बनाने के लिए कचरा पृथक्करण और कंपोस्टिंग मॉडल की राज्य स्तर पर सराहना की गई।"
    },
    content: {
      english: [
        "The Municipal Corporation of {cityEn} has secured a prestigious position in the Swachh Survekshan awards under the category of rapidly developing smart cities.",
        "Key factors contributing to the victory include 100% door-to-door dry and wet waste classification, advanced GPS-tracked garbage collecting vans, and modern neighborhood smart-composting units.",
        "The Mayor dedicated this achievement to the dedicated sanitation workers and active participation of citizens who clean their local areas daily."
      ],
      marathi: [
        "जलद गतीने विकसित होणाऱ्या शहरांच्या श्रेणीत {cityMr} महानगरपालिकेने स्वच्छ सर्वेक्षण अभियानात राज्यात मानाचे स्थान पटकावले आहे.",
        "शहरातील १००% कचरा वर्गीकरण, कचरा वाहनांचे जीपीएस मॉनिटरिंग आणि प्रभागात राबवले जाणारे कंपोस्ट खत प्रकल्प यामुळे हे यश मिळाले आहे.",
        "महापौरांनी या यशाचे श्रेय कचरा वेचक सफाई कामगारांना आणि जागृत नागरिकांना दिले आहे."
      ],
      hindi: [
        "तीव्र गति से विकसित हो रहे शहरों की श्रेणी में, {cityHi} नगर निगम ने स्वच्छ सर्वेक्षण पुरस्कारों में राज्य स्तर पर उत्कृष्ट स्थान पाया है।",
        "इस सफलता के पीछे गीले और सूखे कचरे का 100% पृथक्करण, जीपीएस ट्रैकिंग से लैस वाहन और स्मार्ट वॉर्ड-स्तर कंपोस्टिंग इकाइयां मुख्य कारण रहे।",
        "महापौर ने इस उपलब्धि को नगर निगम के सफाई कर्मचारियों और नागरिकों के स्वच्छता के प्रति समर्पण को समर्पित किया।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
    tags: ["Green Transit", "Electric Bus", "Sustainability"],
    title: {
      english: "{cityEn} Public Transport Fleet Goes Green with 30 New Electric Buses",
      marathi: "{cityMr} परिवहन सेवेच्या ताफ्यात ३० नवीन इलेक्ट्रिक बसेस दाखल; प्रदूषणाला आळा",
      hindi: "{cityHi} परिवहन बेड़े में शामिल हुईं 30 नई इलेक्ट्रिक बसें; पर्यावरण को लाभ"
    },
    summary: {
      english: "Replacing highly polluting legacy diesel buses, the smart eco-friendly electric vehicles will run on busy routes across {cityEn}.",
      marathi: "{cityMr} शहरात प्रदूषणमुक्त प्रवासाचा नवा काळ सुरू; स्वस्त दरात आरामदायी प्रवासाची सुविधा.",
      hindi: "{cityHi} शहर में अत्यधिक प्रदूषण फैलाने वाली डीजल बसों के स्थान पर आधुनिक वातानुकूलित इलेक्ट्रिक बसें चलाई जाएंगी।"
    },
    content: {
      english: [
        "In a major step towards cleaner urban air, the municipal transport division of {cityEn} has inducted 30 zero-emission air-conditioned electric buses into active service today.",
        "The new fleet will connect prime residential suburbs to shopping centers and railway terminals. Three modern ultra-fast charging depots have been constructed at main bus hubs.",
        "Commuters welcomed the move, noting that the ride is exceptionally silent and ticket prices are kept on-par with regular non-AC buses to benefit common citizens."
      ],
      marathi: [
        "शहरातील हवेची गुणवत्ता सुधारण्याच्या दृष्टीने {cityMr} महानगरपालिकेने आज ताफ्यात ३० नवीन आरामदायी वातानुकूलित इलेक्ट्रिक बसेस दाखल केल्या आहेत.",
        "या बसेस शहरातील मुख्य रहिवासी भाग, बाजारपेठा आणि रेल्वे स्थानक यांना जोडतील. बस स्थानकांवर जलद चार्जिंग करण्यासाठी स्वतंत्र स्टेशन उभारण्यात आले आहेत.",
        "शांत प्रवास आणि डिझेल बसेसच्या तुलनेत समान तिकीट दर असल्याने नागरिकांनी या उपक्रमाचे मनापासून स्वागत केले आहे."
      ],
      hindi: [
        "हवा को स्वच्छ और प्रदूषण मुक्त बनाने के लिए, {cityHi} नगर निगम ने आज से 30 शून्य-उत्सर्जन वातानुकूलित इलेक्ट्रिक बसों का संचालन शुरू कर दिया है।",
        "यह बसें प्रमुख आवासीय क्षेत्रों को रेलवे स्टेशनों और अस्पतालों से जोड़ेंगी। मुख्य डिपो पर तीन आधुनिक फास्ट चार्जिंग स्टेशन बनाए गए हैं।",
        "यात्रियों ने इस कदम का स्वागत किया है क्योंकि सफर बेहद शांत और आरामदायक है, और किराया भी सामान्य बसों के बराबर रखा गया है।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    tags: ["Safety", "Police App", "Surveillance"],
    title: {
      english: "New Smart City Police Surveillance Command and Control Center Opens in {cityEn}",
      marathi: "{cityMr} पोलीस दलासाठी अत्याधुनिक सीसीटीव्ही नियंत्रण आणि सुरक्षा केंद्र कार्यान्वित",
      hindi: "{cityHi} पुलिस बल को मिला आधुनिक सीसीटीवी निगरानी और कमांड कंट्रोल सेंटर"
    },
    summary: {
      english: "Equipped with advanced facial recognition cameras and emergency response units, the command center will ensure women and citizen safety in {cityEn}.",
      marathi: "{cityMr} शहरातील कायदा व सुव्यवस्था अधिक मजबूत करण्यासाठी आणि महिलांच्या सुरक्षेसाठी अत्याधुनिक सीसीटीव्ही जाळे निर्माण.",
      hindi: "{cityHi} शहर में अपराध नियंत्रण और महिलाओं की सुरक्षा के लिए चप्पे-चप्पे पर कैमरे और हाई-टेक पुलिस वैन तैनात की जाएंगी।"
    },
    content: {
      english: [
        "To significantly strengthen safety across city junctions, a modern integrated police control room was inaugurated in {cityEn} by the state home minister.",
        "Over 850 high-definition CCTV cameras equipped with smart automatic number plate recognition (ANPR) are connected to the central database, reducing emergency response time to under 5 minutes.",
        "Additionally, a dedicated mobile application was launched for women to instantly alert the patrol team via one-touch SOS options."
      ],
      marathi: [
        "शहरातील सुरक्षितता वाढवण्यासाठी {cityMr} पोलीस मुख्यालयात अत्याधुनिक नियंत्रण कक्षाचे उद्घाटन राज्याच्या गृहमंत्र्यांच्या हस्ते करण्यात आले.",
        "शहरातील मुख्य चौकांमध्ये ८५० हून अधिक सीसीटीव्ही कॅमेरे बसवण्यात आले आहेत, जे थेट नियंत्रण कक्षाशी जोडले गेले आहेत. यामुळे पोलिसांचा प्रतिसाद वेळ ५ मिनिटांपेक्षा कमी होईल.",
        "महिलांच्या सुरक्षेसाठी एक नवीन मोबाईल ॲप देखील लॉन्च करण्यात आले असून यात वन-टच एसओएस (SOS) बटण देण्यात आले आहे."
      ],
      hindi: [
        "शहर के प्रमुख चौराहों पर सुरक्षा कड़ी करने के लिए, गृह मंत्री द्वारा {cityHi} पुलिस मुख्यालय में एक अत्याधुनिक कमांड सेंटर का उद्घाटन किया गया।",
        "850 से अधिक सीसीटीवी कैमरों को इस हाई-टेक कंट्रोल रूम से जोड़ा गया है, जिससे आपातकालीन स्थिति में पुलिस का रिस्पांस टाइम 5 मिनट से भी कम हो जाएगा।",
        "महिलाओं की सुरक्षा के लिए एक विशेष मोबाइल ऐप भी जारी किया गया है, जिसके वन-टच संकटकालीन एसओएस (SOS) विकल्प से सीधे मदद पहुंचेगी।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    tags: ["Handloom", "Heritage Crafts", "Weavers"],
    title: {
      english: "Weaver Subsidies Approved to Boost Traditional Handlooms in {cityEn} Region",
      marathi: "{cityMr} परिसरातील हातमाग विणकरांसाठी शासनाकडून विशेष कर्ज माफी आणि अनुदान योजना मंजूर",
      hindi: "{cityHi} क्षेत्र के पारंपरिक हथकरघा बुनकरों के लिए विशेष सरकारी पैकेज की घोषणा"
    },
    summary: {
      english: "To protect the dying art of traditional handloom weaving, the state government announced financial package support for weavers in {cityEn}.",
      marathi: "{cityMr}मधील पारंपरिक विणकरांच्या कलाकुसरीला प्रोत्साहन देण्यासाठी खेळते भांडवल आणि स्वस्त विजेचे अर्थसाहाय्य घोषित.",
      hindi: "{cityHi} के प्रसिद्ध हथकरघा वस्त्रों के पारंपरिक बुनकरों को सशक्त बनाने के लिए ब्याज मुक्त ऋण और बिजली रियायत दी जाएगी।"
    },
    content: {
      english: [
        "In a significant move to protect traditional textile heritage, a specialized subsidy package worth ₹15 crores was cleared for handloom weavers in the {cityEn} region.",
        "The subsidy will cover the purchase of high-quality cotton yarn, provide interest-free loans up to ₹2 lakhs, and offer free display counters at major metropolitan tourism fairs.",
        "Local master weavers expressed hope that this policy support would revive the interest of the younger generation in keeping the family craft alive."
      ],
      marathi: [
        "पारंपरिक हातमाग वस्त्रोद्योगाला नवसंजीवनी देण्यासाठी {cityMr} परिसरातील विणकरांसाठी ₹१५ कोटींच्या विशेष अनुदान योजनेला मंजुरी देण्यात आली आहे.",
        "या योजनेअंतर्गत दर्जेदार कापूस सूत खरेदीवर सवलत, ₹२ लाखांपर्यंत बिनव्याजी कर्ज आणि मोठ्या शहरांतील प्रदर्शनात मोफत गाळे दिले जातील.",
        "या ऐतिहासिक मदतीमुळे तरुण पिढी पुन्हा एकदा पारंपरिक विणकाम व्यवसायाकडे आकर्षित होईल, असा विश्वास स्थानिक कारागिरांनी व्यक्त केला."
      ],
      hindi: [
        "पारंपरिक हथकरघा उद्योग को पुनर्जीवित करने के उद्देश्य से, सरकार ने {cityHi} क्षेत्र के बुनकरों के लिए ₹15 करोड़ के विशेष सहायता पैकेज को मंजूरी दी है।",
        "इस योजना के तहत सूत की खरीद पर सब्सिडी, ₹2 लाख तक का ब्याज मुक्त ऋण और बड़े शहरों के मेलों में मुफ्त बिक्री स्टाल दिए जाएंगे।",
        "स्थानीय बुनकर संघ ने कहा कि इस सरकारी मदद से नई पीढ़ी को अपने खानदानी कौशल को बढ़ाने की नई ऊर्जा मिलेगी।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    tags: ["Governance", "Digital India", "Land Records"],
    title: {
      english: "{cityEn} Completes 100% Digitization of Rural Land and Ownership Records",
      marathi: "{cityMr} जिल्ह्यातील सातबारा आणि शेतीचे रेकॉर्ड १००% डिजिटल; जमिनीच्या वादांना बसणार आळा",
      hindi: "{cityHi} जिले में भूमि और स्वामित्व रिकॉर्ड का शत-प्रतिशत डिजिटलीकरण पूरा"
    },
    summary: {
      english: "Under the land-modernization program, rural landowners in {cityEn} can now download legal certificates and maps instantly via mobile.",
      marathi: "जमिनीचे वाद मिटणार आणि खरेदी-विक्री प्रक्रिया सोपी होणार; {cityMr}ने महसूल सुधारणेत राज्यात अव्वल स्थान मिळवले.",
      hindi: "{cityHi} जिले के किसान और भूस्वामी अब अपने जमीन के नक्शे और स्वामित्व प्रमाण पत्र ऑनलाइन घर बैठे डाउनलोड कर सकेंगे।"
    },
    content: {
      english: [
        "Achieving a key e-governance milestone, the district administration of {cityEn} announced that 100% of all land ownership registries and mapping details have been digitized.",
        "Landowners can access authentic digital signatures, trace boundaries via certified GPS maps, and file transfers without visiting regional tehsildar offices.",
        "This transparency is highly welcomed by local banks, who can now clear crop and development loans in under 48 hours based on verified online land ownership certificates."
      ],
      marathi: [
        "ई-प्रशासनाच्या (e-Governance) क्षेत्रात मोठी झेप घेत, {cityMr} जिल्हा प्रशासनाने जिल्ह्यातील सर्व सातबारा उतारे आणि शेतजमिनींचे नकाशे १००% डिजिटल केले आहेत.",
        "आता शेतकरी कोणत्याही कार्यालयात न जाता थेट मोबाईलवरून डिजिटल स्वाक्षरी असलेले अधिकृत उतारे डाउनलोड करू शकतील.",
        "या पारदर्शकतेमुळे बँकांना पीक कर्ज मंजूर करणे सुकर झाले असून आता अवघ्या ४८ तासांत कर्ज प्रक्रिया पूर्ण केली जात आहे."
      ],
      hindi: [
        "ई-गवर्नेंस की दिशा में एक बड़ी सफलता हासिल करते हुए, {cityHi} जिला प्रशासन ने अपनी जमीनों के दस्तावेजों का 100% डिजिटलीकरण पूरा कर लिया है।",
        "अब किसान तहसील कार्यालय जाए बिना सीधे अपने मोबाइल से डिजिटल हस्ताक्षरित खसरा-खतौनी और नक्शा डाउनलोड कर सकते हैं।",
        "इस डिजिटल पारदर्शिता से बैंकों को भी किसानों के फसली ऋण मात्र 48 घंटों में मंजूर करने में मदद मिल रही है।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    tags: ["Tourism", "Food Festival", "Local Flavors"],
    title: {
      english: "Mega Regional Food and Culture Carnival Commences in {cityEn}",
      marathi: "{cityMr}मध्ये पारंपरिक खाद्यपदार्थ आणि लोककला महोत्सवाचा थाट; खवय्यांची गर्दी",
      hindi: "{cityHi} में शुरू हुआ विशाल क्षेत्रीय व्यंजन और लोक कला मेला; उमड़े भोजन प्रेमी"
    },
    summary: {
      english: "Promoting ethnic Khandeshi, Varadi, and Maharashtrian dishes, the mega food carnival in {cityEn} hosts 150 local culinary chefs.",
      marathi: "{cityMr}च्या खास खाद्यसंस्कृतीची चव चाखण्यासाठी सुरू झालेल्या तीन दिवसीय खाद्य जत्रेत खवय्यांची तुफान गर्दी.",
      hindi: "{cityHi} के पारंपरिक स्वादिष्ट व्यंजनों को बढ़ावा देने के लिए आयोजित तीन दिवसीय मेले में 150 से अधिक रसोइयों ने भाग लिया।"
    },
    content: {
      english: [
        "A grand food and travel carnival dedicated to promoting the unique culinary identity of central Maharashtra has kicked off in {cityEn}.",
        "Featuring live cooking stations, folk music performances, and traditional sweet workshops, the event showcases local recipes handed down through generations.",
        "The tourism ministry plans to make this an annual event on the state travel calendar to draw international food bloggers and tourists to the area."
      ],
      marathi: [
        "मध्य महाराष्ट्राची आणि विशेषत: खान्देश-विदर्भाची खाद्यसंस्कृती साजरी करणारा तीन दिवसीय खाद्य महोत्सव आज {cityMr}मध्ये सुरू झाला.",
        "या महोत्सवात पारंपरिक मसाले, विविध प्रकारच्या पाककृती आणि लोकसंगीताच्या मैफिलीने रंगत आणली आहे.",
        "पर्यटन मंत्रालयाने सांगितले की, या भागातील पर्यटनाला चालना देण्यासाठी हा महोत्सव दरवर्षी अधिक मोठ्या प्रमाणावर आयोजित केला जाईल."
      ],
      hindi: [
        "मध्य महाराष्ट्र के पारंपरिक और प्रामाणिक स्वादों को लोकप्रिय बनाने के लिए, {cityHi} में आज से तीन दिवसीय विशाल खाद्य उत्सव का शुभारंभ हुआ।",
        "मेले में लाइव कुकिंग स्टेशन, लोक संगीत की प्रस्तुतियां और प्राचीन मिठाइयों की कार्यशालाएं दर्शकों को बेहद आकर्षित कर रही हैं।",
        "पर्यटन मंत्रालय ने घोषणा की है कि इसे राज्य के वार्षिक पर्यटन कैलेंडर का नियमित हिस्सा बनाया जाएगा ताकि वैश्विक स्तर पर पर्यटकों को आकर्षित किया जा सके।"
      ]
    }
  },
  {
    image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=800&q=80",
    tags: ["Sports", "Athletics", "Youth Complex"],
    title: {
      english: "Modern Olympic-Standard Athletics Stadium to Be Constructed in {cityEn}",
      marathi: "{cityMr}मध्ये ऑलिम्पिक दर्जाचे भव्य क्रीडा संकुल उभारणार; क्रीडा मंत्र्यांची घोषणा",
      hindi: "{cityHi} में बनेगा ओलंपिक स्तर का बहुउद्देशीय खेल स्टेडियम; खेल मंत्री ने की घोषणा"
    },
    summary: {
      english: "To nurture rural athletic talent, the state-of-the-art sports complex in {cityEn} will house advanced synthetic tracks and training facilities.",
      marathi: "ग्रामीण भागातील गुणवंत खेळाडूंना जागतिक दर्जाचे प्रशिक्षण मिळण्यासाठी {cityMr}मध्ये सिंथेटिक ट्रॅक आणि आधुनिक सुविधा निर्माण केल्या जातील.",
      hindi: "{cityHi} के ग्रामीण और प्रतिभावान एथलीटों को विश्व स्तरीय प्रशिक्षण प्रदान करने के लिए एक अत्याधुनिक सिंथेटिक ट्रैक और खेल परिसर बनाया जाएगा।"
    },
    content: {
      english: [
        "To give wings to aspiring athletes, the Sports Authority of Maharashtra approved a comprehensive budget of ₹55 crores for a modern stadium in {cityEn}.",
        "The facilities will include a 400-meter international-standard synthetic athletic track, an indoor swimming pool, and fully equipped modern physical therapy centers.",
        "Experienced national athletic coaches will be appointed at the academy to identify and train talented kids from remote rural pockets."
      ],
      marathi: [
        "तरुण खेळाडूंना प्रोत्साहन देण्यासाठी, महाराष्ट्र क्रीडा प्राधिकरणाने {cityMr}मध्ये भव्य क्रीडा संकुलाच्या उभारणीसाठी ₹५५ कोटींच्या निधीला मंजुरी दिली आहे.",
        "या संकुलात ४०० मीटरचा आंतरराष्ट्रीय सिंथेटिक ट्रॅक, इनडोअर स्विमिंग पूल आणि आधुनिक फिजिओथेरपी केंद्र असतील.",
        "ग्रामीण भागातील प्रतिभावान मुलांचा शोध घेऊन त्यांना थेट ऑलिम्पिक स्पर्धेसाठी तयार करण्यासाठी अनुभवी राष्ट्रीय प्रशिक्षकांची नियुक्ती केली जाईल."
      ],
      hindi: [
        "युवा एथलीटों के सपनों को साकार करने के लिए, महाराष्ट्र खेल प्राधिकरण ने {cityHi} में ₹55 करोड़ की लागत से बनने वाले आधुनिक स्टेडियम के प्रस्ताव को मंजूरी दी है।",
        "इस खेल परिसर में 400 मीटर का अंतरराष्ट्रीय सिंथेटिक ट्रैक, ऑल-वेदर इनडोर स्विमिंग पूल और उन्नत फिजियोथेरेपी केंद्र शामिल होंगे।",
        "ग्रामीण क्षेत्रों से होनहार बच्चों का चयन कर उन्हें राष्ट्रीय स्तर के कोचों द्वारा अंतरराष्ट्रीय स्पर्धाओं के लिए निशुल्क प्रशिक्षित किया जाएगा।"
      ]
    }
  }
];

const REPORTERS = [
  { name: "Aniket Deshpande", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
  { name: "Sunita Patil", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
  { name: "Rahul Gawande", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
  { name: "Manisha Kulkarni", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" },
  { name: "Vijay Salunkhe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" }
];

const generateProceduralArticles = (): Article[] => {
  const list: Article[] = [];
  const cityKeys = Object.keys(CITY_DATA);
  
  cityKeys.forEach((cityKey) => {
    const city = CITY_DATA[cityKey];
    TEMPLATES.forEach((temp, index) => {
      const reporter = REPORTERS[(index + cityKey.charCodeAt(0)) % REPORTERS.length];
      
      const views = 8000 + (index * 830) + (cityKey.charCodeAt(0) * 12);
      const likes = Math.floor(views * 0.05) + 12;
      const commentsCount = Math.floor(likes * 0.08) + 2;
      const readTime = 3 + (index % 3);
      const day = 15 + (index % 12);
      const dateStr = `June ${day}, 2026`;
      
      const interpolate = (str: string) => {
        return str
          .replace(/{cityEn}/g, city.en)
          .replace(/{cityMr}/g, city.mr)
          .replace(/{cityHi}/g, city.hi)
          .replace(/{districtEn}/g, city.districtEn)
          .replace(/{districtMr}/g, city.districtMr)
          .replace(/{districtHi}/g, city.districtHi);
      };
      
      const title = {
        english: interpolate(temp.title.english),
        marathi: interpolate(temp.title.marathi),
        hindi: interpolate(temp.title.hindi)
      };
      
      const summary = {
        english: interpolate(temp.summary.english),
        marathi: interpolate(temp.summary.marathi),
        hindi: interpolate(temp.summary.hindi)
      };
      
      const content = {
        english: temp.content.english.map(interpolate),
        marathi: temp.content.marathi.map(interpolate),
        hindi: temp.content.hindi.map(interpolate)
      };
      
      list.push({
        id: `procedural-${cityKey}-${index + 1}`,
        category: "maharashtra",
        city: cityKey,
        image: temp.image,
        author: {
          name: reporter.name,
          avatar: reporter.avatar
        },
        date: dateStr,
        readTime,
        views,
        likes,
        commentsCount,
        tags: [...temp.tags, city.en],
        title,
        summary,
        content
      });
    });
  });
  
  return list;
};

const PROCEDURAL_ARTICLES = generateProceduralArticles();

export const MOCK_ARTICLES: Article[] = [
  ...STATIC_MOCK_ARTICLES,
  ...PROCEDURAL_ARTICLES,
  ...ADDITIONAL_ARTICLES
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "c1",
    author: "Prasad Patwardhan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    text: "The infrastructure package is highly welcomed, but BMC must focus on the micro-level stormwater drainage as well. Otherwise, those underpasses will just become swimming pools.",
    date: "2 hours ago",
    likes: 42,
    isVerified: true,
    replies: [
      {
        id: "c1-r1",
        author: "Shreya Shinde",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
        text: "Absolutely agree! No amount of metro expansion saves us if our roads remain underwater every June.",
        date: "1 hour ago",
        likes: 12
      }
    ]
  },
  {
    id: "c2",
    author: "Anand Deshpande",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80",
    text: "Truly unbiased journalism by Janshakti. Dr. Kelkar's editorial hits the nail on the head. We need balanced state growth, and agriculture needs serious technology funding.",
    date: "4 hours ago",
    likes: 28,
    isVerified: true
  }
];
