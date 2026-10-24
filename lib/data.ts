export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  price?: number;
  duration?: string;
  deliverables?: string[];
}

export interface StatItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface PortfolioProject {
  id: string;
  number: string;
  title: string;
  category: 'Apartments' | 'Houses' | 'Commercial' | 'Sauna';
  area: string;
  description: string;
  location: string;
  terms: string;
  images: {
    url: string;
    alt: string;
    span?: string;
  }[];
  layoutReversed?: boolean;
}

export interface DesignPackage {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  duration: string;
  image: string;
  features: string[];
}

export interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
  category?: string;
}

export interface TestimonialItem {
  id: string;
  number: string;
  quote: string;
  author: string;
  role: string;
  project: string;
  location: string;
  rating: number;
  year: string;
  scope: string;
}

export const SITE_DATA = {
  brand: {
    name: 'FURNI.TURE',
    legalName: 'FURNI.TURE',
    registeredMark: '®',
    tagline: 'CREATING INTERIORS THAT INSPIRE',
    phone: '+923399445465',
    phoneRaw: '+923399445465',
    email: 'studio@furniture-design.com',
    address: 'Scandinavian Studio, Design District',
    heroCategories: ['APARTMENTS', 'HOUSES', 'ESTABLISHMENTS'],
    scriptAccent: 'interior design',
    copyrightNotice: 'DEVELOPED BY THE TEAM OF Ziilink AI',
    footerGuarantee: 'Be sure that FURNI.TURE will make your space a special place filled with beauty and comfort',
  },
  navigation: [
    { label: 'HOME', href: '/' },
    { label: 'SERVICES', href: '/services' },
    { label: 'ABOUT', href: '/about' },
    { label: 'PORTFOLIO', href: '/portfolio' },
    { label: 'CONTACT', href: '/contacts' },
  ] as NavLink[],
  hero: {
    title: 'FURNI.TURE',
    subtitleLine1: 'CREATING INTERIORS',
    subtitleLine2: 'THAT INSPIRE',
    ctaText: 'BOOK A CONSULTANT ↗',
    bgImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=85',
  },
  services: {
    kicker: 'DOING OUR JOB\nFROM THE BOTTOM\nOF OUR HEARTS',
    headingPart1: 'OUR',
    headingPart2: 'SERVICES',
    items: [
      {
        id: 'interior-design',
        number: '01',
        title: 'INTERIOR DESIGN',
        description:
          'We implement interior design for buildings of all sizes. With a competent interior design, even a small apartment can be significantly expanded, modernised and visually enlarged, giving it more usable space.',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
        alt: 'Warm beige bathroom with freestanding white tub and linen curtains',
        price: 850,
        duration: '3-4 Weeks',
        deliverables: [
          'Detailed CAD & 3D Spatial Layouts',
          'Moodboards & Nordic Material Palettes',
          'Full Lighting & Electrical Schematics',
          'Specification Sheet for Furniture & Hardware'
        ]
      },
      {
        id: 'turnkey-renovation',
        number: '02',
        title: 'TURNKEY RENOVATION',
        description:
          'A well-established system of managing all stages of work makes it possible to meet deadlines and complete the interior design without you. We visit the site, monitor the similarity between the design project and the actual situation, and control the correspondence to the colour scheme.',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
        alt: 'Minimalist living room with beige sectional sofa and wooden coffee table',
        price: 1450,
        duration: '6-8 Weeks',
        deliverables: [
          'On-site Engineering & Architectural Supervision',
          'Contractor Coordination & Milestone Audits',
          'Strict Timeline & Budget Management',
          'Key Handover with Complete Interior Staging'
        ]
      },
      {
        id: 'selection-of-materials',
        number: '03',
        title: 'SELECTION OF MATERIALS',
        description:
          'Choosing materials and interior items together with a specialist is a comprehensive and cost-effective service for the client. It helps you to purchase stylistically justified and functional objects that will not stand out from the overall picture of your home.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
        alt: 'Designer selecting fabric and material swatches over architectural floor plans',
        price: 490,
        duration: '1-2 Weeks',
        deliverables: [
          'Direct Showroom Procurement Access',
          'Tactile Fabric, Stone & Wood Samples',
          'Cost Optimization & Supplier Discounts',
          'Custom Cabinetry & Joinery Detailing'
        ]
      },
    ] as ServiceItem[],
    ctaText: 'BOOK A CONSULTANT ↗',
  },
  designPackages: [
    {
      id: 'pkg-consult-2hr',
      title: 'Studio Interior Consultation (2 Hours)',
      category: 'Consultation',
      price: 250,
      description: 'In-depth one-on-one session with our senior Scandinavian interior architect discussing spatial flow, palette selection, lighting, and layout optimization.',
      duration: '2 Hours',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=85',
      features: [
        'Dedicated senior design architect',
        'Floor plan evaluation & space planning ideas',
        'Scandinavian color & texture palette recommendations',
        'Written summary report with actionable milestones'
      ]
    },
    {
      id: 'pkg-full-interior',
      title: 'Full Architectural Interior Blueprint',
      category: 'Design Package',
      price: 1200,
      description: 'Comprehensive turn-key design project for a single residential or boutique space including photorealistic 3D renders and technical drawings.',
      duration: '4 Weeks',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85',
      features: [
        'Complete measurement plan and partitions layout',
        'Photorealistic 3D visualizations from 4 angles',
        'Lighting, sockets, switches and plumbing schematics',
        'Detailed specification list of all furniture and materials'
      ]
    },
    {
      id: 'pkg-sauna-wellness',
      title: 'Nordic Sauna & Private Wellness Concept',
      category: 'Specialty Architecture',
      price: 950,
      description: 'Specialist architectural design for Finnish cedar saunas, steam rooms, and minimalist spa bathrooms with bespoke temperature & ventilation engineering.',
      duration: '3 Weeks',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
      features: [
        'Thermal insulation & ergonomic timber bench design',
        'Custom ambient lighting placement',
        'Heater selection & air circulation diagram',
        'Natural stone and slate tile specification'
      ]
    },
    {
      id: 'pkg-materials-box',
      title: 'Curated Scandinavian Material Sample Box',
      category: 'Curated Swatches',
      price: 180,
      description: 'A physical boxed collection of hand-selected Scandinavian finishes: brushed oak, natural linen, travertine, lime plaster, and brass hardware.',
      duration: '3-5 Days Delivery',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=85',
      features: [
        '12 premium tactile samples (woods, linens, limewash, stone)',
        'Detailed guide to lighting reactions per material',
        'Direct procurement codes for wholesale pricing',
        '30-minute virtual consultation with a materials expert'
      ]
    }
  ] as DesignPackage[],
  about: {
    kicker: 'LEARN MORE\nABOUT THE\nCOMPANY',
    headingPart1: 'ABOUT',
    headingPart2: 'COMPANY',
    verticalWordmark: 'FURNI.TURE',
    philosophy: 'Founded on the principles of Scandinavian warmth and functional minimalism, FURNI.TURE creates spaces that breathe. We strip away the unnecessary to reveal serene proportions, honest materials, and natural light that transforms everyday living into an inspiring ritual.',
    values: [
      {
        title: 'HONEST MATERIALS',
        description: 'We prioritize solid oak, raw linen, travertine, brushed brass, and natural plaster that age with dignity.'
      },
      {
        title: 'SCULPTURAL SIMPLICITY',
        description: 'Every curve, junction, and joinery detail serves a quiet purpose without visual noise.'
      },
      {
        title: 'WARM SCANDINAVIAN LIGHT',
        description: 'Space is shaped by light. We orchestrate architectural reflections and warm ambient illumination.'
      }
    ],
    team: [
      {
        name: 'Astrid Lindholm',
        role: 'Principal Interior Architect',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85',
        bio: '14 years shaping minimal residential residences across Copenhagen and Northern Europe.'
      },
      {
        name: 'Lukas Meyer',
        role: 'Head of Architectural Joinery',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85',
        bio: 'Master craftsman specializing in bespoke timber furniture and seamless concealed storage.'
      },
      {
        name: 'Elena Rostova',
        role: 'Senior Lighting & Materials Designer',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85',
        bio: 'Expert in biological circadian lighting, textured lime plaster, and Nordic stone curation.'
      }
    ],
    stats: [
      {
        id: 'projects',
        number: '45+',
        title: 'DESIGN PROJECTS',
        description:
          'prove that owners of large commercial facilities, owners of houses and apartments are willing to work with us. We are happy to provide you with samples of real projects.',
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=85',
        alt: 'Cozy Scandinavian window bench with shelves, pillows and woven pouf',
      },
      {
        id: 'employees',
        number: '20+',
        title: 'EMPLOYEES',
        description:
          'are always ready to answer your questions and save you time spent on repairs and searching for interior design references.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=85',
        alt: 'Interior architect working on laptop at solid oak table',
      },
      {
        id: 'contractors',
        number: '100+',
        title: 'CONTRACTORS',
        description:
          'guarantee on-time completion of assigned tasks, personal support and thorough control of interior design at all stages.',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85',
        alt: 'Designers and contractors reviewing blueprints and clipboard specifications on site',
      },
    ] as StatItem[],
    faqs: [
      {
        id: 'faq-turnkey',
        number: '01',
        question: 'HOW DOES THE TURNKEY ARCHITECTURAL SUPERVISION PROCESS WORK?',
        answer: 'Our turnkey supervision bridges architectural blueprints and real-world construction. We conduct regular site visits, verify contractor adherence to millimeter tolerances, coordinate MEP (mechanical, electrical, plumbing) installations, and inspect bespoke joinery mockups before final fabrication.',
        category: 'Process'
      },
      {
        id: 'faq-remote',
        number: '02',
        question: 'CAN FURNI.TURE MANAGE PROJECTS REMOTELY OUTSIDE THE REGION?',
        answer: 'Yes. Over 40% of our residential commissions are cross-border. We utilize high-fidelity 3D digital twins, complete material specification schedules with European supplier SKUs, and weekly video walk-throughs with your local licensed general contractor to guarantee flawless execution.',
        category: 'Logistics'
      },
      {
        id: 'faq-consultation',
        number: '03',
        question: 'WHAT IS INCLUDED IN THE INITIAL ARCHITECTURAL CONSULTATION?',
        answer: 'The consultation is a focused, high-impact review of your space. We analyze current floor plans, identify load-bearing options, study natural daylight orientation, suggest bespoke layout alternatives, and outline a realistic budget timeline tailored to Scandinavian finish standards.',
        category: 'Services'
      },
      {
        id: 'faq-materials',
        number: '04',
        question: 'WHAT MATERIALS DEFINE YOUR SCANDINAVIAN DESIGN PHILOSOPHY?',
        answer: 'We curate tactile, enduring, and honest materials that age gracefully: solid white oak, honed travertine, mineral lime plasters, unbleached organic linen, and warm brushed metals. We eschew faux textures and synthetic imitations.',
        category: 'Design'
      },
      {
        id: 'faq-timeline',
        number: '05',
        question: 'WHAT ARE THE TYPICAL PROJECT TIMELINES FROM CONCEPT TO COMPLETION?',
        answer: 'A comprehensive architectural design package generally spans 4 to 8 weeks depending on square footage. On-site turnkey fit-outs and fabrication typically run 45 to 120 days. Detailed milestone schedules are committed to contractually before work begins.',
        category: 'Timeline'
      },
      {
        id: 'faq-sauna',
        number: '06',
        question: 'HOW DO YOU APPROACH CUSTOM SAUNA AND WELLNESS SPACE ENGINEERING?',
        answer: 'Our bespoke saunas combine authentic Nordic thermowood, concealed moisture-proof ventilation, hidden linear drainage, and certified electric or wood stoves. We orchestrate low-glare 2200K indirect lighting to cultivate an immersive sanctuary.',
        category: 'Wellness'
      }
    ] as FAQItem[],
  },
  portfolio: {
    headingPart1: 'OUR',
    headingPart2: 'PORTFOLIO',
    projects: [
      {
        id: 'sauna-design',
        number: '01',
        title: 'SAUNA DESIGN',
        category: 'Sauna',
        area: '38 m²',
        description:
          'Throughout this entire construction process, we paid special attention to every detail to create the perfect environment. From the selection of the highest quality materials to the precise installation of each element. We intended the sauna to be not only functional, but also visually appealing.',
        location: 'KYIV',
        terms: '30 DAYS',
        layoutReversed: false,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85',
            alt: 'Warm wooden sauna with cedar benches and soft ambient light',
            span: 'col-span-2 row-span-2',
          },
          {
            url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=85',
            alt: 'Dark stone tile bathroom with circular illuminated mirror',
            span: 'col-span-1 row-span-1',
          },
          {
            url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=85',
            alt: 'Frosted glass shower door with slate textured tiles',
            span: 'col-span-1 row-span-1',
          },
          {
            url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=85',
            alt: 'Timber sauna wall with wooden bucket and natural grain',
            span: 'col-span-1 row-span-1',
          },
          {
            url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=900&q=85',
            alt: 'Minimalist stone vanity with white washbasin',
            span: 'col-span-1 row-span-1',
          },
        ],
      },
      {
        id: 'apartment-design',
        number: '02',
        title: 'APARTMENT DESIGN',
        category: 'Apartments',
        area: '124 m²',
        description:
          'This apartment design represents modern minimalism, using neutral shades and clean lines to create a space full of light and harmony. Furniture of simple shapes and functional elements emphasise simplicity and functionality while providing comfort. The customer was satisfied.',
        location: 'MYKOLAIV',
        terms: '60 DAYS',
        layoutReversed: true,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85',
            alt: 'Beige living room with fluffy pampas grass and modern sofa',
            span: 'col-span-1 row-span-1',
          },
          {
            url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=85',
            alt: 'Dining area with woven rattan pendant lamps and linen curtains',
            span: 'col-span-1 row-span-1',
          },
          {
            url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=85',
            alt: 'Serene bedroom with woven jute rug and tree-stump bedside nightstand',
            span: 'col-span-2 row-span-2',
          },
          {
            url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=85',
            alt: 'Minimalist entryway with wooden sliding door and soft light',
            span: 'col-span-1 row-span-1',
          },
          {
            url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85',
            alt: 'Warm lounge armchairs and light wood flooring',
            span: 'col-span-1 row-span-1',
          },
        ],
      },
      {
        id: 'kitchen-design',
        number: '03',
        title: 'KITCHEN DESIGN',
        category: 'Apartments',
        area: '42 m²',
        description:
          'The kitchen design combines modern aesthetics with functionality, offering a comfortable space for cooking and gatherings. The minimalist approach to the colour palette and materials creates a modern design. The integration of innovative technologies emphasises modernity.',
        location: 'ODESA',
        terms: '45 DAYS',
        layoutReversed: false,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85',
            alt: 'White and wood kitchen with minimalist ring chandelier',
            span: 'col-span-2 row-span-2',
          },
          {
            url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=900&q=85',
            alt: 'Seamless marble countertop and discreet extractor hood',
            span: 'col-span-1 row-span-1',
          },
          {
            url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=900&q=85',
            alt: 'Integrated appliances and matte oak cabinets',
            span: 'col-span-1 row-span-1',
          },
          {
            url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=900&q=85',
            alt: 'Clean kitchen counter with porcelain cups and filtered natural light',
            span: 'col-span-1 row-span-1',
          },
          {
            url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=900&q=85',
            alt: 'Round dining table with upholstered beige chairs next to kitchen',
            span: 'col-span-1 row-span-1',
          },
        ],
      },
      {
        id: 'nordic-villa',
        number: '04',
        title: 'NORDIC LAKE VILLA',
        category: 'Houses',
        area: '280 m²',
        description:
          'Floor-to-ceiling glass pavilions embedded in pine forest. Exposed Douglas fir beams, heated terrazzo slabs, and a floating central fireplace providing an anchor of comfort.',
        location: 'STOCKHOLM ARCHIPELAGO',
        terms: '90 DAYS',
        layoutReversed: true,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85',
            alt: 'Modern glass and cedar villa exterior at twilight',
            span: 'col-span-2 row-span-2',
          },
          {
            url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
            alt: 'Double height living room with floating fireplace',
            span: 'col-span-1 row-span-1',
          },
          {
            url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85',
            alt: 'Spacious master bathroom with forest view',
            span: 'col-span-1 row-span-1',
          },
          {
            url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
            alt: 'Warm Scandinavian minimalist kitchen dining pavilion with Douglas fir beams',
          },
          {
            url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=85',
            alt: 'Nordic timber villa patio deck overlooking pine trees',
          },
        ],
      },
    ] as PortfolioProject[],
  },
  testimonials: [
    {
      id: 'test-1',
      number: '01',
      quote: 'FURNI.TURE transformed our raw concrete penthouse into a serene Nordic sanctuary. The spatial restraint, honest oak millwork, and warm diffused lighting made it feel like an escape from the city rush.',
      author: 'Marko & Sophia Lindqvist',
      role: 'Private Residence Owners',
      project: 'Nordic Lake Villa & Penthouse',
      location: 'Stockholm & Kyiv',
      rating: 5,
      year: '2024',
      scope: 'Full Turnkey Architecture & Bespoke Joinery',
    },
    {
      id: 'test-2',
      number: '02',
      quote: 'The precision of their technical CAD drawings and direct procurement saved us over two months during construction. The custom sauna is easily the highlight of our home.',
      author: 'Oleksandr Petrenko',
      role: 'Tech Founder & Private Client',
      project: 'Modern Minimalist Residence',
      location: 'Odesa Coast',
      rating: 5,
      year: '2024',
      scope: 'Interior Architecture & Wellness Suite',
    },
    {
      id: 'test-3',
      number: '03',
      quote: 'Working across borders can be stressful, but the FURNI.TURE team orchestrated every contractor check-in with clockwork discipline. Their aesthetic judgment is unmatched.',
      author: 'Camilla Dahl',
      role: 'Creative Director',
      project: 'Boutique Creative Atelier',
      location: 'Copenhagen',
      rating: 5,
      year: '2023',
      scope: 'Commercial Studio Concept & Lighting Plan',
    },
    {
      id: 'test-4',
      number: '04',
      quote: 'Every corner feels considered and restful. No clutter, no unnecessary ornamentation—just pure Scandinavian light and warm tactile materials that improve with every passing month.',
      author: 'Viktor & Olena Morozov',
      role: 'Art Collectors',
      project: 'Riverfront Apartment',
      location: 'Dnipro Heights',
      rating: 5,
      year: '2024',
      scope: 'Residential Renovation & Custom Furniture',
    },
  ] as TestimonialItem[],
  footer: {
    kicker: 'CONTACT US\nTO DISCUSS YOUR\nUPCOMING PROJECT',
    headingLine1: 'CREATING',
    headingLine2: 'A COZY',
    headingLine3: 'INTERIOR',
    phone: '+923399445465',
    phoneRaw: '+923399445465',
    ctaText: 'CONTACT US ↗',
    bgImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=2200&q=85',
  },
};
