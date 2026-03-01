"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Custom Web Apps",
    tag: "React / Next.js",
    points: [
      "Responsive, performant frontends",
      "Component libraries & design systems",
      "SEO-friendly SSR & SSG setups",
    ],
  },
  {
    title: "Mobile App Development",
    tag: "React Native / Expo",
    points: [
      "iOS & Android with single codebase",
      "Store-ready builds & updates",
      "Deep links, push notifications, auth",
    ],
  },
  {
    title: "Backend & APIs",
    tag: "Node.js / TypeScript",
    points: [
      "REST / GraphQL APIs",
      "Authentication & authorization",
      "Integration with third-party services",
    ],
  },
  {
    title: "Cloud & DevOps",
    tag: "AWS / GCP / Docker",
    points: [
      "CI/CD pipelines for fast releases",
      "Secure, scalable infrastructure",
      "Monitoring, logging & alerting",
    ],
  },
  {
    title: "Product Engineering",
    tag: "From idea to launch",
    points: [
      "Technical discovery & architecture",
      "Scoping and MVP planning",
      "Iterative delivery with feedback loops",
    ],
  },
  {
    title: "Maintenance & Support",
    tag: "Long-term partnership",
    points: [
      "Bug fixes & performance tuning",
      "Dependency & security updates",
      "Feature enhancements over time",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* HERO */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Services
            </p>

            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              We design, build and scale{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                digital products
              </span>
              .
            </h1>

            <p className="mt-4 text-sm md:text-base text-slate-700 dark:text-slate-300 max-w-xl">
              From first prototype to production, we handle web, mobile and
              cloud engineering so you can focus on the business and customers.
            </p>

            <div className="mt-5 flex flex-wrap gap-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-slate-600/80">
                Product engineering partner
              </span>
              <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-slate-600/80">
                Full-stack JavaScript
              </span>
              <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-slate-600/80">
                Web • Mobile • Cloud
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-5 md:p-6 shadow-2xl"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Typical engagement
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-800 dark:text-slate-200">
              <div className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <div>
                  <div className="font-medium">Discovery & planning</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    We clarify scope, constraints and success metrics together.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-yellow-400" />
                <div>
                  <div className="font-medium">Design & implementation</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    We build in iterations with frequent demos and feedback.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                <div>
                  <div className="font-medium">Launch & scale</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    We help deploy, monitor and evolve the product after launch.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="text-xl md:text-2xl font-semibold">What we offer</h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
            A focused set of services around modern JavaScript, React, React
            Native and cloud infrastructure.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="group rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 p-5 hover:-translate-y-1 hover:shadow-xl transition-transform"
              >
                <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {s.tag}
                </div>
                <div className="mt-1 text-base md:text-lg font-semibold">
                  {s.title}
                </div>
                <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-gray-700 dark:text-gray-300">
                  {s.points.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>

                <button className="mt-4 text-xs md:text-sm font-medium text-yellow-600 dark:text-yellow-400 group-hover:underline">
                  Discuss this service →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-950 border-y border-gray-200/70 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="text-xl md:text-2xl font-semibold">
            How we can work together
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
            Flexible models depending on whether you&apos;re validating an idea
            or scaling a product.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs md:text-sm">
            <div className="rounded-2xl bg-white dark:bg-gray-900 p-5 border border-gray-200 dark:border-gray-800">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                1. Fixed-scope
              </div>
              <div className="mt-2 font-semibold">MVP / feature delivery</div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Clear scope, timeline and budget. Ideal for well-defined
                projects.
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-gray-900 p-5 border border-gray-200 dark:border-gray-800">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                2. Dedicated team
              </div>
              <div className="mt-2 font-semibold">Extended product team</div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                We work as your remote engineering squad on a monthly basis.
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-gray-900 p-5 border border-gray-200 dark:border-gray-800">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                3. Consultation
              </div>
              <div className="mt-2 font-semibold">Architecture & reviews</div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Audits, technical direction and reviews for existing teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-yellow-50 dark:bg-yellow-900/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Have a project in mind?
            </h3>
            <p className="mt-1 text-sm md:text-base text-gray-700 dark:text-gray-200 max-w-xl">
              Share a short brief and we&apos;ll reply with a practical
              proposal, timelines and next steps.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className="px-5 py-2.5 rounded-lg bg-yellow-400 text-black text-sm font-semibold shadow-md"
            >
              Talk to us
            </a>
            <a
              href="/projects"
              className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm"
            >
              View projects
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
