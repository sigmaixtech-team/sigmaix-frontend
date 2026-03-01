export interface Project {
    slug: string;
    title: string;
    type: string;
    shortDesc: string;
    fullDesc: string;
    challenge: string;
    solution: string;
    stack: string[];
    results: string[];
    coverImg: string;
    images: string[];
    client?: string;
    role?: string;
    year?: string;
    liveUrl?: string;
}

export const projects: Project[] = [
    {
        slug: "fintech-dashboard",
        title: "PayFlow Dashboard",
        type: "Web Application",
        shortDesc: "A secure financial analytics platform with real-time reporting.",
        fullDesc:
            "PayFlow is a comprehensive financial analytics dashboard designed for high-volume transaction monitoring. It provides real-time insights into revenue streams, transaction statuses, and user behaviors, allowing stakeholders to make data-driven decisions instantly.",
        challenge:
            "The client needed to visualize millions of transactions in real-time without compromising performance. Existing off-the-shelf solutions were too slow and lacked the specific role-based access controls required for their compliance standards.",
        solution:
            "We built a custom dashboard using Next.js for server-side rendering and swift initial loads. We utilized SWR for efficient data fetching and caching. For the heavy lifting, we optimized PostgreSQL queries and implemented a dedicated Node.js aggregation service.",
        stack: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
        results: [
            "Reduced report generation time by 42%",
            "Handles 50k+ concurrent websocket connections",
            "Zero downtime during deployment",
        ],
        coverImg:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        ],
        client: "PayFlow Inc.",
        role: "Full Stack Development",
        year: "2024",
    },
    {
        slug: "ecommerce-mobile-app",
        title: "ShopEasy Mobile",
        type: "Mobile Application",
        shortDesc: "Cross-platform Customer app with payments and order tracking.",
        fullDesc:
            "ShopEasy is a feature-rich mobile application for a leading fashion retailer. It bridges the gap between online browsing and in-store loyalty, offering a seamless omnichannel experience.",
        challenge:
            "The goal was to launch on both iOS and Android simultaneously with a limited budget and timeline. The app needed to support complex product variations, real-time inventory checks, and multiple payment gateways.",
        solution:
            "We chose React Native with Expo to maximize code reuse. We implemented a robust state management layer to handle cart complexity and integrated Stripe and PayPal. We also used Firebase Cloud Messaging for personalized push notifications.",
        stack: ["React Native", "Expo", "Firebase", "Redux", "Stripe"],
        results: [
            "4.8/5 avg rating on App Stores",
            "5,000+ monthly active users within 3 months",
            "25% increase in repeat purchases",
        ],
        coverImg:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?auto=format&fit=crop&w=800&q=80",
        ],
        client: "ShopEasy Retail",
        role: "Mobile Engineering",
        year: "2023",
    },
    {
        slug: "healthcare-scheduling",
        title: "MediSchedule",
        type: "Web Platform",
        shortDesc: "Patient scheduling and internal management system.",
        fullDesc:
            "MediSchedule simplifies the complex coordination between doctors, patients, and rooms. It auto-suggests slots based on equipment availability and doctor specializations.",
        challenge:
            "Manual scheduling led to double-bookings and long patient wait times. The system needed to be HIPPA compliant and integrate with legacy EMR systems.",
        solution:
            "Developed a secure, role-based scheduling engine using NestJS. The frontend uses React with a custom calendar implementation for drag-and-drop ease. All data is encrypted at rest and in transit.",
        stack: ["React", "TypeScript", "NestJS", "MongoDB", "Docker"],
        results: [
            "80% reduction in manual scheduling workload",
            "Eliminated double-booking incidents completely",
            "Reduced patient wait time by 15 mins avg",
        ],
        coverImg:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
        ],
        client: "City Health Network",
        role: "System Architecture",
        year: "2024",
    },
    {
        slug: "logistics-tool",
        title: "FleetTrack Pro",
        type: "Enterprise Web Tool",
        shortDesc: "Route planning and operations dashboard.",
        fullDesc:
            "FleetTrack Pro enables logistics managers to track vehicle locations, optimize delivery routes, and manage fuel consumption in real-time.",
        challenge:
            "Rising fuel costs and inefficient routes were eating into margins. Drivers communicated via phone, leading to delays and lack of accountability.",
        solution:
            "We built a map-centric dashboard using Mapbox GL. The backend processes telemetry data from IoT devices in trucks. An algorithm auto-optimizes routes based on traffic and delivery windows.",
        stack: ["Node.js", "AWS Lambda", "PostgreSQL", "Mapbox", "React"],
        results: [
            "Improved delivery SLA by 35%",
            "Reduced fuel consumption by 12%",
            "Real-time visibility for 200+ trucks",
        ],
        coverImg:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80",
        ],
        client: "Global Logistics Co.",
        role: "Backend & DevOps",
        year: "2023",
    },
    {
        slug: "learning-platform",
        title: "EduSpace LMS",
        type: "Education Platform",
        shortDesc: "Platform for managing courses, users and video lessons.",
        fullDesc:
            "EduSpace is a modern Learning Management System that focuses on student engagement. It features interactive quizzes, progress tracking, and peer-to-peer discussion forums.",
        challenge:
            "The client wanted to move away from clunky legacy LMS platforms. Key requirements were video streaming quality, easy content creation for teachers, and seamless payments.",
        solution:
            "We utilized Mux for adaptive video streaming. Content is served via a global CDN. Stripe Connect was integrated for revenue sharing with instructors. The UI is built with Tailwind for a fresh, accessible feel.",
        stack: ["Next.js", "Tailwind CSS", "Stripe", "Prisma", "Mux"],
        results: [
            "2x increase in course enrollments year-over-year",
            "User session time increased by 40%",
            "Onboarded 500+ instructors",
        ],
        coverImg:
            "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        ],
        client: "EduTech Ventures",
        role: "Full Product Development",
        year: "2024",
    },
    {
        slug: "chat-app",
        title: "ConnectLive",
        type: "Communication Platform",
        shortDesc: "Real-time messaging system with active status tracking.",
        fullDesc:
            "ConnectLive is a standalone communication tool designed for remote teams. It supports channels, direct messages, file sharing, and video calls.",
        challenge:
            "Latency and message delivery guarantees were the biggest technical hurdles. The UI needed to feel 'instant' to compete with market leaders.",
        solution:
            "We architected a WebSocket server using Socket.io and Redis for pub/sub. Messages are persisted in Cassandra for high write throughput. The frontend uses optimistic UI updates to ensure responsiveness.",
        stack: ["React", "Socket.io", "Redis", "Cassandra", "WebRTC"],
        results: [
            "99.9% uptime maintained",
            "<50ms average message delivery latency",
            "Supports 10k+ concurrent users",
        ],
        coverImg:
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?auto=format&fit=crop&w=800&q=80",
        ],
        client: "RemoteFirst Inc.",
        role: "Backend Architect",
        year: "2023",
    },
];
