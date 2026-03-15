export interface MediaAsset {
  key: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  className?: string;
}

export const mediaAssets: Record<string, MediaAsset> = {
  heroVideo: {
    key: "heroVideo",
    type: "video",
    src: "/media/hero/hero-desert.mp4",
    poster: "/media/hero/hero-poster.jpg",
    alt: "Luxury desert hero video placeholder for Erg Chebbi Luxury"
  },
  camp01: {
    key: "camp01",
    type: "image",
    src: "/media/camp/luxury-camp-01.jpg",
    alt: "Luxury camp exterior in Erg Chebbi"
  },
  camp02: {
    key: "camp02",
    type: "image",
    src: "/media/camp/luxury-camp-02.jpg",
    alt: "Luxury tent interior with warm desert tones"
  },
  camel01: {
    key: "camel01",
    type: "image",
    src: "/media/camel/camel-sunset-01.jpg",
    alt: "Camel ride at sunset over Merzouga dunes"
  },
  camel02: {
    key: "camel02",
    type: "image",
    src: "/media/camel/camel-sunrise-01.jpg",
    alt: "Camel silhouette at sunrise in Erg Chebbi"
  },
  quad01: {
    key: "quad01",
    type: "image",
    src: "/media/quad/quad-ride-01.jpg",
    alt: "Quad biking through the dunes of Merzouga"
  },
  quad02: {
    key: "quad02",
    type: "image",
    src: "/media/quad/quad-ride-02.jpg",
    alt: "ATV riders crossing the desert"
  },
  tour01: {
    key: "tour01",
    type: "image",
    src: "/media/tours/4x4-private-01.jpg",
    alt: "Private 4x4 tour in Erg Chebbi"
  },
  tour02: {
    key: "tour02",
    type: "image",
    src: "/media/tours/private-desert-day-01.jpg",
    alt: "Private desert exploration day in Merzouga"
  },
  gallery01: {
    key: "gallery01",
    type: "image",
    src: "/media/gallery/gallery-01.jpg",
    alt: "Golden dunes at sunset in Erg Chebbi"
  },
  gallery02: {
    key: "gallery02",
    type: "image",
    src: "/media/gallery/gallery-02.jpg",
    alt: "Luxury dinner setup in the Sahara"
  },
  gallery03: {
    key: "gallery03",
    type: "image",
    src: "/media/gallery/gallery-03.jpg",
    alt: "Camp lanterns at night in Merzouga"
  },
  gallery04: {
    key: "gallery04",
    type: "image",
    src: "/media/gallery/gallery-04.jpg",
    alt: "Camel caravan crossing the dunes"
  },
  gallery05: {
    key: "gallery05",
    type: "image",
    src: "/media/gallery/gallery-05.jpg",
    alt: "Couple enjoying private desert time"
  },
  gallery06: {
    key: "gallery06",
    type: "image",
    src: "/media/gallery/gallery-06.jpg",
    alt: "Quad bikes prepared for a Merzouga ride"
  }
};

export function getMediaAsset(key: string) {
  return mediaAssets[key];
}
