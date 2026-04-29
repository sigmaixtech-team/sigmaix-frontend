const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://sigmaix.io";

export const API_ENDPOINTS = {
  contactInfo: `${BASE_URL}/api/contact-info`,
  enquiries: `${BASE_URL}/api/enquiries`,
  features: `${BASE_URL}/api/features`,
  testimonials: `${BASE_URL}/api/testimonials`,
  projects: `${BASE_URL}/api/projects`,
  upload: `${BASE_URL}/api/upload`,
  projectBySlug: (slug: string) => `${BASE_URL}/api/projects/${slug}`,
  login: `${BASE_URL}/api/auth/login`,
  profile: `${BASE_URL}/api/auth/profile`,
};
