// src/app/(marketing)/page.tsx
import type { Metadata } from "next";
import HomePage from "@/features/home/HomePage";

export const metadata: Metadata = {
  title: "Product Engineering for Web & Mobile",
  description:
    "Sigmaix Tech builds modern web and mobile applications using React, React Native, TypeScript and cloud-native backends. From MVPs to production systems.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Product Engineering for Web & Mobile | Sigmaix Tech",
    description:
      "End-to-end product engineering: web apps, mobile apps, APIs and cloud infrastructure.",
    url: "/",
  },
};

export default function Home() {
  return <HomePage />;
}
