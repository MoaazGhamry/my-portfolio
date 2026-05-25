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
    items: { title: string; description: string }[];
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
        },
        {
          title: "Gaming Hub PS System",
          description:
            "Developed a high-value cashier management application featuring offline-first functionality via Firebase, integrating three complex subsystems for seamless operation.",
        },
        {
          title: "2-Way Intelligent Traffic Management",
          description:
            "Designed a complex logic-based traffic control system utilizing NE555 timers and digital logic gates, engineered completely under the Cortex Company banner.",
        },
        {
          title: "Industrial Data Ecosystem",
          description:
            "Centralized hub for mechatronic resource allocations. Automated legacy Excel data ingestion into PostgreSQL maintaining 100% data integrity.",
        },
      ],
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
        },
        {
          title: "نظام Gaming Hub PS",
          description:
            "تطوير تطبيق إدارة كاشير عالي القيمة مع وظائف العمل بدون اتصال عبر Firebase، مع دمج ثلاثة أنظمة فرعية معقدة.",
        },
        {
          title: "إدارة المرور الذكية ثنائية الاتجاه",
          description:
            "تصميم نظام تحكم مروري معقد قائم على المنطق باستخدام مؤقتات NE555 وبوابات المنطق الرقمي، تم تطويره بالكامل تحت راية شركة كورتكس.",
        },
        {
          title: "منظومة البيانات الصناعية",
          description:
            "مركز مركزي لتخصيص الموارد الميكاترونية. أتمتة استيعاب بيانات Excel القديمة إلى PostgreSQL مع الحفاظ على سلامة البيانات بنسبة 100%.",
        },
      ],
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
      copyright: `© ${new Date().getFullYear()} معاذ محمد الغمري. جميع الأنظمة تعمل.`,
      builtWith: "بُني بـ",
    },
    theme: { light: "فاتح", dark: "داكن" },
    lang: { switch: "English" },
  },
};
