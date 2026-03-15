import type { Locale } from "@/types/locale";

export interface FaqItem {
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

export const faqs: FaqItem[] = [
  {
    question: {
      en: "How far in advance should I book?",
      fr: "Combien de temps à l’avance faut-il réserver ?",
      es: "¿Con cuánta antelación conviene reservar?",
      ar: "كم من الوقت قبل الرحلة يجب أن أحجز؟"
    },
    answer: {
      en: "For high-demand periods such as spring, autumn, holidays, and private romantic stays, booking early is strongly recommended. The site is designed to create a proper reservation request rather than relying only on WhatsApp.",
      fr: "Pour les périodes demandées comme le printemps, l’automne, les vacances et les séjours romantiques privés, il est fortement conseillé de réserver tôt. Le site permet de créer une vraie demande de réservation structurée.",
      es: "Para temporadas altas como primavera, otoño, festivos y estancias privadas, conviene reservar con antelación. El sitio está pensado para crear una solicitud de reserva seria y ordenada.",
      ar: "خلال الفترات المطلوبة مثل الربيع والخريف والعطل والإقامات الخاصة، يفضّل الحجز مبكرًا. الموقع مصمم لإنشاء طلب حجز منظم وليس الاعتماد فقط على واتساب."
    }
  },
  {
    question: {
      en: "Are camp stays private or shared?",
      fr: "Les séjours au camp sont-ils privés ou partagés ?",
      es: "¿Las estancias en el campamento son privadas o compartidas?",
      ar: "هل الإقامة في المخيم خاصة أم مشتركة؟"
    },
    answer: {
      en: "The luxury positioning of the brand favors private or semi-private comfort. You can offer standard shared arrangements later, but the current website structure is built to present premium, more private desert hospitality first.",
      fr: "Le positionnement luxe privilégie le confort privé ou semi-privé. Vous pourrez proposer plus tard des options partagées, mais la structure actuelle met d’abord en avant une hospitalité haut de gamme et plus intime.",
      es: "El posicionamiento premium favorece el confort privado o semi-privado. Más adelante puedes añadir opciones compartidas, pero la estructura actual presenta primero una hospitalidad más exclusiva.",
      ar: "التموضع الفاخر للعلامة يفضل الراحة الخاصة أو شبه الخاصة. يمكن إضافة خيارات مشتركة لاحقًا، لكن البنية الحالية تركز أولاً على الضيافة الصحراوية الراقية والأكثر خصوصية."
    }
  },
  {
    question: {
      en: "Can I book a custom transfer or private itinerary?",
      fr: "Puis-je réserver un transfert ou un itinéraire privé ?",
      es: "¿Puedo reservar un traslado o un itinerario privado?",
      ar: "هل يمكنني حجز نقل خاص أو برنامج مخصص؟"
    },
    answer: {
      en: "Yes. The contact form and booking notes are both prepared for private requests such as airport transfers, tailored desert routes, romantic setups, family stays, and multi-day programs from Marrakech or Fes.",
      fr: "Oui. Le formulaire de contact et les notes de réservation sont prévus pour les demandes privées : transferts, itinéraires sur mesure, installations romantiques, séjours en famille et programmes de plusieurs jours depuis Marrakech ou Fès.",
      es: "Sí. Tanto el formulario de contacto como las notas de reserva están preparados para solicitudes privadas: traslados, rutas a medida, montajes románticos, viajes familiares y programas de varios días desde Marrakech o Fez.",
      ar: "نعم. نموذج التواصل وملاحظات الحجز كلاهما مهيآن للطلبات الخاصة مثل النقل من المطار، والمسارات المخصصة، والترتيبات الرومانسية، والإقامات العائلية، والبرامج متعددة الأيام من مراكش أو فاس."
    }
  },
  {
    question: {
      en: "How is pricing calculated on the booking page?",
      fr: "Comment le prix est-il calculé sur la page de réservation ?",
      es: "¿Cómo se calcula el precio en la página de reservas?",
      ar: "كيف يتم حساب السعر في صفحة الحجز؟"
    },
    answer: {
      en: "The booking flow supports per-person offers, per-night camp stays, and certain private routes priced per booking. Add-ons are then layered on top to give guests a transparent estimate before submission.",
      fr: "Le flux de réservation prend en charge les offres par personne, les séjours au camp par nuit, et certaines routes privées tarifées par réservation. Les options supplémentaires s’ajoutent ensuite pour fournir une estimation claire.",
      es: "El flujo de reserva admite ofertas por persona, estancias por noche en campamento y algunas rutas privadas con precio por reserva. Después se añaden extras para ofrecer una estimación clara antes del envío.",
      ar: "نظام الحجز يدعم العروض التي تُحسب للشخص، وإقامات المخيم التي تُحسب بالليلة، وبعض البرامج الخاصة التي تُسعّر للحجز بالكامل. بعد ذلك تُضاف الإضافات ليظهر للضيف تقدير واضح قبل الإرسال."
    }
  },
  {
    question: {
      en: "Will I receive a confirmation email after booking?",
      fr: "Vais-je recevoir un e-mail de confirmation après réservation ?",
      es: "¿Recibiré un correo de confirmación después de reservar?",
      ar: "هل سأتوصل برسالة تأكيد بعد الحجز؟"
    },
    answer: {
      en: "Yes. The architecture is prepared to send a professional customer confirmation and an owner notification email once Supabase and Resend environment variables are connected.",
      fr: "Oui. L’architecture est prête à envoyer un e-mail de confirmation au client et un e-mail de notification au propriétaire dès que Supabase et Resend sont connectés.",
      es: "Sí. La arquitectura está preparada para enviar un correo profesional al cliente y una notificación al propietario cuando conectes Supabase y Resend.",
      ar: "نعم. تم تجهيز النظام لإرسال رسالة تأكيد احترافية للعميل وإشعار للمالك بمجرد ربط Supabase وResend."
    }
  }
];
