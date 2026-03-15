import type { Locale } from "@/types/locale";

export interface GalleryItem {
  key: string;
  caption: Record<Locale, string>;
  category: "camp" | "camel" | "quad" | "tour" | "atmosphere";
}

export const galleryItems: GalleryItem[] = [
  {
    key: "gallery01",
    category: "atmosphere",
    caption: {
      en: "The sculpted calm of the Erg Chebbi dunes before dusk.",
      fr: "Le calme sculpté des dunes d’Erg Chebbi avant le soir.",
      es: "La calma esculpida de las dunas de Erg Chebbi antes del atardecer.",
      ar: "هدوء كثبان إرڭ شبي قبل الغروب."
    }
  },
  {
    key: "gallery02",
    category: "camp",
    caption: {
      en: "A dinner atmosphere designed for private, memorable nights.",
      fr: "Une ambiance de dîner pensée pour des soirées privées et mémorables.",
      es: "Una atmósfera de cena pensada para noches privadas y memorables.",
      ar: "أجواء عشاء مصممة لليالٍ خاصة لا تُنسى."
    }
  },
  {
    key: "gallery03",
    category: "camp",
    caption: {
      en: "Warm lantern light that keeps the camp intimate after dark.",
      fr: "Une lumière de lanternes chaleureuse qui garde le camp intime la nuit.",
      es: "Una luz cálida de faroles que mantiene el campamento íntimo por la noche.",
      ar: "إضاءة فوانيس دافئة تمنح المخيم خصوصية بعد حلول الليل."
    }
  },
  {
    key: "gallery04",
    category: "camel",
    caption: {
      en: "Camel silhouettes turning a classic trek into a cinematic frame.",
      fr: "Des silhouettes de chameaux qui transforment la balade en image cinématographique.",
      es: "Siluetas de camellos que convierten el paseo en una escena cinematográfica.",
      ar: "ظلال الجمال التي تحول الرحلة الكلاسيكية إلى مشهد سينمائي."
    }
  },
  {
    key: "gallery05",
    category: "atmosphere",
    caption: {
      en: "Private moments are what make luxury desert travel feel personal.",
      fr: "Ce sont les moments privés qui rendent le désert vraiment personnel.",
      es: "Los momentos privados son los que hacen que el viaje al desierto se sienta personal.",
      ar: "اللحظات الخاصة هي التي تمنح الرحلة الصحراوية طابعها الشخصي."
    }
  },
  {
    key: "gallery06",
    category: "quad",
    caption: {
      en: "Adventure remains polished when the operator takes safety and pacing seriously.",
      fr: "L’aventure reste élégante quand l’opérateur prend la sécurité et le rythme au sérieux.",
      es: "La aventura sigue siendo cuidada cuando el operador se toma en serio la seguridad y el ritmo.",
      ar: "تبقى المغامرة راقية عندما يؤخذ الإيقاع والسلامة بجدية."
    }
  }
];
