"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ThemeToggle from "./themetoggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/escape-room", label: "Escape Room" },
  { href: "/coding-races", label: "Coding Races" },
  { href: "/court-room", label: "Court Room" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("/");

  useEffect(() => {
    const last = Cookies.get("lastMenu");
    if (last) setActive(last);
  }, []);

  useEffect(() => {
    Cookies.set("lastMenu", active, { expires: 30 });
  }, [active]);

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          aria-label="Menu"
  className="md:hidden relative w-10 h-10 flex items-center justify-center"
  onClick={() => setOpen(!open)}
  aria-expanded={open}
  aria-controls="mainmenu"
>
  {/* Top line */}
  <span
    aria-hidden
    className={`absolute h-[2px] w-6 bg-current transition-transform duration-200
                ${open ? "rotate-45 translate-y-[2px]" : "-translate-y-2"}`}
  />
  {/* Middle line */}
  <span
    aria-hidden
    className={`absolute h-[2px] w-6 bg-current transition-opacity duration-200
                ${open ? "opacity-0" : "opacity-100"}`}
  />
  {/* Bottom line */}
  <span
    aria-hidden
    className={`absolute h-[2px] w-6 bg-current transition-transform duration-200
                ${open ? "-rotate-45 -translate-y-[2px]" : "translate-y-2"}`}
  />
        </button>

        <nav id="mainmenu" aria-label="Main" className={`md:block ${open ? "block" : "hidden"}`}>
          <ul className="flex flex-col md:flex-row gap-2 md:gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`px-2 py-1 rounded ${active === l.href ? "underline" : ""}`}
                  onClick={() => { setActive(l.href); setOpen(false); }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <ThemeToggle />
    </header>
  );
}
