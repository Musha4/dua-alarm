import type { Metadata, Viewport } from "next";
import AlarmScheduler from "@/components/app/AlarmScheduler";

export const metadata: Metadata = {
  title: "Dua Alarm — App",
  description: "Wake up with remembrance. Recite your dua to dismiss the alarm.",
  robots: { index: false }, // MVP app — keep out of search results
};

export const viewport: Viewport = {
  themeColor: "#0D241C",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* Watches the clock while the tab is open and fires due alarms */}
      <AlarmScheduler />
    </>
  );
}
