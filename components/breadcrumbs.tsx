"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return null; // on home page, no breadcrumbs

  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-2">
      <ol className="flex gap-2 text-zinc-600 dark:text-zinc-300">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        {parts.map((part, i) => {
          const href = "/" + parts.slice(0, i + 1).join("/");
          const label = part.charAt(0).toUpperCase() + part.slice(1);
          return (
            <li key={href} className="before:content-['›'] before:px-1">
              <Link href={href} className="hover:underline">{label}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
