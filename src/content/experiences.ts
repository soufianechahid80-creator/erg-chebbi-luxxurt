import type { AddOn, Experience } from "@/types/booking";
import type { Locale } from "@/types/locale";

export const addOns: AddOn[] = [
  {
    id: "sandboarding",
    eligibleCategories: ["camel", "tour", "camp"],
    pricing: "per_person",
    price: 8,
    translations: {
      en: { label: "Sandboarding session", description: "Add a dune board session after your trek or camp arrival." },
      fr: { label: "Session de sandboard", description: "Ajoutez une session sur les dunes après la balade ou l’arrivée au camp." },
      es: { label: "Sesión de sandboard", description: "Añade una sesión en las dunas después del paseo o al llegar al campamento." },
      ar: { label: "جلسة ساندبورد", description: "أضف تجربة التزلج على الرمال بعد الرحلة أو عند الوصول إلى المخيم." }
    }
  },
  {
    id: "private-dune-dinner",
    eligibleExperiences: ["luxury-desert-camp", "signature-romantic-camp"],
    pricing: "flat",
    price: 60,
    translations: {
      en: { label: "Private dune dinner setup", description: "A more intimate dining arrangement with styled lantern details." },
      fr: { label: "Dîner privé dans les dunes", description: "Une installation plus intime avec ambiance lumineuse soignée." },
      es: { label: "Cena privada en las dunas", description: "Una puesta en escena más íntima con faroles y ambiente cuidado." },
      ar: { label: "عشاء خاص فوق الكثبان", description: "ترتيب عشاء أكثر خصوصية مع فوانيس ولمسة بصرية راقية." }
    }
  },
  {
    id: "airport-transfer",
    eligibleCategories: ["camp", "tour"],
    pricing: "flat",
    price: 95,
    translations: {
      en: { label: "Private transfer support", description: "Reserve a private arrival or departure transfer on request." },
      fr: { label: "Transfert privé", description: "Ajoutez un transfert privé d’arrivée ou de départ sur demande." },
      es: { label: "Traslado privado", description: "Añade un traslado privado de llegada o salida bajo petición." },
      ar: { label: "نقل خاص", description: "أضف خدمة نقل خاصة للوصول أو المغادرة عند الطلب." }
    }
  },
  {
    id: "sunrise-tea-stop",
    eligibleExperiences: ["sunrise-camel-ride", "sunset-camel-trek"],
    pricing: "flat",
    price: 20,
    translations: {
      en: { label: "Sunrise / sunset tea stop", description: "A quiet tea service pause arranged at a scenic dune point." },
      fr: { label: "Pause thé au lever / coucher", description: "Une pause thé paisible sur un point de vue dans les dunes." },
      es: { label: "Pausa de té al amanecer / atardecer", description: "Una pausa tranquila con té en un punto escénico de las dunas." },
      ar: { label: "توقف شاي عند الشروق / الغروب", description: "استراحة شاي هادئة في نقطة بانورامية داخل الكثبان." }
    }
  },
  {
    id: "photographer",
    eligibleCategories: ["camp", "camel", "tour"],
    pricing: "flat",
    price: 120,
    translations: {
      en: { label: "Private photographer add-on", description: "Ideal for proposals, anniversaries, and premium couple experiences." },
      fr: { label: "Photographe privé", description: "Idéal pour les demandes en mariage, anniversaires et séjours premium en couple." },
      es: { label: "Fotógrafo privado", description: "Ideal para pedidas, aniversarios y experiencias premium en pareja." },
      ar: { label: "مصور خاص", description: "مثالي لطلبات الزواج والذكرى السنوية والتجارب الراقية للأزواج." }
    }
  }
];

export const experiences: Experience[] = [
  {
    slug: "luxury-desert-camp",
    category: "camp",
    featured: true,
    pricingModel: "per_night_per_adult",
    basePrice: 165,
    childPrice: 95,
    minNights: 1,
    heroMediaKey: "heroVideo",
    featuredImageKey: "camp01",
    galleryKeys: ["camp01", "camp02", "gallery02", "gallery03"],
    seasonalNote: {
      en: "Most requested for couples and first-time Sahara travelers.",
      fr: "Très demandé par les couples et les voyageurs découvrant le Sahara.",
      es: "Muy solicitado por parejas y viajeros que visitan el Sahara por primera vez.",
      ar: "من أكثر العروض طلبًا للأزواج ولمن يزور الصحراء لأول مرة."
    },
    addons: ["sandboarding", "private-dune-dinner", "airport-transfer", "photographer"],
    translations: {
      en: {
        title: "Luxury Desert Camp Stay",
        shortDescription: "A refined overnight desert stay with dinner, breakfast, and elegant tented comfort.",
        longDescription: "This is the core luxury camp product: polished tent styling, dinner in the dunes, breakfast, warm hosting, and the emotional stillness that makes a Merzouga night unforgettable.",
        badge: "Best seller",
        durationLabel: "1+ nights",
        inclusions: ["Luxury tent accommodation", "Dinner & breakfast", "Camp hosting", "Desert ambiance and evening fire setting"],
        highlights: ["Beautiful for couples", "Suitable for families", "High visual value", "Easy to extend to multiple nights"],
        idealFor: "Couples, families, premium first-time Sahara stays",
        metaDescription: "Book a luxury desert camp stay in Merzouga with premium comfort, dinner, breakfast, and elegant Sahara atmosphere."
      },
      fr: {
        title: "Séjour en camp de luxe",
        shortDescription: "Une nuit raffinée dans le désert avec dîner, petit-déjeuner et confort sous tente.",
        longDescription: "C’est l’offre centrale du camp de luxe : tente soignée, dîner dans les dunes, petit-déjeuner, accueil chaleureux et ce calme désertique qui rend la nuit à Merzouga inoubliable.",
        badge: "Le plus réservé",
        durationLabel: "1 nuit et plus",
        inclusions: ["Tente de luxe", "Dîner et petit-déjeuner", "Accueil au camp", "Ambiance du désert et feu du soir"],
        highlights: ["Idéal pour les couples", "Adapté aux familles", "Très photogénique", "Facile à prolonger"],
        idealFor: "Couples, familles, premier séjour premium dans le Sahara",
        metaDescription: "Réservez un séjour en camp de luxe à Merzouga avec confort premium, dîner, petit-déjeuner et ambiance saharienne élégante."
      },
      es: {
        title: "Estancia en campamento de lujo",
        shortDescription: "Una noche refinada en el desierto con cena, desayuno y confort elegante bajo tienda.",
        longDescription: "Es el producto central del campamento premium: tienda cuidada, cena en las dunas, desayuno, atención cálida y el silencio emocional que hace inolvidable una noche en Merzouga.",
        badge: "Más reservado",
        durationLabel: "1+ noches",
        inclusions: ["Alojamiento en tienda de lujo", "Cena y desayuno", "Atención en campamento", "Ambiente del desierto y fuego nocturno"],
        highlights: ["Perfecto para parejas", "Apto para familias", "Muy visual", "Fácil de ampliar a más noches"],
        idealFor: "Parejas, familias y primeras estancias premium en el Sahara",
        metaDescription: "Reserva una estancia en campamento de lujo en Merzouga con confort premium, cena, desayuno y ambiente elegante del Sahara."
      },
      ar: {
        title: "إقامة في مخيم صحراوي فاخر",
        shortDescription: "ليلة راقية في الصحراء مع عشاء وفطور وراحة أنيقة داخل خيمة فاخرة.",
        longDescription: "هذا هو العرض الأساسي للمخيم الفاخر: تنسيق أنيق للخيمة، عشاء بين الكثبان، فطور صباحي، استقبال دافئ، وهدوء صحراوي يجعل ليلة مرزوكة تجربة لا تُنسى.",
        badge: "الأكثر طلبًا",
        durationLabel: "ليلة فأكثر",
        inclusions: ["إقامة في خيمة فاخرة", "العشاء والفطور", "استقبال في المخيم", "أجواء صحراوية وسهرة مسائية"],
        highlights: ["مناسب جدًا للأزواج", "مناسب للعائلات", "قيمة بصرية عالية", "سهل التمديد لليالي إضافية"],
        idealFor: "الأزواج والعائلات وتجارب الصحراء الفاخرة لأول مرة",
        metaDescription: "احجز إقامة في مخيم فاخر بمرزوكة مع راحة مميزة وعشاء وفطور وأجواء صحراوية أنيقة."
      }
    }
  },
  {
    slug: "signature-romantic-camp",
    category: "camp",
    featured: true,
    pricingModel: "per_night_per_adult",
    basePrice: 225,
    childPrice: 120,
    minNights: 1,
    heroMediaKey: "camp02",
    featuredImageKey: "camp02",
    galleryKeys: ["camp02", "gallery02", "gallery05"],
    seasonalNote: {
      en: "Ideal for honeymoons, anniversaries, and premium private moments.",
      fr: "Idéal pour les lunes de miel, anniversaires et moments privés premium.",
      es: "Ideal para lunas de miel, aniversarios y momentos privados premium.",
      ar: "مثالي لشهر العسل والذكرى السنوية واللحظات الخاصة الراقية."
    },
    addons: ["private-dune-dinner", "photographer", "airport-transfer"],
    translations: {
      en: {
        title: "Signature Romantic Desert Retreat",
        shortDescription: "A more exclusive camp stay designed for privacy, styling, and meaningful moments.",
        longDescription: "For guests who want the desert to feel deeply personal: extra atmosphere, more intimate setup potential, and a premium frame for celebrations, anniversaries, or quiet luxury.",
        badge: "Private favorite",
        durationLabel: "1+ nights",
        inclusions: ["Premium camp stay", "Enhanced private ambiance", "Dinner & breakfast", "Priority hosting"],
        highlights: ["Proposal-ready", "Anniversary friendly", "Photographer add-on", "Elegant atmosphere"],
        idealFor: "Couples, honeymooners, romantic private bookings",
        metaDescription: "Reserve a private romantic luxury desert stay in Merzouga designed for intimate, elevated moments."
      },
      fr: {
        title: "Retraite romantique signature",
        shortDescription: "Un séjour plus exclusif, pensé pour l’intimité, l’esthétique et les moments marquants.",
        longDescription: "Pour les voyageurs qui veulent un désert profondément personnel : davantage d’atmosphère, plus d’intimité et un cadre premium pour célébrations ou luxe discret.",
        badge: "Favori privé",
        durationLabel: "1 nuit et plus",
        inclusions: ["Séjour premium", "Ambiance privée renforcée", "Dîner et petit-déjeuner", "Accueil prioritaire"],
        highlights: ["Idéal demande en mariage", "Parfait anniversaire", "Option photographe", "Atmosphère élégante"],
        idealFor: "Couples, lunes de miel, réservations romantiques privées",
        metaDescription: "Réservez un séjour romantique privé dans le désert de Merzouga, pensé pour des moments intimes et raffinés."
      },
      es: {
        title: "Retiro romántico signature",
        shortDescription: "Una estancia más exclusiva pensada para privacidad, puesta en escena y momentos especiales.",
        longDescription: "Para viajeros que quieren sentir el desierto de forma íntima: más atmósfera, más privacidad y un marco premium para celebraciones, aniversarios o lujo tranquilo.",
        badge: "Favorito privado",
        durationLabel: "1+ noches",
        inclusions: ["Estancia premium", "Ambiente privado reforzado", "Cena y desayuno", "Atención prioritaria"],
        highlights: ["Ideal para pedidas", "Perfecto para aniversarios", "Extra de fotógrafo", "Atmósfera elegante"],
        idealFor: "Parejas, luna de miel y reservas privadas románticas",
        metaDescription: "Reserva una estancia romántica privada en el desierto de Merzouga para momentos íntimos y elegantes."
      },
      ar: {
        title: "إقامة صحراوية رومانسية مميزة",
        shortDescription: "إقامة أكثر خصوصية مصممة للأجواء الراقية واللحظات المهمة.",
        longDescription: "لمن يريد أن يعيش الصحراء بشكل شخصي جدًا: أجواء إضافية، إعداد أكثر حميمية، وإطار فاخر لذكرى سنوية أو مناسبة خاصة أو رفاهية هادئة.",
        badge: "المفضل للخصوصية",
        durationLabel: "ليلة فأكثر",
        inclusions: ["إقامة مميزة", "أجواء خاصة محسنة", "العشاء والفطور", "استقبال بأولوية"],
        highlights: ["مناسب لطلب الزواج", "مثالي للذكرى السنوية", "إضافة مصور", "أجواء أنيقة"],
        idealFor: "الأزواج، شهر العسل، الحجوزات الرومانسية الخاصة",
        metaDescription: "احجز إقامة رومانسية خاصة في صحراء مرزوكة مصممة للحظات الحميمة والراقية."
      }
    }
  },
  {
    slug: "sunset-camel-trek",
    category: "camel",
    featured: true,
    pricingModel: "per_person",
    basePrice: 25,
    childPrice: 18,
    heroMediaKey: "camel01",
    featuredImageKey: "camel01",
    galleryKeys: ["camel01", "gallery04"],
    seasonalNote: {
      en: "Classic Merzouga timing with strong visual value at sunset.",
      fr: "Le grand classique de Merzouga avec très belle lumière au coucher du soleil.",
      es: "El gran clásico de Merzouga con una luz preciosa al atardecer.",
      ar: "التجربة الكلاسيكية في مرزوكة مع قيمة بصرية قوية وقت الغروب."
    },
    addons: ["sunrise-tea-stop", "sandboarding"],
    translations: {
      en: {
        title: "Sunset Camel Trek",
        shortDescription: "A calm late-afternoon camel experience through the dunes with golden-hour views.",
        longDescription: "The most iconic first step into the desert: a measured camel ride, warm light, soft timing, and the classic Sahara silhouette guests expect from Merzouga.",
        badge: "Golden hour",
        durationLabel: "Around 1 hour",
        inclusions: ["Camel ride", "Local guide", "Photo stop on the dunes"],
        highlights: ["Easy for first-time guests", "Excellent sunset photos", "Simple add-on to a camp stay", "Atmospheric and gentle"],
        idealFor: "Couples, families, first-time Merzouga visitors",
        metaDescription: "Book a sunset camel trek in Merzouga with golden-hour views across the Erg Chebbi dunes."
      },
      fr: {
        title: "Balade à dos de chameau au coucher du soleil",
        shortDescription: "Une expérience douce en fin d’après-midi à travers les dunes avec une superbe lumière.",
        longDescription: "L’entrée la plus emblématique dans le désert : balade mesurée, lumière chaude, rythme apaisé et silhouette saharienne classique.",
        badge: "Heure dorée",
        durationLabel: "Environ 1 heure",
        inclusions: ["Balade à dos de chameau", "Guide local", "Pause photo dans les dunes"],
        highlights: ["Facile pour une première fois", "Très belles photos", "Parfait avec une nuit au camp", "Doux et atmosphérique"],
        idealFor: "Couples, familles, premiers visiteurs à Merzouga",
        metaDescription: "Réservez une balade à dos de chameau au coucher du soleil à Merzouga avec vue sur les dunes d’Erg Chebbi."
      },
      es: {
        title: "Paseo en camello al atardecer",
        shortDescription: "Una experiencia tranquila por las dunas al final de la tarde con luz dorada.",
        longDescription: "La forma más icónica de entrar al desierto: paseo medido, luz cálida, ritmo suave y la silueta clásica del Sahara que muchos viajeros imaginan.",
        badge: "Hora dorada",
        durationLabel: "Aproximadamente 1 hora",
        inclusions: ["Paseo en camello", "Guía local", "Parada para fotos en las dunas"],
        highlights: ["Fácil para primera vez", "Fotos excelentes al atardecer", "Muy combinable con campamento", "Suave y atmosférico"],
        idealFor: "Parejas, familias y visitantes por primera vez",
        metaDescription: "Reserva un paseo en camello al atardecer en Merzouga con vistas doradas sobre las dunas de Erg Chebbi."
      },
      ar: {
        title: "رحلة جمال عند الغروب",
        shortDescription: "تجربة هادئة في آخر النهار عبر الكثبان مع ضوء ذهبي رائع.",
        longDescription: "أشهر طريقة للدخول إلى الصحراء: ركوب جمال بإيقاع هادئ، ضوء دافئ، وتلك الصورة الصحراوية الكلاسيكية التي ينتظرها الزوار في مرزوكة.",
        badge: "الساعة الذهبية",
        durationLabel: "حوالي ساعة",
        inclusions: ["ركوب جمل", "مرشد محلي", "توقف للتصوير فوق الكثبان"],
        highlights: ["مناسبة للمرة الأولى", "صور غروب ممتازة", "تنسجم مع إقامة المخيم", "هادئة ومليئة بالأجواء"],
        idealFor: "الأزواج والعائلات وزوار مرزوكة لأول مرة",
        metaDescription: "احجز رحلة جمال عند الغروب في مرزوكة مع إطلالات ذهبية على كثبان إرڭ شبي."
      }
    }
  },
  {
    slug: "sunrise-camel-ride",
    category: "camel",
    featured: false,
    pricingModel: "per_person",
    basePrice: 30,
    childPrice: 20,
    heroMediaKey: "camel02",
    featuredImageKey: "camel02",
    galleryKeys: ["camel02", "gallery04"],
    addons: ["sunrise-tea-stop", "sandboarding"],
    translations: {
      en: {
        title: "Sunrise Camel Ride",
        shortDescription: "An early desert departure for cooler air, softer light, and a quieter atmosphere.",
        longDescription: "For travelers who prefer the serenity of first light, this ride offers a calm and photogenic start to the day before the desert brightens fully.",
        badge: "Quiet morning",
        durationLabel: "Around 1 hour",
        inclusions: ["Camel ride", "Local guide", "Sunrise dune stop"],
        highlights: ["Cooler timing", "Quiet atmosphere", "Beautiful for photographers", "Good with camp departures"],
        idealFor: "Early risers, photographers, calm travelers",
        metaDescription: "Experience a sunrise camel ride in Merzouga with a quiet early-morning Sahara atmosphere."
      },
      fr: {
        title: "Balade à dos de chameau au lever du soleil",
        shortDescription: "Départ tôt pour une lumière douce, une température agréable et une atmosphère paisible.",
        longDescription: "Pour les voyageurs qui préfèrent la sérénité des premières lueurs, cette balade offre un début de journée calme et photogénique.",
        badge: "Matin paisible",
        durationLabel: "Environ 1 heure",
        inclusions: ["Balade à dos de chameau", "Guide local", "Pause au sommet d’une dune"],
        highlights: ["Moment plus frais", "Atmosphère calme", "Très beau pour les photos", "Idéal après une nuit au camp"],
        idealFor: "Lève-tôt, photographes, voyageurs calmes",
        metaDescription: "Vivez une balade au lever du soleil à Merzouga dans une atmosphère saharienne paisible."
      },
      es: {
        title: "Paseo en camello al amanecer",
        shortDescription: "Salida temprana para disfrutar de aire fresco, luz suave y una atmósfera tranquila.",
        longDescription: "Para viajeros que prefieren la serenidad de la primera luz, este paseo ofrece un comienzo calmado y muy fotogénico.",
        badge: "Mañana tranquila",
        durationLabel: "Aproximadamente 1 hora",
        inclusions: ["Paseo en camello", "Guía local", "Parada al amanecer sobre una duna"],
        highlights: ["Horario más fresco", "Ambiente silencioso", "Muy bonito para fotos", "Ideal tras noche en campamento"],
        idealFor: "Madrugadores, fotógrafos y viajeros tranquilos",
        metaDescription: "Disfruta de un paseo en camello al amanecer en Merzouga con el Sahara en silencio."
      },
      ar: {
        title: "ركوب الجمال عند الشروق",
        shortDescription: "انطلاق مبكر للاستمتاع بجو ألطف وضوء ناعم وأجواء أكثر هدوءًا.",
        longDescription: "للمسافرين الذين يفضلون سكينة أول النهار، تمنح هذه الرحلة بداية هادئة ومثالية للتصوير قبل اشتداد الضوء.",
        badge: "صباح هادئ",
        durationLabel: "حوالي ساعة",
        inclusions: ["ركوب جمل", "مرشد محلي", "توقف عند قمة كثيب لمشاهدة الشروق"],
        highlights: ["توقيت أبرد", "أجواء هادئة", "رائع للتصوير", "مناسب بعد ليلة في المخيم"],
        idealFor: "محبو الاستيقاظ المبكر والمصورون والباحثون عن الهدوء",
        metaDescription: "عش تجربة ركوب الجمال عند الشروق في مرزوكة وسط أجواء صحراوية هادئة."
      }
    }
  },
  {
    slug: "quad-adventure-1h",
    category: "quad",
    featured: true,
    pricingModel: "per_person",
    basePrice: 55,
    heroMediaKey: "quad01",
    featuredImageKey: "quad01",
    galleryKeys: ["quad01", "gallery06"],
    translations: {
      en: {
        title: "Quad Adventure — 1 Hour",
        shortDescription: "A focused adrenaline session for guests who want speed, dunes, and an easy booking point.",
        longDescription: "This one-hour quad format is ideal for travelers who want a premium desert thrill without committing to a longer program.",
        badge: "Adventure essential",
        durationLabel: "1 hour",
        inclusions: ["Briefing and safety support", "Quad ride", "Guide-led route"],
        highlights: ["Quick and exciting", "Easy add-on to camp stays", "Great for groups", "Beginner-friendly pacing"],
        idealFor: "Adventure seekers, couples, friend groups",
        metaDescription: "Book a 1-hour quad adventure in Merzouga for a thrilling desert ride across Erg Chebbi."
      },
      fr: {
        title: "Aventure quad — 1 heure",
        shortDescription: "Une session dynamique pour les voyageurs qui veulent vitesse, dunes et réservation simple.",
        longDescription: "Ce format d’une heure est parfait pour ceux qui veulent le frisson du désert sans programme long.",
        badge: "Essentiel aventure",
        durationLabel: "1 heure",
        inclusions: ["Briefing sécurité", "Balade en quad", "Parcours guidé"],
        highlights: ["Rapide et intense", "Bon complément au camp", "Idéal en groupe", "Rythme accessible"],
        idealFor: "Amateurs d’aventure, couples, groupes d’amis",
        metaDescription: "Réservez une aventure en quad d’une heure à Merzouga pour une traversée excitante d’Erg Chebbi."
      },
      es: {
        title: "Aventura en quad — 1 hora",
        shortDescription: "Una sesión intensa para quienes buscan velocidad, dunas y una reserva sencilla.",
        longDescription: "Este formato de una hora es perfecto para quienes quieren emoción en el desierto sin un programa demasiado largo.",
        badge: "Esencial de aventura",
        durationLabel: "1 hora",
        inclusions: ["Briefing de seguridad", "Ruta en quad", "Recorrido guiado"],
        highlights: ["Rápido y emocionante", "Buen extra para campamento", "Ideal para grupos", "Ritmo apto para principiantes"],
        idealFor: "Amantes de la aventura, parejas y grupos de amigos",
        metaDescription: "Reserva una aventura en quad de 1 hora en Merzouga para recorrer las dunas de Erg Chebbi."
      },
      ar: {
        title: "مغامرة كواد — ساعة واحدة",
        shortDescription: "جلسة قوية للباحثين عن السرعة والكثبان مع حجز سهل وواضح.",
        longDescription: "صيغة الساعة الواحدة مثالية لمن يريد متعة صحراوية قوية دون الالتزام ببرنامج طويل.",
        badge: "أساس المغامرة",
        durationLabel: "ساعة واحدة",
        inclusions: ["إحاطة سلامة", "جولة كواد", "مسار بقيادة مرشد"],
        highlights: ["سريعة ومثيرة", "إضافة ممتازة مع المخيم", "رائعة للمجموعات", "وتيرة مناسبة للمبتدئين"],
        idealFor: "محبو المغامرة والأزواج ومجموعات الأصدقاء",
        metaDescription: "احجز مغامرة كواد لمدة ساعة في مرزوكة لعبور كثبان إرڭ شبي."
      }
    },
    addons: []
  },
  {
    slug: "quad-adventure-2h",
    category: "quad",
    featured: false,
    pricingModel: "per_person",
    basePrice: 95,
    heroMediaKey: "quad02",
    featuredImageKey: "quad02",
    galleryKeys: ["quad02", "gallery06"],
    translations: {
      en: {
        title: "Quad Adventure — 2 Hours",
        shortDescription: "A longer route for guests who want more terrain, more atmosphere, and more time on the dunes.",
        longDescription: "The extended quad format is made for travelers who want a stronger sense of the desert landscape while keeping the experience premium and guided.",
        badge: "Extended route",
        durationLabel: "2 hours",
        inclusions: ["Safety briefing", "Extended dune route", "Guide support"],
        highlights: ["More terrain coverage", "Better for adventure-led travellers", "Premium pacing", "Strong visual stops"],
        idealFor: "Adventure-first travelers, small groups, repeat visitors",
        metaDescription: "Choose a 2-hour quad adventure in Merzouga for a deeper desert ride experience."
      },
      fr: {
        title: "Aventure quad — 2 heures",
        shortDescription: "Une route plus longue pour plus de terrain, plus d’ambiance et plus de temps dans les dunes.",
        longDescription: "Ce format prolongé s’adresse aux voyageurs qui veulent ressentir davantage le paysage désertique sans perdre le cadre premium et guidé.",
        badge: "Parcours étendu",
        durationLabel: "2 heures",
        inclusions: ["Briefing sécurité", "Parcours prolongé", "Assistance du guide"],
        highlights: ["Plus de terrain couvert", "Parfait pour les amateurs d’aventure", "Rythme premium", "Très beaux arrêts visuels"],
        idealFor: "Voyageurs orientés aventure, petits groupes, visiteurs de retour",
        metaDescription: "Choisissez une aventure quad de 2 heures à Merzouga pour une immersion plus profonde dans le désert."
      },
      es: {
        title: "Aventura en quad — 2 horas",
        shortDescription: "Una ruta más larga para disfrutar de más terreno, más ambiente y más tiempo en las dunas.",
        longDescription: "Este formato ampliado es para viajeros que quieren sentir mejor el paisaje del desierto sin perder el enfoque premium y guiado.",
        badge: "Ruta extendida",
        durationLabel: "2 horas",
        inclusions: ["Briefing de seguridad", "Ruta extendida por dunas", "Asistencia de guía"],
        highlights: ["Más terreno recorrido", "Ideal para viajeros aventureros", "Ritmo premium", "Paradas visuales fuertes"],
        idealFor: "Viajeros de aventura, grupos pequeños y visitantes repetidores",
        metaDescription: "Elige una aventura en quad de 2 horas en Merzouga para una experiencia más profunda en el desierto."
      },
      ar: {
        title: "مغامرة كواد — ساعتان",
        shortDescription: "مسار أطول لمن يريد تضاريس أكثر وأجواء أكبر ووقتًا أطول فوق الكثبان.",
        longDescription: "هذه الصيغة الممتدة مناسبة لمن يريد الإحساس بالمشهد الصحراوي بشكل أعمق مع الحفاظ على الإطار الراقي والموجّه.",
        badge: "مسار ممتد",
        durationLabel: "ساعتان",
        inclusions: ["إحاطة سلامة", "مسار أطول على الكثبان", "مرافقة مرشد"],
        highlights: ["تغطية أكبر للتضاريس", "أفضل لعشاق المغامرة", "إيقاع راقٍ", "توقفات بصرية قوية"],
        idealFor: "المسافرون الباحثون عن المغامرة، المجموعات الصغيرة، والزوار المتكررون",
        metaDescription: "اختر مغامرة كواد لمدة ساعتين في مرزوكة لتجربة صحراوية أعمق."
      }
    },
    addons: []
  },
  {
    slug: "private-4x4-erg-chebbi",
    category: "tour",
    featured: true,
    pricingModel: "per_booking",
    basePrice: 180,
    includedGuests: 4,
    extraGuestPrice: 35,
    heroMediaKey: "tour01",
    featuredImageKey: "tour01",
    galleryKeys: ["tour01", "gallery01", "gallery05"],
    addons: ["airport-transfer", "sandboarding", "photographer"],
    translations: {
      en: {
        title: "Private 4x4 Erg Chebbi Tour",
        shortDescription: "A private half-day route with a driver-guide across the wider Merzouga desert landscape.",
        longDescription: "Built for travelers who want perspective beyond the camp itself: viewpoints, nomad areas, music stops, and the comfort of a private vehicle.",
        badge: "Private route",
        durationLabel: "Half day",
        inclusions: ["Private 4x4 vehicle", "Driver-guide", "Fuel and route logistics"],
        highlights: ["Best for private groups", "Flexible stops", "Comfortable pace", "Photogenic viewpoints"],
        idealFor: "Families, private couples, small groups",
        metaDescription: "Reserve a private 4x4 Erg Chebbi tour in Merzouga with your own driver-guide and flexible stops."
      },
      fr: {
        title: "Tour privé en 4x4 à Erg Chebbi",
        shortDescription: "Un itinéraire privé d’une demi-journée avec chauffeur-guide dans le grand paysage de Merzouga.",
        longDescription: "Conçu pour ceux qui veulent une perspective plus large que le camp : panoramas, zones nomades, musique et confort d’un véhicule privé.",
        badge: "Route privée",
        durationLabel: "Demi-journée",
        inclusions: ["Véhicule 4x4 privé", "Chauffeur-guide", "Carburant et logistique"],
        highlights: ["Idéal groupes privés", "Arrêts flexibles", "Rythme confortable", "Très belles vues"],
        idealFor: "Familles, couples privés, petits groupes",
        metaDescription: "Réservez un tour privé en 4x4 à Erg Chebbi avec votre chauffeur-guide à Merzouga."
      },
      es: {
        title: "Tour privado 4x4 en Erg Chebbi",
        shortDescription: "Una ruta privada de medio día con conductor-guía por el paisaje más amplio del desierto de Merzouga.",
        longDescription: "Pensado para viajeros que quieren ver más allá del campamento: panorámicas, zonas nómadas, música y la comodidad de un vehículo privado.",
        badge: "Ruta privada",
        durationLabel: "Medio día",
        inclusions: ["Vehículo 4x4 privado", "Conductor-guía", "Combustible y logística"],
        highlights: ["Ideal para grupos privados", "Paradas flexibles", "Ritmo cómodo", "Miradores fotogénicos"],
        idealFor: "Familias, parejas privadas y grupos pequeños",
        metaDescription: "Reserva un tour privado 4x4 en Erg Chebbi con conductor-guía propio en Merzouga."
      },
      ar: {
        title: "جولة 4x4 خاصة في إرڭ شبي",
        shortDescription: "مسار خاص لنصف يوم مع سائق-مرشد عبر المشهد الصحراوي الأوسع في مرزوكة.",
        longDescription: "مصمم للزوار الذين يريدون رؤية ما هو أبعد من المخيم: نقاط بانورامية، مناطق الرحل، محطات موسيقية، وراحة سيارة خاصة.",
        badge: "مسار خاص",
        durationLabel: "نصف يوم",
        inclusions: ["سيارة 4x4 خاصة", "سائق-مرشد", "الوقود والتنظيم"],
        highlights: ["مثالي للمجموعات الخاصة", "توقفات مرنة", "إيقاع مريح", "إطلالات رائعة للتصوير"],
        idealFor: "العائلات والأزواج والمجموعات الصغيرة",
        metaDescription: "احجز جولة 4x4 خاصة في إرڭ شبي مع سائق-مرشد خاص في مرزوكة."
      }
    }
  },
  {
    slug: "full-day-desert-exploration",
    category: "tour",
    featured: false,
    pricingModel: "per_booking",
    basePrice: 320,
    includedGuests: 4,
    extraGuestPrice: 45,
    heroMediaKey: "tour02",
    featuredImageKey: "tour02",
    galleryKeys: ["tour02", "tour01", "gallery01", "gallery05"],
    addons: ["airport-transfer", "sandboarding", "photographer"],
    translations: {
      en: {
        title: "Full-Day Private Desert Exploration",
        shortDescription: "A slower, more complete private day for guests who want depth rather than a quick circuit.",
        longDescription: "A full day opens more room for scenic pauses, local encounters, photography, and a better sense of the wider desert ecosystem surrounding Erg Chebbi.",
        badge: "Full day private",
        durationLabel: "Full day",
        inclusions: ["Private 4x4", "Driver-guide", "Flexible exploration timing"],
        highlights: ["More immersive", "Ideal for photographers", "Private pace", "Strong premium value"],
        idealFor: "Curious travelers, families, content creators, private groups",
        metaDescription: "Book a full-day private desert exploration in Merzouga for a deeper luxury 4x4 experience."
      },
      fr: {
        title: "Exploration privée du désert — journée complète",
        shortDescription: "Une journée plus lente et plus complète pour les voyageurs qui veulent de la profondeur.",
        longDescription: "Une journée entière laisse davantage de place aux pauses visuelles, rencontres locales, photos et compréhension du paysage autour d’Erg Chebbi.",
        badge: "Journée privée",
        durationLabel: "Journée complète",
        inclusions: ["4x4 privé", "Chauffeur-guide", "Horaires flexibles"],
        highlights: ["Plus immersif", "Parfait pour les photographes", "Rythme privé", "Belle valeur premium"],
        idealFor: "Voyageurs curieux, familles, créateurs, groupes privés",
        metaDescription: "Réservez une journée complète privée dans le désert à Merzouga pour une expérience 4x4 plus immersive."
      },
      es: {
        title: "Exploración privada de día completo",
        shortDescription: "Un día más completo y pausado para quienes desean profundidad, no solo una ruta rápida.",
        longDescription: "Un día completo deja más espacio para paradas escénicas, encuentros locales, fotografía y una visión más rica del entorno de Erg Chebbi.",
        badge: "Privado día completo",
        durationLabel: "Día completo",
        inclusions: ["4x4 privado", "Conductor-guía", "Horarios flexibles"],
        highlights: ["Más inmersivo", "Ideal para fotógrafos", "Ritmo privado", "Gran valor premium"],
        idealFor: "Viajeros curiosos, familias, creadores y grupos privados",
        metaDescription: "Reserva una exploración privada de día completo en el desierto de Merzouga para una experiencia 4x4 más profunda."
      },
      ar: {
        title: "استكشاف صحراوي خاص ليوم كامل",
        shortDescription: "يوم كامل أكثر هدوءًا وعمقًا للضيوف الذين يريدون تجربة أوسع من جولة سريعة.",
        longDescription: "اليوم الكامل يمنح مساحة أكبر للتوقفات البانورامية واللقاءات المحلية والتصوير وفهم المشهد الصحراوي المحيط بإرڭ شبي.",
        badge: "يوم خاص كامل",
        durationLabel: "يوم كامل",
        inclusions: ["سيارة 4x4 خاصة", "سائق-مرشد", "توقيت مرن للاستكشاف"],
        highlights: ["أكثر عمقًا", "مثالي للمصورين", "إيقاع خاص", "قيمة فاخرة قوية"],
        idealFor: "المسافرون الفضوليون والعائلات وصناع المحتوى والمجموعات الخاصة",
        metaDescription: "احجز استكشافًا صحراويًا خاصًا ليوم كامل في مرزوكة لتجربة 4x4 أكثر عمقًا."
      }
    }
  },
  {
    slug: "multi-day-sahara-escape",
    category: "tour",
    featured: false,
    pricingModel: "per_person",
    basePrice: 390,
    heroMediaKey: "tour02",
    featuredImageKey: "tour02",
    galleryKeys: ["tour02", "camp01", "camel01"],
    addons: ["airport-transfer", "photographer"],
    translations: {
      en: {
        title: "Multi-Day Sahara Escape from Marrakech or Fes",
        shortDescription: "A premium starting point for travelers who want the desert integrated into a broader Morocco itinerary.",
        longDescription: "This product is structured as a high-value lead generator for longer journeys. Use it for guests who want private logistics, selective stops, and a more refined route into Merzouga.",
        badge: "On request",
        durationLabel: "3+ days",
        inclusions: ["Trip planning support", "Private routing basis", "Merzouga desert component"],
        highlights: ["Good for international leads", "Private-focused", "Flexible route design", "Scalable upsell product"],
        idealFor: "International travellers, couples, tailor-made itineraries",
        metaDescription: "Request a multi-day Morocco desert journey from Marrakech or Fes with Merzouga as a premium highlight."
      },
      fr: {
        title: "Évasion saharienne de plusieurs jours depuis Marrakech ou Fès",
        shortDescription: "Un point de départ premium pour intégrer le désert à un itinéraire plus large au Maroc.",
        longDescription: "Cette offre sert de point d’entrée pour les longs voyages avec logistique privée, arrêts choisis et route raffinée vers Merzouga.",
        badge: "Sur demande",
        durationLabel: "3 jours et plus",
        inclusions: ["Support de planification", "Base de route privée", "Étape désert à Merzouga"],
        highlights: ["Fort potentiel international", "Approche privée", "Itinéraire flexible", "Produit premium évolutif"],
        idealFor: "Voyageurs internationaux, couples, voyages sur mesure",
        metaDescription: "Demandez un voyage désert de plusieurs jours depuis Marrakech ou Fès avec Merzouga comme moment premium."
      },
      es: {
        title: "Escapada sahariana de varios días desde Marrakech o Fez",
        shortDescription: "Un punto de partida premium para integrar el desierto en un itinerario más amplio por Marruecos.",
        longDescription: "Este producto funciona como una propuesta de alto valor para viajes largos con logística privada, paradas seleccionadas y una ruta más refinada hacia Merzouga.",
        badge: "Bajo petición",
        durationLabel: "3+ días",
        inclusions: ["Apoyo de planificación", "Base de ruta privada", "Componente desértico en Merzouga"],
        highlights: ["Interesante para leads internacionales", "Enfoque privado", "Diseño flexible", "Producto escalable premium"],
        idealFor: "Viajeros internacionales, parejas e itinerarios a medida",
        metaDescription: "Solicita un viaje por el desierto de varios días desde Marrakech o Fez con Merzouga como punto premium."
      },
      ar: {
        title: "رحلة صحراوية متعددة الأيام من مراكش أو فاس",
        shortDescription: "نقطة انطلاق فاخرة للمسافرين الذين يريدون دمج الصحراء داخل برنامج أوسع في المغرب.",
        longDescription: "هذا العرض مناسب كمنتج عالي القيمة للرحلات الطويلة، مع لوجستيك خاص وتوقفات مختارة ومسار أكثر أناقة نحو مرزوكة.",
        badge: "عند الطلب",
        durationLabel: "3 أيام فأكثر",
        inclusions: ["دعم تخطيط الرحلة", "أساس برنامج خاص", "جزء صحراوي في مرزوكة"],
        highlights: ["مناسب للضيوف الدوليين", "يركز على الخصوصية", "تصميم مرن للمسار", "منتج قابل للتوسعة"],
        idealFor: "المسافرون الدوليون والأزواج والبرامج المصممة حسب الطلب",
        metaDescription: "اطلب رحلة صحراوية متعددة الأيام من مراكش أو فاس مع مرزوكة كأبرز محطة فاخرة."
      }
    }
  }
];

export function getExperienceBySlug(slug: string) {
  return experiences.find((experience) => experience.slug === slug);
}

export function getFeaturedExperiences() {
  return experiences.filter((experience) => experience.featured);
}

export function getExperiencesByCategory(category: Experience["category"]) {
  return experiences.filter((experience) => experience.category === category);
}

export function getTranslatedExperience(experience: Experience, locale: Locale) {
  return experience.translations[locale] ?? experience.translations.en;
}

export function getAddonById(id: string) {
  return addOns.find((addon) => addon.id === id);
}

export function getAddOnsForExperience(experience: Experience) {
  return addOns.filter((addon) => {
    const bySlug = addon.eligibleExperiences?.includes(experience.slug);
    const byCategory = addon.eligibleCategories?.includes(experience.category);
    return Boolean(bySlug || byCategory);
  });
}
