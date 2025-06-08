// In App.tsx or a top-level component
import { useEffect } from "react";

export function useGoogleFontsLink() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      const id = "google-fonts-link";
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600;700;800&family=Gelasio:wght@600;700&family=Playfair+Display:wght@700;800&family=Paytone+One&display=swap";
        document.head.appendChild(link);
      }
    }
  }, []);
}
