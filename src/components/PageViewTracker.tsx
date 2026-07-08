"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/ab";

/**
 * Fires a `page_view` event (with the visitor's headline variant attached)
 * on every route change. Vercel Analytics and Google Analytics also record
 * page views on their own — this event exists so page views show up in the
 * same console/event stream as everything else, attributed to a variant.
 */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("page_view", { path: pathname });
  }, [pathname]);

  return null;
}
