"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem, navLinks } from "@/data/nav";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

function isNavItemActive(item: NavItem, pathname: string) {
  if (item.href === "/services") {
    return pathname === "/services" || pathname.startsWith("/services/");
  }
  if (item.href === "/") {
    return pathname === "/";
  }
  return pathname === item.href;
}

/* THEME TOGGLE BUTTON */
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="inline-flex items-center justify-center p-2 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition"
    >
      {isDark ? (
        // Sun icon
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" />
        </svg>
      ) : (
        // Moon icon
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-xl bg-white/40 dark:bg-transparent dark:bg-gradient-to-b dark:from-[#0b1220]/95 dark:via-[#0b1220]/70 dark:to-[#0b1220]/20 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* LOGO + BRAND */}
          <motion.a
            href="/"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Sigmaix Tech Home"
          >
            <motion.div
              className="relative w-10 h-10 md:w-12 md:h-12 rounded-md overflow-hidden"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src="/images/newLogo.png"
                alt="Sigmaix Tech Innovations logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </motion.div>

            <div className="leading-tight">
              <span className="block text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                Sigmaix Technologies
              </span>
              <span className="block text-xs text-gray-600 dark:text-gray-300 -mt-0.5">
                Building Smarter Digital Solutions
              </span>
            </div>
          </motion.a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((n) => {
              const active = isNavItemActive(n, pathname);

              return (
                <div
                  key={n.href}
                  className="relative group"
                  onMouseEnter={() => n.children && setOpenDropdown(true)}
                  onMouseLeave={() => n.children && setOpenDropdown(false)}
                >
                  {n.children ? (
                    <>
                      {/* CLICKABLE SERVICES LINK */}
                      <motion.a
                        href={n.href}
                        aria-haspopup="true"
                        aria-expanded={openDropdown}
                        className={`text-base font-semibold transition flex items-center gap-2 ${
                          active
                            ? "text-yellow-500"
                            : "text-gray-700 dark:text-gray-200 hover:text-yellow-500"
                        }`}
                      >
                        <span>{n.label}</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={`transform transition-transform duration-200 ${
                            openDropdown ? "-rotate-180" : "rotate-0"
                          }`}
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.a>

                      {/* DROPDOWN */}
                      <AnimatePresence>
                        {openDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18 }}
                            className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden"
                          >
                            <div className="py-2">
                              {n.children?.map((c) => {
                                const childActive = pathname === c.href;
                                return (
                                  <a
                                    key={c.href}
                                    href={c.href}
                                    className={`block px-4 py-2 text-sm transition ${
                                      childActive
                                        ? "text-yellow-500 bg-gray-50 dark:bg-white/5"
                                        : "text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/5"
                                    }`}
                                  >
                                    {c.label}
                                  </a>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={n.href}
                      className={`text-base font-semibold transition ${
                        active
                          ? "text-yellow-500"
                          : "text-gray-700 dark:text-gray-200 hover:text-yellow-500"
                      }`}
                    >
                      {n.label}
                    </a>
                  )}
                </div>
              );
            })}

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Yellow CTA Button */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.03, y: -2 }}
              className="ml-3 inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold shadow-md"
            >
              Contact Us
            </motion.a>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <svg
                width="24"
                height="24"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="md:hidden mt-3 pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((n) => {
                  const active = isNavItemActive(n, pathname);

                  return (
                    <div key={n.href} className="w-full">
                      {!n.children ? (
                        <a
                          href={n.href}
                          onClick={() => setOpen(false)}
                          className={`block px-3 py-2 rounded-md text-lg font-semibold transition ${
                            active
                              ? "text-yellow-500 bg-gray-100 dark:bg-white/10"
                              : "text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10"
                          }`}
                        >
                          {n.label}
                        </a>
                      ) : (
                        <MobileAccordionItem
                          item={n}
                          closeMenu={() => setOpen(false)}
                        />
                      )}
                    </div>
                  );
                })}

                {/* Theme toggle row */}
                <div className="mt-2 flex items-center justify-between px-3">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Theme
                  </span>
                  <ThemeToggle />
                </div>

                {/* CTA */}
                <a
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-md"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function MobileAccordionItem({
  item,
  closeMenu,
}: {
  item: NavItem;
  closeMenu: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  const parentActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setExpanded((s) => !s)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-lg font-semibold transition ${
          parentActive
            ? "text-yellow-500 bg-gray-100 dark:bg-white/10"
            : "text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10"
        }`}
        aria-expanded={expanded}
      >
        <span>{item.label}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transform transition-transform duration-200 ${
            expanded ? "rotate-180" : "rotate-0"
          }`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {expanded && item.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="pl-4 mt-1 overflow-hidden"
          >
            {item.children.map((c) => {
              const childActive = pathname === c.href;
              return (
                <a
                  key={c.href}
                  href={c.href}
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                    childActive
                      ? "text-yellow-500 bg-gray-100 dark:bg-white/10"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
                  }`}
                >
                  {c.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
