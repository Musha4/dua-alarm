import type { MetadataRoute } from "next";

// PWA manifest — lets users "Add to Home Screen" so the app opens
// standalone (no browser chrome) at the app's home screen.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dua Alarm",
    short_name: "Dua Alarm",
    description: "The Islamic habit alarm — recite your dua to dismiss it.",
    start_url: "/app",
    display: "standalone",
    background_color: "#07130E",
    theme_color: "#0D241C",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
