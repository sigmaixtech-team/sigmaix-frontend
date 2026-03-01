import WebServicesPage from "@/features/service/WebServicesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Application Development",
  description:
    "Modern web application development with React, Next.js and TypeScript. We build responsive, SEO-friendly and scalable frontends integrated with robust backends.",
  alternates: {
    canonical: "/services/web",
  },
  openGraph: {
    title: "Web Application Development | Sigmaix Tech",
    description:
      "Custom web apps, dashboards and internal tools built with React, Next.js, Node.js and modern cloud infrastructure.",
    url: "/services/web",
  },
};

export default function WebServicesRoute() {
  return <WebServicesPage />;
}
