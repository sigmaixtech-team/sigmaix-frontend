import ServicesPage from "@/features/service/ServicesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services – Web, Mobile & Cloud Engineering",
  description:
    "Sigmaix Tech offers end-to-end services for web applications, mobile apps, backend APIs and cloud infrastructure using React, React Native, Node.js and modern DevOps.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Sigmaix Tech",
    description:
      "Web, mobile and cloud engineering services for startups and businesses. React, React Native, Node.js, TypeScript and cloud-native stacks.",
    url: "/services",
  },
};

export default function ServicesRoute() {
  return <ServicesPage />;
}
