export interface EPaperArticle {
  id: string;
  title: { marathi: string; english: string; hindi: string };
  content: { marathi: string[]; english: string[]; hindi: string[] };
  author?: { marathi: string; english: string; hindi: string };
  image?: string;
  category?: string;
  isMain?: boolean;
}

export interface EPaperPage {
  pageNumber: number;
  title: { marathi: string; english: string; hindi: string };
  subTitle: { marathi: string; english: string; hindi: string };
  layout: 'front' | 'lifestyle' | 'district' | 'editorial' | 'business' | 'special';
  articles: EPaperArticle[];
}

export const EPAPER_PAGES: EPaperPage[] = [
  {
    pageNumber: 1,
    title: { marathi: "मुख्य पान", english: "Front Page", hindi: "मुख्य पृष्ठ" },
    subTitle: { marathi: "महाराष्ट्र व देशातील सर्वात वेगवान घडामोडी", english: "Fastest news updates from Maharashtra and India", hindi: "महाराष्ट्र और देश की सबसे तेज़ खबरें" },
    layout: 'front',
    articles: [
      {
        id: "p1-a1",
        title: {
          marathi: "ऑपरेशन टायगरनंतर ठाकरेंचे आमदार शिंदेंच्या गळाला?",
          english: "After Operation Tiger, are Thackeray's MLAs falling for Shinde's bait?",
          hindi: "ऑपरेशन टाइगर के बाद क्या ठाकरे के विधायक शिंदे के जाल में फंस रहे हैं?"
        },
        author: { marathi: "विशेष प्रतिनिधी, मुंबई", english: "Special Correspondent, Mumbai", hindi: "विशेष प्रतिनिधि, मुंबई" },
        content: {
          marathi: [
            "ठाकरांच्या शिवसेनेचे सहा खासदार फुटल्यानंतर आता आमदार देखील फुटणार का अशी चर्चा सुरू झाली आहे. ठाकरेंच्या चार आमदारांनी एकनाथ शिंदे यांची भेट घेतल्याची माहिती विश्वसनीय सूत्रांकडून समोर आली आहे.",
            "या चार आमदारांनी १२ आमदार सोबत असल्याचा शब्द एकनाथ शिंदे यांना दिला असून ऑपरेशन टायगर ३.० सक्रिय झाले असल्याचे सांगितले जात आहे. यामुळे महाराष्ट्राच्या राजकीय वर्तुळात प्रचंड खळबळ उडाली आहे.",
            "एकनाथ शिंदे यांनी ऑपरेशन टायगर यशस्वी केल्यानंतर आता आमदारांचे ऑपरेशन होणार असल्याचे बोलले जात आहे. आगामी दोन ते तीन महिन्यांच्या कालावधीत हे आमदार मुख्य प्रवाहातून बाहेर पडण्याची दाट शक्यता आहे."
          ],
          english: [
            "Following the defection of six Thackeray faction MPs, speculation is rife whether their MLAs will follow suit. Information has surfaced from reliable sources that four Thackeray faction MLAs met Eknath Shinde recently.",
            "These four MLAs have reportedly assured Shinde that 12 more MLAs are ready to join them, claiming that 'Operation Tiger 3.0' is now highly active. This has triggered a major political storm in Maharashtra's circles.",
            "After Shinde successfully executed Operation Tiger for MPs, it is now rumored that an operation targeting MLAs is underway. These MLAs are highly likely to break away in the next two to three months."
          ],
          hindi: [
            "ठाकरे शिवसेना के छह सांसदों के पाला बदलने के बाद अब क्या विधायक भी बगावत करेंगे, इसे लेकर चर्चाएं तेज हो गई हैं। विश्वसनीय सूत्रों से जानकारी मिली है कि ठाकरे गुट के चार विधायकों ने हाल ही में एकनाथ शिंदे से मुलाकात की है।",
            "इन चार विधायकों ने कथित तौर पर शिंदे को आश्वासन दिया है कि उनके साथ 12 और विधायक आने को तैयार हैं, और दावा किया है कि 'ऑपरेशन टाइगर 3.0' अब पूरी तरह सक्रिय है। इससे महाराष्ट्र के राजनीतिक हलकों में बड़ा तूफान आ गया है।",
            "सांसदों के लिए ऑपरेशन टाइगर को सफलतापूर्वक अंजाम देने के बाद, अब चर्चा है कि विधायकों को निशाना बनाकर ऑपरेशन चलाया जा रहा है। अगले दो से तीन महीनों में इन विधायकों के अलग होने की प्रबल संभावना है।"
          ]
        },
        isMain: true
      },
      {
        id: "p1-a2",
        title: {
          marathi: "खासदार संजय दिना पाटलांची पत्रकारांना अर्वाच्य भाषेत शिवीगाळ",
          english: "MP Sanjay Dina Patil abuses journalists in vulgar language",
          hindi: "सांसद संजय दीना पाटिल ने पत्रकारों को अभद्र भाषा में दी गाली"
        },
        content: {
          marathi: [
            "मुंबईत उद्धव ठाकरे यांच्या शिवसेनेचे खासदार संजय दिना पाटील यांनी काल पत्रकारांना अत्यंत अर्वाच्य भाषेत शिवीगाळ केल्याचा गंभीर आरोप करण्यात आला आहे. या संपूर्ण घटनेचा व्हिडिओ सोशल मीडियावर प्रचंड व्हायरल झाला आहे.",
            "मुख्यमंत्री देवेंद्र फडणवीस यांनी यावर तीव्र प्रतिक्रिया देत 'प्रवासात असल्याने मला या प्रकरणाची माहिती नाही, पण कोणालाही धमकी देणे किंवा अपशब्द वापरणे अत्यंत चुकीचे आहे' असे स्पष्ट केले आहे.",
            "दुसरीकडे, उपमुख्यमंत्री एकनाथ शिंदे यांनी संजय दिना पाटील यांच्याशी चर्चा करून त्यांना पत्रकारांची जाहीर माफी मागण्याचा सल्ला दिला आहे."
          ],
          english: [
            "In Mumbai, serious allegations have been made against Uddhav Thackeray faction MP Sanjay Dina Patil for abusing journalists in highly vulgar language. A video capturing the entire incident has gone viral on social media platforms.",
            "Chief Minister Devendra Fadnavis reacted strongly, stating: 'Being on travel, I do not have detailed information, but threatening or using abusive language against anyone is completely unacceptable.'",
            "Meanwhile, Deputy CM Eknath Shinde reportedly spoke with Sanjay Dina Patil and advised him to issue a public apology to the journalists to defuse the rising anger."
          ],
          hindi: [
            "मुंबई में उद्धव ठाकरे गुट के सांसद संजय दीना पाटिल पर पत्रकारों को अत्यंत अभद्र भाषा में गाली देने का गंभीर आरोप लगा है। इस पूरी घटना का एक वीडियो सोशल मीडिया पर तेजी से वायरल हो रहा है।",
            "मुख्यमंत्री देवेंद्र फडणवीस ने इस पर तीखी प्रतिक्रिया देते हुए कहा: 'यात्रा पर होने के कारण मुझे इस मामले की विस्तृत जानकारी नहीं है, लेकिन किसी को भी धमकी देना या अपशब्दों का प्रयोग करना बेहद गलत है।'",
            "दूसरी ओर, उपमुख्यमंत्री एकनाथ शिंदे ने संजय दीना पाटिल से बात की है और उन्हें इस विवाद को शांत करने के लिए पत्रकारों से सार्वजनिक रूप से माफी मांगने की सलाह दी है।"
          ]
        }
      },
      {
        id: "p1-a3",
        title: {
          marathi: "आषाढी एकादशी निमित्त नाशिक-जळगाववरून ४ विशेष गाड्या!",
          english: "4 special trains from Nashik-Jalgaon for Ashadi Ekadashi!",
          hindi: "आषाढ़ी एकादशी के अवसर पर नाशिक-जलगांव से 4 विशेष ट्रेनें!"
        },
        content: {
          marathi: [
            "आषाढी एकादशीच्या निमित्ताने पंढरपूरला जाणाऱ्या विठ्ठल भक्तांसाठी मध्य रेल्वेने अत्यंत आनंदाची बातमी दिली आहे. वाढती गर्दी लक्षात घेता रेल्वे प्रशासनाने ४ विशेष गाड्या चालवण्याचा महत्त्वपूर्ण निर्णय घेतला आहे.",
            "या गाड्यांमध्ये प्रामुख्याने नागपूर-मिराज, नवी अमरावती-पंढरपूर, खामगाव-पंढरपूर आणि भुसावळ-पंढरपूर यांचा समावेश आहे. नाशिक आणि जळगाव जिल्ह्यातील भाविकांना भुसावळ, जळगाव, चाळीसगाव आणि मनमाड स्थानकांवरून या गाड्यांचा लाभ घेता येईल."
          ],
          english: [
            "Central Railway has brought wonderful news for Vitthal devotees traveling to Pandharpur on the auspicious occasion of Ashadhi Ekadashi. In view of the heavy rush, the railway administration has decided to run 4 special trains.",
            "These special trains include Nagpur-Miraj, New Amravati-Pandharpur, Khamgaon-Pandharpur, and Bhusawal-Pandharpur. Devotees from Nashik and Jalgaon districts can board these trains from Bhusawal, Jalgaon, Chalisgaon, and Manmad stations."
          ],
          hindi: [
            "आषाढ़ी एकादशी के पावन अवसर पर पंढरपुर जाने वाले विट्ठल भक्तों के लिए मध्य रेलवे ने बड़ी खुशखबरी दी है। यात्रियों की भारी भीड़ को देखते हुए रेलवे प्रशासन ने 4 विशेष ट्रेनें चलाने का महत्वपूर्ण निर्णय लिया है।",
            "इन विशेष ट्रेनों में नागपुर-मिरज, नई अमरावती-पंढरपुर, खामगांव-पंढरपुर और भुसावल-पंढरपुर शामिल हैं। नाशिक और जलगांव जिलों के श्रद्धालु भुसावल, जलगांव, चालीसगांव और मनमाड स्टेशनों से इन ट्रेनों का लाभ उठा सकते हैं।"
          ]
        }
      },
      {
        id: "p1-a4",
        title: {
          marathi: "यावला नाकांबदीत ट्रकच्यामध्ये सापडले अल्पवयीन युगुल : मुलगी पालकांच्या ताब्यात",
          english: "Minor couple found in truck during checkpoint inspection in Yaval: girl handed over to parents",
          hindi: "यावल नाकाबंदी में ट्रक के अंदर मिला नाबालिग जोड़ा: लड़की माता-पिता को सौंपी गई"
        },
        content: {
          marathi: [
            "यावल पोलिसांनी मंगळवारी रात्री केलेल्या नाकाबंदी दरम्यान चोपड्यातून यावलकडे येणाऱ्या एका ट्रकमध्ये १७ वर्षीय मुलगा आणि १४ वर्षीय अल्पवयीन मुलगी आढळून आली. चौकशी अंती हे दोघे पळून जात असल्याचे समोर आले.",
            "ट्रक चालक दारूच्या नशेत होता. पोलिसांनी तातडीने तिघांना ताब्यात घेऊन गुन्हा दाखल केला. त्यानंतर पोलिसांनी अल्पवयीन मुलीला गुरुवारी तिच्या पालकांच्या स्वाधीन केले असून, पालकांनी पोलिसांचे आभार मानले."
          ],
          english: [
            "During a night checkpoint operation by Yaval police on Tuesday, a 17-year-old boy and a 14-year-old minor girl were discovered inside a truck traveling from Chopda. Investigation revealed they had run away from home.",
            "The truck driver was found heavily intoxicated. Police detained all three and registered a case. The minor girl was safely reunited with her parents on Thursday, who expressed immense gratitude to the police force."
          ],
          hindi: [
            "यावल पुलिस द्वारा मंगलवार रात की गई नाकाबंदी के दौरान चोपड़ा से आ रहे एक ट्रक में 17 वर्षीय लड़का और 14 वर्षीय नाबालिग लड़की पाए गए। पूछताछ में खुलासा हुआ कि दोनों घर से भागकर जा रहे थे।",
            "ट्रक चालक अत्यधिक शराब के नशे में पाया गया। पुलिस ने तीनों को हिरासत में लेकर मामला दर्ज किया। गुरुवार को पुलिस ने नाबालिग लड़की को उसके माता-पिता को सुरक्षित सौंप दिया, जिन्होंने पुलिस प्रशासन का आभार जताया।"
          ]
        }
      }
    ]
  },
  {
    pageNumber: 2,
    title: { marathi: "जीवनशक्ती (फीचर)", english: "Jeevanshakti (Feature)", hindi: "जीवनशक्ती (फीचर)" },
    subTitle: { marathi: "आरोग्य, नातेसंबंध आणि मानवी जीवन शैली", english: "Health, relationships and lifestyle", hindi: "स्वास्थ्य, संबंध और जीवन शैली" },
    layout: 'lifestyle',
    articles: [
      {
        id: "p2-a1",
        title: {
          marathi: "आकर्षण, प्रेम संपलेला समाज कसा असेल?",
          english: "What would a society without attraction and love look like?",
          hindi: "आकर्षण और प्रेम समाप्त होने पर समाज कैसा दिखेगा?"
        },
        author: { marathi: "डॉ. प्रदीप पाटील, मानसोपचार तज्ज्ञ", english: "Dr. Pradeep Patil, Psychiatrist", hindi: "डॉ. प्रदीप पाटिल, मनोचिकित्सक" },
        content: {
          marathi: [
            "मानवी नात्यांचा पाया हा प्रेम आणि परस्परांबद्दलच्या आकर्षणावर आधारलेला असतो. जर समाजामधून भावनिक जवळीक, प्रेम आणि आकर्षण पूर्णपणे वजा झाले, तर समाजाची रचना कशी असेल, हा एक अत्यंत गंभीर मानसशास्त्रीय प्रश्न आहे.",
            "अशा समाजात सहानुभूतीची जागा कोरडेपणा घेईल. लोक फक्त कर्तव्यापोटी एकत्र राहतील, पण त्यांच्यात कोणताही जिवंतपणा नसेल. यामुळे मानसिक आजार आणि एकटेपणा प्रचंड प्रमाणात वाढेल. म्हणून भावनिक नातेसंबंध टिकवणे ही काळाची गरज आहे."
          ],
          english: [
            "The foundation of human relationships is built on love and mutual attraction. If emotional closeness, love, and attraction are completely removed from society, how will social structures survive? This is a critical psychological question.",
            "In such a society, dry transaction would replace empathy. People would live together purely out of duty, with no warmth or livelihood. This would lead to a massive spike in mental illness and extreme loneliness. Nurturing emotional bonds is crucial."
          ],
          hindi: [
            "मानवीय संबंधों की नींव प्रेम और आपसी आकर्षण पर टिकी होती है। यदि समाज से भावनात्मक निकटता, प्रेम और आकर्षण पूरी तरह समाप्त हो जाए, तो सामाजिक संरचना कैसी होगी? यह एक अत्यंत गंभीर मनोवैज्ञानिक प्रश्न है।",
            "ऐसे समाज में सहानुभूति का स्थान रूखापन ले लेगा। लोग केवल कर्तव्य के वश होकर साथ रहेंगे, लेकिन उनके बीच कोई आत्मीयता नहीं होगी। इससे मानसिक बीमारियाँ और अकेलापन अत्यधिक बढ़ जाएगा। भावनात्मक संबंधों को संजोना समय की मांग है।"
          ]
        },
        isMain: true
      },
      {
        id: "p2-a2",
        title: {
          marathi: "विवाहापूर्वी करा सिकल सेल चाचणी",
          english: "Perform Sickle Cell testing before marriage",
          hindi: "विवाह से पहले सिकल सेल परीक्षण करवाएं"
        },
        author: { marathi: "डॉ. विजय रमण, रक्तविकार तज्ज्ञ", english: "Dr. Vijay Raman, Hematologist", hindi: "डॉ. विजय रमन, हेमेटोलॉजिस्ट" },
        content: {
          marathi: [
            "सिकल सेल हा एक अनुवांशिक रक्ताचा आजार आहे. भावी पिढीला या गंभीर आजारापासून वाचवण्यासाठी विवाहापूर्वी सिकल सेल चाचणी करणे अत्यंत आवश्यक आहे.",
            "जर पती आणि पत्नी दोघांमध्येही सिकल सेलचे जंतू असतील, तर होणाऱ्या अपत्याला हा आजार जडण्याची शक्यता २५% हून अधिक असते. साध्या रक्त चाचणीद्वारे या धोक्याचे वेळीच निवारण करता येऊ शकते."
          ],
          english: [
            "Sickle Cell is a genetic blood disorder. To save future generations from this painful disease, getting a pre-marital sickle cell test is absolutely crucial.",
            "If both partners carry the sickle cell trait, there is a 25% or higher chance that their child will inherit the full disorder. A simple blood test can easily prevent this genetic transmission."
          ],
          hindi: [
            "सिकल सेल एक आनुवंशिक रक्त विकार है। भावी पीढ़ी को इस गंभीर और दर्दनाक बीमारी से बचाने के लिए विवाह से पूर्व सिकल सेल परीक्षण करवाना बेहद आवश्यक है।",
            "यदि पति-पत्नी दोनों में सिकल सेल के लक्षण हैं, तो होने वाले बच्चे में इस बीमारी के होने की संभावना 25% या अधिक होती है। एक साधारण रक्त परीक्षण से इस खतरे का समय रहते समाधान किया जा सकता है।"
          ]
        }
      },
      {
        id: "p2-a3",
        title: {
          marathi: "डेंटल विनीअर्स: सुंदर हास्याकडे प्रवास",
          english: "Dental Veneers: A journey towards a beautiful smile",
          hindi: "डेंटल विनियर: एक सुंदर मुस्कान का सफर"
        },
        author: { marathi: "डॉ. अशोक लांडगे, दंत तज्ज्ञ", english: "Dr. Ashok Landge, Dentist", hindi: "डॉ. अशोक लांडगे, दंत विशेषज्ञ" },
        content: {
          marathi: [
            "डेंटल विनीअर्स ही आधुनिक दंतशास्त्रातील एक वरदान ठरलेली प्रक्रिया आहे. यामुळे दातांचे डाग, वाकडेपणा किंवा फटी दूर करून एक अत्यंत सुंदर आणि आकर्षक हास्य मिळवता येते.",
            "ही प्रक्रिया जलद आणि वेदनारहित असून, दातांच्या नैसर्गिक रचनेला धक्का न लावता अत्यंत पातळ पापुद्रा दातांवर बसवला जातो. यामुळे आत्मविश्वास वाढण्यास मदत होते."
          ],
          english: [
            "Dental Veneers are a boon in modern cosmetic dentistry. They help mask stains, minor misalignments, or gaps, providing a highly beautiful and radiant smile.",
            "The procedure is quick and painless. A wafer-thin shell is bonded to the front of the teeth without affecting their natural strength, drastically boosting self-confidence."
          ],
          hindi: [
            "डेंटल विनियर आधुनिक कॉस्मेटिक डेंटिस्ट्री में एक वरदान के समान प्रक्रिया है। इससे दांतों के दाग, टेढ़ापन या खाली जगहों को ठीक करके एक बेहद सुंदर और आकर्षक मुस्कान प्राप्त की जा सकती है।",
            "यह प्रक्रिया त्वरित और दर्द रहित होती है। दांतों की प्राकृतिक संरचना को प्रभावित किए बिना दांतों पर एक बहुत पतली परत लगाई जाती है, जिससे व्यक्ति का आत्मविश्वास काफी बढ़ जाता है।"
          ]
        }
      }
    ]
  },
  {
    pageNumber: 3,
    title: { marathi: "जळगाव जिल्हा", english: "Jalgaon District", hindi: "जलगांव जिला" },
    subTitle: { marathi: "स्थानिक व प्रादेशिक महत्त्वाच्या घडामोडी", english: "Local and regional news and happenings", hindi: "स्थानीय और क्षेत्रीय महत्वपूर्ण समाचार" },
    layout: 'district',
    articles: [
      {
        id: "p3-a1",
        title: {
          marathi: "जुन्या वादातून दोन गटात हाणामारी; विळ्याने हल्ला",
          english: "Clash between two groups over old dispute; attack with sickle",
          hindi: "पुराने विवाद को लेकर दो गुटों में झड़प; हंसिया से हमला"
        },
        author: { marathi: "जळगाव वार्ताहर", english: "Jalgaon Correspondent", hindi: "जलगांव संवाददाता" },
        content: {
          marathi: [
            "जळगाव शहरातील पार्वतीबाई ओक नगर भागात काल रात्री जुन्या वादावरून दोन गटांमध्ये पुन्हा एकदा तीव्र संघर्ष उसळला. दोन्ही बाजूंनी एकमेकांवर दगडफेक करत धारदार विळ्याने हल्ला चढवला.",
            "या हाणामारीत चार जण गंभीर जखमी झाले असून त्यांना जवळच्या खाजगी रुग्णालयात दाखल करण्यात आले आहे. याप्रकरणी दोन्ही गटांच्या परस्परविरोधी तक्रारींवरून शनिपेठ पोलीस ठाण्यात गुन्हे दाखल करण्यात आले आहेत."
          ],
          english: [
            "A violent clash broke out between two groups in Parvatibai Ok Nagar in Jalgaon last night over an old dispute. Both sides pelted stones and attacked each other with sharp sickles.",
            "Four people were seriously injured in the scuffle and have been rushed to a nearby private hospital. Cross-complaints have been filed by both factions at the Shanipeth police station."
          ],
          hindi: [
            "जलगांव शहर के पार्वतीबाई ओक नगर इलाके में कल रात पुराने विवाद को लेकर दो गुटों के बीच एक बार फिर हिंसक झड़प हो गई। दोनों पक्षों ने एक-दूसरे पर पथराव किया और धारदार हंसिया से हमला कर दिया।",
            "इस झड़प में चार लोग गंभीर रूप से घायल हो गए हैं, जिन्हें इलाज के लिए नजदीकी निजी अस्पताल में भर्ती कराया गया है। इस मामले में दोनों गुटों की परस्पर विरोधी शिकायतों पर शनिपेठ पुलिस स्टेशन में मामला दर्ज किया गया है।"
          ]
        },
        isMain: true
      },
      {
        id: "p3-a2",
        title: {
          marathi: "चोपड्यात सावकारांकडून व्याजाच्या वसुलीसाठी तलाठ्याचा मानसिक छळ",
          english: "Talathi mentally harassed by moneylenders in Chopda over interest recovery",
          hindi: "चोपड़ा में साहूकारों द्वारा ब्याज वसूली के लिए तलाठी का मानसिक उत्पीड़न"
        },
        content: {
          marathi: [
            "चोपडा तालुक्यात व्याजाच्या पैशांच्या वसुलीसाठी एका तलाठ्याला वारंवार फोन करून अर्वाच्य भाषेत शिवीगाळ व जिवे मारण्याची धमकी दिल्याचा धक्कादायक प्रकार समोर आला आहे.",
            "या मानसिक त्रासाला कंटाळून तलाठ्याने स्वतःला जखमी करत आत्महत्या करण्याचा प्रयत्न केला. पोलिसांनी नऊ संशयित सावकारांवर गुन्हा दाखल केला असून पुढील तपास सुरू आहे."
          ],
          english: [
            "A shocking incident of mental harassment has surfaced in Chopda, where a local Talathi was repeatedly called, abused, and threatened with death by illegal moneylenders for interest recovery.",
            "Exhausted by the constant mental torture, the Talathi self-harmed in an attempted suicide. Police have registered a case against nine suspected moneylenders and are investigating."
          ],
          hindi: [
            "चोपड़ा तालुका में ब्याज की रकम वसूलने के लिए एक स्थानीय तलाठी को बार-बार फोन कर अभद्र भाषा में गाली देने और जान से मारने की धमकी देने का बेहद हैरान करने वाला मामला सामने आया है।",
            "इस मानसिक प्रताड़ना से तंग आकर तलाठी ने खुद को घायल कर आत्महत्या का प्रयास किया। पुलिस ने नौ संदिग्ध साहूकारों के खिलाफ मामला दर्ज कर आगे की जांच शुरू कर दी है।"
          ]
        }
      },
      {
        id: "p3-a3",
        title: {
          marathi: "अमळनेर उपजिल्हा रुग्णालयाला मोठी भरारी; २० अतिरिक्त पदांना मंजुरी",
          english: "Amalner sub-district hospital gets a massive upgrade; 20 additional posts approved",
          hindi: "अमलनेर उप-जिला अस्पताल को मिला बड़ा अपग्रेड; 20 अतिरिक्त पदों को मंजूरी"
        },
        content: {
          marathi: [
            "अमळनेर ग्रामीण रुग्णालयाचे उपजिल्हा रुग्णालयात श्रेणीवर्धन झाल्यानंतर महाराष्ट्र शासनाच्या आरोग्य विभागाने २० अतिरिक्त पदांना मंजुरी दिली आहे.",
            "या नवीन पदांमध्ये ४ तज्ज्ञ डॉक्टर्स आणि इतर महत्त्वाच्या वैद्यकीय स्टाफचा समावेश असेल. यामुळे अमळनेर परिसरातील आरोग्य सेवेचा दर्जा सुधारेल आणि गरजू रुग्णांना गावातच दर्जेदार उपचार मिळतील."
          ],
          english: [
            "Following the upgrade of the Amalner Rural Hospital into a Sub-District Hospital, the Maharashtra Health Department has sanctioned 20 additional staff posts.",
            "These new positions include 4 specialist doctors and other critical medical support staff. This upgrade is set to significantly improve local healthcare services in the Amalner region."
          ],
          hindi: [
            "अमलनेर ग्रामीण अस्पताल को उप-जिला अस्पताल में अपग्रेड किए जाने के बाद महाराष्ट्र स्वास्थ्य विभाग ने 20 अतिरिक्त पदों को मंजूरी दी है।",
            "इन नए पदों में 4 विशेषज्ञ डॉक्टर और अन्य महत्वपूर्ण चिकित्सा कर्मचारी शामिल होंगे। इस अपग्रेड से अमलनेर क्षेत्र में स्वास्थ्य सेवाओं के स्तर में काफी सुधार होगा।"
          ]
        }
      },
      {
        id: "p3-a4",
        title: {
          marathi: "देवदूत बनले अग्निशमन जवान! विहिरीत पडलेल्या तिघांना सुखरूप बाहेर काढले",
          english: "Firefighters act as saviors! Three rescued safely from deep well in Ganeshwadi",
          hindi: "दमकलकर्मी बने देवदूत! गणेशवाड़ी में गहरे कुएं से तीन लोगों को सुरक्षित निकाला गया"
        },
        content: {
          marathi: [
            "जळगाव शहरातील गणेशवाडी परिसरात एका बंद विहिरीवर मोटार काढत असताना स्लॅब कोसळून ९१ वर्षीय आजोबांसह तिघेजण ६० फूट खोल विहिरीत कोसळले.",
            "अग्निशमन दलाचे मुख्य अधिकारी अश्वजीत घरडे यांनी जीवाची पर्वा न करता स्वतः विहिरीत उतरून धाडसी बचाव मोहीम राबवली आणि तिघांनाही सुखरूप बाहेर काढले."
          ],
          english: [
            "In Ganeshwadi, Jalgaon, a concrete slab collapsed while extracting an electric motor, throwing three people, including a 91-year-old grandfather, into a 60-foot deep well.",
            "Fire chief Ashwajit Gharade displayed exemplary courage by personally descending into the deep well to lead a highly critical rescue operation, successfully pulling all three out alive."
          ],
          hindi: [
            "जलगांव शहर के गणेशवाड़ी इलाके में एक पुराने कुएं से मोटर निकालते समय कंक्रीट का स्लैब ढह गया, जिससे 91 वर्षीय बुजुर्ग सहित तीन लोग 60 फीट गहरे कुएं में गिर गए।",
            "दमकल प्रमुख अश्वजीत घरडे ने अपनी जान की परवाह न करते हुए खुद कुएं में उतरकर एक अत्यंत साहसिक बचाव अभियान चलाया और तीनों को सुरक्षित बाहर निकाल लिया।"
          ]
        }
      }
    ]
  },
  {
    pageNumber: 4,
    title: { marathi: "संपादकीय पान", english: "Editorial & Opinion", hindi: "संपादकीय और विचार" },
    subTitle: { marathi: "विचार, विश्लेषण आणि प्रबोधन", english: "Opinions, reviews and insightful columns", hindi: "विचार, विश्लेषण और ज्ञानवर्धक लेख" },
    layout: 'editorial',
    articles: [
      {
        id: "p4-a1",
        title: {
          marathi: "जलसंस्कृतीचे जतन: काळाची गरज",
          english: "Conservation of water culture: A primary necessity",
          hindi: "जल संस्कृति का संरक्षण: समय की मांग"
        },
        author: { marathi: "संपादकीय लेख", english: "Editorial Desk", hindi: "संपादकीय लेख" },
        content: {
          marathi: [
            "निसर्गाने आपल्याला दिलेला सर्वात मोठा ठेवा म्हणजे पाणी. परंतु, वाढत्या शहरीकरणामुळे आणि निष्काळजीपणामुळे आपल्या जलसंस्कृतीचा ऱ्हास होत चालला आहे.",
            "नद्यांचे संवर्धन करणे आणि पाणी अडवणे ही केवळ शासनाची जबाबदारी नसून, लोकचळवळ बनली पाहिजे. प्रत्येक नागरिकाने पाणी वाचवण्याची प्रतिज्ञा केली तरच आपली जलसंस्कृती जिवंत राहील आणि भविष्यातील दुष्काळाचा सामना करता येईल."
          ],
          english: [
            "The greatest treasure nature has given us is water. However, due to rapid urbanization and neglect, our water culture is deteriorating rapidly.",
            "Conserving rivers and harvesting rain is not just the government's duty, it must become a public movement. Only if every citizen pledges to save water can our water culture survive and ward off future droughts."
          ],
          hindi: [
            "प्रकृति द्वारा हमें दिया गया सबसे अनमोल उपहार जल है। हालांकि, बढ़ते शहरीकरण और लापरवाही के कारण हमारी जल संस्कृति का तेजी से ह्रास हो रहा है।",
            "नदियों का संरक्षण और जल संचयन केवल सरकार की जिम्मेदारी नहीं है, बल्कि इसे एक जन आंदोलन बनना चाहिए। यदि प्रत्येक नागरिक जल बचाने का संकल्प ले, तभी हमारी जल संस्कृति जीवित रहेगी।"
          ]
        },
        isMain: true
      },
      {
        id: "p4-a2",
        title: {
          marathi: "वीज जाते आणि येते... मध्ये काय घडते?",
          english: "Electricity goes and comes... What actually happens in between?",
          hindi: "बिजली जाती और आती है... पर्दे के पीछे वास्तव में क्या होता है?"
        },
        author: { marathi: "ज्ञानेश्वर अर्डाड, जनसंपर्क अधिकारी", english: "Dnyaneshwar Ardad, Public Relations Officer", hindi: "ज्ञानेश्वर अर्डाड, जनसंपर्क अधिकारी" },
        content: {
          marathi: [
            "पावसाळ्याच्या सुरुवातीला वीज पुरवठा खंडित होण्याची प्रमाणे वाढतात. वीज गेल्यावर आपण वीज वितरण कंपनीला दोष देऊन मोकळे होतो. पण वीज नेमकी का जाते, आणि ती पूर्ववत करण्यासाठी काय काय करावे लागते, याची माहिती कोणाला नसते.",
            "जेव्हा वीज जाते, तेव्हा सुरक्षा यंत्रणा स्वयंचलितपणे ट्रिप होते जेणेकरून अपघात टळतील. त्यानंतर कर्मचाऱ्यांना वादळ-पावसात खांबांवर चढून फॉल्ट शोधावा लागतो. हे काम जीवाला धोक्यात घालून केले जाते, याचे भान ठेवले पाहिजे."
          ],
          english: [
            "Power outages increase significantly at the start of the monsoon. We often blame the electricity distribution company immediately. But very few understand why power goes out and the massive effort required to restore it.",
            "When a fault occurs, safety systems automatically trip the grid to prevent fatal accidents. Technicians must then climb poles during heavy rain and high winds to locate and repair the fault, risking their lives behind the scenes."
          ],
          hindi: [
            "मानसून की शुरुआत में बिजली कटौती की घटनाएं काफी बढ़ जाती हैं। बिजली जाने पर हम अक्सर तुरंत बिजली कंपनी को दोष देने लगते हैं। लेकिन बहुत कम लोग जानते हैं कि बिजली क्यों जाती है और इसे बहाल करने के लिए कितना कठिन प्रयास करना पड़ता है।",
            "जब कोई खराबी आती है, तो सुरक्षा प्रणालियाँ हादसों से बचने के लिए ग्रिड को स्वतः बंद कर देती हैं। इसके बाद दमकलकर्मियों और तकनीशियनों को भारी बारिश और आंधी में खंभों पर चढ़कर खराबी ढूंढनी और ठीक करनी पड़ती है।"
          ]
        }
      }
    ]
  },
  {
    pageNumber: 5,
    title: { marathi: "अर्थशक्ती (व्यापार)", english: "Arthashakti (Business)", hindi: "अर्थशक्ती (व्यापार)" },
    subTitle: { marathi: "अर्थकारण, बाजार आणि व्यापार घडामोडी", english: "Finance, markets and global commerce", hindi: "वित्त, बाजार और वैश्विक व्यापार की खबरें" },
    layout: 'business',
    articles: [
      {
        id: "p5-a1",
        title: {
          marathi: "जीडीपी यंदा घसरणार? एस&पी ग्लोबल रेटिंग्सचा नवा अंदाज",
          english: "Will GDP drop this year? S&P Global Ratings lowers projection",
          hindi: "क्या इस साल जीडीपी गिरेगी? एस&पी ग्लोबल रेटिंग्स ने अनुमान घटाया"
        },
        author: { marathi: "नवी दिल्ली वृत्तसंस्था", english: "New Delhi News Desk", hindi: "नई दिल्ली समाचार ब्यूरो" },
        content: {
          marathi: [
            "एस&पी ग्लोबल रेटिंग्सने भारताच्या चालू आर्थिक वर्षासाठीच्या जीडीपी वाढीचा अंदाज ६.८% वरून ६.६% पर्यंत खाली आणला आहे. जागतिक मंदी आणि महागाईचा फटका भारतीय अर्थव्यवस्थेला बसण्याची शक्यता वर्तवली गेली आहे.",
            "असे असले तरी, भारताचा विकास दर जगातील इतर विकसनशील देशांच्या तुलनेत अत्यंत समाधानकारक राहील. देशांतर्गत मागणी आणि पायाभूत सुविधांवरील खर्च यामुळे अर्थव्यवस्थेला चांगला आधार मिळेल, असे रेटिंग्सने म्हटले आहे."
          ],
          english: [
            "S&P Global Ratings has lowered India's GDP growth forecast for the current financial year from 6.8% to 6.6%. The reduction is attributed to global economic slowdowns and stubborn inflationary pressures.",
            "Despite the revision, India's growth rate remains highly robust compared to other emerging markets. Strong domestic demand and steady government spending on infrastructure will continue to support the economy."
          ],
          hindi: [
            "एस&पी ग्लोबल रेटिंग्स ने चालू वित्त वर्ष के लिए भारत के सकल घरेलू उत्पाद (जीडीपी) की वृद्धि का अनुमान 6.8% से घटाकर 6.6% कर दिया है। यह कटौती वैश्विक मंदी और महंगाई के दबावों के कारण की गई है।",
            "अनुमान में इस कमी के बावजूद, अन्य उभरते बाजारों की तुलना में भारत की विकास दर काफी मजबूत बनी हुई है। मजबूत घरेलू मांग और बुनियादी ढांचे पर सरकारी खर्च से अर्थव्यवस्था को लगातार सहारा मिलेगा।"
          ]
        },
        isMain: true
      },
      {
        id: "p5-a2",
        title: {
          marathi: "अदानी समूहाचे २०३५ पर्यंत १० गिगावॉट अणुऊर्जेचे उद्दिष्ट",
          english: "Adani Group targets 10 GW of nuclear power by 2035",
          hindi: "अदाणी समूह का 2035 तक 10 गीगावाट परमाणु ऊर्जा का लक्ष्य"
        },
        content: {
          marathi: [
            "अदानी समूहाने शाश्वत ऊर्जेच्या क्षेत्रात मोठी झेप घेत २०३५ पर्यंत १० गिगावॉट अणुऊर्जा निर्मितीचे महत्त्वाकांक्षी उद्दिष्ट समोर ठेवले आहे.",
            "यामुळे भारताच्या हरित ऊर्जा मोहिमेला मोठी चालना मिळेल. समूह सौर, पवन आणि अणुऊर्जेचा एकत्रित मेळ घालून शाश्वत वीज निर्मिती करणार आहे."
          ],
          english: [
            "In a major move toward sustainable energy, the Adani Group has declared a highly ambitious target of generating 10 Gigawatts of nuclear power by 2035.",
            "This initiative will provide a huge boost to India's green energy mission. The conglomerate plans to combine solar, wind, and nuclear assets for sustainable power distribution."
          ],
          hindi: [
            "टिकाऊ ऊर्जा के क्षेत्र में एक बड़ा कदम उठाते हुए, अदाणी समूह ने 2035 तक 10 गीगावाट परमाणु ऊर्जा उत्पादन का एक अत्यंत महत्वाकांक्षी लक्ष्य घोषित किया है।",
            "यह पहल भारत के हरित ऊर्जा मिशन को बड़ा बढ़ावा देगी। समूह सौर, पवन और परमाणु ऊर्जा संपत्तियों को मिलाकर टिकाऊ बिजली वितरण की योजना बना रहा है।"
          ]
        }
      }
    ]
  },
  {
    pageNumber: 6,
    title: { marathi: "विशेष वृत्त", english: "Special News", hindi: "विशेष समाचार" },
    subTitle: { marathi: "राष्ट्रीय आणि जागतिक पातळीवरील विशेष घडामोडी", english: "Special national and global stories", hindi: "राष्ट्रीय और वैश्विक विशेष समाचार" },
    layout: 'special',
    articles: [
      {
        id: "p6-a1",
        title: {
          marathi: "मराठी भाषेसाठी विकास केंद्र उभारणार",
          english: "Development centers to be set up for Marathi language promotion",
          hindi: "मराठी भाषा के प्रचार के लिए स्थापित किए जाएंगे विकास केंद्र"
        },
        author: { marathi: "मराठी भाषा विभाग", english: "Marathi Language Department", hindi: "मराठी भाषा विभाग" },
        content: {
          marathi: [
            "मराठी भाषेचा जागतिक पातळीवर प्रचार आणि प्रसार करण्यासाठी विविध ठिकाणी विकास केंद्रे उभारण्याचा महत्त्वपूर्ण निर्णय महाराष्ट्र शासनाने घेतला आहे.",
            "या केंद्रांच्या माध्यमातून तरुण पिढीला मराठी साहित्याची ओळख करून दिली जाईल, तसेच डिजिटल माध्यमांवर मराठी भाषेचा वापर वाढवण्यासाठी तांत्रिक सहाय्य दिले जाईल."
          ],
          english: [
            "The Maharashtra Government has taken a milestone decision to establish Marathi Language Development Centers in major cities to promote the language globally.",
            "These development centers will introduce the younger generation to rich Marathi literature and provide technical aid to increase Marathi content usage on digital media platforms."
          ],
          hindi: [
            "महाराष्ट्र सरकार ने भाषा को वैश्विक स्तर पर बढ़ावा देने के लिए प्रमुख शहरों में मराठी भाषा विकास केंद्र स्थापित करने का एक ऐतिहासिक निर्णय लिया है।",
            "ये विकास केंद्र युवा पीढ़ी को समृद्ध मराठी साहित्य से परिचित कराएंगे और डिजिटल मीडिया प्लेटफॉर्म पर मराठी भाषा के उपयोग को बढ़ाने के लिए तकनीकी सहायता प्रदान करेंगे।"
          ]
        },
        isMain: true
      },
      {
        id: "p6-a2",
        title: {
          marathi: "मालगाडीच्या १३ व्या वॅगनमध्ये सापडली नवजात बालिका",
          english: "Newborn girl rescued from the 13th wagon of a goods train in Bhusawal",
          hindi: "भुसावल में मालगाड़ी के 13वें डिब्बे से नवजात बच्ची सुरक्षित निकाली गई"
        },
        content: {
          marathi: [
            "भुसावळ रेल्वे स्थानकावर एका मालगाडीच्या १३ व्या वॅगनमध्ये नुकतीच जन्माला आलेली एक निष्पाप बालिका कपड्यात गुंडाळलेल्या अवस्थेत सापडली.",
            "रेल्वे सुरक्षा बल (RPF) आणि महाराष्ट्र सुरक्षा बल (MSF) च्या जवानांनी कमालीच्या सतर्कतेने रडण्याचा आवाज ऐकला आणि मुलीला बाहेर काढून तातडीने रुग्णालयात दाखल केले. तिची प्रकृती आता स्थिर आहे."
          ],
          english: [
            "At the Bhusawal railway station, a newborn baby girl was found wrapped in cloth inside the 13th wagon of a stationary goods train.",
            "RPF and MSF personnel displayed extraordinary vigilance upon hearing her crying. They successfully rescued the infant and rushed her to a government hospital. Her condition is currently reported as stable."
          ],
          hindi: [
            "भुसावल रेलवे स्टेशन पर एक खड़ी मालगाड़ी के 13वें डिब्बे के अंदर कपड़े में लिपटी एक नवजात बच्ची पाई गई।",
            "आरपीएफ और एमएसएफ के जवानों ने रोने की आवाज सुनकर असाधारण सतर्कता दिखाई। उन्होंने बच्ची को सुरक्षित बाहर निकाला और तुरंत सरकारी अस्पताल पहुंचाया, जहां उसकी स्थिति अब स्थिर बताई जा रही है।"
          ]
        }
      }
    ]
  }
];
