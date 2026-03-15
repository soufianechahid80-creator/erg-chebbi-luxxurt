export const siteConfig = {
  name: "Erg Chebbi Luxury",
  domain: "ergchebbiluxury.com",
  email: "soufianechahid80@gmail.com",
  ownerEmail: "soufianechahid80@gmail.com",
  whatsapp: "+212 691999897",
  whatsappUrl: "https://wa.me/212691999897",
  instagram:
    "https://www.instagram.com/positano_store1?igsh=MTdybmxxaXozOHhkcw%3D%3D&utm_source=qr",
  facebook: "https://www.facebook.com/share/18MJ4h2CHG/?mibextid=wwXIfr",
  tiktok: "https://www.tiktok.com/@soufiane_ft10?_r=1&_t=ZN-94ghEwiTHDK",
  location: "Merzouga, Erg Chebbi, Morocco",
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000",
  defaultLocale: "en",
  currency: "EUR"
} as const;

export const siteKeywords = [
  "Merzouga luxury camp",
  "Erg Chebbi desert tours",
  "Morocco luxury desert experience",
  "camel trekking Merzouga",
  "quad biking Erg Chebbi",
  "private 4x4 desert tours Morocco",
  "Sahara booking website",
  "luxury camp Merzouga"
];
