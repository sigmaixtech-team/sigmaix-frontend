// lib/api.ts

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const API_ENDPOINTS = {
  contactInfo: `${API_BASE_URL}/api/contact-info`,
  enquiries: `${API_BASE_URL}/api/enquiries`,
  features: `${API_BASE_URL}/api/features`,
  testimonials: `${API_BASE_URL}/api/testimonials`,
  projects: `${API_BASE_URL}/api/projects`,
  upload: `${API_BASE_URL}/api/upload`,
  projectBySlug: (slug: string) => `${API_BASE_URL}/api/projects/${slug}`,
  login: `${API_BASE_URL}/api/auth/login`,
  profile: `${API_BASE_URL}/api/auth/profile`,
};
