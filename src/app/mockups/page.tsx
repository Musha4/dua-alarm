import type { Metadata } from "next";
import IPhoneFrame from "@/components/mockups/IPhoneFrame";
import {
  SplashScreen,
  Onboarding1,
  Onboarding2,
  Onboarding3,
} from "@/components/mockups/ScreensIntro";
import {
  HomeScreen,
  CreateAlarmScreen,
  DuaSelectionScreen,
} from "@/components/mockups/ScreensCore";
import {
  AlarmRingingScreen,
  ListeningScreen,
  SuccessScreen,
} from "@/components/mockups/ScreensAlarm";
import {
  StreakScreen,
  PremiumScreen,
} from "@/components/mockups/ScreensGrowth";

export const metadata: Metadata = {
  title: "App Mockups — Dua Alarm",
  description: "High-fidelity iPhone screens for marketing and App Store assets.",
  robots: { index: false }, // internal marketing asset, not for search engines
};

const screens: { label: string; time?: string; node: React.ReactNode }[] = [
  { label: "01 · Splash", node: <SplashScreen /> },
  { label: "02 · Onboarding — Habit", node: <Onboarding1 /> },
  { label: "03 · Onboarding — Morning", node: <Onboarding2 /> },
  { label: "04 · Onboarding — Bedtime", node: <Onboarding3 /> },
  { label: "05 · Home", node: <HomeScreen /> },
  { label: "06 · Create Alarm", node: <CreateAlarmScreen /> },
  { label: "07 · Choose Dua", node: <DuaSelectionScreen /> },
  { label: "08 · Alarm Ringing", time: "6:30", node: <AlarmRingingScreen /> },
  { label: "09 · Listening", time: "6:31", node: <ListeningScreen /> },
  { label: "10 · Success", time: "6:32", node: <SuccessScreen /> },
  { label: "11 · Streaks", node: <StreakScreen /> },
  { label: "12 · Premium", node: <PremiumScreen /> },
];

export default function MockupsPage() {
  return (
    <main className="min-h-screen bg-[#0B0D0C] px-8 py-16">
      <div className="mx-auto max-w-[1760px]">
        <header className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A227]">
            Internal · Marketing assets
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-[#F7F1E3]">
            Dua Alarm — App Mockups
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/40">
            Twelve high-fidelity iPhone screens for the landing page, App Store
            previews, social posts, and investor decks. Screenshot any frame
            directly — each renders at iPhone-native proportions.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-16">
          {screens.map((screen) => (
            <IPhoneFrame
              key={screen.label}
              label={screen.label}
              statusTime={screen.time ?? "9:41"}
            >
              {screen.node}
            </IPhoneFrame>
          ))}
        </div>
      </div>
    </main>
  );
}
