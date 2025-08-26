export default function Footer() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <footer className="mt-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-3xl mx-auto px-4 py-6 text-sm">
        © {new Date().getFullYear()} Ezaz (22016197) — {today}
      </div>
    </footer>
  );
}
