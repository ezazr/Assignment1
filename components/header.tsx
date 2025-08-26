"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

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
          className="md:hidden border px-3 py-2 rounded"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mainmenu"
        >
          ☰
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
    </header>
  );
}
