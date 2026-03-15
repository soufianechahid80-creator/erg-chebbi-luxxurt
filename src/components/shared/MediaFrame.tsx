"use client";

import { useState } from "react";
import type { MediaAsset } from "@/content/media";
import { cn } from "@/lib/utils";

interface MediaFrameProps {
  media?: MediaAsset;
  alt?: string;
  className?: string;
  priorityVideo?: boolean;
}

export function MediaFrame({ media, alt, className, priorityVideo = false }: MediaFrameProps) {
  const [failed, setFailed] = useState(false);

  if (!media || failed) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-[28px] border border-white/10 bg-mesh-desert",
          className
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(202,168,106,0.28),transparent_35%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="relative flex h-full min-h-[320px] items-end p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-sand">Media slot</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#e8dcc6]">
              Replace this placeholder with your own licensed desert photography or hero video.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <div className={cn("overflow-hidden rounded-[28px] border border-white/10 bg-black", className)}>
        <video
          className="h-full w-full object-cover"
          autoPlay={priorityVideo}
          muted
          loop
          playsInline
          poster={media.poster}
          onError={() => setFailed(true)}
        >
          <source src={media.src} />
        </video>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-[28px] border border-white/10 bg-black", className)}>
      <img
        src={media.src}
        alt={alt || media.alt}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
