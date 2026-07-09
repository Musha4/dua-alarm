"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAlarms, updateAlarm, todayKey, type Alarm } from "@/lib/app/store";

// ============================================================
// Client-side alarm scheduler (MVP)
// ============================================================
// Checks every few seconds whether an alarm is due and, if so, routes to
// the ring screen and shows a browser notification.
//
// ⚠️ MVP LIMITATION: browsers cannot wake a closed tab. Alarms only ring
// while the app tab is open (foreground or background). The Home screen
// tells the user this.
//
// TO UPGRADE TO REAL ALARMS LATER:
//  - Wrap the app with Capacitor and use @capacitor/local-notifications
//    to schedule OS-level alarms that fire with the app closed, OR
//  - Ship a native app and schedule UNNotificationRequest (iOS) /
//    AlarmManager (Android), OR
//  - For web push (server-initiated), add a service worker + Supabase
//    Edge Function cron that sends Web Push at alarm time.

const CHECK_MS = 5000;

function isDue(alarm: Alarm, now: Date): boolean {
  if (!alarm.enabled) return false;
  if (alarm.snoozedUntil) return now.getTime() >= alarm.snoozedUntil;
  const [h, m] = alarm.time.split(":").map(Number);
  return (
    now.getHours() === h &&
    now.getMinutes() === m &&
    alarm.lastFiredDate !== todayKey()
  );
}

export default function AlarmScheduler() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setInterval(() => {
      // Never interrupt an alarm that is already ringing.
      if (window.location.pathname.startsWith("/app/ring")) return;

      const now = new Date();
      const due = getAlarms().find((a) => isDue(a, now));
      if (!due) return;

      updateAlarm({
        ...due,
        snoozedUntil: undefined,
        lastFiredDate: todayKey(),
        enabled: due.repeat === "once" ? false : due.enabled,
      });

      if (typeof Notification !== "undefined" && Notification.permission === "granted") {
        new Notification("Dua Alarm", {
          body: "Your alarm is ringing — recite your dua to dismiss it.",
        });
      }

      router.push(`/app/ring?id=${due.id}`);
    }, CHECK_MS);

    return () => clearInterval(timer);
  }, [router, pathname]);

  return null;
}
