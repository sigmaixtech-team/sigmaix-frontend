import MobileServicesPage from "@/features/service/MobileServicesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Development",
  description:
    "Cross-platform mobile app development using React Native and Expo. We build native-feel apps for iOS and Android with smooth UX and API integrations.",
  alternates: {
    canonical: "/services/mobile",
  },
  openGraph: {
    title: "Mobile App Development | Sigmaix Tech",
    description:
      "React Native mobile applications with auth, notifications, deep links and API integrations for modern products.",
    url: "/services/mobile",
  },
};

export default function MobileServicesRoute() {
  return <MobileServicesPage />;
}
