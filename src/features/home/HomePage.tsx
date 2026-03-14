"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Project } from "@/data/projects";
import { API_ENDPOINTS } from "../../../lib/api";

interface Feature {
  title: string;
  desc: string;
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

interface ContactInfo {
  email: string;
  phone: string;
}

/* ===== Animated Stat Card ===== */
function Stat({
  value,
  suffix = "",
  label,
  icon,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  icon: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, value, {
      duration: 1.4,
      delay,
      ease: "easeOut",
    });

    return controls.stop;
  }, [isInView, value, delay, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative group px-5 py-4 rounded-xl bg-white dark:bg-gray-800 border border-yellow-400/20 shadow-sm hover:shadow-yellow-400/30 transition"
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/10 via-pink-500/10 to-indigo-500/10 blur-lg opacity-0 group-hover:opacity-100 transition" />

      <div className="relative flex items-center gap-3">
        <div className="text-yellow-500">{icon}</div>
        <div>
          <div className="text-2xl font-semibold">
            <motion.span>{rounded}</motion.span>
            {suffix}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ===== Icons ===== */
const ProjectIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3h7v7H3zM14 14h7v7h-7zM14 3h7v7h-7zM3 14h7v7H3z" />
  </svg>
);

const TeamIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5 13 6.34 13 8s1.34 3 3 3z" />
    <path d="M8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3z" />
    <path d="M2 21c0-4 6-6 6-6s6 2 6 6" />
    <path d="M14 21c0-2.2 2.5-4 5-5" />
  </svg>
);

const ClockIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6l4 2" />
  </svg>
);

export default function HomePage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    fetch(API_ENDPOINTS.features)
      .then((res) => res.json())
      .then((data) => setFeatures(data))
      .catch((err) => console.error(err));

    fetch(API_ENDPOINTS.testimonials)
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error(err));

    fetch(API_ENDPOINTS.projects)
      .then((res) => res.json())
      .then((data) => setRecentProjects(data.slice(0, 3)))
      .catch((err) => console.error(err));

    fetch(API_ENDPOINTS.contactInfo)
      .then((res) => res.json())
      .then((data) => setContactInfo(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-8xl mx-auto px-8 md:px-8">
      {/* HERO */}
      <section className="pt-8 md:pt-14 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 md:min-h-[78vh] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start w-full">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.48 }}
              className="flex flex-col gap-6"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                We build{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                  delightful digital products
                </span>{" "}
                for web & mobile
              </h1>

              {/* Gradient Line & Setup */}
              <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 uppercase mt-2">
                <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"></div>
                DESIGN • BUILD • SCALE
              </div>

              {/* Description Paragraph */}
              <p className="text-gray-600 dark:text-gray-300 md:text-lg max-w-xl leading-relaxed mt-2">
                We engineer intelligence. We secure trust. We power decentralization. Through advanced AI and Blockchain solutions, we transform complex challenges into smart, transparent, and scalable digital success.
              </p>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl text-sm">
                <Stat
                  value={120}
                  suffix="+"
                  label="Projects delivered"
                  icon={<ProjectIcon />}
                />
                <Stat
                  value={45}
                  label="Team members"
                  icon={<TeamIcon />}
                  delay={0.1}
                />
                <Stat
                  value={8}
                  suffix=" yrs"
                  label="Average experience"
                  icon={<ClockIcon />}
                  delay={0.2}
                />
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
                >
                  Work with us
                </Link>
                <Link
                  href="/projects"
                  className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  View projects
                </Link>
              </div>
            </motion.div>

            {/* RIGHT LOGO */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full flex items-center justify-center min-h-[400px] mt-2 lg:mt-0"
            >
              {/* Spinning Circle Behind Logo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-gray-200 dark:border-gray-700/50 bg-gray-50/50 dark:bg-[#14141e]/50"
                style={{
                  boxShadow: "inset 0 0 40px rgba(0,0,0,0.1), 0 0 40px rgba(0,0,0,0.05)"
                }}
              >
                {/* A small glowing dot on the circle ring to make the spin more visible */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.8)]"></div>
              </motion.div>

              {/* Logo (Static) */}
              <div className="relative w-32 h-32 md:w-48 md:h-48 z-10">
                <Image
                  src="/images/newLogo.png"
                  alt="Sigmaix Tech logo"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMBINED FEATURES & PROJECTS */}
      <section className="py-16 bg-[#0B0F19] text-white w-full rounded-tr-3xl rounded-tl-3xl mt-8">
        <div className="max-w-7xl mx-auto space-y-16 px-6 md:px-8">
          {/* FEATURES / What we do */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">What we do</h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm md:text-base">
              End-to-end product development with emphasis on speed, reliability and maintainability.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="p-6 bg-[#1f242f] rounded-2xl border border-gray-700/50 hover:bg-[#252b38] transition"
                >
                  <div className="text-lg font-semibold text-white">{f.title}</div>
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECTS / Recent projects */}
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Recent projects</h2>
              <Link href="/projects" className="text-yellow-500 hover:text-yellow-400 font-semibold text-sm transition">
                See all
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="block rounded-2xl overflow-hidden bg-[#1f242f] border border-gray-700/50 hover:border-gray-600 transition group flex flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={p.coverImg}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="text-lg font-semibold text-white">{p.title}</div>
                    <div className="text-sm mt-2 text-gray-400 leading-relaxed line-clamp-2">{p.shortDesc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-semibold">
              Sigmaix Tech Innovations Pvt Ltd
            </div>
            <div className="mt-2">Building apps and platforms with care.</div>
          </div>

          <div>
            <div className="font-medium">Contact</div>
            <div className="mt-2">{contactInfo?.email}</div>
            <div className="mt-1">{contactInfo?.phone}</div>
          </div>

          <div>
            <div className="font-medium">Quick links</div>
            <div className="mt-2 flex flex-col gap-2">
              <Link href="/about">About</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Sigmaix Tech Innovations Pvt Ltd.
        </div>
      </footer>
    </div>
  );
}
