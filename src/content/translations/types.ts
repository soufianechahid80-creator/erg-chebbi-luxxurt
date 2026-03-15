export interface Dictionary {
  localeName: string;
  direction: "ltr" | "rtl";
  nav: {
    home: string;
    experiences: string;
    camp: string;
    camel: string;
    quad: string;
    tours: string;
    about: string;
    gallery: string;
    faq: string;
    contact: string;
    booking: string;
    admin: string;
  };
  common: {
    bookNow: string;
    planJourney: string;
    exploreExperiences: string;
    learnMore: string;
    contactUs: string;
    whatsapp: string;
    from: string;
    perPerson: string;
    perNight: string;
    guests: string;
    nights: string;
    included: string;
    startingFrom: string;
    estimatedTotal: string;
    secureRequest: string;
    quickSupport: string;
    viewAll: string;
    reserveDates: string;
    luxuryService: string;
    availabilityNotice: string;
    backToExperiences: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    serviceHighlights: string[];
    trustLine: string;
  };
  home: {
    featuredTitle: string;
    featuredIntro: string;
    whyTitle: string;
    whyIntro: string;
    whyCards: Array<{ title: string; body: string }>;
    trustTitle: string;
    trustIntro: string;
    trustCards: Array<{ title: string; body: string }>;
    finalTitle: string;
    finalBody: string;
    stats: Array<{ label: string; value: string }>;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    storyTitle: string;
    storyBody: string;
    values: Array<{ title: string; body: string }>;
  };
  gallery: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    responsePromise: string;
    formTitle: string;
  };
  bookingPage: {
    eyebrow: string;
    title: string;
    intro: string;
    reassurance: string;
  };
  categoryPages: {
    camp: { title: string; intro: string };
    camel: { title: string; intro: string };
    quad: { title: string; intro: string };
    tours: { title: string; intro: string };
    experiences: { title: string; intro: string };
  };
}
