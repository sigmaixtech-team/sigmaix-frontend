"use client";

import { motion } from "framer-motion";

export default function MobileServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* HERO */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Services / Mobile
            </p>

            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              <span className="text-slate-900 dark:text-white">
                Native-feel
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                Mobile Applications
              </span>{" "}
              <span className="text-slate-900 dark:text-white">
                with React Native
              </span>
            </h1>

            <p className="mt-4 text-sm md:text-base text-slate-700 dark:text-slate-300 max-w-xl">
              We build iOS and Android apps using React Native and Expo, with
              smooth UX and integration into your existing APIs and systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-5 md:p-6 shadow-2xl text-sm text-slate-800 dark:text-slate-200"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              We can help you with
            </div>
            <ul className="mt-3 space-y-1.5">
              <li>• New mobile product from scratch</li>
              <li>• Bringing web products to mobile</li>
              <li>• Rebuilding old apps with modern stack</li>
              <li>• Adding features and maintenance to existing apps</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold">What you get</h2>
            <ul className="mt-3 space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <li>• iOS and Android builds from a single codebase</li>
              <li>• Smooth navigation, animations and native-like feel</li>
              <li>• Auth, push notifications, deep links integration</li>
              <li>
                • API integration with your backend or third-party services
              </li>
              <li>• Store submission support and basic analytics</li>
            </ul>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.06 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold">Tech stack</h2>
            <div className="mt-4 space-y-3 text-xs md:text-sm text-gray-800 dark:text-gray-200">
              <div>
                <div className="font-semibold mb-1">Mobile</div>
                <div className="flex flex-wrap gap-2">
                  {["React Native", "Expo", "TypeScript"].map((t) => (
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
                <div className="font-semibold mb-1">Backend & services</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "REST / GraphQL APIs",
                    "Firebase",
                    "Push notifications",
                    "Payments (Stripe etc.)",
                  ].map((t) => (
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
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-950 border-y border-gray-200/70 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="text-xl md:text-2xl font-semibold">
            Mobile app delivery flow
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-5 text-xs md:text-sm text-gray-700 dark:text-gray-300">
            {[
              ["01", "Flows & UX", "We map out screens, flows and navigation."],
              [
                "02",
                "Prototype",
                "We build a working demo to validate UX early.",
              ],
              [
                "03",
                "Build & integrate",
                "We connect APIs, auth, storage and push notifications.",
              ],
              ["04", "Release", "We prepare store builds and support rollout."],
            ].map(([step, title, desc]) => (
              <div key={step} className="flex gap-3">
                <div className="mt-1">
                  <div className="h-7 w-7 rounded-full bg-yellow-400 text-[11px] font-semibold flex items-center justify-center text-black">
                    {step}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">{title}</div>
                  <div className="text-[11px] md:text-xs mt-1">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-yellow-50 dark:bg-yellow-900/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Planning a mobile app?
            </h3>
            <p className="mt-1 text-sm md:text-base text-gray-700 dark:text-gray-200 max-w-xl">
              We can help with architecture, UX and implementation from idea to
              app store.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center justify-center
  px-7 py-3 rounded-full
  bg-amber-400 text-slate-950 text-sm font-semibold
  shadow-[0_14px_40px_rgba(0,0,0,0.65)]
  hover:bg-amber-300 hover:-translate-y-0.5
  active:translate-y-0
  transition-transform transition-colors duration-150
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Discuss a mobile project
          </a>
        </div>
      </section>
    </div>
  );
}
