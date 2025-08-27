"use client";
import { useEffect, useMemo, useState } from "react";

type T = { title: string; body: string };

export default function HomePage() {
  const [tabs, setTabs] = useState<T[]>([
    { title: "Tab 1", body: "Hello 1" },
    { title: "Tab 2", body: "Hello 2" },
  ]);

  // Load/save generator config to localStorage (rubric: “Tabs are stored in localStorage”)
  useEffect(() => {
    const raw = localStorage.getItem("generatorTabs");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as T[];
        if (Array.isArray(parsed) && parsed.length) setTabs(parsed.slice(0, 15));
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("generatorTabs", JSON.stringify(tabs));
  }, [tabs]);

  const addTab = () => {
    if (tabs.length >= 15) return alert("Max 15 tabs (per rubric).");
    setTabs([...tabs, { title: `Tab ${tabs.length + 1}`, body: `Hello ${tabs.length + 1}` }]);
  };
  const removeTab = (i: number) => {
    const next = tabs.slice();
    next.splice(i, 1);
    setTabs(next.length ? next : [{ title: "Tab 1", body: "Hello 1" }]);
  };
  const editTitle = (i: number, v: string) => {
    const next = tabs.slice();
    next[i] = { ...next[i], title: v };
    setTabs(next);
  };
  const editBody = (i: number, v: string) => {
    const next = tabs.slice();
    next[i] = { ...next[i], body: v };
    setTabs(next);
  };

  // Generate standalone HTML with inline CSS and NO class attributes
  const output = useMemo(() => {
    // Inline CSS only (no classes used in markup)
    const css = `
<style>
  body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; margin: 1rem; }
  [role="tablist"] { display: flex; gap: .5rem; margin-bottom: .75rem; }
  [role="tab"] { border:1px solid #ccc; padding:.5rem .75rem; border-radius:.5rem; background:#f7f7f7; cursor:pointer }
  [role="tab"][aria-selected="true"] { background:#e3e3e3; outline:2px solid #333 }
  [role="tabpanel"] { display:none; border:1px solid #ddd; padding:1rem; border-radius:.5rem }
  [role="tabpanel"][aria-hidden="false"] { display:block }
</style>`;

    const js = `
<script>
(function(){
  const tabs = document.querySelectorAll('[role="tablist"] [role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');
  function activate(i){
    tabs.forEach((b,idx)=>b.setAttribute('aria-selected', String(idx===i)));
    panels.forEach((p,idx)=>p.setAttribute('aria-hidden', String(idx!==i)));
    localStorage.setItem('lastTabIndex', String(i));
  }
  tabs.forEach((b,i)=>b.addEventListener('click', ()=>activate(i)));
  const saved = parseInt(localStorage.getItem('lastTabIndex')||'0',10);
  activate(isNaN(saved)?0:saved);
})();
</script>`;

    const buttons = tabs
      .map((t, i) => `<button role="tab" aria-selected="false" id="tab-${i}" aria-controls="panel-${i}">${t.title}</button>`)
      .join("");

    const panels = tabs
      .map(
        (t, i) =>
          `<div role="tabpanel" id="panel-${i}" aria-labelledby="tab-${i}" aria-hidden="true">${t.body}</div>`
      )
      .join("");

    return `<!doctype html><html lang="en"><meta charset="utf-8"><title>Hello</title>${css}
<body>
  <h1>Tabs Demo</h1>
  <div role="tablist">${buttons}</div>
  ${panels}
${js}
</body></html>`;
  }, [tabs]);

  return (
    <section className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-2">Generate Tabs HTML + JS (inline CSS)</h1>
      <p className="mb-4">Configure your tabs (up to 15), then copy and save the output into <code>Hello.html</code>.</p>

      <h2 className="font-semibold mb-2">Configure Tabs</h2>
      <div className="space-y-2">
        {tabs.map((t, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={t.title}
              onChange={(e) => editTitle(i, e.target.value)}
              className="border rounded px-2 py-1 flex-[0_0_200px] bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder={`Tab ${i + 1} Title`}
            />
            <input
              value={t.body}
              onChange={(e) => editBody(i, e.target.value)}
              className="border rounded px-2 py-1 flex-1 bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              placeholder={`Tab ${i + 1} Content`}
            />
            <button
              onClick={() => removeTab(i)}
              className="border rounded px-3 py-1"
              aria-label={`Remove Tab ${i + 1}`}
            >
              −
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button onClick={addTab} className="border rounded px-3 py-2">+ Add Tab</button>
        <span className="text-sm opacity-75">{tabs.length} / 15</span>
      </div>

      <h2 className="font-semibold mt-6 mb-2">Output (Hello.html)</h2>
      <textarea
        className="w-full h-80 border rounded p-2 bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
        value={output}
        readOnly
      />
      <button
        className="border rounded px-3 py-2 mt-2"
        onClick={async () => { await navigator.clipboard.writeText(output); alert("Copied! Paste into Hello.html"); }}
      >
        Copy to Clipboard
      </button>
    </section>
  );
}
