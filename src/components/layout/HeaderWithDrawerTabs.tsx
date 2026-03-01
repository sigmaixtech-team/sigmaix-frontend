"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TabId = "services" | "work" | "about";

const tabs: { id: TabId; label: string }[] = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
];

export default function HeaderWithDrawerTabs() {
  const [activeTab, setActiveTab] = useState<TabId | null>(null);

  const toggleTab = (id: TabId) => {
    setActiveTab((prev) => (prev === id ? null : id));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* TOP ROW: logo + drawer-like tabs */}
        <div className="flex items-center justify-between h-16">
          <div className="font-semibold text-lg tracking-tight">
            Sigmaix<span className="text-emerald-400">Tech</span>
          </div>

          {/* Tabs that look like a drawer control */}
          <nav className="hidden md:flex items-center gap-2 bg-slate-900/70 rounded-full px-2 py-1 border border-slate-800/70">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => toggleTab(tab.id)}
                  className="relative px-3 py-1.5 text-sm font-medium rounded-full overflow-hidden"
                >
                  {isActive && (
                    <motion.span
                      layoutId="tabDrawerBg"
                      className="absolute inset-0 rounded-full bg-slate-800"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 26,
                      }}
                    />
                  )}
                  <span className="relative z-10 text-slate-200">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* DRAWER PANEL UNDER HEADER */}
        <AnimatePresence initial={false}>
          {activeTab && (
            <motion.div
              key={activeTab}
              initial={{ height: 0, opacity: 0, y: -8 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden border-t border-slate-800/70"
            >
              <div className="py-4 md:py-5">
                {activeTab === "services" && (
                  <div className="grid gap-3 md:grid-cols-3 text-sm text-slate-200">
                    <DrawerItem title="Custom Web Apps">
                      React / Next.js, dashboards, admin panels, SEO-friendly
                      sites.
                    </DrawerItem>
                    <DrawerItem title="Mobile Apps">
                      React Native / Expo for iOS & Android, app store ready.
                    </DrawerItem>
                    <DrawerItem title="Cloud & DevOps">
                      CI/CD, Docker, Kubernetes, scalable infra.
                    </DrawerItem>
                  </div>
                )}

                {activeTab === "work" && (
                  <div className="text-sm text-slate-200 space-y-2">
                    <p className="font-medium text-slate-100">
                      Recent projects
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      <li>SaaS analytics dashboard</li>
                      <li>Fintech mobile app (React Native)</li>
                      <li>Landing pages with A/B testing</li>
                    </ul>
                  </div>
                )}

                {activeTab === "about" && (
                  <div className="text-sm text-slate-200 space-y-2">
                    <p className="font-medium text-slate-100">
                      About Sigmaix Tech
                    </p>
                    <p className="text-slate-300">
                      I build modern, fast, and production-ready web & mobile
                      apps for startups and small businesses. Clean code, clear
                      communication, and predictable delivery.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function DrawerItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 px-3 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
        {title}
      </p>
      <p className="text-slate-300 text-xs leading-relaxed">{children}</p>
    </div>
  );
}
