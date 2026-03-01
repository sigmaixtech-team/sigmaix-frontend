"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* HERO */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              About Us
            </p>

            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              We are{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                Sigmaix Tech Innovations
              </span>
              .
            </h1>

            <p className="mt-4 text-sm md:text-base text-slate-700 dark:text-slate-300 max-w-xl">
              A product engineering team helping startups and businesses build
              reliable web and mobile applications using modern JavaScript,
              cloud-native platforms and solid engineering practices.
            </p>

            <div className="mt-6 flex flex-wrap gap-6 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <div>
                <div className="text-lg font-semibold text-yellow-500 dark:text-yellow-300">
                  5+ years
                </div>
                <div className="text-slate-500 dark:text-slate-400">
                  Product engineering
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold text-yellow-500 dark:text-yellow-300">
                  120+
                </div>
                <div className="text-slate-500 dark:text-slate-400">
                  Projects delivered
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold text-yellow-500 dark:text-yellow-300">
                  Full stack
                </div>
                <div className="text-slate-500 dark:text-slate-400">
                  Web • Mobile • Cloud
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative h-56 md:h-72 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
          >
            <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-yellow-300/30 dark:bg-yellow-400/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-indigo-300/30 dark:bg-indigo-500/10 blur-3xl" />

            <Image
              src="/images/team.jpg"
              alt="Technology visualization"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* WHO WE ARE / HOW WE WORK */}
      <section className="py-12 md:py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold">Who we are</h2>
            <p className="mt-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
              We are a small, focused engineering team that ships
              production-ready software. We care about code quality, performance
              and long-term maintainability — not just quick demos.
            </p>
            <p className="mt-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
              Our experience spans frontend, mobile apps, backend systems and
              cloud infrastructure, allowing us to own the entire product
              lifecycle from design to deployment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold">How we work</h2>
            <ul className="mt-3 space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <li>• We collaborate closely with founders and product teams.</li>
              <li>• We keep communication simple, honest and transparent.</li>
              <li>
                • We focus on priorities that actually move the product forward.
              </li>
              <li>• We ship in small, safe increments with CI/CD.</li>
              <li>
                • We think about observability, security and scalability from
                day one.
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO – CARDS */}
      <section className="py-12 md:py-14 bg-white dark:bg-gray-950 border-y border-gray-200/70 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="text-xl md:text-2xl font-semibold">What we do</h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
            End-to-end product development with a focus on speed, quality and
            maintainability.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Web apps",
                icon: "💻",
                lines: [
                  "React / Next.js frontends",
                  "Design systems & components",
                  "SEO-friendly, fast experiences",
                ],
              },
              {
                title: "Mobile apps",
                icon: "📱",
                lines: [
                  "React Native apps for iOS & Android",
                  "App store-ready builds",
                  "Shared logic with web when possible",
                ],
              },
              {
                title: "Cloud & backend",
                icon: "☁️",
                lines: [
                  "Node.js / TypeScript APIs",
                  "PostgreSQL / MongoDB data layers",
                  "Deployments on AWS / GCP",
                ],
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 p-5"
              >
                <div className="text-2xl">{card.icon}</div>
                <div className="mt-2 font-semibold">{card.title}</div>
                <ul className="mt-3 space-y-1 text-xs md:text-sm text-gray-700 dark:text-gray-300">
                  {card.lines.map((line) => (
                    <li key={line}>• {line}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-12 md:py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold">
              Our technology stack
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-xl">
              We prefer stable, well-supported tools over hype. Here are some of
              the technologies we use regularly.
            </p>

            <div className="mt-5 space-y-3 text-xs md:text-sm text-gray-800 dark:text-gray-200">
              <div>
                <div className="font-semibold mb-1">Frontend</div>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS"].map(
                    (t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800"
                      >
                        {t}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div>
                <div className="font-semibold mb-1">Mobile</div>
                <div className="flex flex-wrap gap-2">
                  {["React Native", "Expo"].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-semibold mb-1">Backend & data</div>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "REST / GraphQL", "PostgreSQL", "MongoDB"].map(
                    (t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800"
                      >
                        {t}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div>
                <div className="font-semibold mb-1">DevOps & tools</div>
                <div className="flex flex-wrap gap-2">
                  {["AWS / GCP", "Docker", "CI/CD", "GitHub"].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="relative h-64 rounded-2xl overflow-hidden shadow-lg bg-gray-100 dark:bg-slate-900"
          >
            <Image
              src="/images/tech.png"
              alt="Technology visualization"
              fill
              className="object-cover opacity-95"
            />
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-12 md:py-14 bg-gray-100 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="text-xl md:text-2xl font-semibold">Our process</h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
            Simple, predictable steps from idea to production.
          </p>

          <div className="mt-6 space-y-5">
            {[
              {
                step: "01",
                title: "Discovery & requirements",
                desc: "We understand your goals, constraints and existing systems to propose a practical plan.",
              },
              {
                step: "02",
                title: "Design & architecture",
                desc: "We define UX flows, component structure and technical architecture before heavy coding.",
              },
              {
                step: "03",
                title: "Implementation",
                desc: "We build in iterations, share progress frequently and keep the codebase clean and tested.",
              },
              {
                step: "04",
                title: "Launch & support",
                desc: "We help with deployment, monitoring, and continuous improvements post-launch.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="mt-1">
                  <div className="h-8 w-8 rounded-full bg-yellow-400 text-xs font-semibold flex items-center justify-center text-black">
                    {item.step}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm md:text-base">
                    {item.title}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-14 bg-yellow-50 dark:bg-yellow-900/10 border-t border-yellow-200/40 dark:border-yellow-900/40">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Ready to build your next product?
            </h3>
            <p className="mt-1 text-sm md:text-base text-gray-700 dark:text-gray-200 max-w-xl">
              Share a short brief and we&apos;ll get back with a practical,
              no-nonsense approach.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className="px-5 py-2.5 rounded-lg bg-yellow-400 text-black text-sm font-semibold shadow-md"
            >
              Contact us
            </a>
            <a
              href="/services"
              className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm"
            >
              Our services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
