"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../../../../lib/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.projects);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* HERO */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight"
          >
            <span className="text-slate-900 dark:text-white">
              Case Studies &<br />
            </span>
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              Real-World Product Engineering
            </span>{" "}
            <span className="text-slate-900 dark:text-white">Work</span>
          </motion.h1>

          <p className="mt-4 text-sm md:text-base text-slate-700 dark:text-slate-300 max-w-2xl">
            A snapshot of projects we&apos;ve delivered across fintech,
            healthcare, education and enterprise software.
          </p>
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="py-12 md:py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-950 hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full"
              >
                <Link href={`/projects/${p.slug}`} className="block h-full">
                  {/* IMAGE */}
                  <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-900 overflow-hidden">
                    <Image
                      src={p.coverImg}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>

                  <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
                    {/* TYPE */}
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {p.type}
                    </div>

                    {/* TITLE */}
                    <div className="mt-1 text-lg font-semibold group-hover:text-yellow-500 transition-colors">
                      {p.title}
                    </div>

                    {/* DESC */}
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                      {p.shortDesc}
                    </p>

                    {/* STACK */}
                    <div className="mt-auto flex flex-wrap gap-2">
                      {p.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-800"
                        >
                          {tech}
                        </span>
                      ))}
                      {p.stack.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-50 dark:bg-gray-900 text-gray-400 border border-transparent">
                          +{p.stack.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-yellow-50 dark:bg-yellow-900/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Want to build something similar?
            </h3>
            <p className="mt-1 text-sm md:text-base text-gray-700 dark:text-gray-200">
              Let&apos;s talk about your product and how we can help.
            </p>
          </div>

          <a
            href="/contact"
            className="px-5 py-2.5 rounded-lg bg-yellow-400 text-black text-sm font-semibold shadow-md"
          >
            Start a project
          </a>
        </div>
      </section>
    </div>
  );
}
