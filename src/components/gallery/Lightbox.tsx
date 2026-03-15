"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { MediaFrame } from "@/components/shared/MediaFrame";
import type { MediaAsset } from "@/content/media";

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  item: { caption: string; media?: MediaAsset } | null;
}

export function GalleryLightbox({ open, onClose, item }: LightboxProps) {
  return (
    <AnimatePresence>
      {open && item ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-ivory"
          >
            <X className="h-5 w-5" />
          </button>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-5xl"
          >
            <MediaFrame media={item.media} className="aspect-[16/10]" />
            <div className="mt-4 rounded-[24px] border border-white/10 bg-[#121117] p-5 text-sm leading-7 text-[#e6dac6]">
              {item.caption}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
