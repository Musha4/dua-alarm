"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "@/lib/ab";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Event name to fire on click, e.g. "waitlist_cta_click". */
  event: string;
  /** Extra event props, e.g. { location: "header" }. */
  eventProps?: Record<string, unknown>;
  children: ReactNode;
};

/** An <a> that fires an analytics event on click — for CTAs inside
 *  server components (Header, HowItWorks, Faq). */
export default function TrackedLink({ event, eventProps, children, ...rest }: Props) {
  return (
    <a {...rest} onClick={() => trackEvent(event, eventProps)}>
      {children}
    </a>
  );
}
