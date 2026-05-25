export type Locale = "en" | "ar";

export interface Translations {
  // Navbar
  nav: {
    about: string;
    projects: string;
    experience: string;
    skills: string;
    contact: string;
    cv: string;
  };
  // Hero
  hero: {
    roles: string[];
    name: string;
    tagline: string;
    taglineHighlight1: string;
    taglineHighlight2: string;
    stats: { label: string }[];
    exploreBtn: string;
    contactBtn: string;
    scroll: string;
  };
  // About
  about: {
    eyebrow: string;
    heading: string;
    counterStats: { label: string }[];
    highlights: { title: string; description: string }[];
  };
  // Projects
  projects: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
      role: string;
      architecture: string;
      specs: string[];
      achievements: string[];
    }[];
    viewDetails: string;
    closeDetails: string;
    specTitle: string;
    archTitle: string;
    achTitle: string;
  };
  // AIoT HMI Lab
  aiotLab: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subtitle: string;
    power: string;
    speed: string;
    boxCount: string;
    sensorStatus: string;
    sensorTriggered: string;
    sensorClear: string;
    telemetryTitle: string;
    tempLabel: string;
    vibLabel: string;
    powerLabel: string;
    terminalTitle: string;
    stateNormal: string;
    stateThrottled: string;
    stateCooling: string;
    logs: {
      boot: string;
      sensorCalib: string;
      normal: string;
      warningTemp: string;
      coolActive: string;
      coolResolved: string;
      boxDetected: string;
    };
  };
  // Experience
  experience: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    items: { role: string; company: string; period: string; description: string }[];
  };
  // Skills
  skills: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subtitle: string;
    categories: { category: string }[];
  };
  // Contact
  contact: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    description: string;
    cta: string;
    socials: { label: string }[];
  };
  // Footer
  footer: {
    copyright: string;
    builtWith: string;
  };
  // Theme
  theme: {
    light: string;
    dark: string;
  };
  lang: {
    switch: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
      skills: "Skills",
      contact: "Contact",
      cv: "CV",
    },
    hero: {
      roles: [
        "Mechatronics Engineer",
        "Founder at Cortex Company",
        "Manager at PowerGroup",
        "AIoT Architect",
        "Automation Specialist",
        "Full-Stack Developer",
      ],
      name: "Moaaz Mohamed Elghamry",
      tagline: "Architecting distributed automation ecosystems and bridging the gap between",
      taglineHighlight1: "heavy industry",
      taglineHighlight2: "AIoT",
      stats: [
        { label: "3.99 CGPA" },
        { label: "CSWP Certified" },
        { label: "#1 in Department" },
      ],
      exploreBtn: "Explore Systems",
      contactBtn: "Initiate Contact",
      scroll: "Scroll",
    },
    about: {
      eyebrow: "About Me",
      heading: "Telemetry & Directives",
      counterStats: [
        { label: "Projects Shipped" },
        { label: "Internships" },
        { label: "Excellence Award" },
      ],
      highlights: [
        {
          title: "Core Expertise",
          description:
            "Dual-certified SOLIDWORKS Professional (CSWP) and Associate (CSWA). Specialized in industrial automation (Siemens S7-1200/1500) and integrating Generative AI into industrial diagnostics.",
        },
        {
          title: "Leadership",
          description:
            "Founder at Cortex Company and Manager at PowerGroup. Leader of the Mecha-Horizon and Thrive ZNU student teams, driving multidisciplinary innovation and engineering excellence.",
        },
        {
          title: "Recognition",
          description:
            "Ranked 1st in the department and honored as the recipient of the University Excellence Award for three consecutive years.",
        },
      ],
    },
    projects: {
      eyebrow: "Portfolio",
      heading: "The Fleet: ",
      headingHighlight: "Strategic Projects",
      subtitle:
        "Systems engineered from the ground up — each solving real-world problems at the intersection of hardware, software, and AI.",
      items: [
        {
          title: "ZNUE Portal V2 (UMSP)",
          description:
            "Built a high-availability academic portal using Django 5.2, Redis, and WebSockets for real-time telemetry. Integrated a custom RAG system using Llama 3.3 and Gemini 2.5 for complex engineering insights.",
          role: "Lead Full-Stack & AI Architect",
          architecture: "Next.js frontend communicating with a Django 5.2 backend over secure WebSockets. Redis caches active sessions and routes real-time telemetry, while PostgreSQL handles structured user data.",
          specs: ["Framework: Django 5.2 & Redis", "Caching Latency: < 5ms", "AI RAG Pipeline: Llama 3.3 / Gemini 2.5", "WebSockets: Gevent Channels"],
          achievements: [
            "Reduced query resolution time by 60% using local vector database indexing.",
            "Handled 5,000+ concurrent WebSocket connections with zero message drop rates.",
            "Integrated automatic fallback to backup LLM models during API downtime."
          ]
        },
        {
          title: "Gaming Hub PS System",
          description:
            "Developed a high-value cashier management application featuring offline-first functionality via Firebase, integrating three complex subsystems for seamless operation.",
          role: "Systems Architect & Developer",
          architecture: "React interface using client-side Firebase cache stores. Telemetry synchronizes automatically when internet connection resumes. Embedded three sub-modules for time-tracking, billing, and stock inventory.",
          specs: ["Storage: Firestore offline-cache", "Sync Interval: Instantaneous on-connect", "Architecture: Modular Subsystems", "State Management: Redux Toolkit"],
          achievements: [
            "Achieved 100% cashier transaction uptime regardless of physical connectivity.",
            "Designed a highly efficient local diff synchronization algorithm to reduce write overhead.",
            "Implemented granular audit logging to prevent terminal security tampering."
          ]
        },
        {
          title: "2-Way Intelligent Traffic Management",
          description:
            "Designed a complex logic-based traffic control system utilizing NE555 timers and digital logic gates, engineered completely under the Cortex Company banner.",
          role: "Hardware & Automation Engineer",
          architecture: "Discrete logic circuits built around NE555 astable/monostable multivibrators. Decoders and multiplexers calculate dynamic signals based on simulated traffic density detectors.",
          specs: ["Timers: NE555 precision chips", "Logic: TTL 74LS series gates", "Simulation: Proteus 9 & SOLIDWORKS", "Casing: custom 3D printed housing"],
          achievements: [
            "Showcased at the University Engineering Exhibition and recognized for hardware optimization.",
            "Eliminated microcontrollers, proving 100% electromagnetic-interference resilience.",
            "Simulated thermal dissipation and structural load of the hardware enclosure in SOLIDWORKS."
          ]
        },
        {
          title: "Industrial Data Ecosystem",
          description:
            "Centralized hub for mechatronic resource allocations. Automated legacy Excel data ingestion into PostgreSQL maintaining 100% data integrity.",
          role: "Data Operations Architect",
          architecture: "Python Pandas pipeline designed for batch schema translation. PostgreSQL serves as the relational data warehouse with built-in database constraints and triggers.",
          specs: ["Engine: Pandas / Python 3.11", "Database: PostgreSQL", "Automation: Cron Orchestrated", "Validation: Pydantic schemas"],
          achievements: [
            "Migrated 10+ years of legacy spreadsheet archives with 0% records corruption.",
            "Accelerated resource querying performance by 400% through index optimization.",
            "Implemented an automated alert system notifying engineers on out-of-bounds inventory levels."
          ]
        }
      ],
      viewDetails: "Inspect System Specs",
      closeDetails: "Deactivate Link",
      specTitle: "Technical Payload",
      archTitle: "System Architecture",
      achTitle: "Key Achievements"
    },
    aiotLab: {
      eyebrow: "Interactive Simulation",
      heading: "AIoT Industrial ",
      headingHighlight: "HMI Laboratory",
      subtitle: "Toggle live control signals, adjust system throttle, and observe how the telemetry nodes feed real-time diagnostics back to the AI loop.",
      power: "System Power",
      speed: "Conveyor Speed (RPM)",
      boxCount: "Processed Objects",
      sensorStatus: "Laser Proximity Sensor",
      sensorTriggered: "Laser Broken",
      sensorClear: "Active Beam",
      telemetryTitle: "Live Telemetry Feed",
      tempLabel: "Motor Temperature (°C)",
      vibLabel: "Vibration Frequency (Hz)",
      powerLabel: "Power Consumption (W)",
      terminalTitle: "Industrial Controller Logs",
      stateNormal: "NOMINAL STATE",
      stateThrottled: "THERMAL THROTTLING",
      stateCooling: "COOLING CYCLE",
      logs: {
        boot: "Booting AIoT Telemetry node... OK",
        sensorCalib: "Laser distance sensor calibration... OK",
        normal: "Motor running at nominal load.",
        warningTemp: "Warning: Motor temperature exceeded critical limit! Thermal throttling activated.",
        coolActive: "Active cooling pump activated. Speed locked.",
        coolResolved: "Temperature recovered. Returning to manual control.",
        boxDetected: "OBJECT DETECTED: Sorting valve activated."
      }
    },
    experience: {
      eyebrow: "Experience",
      heading: "Zero-G ",
      headingHighlight: "Timeline",
      items: [
        {
          role: "Founder & Lead Engineer",
          company: "Cortex Company",
          period: "Current",
          description:
            "Founded Cortex Company focusing on intelligent hardware systems design. Led the development of the 2-Way Intelligent Traffic Management System showcased at university exhibitions.",
        },
        {
          role: "Manager",
          company: "PowerGroup",
          period: "Current",
          description:
            "Managing cross-functional teams and overseeing project delivery pipelines. Coordinating between engineering teams and stakeholders for industrial solutions.",
        },
        {
          role: "Advanced PLC Specialist",
          company: "DON-BOSCO Institute",
          period: "Training Program",
          description:
            "Engineered automation logic (SCL/STL) for multi-axis production lines and optimized HMI dashboards for real-time process monitoring.",
        },
        {
          role: "Diagnostics Intern",
          company: "ManTrac (Caterpillar)",
          period: "Internship",
          description:
            "Conducted hardware-level diagnostics on heavy-duty ECUs via CAN-bus data analysis, ensuring fleet uptime and predictive maintenance.",
        },
        {
          role: "Systems Engineering Intern",
          company: "HA Consulting Group",
          period: "Internship",
          description:
            "Developed IEC/NEC compliant schematics and automated documentation workflows, increasing engineering output speed by 30%.",
        },
      ],
    },
    skills: {
      eyebrow: "Capabilities",
      heading: "Technical ",
      headingHighlight: "Payload",
      subtitle:
        "A battle-tested arsenal spanning hardware design, full-stack development, and artificial intelligence.",
      categories: [
        { category: "Hardware" },
        { category: "Software" },
        { category: "AI / DevOps" },
      ],
    },
    contact: {
      eyebrow: "What's Next?",
      heading: "Let's Build Something ",
      headingHighlight: "Extraordinary",
      description:
        "Whether it's an industrial automation challenge, an AIoT integration, or a full-stack system — I'm ready to architect the solution.",
      cta: "Get In Touch",
      socials: [
        { label: "LinkedIn" },
        { label: "GitHub" },
        { label: "Email" },
        { label: "Resume" },
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Moaaz Mohamed Elghamry. All systems operational.`,
      builtWith: "Built with",
    },
    theme: { light: "Light", dark: "Dark" },
    lang: { switch: "العربية" },
  },
  ar: {
    nav: {
      about: "نبذة عني",
      projects: "المشاريع",
      experience: "الخبرات",
      skills: "المهارات",
      contact: "تواصل",
      cv: "السيرة",
    },
    hero: {
      roles: [
        "مهندس ميكاترونيكس",
        "مؤسس شركة كورتكس",
        "مدير في باور جروب",
        "مهندس إنترنت الأشياء",
        "أخصائي أتمتة",
        "مطور ويب متكامل",
      ],
      name: "معاذ محمد الغمري",
      tagline: "بناء أنظمة أتمتة موزعة وسد الفجوة بين",
      taglineHighlight1: "الصناعات الثقيلة",
      taglineHighlight2: "إنترنت الأشياء الذكي",
      stats: [
        { label: "3.99 معدل تراكمي" },
        { label: "شهادة CSWP" },
        { label: "الأول على القسم" },
      ],
      exploreBtn: "استكشف الأنظمة",
      contactBtn: "تواصل معي",
      scroll: "مرر للأسفل",
    },
    about: {
      eyebrow: "نبذة عني",
      heading: "القياسات والتوجيهات",
      counterStats: [
        { label: "مشاريع منجزة" },
        { label: "تدريبات" },
        { label: "جائزة التميز" },
      ],
      highlights: [
        {
          title: "الخبرة الأساسية",
          description:
            "حاصل على شهادتي CSWP و CSWA من SOLIDWORKS. متخصص في الأتمتة الصناعية (Siemens S7-1200/1500) ودمج الذكاء الاصطناعي التوليدي في التشخيصات الصناعية.",
        },
        {
          title: "القيادة",
          description:
            "مؤسس شركة كورتكس ومدير في باور جروب. قائد فريقي Mecha-Horizon و Thrive ZNU الطلابيين، لقيادة الابتكار متعدد التخصصات والتميز الهندسي.",
        },
        {
          title: "التقدير",
          description:
            "الأول على القسم وحائز على جائزة التميز الجامعي لثلاث سنوات متتالية.",
        },
      ],
    },
    projects: {
      eyebrow: "الأعمال",
      heading: "الأسطول: ",
      headingHighlight: "المشاريع الاستراتيجية",
      subtitle:
        "أنظمة مهندسة من الصفر — كل منها يحل مشاكل حقيقية عند تقاطع الأجهزة والبرمجيات والذكاء الاصطناعي.",
      items: [
        {
          title: "بوابة ZNUE الإصدار الثاني",
          description:
            "بناء بوابة أكاديمية عالية التوفر باستخدام Django 5.2 و Redis و WebSockets للقياس عن بعد في الوقت الفعلي. دمج نظام RAG مخصص باستخدام Llama 3.3 و Gemini 2.5.",
          role: "رئيس المطورين ومعماري الذكاء الاصطناعي",
          architecture: "واجهة Next.js تتصل بخلفية Django 5.2 عبر قنوات WebSockets آمنة. يوجه Redis تدفق البيانات المباشر وجلسات المستخدمين، بينما يتعامل PostgreSQL مع البيانات المهيكلة.",
          specs: ["التقنية: Django 5.2 & Redis", "زمن استجابة التخزين: < 5 ملي ثانية", "محرك البحث والذكاء: Llama 3.3 / Gemini 2.5", "قنوات الاتصال: Gevent Channels"],
          achievements: [
            "تقليص زمن الاستعلام بنسبة 60% عبر فهرسة قواعد البيانات الشعاعية المحلية.",
            "معالجة ما يزيد عن 5,000 اتصال متزامن للـ WebSockets دون أي فقد للبيانات.",
            "دمج آلية التحويل التلقائي للنماذج الاحتياطية للذكاء الاصطناعي في حالات انقطاع الخدمة."
          ]
        },
        {
          title: "نظام Gaming Hub PS",
          description:
            "تطوير تطبيق إدارة كاشير عالي القيمة مع وظائف العمل بدون اتصال عبر Firebase، مع دمج ثلاثة أنظمة فرعية معقدة.",
          role: "معماري الأنظمة والمطور الرئيسي",
          architecture: "واجهة مستخدم React تعتمد على التخزين المؤقت المحلي لـ Firebase. تتزامن البيانات تلقائيًا فور استعادة الاتصال. يضم 3 وحدات فرعية لإدارة الوقت والفوترة والمخازن.",
          specs: ["قاعدة البيانات: Firestore offline-cache", "فاصل التزامن: فوري عند الاتصال", "بنية النظام: وحدات مستقلة متكاملة", "إدارة الحالة: Redux Toolkit"],
          achievements: [
            "ضمان استمرارية عمليات الكاشير بنسبة 100% بغض النظر عن حالة الاتصال بالإنترنت.",
            "تصميم خوارزمية مزامنة فروقات ذكية لتقليل حجم البيانات وتكلفة الكتابة.",
            "تطبيق نظام تسجيل تدقيق دقيق لمنع التلاعب في المحطات الحسابية."
          ]
        },
        {
          title: "إدارة المرور الذكية ثنائية الاتجاه",
          description:
            "تصميم نظام تحكم مروري معقد قائم على المنطق باستخدام مؤقتات NE555 وبوابات المنطق الرقمي، تم تطويره بالكامل تحت راية شركة كورتكس.",
          role: "مهندس الأجهزة والأتمتة",
          architecture: "دوائر منطقية منفصلة مبنية حول مولدات الذبذبة والمؤقتات NE555. فك التشفير والمقارنة لتحديد أولوية المسار بناء على كثافة السيارات المحاكاة.",
          specs: ["المؤقتات: شرائح NE555 الدقيقة", "البوابات المنطقية: عائلة TTL 74LS", "برامج المحاكاة: Proteus 9 & SOLIDWORKS", "الهيكل الخارجي: طباعة ثلاثية الأبعاد مخصصة"],
          achievements: [
            "عُرض في معرض الهندسة السنوي وحاز على تقدير واسع لتبسيط المكونات.",
            "الاستغناء بالكامل عن المعالجات الدقيقة لإثبات موثوقية الأجهزة ضد التشويش الكهرومغناطيسي.",
            "محاكاة التشتت الحراري ومقاومة الهيكل للأحمال الهندسية باستخدام SOLIDWORKS."
          ]
        },
        {
          title: "منظومة البيانات الصناعية",
          description:
            "مركز مركزي لتخصيص الموارد الميكاترونية. أتمتة استيعاب بيانات Excel القديمة إلى PostgreSQL مع الحفاظ على سلامة البيانات بنسبة 100%.",
          role: "معماري عمليات البيانات",
          architecture: "مجرى معالجة بيانات مكتوب بلغة Python ومكتبة Pandas لترجمة الجداول القديمة. قاعدة بيانات PostgreSQL علائقية مع تطبيق قيود صارمة لسلامة المراجع.",
          specs: ["محرك النقل: Pandas / Python 3.11", "قاعدة البيانات: PostgreSQL", "الجدولة: مهام Cron المؤتمتة", "التحقق: نماذج Pydantic للتحقق"],
          achievements: [
            "نقل أرشيف جداول قديم يغطي 10 سنوات مع الحفاظ على سلامة البيانات بنسبة 100%.",
            "تسريع استعلامات الموارد بنسبة 400% عبر تحسين الفهارس والعلاقات.",
            "بناء نظام إشعارات ذكي ينبه المهندسين فور انخفاض مخزون المكونات الحرجة."
          ]
        }
      ],
      viewDetails: "فحص تفاصيل النظام",
      closeDetails: "إغلاق التفاصيل",
      specTitle: "الحمولة التقنية والأرقام",
      archTitle: "معمارية النظام",
      achTitle: "أبرز الإنجازات"
    },
    aiotLab: {
      eyebrow: "محاكاة تفاعلية",
      heading: "مختبر إنترنت الأشياء ",
      headingHighlight: "والأتمتة الصناعية (HMI)",
      subtitle: "تحكم بالإشارات الحية للمحرك، اضبط سرعة الحزام الناقل، وراقب كيف يغذي نظام القياس الذكي ذكاء الآلة في الوقت الفعلي.",
      power: "طاقة النظام",
      speed: "سرعة الحزام (دورة/دقيقة)",
      boxCount: "العناصر المصنفة",
      sensorStatus: "حساس التقارب الليزري",
      sensorTriggered: "شعاع منقطع",
      sensorClear: "شعاع نشط",
      telemetryTitle: "تلقي القياسات الحية",
      tempLabel: "حرارة المحرك (درجة مئوية)",
      vibLabel: "تردد الاهتزازات (هرتز)",
      powerLabel: "معدل استهلاك الطاقة (وات)",
      terminalTitle: "سجل أحداث وحدة التحكم",
      stateNormal: "الحالة الاسمية مستقرة",
      stateThrottled: "التخفيض الحراري نشط",
      stateCooling: "دورة التبريد الفوري",
      logs: {
        boot: "بدء تشغيل وحدة قياس IoT... تم بنجاح",
        sensorCalib: "معايرة حساس المسافة بالليزر... تم بنجاح",
        normal: "المحرك يعمل بالحمل الاسمي المستقر.",
        warningTemp: "تحذير: تجاوزت درجة حرارة المحرك الحد الحرج! بدء التخفيض الحراري الوقائي.",
        coolActive: "تفعيل مضخة التبريد المباشر. تم تثبيت السرعة.",
        coolResolved: "تعافت الحرارة بنجاح. العودة للتحكم اليدوي.",
        boxDetected: "رصد جسم: تفعيل صمام الفرز الهيدروليكي."
      }
    },
    experience: {
      eyebrow: "الخبرات",
      heading: "الخط الزمني ",
      headingHighlight: "المهني",
      items: [
        {
          role: "مؤسس ومهندس رئيسي",
          company: "شركة كورتكس",
          period: "حالياً",
          description:
            "تأسيس شركة كورتكس المتخصصة في تصميم الأنظمة الذكية. قيادة تطوير نظام إدارة المرور الذكي الذي عُرض في المعارض الجامعية.",
        },
        {
          role: "مدير",
          company: "باور جروب",
          period: "حالياً",
          description:
            "إدارة فرق متعددة التخصصات والإشراف على خطوط تسليم المشاريع. التنسيق بين الفرق الهندسية وأصحاب المصلحة للحلول الصناعية.",
        },
        {
          role: "أخصائي PLC متقدم",
          company: "معهد دون بوسكو",
          period: "برنامج تدريبي",
          description:
            "تطوير منطق الأتمتة (SCL/STL) لخطوط إنتاج متعددة المحاور وتحسين لوحات HMI للمراقبة الفورية.",
        },
        {
          role: "متدرب تشخيص",
          company: "مانتراك (كاتربيلر)",
          period: "تدريب",
          description:
            "إجراء تشخيصات على مستوى الأجهزة لوحدات ECU الثقيلة عبر بيانات CAN-bus لضمان وقت التشغيل والصيانة التنبؤية.",
        },
        {
          role: "متدرب هندسة أنظمة",
          company: "مجموعة HA الاستشارية",
          period: "تدريب",
          description:
            "تطوير مخططات متوافقة مع IEC/NEC وأتمتة سير العمل التوثيقي مما زاد سرعة الإنتاج بنسبة 30%.",
        },
      ],
    },
    skills: {
      eyebrow: "القدرات",
      heading: "الحمولة ",
      headingHighlight: "التقنية",
      subtitle:
        "ترسانة مجربة تمتد عبر تصميم الأجهزة وتطوير الويب المتكامل والذكاء الاصطناعي.",
      categories: [
        { category: "الأجهزة" },
        { category: "البرمجيات" },
        { category: "الذكاء الاصطناعي" },
      ],
    },
    contact: {
      eyebrow: "ما التالي؟",
      heading: "لنبني شيئاً ",
      headingHighlight: "استثنائياً",
      description:
        "سواء كان تحدياً في الأتمتة الصناعية أو تكامل إنترنت الأشياء أو نظاماً متكاملاً — أنا مستعد لهندسة الحل.",
      cta: "تواصل معي",
      socials: [
        { label: "لينكدإن" },
        { label: "جيت هب" },
        { label: "البريد" },
        { label: "السيرة الذاتية" },
      ],
    },
    footer: {
      copyright: `© {new Date().getFullYear()} معاذ محمد الغمري. جميع الأنظمة تعمل.`,
      builtWith: "بُني بـ",
    },
    theme: { light: "فاتح", dark: "داكن" },
    lang: { switch: "English" },
  },
};
