import { Project } from "@/data/projects";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { API_ENDPOINTS } from "../../../../../lib/api";

/* ===========================
   Fetch Single Project
=========================== */
async function getProject(slug: string): Promise<Project | undefined> {
  try {
    const res = await fetch(API_ENDPOINTS.projectBySlug(slug), {
      cache: "no-store",
    });

    if (!res.ok) return undefined;

    return res.json();
  } catch {
    return undefined;
  }
}

/* ===========================
   Fetch All Projects
=========================== */
async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(API_ENDPOINTS.projects);

    if (!res.ok) return [];

    return res.json();
  } catch {
    return [];
  }
}

/* ===========================
   Metadata
=========================== */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Sigmaix Tech Case Study`,
    description: project.shortDesc,
  };
}

/* ===========================
   Static Params
=========================== */
export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

/* ===========================
   Page Component
=========================== */
export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] text-gray-900 dark:text-gray-100 pb-24">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-end pb-32 pt-32">
        <div className="absolute inset-0">
          <Image
            src={project.coverImg}
            alt={project.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gray-900/60 dark:bg-gray-950/70 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0B1120] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M15 8H1" strokeLinecap="round" />
                  <path d="M8 15L1 8l7-7" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-medium text-sm tracking-wide">
                Back to Projects
              </span>
            </Link>

            <div className="max-w-3xl">
              <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 text-xs font-bold uppercase tracking-wider shadow-lg shadow-yellow-400/5 backdrop-blur-sm">
                {project.type}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
                {project.title}
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 font-normal leading-relaxed max-w-2xl">
                {project.shortDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-12">
            <div className="bg-white dark:bg-[#151b2b] p-8 md:p-10 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800/60">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Overview
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-loose">
                {project.fullDesc}
              </p>
            </div>

            {/* CHALLENGE */}
            <div className="bg-white dark:bg-[#151b2b] p-8 md:p-10 rounded-2xl border border-gray-100 dark:border-gray-800/60">
              <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">
                The Challenge
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* SOLUTION */}
            <div className="bg-white dark:bg-[#151b2b] p-8 md:p-10 rounded-2xl border border-gray-100 dark:border-gray-800/60">
              <h3 className="text-xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">
                Our Solution
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* GALLERY */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Gallery
              </h2>
              <div className="grid grid-cols-1 gap-8">
                {project.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#0a0f18] border border-gray-200 dark:border-gray-800/60 p-4 sm:p-8"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      width={1600}
                      height={900}
                      className="w-full h-auto object-contain"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-[#151b2b] p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800/60 sticky top-24">
              <h3 className="text-lg font-bold mb-6">Project Info</h3>

              <div className="space-y-6">
                <div>
                  <div className="text-xs uppercase text-gray-500 font-bold">
                    Client
                  </div>
                  <div className="font-semibold">{project.client}</div>
                </div>

                <div>
                  <div className="text-xs uppercase text-gray-500 font-bold">
                    Year
                  </div>
                  <div className="font-semibold">{project.year}</div>
                </div>

                <div>
                  <div className="text-xs uppercase text-gray-500 font-bold">
                    Role
                  </div>
                  <div className="font-semibold">{project.role}</div>
                </div>

                <div>
                  <div className="text-xs uppercase text-gray-500 font-bold mb-2">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase text-gray-500 font-bold mb-3">
                    Key Results
                  </div>
                  <ul className="space-y-3">
                    {project.results.map((res, i) => (
                      <li key={i} className="font-semibold">
                        ✓ {res}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-6 text-center bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-semibold"
                  >
                    Visit Live Project
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
