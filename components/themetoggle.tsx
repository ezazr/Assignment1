"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme(); // ✅ use resolvedTheme
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: render only after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle Dark/Light Mode"
      className="border px-3 py-2 rounded"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
