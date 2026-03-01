import CloudServicesPage from "@/features/service/CloudServicesPage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cloud & DevOps Services",
  description:
    "Cloud-native infrastructure and DevOps services: AWS, GCP, Docker, CI/CD pipelines, monitoring and logging for scalable applications.",
  alternates: {
    canonical: "/services/cloud",
  },
  openGraph: {
    title: "Cloud & DevOps | Sigmaix Tech",
    description:
      "Design and implement cloud infrastructure, CI/CD pipelines and observability for reliable product deployments.",
    url: "/services/cloud",
  },
};

export default function CloudServicesRoute() {
  return <CloudServicesPage />;
}
