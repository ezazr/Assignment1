"use client";
import { useMemo, useState } from "react";

export default function HomePage() {
  const [tabs, setTabs] = useState(["Tab 1", "Tab 2"]);
  const [content, setContent] = useState(["Hello 1", "Hello 2"]);

  // Generate inline HTML output
  const output = useMemo(() => {
    const css = `
<style>
  body { font-family: sans-serif; margin: 1rem; }
  #tabs { display: flex; gap: .5rem; margin-bottom: .75rem; }
  #tabs button { border:1px solid #ccc; padding:.5rem .75rem; border-radius:.5rem; background:#f7f7f7; cursor:pointer }
  #tabs button[aria-selected="true"]{ background:#e3e3e3; outline:2px solid #333 }
  .panel{ display:none; border:1px solid #ddd; padding:1rem; border-radius:.5rem }
  .panel[aria-hidden="false"]{ display:block }
</style>`;

    const js = `
<script>
(function(){
  const tabs = document.querySelectorAll('#tabs button');
  const panels = document.querySelectorAll('.panel');
  function activate(i){
    tabs.forEach((b,idx)=>b.setAttribute('aria-selected', idx===i));
    panels.forEach((p,idx)=>p.setAttribute('aria-hidden', idx!==i));
    localStorage.setItem('lastTabIndex', i);
  }
  tabs.forEach((b,i)=>b.addEventListener('click', ()=>activate(i)));
  const saved = parseInt(localStorage.getItem('lastTabIndex')||'0',10);
  activate(isNaN(saved)?0:saved);
})();
</script>`;

    const buttons = tabs.map((t,i)=>
      `<button role="tab" aria-selected="false" id="tab-${i}" aria-controls="panel-${i}">${t}</button>`
    ).join("");

    const panels = content.map((c,i)=>
      `<div role="tabpanel" class="panel" id="panel-${i}" aria-labelledby="tab-${i}" aria-hidden="true">${c}</div>`
    ).join("");

    return `<!doctype html><html lang="en"><meta charset="utf-8"><title>Hello</title>${css}
<body>
  <h1>Tabs Demo</h1>
  <div id="tabs" role="tablist">${buttons}</div>
  ${panels}
${js}
</body></html>`;
  }, [tabs, content]);

  return (
    <section className="prose dark:prose-invert">
      <h1>Generate Tabs HTML + JS (inline CSS)</h1>
      <p>Configure your tabs, then copy and save the output into <code>Hello.html</code>.</p>

      <h2>Configure Tabs</h2>
      <div>
        {tabs.map((t,i)=>(
          <div key={i} className="mb-2 flex gap-2">
            <input
              value={t}
              onChange={e=>{
                const copy=[...tabs]; copy[i]=e.target.value; setTabs(copy);
              }}
              className="border rounded px-2 py-1"
              placeholder={`Tab ${i+1} Title`}
            />
            <input
              value={content[i]}
              onChange={e=>{
                const copy=[...content]; copy[i]=e.target.value; setContent(copy);
              }}
              className="border rounded px-2 py-1 flex-1"
              placeholder={`Tab ${i+1} Content`}
            />
          </div>
        ))}
      </div>

      <button
        className="border rounded px-3 py-2 my-2"
        onClick={()=>{ setTabs([...tabs, `Tab ${tabs.length+1}`]); setContent([...content, `Hello ${content.length+1}`]); }}
      >
        + Add Tab
      </button>

      <h2>Output (Hello.html)</h2>
      <textarea className="w-full h-80 border rounded p-2" value={output} readOnly />
      <button
        className="border rounded px-3 py-2 mt-2"
        onClick={async ()=>{ await navigator.clipboard.writeText(output); alert("Copied! Paste into Hello.html"); }}
      >
        Copy to Clipboard
      </button>
    </section>
  );
}
