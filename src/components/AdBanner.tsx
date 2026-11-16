"use client";

import React, { useEffect } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  label?: string;
}

export default function AdBanner({
  slot = "1234567890",
  format = "auto",
  className = "",
  label = "Sponsored Advertisement",
}: AdBannerProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      // AdSense script might be blocked by ad blocker
    }
  }, []);

  const isProduction = process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <aside aria-label={label} className={`ad-banner my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-center ${className}`}>
      <span className="block text-[11px] font-medium tracking-wider uppercase text-slate-400 mb-2">
        {label}
      </span>
      {isProduction ? (
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[90px] border border-dashed border-slate-300 rounded-lg p-4 bg-white/60 text-slate-500 text-xs">
          <span className="font-semibold text-slate-700">Google AdSense Placement Slot</span>
          <span className="text-[11px] text-slate-400 mt-1">
            Format: {format} | Slot ID: {slot}
          </span>
          <span className="text-[10px] text-emerald-600 mt-1">
            (Live ads activate automatically once your AdSense Client ID is added)
          </span>
        </div>
      )}
    </aside>
  );
}

