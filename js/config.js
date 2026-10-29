/**
 * ==============================================================================
 * Ironwood Athletic Club - Single Source of Truth Configuration
 * ==============================================================================
 * All brand specifics, theme tokens, hours, content arrays, feature toggles,
 * and form endpoints are defined here.
 * Reskinning the website for a new gym client takes only minutes by modifying this file.
 */

window.SITE_CONFIG = {
  // ----------------------------------------------------------------------------
  // Brand Details
  // ----------------------------------------------------------------------------
  brand: {
    name: "Ironwood Athletic Club",
    shortName: "Ironwood",
    tagline: "Strength, conditioning, classes and recovery under one roof.",
    city: "Melbourne",
    state: "VIC",
    country: "Australia",
    fullAddress: "123 Sample Street, Melbourne VIC 3000",
    email: "hello@ironwoodathletic.com.au",
    phone: {
      display: "+61 400 000 000",
      tel: "+61400000000"
    },
    whatsapp: {
      number: "61400000000", // International digits only, no + or spaces
      prefilledMessage: "Hi Ironwood Athletic Club, I would like to book a free trial and enquire about membership options."
    },
    // Social links: Any empty string is automatically omitted from the UI
    social: {
      instagram: "https://instagram.com/ironwoodathletic",
      facebook: "https://facebook.com/ironwoodathletic",
      youtube: ""
    }
  },

  // ----------------------------------------------------------------------------
  // Theme Tokens (Injected as CSS custom properties on documentElement)
  // ----------------------------------------------------------------------------
  theme: {
    bg: "#0A0A0B",
    surface: "#141416",
    surfaceRaised: "#1B1B1E",
    border: "#26262A",
    text: "#F4F1EA",
    textMuted: "#9A968D",
    accent: "#FF5A1F",       // Ember Orange
    accentGlow: "#FF8A4C",
    error: "#FF6B6B",
    success: "#4ADE80",
    fontHeadline: "'Barlow Condensed', sans-serif",
    fontBody: "'Inter', sans-serif"
  },

  // ----------------------------------------------------------------------------
  // Operating Hours
  // ----------------------------------------------------------------------------
  hours: [
    { days: "Monday – Friday", time: "5:00am – 10:00pm", daysNumeric: [1, 2, 3, 4, 5] },
    { days: "Saturday – Sunday", time: "7:00am – 6:00pm", daysNumeric: [0, 6] }
  ],

  // ----------------------------------------------------------------------------
  // Hero Configuration ('The Three Worlds')
  // ----------------------------------------------------------------------------
  hero: {
    headlineLines: ["STRONGER", "STARTS HERE"],
    supportingLine: "Strength, conditioning, classes and recovery under one roof in Melbourne.",
    scenes: [
      {
        id: "strength",
        image: "assets/images/hero-1-strength.jpg",
        label: "Strength & Power",
        alt: "Athlete lifting barbell under dramatic moody gym lighting",
        mobileFocal: "50% 30%",
        desktopFocal: "40% 40%"
      },
      {
        id: "training",
        image: "assets/images/hero-2-training.jpg",
        label: "Athletic Conditioning",
        alt: "High energy battle ropes and athletic conditioning workout",
        mobileFocal: "50% 40%",
        desktopFocal: "50% 50%"
      },
      {
        id: "recovery",
        image: "assets/images/hero-3-recovery.jpg",
        label: "Recovery & Longevity",
        alt: "Calm warm-lit recovery suite and post-workout mobility session",
        mobileFocal: "50% 40%",
        desktopFocal: "60% 50%"
      }
    ],
    primaryCta: "Book a Free Trial",
    secondaryCta: "WhatsApp Us"
  },

  // ----------------------------------------------------------------------------
  // Video Band
  // ----------------------------------------------------------------------------
  video: {
    file: "assets/video/gym-reel.mp4",
    poster: "assets/images/video-poster.jpg",
    overlayLine: "Where effort becomes routine."
  },

  // ----------------------------------------------------------------------------
  // Intro Section ("The Club")
  // ----------------------------------------------------------------------------
  intro: {
    eyebrow: "The Club",
    heading: "One club. Every way to train.",
    paragraphs: [
      "Built for those who take their physical output seriously. Ironwood Athletic Club brings together heavy iron, calibrated conditioning rigs, structured group sessions and contrast therapy under a single roof.",
      "No gimmicks, no crowded waits for platforms. Just deliberate architecture, world-standard equipment, and an atmosphere designed to push your personal threshold every day."
    ],
    photo: "assets/images/intro-floor.jpg",
    photoAlt: "Wide dramatic interior of Ironwood Athletic Club main gym floor",
    highlights: [
      {
        title: "Strength",
        desc: "Olympic platforms, calibrated plates, and precision racks."
      },
      {
        title: "Cardio",
        desc: "Assault runners, curved treadmills, and 25m sprint turf."
      },
      {
        title: "Classes",
        desc: "Coach-led athletic conditioning and high-intensity squads."
      },
      {
        title: "Recovery",
        desc: "Full-spectrum infrared saunas and cold plunge immersion."
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // Programs (5 offerings)
  // ----------------------------------------------------------------------------
  programs: [
    {
      id: "strength-muscle",
      title: "Strength & Muscle",
      desc: "Structured barbell training, progressive overload cycles, and precision compound lifting.",
      chips: ["Barbell Mechanics", "Hypertrophy", "Form Coaching"],
      image: "assets/images/hero-1-strength.jpg",
      alt: "Athlete performing deadlift in strength zone"
    },
    {
      id: "cardio-conditioning",
      title: "Cardio & Conditioning",
      desc: "High-output metabolic sessions combining sprint turf, ergs, and anaerobic pacing drills.",
      chips: ["VO2 Max", "Functional Turf", "Metabolic Conditioning"],
      image: "assets/images/hero-2-training.jpg",
      alt: "Functional cardio sprint and conditioning training"
    },
    {
      id: "group-classes",
      title: "Group Classes",
      desc: "Squad-driven intensity where elite programming meets electric community accountability.",
      chips: ["Daily Programming", "All Levels", "Team Environment"],
      image: "assets/images/program-classes.jpg",
      alt: "High-intensity group fitness session"
    },
    {
      id: "personal-training",
      title: "Personal Training",
      desc: "One-on-one tailored periodisation, biomechanics screening, and dedicated accountability.",
      chips: ["Biomechanical Screen", "1-on-1 Focus", "Custom Nutrition"],
      image: "assets/images/program-personal.jpg",
      alt: "Personal trainer coaching client with barbell"
    },
    {
      id: "recovery-wellness",
      title: "Recovery & Wellness",
      desc: "Optimise central nervous system recovery through infrared thermal therapy and cold immersion.",
      chips: ["Infrared Sauna", "Cold Plunge", "Mobility Drills"],
      image: "assets/images/hero-3-recovery.jpg",
      alt: "Athletic recovery and sauna suite"
    }
  ],

  // ----------------------------------------------------------------------------
  // Facilities (Bento Grid) & Amenities
  // ----------------------------------------------------------------------------
  facilities: {
    tiles: [
      {
        id: "strength-floor",
        title: "Main Strength Arena",
        desc: "Eleiko competition bars, cast iron calibrated plates, and dedicated Olympic lifting stations.",
        gridClass: "bento-2x2",
        image: "assets/images/facility-weights.jpg",
        alt: "Olympic lifting platforms and heavy dumbbell racks"
      },
      {
        id: "cardio-zone",
        title: "Conditioning Zone",
        desc: "Curved Woodway treadmills, Concept2 SkiErgs, assault bikes, and a 25-metre sprint track.",
        gridClass: "bento-wide",
        image: "assets/images/facility-cardio.jpg",
        alt: "Conditioning zone with ergometers and sprint turf"
      },
      {
        id: "recovery-lounge",
        title: "Thermal Recovery Suite",
        desc: "Full-spectrum infrared saunas and commercial cold plunge tubs chilled to 4°C.",
        gridClass: "bento-tall",
        image: "assets/images/facility-wellness.jpg",
        alt: "Sauna and cold contrast plunge therapy suite"
      },
      {
        id: "free-weight-area",
        title: "Free-Weight Sanctuary",
        desc: "Dumbbells up to 65kg, adjustable heavy-duty benches, and custom selectorised cable stacks.",
        gridClass: "bento-small",
        image: "assets/images/intro-floor.jpg",
        alt: "Spacious free-weight dumbbell area"
      }
    ],
    amenities: [
      { icon: "barbell", label: "Eleiko Competition Rigs" },
      { icon: "turf", label: "25m Sprint Turf" },
      { icon: "sauna", label: "Infrared Saunas & Cold Plunges" },
      { icon: "shower", label: "Luxury Showers & Grooming" },
      { icon: "towel", label: "Complimentary Fresh Towels" },
      { icon: "locker", label: "Keyless Digital Lockers" },
      { icon: "water", label: "Filtered Chilled Water Station" },
      { icon: "wifi", label: "High-Speed Private Wi-Fi" }
    ]
  },

  // ----------------------------------------------------------------------------
  // Trainers (Sample Profiles)
  // ----------------------------------------------------------------------------
  trainers: [
    {
      id: "marcus",
      name: "Marcus Vance",
      role: "Head of Strength & Olympic Lifting",
      specialty: "Barbell Biomechanics & Power",
      bio: "12 years coaching state and national lifters. Focuses on joint alignment, nervous system readiness, and technical mastery.",
      image: "assets/images/trainer-1.jpg",
      alt: "Head Coach Marcus Vance"
    },
    {
      id: "elena",
      name: "Elena Rostova",
      role: "Lead Conditioning & Athletic Engine",
      specialty: "High-Output Metabolic Capacity",
      bio: "Former collegiate track athlete with an MSc in Exercise Physiology. Designs our high-tempo group conditioning squads.",
      image: "assets/images/trainer-2.jpg",
      alt: "Lead Conditioning Coach Elena Rostova"
    },
    {
      id: "david",
      name: "David Thorne",
      role: "Mobility & Longevity Director",
      specialty: "Contrast Therapy & Soft Tissue Health",
      bio: "Specialises in injury prevention, contrast recovery protocols, and structural resilience for life-long physical durability.",
      image: "assets/images/trainer-3.jpg",
      alt: "Mobility Director David Thorne"
    }
  ],

  // ----------------------------------------------------------------------------
  // Membership Plans
  // ----------------------------------------------------------------------------
  plans: [
    {
      id: "starter",
      name: "Starter",
      desc: "For dedicated independent trainees seeking full access to world-class strength equipment.",
      weeklyPrice: 29,
      annualPrice: 1290,
      popular: false,
      features: [
        "Full gym floor & free-weight access",
        "Complimentary towel service",
        "Keyless digital locker access",
        "1 Initial movement & fitness screening",
        "Standard hours (5:00am – 10:00pm Mon–Fri)"
      ]
    },
    {
      id: "performance",
      name: "Performance",
      desc: "Our most comprehensive membership combining unlimited gym access, all classes, and recovery.",
      weeklyPrice: 45,
      annualPrice: 1990,
      popular: true,
      badge: "Most Popular",
      features: [
        "24/7 keyless club access",
        "Unlimited group conditioning classes",
        "Unlimited infrared sauna & cold plunge access",
        "Quarterly coach performance review",
        "2 Guest passes per month",
        "Priority locker & shower amenities"
      ]
    },
    {
      id: "elite",
      name: "Elite",
      desc: "The ultimate bespoke training package with dedicated personal coaching and private programming.",
      weeklyPrice: 65,
      annualPrice: 2890,
      popular: false,
      features: [
        "All Performance tier inclusions",
        "2 Monthly 1-on-1 personal coaching sessions",
        "Custom periodised programming in club app",
        "Tailored sports nutrition consultation",
        "Permanent personal locker with laundry service",
        "Priority booking for workshops and recovery"
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // Timetable (Mon - Sun)
  // ----------------------------------------------------------------------------
  timetable: {
    categories: [
      { id: "all", label: "All Sessions" },
      { id: "strength", label: "Strength" },
      { id: "cardio", label: "Cardio" },
      { id: "classes", label: "Classes" },
      { id: "recovery", label: "Recovery" }
    ],
    days: [
      {
        day: "Monday",
        short: "Mon",
        sessions: [
          { time: "06:00 – 07:00", title: "Heavy Barbell Fundamentals", category: "strength", trainer: "Marcus Vance", level: "All Levels" },
          { time: "07:15 – 08:00", title: "Metabolic Engine 45", category: "cardio", trainer: "Elena Rostova", level: "Intermediate" },
          { time: "12:15 – 13:00", title: "Lunch Hour Athletic Squad", category: "classes", trainer: "Elena Rostova", level: "All Levels" },
          { time: "17:30 – 18:30", title: "Olympic Snatch & Clean Workshop", category: "strength", trainer: "Marcus Vance", level: "Advanced" },
          { time: "18:45 – 19:30", title: "Guided Contrast & Breathwork", category: "recovery", trainer: "David Thorne", level: "All Levels" }
        ]
      },
      {
        day: "Tuesday",
        short: "Tue",
        sessions: [
          { time: "06:15 – 07:00", title: "Functional Sprint & Turf Prowler", category: "cardio", trainer: "Elena Rostova", level: "All Levels" },
          { time: "07:30 – 08:30", title: "Hypertrophy Upper Body", category: "strength", trainer: "Marcus Vance", level: "All Levels" },
          { time: "12:30 – 13:15", title: "Mobility & Joint Decompression", category: "recovery", trainer: "David Thorne", level: "All Levels" },
          { time: "17:45 – 18:45", title: "Conditioning Crucible", category: "classes", trainer: "Elena Rostova", level: "Intermediate" },
          { time: "19:00 – 20:00", title: "Open Platform Coaching", category: "strength", trainer: "Marcus Vance", level: "All Levels" }
        ]
      },
      {
        day: "Wednesday",
        short: "Wed",
        sessions: [
          { time: "06:00 – 07:00", title: "Posterior Chain & Deadlift Lab", category: "strength", trainer: "Marcus Vance", level: "All Levels" },
          { time: "07:15 – 08:00", title: "Aerobic Capacity Ergs", category: "cardio", trainer: "Elena Rostova", level: "Intermediate" },
          { time: "12:15 – 13:00", title: "Midday Athletic Squad", category: "classes", trainer: "Elena Rostova", level: "All Levels" },
          { time: "17:30 – 18:30", title: "Strength & Power Output", category: "strength", trainer: "Marcus Vance", level: "Intermediate" },
          { time: "18:45 – 19:30", title: "Cold Plunge Immersion & Mobility", category: "recovery", trainer: "David Thorne", level: "All Levels" }
        ]
      },
      {
        day: "Thursday",
        short: "Thu",
        sessions: [
          { time: "06:15 – 07:00", title: "High-Tempo Engine Circuits", category: "cardio", trainer: "Elena Rostova", level: "All Levels" },
          { time: "07:30 – 08:30", title: "Squat Mechanics & Depth Clinic", category: "strength", trainer: "Marcus Vance", level: "All Levels" },
          { time: "12:30 – 13:15", title: "Active Recovery Protocols", category: "recovery", trainer: "David Thorne", level: "All Levels" },
          { time: "17:45 – 18:45", title: "Squad Conditioning", category: "classes", trainer: "Elena Rostova", level: "Intermediate" },
          { time: "19:00 – 20:00", title: "Barbell Technique Drop-In", category: "strength", trainer: "Marcus Vance", level: "All Levels" }
        ]
      },
      {
        day: "Friday",
        short: "Fri",
        sessions: [
          { time: "06:00 – 07:00", title: "Full Body Barbell Complex", category: "strength", trainer: "Marcus Vance", level: "All Levels" },
          { time: "07:15 – 08:00", title: "Friday Sprint Interval Squad", category: "cardio", trainer: "Elena Rostova", level: "Advanced" },
          { time: "12:15 – 13:00", title: "Functional Core & Carry", category: "classes", trainer: "Elena Rostova", level: "All Levels" },
          { time: "17:00 – 18:00", title: "Friday Club Lift & Music", category: "strength", trainer: "Marcus Vance", level: "All Levels" },
          { time: "18:15 – 19:15", title: "Weekend Prep Contrast Sauna", category: "recovery", trainer: "David Thorne", level: "All Levels" }
        ]
      },
      {
        day: "Saturday",
        short: "Sat",
        sessions: [
          { time: "08:00 – 09:15", title: "Saturday Strongman & Sandbag Conditioning", category: "classes", trainer: "Marcus Vance", level: "Intermediate" },
          { time: "09:30 – 10:30", title: "Endurance Engine 60", category: "cardio", trainer: "Elena Rostova", level: "All Levels" },
          { time: "11:00 – 12:00", title: "Mobility Masterclass & Spine Health", category: "recovery", trainer: "David Thorne", level: "All Levels" },
          { time: "14:00 – 15:30", title: "Open Lifting Session", category: "strength", trainer: "Floor Coach", level: "All Levels" }
        ]
      },
      {
        day: "Sunday",
        short: "Sun",
        sessions: [
          { time: "08:30 – 09:30", title: "Sunday Recovery & Contrast Bath", category: "recovery", trainer: "David Thorne", level: "All Levels" },
          { time: "10:00 – 11:00", title: "Low-Impact Aerobic Flush", category: "cardio", trainer: "Elena Rostova", level: "All Levels" },
          { time: "11:30 – 13:00", title: "Open Gym Floor & Technique Clinic", category: "strength", trainer: "Marcus Vance", level: "All Levels" }
        ]
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // Gallery (8 Items reusing photos)
  // ----------------------------------------------------------------------------
  gallery: [
    {
      image: "assets/images/hero-1-strength.jpg",
      title: "Main Barbell Floor",
      category: "Strength",
      alt: "Barbell training on competition platform"
    },
    {
      image: "assets/images/hero-2-training.jpg",
      title: "Functional Turf & Ergometers",
      category: "Conditioning",
      alt: "High output athletic conditioning"
    },
    {
      image: "assets/images/hero-3-recovery.jpg",
      title: "Sauna & Cold Plunge Suite",
      category: "Recovery",
      alt: "Infrared sauna and wellness therapy zone"
    },
    {
      image: "assets/images/intro-floor.jpg",
      title: "Free-Weight & Cable Arena",
      category: "Facility",
      alt: "Gym floor with precision dumbbells and benches"
    },
    {
      image: "assets/images/program-classes.jpg",
      title: "Squad Conditioning Squads",
      category: "Classes",
      alt: "Coached high intensity group class"
    },
    {
      image: "assets/images/program-personal.jpg",
      title: "1-on-1 Biomechanics Coaching",
      category: "Coaching",
      alt: "Personal trainer assessing movement mechanics"
    },
    {
      image: "assets/images/facility-cardio.jpg",
      title: "Endurance & SkiErg Stations",
      category: "Cardio",
      alt: "Cardio conditioning equipment row"
    },
    {
      image: "assets/images/facility-wellness.jpg",
      title: "Thermal Contrast Chamber",
      category: "Recovery",
      alt: "Relaxing wellness contrast bath area"
    }
  ],

  // ----------------------------------------------------------------------------
  // Testimonials (Sample Reviews - No factual awards or claims)
  // ----------------------------------------------------------------------------
  testimonials: [
    {
      name: "Liam K.",
      role: "Member since 2024",
      text: "Ironwood strikes the rare balance between an uncompromising lifting space and an immaculate, welcoming club. The recovery suite alone transformed my training week.",
      rating: 5
    },
    {
      name: "Sarah T.",
      role: "Member since 2023",
      text: "The group conditioning squads are coached with actual technical standards, not just mindless exhaustion. Outstanding culture, elite rigs, and zero ego.",
      rating: 5
    },
    {
      name: "James M.",
      role: "Member since 2024",
      text: "Switching here was the best decision for my training longevity. Pristine equipment, no fighting over squat racks, and the cold plunge after heavy deadlifts is game changing.",
      rating: 5
    }
  ],

  // ----------------------------------------------------------------------------
  // FAQs (6 General Questions with sample answers)
  // ----------------------------------------------------------------------------
  faqs: [
    {
      q: "How does the free trial work?",
      a: "Submit the Free Trial form on this page or send us a WhatsApp message. We will generate your guest pass, arrange a brief orientation of the club, and let you complete your session with full access to all training floors."
    },
    {
      q: "What are your club operating hours?",
      a: "Our standard staffed hours are Monday to Friday from 5:00am to 10:00pm, and Saturday to Sunday from 7:00am to 6:00pm. Members with Performance and Elite access receive extended keyless entry privileges."
    },
    {
      q: "What should I bring for my first session?",
      a: "Please bring clean athletic training shoes, comfortable gym attire, and a photo ID for your initial visit. We provide fresh chilled filtered water, clean workout towels, and secure digital lockers."
    },
    {
      q: "Are group conditioning classes included in memberships?",
      a: "Yes. Unlimited daily group conditioning and squad sessions are fully included in our Performance and Elite membership packages. Starter tier members can drop in via class pass bundles."
    },
    {
      q: "Can I book 1-on-1 personal training?",
      a: "Absolutely. You can request personal training through our enquiry form or consult with our head coaches in person. Each 1-on-1 coach builds an individualized movement screen and progressive program for your specific goals."
    },
    {
      q: "What is your membership cancellation or pause policy?",
      a: "We believe in earning your loyalty every week. Direct debit memberships can be placed on pause for up to 6 weeks per calendar year for holidays or work, and cancellations require only 14 days standard written notice with no hidden exit penalties."
    }
  ],

  // ----------------------------------------------------------------------------
  // Feature Toggles
  // Setting any flag to false cleanly removes that section or button everywhere
  // (Navigation, Hero, Footer, Sticky Mobile Bar, Enquiry Form tabs)
  // with NO broken links, empty layout gaps, or orphan controls.
  // ----------------------------------------------------------------------------
  features: {
    trial: true,             // Free trial buttons & form tab
    membership: true,        // Membership enquiry tab & plan CTAs
    whatsapp: true,          // WhatsApp buttons & contact card
    call: true,              // Phone call buttons & contact card
    email: true,             // Email links & contact card
    video: true,             // Cinematic video band section
    intro: true,             // 'The Club' split intro section
    programs: true,          // Programs section & navigation link
    facilities: true,        // Facilities bento grid & navigation link
    trainers: true,          // Trainers section & navigation link
    plans: true,             // Membership plans section & navigation link
    timetable: true,         // Timetable schedule & navigation link
    gallery: true,           // Photo gallery & lightbox & navigation link
    testimonials: true,      // Testimonials carousel
    faq: true,               // FAQ accordion & navigation link
    location: true,          // Location, map placeholder & hours section
    stickyMobileBar: true    // Fixed bottom action bar on mobile
  },

  // ----------------------------------------------------------------------------
  // Forms & Demo Configuration
  // ----------------------------------------------------------------------------
  forms: {
    endpoint: "",            // e.g. "https://formspree.io/f/your_form_id" or Web3Forms
    accessKey: "",           // Optional access key if required by endpoint
    showDemoNote: true,      // Shows 'Demo form: connect an inbox...' upon submission
    sampleLabels: true       // Shows 'Sample' badges/labels on prices, reviews, trainers
  }
};
