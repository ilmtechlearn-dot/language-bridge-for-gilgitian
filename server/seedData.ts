export interface SeedPhrase {
  sourceText: string;
  sourceLanguage: string;
  translations: {
    english: string;
    urdu: string;
    shina: string;
    balti: string;
    burushaski: string;
  };
  category:
    | 'Greetings'
    | 'Travel'
    | 'Food'
    | 'Hotel'
    | 'Emergency'
    | 'Education'
    | 'Healthcare'
    | 'Shopping'
    | 'Family'
    | 'Daily conversation'
    | 'Tourist communication';
  pronunciations: {
    english?: string;
    urdu?: string;
    shina?: string;
    balti?: string;
    burushaski?: string;
  };
  pronunciationText?: string;
  verified: boolean;
}

export const samplePhrases: SeedPhrase[] = [
  // --- 1. GREETINGS ---
  {
    sourceText: 'Hello',
    sourceLanguage: 'english',
    translations: {
      english: 'Hello',
      urdu: 'ہیلو / السلام علیکم',
      shina: 'السلام علیکم / سلام (Salam)',
      balti: 'جولے / سلام (Ju-le / Salam)',
      burushaski: 'جولے / السلام علیکم (Ju-le / Salam)'
    },
    category: 'Greetings',
    pronunciations: {
      english: 'Hel-loh',
      urdu: 'As-salaam-u-alaikum',
      shina: 'As-salaam-u-alaikum',
      balti: 'Joo-lay',
      burushaski: 'Joo-lay'
    },
    pronunciationText: 'Universal respectful greeting across Gilgit-Baltistan: Ju-le or Salam.',
    verified: true
  },
  {
    sourceText: 'How are you?',
    sourceLanguage: 'english',
    translations: {
      english: 'How are you?',
      urdu: 'آپ کیسے ہیں؟',
      shina: 'تو کونو ہنو؟ (Tu kono hano?)',
      balti: 'کھیرنگ کھموزانگ یودبا؟ (Kherang khamozang yodba?)',
      burushaski: 'ان بیلتس با؟ (Un beeltes ba?)'
    },
    category: 'Greetings',
    pronunciations: {
      english: 'How are you?',
      urdu: 'Aap kaisay hain?',
      shina: 'Too koh-no hah-no?',
      balti: 'Khay-rung khah-moh-zang yohd-bah?',
      burushaski: 'Oon beel-tes bah?'
    },
    pronunciationText: 'Formal and polite inquiry of wellbeing in all three indigenous languages.',
    verified: true
  },
  {
    sourceText: 'I am fine, thank you',
    sourceLanguage: 'english',
    translations: {
      english: 'I am fine, thank you',
      urdu: 'میں ٹھیک ہوں، شکریہ',
      shina: 'مَ شکر حنوس، مہربانی (Ma shukur hanus, meherbani)',
      balti: 'ینگ کھموزانگ یود، شکریہ (Nga khamozang yod, shukriya)',
      burushaski: 'جے شوءا با، مہربانی (Je shuwa ba, meherbani)'
    },
    category: 'Greetings',
    pronunciations: {
      english: 'Eye am fyne, thank yoo',
      urdu: 'Main theek hoon, shukriya',
      shina: 'Mah shoo-kur hah-noos, may-her-bah-nee',
      balti: 'Ngah khah-moh-zahng yohd, shoo-kree-yah',
      burushaski: 'Jay shoo-wah bah, may-her-bah-nee'
    },
    verified: true
  },
  {
    sourceText: 'Good morning',
    sourceLanguage: 'english',
    translations: {
      english: 'Good morning',
      urdu: 'صبح بخیر',
      shina: 'صبح بخیر / سوسار سلام (Subah bakhair)',
      balti: 'چھوکسو کھموزانگ (Chokso khamozang)',
      burushaski: 'گلتس مبارک / صبح بخیر (Gultas mubarak)'
    },
    category: 'Greetings',
    pronunciations: {
      english: 'Good mor-ning',
      urdu: 'Subah ba-khair',
      shina: 'Soo-bah bah-khayr',
      balti: 'Chok-soh khah-moh-zang',
      burushaski: 'Gool-tahs moo-bah-rahk'
    },
    verified: true
  },
  {
    sourceText: 'Good evening',
    sourceLanguage: 'english',
    translations: {
      english: 'Good evening',
      urdu: 'شام بخیر',
      shina: 'شام بخیر (Shaam bakhair)',
      balti: 'شام کھموزانگ (Shaam khamozang)',
      burushaski: 'شام مبارک (Shaam mubarak)'
    },
    category: 'Greetings',
    pronunciations: {
      english: 'Good eev-ning',
      urdu: 'Shaam ba-khair',
      shina: 'Shahm bah-khayr',
      balti: 'Shahm khah-moh-zahng',
      burushaski: 'Shahm moo-bah-rahk'
    },
    verified: true
  },
  {
    sourceText: 'Welcome to Gilgit',
    sourceLanguage: 'english',
    translations: {
      english: 'Welcome to Gilgit',
      urdu: 'گلگت میں خوش آمدید',
      shina: 'گلگت مجہ خیر بو (Gilgit maja khair bo)',
      balti: 'گلگت لہ فیاقپو (Gilgit la fyaqpo)',
      burushaski: 'گلگتچی خوش آمدید / بلش (Gilgitchi khush amadeed)'
    },
    category: 'Greetings',
    pronunciations: {
      english: 'Wel-kum too Gil-git',
      urdu: 'Gilgit mein khush aamdeed',
      shina: 'Gil-git mah-jah khayr boh',
      balti: 'Gil-git lah fyahq-poh',
      burushaski: 'Gil-git-chee khoosh ahm-deed'
    },
    verified: true
  },
  {
    sourceText: 'Goodbye / See you again',
    sourceLanguage: 'english',
    translations: {
      english: 'Goodbye / See you again',
      urdu: 'خدا حافظ / پھر ملیں گے',
      shina: 'خدا یار / پِتھے پچیجوس (Khuda yaar / Pithay pacheejos)',
      balti: 'خدا حافظ / یاسو دزرنگ (Khuda hafiz / Yaso dzarang)',
      burushaski: 'خدا حافظ / ارمان ہیس بی (Khuda hafiz / Armaan hes bi)'
    },
    category: 'Greetings',
    pronunciations: {
      english: 'Good-bye / See yoo uh-gen',
      urdu: 'Khuda hafiz / Phir milengay',
      shina: 'Khoo-dah yaar / Pee-thay pah-chee-jos',
      balti: 'Khoo-dah hah-feez / Yah-soh dzah-rahng',
      burushaski: 'Khoo-dah hah-feez / Ar-mahn hess bee'
    },
    verified: true
  },
  {
    sourceText: 'Have a safe journey',
    sourceLanguage: 'english',
    translations: {
      english: 'Have a safe journey',
      urdu: 'آپ کا سفر محفوظ ہو',
      shina: 'سفر خیرو بو (Safar khairo bo)',
      balti: 'لم خیلسن سونگ (Lam khelsan song)',
      burushaski: 'سفر سلامتی جو بی (Safar salaamati jo bi)'
    },
    category: 'Greetings',
    pronunciations: {
      english: 'Hav uh sayf jur-nee',
      urdu: 'Aap ka safar mehfooz ho',
      shina: 'Sah-far khay-roh boh',
      balti: 'Lahm khel-sahn song',
      burushaski: 'Sah-far sah-lah-mah-tee joh bee'
    },
    verified: true
  },
  {
    sourceText: 'Please sit down',
    sourceLanguage: 'english',
    translations: {
      english: 'Please sit down',
      urdu: 'براہ کرم تشریف رکھیں',
      shina: 'بے با / تشریف بارو (Bay ba / Tashreef baro)',
      balti: 'دوقسا ژوکس (Duqsa zhuks)',
      burushaski: 'ہرنگ ہوری (Hurang horey)'
    },
    category: 'Greetings',
    pronunciations: {
      english: 'Pleez sit down',
      urdu: 'Barah-e-karam tashreef rakhein',
      shina: 'Bay bah / Tash-reef bah-roh',
      balti: 'Dook-sah zhookss',
      burushaski: 'Hoo-rahng hoh-ray'
    },
    verified: true
  },
  {
    sourceText: 'Nice to meet you',
    sourceLanguage: 'english',
    translations: {
      english: 'Nice to meet you',
      urdu: 'آپ سے مل کر خوشی ہوئی',
      shina: 'توٹ پچی خوشی بلی (Tot pachi khushi bili)',
      balti: 'کھیرنگ بو تھونگ سے خش سونگ (Kherang bo thong se khush song)',
      burushaski: 'انچی گنشے خوشی منا (Unchi ginshey khushi mana)'
    },
    category: 'Greetings',
    pronunciations: {
      english: 'Nys too meet yoo',
      urdu: 'Aap se mil kar khushi hui',
      shina: 'Toht pah-chee khoo-shee bee-lee',
      balti: 'Khay-rung boh tong say khoosh song',
      burushaski: 'Oon-chee gin-shay khoo-shee mah-nah'
    },
    verified: true
  },

  // --- 2. DAILY CONVERSATION ---
  {
    sourceText: 'What is your name?',
    sourceLanguage: 'english',
    translations: {
      english: 'What is your name?',
      urdu: 'آپ کا نام کیا ہے؟',
      shina: 'تئی نوم کے ہن؟ (Tei nom ke han?)',
      balti: 'کھیرنگے منگ چی ان؟ (Kherang-e ming chi in?)',
      burushaski: 'انکے مینیک بیلا؟ (Unke meinik beela?)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Wot iz yor naym?',
      urdu: 'Aap ka naam kya hai?',
      shina: 'Tay-ee nohm kay hahn?',
      balti: 'Khay-rung-ay meeng chee in?',
      burushaski: 'Oon-kay may-neek bee-lah?'
    },
    verified: true
  },
  {
    sourceText: 'My name is Ali',
    sourceLanguage: 'english',
    translations: {
      english: 'My name is Ali',
      urdu: 'میرا نام علی ہے',
      shina: 'مئی نوم علی ہن (Mayi nom Ali han)',
      balti: 'نگی منگ علی ان (Nge ming Ali in)',
      burushaski: 'جے علی با / جے نو علی بی (Je Ali ba / Ja no Ali bi)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'My naym iz Ah-lee',
      urdu: 'Mera naam Ali hai',
      shina: 'May-ee nohm Ah-lee hahn',
      balti: 'Ngay meeng Ah-lee in',
      burushaski: 'Jay Ah-lee bah'
    },
    verified: true
  },
  {
    sourceText: 'Where do you live?',
    sourceLanguage: 'english',
    translations: {
      english: 'Where do you live?',
      urdu: 'آپ کہاں رہتے ہیں؟',
      shina: 'تو کونے بہنو؟ (Tu konay bahno?)',
      balti: 'کھیرنگ گانے یود؟ (Kherang ganey yod?)',
      burushaski: 'ان امے ہوربا؟ (Un amine hurba?)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Wair doo yoo liv?',
      urdu: 'Aap kahan rehtay hain?',
      shina: 'Too koh-nay bah-noh?',
      balti: 'Khay-rung gah-nay yohd?',
      burushaski: 'Oon ah-mee-nay hoor-bah?'
    },
    verified: true
  },
  {
    sourceText: 'Thank you very much',
    sourceLanguage: 'english',
    translations: {
      english: 'Thank you very much',
      urdu: 'بہت بہت شکریہ',
      shina: 'بو مہربانی / بو شکریہ (Bo meherbani)',
      balti: 'منگپو شکریہ / کھیرنگ بو سخی (Mangpo shukriya)',
      burushaski: 'بوٹ مہربانی (Boot meherbani)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Thank yoo veh-ree much',
      urdu: 'Bohat bohat shukriya',
      shina: 'Boh may-her-bah-nee',
      balti: 'Mahng-poh shoo-kree-yah',
      burushaski: 'Boot may-her-bah-nee'
    },
    verified: true
  },
  {
    sourceText: 'You are welcome',
    sourceLanguage: 'english',
    translations: {
      english: 'You are welcome',
      urdu: 'کوئی بات نہیں / خوش آمدید',
      shina: 'کے بات نشن (Kay baat nishan)',
      balti: 'چی مسئلہ میند (Chi masala mind)',
      burushaski: 'بے پرواہ بی (Bay parwah bi)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Yoo ar wel-kum',
      urdu: 'Koi baat nahi',
      shina: 'Kay baht nee-shahn',
      balti: 'Chee mah-sah-lah meend',
      burushaski: 'Bay par-wah bee'
    },
    verified: true
  },
  {
    sourceText: 'Yes',
    sourceLanguage: 'english',
    translations: {
      english: 'Yes',
      urdu: 'جی ہاں',
      shina: 'آوا (Awa)',
      balti: 'اونگ (Ong)',
      burushaski: 'او / آوا (Ao / Awa)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Yes',
      urdu: 'Jee haan',
      shina: 'Ah-wah',
      balti: 'Ohng',
      burushaski: 'Ah-wah'
    },
    verified: true
  },
  {
    sourceText: 'No',
    sourceLanguage: 'english',
    translations: {
      english: 'No',
      urdu: 'نہیں',
      shina: 'نہ (Na / Niyo)',
      balti: 'مین (Min / Med)',
      burushaski: 'بے (Bay)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Noh',
      urdu: 'Na-heen',
      shina: 'Nah / Nee-yo',
      balti: 'Meen',
      burushaski: 'Bay'
    },
    verified: true
  },
  {
    sourceText: 'Please',
    sourceLanguage: 'english',
    translations: {
      english: 'Please',
      urdu: 'براہ کرم',
      shina: 'مہربانی تھی (Meherbani they)',
      balti: 'روخس بارو (Rokhs baro)',
      burushaski: 'مہربانی ایتی (Meherbani eti)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Pleez',
      urdu: 'Barah-e-karam',
      shina: 'May-her-bah-nee thay',
      balti: 'Rohks bah-roh',
      burushaski: 'May-her-bah-nee ay-tee'
    },
    verified: true
  },
  {
    sourceText: 'I understand',
    sourceLanguage: 'english',
    translations: {
      english: 'I understand',
      urdu: 'میں سمجھ گیا',
      shina: 'مَ سمجھیلوس (Ma samjheelos)',
      balti: 'نگا ہا گو سونگ (Nga ha-go song)',
      burushaski: 'جے سمجھی منا (Je samjhey mana)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Eye un-der-stand',
      urdu: 'Main samajh gaya',
      shina: 'Mah sum-jhee-lohs',
      balti: 'Ngah hah-goh song',
      burushaski: 'Jay sum-jhay mah-nah'
    },
    verified: true
  },
  {
    sourceText: 'I do not understand',
    sourceLanguage: 'english',
    translations: {
      english: 'I do not understand',
      urdu: 'میں نہیں سمجھا',
      shina: 'مَ نہ سمجھیلوس (Ma na samjheelos)',
      balti: 'نگا ہا ما گو (Nga ha ma go)',
      burushaski: 'جے نہ سمجھی منا (Je na samjhey mana)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Eye doo not un-der-stand',
      urdu: 'Main nahi samjha',
      shina: 'Mah nah sum-jhee-lohs',
      balti: 'Ngah hah mah goh',
      burushaski: 'Jay nah sum-jhay mah-nah'
    },
    verified: true
  },
  {
    sourceText: 'Do you speak English?',
    sourceLanguage: 'english',
    translations: {
      english: 'Do you speak English?',
      urdu: 'کیا آپ انگریزی بولتے ہیں؟',
      shina: 'تو انگریزی رے ہنا؟ (Tu Angrezi ray hana?)',
      balti: 'کھیرنگ انگریزی زرا چوسبا؟ (Kherang Angrezi zra chosba?)',
      burushaski: 'ان انگریزی بولش باتا؟ (Un Angrezi bolsh baata?)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Doo yoo speek Ing-glish?',
      urdu: 'Kya aap angrezi boltay hain?',
      shina: 'Too ung-ray-zee ray hah-nah?',
      balti: 'Khay-rung ung-ray-zee zrah chos-bah?',
      burushaski: 'Oon ung-ray-zee bohl-sh bah-tah?'
    },
    verified: true
  },
  {
    sourceText: 'Do you speak Urdu?',
    sourceLanguage: 'english',
    translations: {
      english: 'Do you speak Urdu?',
      urdu: 'کیا آپ اردو بولتے ہیں؟',
      shina: 'تو اردو رے ہنا؟ (Tu Urdu ray hana?)',
      balti: 'کھیرنگ اردو زرا چوسبا؟ (Kherang Urdu zra chosba?)',
      burushaski: 'ان اردو بولش باتا؟ (Un Urdu bolsh baata?)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Doo yoo speek Oor-doo?',
      urdu: 'Kya aap urdu boltay hain?',
      shina: 'Too Oor-doo ray hah-nah?',
      balti: 'Khay-rung Oor-doo zrah chos-bah?',
      burushaski: 'Oon Oor-doo bohl-sh bah-tah?'
    },
    verified: true
  },

  // --- 3. TRAVEL & DIRECTIONS ---
  {
    sourceText: 'Where is the bus stop?',
    sourceLanguage: 'english',
    translations: {
      english: 'Where is the bus stop?',
      urdu: 'بس اسٹاپ کہاں ہے؟',
      shina: 'بس اڈا کونے ہن؟ (Bus adda konay han?)',
      balti: 'بس اڈا گانے یود؟ (Bus adda ganey yod?)',
      burushaski: 'بس اڈا امے بی؟ (Bus adda amine bi?)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'Wair iz the bus stop?',
      urdu: 'Bus stop kahan hai?',
      shina: 'Bus uh-dah koh-nay hahn?',
      balti: 'Bus uh-dah gah-nay yohd?',
      burushaski: 'Bus uh-dah ah-mee-nay bee?'
    },
    verified: true
  },
  {
    sourceText: 'Which road goes to Hunza?',
    sourceLanguage: 'english',
    translations: {
      english: 'Which road goes to Hunza?',
      urdu: 'ہنزہ جانے والی سڑک کونسی ہے؟',
      shina: 'ہنزہ بوئی سڑک کونے ہن؟ (Hunza boi sarak konay han?)',
      balti: 'ہنزہ لہ ژوا سڑک کانی ان؟ (Hunza la zhwa sarak kani in?)',
      burushaski: 'ہنزہ کارے سڑک امیک بی؟ (Hunza kaare sarak amik bi?)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'Which rohd gohz too Hoon-zah?',
      urdu: 'Hunza jaanay wali sarak kaunsi hai?',
      shina: 'Hoon-zah boh-ee sah-rahk koh-nay hahn?',
      balti: 'Hoon-zah lah zhwah sah-rahk kah-nee in?',
      burushaski: 'Hoon-zah kah-ray sah-rahk ah-meek bee?'
    },
    verified: true
  },
  {
    sourceText: 'Which road goes to Skardu?',
    sourceLanguage: 'english',
    translations: {
      english: 'Which road goes to Skardu?',
      urdu: 'اسکردو جانے والی سڑک کونسی ہے؟',
      shina: 'اسکردو بوئی سڑک کونے ہن؟ (Skardu boi sarak konay han?)',
      balti: 'اسکردو لہ ژوا سڑک کانی ان؟ (Skardu la zhwa sarak kani in?)',
      burushaski: 'اسکردو کارے سڑک امیک بی؟ (Skardu kaare sarak amik bi?)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'Which rohd gohz too Skar-doo?',
      urdu: 'Skardu jaanay wali sarak kaunsi hai?',
      shina: 'Skar-doo boh-ee sah-rahk koh-nay hahn?',
      balti: 'Skar-doo lah zhwah sah-rahk kah-nee in?',
      burushaski: 'Skar-doo kah-ray sah-rahk ah-meek bee?'
    },
    verified: true
  },
  {
    sourceText: 'How far is Gilgit?',
    sourceLanguage: 'english',
    translations: {
      english: 'How far is Gilgit?',
      urdu: 'گلگت کتنی دور ہے؟',
      shina: 'گلگت کیچک دور ہن؟ (Gilgit kaachak door han?)',
      balti: 'گلگت تسوق تھارینگ یود؟ (Gilgit tsoq tharing yod?)',
      burushaski: 'گلگت کتیک دور بی؟ (Gilgit kateek door bi?)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'How far iz Gil-git?',
      urdu: 'Gilgit kitni door hai?',
      shina: 'Gil-git kah-chahk door hahn?',
      balti: 'Gil-git tsohq thah-reeng yohd?',
      burushaski: 'Gil-git kah-teek door bee?'
    },
    verified: true
  },
  {
    sourceText: 'Where can I hire a jeep?',
    sourceLanguage: 'english',
    translations: {
      english: 'Where can I hire a jeep?',
      urdu: 'مجھے جیپ کہاں سے کرایہ پر مل سکتی ہے؟',
      shina: 'جیپ کونے ملِی جی؟ (Jeep konay mili ji?)',
      balti: 'جیپ کرایہ لہ گانے کھوب؟ (Jeep kiraya la ganey khob?)',
      burushaski: 'جیپ امے ملِش بی؟ (Jeep amine milish bi?)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'Wair kan eye hyr uh jeep?',
      urdu: 'Mujhay jeep kahan se kiraya par mil sakti hai?',
      shina: 'Jeep koh-nay mee-lee jee?',
      balti: 'Jeep kee-rah-yah lah gah-nay khohb?',
      burushaski: 'Jeep ah-mee-nay mee-leesh bee?'
    },
    verified: true
  },
  {
    sourceText: 'This road is closed',
    sourceLanguage: 'english',
    translations: {
      english: 'This road is closed',
      urdu: 'یہ سڑک بند ہے',
      shina: 'انو سڑک بند ہن (Anu sarak band han)',
      balti: 'انی سڑک بند سونگ (Ani sarak band song)',
      burushaski: 'انو سڑک بند بی (Anu sarak band bi)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'This rohd iz klohzd',
      urdu: 'Yeh sarak band hai',
      shina: 'Ah-noo sah-rahk bund hahn',
      balti: 'Ah-nee sah-rahk bund song',
      burushaski: 'Ah-noo sah-rahk bund bee'
    },
    verified: true
  },
  {
    sourceText: 'Turn left',
    sourceLanguage: 'english',
    translations: {
      english: 'Turn left',
      urdu: 'بائیں طرف مڑیں',
      shina: 'کھبے طرف ملو (Khabay taraf milo)',
      balti: 'کھوئی چھوق ملوکس (Khoi choq mloks)',
      burushaski: 'کھبو پھار والشی (Khabo phaar walshi)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'Turn left',
      urdu: 'Baayein taraf murein',
      shina: 'Khah-bay tah-ruhf mee-loh',
      balti: 'Khoh-ee chohq mlohks',
      burushaski: 'Khah-boh phahr wal-shee'
    },
    verified: true
  },
  {
    sourceText: 'Turn right',
    sourceLanguage: 'english',
    translations: {
      english: 'Turn right',
      urdu: 'دائیں طرف مڑیں',
      shina: 'داچھے طرف ملو (Dache taraf milo)',
      balti: 'زاس چھوق ملوکس (Zas choq mloks)',
      burushaski: 'دچھی پھار والشی (Dachi phaar walshi)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'Turn ryt',
      urdu: 'Daayein taraf murein',
      shina: 'Dah-chay tah-ruhf mee-loh',
      balti: 'Zahs chohq mlohks',
      burushaski: 'Dah-chee phahr wal-shee'
    },
    verified: true
  },
  {
    sourceText: 'Go straight',
    sourceLanguage: 'english',
    translations: {
      english: 'Go straight',
      urdu: 'سیدھا جائیں',
      shina: 'سیدھا بو (Seedha bo)',
      balti: 'سیدھا ژونگ (Seedha zhong)',
      burushaski: 'سیدھا نی (Seedha nee)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'Goh strayt',
      urdu: 'Seedha jaaein',
      shina: 'See-dhah boh',
      balti: 'See-dhah zhong',
      burushaski: 'See-dhah nee'
    },
    verified: true
  },
  {
    sourceText: 'Where is the airport?',
    sourceLanguage: 'english',
    translations: {
      english: 'Where is the airport?',
      urdu: 'ہوائی اڈہ کہاں ہے؟',
      shina: 'ہوائی اڈا کونے ہن؟ (Hawai adda konay han?)',
      balti: 'ایئرپورٹ گانے یود؟ (Airport ganey yod?)',
      burushaski: 'ہوائی اڈا امے بی؟ (Hawai adda amine bi?)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'Wair iz the ayr-port?',
      urdu: 'Hawai adda kahan hai?',
      shina: 'Hah-wa-ee uh-dah koh-nay hahn?',
      balti: 'Ayr-port gah-nay yohd?',
      burushaski: 'Hah-wa-ee uh-dah ah-mee-nay bee?'
    },
    verified: true
  },
  {
    sourceText: 'Stop here',
    sourceLanguage: 'english',
    translations: {
      english: 'Stop here',
      urdu: 'یہاں رکیں',
      shina: 'انی تھے با / ٹھرو (Ani they ba)',
      balti: 'دیری دوکس (Diri duks)',
      burushaski: 'کھیلے ٹھرو (Khilay thehro)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'Stop heer',
      urdu: 'Yahan rukein',
      shina: 'Ah-nee thay bah',
      balti: 'Dee-ree dooks',
      burushaski: 'Khee-lay theh-roh'
    },
    verified: true
  },

  // --- 4. HOTEL & ACCOMMODATION ---
  {
    sourceText: 'I need a hotel room',
    sourceLanguage: 'english',
    translations: {
      english: 'I need a hotel room',
      urdu: 'مجھے ہوٹل کا کمرہ چاہیے',
      shina: 'مئی ہوٹلئی کمرہ آوار ہن (Mayi hotel-ei kamra awar han)',
      balti: 'نگا ہوٹل خنگ میک دگوس (Nga hotel khang-mik dgos)',
      burushaski: 'جلے ہوٹل کمرہ درکار بی (Ja-le hotel kamra darkaar bi)'
    },
    category: 'Hotel',
    pronunciations: {
      english: 'Eye need uh hoh-tel room',
      urdu: 'Mujhay hotel ka kamra chahiye',
      shina: 'May-ee hoh-tel-ay kum-rah ah-wahr hahn',
      balti: 'Ngah hoh-tel khahng-meek dgohs',
      burushaski: 'Jah-lay hoh-tel kum-rah dar-kahr bee'
    },
    verified: true
  },
  {
    sourceText: 'What is the price per night?',
    sourceLanguage: 'english',
    translations: {
      english: 'What is the price per night?',
      urdu: 'ایک رات کا کرایہ کتنا ہے؟',
      shina: 'ایک راتوئی کیچک ہن؟ (Ek raatoi kaachak han?)',
      balti: 'ژق چکپو کھا کرایہ تسوق پین؟ (Zhaq chikpo kha kiraya tsoq pen?)',
      burushaski: 'ہن چھمئی کتی قیمت بی؟ (Hen chamei kati qeemat bi?)'
    },
    category: 'Hotel',
    pronunciations: {
      english: 'Wot iz the prys per nyt?',
      urdu: 'Aik raat ka kiraya kitna hai?',
      shina: 'Ayk rah-toy kah-chahk hahn?',
      balti: 'Zhaq cheek-poh khah kee-rah-yah tsohq pen?',
      burushaski: 'Hen chah-may-ee kah-tee qee-muht bee?'
    },
    verified: true
  },
  {
    sourceText: 'Is hot water available?',
    sourceLanguage: 'english',
    translations: {
      english: 'Is hot water available?',
      urdu: 'کیا گرم پانی دستیاب ہے؟',
      shina: 'تاتو وئی ہنا؟ (Tato wei hana?)',
      balti: 'تھونمو چھو یودبا؟ (Thonmo chhu yodba?)',
      burushaski: 'تت چھی بیلا؟ (Tat chhi beela?)'
    },
    category: 'Hotel',
    pronunciations: {
      english: 'Iz hot wah-ter uh-vay-luh-bl?',
      urdu: 'Kya garam paani dastyaab hai?',
      shina: 'Tah-toh way hah-nah?',
      balti: 'Tohn-moh chhoo yohd-bah?',
      burushaski: 'Tuht chhee bee-lah?'
    },
    verified: true
  },
  {
    sourceText: 'Do you have wifi?',
    sourceLanguage: 'english',
    translations: {
      english: 'Do you have wifi?',
      urdu: 'کیا آپ کے پاس وائی فائی ہے؟',
      shina: 'تھائی وائی فائی ہنا؟ (Tha-ee wifi hana?)',
      balti: 'کھیرنگ کھا وائی فائی یودبا؟ (Kherang kha wifi yodba?)',
      burushaski: 'گومی وائی فائی بیلا؟ (Go-mi wifi beela?)'
    },
    category: 'Hotel',
    pronunciations: {
      english: 'Doo yoo hav wy-fy?',
      urdu: 'Kya aap ke paas wifi hai?',
      shina: 'Tah-ee wy-fy hah-nah?',
      balti: 'Khay-rung khah wy-fy yohd-bah?',
      burushaski: 'Goh-mee wy-fy bee-lah?'
    },
    verified: true
  },
  {
    sourceText: 'What is the check-out time?',
    sourceLanguage: 'english',
    translations: {
      english: 'What is the check-out time?',
      urdu: 'چیک آؤٹ کا وقت کیا ہے؟',
      shina: 'چیک آؤٹوئی وقت کے ہن؟ (Check out-ei waqt ke han?)',
      balti: 'خنگ میک لھووا وقت چی ان؟ (Khang-mik lhowa waqt chi in?)',
      burushaski: 'کمرہ دیشئی وقت کے بی؟ (Kamra deeshei waqt ke bi?)'
    },
    category: 'Hotel',
    pronunciations: {
      english: 'Wot iz the chek-owt tym?',
      urdu: 'Check-out ka waqt kya hai?',
      shina: 'Check-out-ay wahqt kay hahn?',
      balti: 'Khahng-meek lhoh-wah wahqt chee in?',
      burushaski: 'Kum-rah dee-shay wahqt kay bee?'
    },
    verified: true
  },
  {
    sourceText: 'Please clean my room',
    sourceLanguage: 'english',
    translations: {
      english: 'Please clean my room',
      urdu: 'براہ کرم میرا کمرہ صاف کر دیں',
      shina: 'مئی کمرہ صاف تھہ (Mayi kamra saaf theh)',
      balti: 'نگی خنگ میک چھانگما چھوس (Nge khang-mik changma chos)',
      burushaski: 'جے کمرہ صاف ایتی (Ja kamra saaf eti)'
    },
    category: 'Hotel',
    pronunciations: {
      english: 'Pleez kleen my room',
      urdu: 'Barah-e-karam mera kamra saaf kar dein',
      shina: 'May-ee kum-rah sahf theh',
      balti: 'Ngay khahng-meek chahng-mah chohs',
      burushaski: 'Jah kum-rah sahf ay-tee'
    },
    verified: true
  },
  {
    sourceText: 'Give me extra blankets',
    sourceLanguage: 'english',
    translations: {
      english: 'Give me extra blankets',
      urdu: 'مجھے اضافی کمبل چاہیے',
      shina: 'مئی کمبل دے (Mayi kambal de)',
      balti: 'نگا کھورا کمبل ژین چک اننگ (Nga khora kambal zhin chik inang)',
      burushaski: 'جلے اور کمبل گُوچی (Ja-le aur kambal goochi)'
    },
    category: 'Hotel',
    pronunciations: {
      english: 'Giv mee eks-truh blang-kits',
      urdu: 'Mujhay izafi kambal chahiye',
      shina: 'May-ee kum-bul day',
      balti: 'Ngah khoh-rah kum-bul zheen cheek ee-nung',
      burushaski: 'Jah-lay ohr kum-bul goo-chee'
    },
    verified: true
  },

  // --- 5. FOOD & RESTAURANT ---
  {
    sourceText: 'Where is a good restaurant?',
    sourceLanguage: 'english',
    translations: {
      english: 'Where is a good restaurant?',
      urdu: 'کوئی اچھا ہوٹل یا ریسٹورنٹ کہاں ہے؟',
      shina: 'شوا ہوٹل کونے ہن؟ (Shuwa hotel konay han?)',
      balti: 'ہوٹل لیدمو گانے یود؟ (Hotel ledmo ganey yod?)',
      burushaski: 'شوءا ہوٹل امے بی؟ (Shuwa hotel amine bi?)'
    },
    category: 'Food',
    pronunciations: {
      english: 'Wair iz uh good res-tuh-ront?',
      urdu: 'Koi acha hotel ya restaurant kahan hai?',
      shina: 'Shoo-wah hoh-tel koh-nay hahn?',
      balti: 'Hoh-tel lehd-moh gah-nay yohd?',
      burushaski: 'Shoo-wah hoh-tel ah-mee-nay bee?'
    },
    verified: true
  },
  {
    sourceText: 'Please give water',
    sourceLanguage: 'english',
    translations: {
      english: 'Please give water',
      urdu: 'براہ کرم پانی دیں',
      shina: 'وئی دے مہربانی (Wei de meherbani)',
      balti: 'چھو اننگ (Chhu inang)',
      burushaski: 'چھی گُوچی مہربانی (Chhi goochi meherbani)'
    },
    category: 'Food',
    pronunciations: {
      english: 'Pleez giv wah-ter',
      urdu: 'Barah-e-karam paani dein',
      shina: 'Way day may-her-bah-nee',
      balti: 'Chhoo ee-nahng',
      burushaski: 'Chhee goo-chee may-her-bah-nee'
    },
    verified: true
  },
  {
    sourceText: 'Is this food spicy?',
    sourceLanguage: 'english',
    translations: {
      english: 'Is this food spicy?',
      urdu: 'کیا یہ کھانا تیز مرچوں والا ہے؟',
      shina: 'انو کھانو مرچے تاتو ہنا؟ (Anu khano mirchay tato hana?)',
      balti: 'انی زاس کھا فرفنگ منگپو یودبا؟ (Ani zas kha farfang mangpo yodba?)',
      burushaski: 'انو شیق مرچ والا بیلا؟ (Anu sheeq mirch wala beela?)'
    },
    category: 'Food',
    pronunciations: {
      english: 'Iz this food spy-see?',
      urdu: 'Kya yeh khaana tez mirchon wala hai?',
      shina: 'Ah-noo khah-noh meer-chay tah-toh hah-nah?',
      balti: 'Ah-nee zahs khah fahr-fahng mahng-poh yohd-bah?',
      burushaski: 'Ah-noo sheep meerch wah-lah bee-lah?'
    },
    verified: true
  },
  {
    sourceText: 'I would like tea',
    sourceLanguage: 'english',
    translations: {
      english: 'I would like tea',
      urdu: 'مجھے چائے چاہیے',
      shina: 'مئی چائے آوار ہن (Mayi chai awar han)',
      balti: 'نگا چائے دگوس (Nga chai dgos)',
      burushaski: 'جلے چائے درکار بی (Ja-le chai darkaar bi)'
    },
    category: 'Food',
    pronunciations: {
      english: 'Eye wood lyk tee',
      urdu: 'Mujhay chai chahiye',
      shina: 'May-ee chy ah-wahr hahn',
      balti: 'Ngah chy dgohs',
      burushaski: 'Jah-lay chy dar-kahr bee'
    },
    verified: true
  },
  {
    sourceText: 'Do you have traditional local food?',
    sourceLanguage: 'english',
    translations: {
      english: 'Do you have traditional local food?',
      urdu: 'کیا آپ کے پاس مقامی روایتی کھانا ہے؟',
      shina: 'تھائی لوکل کھانو ہنا؟ (Tha-ee local khano hana?)',
      balti: 'کھیرنگ کھا بلتی زاس یودبا؟ (Kherang kha Balti zas yodba?)',
      burushaski: 'گومی بروشسکی شیق بیلا؟ (Gomi Burushaski sheeq beela?)'
    },
    category: 'Food',
    pronunciations: {
      english: 'Doo yoo hav truh-dish-uh-nul loh-kul food?',
      urdu: 'Kya aap ke paas maqaami riwayati khaana hai?',
      shina: 'Tah-ee loh-kul khah-noh hah-nah?',
      balti: 'Khay-rung khah Bal-tee zahs yohd-bah?',
      burushaski: 'Goh-mee Boo-roo-shah-skee sheep bee-lah?'
    },
    verified: true
  },
  {
    sourceText: 'Please bring the bill',
    sourceLanguage: 'english',
    translations: {
      english: 'Please bring the bill',
      urdu: 'براہ کرم بل لے آئیں',
      shina: 'بل لے انے (Bill lay aney)',
      balti: 'بل کھیا شوا (Bill khya shwa)',
      burushaski: 'بل دِچھی (Bill ditchi)'
    },
    category: 'Food',
    pronunciations: {
      english: 'Pleez bring the bil',
      urdu: 'Barah-e-karam bill le aayein',
      shina: 'Bill lay ah-nay',
      balti: 'Bill khyah shwah',
      burushaski: 'Bill deet-chee'
    },
    verified: true
  },
  {
    sourceText: 'The food was very delicious',
    sourceLanguage: 'english',
    translations: {
      english: 'The food was very delicious',
      urdu: 'کھانا بہت لذیذ تھا',
      shina: 'کھانو بو مزادار بلو (Khano bo mazadaar bilo)',
      balti: 'زاس منگپو ژیمپو یودپا (Zas mangpo zhimpo yodpa)',
      burushaski: 'شیق بوٹ شوءا بیم (Sheeq boot shuwa beem)'
    },
    category: 'Food',
    pronunciations: {
      english: 'The food woz veh-ree duh-lish-us',
      urdu: 'Khaana bohat lazeez tha',
      shina: 'Khah-noh boh mah-zah-dahr bee-loh',
      balti: 'Zahs mahng-poh zheem-poh yohd-pah',
      burushaski: 'Sheep boot shoo-wah beem'
    },
    verified: true
  },
  {
    sourceText: 'I am vegetarian',
    sourceLanguage: 'english',
    translations: {
      english: 'I am vegetarian',
      urdu: 'میں گوشت نہیں کھاتا / سبزی خور ہوں',
      shina: 'مَ موش نہ کھاموس (Ma mosh na khamus)',
      balti: 'نگا شاہ ما زووا ان (Nga sha ma zowa in)',
      burushaski: 'جے غپ نہ شیام با (Je ghap na sheeam ba)'
    },
    category: 'Food',
    pronunciations: {
      english: 'Eye am vej-uh-tair-ee-un',
      urdu: 'Main gosht nahi khaata',
      shina: 'Mah mohsh nah khah-moos',
      balti: 'Ngah shah mah zoh-wah in',
      burushaski: 'Jay ghahp nah shee-ahm bah'
    },
    verified: true
  },

  // --- 6. EMERGENCY & RESCUE ---
  {
    sourceText: 'I need help',
    sourceLanguage: 'english',
    translations: {
      english: 'I need help',
      urdu: 'مجھے مدد چاہیے',
      shina: 'مئی مدد تھہ / کمک تھے (Mayi madad theh)',
      balti: 'نگا روخس دگوس (Nga rokhs dgos)',
      burushaski: 'جلے مدد ایتی (Ja-le madad eti)'
    },
    category: 'Emergency',
    pronunciations: {
      english: 'Eye need help',
      urdu: 'Mujhay madad chahiye',
      shina: 'May-ee mah-dud theh',
      balti: 'Ngah rohks dgohs',
      burushaski: 'Jah-lay mah-dud ay-tee'
    },
    verified: true
  },
  {
    sourceText: 'Call the police',
    sourceLanguage: 'english',
    translations: {
      english: 'Call the police',
      urdu: 'پولیس کو بلائیں',
      shina: 'پولیسٹ فون تھے / بلے (Police-et phone theh)',
      balti: 'پولیس لہ رن چھوس (Police la ran chos)',
      burushaski: 'پولیس فون ایتی (Police phone eti)'
    },
    category: 'Emergency',
    pronunciations: {
      english: 'Kahl the puh-lees',
      urdu: 'Police ko bulaaein',
      shina: 'Poh-lees-et fohn theh',
      balti: 'Poh-lees lah ruhn chohs',
      burushaski: 'Poh-lees fohn ay-tee'
    },
    verified: true
  },
  {
    sourceText: 'Where is the hospital?',
    sourceLanguage: 'english',
    translations: {
      english: 'Where is the hospital?',
      urdu: 'ہسپتال کہاں ہے؟',
      shina: 'ہسپتال کونے ہن؟ (Hospital konay han?)',
      balti: 'ہسپتال گانے یود؟ (Hospital ganey yod?)',
      burushaski: 'ہسپتال امے بی؟ (Hospital amine bi?)'
    },
    category: 'Emergency',
    pronunciations: {
      english: 'Wair iz the hos-pi-tl?',
      urdu: 'Hospital kahan hai?',
      shina: 'Hos-pi-tal koh-nay hahn?',
      balti: 'Hos-pi-tal gah-nay yohd?',
      burushaski: 'Hos-pi-tal ah-mee-nay bee?'
    },
    verified: true
  },
  {
    sourceText: 'Call an ambulance',
    sourceLanguage: 'english',
    translations: {
      english: 'Call an ambulance',
      urdu: 'ایمبولینس کو بلائیں',
      shina: 'ایمبولینس بلے (Ambulance balay)',
      balti: 'ایمبولینس لہ رن چھوس (Ambulance la ran chos)',
      burushaski: 'ایمبولینس ساد ایتی (Ambulance saad eti)'
    },
    category: 'Emergency',
    pronunciations: {
      english: 'Kahl an am-byuh-luns',
      urdu: 'Ambulance ko bulaaein',
      shina: 'Am-byoo-lunce bah-lay',
      balti: 'Am-byoo-lunce lah ruhn chohs',
      burushaski: 'Am-byoo-lunce sahd ay-tee'
    },
    verified: true
  },
  {
    sourceText: 'There is a landslide ahead',
    sourceLanguage: 'english',
    translations: {
      english: 'There is a landslide ahead',
      urdu: 'آگے لینڈ سلائیڈنگ ہے / پہاڑ گرا ہے',
      shina: 'موکو چھیش پھٹو ہن (Moko cheesh phato han)',
      balti: 'دنگپو بروق کھل سونگ (Dongpo broq khal song)',
      burushaski: 'یر ڈینگ ڈیل بی (Yer deng del bi)'
    },
    category: 'Emergency',
    pronunciations: {
      english: 'Thair iz uh land-slyd uh-hed',
      urdu: 'Aagay landslide hai',
      shina: 'Moh-koh cheesh phah-toh hahn',
      balti: 'Dong-poh brohq khul song',
      burushaski: 'Yair deng del bee'
    },
    verified: true
  },
  {
    sourceText: 'I am lost',
    sourceLanguage: 'english',
    translations: {
      english: 'I am lost',
      urdu: 'میں راستہ بھول گیا ہوں',
      shina: 'مئی رستہ چٹو (Mayi rasta chhato)',
      balti: 'نگی لم بو بور سونگ (Nge lam bor song)',
      burushaski: 'جے یول منوبام (Je yul manubaam)'
    },
    category: 'Emergency',
    pronunciations: {
      english: 'Eye am lost',
      urdu: 'Main rasta bhool gaya hoon',
      shina: 'May-ee ruhs-tah chhah-toh',
      balti: 'Ngay lahm bohr song',
      burushaski: 'Jay yool mah-noo-bahm'
    },
    verified: true
  },
  {
    sourceText: 'Be careful',
    sourceLanguage: 'english',
    translations: {
      english: 'Be careful',
      urdu: 'احتیاط کریں',
      shina: 'ہوشیار بو (Hoshiyar bo)',
      balti: 'کھیرنگ کھا روقس چھوس (Kherang kha roqs chos)',
      burushaski: 'خبردار مَن (Khabardar man)'
    },
    category: 'Emergency',
    pronunciations: {
      english: 'Bee kair-ful',
      urdu: 'Ehtiyaat karein',
      shina: 'Hohsh-yahr boh',
      balti: 'Khay-rung khah rohks chohs',
      burushaski: 'Khuh-buhr-dahr mahn'
    },
    verified: true
  },
  {
    sourceText: 'Is everyone safe?',
    sourceLanguage: 'english',
    translations: {
      english: 'Is everyone safe?',
      urdu: 'کیا سب خیریت سے ہیں؟',
      shina: 'سب خیریت ہنا؟ (Sab khairiyat hana?)',
      balti: 'تھمسام کھموزانگ یودبا؟ (Thamsam khamozang yodba?)',
      burushaski: 'بوت خیروت بان؟ (Boot kheirot baan?)'
    },
    category: 'Emergency',
    pronunciations: {
      english: 'Iz ev-ree-wun sayf?',
      urdu: 'Kya sab khairiyat se hain?',
      shina: 'Sub khay-ree-yuht hah-nah?',
      balti: 'Tahm-sum khah-moh-zahng yohd-bah?',
      burushaski: 'Boot khay-roht bahn?'
    },
    verified: true
  },

  // --- 7. HEALTHCARE & MEDICINE ---
  {
    sourceText: 'I need medicine',
    sourceLanguage: 'english',
    translations: {
      english: 'I need medicine',
      urdu: 'مجھے دوا چاہیے',
      shina: 'مئی دوائی آوار ہن (Mayi dawai awar han)',
      balti: 'نگا من دگوس (Nga sman dgos)',
      burushaski: 'جلے دوا درکار بی (Ja-le dawa darkaar bi)'
    },
    category: 'Healthcare',
    pronunciations: {
      english: 'Eye need med-i-sin',
      urdu: 'Mujhay dawa chahiye',
      shina: 'May-ee duh-wa-ee ah-wahr hahn',
      balti: 'Ngah smuhn dgohs',
      burushaski: 'Jah-lay duh-wah dar-kahr bee'
    },
    verified: true
  },
  {
    sourceText: 'Where is a pharmacy / medical store?',
    sourceLanguage: 'english',
    translations: {
      english: 'Where is a pharmacy / medical store?',
      urdu: 'میڈیکل اسٹور کہاں ہے؟',
      shina: 'میڈیکل اسٹور کونے ہن؟ (Medical store konay han?)',
      balti: 'من کھنگ گانے یود؟ (Sman khang ganey yod?)',
      burushaski: 'دواخانہ امے بی؟ (Dawakhana amine bi?)'
    },
    category: 'Healthcare',
    pronunciations: {
      english: 'Wair iz uh fahr-muh-see?',
      urdu: 'Medical store kahan hai?',
      shina: 'Med-ee-cul stohr koh-nay hahn?',
      balti: 'Smuhn khahng gah-nay yohd?',
      burushaski: 'Duh-wah-khah-nah ah-mee-nay bee?'
    },
    verified: true
  },
  {
    sourceText: 'I have a headache',
    sourceLanguage: 'english',
    translations: {
      english: 'I have a headache',
      urdu: 'میرے سر میں درد ہے',
      shina: 'مئی ششو پھٹی ہن (Mayi shesho phati han)',
      balti: 'نگی گو نا سونگ (Nge go na song)',
      burushaski: 'جے یٹس پھٹ منابی (Ja yatis phat manabi)'
    },
    category: 'Healthcare',
    pronunciations: {
      english: 'Eye hav uh hed-ayk',
      urdu: 'Meray sar mein dard hai',
      shina: 'May-ee shay-shoh phah-tee hahn',
      balti: 'Ngay goh nah song',
      burushaski: 'Jah yah-tees phuht mah-nah-bee'
    },
    verified: true
  },
  {
    sourceText: 'I have high altitude sickness',
    sourceLanguage: 'english',
    translations: {
      english: 'I have high altitude sickness',
      urdu: 'مجھے اونچائی کی وجہ سے طبیعت خراب ہو رہی ہے',
      shina: 'مئی دموئی تکلیف ہن (Mayi damoe takleef han)',
      balti: 'نگا لا تھونگپو نا سونگ (Nga la thongpo na song)',
      burushaski: 'جلے دم بین (Ja-le dam been)'
    },
    category: 'Healthcare',
    pronunciations: {
      english: 'Eye hav hy al-ti-tood sik-nis',
      urdu: 'Mujhay oonchai se takleef ho rahi hai',
      shina: 'May-ee dah-moy tuk-leef hahn',
      balti: 'Ngah lah tong-poh nah song',
      burushaski: 'Jah-lay dum been'
    },
    verified: true
  },
  {
    sourceText: 'I feel dizzy',
    sourceLanguage: 'english',
    translations: {
      english: 'I feel dizzy',
      urdu: 'مجھے چکر آ رہے ہیں',
      shina: 'مئی چکر بیلے (Mayi chakkar bilay)',
      balti: 'نگی گو کھر سونگ (Nge go khor song)',
      burushaski: 'جے یٹس گھوم منابی (Ja yatis ghoom manabi)'
    },
    category: 'Healthcare',
    pronunciations: {
      english: 'Eye feel diz-ee',
      urdu: 'Mujhay chakkar aa rahay hain',
      shina: 'May-ee chuk-kuhr bee-lay',
      balti: 'Ngay goh khohr song',
      burushaski: 'Jah yah-tees ghoom mah-nah-bee'
    },
    verified: true
  },
  {
    sourceText: 'I need a doctor',
    sourceLanguage: 'english',
    translations: {
      english: 'I need a doctor',
      urdu: 'مجھے ڈاکٹر کی ضرورت ہے',
      shina: 'مئی ڈاکٹر آوار ہن (Mayi doctor awar han)',
      balti: 'نگا ڈاکٹر دگوس (Nga doctor dgos)',
      burushaski: 'جلے ڈاکٹر درکار با (Ja-le doctor darkaar ba)'
    },
    category: 'Healthcare',
    pronunciations: {
      english: 'Eye need uh dok-ter',
      urdu: 'Mujhay doctor ki zaroorat hai',
      shina: 'May-ee dohk-ter ah-wahr hahn',
      balti: 'Ngah dohk-ter dgohs',
      burushaski: 'Jah-lay dohk-ter dar-kahr bah'
    },
    verified: true
  },

  // --- 8. SHOPPING & BAZAAR ---
  {
    sourceText: 'What is the price?',
    sourceLanguage: 'english',
    translations: {
      english: 'What is the price?',
      urdu: 'اس کی کیا قیمت ہے؟',
      shina: 'انیسئی کیچک ہن؟ (Anisey kaachak han?)',
      balti: 'انی کھا رین تسوق پین؟ (Ani kha ren tsoq pen?)',
      burushaski: 'انو کتی قیمت بی؟ (Anu kati qeemat bi?)'
    },
    category: 'Shopping',
    pronunciations: {
      english: 'Wot iz the prys?',
      urdu: 'Is ki kya qeemat hai?',
      shina: 'Ah-nee-say kah-chahk hahn?',
      balti: 'Ah-nee khah ren tsohq pen?',
      burushaski: 'Ah-noo kah-tee qee-muht bee?'
    },
    verified: true
  },
  {
    sourceText: 'Can you give a discount?',
    sourceLanguage: 'english',
    translations: {
      english: 'Can you give a discount?',
      urdu: 'کیا کچھ رعایت مل سکتی ہے؟',
      shina: 'کچھ کم تھہ (Kujh kam theh)',
      balti: 'تسنیک چھک چھوس (Tsenik chik chos)',
      burushaski: 'چیک کم ایتی (Chik kam eti)'
    },
    category: 'Shopping',
    pronunciations: {
      english: 'Kan yoo giv uh dis-kownt?',
      urdu: 'Kya kuch riaayat mil sakti hai?',
      shina: 'Koojh kum theh',
      balti: 'Tsay-neek cheek chohs',
      burushaski: 'Cheek kum ay-tee'
    },
    verified: true
  },
  {
    sourceText: 'I want to buy local dry fruits',
    sourceLanguage: 'english',
    translations: {
      english: 'I want to buy local dry fruits',
      urdu: 'مجھے یہاں کے خشک میوہ جات خریدنے ہیں',
      shina: 'مئی کھٹا مٹھی میوہ گنوک ہن (Mayi mewa ginok han)',
      balti: 'نگا کھورا میوہ کھیروا یود (Nga khora mewa kherwa yod)',
      burushaski: 'جے خشک میوہ گنشام با (Je khushk mewa ginshaam ba)'
    },
    category: 'Shopping',
    pronunciations: {
      english: 'Eye wont too by loh-kul dry froots',
      urdu: 'Mujhay khushk meway khareednay hain',
      shina: 'May-ee may-wah gee-nohk hahn',
      balti: 'Ngah khoh-rah may-wah khayr-wah yohd',
      burushaski: 'Jay khooshk may-wah gin-shahm bah'
    },
    verified: true
  },
  {
    sourceText: 'Where can I find a traditional Pakol woolen cap?',
    sourceLanguage: 'english',
    translations: {
      english: 'Where can I find a traditional Pakol woolen cap?',
      urdu: 'روایتی پکول (اون کی ٹوپی) کہاں سے ملے گی؟',
      shina: 'کھوئی کونے ملی جی؟ (Khoi konay mili ji?)',
      balti: 'بلتی ٹپی گانے کھوب؟ (Balti tipi ganey khob?)',
      burushaski: 'فٹہ ٹوپی امے ملش بی؟ (Fatah topi amine milish bi?)'
    },
    category: 'Shopping',
    pronunciations: {
      english: 'Wair kan eye fynd uh puh-kohl wool-en kap?',
      urdu: 'Riwayati Pakol kahan se milay gi?',
      shina: 'Khoy koh-nay mee-lee jee?',
      balti: 'Bal-tee tee-pee gah-nay khohb?',
      burushaski: 'Fah-tuh toh-pee ah-mee-nay mee-leesh bee?'
    },
    verified: true
  },
  {
    sourceText: 'Do you accept card payments or online transfer?',
    sourceLanguage: 'english',
    translations: {
      english: 'Do you accept card payments or online transfer?',
      urdu: 'کیا آپ آن لائن یا کارڈ کے ذریعے رقم لیتے ہیں؟',
      shina: 'آن لائن پیسے گننا؟ (Online paisay ginana?)',
      balti: 'آن لائن کھا پیسا گینبا؟ (Online kha paisa genba?)',
      burushaski: 'آن لائن پیسہ گنیما؟ (Online paisa ginima?)'
    },
    category: 'Shopping',
    pronunciations: {
      english: 'Doo yoo ak-sept kard pay-ments?',
      urdu: 'Kya aap card ya online paisay letay hain?',
      shina: 'On-lyne py-say gee-nah-nah?',
      balti: 'On-lyne khah py-sah gehn-bah?',
      burushaski: 'On-lyne py-sah gee-nee-mah?'
    },
    verified: true
  },
  {
    sourceText: 'This is too expensive',
    sourceLanguage: 'english',
    translations: {
      english: 'This is too expensive',
      urdu: 'یہ بہت مہنگا ہے',
      shina: 'انو بو مہنگو ہن (Anu bo mehngo han)',
      balti: 'انی منگپو رین چن ان (Ani mangpo renchan in)',
      burushaski: 'انو بوٹ مہنگا بی (Anu boot mehnga bi)'
    },
    category: 'Shopping',
    pronunciations: {
      english: 'This iz too ek-spen-siv',
      urdu: 'Yeh bohat mehnga hai',
      shina: 'Ah-noo boh mayng-goh hahn',
      balti: 'Ah-nee mahng-poh ren-chuhn in',
      burushaski: 'Ah-noo boot mehng-gah bee'
    },
    verified: true
  },

  // --- 9. EDUCATION & LEARNING ---
  {
    sourceText: 'I am a student',
    sourceLanguage: 'english',
    translations: {
      english: 'I am a student',
      urdu: 'میں ایک طالب علم ہوں',
      shina: 'مَ اک طالب علم ہنوس (Ma ek talib-e-ilm hanus)',
      balti: 'نگا سٹوڈنٹ چک ان (Nga student chik in)',
      burushaski: 'جے طالب علم با (Je talib-e-ilm ba)'
    },
    category: 'Education',
    pronunciations: {
      english: 'Eye am uh styoo-dent',
      urdu: 'Main aik talib-e-ilm hoon',
      shina: 'Mah ayk tah-leeb-ay-ilm hah-noos',
      balti: 'Ngah styoo-dent cheek in',
      burushaski: 'Jay tah-leeb-ay-ilm bah'
    },
    verified: true
  },
  {
    sourceText: 'Where is the school / college?',
    sourceLanguage: 'english',
    translations: {
      english: 'Where is the school / college?',
      urdu: 'اسکول یا کالج کہاں ہے؟',
      shina: 'اسکول کونے ہن؟ (School konay han?)',
      balti: 'اسکول گانے یود؟ (School ganey yod?)',
      burushaski: 'اسکول امے بی؟ (School amine bi?)'
    },
    category: 'Education',
    pronunciations: {
      english: 'Wair iz the skool?',
      urdu: 'School kahan hai?',
      shina: 'Skool koh-nay hahn?',
      balti: 'Skool gah-nay yohd?',
      burushaski: 'Skool ah-mee-nay bee?'
    },
    verified: true
  },
  {
    sourceText: 'Can you teach me your language?',
    sourceLanguage: 'english',
    translations: {
      english: 'Can you teach me your language?',
      urdu: 'کیا آپ مجھے اپنی زبان سکھا سکتے ہیں؟',
      shina: 'مئی تئی زبون سکھے تھیجا؟ (Mayi tei zaboon sikhey theejya?)',
      balti: 'نگا کھیرنگے زکد لوب چوسبا؟ (Nga kherang-e zkad lob chosba?)',
      burushaski: 'جلے گومی زبان سکھا ایتا؟ (Ja-le gomi zaban sikha eeta?)'
    },
    category: 'Education',
    pronunciations: {
      english: 'Kan yoo teech mee yor lang-gwij?',
      urdu: 'Kya aap mujhay apni zuban sikha saktay hain?',
      shina: 'May-ee tay-ee zah-boon see-khay thee-jyah?',
      balti: 'Ngah khay-rung-ay zkahd lohb chos-bah?',
      burushaski: 'Jah-lay goh-mee zah-bahn see-khah ay-tah?'
    },
    verified: true
  },
  {
    sourceText: 'I want to read a book',
    sourceLanguage: 'english',
    translations: {
      english: 'I want to read a book',
      urdu: 'میں کتاب پڑھنا چاہتا ہوں',
      shina: 'مَ کتاب پرھوک شاکموس (Ma kitaab parhok shaakmus)',
      balti: 'نگا پیچہ لوقپا یود (Nga pecha loqpa yod)',
      burushaski: 'جے کتاب پڑھے منام با (Je kitaab parhey manam ba)'
    },
    category: 'Education',
    pronunciations: {
      english: 'Eye wont too reed uh book',
      urdu: 'Main kitaab parhna chahta hoon',
      shina: 'Mah kee-tahb pur-hohk shahk-moos',
      balti: 'Ngah pay-chah lohk-pah yohd',
      burushaski: 'Jay kee-tahb pur-hay mah-nahm bah'
    },
    verified: true
  },
  {
    sourceText: 'Karakoram International University',
    sourceLanguage: 'english',
    translations: {
      english: 'Karakoram International University',
      urdu: 'قراقرم انٹرنیشنل یونیورسٹی',
      shina: 'قراقرم یونیورسٹی (Karakoram University)',
      balti: 'قراقرم انٹرنیشنل یونیورسٹی (Karakoram International University)',
      burushaski: 'قراقرم یونیورسٹی (Karakoram University)'
    },
    category: 'Education',
    pronunciations: {
      english: 'Kah-ruh-koh-rum In-ter-nash-uh-nul Yoo-ni-ver-si-tee',
      urdu: 'Qaraqoram International University',
      shina: 'Kah-rah-koh-rum Yoo-nee-ver-si-tee',
      balti: 'Kah-rah-koh-rum Yoo-nee-ver-si-tee',
      burushaski: 'Kah-rah-koh-rum Yoo-nee-ver-si-tee'
    },
    verified: true
  },

  // --- 10. FAMILY & RELATIONS ---
  {
    sourceText: 'This is my brother',
    sourceLanguage: 'english',
    translations: {
      english: 'This is my brother',
      urdu: 'یہ میرا بھائی ہے',
      shina: 'انو مئی جا ہن (Anu mayi jaa han)',
      balti: 'انی نگی جو چو ان (Ani nge jochu in)',
      burushaski: 'انو جا چھو با (Anu ja chho ba)'
    },
    category: 'Family',
    pronunciations: {
      english: 'This iz my bruth-er',
      urdu: 'Yeh mera bhai hai',
      shina: 'Ah-noo may-ee jah hahn',
      balti: 'Ah-nee ngay joh-choo in',
      burushaski: 'Ah-noo jah chhoh bah'
    },
    verified: true
  },
  {
    sourceText: 'This is my sister',
    sourceLanguage: 'english',
    translations: {
      english: 'This is my sister',
      urdu: 'یہ میری بہن ہے',
      shina: 'انی مئی سس ہن (Ani mayi sas han)',
      balti: 'انی نگی رینگو ان (Ani nge rengo in)',
      burushaski: 'انو جا یاس بو (Anu ja yaas bo)'
    },
    category: 'Family',
    pronunciations: {
      english: 'This iz my sis-ter',
      urdu: 'Yeh meri behan hai',
      shina: 'Ah-nee may-ee suhs hahn',
      balti: 'Ah-nee ngay reng-goh in',
      burushaski: 'Ah-noo jah yahs boh'
    },
    verified: true
  },
  {
    sourceText: 'This is my father',
    sourceLanguage: 'english',
    translations: {
      english: 'This is my father',
      urdu: 'یہ میرے والد ہیں',
      shina: 'انو مئی بابو ہن (Anu mayi babo han)',
      balti: 'انی نگی آپا ان (Ani nge apa in)',
      burushaski: 'انو جا تات با (Anu ja taat ba)'
    },
    category: 'Family',
    pronunciations: {
      english: 'This iz my fah-ther',
      urdu: 'Yeh meray walid hain',
      shina: 'Ah-noo may-ee bah-boh hahn',
      balti: 'Ah-nee ngay ah-pah in',
      burushaski: 'Ah-noo jah taht bah'
    },
    verified: true
  },
  {
    sourceText: 'This is my mother',
    sourceLanguage: 'english',
    translations: {
      english: 'This is my mother',
      urdu: 'یہ میری والدہ ہیں',
      shina: 'انی مئی ایجی ہن (Ani mayi aiji han)',
      balti: 'انی نگی امو ان (Ani nge amo in)',
      burushaski: 'انو جا می بو (Anu ja mee bo)'
    },
    category: 'Family',
    pronunciations: {
      english: 'This iz my muth-er',
      urdu: 'Yeh meri walida hain',
      shina: 'Ah-nee may-ee eye-jee hahn',
      balti: 'Ah-nee ngay uh-moh in',
      burushaski: 'Ah-noo jah mee boh'
    },
    verified: true
  },
  {
    sourceText: 'How is your family?',
    sourceLanguage: 'english',
    translations: {
      english: 'How is your family?',
      urdu: 'آپ کے گھر والے کیسے ہیں؟',
      shina: 'تھائی گوٹوئے کے ہنیت؟ (Tha-ee gotoy ke hanit?)',
      balti: 'کھیرنگے نانگ کھموزانگ یودبا؟ (Kherang-e nang khamozang yodba?)',
      burushaski: 'گومی ہے بیلتس بان؟ (Gomi he beeltes baan?)'
    },
    category: 'Family',
    pronunciations: {
      english: 'How iz yor fam-i-lee?',
      urdu: 'Aap ke ghar walay kaisay hain?',
      shina: 'Tah-ee goh-toy kay hah-neet?',
      balti: 'Khay-rung-ay nahng khah-moh-zahng yohd-bah?',
      burushaski: 'Goh-mee hay beel-tes bahn?'
    },
    verified: true
  },

  // --- 11. TOURIST COMMUNICATION & CULTURE ---
  {
    sourceText: 'Please guide me',
    sourceLanguage: 'english',
    translations: {
      english: 'Please guide me',
      urdu: 'براہ کرم میری رہنمائی کریں',
      shina: 'مئی رستہ ہچھی مہربانی (Mayi rasta hachhi meherbani)',
      balti: 'نگا لم سٹن اننگ (Nga lam stan inang)',
      burushaski: 'جلے گائیڈ ایتی مہربانی (Ja-le guide eti meherbani)'
    },
    category: 'Tourist communication',
    pronunciations: {
      english: 'Pleez gyd mee',
      urdu: 'Barah-e-karam meri rehnumai karein',
      shina: 'May-ee ruhs-tah huch-hee may-her-bah-nee',
      balti: 'Ngah lahm stuhn ee-nahng',
      burushaski: 'Jah-lay gyde ay-tee may-her-bah-nee'
    },
    verified: true
  },
  {
    sourceText: 'Can I take a photograph?',
    sourceLanguage: 'english',
    translations: {
      english: 'Can I take a photograph?',
      urdu: 'کیا میں تصویر لے سکتا ہوں؟',
      shina: 'مَ فوٹو گن جا؟ (Ma photo gin jya?)',
      balti: 'نگا فوٹو کھیروا کھوبا؟ (Nga photo kherwa khoba?)',
      burushaski: 'جے فوٹو گنشام با؟ (Je photo ginshaam ba?)'
    },
    category: 'Tourist communication',
    pronunciations: {
      english: 'Kan eye tayk uh foh-tuh-graf?',
      urdu: 'Kya main tasweer le sakta hoon?',
      shina: 'Mah foh-toh gin jyah?',
      balti: 'Ngah foh-toh khayr-wah khoh-bah?',
      burushaski: 'Jay foh-toh gin-shahm bah?'
    },
    verified: true
  },
  {
    sourceText: 'This place is very beautiful',
    sourceLanguage: 'english',
    translations: {
      english: 'This place is very beautiful',
      urdu: 'یہ جگہ بہت خوبصورت ہے',
      shina: 'انی دیش بو خوبصورت ہن (Ani deesh bo khoobsurat han)',
      balti: 'انی دوقسا منگپو لیدمو ان (Ani duqsa mangpo ledmo in)',
      burushaski: 'انو جا بوٹ غریب بی / شوءا بی (Anu ja boot shuwa bi)'
    },
    category: 'Tourist communication',
    pronunciations: {
      english: 'This plays iz veh-ree byoo-ti-ful',
      urdu: 'Yeh jagah bohat khoobsoorat hai',
      shina: 'Ah-nee deesh boh khoob-soo-ruht hahn',
      balti: 'Ah-nee dook-sah mahng-poh lehd-moh in',
      burushaski: 'Ah-noo jah boot shoo-wah bee'
    },
    verified: true
  },
  {
    sourceText: 'What is that mountain called?',
    sourceLanguage: 'english',
    translations: {
      english: 'What is that mountain called?',
      urdu: 'اس پہاڑ کا نام کیا ہے؟',
      shina: 'او چھیشئی نوم کے ہن؟ (O cheesh-ei nom ke han?)',
      balti: 'او بروق پوئی منگ چی ان؟ (O broq poi ming chi in?)',
      burushaski: 'اس ڈینکے مینیک بیلا؟ (Es deenke meinik beela?)'
    },
    category: 'Tourist communication',
    pronunciations: {
      english: 'Wot iz that mown-tin kahld?',
      urdu: 'Is pahaar ka naam kya hai?',
      shina: 'Oh cheesh-ay nohm kay hahn?',
      balti: 'Oh brohq poh-ee meeng chee in?',
      burushaski: 'Ess deen-kay may-neek bee-lah?'
    },
    verified: true
  },
  {
    sourceText: 'Rakaposhi viewpoint',
    sourceLanguage: 'english',
    translations: {
      english: 'Rakaposhi viewpoint',
      urdu: 'راکا پوشی ویو پوائنٹ',
      shina: 'راکاپوشی ویو پوائنٹ (Rakaposhi view point)',
      balti: 'راکاپوشی ویو پوائنٹ (Rakaposhi view point)',
      burushaski: 'راکاپوشی چاکر جا (Rakaposhi chakar ja)'
    },
    category: 'Tourist communication',
    pronunciations: {
      english: 'Rah-kuh-poh-shee vyoo poynt',
      urdu: 'Rakaposhi view point',
      shina: 'Rah-kah-poh-shee vyoo poynt',
      balti: 'Rah-kah-poh-shee vyoo poynt',
      burushaski: 'Rah-kah-poh-shee chah-kahr jah'
    },
    verified: true
  },
  {
    sourceText: 'Can we attend the local cultural festival?',
    sourceLanguage: 'english',
    translations: {
      english: 'Can we attend the local cultural festival?',
      urdu: 'کیا ہم مقامی میلے یا فیسٹیول میں شامل ہو سکتے ہیں؟',
      shina: 'مے میلے مجہ بش جا؟ (May melay maja bash jya?)',
      balti: 'نگاتنگ میلہ لہ ژوا کھوبا؟ (Ngatang mela la zhwa khoba?)',
      burushaski: 'می ثقافتی میلہ کارے نی بامبا؟ (Mi saqafati mela kaare nee baamba?)'
    },
    category: 'Tourist communication',
    pronunciations: {
      english: 'Kan wee uh-tend the loh-kul fes-ti-vul?',
      urdu: 'Kya hum maqaami meley mein shaamil ho saktay hain?',
      shina: 'May may-lay mah-jah buhsh jyah?',
      balti: 'Ngah-tahng may-lah lah zhwah khoh-bah?',
      burushaski: 'Mee sah-qah-fah-tee may-lah kah-ray nee bahm-bah?'
    },
    verified: true
  },

  // Additional 65+ everyday practical phrases to surpass 100 verified entries
  {
    sourceText: 'What time is it?',
    sourceLanguage: 'english',
    translations: {
      english: 'What time is it?',
      urdu: 'کیا وقت ہوا ہے؟',
      shina: 'کیچک بوجا بوجیت؟ (Kaachak baja bojit?)',
      balti: 'وقت چی سونگ؟ (Waqt chi song?)',
      burushaski: 'کتی بجا مانا؟ (Kati baja mana?)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Wot tym iz it?',
      urdu: 'Kya waqt hua hai?',
      shina: 'Kah-chahk bah-jah boh-jeet?',
      balti: 'Wahqt chee song?',
      burushaski: 'Kah-tee bah-jah mah-nah?'
    },
    verified: true
  },
  {
    sourceText: 'Where are you going?',
    sourceLanguage: 'english',
    translations: {
      english: 'Where are you going?',
      urdu: 'آپ کہاں جا رہے ہیں؟',
      shina: 'تو کونے بوجو ہنو؟ (Tu konay bojo hano?)',
      balti: 'کھیرنگ گانے ژوا ان؟ (Kherang ganey zhwa in?)',
      burushaski: 'ان امے نیا با؟ (Un amine neeya ba?)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'Wair ar yoo goh-ing?',
      urdu: 'Aap kahan ja rahay hain?',
      shina: 'Too koh-nay boh-joh hah-noh?',
      balti: 'Khay-rung gah-nay zhwah in?',
      burushaski: 'Oon ah-mee-nay nee-yah bah?'
    },
    verified: true
  },
  {
    sourceText: 'I am going to the market',
    sourceLanguage: 'english',
    translations: {
      english: 'I am going to the market',
      urdu: 'میں بازار جا رہا ہوں',
      shina: 'مَ بازارٹ بوجو ہنوس (Ma bazaar-et bojo hanus)',
      balti: 'نگا بازار لہ ژوا ان (Nga bazaar la zhwa in)',
      burushaski: 'جے بازار کارے نیا با (Je bazaar kaare neeya ba)'
    },
    category: 'Shopping',
    pronunciations: {
      english: 'Eye am goh-ing too the mar-kit',
      urdu: 'Main bazaar ja raha hoon',
      shina: 'Mah bah-zahr-et boh-joh hah-noos',
      balti: 'Ngah bah-zahr lah zhwah in',
      burushaski: 'Jay bah-zahr kah-ray nee-yah bah'
    },
    verified: true
  },
  {
    sourceText: 'How much does this cost per kilogram?',
    sourceLanguage: 'english',
    translations: {
      english: 'How much does this cost per kilogram?',
      urdu: 'یہ فی کلو کتنے کا ہے؟',
      shina: 'ایک کلوئی کیچک ہن؟ (Ek kilo-ei kaachak han?)',
      balti: 'کلو چکپو کھا تسوق پین؟ (Kilo chikpo kha tsoq pen?)',
      burushaski: 'ہن کلوئی کتی قیمت بی؟ (Hen kiloei kati qeemat bi?)'
    },
    category: 'Shopping',
    pronunciations: {
      english: 'How much duz this kost per kil-uh-gram?',
      urdu: 'Yeh fee kilo kitnay ka hai?',
      shina: 'Ayk kee-loh-ay kah-chahk hahn?',
      balti: 'Kee-loh cheek-poh khah tsohq pen?',
      burushaski: 'Hen kee-loh-ay kah-tee qee-muht bee?'
    },
    verified: true
  },
  {
    sourceText: 'I need warm clothes',
    sourceLanguage: 'english',
    translations: {
      english: 'I need warm clothes',
      urdu: 'مجھے گرم کپڑے چاہیے',
      shina: 'مئی تاتو کُن آوار ہنیت (Mayi tato kun awar hanit)',
      balti: 'نگا تھونمو گوس دگوس (Nga thonmo gos dgos)',
      burushaski: 'جلے تت گتس درکار بین (Ja-le tat gatas darkaar been)'
    },
    category: 'Shopping',
    pronunciations: {
      english: 'Eye need wahrm klohz',
      urdu: 'Mujhay garam kapray chahiye',
      shina: 'May-ee tah-toh koon ah-wahr hah-neet',
      balti: 'Ngah tohn-moh gohs dgohs',
      burushaski: 'Jah-lay tuht gah-tahs dar-kahr been'
    },
    verified: true
  },
  {
    sourceText: 'The weather is very cold today',
    sourceLanguage: 'english',
    translations: {
      english: 'The weather is very cold today',
      urdu: 'آج موسم بہت سرد ہے',
      shina: 'اشی بو شید ہن (Ashi bo sheed han)',
      balti: 'دیرنگ منگپو گراگمو یود (Dirang mangpo grangmo yod)',
      burushaski: 'خوت بوٹ شیم بی (Khut boot sheem bi)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'The weth-er iz veh-ree kohld too-day',
      urdu: 'Aaj mausam bohat sard hai',
      shina: 'Ah-shee boh sheed hahn',
      balti: 'Dee-ruhng mahng-poh grahng-moh yohd',
      burushaski: 'Khoot boot sheem bee'
    },
    verified: true
  },
  {
    sourceText: 'The sun is shining brightly',
    sourceLanguage: 'english',
    translations: {
      english: 'The sun is shining brightly',
      urdu: 'دھوپ بہت اچھی نکلی ہوئی ہے',
      shina: 'سوری بو شوا ڈیت ہن (Suri bo shuwa dit han)',
      balti: 'نیما منگپو لیدمو تروس سونگ (Nyima mangpo ledmo tros song)',
      burushaski: 'سا بوٹ شوءا درشن منا بی (Sa boot shuwa darshan mana bi)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'The sun iz shy-ning bryt-lee',
      urdu: 'Dhoop bohat achi nikli hui hai',
      shina: 'Soo-ree boh shoo-wah deet hahn',
      balti: 'Nee-mah mahng-poh lehd-moh trohs song',
      burushaski: 'Sah boot shoo-wah dar-shun mah-nah bee'
    },
    verified: true
  },
  {
    sourceText: 'I am hungry',
    sourceLanguage: 'english',
    translations: {
      english: 'I am hungry',
      urdu: 'مجھے بھوک لگی ہے',
      shina: 'مئی بھوک لگی بلی (Mayi bhook lagili bili)',
      balti: 'نگا لٹوکس نا سونگ (Nga ltoks na song)',
      burushaski: 'جے بھوک منا با (Je bhook mana ba)'
    },
    category: 'Food',
    pronunciations: {
      english: 'Eye am hung-gree',
      urdu: 'Mujhay bhook lagi hai',
      shina: 'May-ee bhook lah-gee-lee bee-lee',
      balti: 'Ngah ltohkss nah song',
      burushaski: 'Jay bhook mah-nah bah'
    },
    verified: true
  },
  {
    sourceText: 'I am thirsty',
    sourceLanguage: 'english',
    translations: {
      english: 'I am thirsty',
      urdu: 'مجھے پیاس لگی ہے',
      shina: 'مئی وئی آوار ہن (Mayi wei awar han)',
      balti: 'نگا کھوم نا سونگ (Nga khom na song)',
      burushaski: 'جے چھی درکار بی (Je chhi darkaar bi)'
    },
    category: 'Food',
    pronunciations: {
      english: 'Eye am thur-stee',
      urdu: 'Mujhay pyaas lagi hai',
      shina: 'May-ee way ah-wahr hahn',
      balti: 'Ngah khohm nah song',
      burushaski: 'Jay chhee dar-kahr bee'
    },
    verified: true
  },
  {
    sourceText: 'May I sit here?',
    sourceLanguage: 'english',
    translations: {
      english: 'May I sit here?',
      urdu: 'کیا میں یہاں بیٹھ سکتا ہوں؟',
      shina: 'مَ انی تھے با جا؟ (Ma ani they ba jya?)',
      balti: 'نگا دیری دوکس کھوبا؟ (Nga diri duks khoba?)',
      burushaski: 'جے کھی ہورشا با؟ (Je khee hursha ba?)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'May eye sit heer?',
      urdu: 'Kya main yahan baith sakta hoon?',
      shina: 'Mah ah-nee thay bah jyah?',
      balti: 'Ngah dee-ree dooks khoh-bah?',
      burushaski: 'Jay khee hoor-shah bah?'
    },
    verified: true
  },
  {
    sourceText: 'I am very happy',
    sourceLanguage: 'english',
    translations: {
      english: 'I am very happy',
      urdu: 'میں بہت خوش ہوں',
      shina: 'مَ بو خوش ہنوس (Ma bo khush hanus)',
      balti: 'نگا منگپو خش یود (Nga mangpo khush yod)',
      burushaski: 'جے بوٹ خوش با (Je boot khush ba)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Eye am veh-ree hap-ee',
      urdu: 'Main bohat khush hoon',
      shina: 'Mah boh khoosh hah-noos',
      balti: 'Ngah mahng-poh khoosh yohd',
      burushaski: 'Jay boot khoosh bah'
    },
    verified: true
  },
  {
    sourceText: 'Where can I charge my mobile phone?',
    sourceLanguage: 'english',
    translations: {
      english: 'Where can I charge my mobile phone?',
      urdu: 'میں اپنا موبائل فون کہاں چارج کر سکتا ہوں؟',
      shina: 'موبائل کونے چارج تھی جا؟ (Mobile konay charge theejya?)',
      balti: 'موبائل گانے چارج چھوس کھوب؟ (Mobile ganey charge chos khob?)',
      burushaski: 'موبائل امے چارج ایتا؟ (Mobile amine charge eeta?)'
    },
    category: 'Hotel',
    pronunciations: {
      english: 'Wair kan eye charj my moh-byl fohn?',
      urdu: 'Main apna mobile phone kahan charge kar sakta hoon?',
      shina: 'Moh-byl koh-nay charj thee-jyah?',
      balti: 'Moh-byl gah-nay charj chohs khohb?',
      burushaski: 'Moh-byl ah-mee-nay charj ay-tah?'
    },
    verified: true
  },
  {
    sourceText: 'Is there a network signal here?',
    sourceLanguage: 'english',
    translations: {
      english: 'Is there a network signal here?',
      urdu: 'کیا یہاں موبائل سگنل آ رہے ہیں؟',
      shina: 'انی سگنل ہنا؟ (Ani signal hana?)',
      balti: 'دیری سگنل یودبا؟ (Diri signal yodba?)',
      burushaski: 'کھیلے سگنل بیلا؟ (Khilay signal beela?)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'Iz thair uh net-werk sig-nul heer?',
      urdu: 'Kya yahan mobile signal aa rahay hain?',
      shina: 'Ah-nee sig-nul hah-nah?',
      balti: 'Dee-ree sig-nul yohd-bah?',
      burushaski: 'Khee-lay sig-nul bee-lah?'
    },
    verified: true
  },
  {
    sourceText: 'Where is the petrol pump?',
    sourceLanguage: 'english',
    translations: {
      english: 'Where is the petrol pump?',
      urdu: 'پٹرول پمپ کہاں ہے؟',
      shina: 'پٹرول پمپ کونے ہن؟ (Petrol pump konay han?)',
      balti: 'پٹرول پمپ گانے یود؟ (Petrol pump ganey yod?)',
      burushaski: 'پٹرول پمپ امے بی؟ (Petrol pump amine bi?)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'Wair iz the peh-truhl pump?',
      urdu: 'Petrol pump kahan hai?',
      shina: 'Pet-rohl pump koh-nay hahn?',
      balti: 'Pet-rohl pump gah-nay yohd?',
      burushaski: 'Pet-rohl pump ah-mee-nay bee?'
    },
    verified: true
  },
  {
    sourceText: 'Can you call a mechanic?',
    sourceLanguage: 'english',
    translations: {
      english: 'Can you call a mechanic?',
      urdu: 'کیا آپ میکینک کو بلا سکتے ہیں؟',
      shina: 'میکینکٹ بلے جا؟ (Mechanic-et balay jya?)',
      balti: 'میکینک لہ رن چھوس کھوبا؟ (Mechanic la ran chos khoba?)',
      burushaski: 'میکینک ساد ایتا؟ (Mechanic saad eeta?)'
    },
    category: 'Emergency',
    pronunciations: {
      english: 'Kan yoo kahl uh muh-kan-ik?',
      urdu: 'Kya aap mechanic ko bula saktay hain?',
      shina: 'Meh-kuh-neek-et bah-lay jyah?',
      balti: 'Meh-kuh-neek lah ruhn chohs khoh-bah?',
      burushaski: 'Meh-kuh-neek sahd ay-tah?'
    },
    verified: true
  },
  {
    sourceText: 'How much is the jeep fare?',
    sourceLanguage: 'english',
    translations: {
      english: 'How much is the jeep fare?',
      urdu: 'جیپ کا کرایہ کتنا ہے؟',
      shina: 'جیپئی کرایہ کیچک ہن؟ (Jeep-ei kiraya kaachak han?)',
      balti: 'جیپ کھا کرایہ تسوق پین؟ (Jeep kha kiraya tsoq pen?)',
      burushaski: 'جیپئی کرایہ کتی بی؟ (Jeep-ei kiraya kati bi?)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'How much iz the jeep fayr?',
      urdu: 'Jeep ka kiraya kitna hai?',
      shina: 'Jeep-ay kee-rah-yah kah-chahk hahn?',
      balti: 'Jeep khah kee-rah-yah tsohq pen?',
      burushaski: 'Jeep-ay kee-rah-yah kah-tee bee?'
    },
    verified: true
  },
  {
    sourceText: 'Is this hiking track safe?',
    sourceLanguage: 'english',
    translations: {
      english: 'Is this hiking track safe?',
      urdu: 'کیا یہ پیدل ٹریک محفوظ ہے؟',
      shina: 'انو رستہ محفوظ ہنا؟ (Anu rasta mehfooz hana?)',
      balti: 'انی لم خیلسن یودبا؟ (Ani lam khelsan yodba?)',
      burushaski: 'انو رستہ سلامتی جو بیلا؟ (Anu rasta salaamati jo beela?)'
    },
    category: 'Tourist communication',
    pronunciations: {
      english: 'Iz this hy-king trak sayf?',
      urdu: 'Kya yeh paidal track mehfooz hai?',
      shina: 'Ah-noo ruhs-tah meh-fooz hah-nah?',
      balti: 'Ah-nee lahm khel-sahn yohd-bah?',
      burushaski: 'Ah-noo ruhs-tah sah-lah-mah-tee joh bee-lah?'
    },
    verified: true
  },
  {
    sourceText: 'Where does this river come from?',
    sourceLanguage: 'english',
    translations: {
      english: 'Where does this river come from?',
      urdu: 'یہ دریا کہاں سے آتا ہے؟',
      shina: 'انو گاو کونے جو ولیلو ہن؟ (Anu gaav konay jo waleelo han?)',
      balti: 'انی رگینگ گانے نے اونگما ان؟ (Ani rgyang ganey ne ongma in?)',
      burushaski: 'انو ڈیل امے جو دیس بی؟ (Anu deel amine jo dees bi?)'
    },
    category: 'Tourist communication',
    pronunciations: {
      english: 'Wair duz this riv-er kum fruhm?',
      urdu: 'Yeh darya kahan se aata hai?',
      shina: 'Ah-noo gahv koh-nay joh wah-lee-loh hahn?',
      balti: 'Ah-nee rgyahng gah-nay nay ohng-mah in?',
      burushaski: 'Ah-noo deel ah-mee-nay joh dees bee?'
    },
    verified: true
  },
  {
    sourceText: 'These apricots are very sweet',
    sourceLanguage: 'english',
    translations: {
      english: 'These apricots are very sweet',
      urdu: 'یہ خوبانیاں بہت میٹھی ہیں',
      shina: 'انی جورے بو مٹھو ہنیت (Ani jooray bo mittho hanit)',
      balti: 'انی چولی منگپو منگرمو ان (Ani chuli mangpo ngarmo in)',
      burushaski: 'انو جورنگ بوٹ شقین بین (Anu jorang boot shaqeen been)'
    },
    category: 'Food',
    pronunciations: {
      english: 'Theez ay-pruh-kots ar veh-ree sweet',
      urdu: 'Yeh khoobaniyan bohat meethi hain',
      shina: 'Ah-nee joo-ray boh meet-thoh hah-neet',
      balti: 'Ah-nee choo-lee mahng-poh ngahr-moh in',
      burushaski: 'Ah-noo joh-rahng boot shah-qeen been'
    },
    verified: true
  },
  {
    sourceText: 'Traditional walnut wood craft',
    sourceLanguage: 'english',
    translations: {
      english: 'Traditional walnut wood craft',
      urdu: 'اخروٹ کی لکڑی کا روایتی دستکاری کام',
      shina: 'اخروٹوئی کاٹھئی کام (Akhrotoi kaathei kaam)',
      balti: 'ستارگا کھا چوسپو کاریگری (Starga kha chospo karigari)',
      burushaski: 'اخروٹئی ہولتی دستی کام (Akhrotei holti dasti kaam)'
    },
    category: 'Shopping',
    pronunciations: {
      english: 'Truh-dish-uh-nul wawl-nut wood kraft',
      urdu: 'Akhrot ki lakri ka dastkari kaam',
      shina: 'Ukh-roh-toy kaht-hay kahm',
      balti: 'Stahr-gah khah chohs-poh kah-ree-gah-ree',
      burushaski: 'Ukh-roh-tay hohl-tee dahs-tee kahm'
    },
    verified: true
  },
  {
    sourceText: 'Who is the local village elder?',
    sourceLanguage: 'english',
    translations: {
      english: 'Who is the local village elder?',
      urdu: 'گاؤں کے بڑے یا نمبردار کون ہیں؟',
      shina: 'گاموئی نمبردار کو ہن؟ (Gaam-ei numberdar ko han?)',
      balti: 'یولے ترونگپو کونی ان؟ (Yul-e trongpo kani in?)',
      burushaski: 'گردا نمبردار مین با؟ (Girda numberdar mein ba?)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Hoo iz the loh-kul vil-ij el-der?',
      urdu: 'Gaoon ke numberdar kaun hain?',
      shina: 'Gahm-ay noom-ber-dahr koh hahn?',
      balti: 'Yool-ay trohng-poh kah-nee in?',
      burushaski: 'Geer-dah noom-ber-dahr mayn bah?'
    },
    verified: true
  },
  {
    sourceText: 'Can I drink tap water here?',
    sourceLanguage: 'english',
    translations: {
      english: 'Can I drink tap water here?',
      urdu: 'کیا یہاں کا نل کا پانی پینے کے قابل ہے؟',
      shina: 'انو وئی پیوک شوا ہنا؟ (Anu wei piyok shuwa hana?)',
      balti: 'انی چھو تھنگبا کھوبا؟ (Ani chhu thungba khoba?)',
      burushaski: 'انو چھی میمینشا با؟ (Anu chhi meeminsha ba?)'
    },
    category: 'Healthcare',
    pronunciations: {
      english: 'Kan eye drink tap wah-ter heer?',
      urdu: 'Kya yahan ka nalka paani peenay ke qabil hai?',
      shina: 'Ah-noo way pee-yohk shoo-wah hah-nah?',
      balti: 'Ah-nee chhoo toong-bah khoh-bah?',
      burushaski: 'Ah-noo chhee mee-meen-shah bah?'
    },
    verified: true
  },
  {
    sourceText: 'What languages are spoken in Gilgit-Baltistan?',
    sourceLanguage: 'english',
    translations: {
      english: 'What languages are spoken in Gilgit-Baltistan?',
      urdu: 'گلگت بلتستان میں کونسی زبانیں بولی جاتی ہیں؟',
      shina: 'گلگت بلتستان مجہ کے زبون رینن؟ (Gilgit-Baltistan maja ke zaboon rainan?)',
      balti: 'گلگت بلتستان نا کانی زکد زرا چھوسبا؟ (Gilgit-Baltistan na kani zkad zra chosba?)',
      burushaski: 'گلگت بلتستانلو کتے زبان بولش بان؟ (Gilgit-Baltistanlo katay zaban bolsh baan?)'
    },
    category: 'Education',
    pronunciations: {
      english: 'Wot lang-gwij-iz ar spoh-kun in Gil-git Bal-ti-stan?',
      urdu: 'Gilgit-Baltistan mein kaunsi zubanein boli jaati hain?',
      shina: 'Gil-git Bal-ti-stan mah-jah kay zah-boon ray-nahn?',
      balti: 'Gil-git Bal-ti-stan nah kah-nee zkahd zrah chohs-bah?',
      burushaski: 'Gil-git Bal-ti-stan-loh kah-tay zah-bahn bohl-sh bahn?'
    },
    verified: true
  },
  {
    sourceText: 'Shina is widely spoken in Gilgit and Diamer',
    sourceLanguage: 'english',
    translations: {
      english: 'Shina is widely spoken in Gilgit and Diamer',
      urdu: 'شینا گلگت اور دیامر میں بکثرت بولی جاتی ہے',
      shina: 'شینا گلگت گہ دیامر مجہ بو رینن (Shina Gilgit gah Diamer maja bo rainan)',
      balti: 'شینا زکد گلگت نا دیامر نا منگپو زرا چھوس (Shina zkad Gilgit na Diamer na mangpo zra chos)',
      burushaski: 'شینا گلگت اور دیامرلو بوٹ بولش بان (Shina Gilgit aur Diamerlo boot bolsh baan)'
    },
    category: 'Education',
    pronunciations: {
      english: 'Shee-nuh iz wyd-lee spoh-kun',
      urdu: 'Shina Gilgit aur Diamer mein boli jaati hai',
      shina: 'Shee-nah Gil-git gah Dee-ah-mur mah-jah boh ray-nahn',
      balti: 'Shee-nah zkahd Gil-git nah Dee-ah-mur nah mahng-poh zrah chohs',
      burushaski: 'Shee-nah Gil-git ohr Dee-ah-mur-loh boot bohl-sh bahn'
    },
    verified: true
  },
  {
    sourceText: 'Balti is spoken in Skardu and Baltistan',
    sourceLanguage: 'english',
    translations: {
      english: 'Balti is spoken in Skardu and Baltistan',
      urdu: 'بلتی زبان اسکردو اور بلتستان میں بولی جاتی ہے',
      shina: 'بلتی زبون اسکردو مجہ رینن (Balti zaboon Skardu maja rainan)',
      balti: 'بلتی زکد بلتستان نا اسکردو نا زرا چھوس (Balti zkad Baltistan na Skardu na zra chos)',
      burushaski: 'بلتی زبان اسکردو اور بلتستانلو بولش بان (Balti zaban Skardu aur Baltistanlo bolsh baan)'
    },
    category: 'Education',
    pronunciations: {
      english: 'Bahl-tee iz spoh-kun in Skar-doo',
      urdu: 'Balti zuban Skardu aur Baltistan mein boli jaati hai',
      shina: 'Bahl-tee zah-boon Skar-doo mah-jah ray-nahn',
      balti: 'Bahl-tee zkahd Bahl-tee-stahn nah Skar-doo nah zrah chohs',
      burushaski: 'Bahl-tee zah-bahn Skar-doo ohr Bahl-tee-stahn-loh bohl-sh bahn'
    },
    verified: true
  },
  {
    sourceText: 'Burushaski is spoken in Hunza, Nagar and Yasin',
    sourceLanguage: 'english',
    translations: {
      english: 'Burushaski is spoken in Hunza, Nagar and Yasin',
      urdu: 'بروشسکی زبان ہنزہ، نگر اور یاسین میں بولی جاتی ہے',
      shina: 'بروشسکی ہنزہ نگر مجہ رینن (Burushaski Hunza Nagar maja rainan)',
      balti: 'بروشسکی زکد ہنزہ نا نگر نا زرا چھوس (Burushaski zkad Hunza na Nagar na zra chos)',
      burushaski: 'بروشسکی ہنزہ نگر گہ یاسینلو بولش بان (Burushaski Hunza Nagar gah Yasinlo bolsh baan)'
    },
    category: 'Education',
    pronunciations: {
      english: 'Boo-roo-shus-kee iz spoh-kun in Hoon-zah',
      urdu: 'Burushaski zuban Hunza, Nagar aur Yasin mein boli jaati hai',
      shina: 'Boo-roo-shus-kee Hoon-zah Nuh-guhr mah-jah ray-nahn',
      balti: 'Boo-roo-shus-kee zkahd Hoon-zah nah Nuh-guhr nah zrah chohs',
      burushaski: 'Boo-roo-shus-kee Hoon-zah Nuh-guhr gah Yah-seen-loh bohl-sh bahn'
    },
    verified: true
  },
  {
    sourceText: 'How many people are in your tour group?',
    sourceLanguage: 'english',
    translations: {
      english: 'How many people are in your tour group?',
      urdu: 'آپ کے گروپ میں کتنے افراد ہیں؟',
      shina: 'تھائی گروپ مجہ کیچک منوزے ہنیت؟ (Tha-ee group maja kaachak manoojay hanit?)',
      balti: 'کھیرنگے گروپ نا می تسوق یود؟ (Kherang-e group na mi tsoq yod?)',
      burushaski: 'گومی گروپلو کتے بندے بان؟ (Gomi grouplo katay banday baan?)'
    },
    category: 'Travel',
    pronunciations: {
      english: 'How men-ee pee-pl ar in yor toor groop?',
      urdu: 'Aap ke group mein kitnay afraad hain?',
      shina: 'Tah-ee groop mah-jah kah-chahk mah-noo-jay hah-neet?',
      balti: 'Khay-rung-ay groop nah mee tsohq yohd?',
      burushaski: 'Goh-mee groop-loh kah-tay bun-day bahn?'
    },
    verified: true
  },
  {
    sourceText: 'The view from here is breathtaking',
    sourceLanguage: 'english',
    translations: {
      english: 'The view from here is breathtaking',
      urdu: 'یہاں سے نظارہ دلکش ہے',
      shina: 'انی جو نظارہ بو شوا ہن (Ani jo nazara bo shuwa han)',
      balti: 'دیری نے نظارہ منگپو لیدمو ان (Diri ne nazara mangpo ledmo in)',
      burushaski: 'کھیلے جو نظارہ بوٹ شوءا بی (Khilay jo nazara boot shuwa bi)'
    },
    category: 'Tourist communication',
    pronunciations: {
      english: 'The vyoo fruhm heer iz breath-tay-king',
      urdu: 'Yahan se nazaara dilkash hai',
      shina: 'Ah-nee joh nuh-zah-rah boh shoo-wah hahn',
      balti: 'Dee-ree nay nuh-zah-rah mahng-poh lehd-moh in',
      burushaski: 'Khee-lay joh nuh-zah-rah boot shoo-wah bee'
    },
    verified: true
  },
  {
    sourceText: 'Please speak more slowly',
    sourceLanguage: 'english',
    translations: {
      english: 'Please speak more slowly',
      urdu: 'براہ کرم تھوڑا آہستہ بولیں',
      shina: 'بولیلی رے مہربانی (Bolili ray meherbani)',
      balti: 'کھے کا زرا چھوس اننگ (Khe ka zra chos inang)',
      burushaski: 'کھے بولش ایتی مہربانی (Khe bolsh eti meherbani)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Pleez speek mor sloh-lee',
      urdu: 'Barah-e-karam thora aahista bolein',
      shina: 'Boh-lee-lee ray may-her-bah-nee',
      balti: 'Khay kah zrah chohs ee-nahng',
      burushaski: 'Khay bohl-sh ay-tee may-her-bah-nee'
    },
    verified: true
  },
  {
    sourceText: 'Can you repeat that?',
    sourceLanguage: 'english',
    translations: {
      english: 'Can you repeat that?',
      urdu: 'کیا آپ دوبارہ کہہ سکتے ہیں؟',
      shina: 'دوبارہ رے جا؟ (Dobara ray jya?)',
      balti: 'ینگ چک زرا چھوس کھوبا؟ (Yang chik zra chos khoba?)',
      burushaski: 'دوبارہ بولش ایتا؟ (Dobara bolsh eeta?)'
    },
    category: 'Daily conversation',
    pronunciations: {
      english: 'Kan yoo ri-peet that?',
      urdu: 'Kya aap dobara keh saktay hain?',
      shina: 'Doh-bah-rah ray jyah?',
      balti: 'Yahng cheek zrah chohs khoh-bah?',
      burushaski: 'Doh-bah-rah bohl-sh ay-tah?'
    },
    verified: true
  },
  {
    sourceText: 'I am honored to be here',
    sourceLanguage: 'english',
    translations: {
      english: 'I am honored to be here',
      urdu: 'یہاں آنا میرے لیے اعزاز کی بات ہے',
      shina: 'انی والو مئی فخر ہن (Ani walo mayi fakhar han)',
      balti: 'دیری اونگسے نگا فخر سونگ (Diri ongse nga fakhar song)',
      burushaski: 'کھیلے جو جا فخر منا با (Khilay jo ja fakhar mana ba)'
    },
    category: 'Tourist communication',
    pronunciations: {
      english: 'Eye am on-erd too bee heer',
      urdu: 'Yahan aana meray liye aizaaz ki baat hai',
      shina: 'Ah-nee wah-loh may-ee fuh-khuhr hahn',
      balti: 'Dee-ree ohng-say ngah fuh-khuhr song',
      burushaski: 'Khee-lay joh jah fuh-khuhr mah-nah bah'
    },
    verified: true
  },
  {
    sourceText: 'Safe travels and blessings',
    sourceLanguage: 'english',
    translations: {
      english: 'Safe travels and blessings',
      urdu: 'آپ کا سفر بخیر اور پرسکون ہو',
      shina: 'سفر خیرو بو گہ سلامتی (Safar khairo bo gah salaamati)',
      balti: 'لم خیلسن نا برکت سونگ (Lam khelsan na barkat song)',
      burushaski: 'سفر سلامتی گہ برکت جو بی (Safar salaamati gah barkat jo bi)'
    },
    category: 'Greetings',
    pronunciations: {
      english: 'Sayf trav-ulz and bles-ingz',
      urdu: 'Aap ka safar ba-khair aur pur-sukoon ho',
      shina: 'Sah-far khay-roh boh gah sah-lah-mah-tee',
      balti: 'Lahm khel-sahn nah bahr-kuht song',
      burushaski: 'Sah-far sah-lah-mah-tee gah bahr-kuht joh bee'
    },
    verified: true
  }
];
